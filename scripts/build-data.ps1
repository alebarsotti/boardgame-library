param(
  [string]$CsvPath = "collection.csv",
  [string]$OutputPath = (Join-Path (Split-Path -Parent $PSScriptRoot) "data\games.json"),
  [string]$ScriptOutputPath = (Join-Path (Split-Path -Parent $PSScriptRoot) "data\games-data.js"),
  [string]$ImagesDirectory = (Join-Path (Split-Path -Parent $PSScriptRoot) "data\images"),
  [string]$NameOverridesPath = (Join-Path (Split-Path -Parent $PSScriptRoot) "data\name-overrides.json"),
  [string]$BggToken = "",
  [switch]$DownloadImages
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$localTokenPath = Join-Path $projectRoot ".bgg-token"

function To-Bool($value) {
  return "$value" -eq "1"
}

function To-NullableInt($value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return $null }
  $parsed = 0
  if ([int]::TryParse($value, [ref]$parsed)) { return $parsed }
  return $null
}

function To-NullableDouble($value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return $null }
  $parsed = 0.0
  if ([double]::TryParse($value, [System.Globalization.NumberStyles]::Any, [System.Globalization.CultureInfo]::InvariantCulture, [ref]$parsed)) {
    return [math]::Round($parsed, 2)
  }
  return $null
}

function Parse-PlayersList($value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return @() }
  return @(
    $value.Split(",") |
    ForEach-Object { $_.Trim() } |
    Where-Object { $_ -match '^\d+$' } |
    ForEach-Object { [int]$_ }
  )
}

function Parse-AgeValue($value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return $null }
  $match = [regex]::Match($value, '\d+')
  if ($match.Success) { return [int]$match.Value }
  return $null
}

function Get-WeightBand($weight) {
  if ($null -eq $weight) { return "unknown" }
  if ($weight -lt 1.9) { return "light" }
  if ($weight -lt 2.8) { return "medium-light" }
  if ($weight -lt 3.6) { return "medium-heavy" }
  return "heavy"
}

function Get-TimeBand($minutes) {
  if ($null -eq $minutes) { return "unknown" }
  if ($minutes -le 30) { return "quick" }
  if ($minutes -le 60) { return "standard" }
  if ($minutes -le 120) { return "extended" }
  return "epic"
}

function Get-PlayerBand($minPlayers, $maxPlayers) {
  if ($null -eq $minPlayers -or $null -eq $maxPlayers) { return "unknown" }
  if ($minPlayers -eq 1 -and $maxPlayers -eq 1) { return "solo-only" }
  if ($maxPlayers -eq 2) { return "duo" }
  if ($maxPlayers -le 4) { return "small-group" }
  if ($maxPlayers -le 6) { return "mid-group" }
  return "large-group"
}

function Get-LanguageKey($value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return "unknown" }
  $normalized = $value.ToLowerInvariant()
  if ($normalized.Contains("no necessary")) { return "none" }
  if ($normalized.Contains("some necessary")) { return "low" }
  if ($normalized.Contains("moderate")) { return "moderate" }
  if ($normalized.Contains("extensive")) { return "high" }
  if ($normalized.Contains("unplayable")) { return "extreme" }
  return "unknown"
}

function Get-LinkValues($parent, $type) {
  return @(
    $parent.SelectNodes("link[@type='$type']") |
    ForEach-Object { $_.value } |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
    Select-Object -Unique
  )
}

function Read-JsonMap($path) {
  if (-not (Test-Path $path)) {
    return @{}
  }

  $raw = Get-Content $path -Raw
  if ([string]::IsNullOrWhiteSpace($raw)) {
    return @{}
  }

  $data = $raw | ConvertFrom-Json
  $map = @{}
  foreach ($property in $data.PSObject.Properties) {
    $map[$property.Name] = $property.Value
  }
  return $map
}

function Resolve-BggToken($explicitToken, $tokenPath) {
  if (-not [string]::IsNullOrWhiteSpace($explicitToken)) {
    return $explicitToken.Trim()
  }

  if ($env:BGG_TOKEN -and -not [string]::IsNullOrWhiteSpace($env:BGG_TOKEN)) {
    return $env:BGG_TOKEN.Trim()
  }

  if (Test-Path $tokenPath) {
    $fileToken = (Get-Content $tokenPath -Raw).Trim()
    if (-not [string]::IsNullOrWhiteSpace($fileToken)) {
      return $fileToken
    }
  }

  return ""
}

function New-SearchTokens($game) {
  $parts = @(
    $game.name,
    $game.originalName,
    $game.notes,
    $game.description,
    ($game.categories -join " "),
    ($game.mechanics -join " "),
    ($game.tags -join " "),
    ($game.recommendedPlayers -join " "),
    ($game.bestPlayers -join " ")
  ) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

  return (($parts -join " ") -replace '\s+', ' ').Trim().ToLowerInvariant()
}

function Invoke-BggThingBatch($ids, $token) {
  if (-not $token -or -not $ids.Count) {
    return $null
  }

  $joinedIds = $ids -join ","
  $headers = @{ Authorization = "Bearer $token" }
  $uri = "https://boardgamegeek.com/xmlapi2/thing?id=$joinedIds&stats=1"

  for ($attempt = 0; $attempt -lt 4; $attempt++) {
    $response = Invoke-WebRequest -Uri $uri -Headers $headers -UseBasicParsing
    if ($response.StatusCode -eq 202 -or $response.Content -match "queued") {
      Start-Sleep -Seconds (2 + $attempt)
      continue
    }

    return [xml]$response.Content
  }

  throw "BGG batch for ids '$joinedIds' did not become available in time."
}

function Get-LocalImagePath($imageUrl, $id, $imagesDirectory) {
  if ([string]::IsNullOrWhiteSpace($imageUrl)) {
    return ""
  }

  $extension = [System.IO.Path]::GetExtension(([System.Uri]$imageUrl).AbsolutePath)
  if ([string]::IsNullOrWhiteSpace($extension)) {
    $extension = ".jpg"
  }

  return Join-Path $imagesDirectory "$id$extension"
}

function Download-ImageIfNeeded($imageUrl, $id, $imagesDirectory, $token) {
  if ([string]::IsNullOrWhiteSpace($imageUrl)) {
    return ""
  }

  if (-not (Test-Path $imagesDirectory)) {
    New-Item -ItemType Directory -Path $imagesDirectory | Out-Null
  }

  $localPath = Get-LocalImagePath $imageUrl $id $imagesDirectory
  if (-not (Test-Path $localPath)) {
    $headers = @{}
    if ($token) {
      $headers.Authorization = "Bearer $token"
    }

    Invoke-WebRequest -Uri $imageUrl -Headers $headers -OutFile $localPath -UseBasicParsing
    Start-Sleep -Milliseconds 250
  }

  return $localPath
}

if (-not (Test-Path $CsvPath)) {
  throw "CSV not found at $CsvPath. Pass -CsvPath with the exported BoardGameGeek collection CSV."
}

$BggToken = Resolve-BggToken $BggToken $localTokenPath

$rows = Import-Csv $CsvPath
$games = @()
$gamesById = @{}
$nameOverrides = Read-JsonMap $NameOverridesPath

foreach ($row in $rows) {
  $minPlayers = To-NullableInt $row.minplayers
  $maxPlayers = To-NullableInt $row.maxplayers
  $playTime = To-NullableInt $row.playingtime
  $minPlayTime = To-NullableInt $row.minplaytime
  $maxPlayTime = To-NullableInt $row.maxplaytime
  $avgWeight = To-NullableDouble $row.avgweight
  $averageRating = To-NullableDouble $row.average
  $bayesAverage = To-NullableDouble $row.baverage
  $rank = To-NullableInt $row.rank
  $yearPublished = To-NullableInt $row.yearpublished
  $age = Parse-AgeValue $row.bggrecagerange
  $recommendedPlayers = Parse-PlayersList $row.bggrecplayers
  $bestPlayers = Parse-PlayersList $row.bggbestplayers
  $own = To-Bool $row.own
  $prevOwned = To-Bool $row.prevowned
  $forTrade = To-Bool $row.fortrade
  $wantToPlay = To-Bool $row.wanttoplay
  $wantToBuy = To-Bool $row.wanttobuy
  $wishlist = To-Bool $row.wishlist
  $quantity = To-NullableInt $row.quantity
  $notes = @($row.privatecomment, $row.comment, $row.wishlistcomment) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -First 1
  $tags = New-Object System.Collections.Generic.List[string]

  if ($own) { $tags.Add("owned") }
  if ($prevOwned) { $tags.Add("previously-owned") }
  if ($forTrade) { $tags.Add("for-trade") }
  if ($wantToPlay) { $tags.Add("want-to-play") }
  if ($wantToBuy) { $tags.Add("want-to-buy") }
  if ($wishlist) { $tags.Add("wishlist") }
  if ($minPlayers -eq 1) { $tags.Add("solo") }
  if ($maxPlayers -eq 2) { $tags.Add("two-player") }
  if ($recommendedPlayers -contains 2 -or $bestPlayers -contains 2) { $tags.Add("great-at-2") }
  if ($maxPlayers -ge 6) { $tags.Add("group") }
  if ($playTime -le 30) { $tags.Add("quick") }
  if ($playTime -gt 120) { $tags.Add("long") }
  if ($avgWeight -ge 3.5) { $tags.Add("heavy") }
  elseif ($avgWeight -le 2.0 -and $avgWeight -ne $null) { $tags.Add("light") }
  if (($avgWeight -ne $null -and $avgWeight -le 2.2) -and ($playTime -ne $null -and $playTime -le 60)) { $tags.Add("teaching-friendly") }

  $game = [ordered]@{
    id = To-NullableInt $row.objectid
    collId = To-NullableInt $row.collid
    name = $row.objectname
    originalName = $row.originalname
    nameOverrides = [ordered]@{
      es = ""
      en = ""
    }
    type = $row.objecttype
    yearPublished = $yearPublished
    minPlayers = $minPlayers
    maxPlayers = $maxPlayers
    recommendedPlayers = $recommendedPlayers
    bestPlayers = $bestPlayers
    age = $age
    ageText = $row.bggrecagerange
    playingTime = $playTime
    minPlayTime = $minPlayTime
    maxPlayTime = $maxPlayTime
    averageRating = $averageRating
    bayesAverage = $bayesAverage
    rank = $rank
    avgWeight = $avgWeight
    weightBand = Get-WeightBand $avgWeight
    timeBand = Get-TimeBand $playTime
    playerBand = Get-PlayerBand $minPlayers $maxPlayers
    languageDependence = $row.bgglanguagedependence
    languageKey = Get-LanguageKey $row.bgglanguagedependence
    quantity = if ($quantity) { $quantity } else { 1 }
    own = $own
    prevOwned = $prevOwned
    forTrade = $forTrade
    wantToPlay = $wantToPlay
    wantToBuy = $wantToBuy
    wishlist = $wishlist
    versionNickname = $row.version_nickname
    versionPublishers = $row.version_publishers
    versionLanguages = $row.version_languages
    notes = if ($notes) { $notes[0] } else { "" }
    description = ""
    categories = @()
    mechanics = @()
    bggUrl = if ($row.objectid) { "https://boardgamegeek.com/boardgame/$($row.objectid)" } else { "" }
    thumbnailUrl = ""
    imageUrl = ""
    imageHint = if ($yearPublished) { "$($row.objectname) ($yearPublished)" } else { $row.objectname }
    tags = @($tags | Select-Object -Unique)
    searchText = ""
  }

  $gameObject = [pscustomobject]$game
  if ($gameObject.id -and $nameOverrides.ContainsKey("$($gameObject.id)")) {
    $entry = $nameOverrides["$($gameObject.id)"]
    $gameObject.nameOverrides = [ordered]@{
      es = if ($entry.es) { [string]$entry.es } else { "" }
      en = if ($entry.en) { [string]$entry.en } else { "" }
    }
  }
  $gameObject.searchText = New-SearchTokens $gameObject
  $games += $gameObject
  if ($gameObject.id) {
    $gamesById["$($gameObject.id)"] = $gameObject
  }
}

if ($BggToken -and $gamesById.Count) {
  $idBatches = @($gamesById.Keys) | Sort-Object
  for ($offset = 0; $offset -lt $idBatches.Count; $offset += 20) {
    $upperBound = [Math]::Min($offset + 19, $idBatches.Count - 1)
    $batch = @($idBatches[$offset..$upperBound])
    $xml = Invoke-BggThingBatch $batch $BggToken

    foreach ($item in $xml.items.item) {
      $game = $gamesById["$($item.id)"]
      if ($null -eq $game) { continue }

      $primaryName = @($item.name | Where-Object { $_.type -eq "primary" } | Select-Object -First 1)
      if ($primaryName.Count -gt 0 -and $primaryName[0].value) {
        $game.originalName = $primaryName[0].value
      }

      $game.description = if ($item.description) { [System.Net.WebUtility]::HtmlDecode($item.description) } else { "" }
      $game.thumbnailUrl = if ($item.thumbnail) { [string]$item.thumbnail } else { "" }
      $game.imageUrl = if ($item.image) { [string]$item.image } else { $game.thumbnailUrl }
      $game.categories = Get-LinkValues $item "boardgamecategory"
      $game.mechanics = Get-LinkValues $item "boardgamemechanic"

      if ($DownloadImages.IsPresent -and $game.imageUrl) {
        $downloaded = Download-ImageIfNeeded $game.imageUrl $game.id $ImagesDirectory $BggToken
        if ($downloaded) {
          $imagesRoot = Resolve-Path -LiteralPath (Split-Path -Parent $OutputPath)
          $resolvedImage = Resolve-Path -LiteralPath $downloaded
          $game.imageUrl = ($resolvedImage.Path.Substring($imagesRoot.Path.Length).TrimStart('\\') -replace '\\', '/')
        }
      }

      $game.searchText = New-SearchTokens $game
    }

    Start-Sleep -Milliseconds 400
  }
}

$summary = [ordered]@{
  generatedAt = (Get-Date).ToString("s")
    count = $games.Count
  ownCount = @($rows | Where-Object { $_.own -eq "1" }).Count
  prevOwnedCount = @($rows | Where-Object { $_.prevowned -eq "1" }).Count
  recommendations = [ordered]@{
    quick = @($games | Where-Object { $_.timeBand -eq "quick" }).Count
    duo = @($games | Where-Object { $_.bestPlayers -contains 2 -or $_.recommendedPlayers -contains 2 }).Count
    teachingFriendly = @($games | Where-Object { $_.tags -contains "teaching-friendly" }).Count
    heavy = @($games | Where-Object { $_.weightBand -eq "heavy" }).Count
  }
}

$payload = [ordered]@{
  summary = $summary
  games = $games
}

$json = $payload | ConvertTo-Json -Depth 8

foreach ($path in @($OutputPath, $ScriptOutputPath)) {
  $directory = Split-Path -Parent $path
  if (-not (Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory | Out-Null
  }
}

$json | Set-Content -Path $OutputPath -Encoding UTF8
$jsPayload = "window.__BGG_LIBRARY_DATA__ = $json;"
[System.IO.File]::WriteAllText($ScriptOutputPath, $jsPayload, [System.Text.UTF8Encoding]::new($false))

Write-Output "Generated $($games.Count) games into $OutputPath and $ScriptOutputPath"
if (-not $BggToken) {
  Write-Output "BGG enrichment skipped because no token was provided."
}
