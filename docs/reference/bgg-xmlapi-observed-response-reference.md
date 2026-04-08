# BGG XML API Observed Response Reference

## Purpose

This document captures what the project has **actually observed** in a real
`xmlapi2/thing` response from BoardGameGeek, using a valid API token and a
multi-ID request.

It is intentionally written as an **implementation-facing reference**, not as a
copy of the official BGG documentation. The goal is to document:

- which fields are confirmed present in our real sample
- which fields look reliable enough to use in the app
- which fields should be treated as opportunistic or incomplete
- which additional samples would still be useful

## Source Sample

Observed sample file:

- [example.xml](/E:/dev/Misc/boardgame-library/docs/reference/example.xml)

Observed request shape:

```bash
curl -s \
  -H "Authorization: Bearer <TOKEN>" \
  "https://boardgamegeek.com/xmlapi2/thing?id=173346,199561,244262,346965&stats=1"
```

Observed item IDs:

- `173346` = `7 Wonders Duel`
- `199561` = `Sagrada`
- `244262` = `Sagrada: 5-6 Player Expansion`
- `346965` = `Azul: Queen's Garden`

## Important Caveat

This spec is based on a **real observed response**, not on a fully formal schema
published by BGG. We should treat it as:

- reliable enough for practical integration work
- not guaranteed as a strict long-term contract

Whenever this document says "confirmed", it means:

- confirmed in our sample
- not necessarily guaranteed by official documentation

## Top-Level Structure

Observed root element:

```xml
<items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
  <item ... />
  <item ... />
</items>
```

Observed root-level notes:

- response root is `<items>`
- root includes a `termsofuse` attribute
- each requested game appears as an `<item>`
- each item has:
  - `type`
  - `id`

## Item Types Observed

Confirmed item types in the sample:

- `boardgame`
- `boardgameexpansion`

Examples:

- `7 Wonders Duel` appears as `type="boardgame"`
- `Sagrada` appears as `type="boardgame"`
- `Sagrada: 5-6 Player Expansion` appears as `type="boardgameexpansion"`

Implication for the project:

- API data is materially better than the collection CSV for expansion detection
- expansion grouping should prefer API item type over title heuristics

## Confirmed Fields Per Item

The following fields were observed directly inside `<item>`:

- `<thumbnail>`
- `<image>`
- `<name type="primary" ... />`
- `<name type="alternate" ... />`
- `<description>`
- `<yearpublished value="..." />`
- `<minplayers value="..." />`
- `<maxplayers value="..." />`
- `<playingtime value="..." />`
- `<minplaytime value="..." />`
- `<maxplaytime value="..." />`
- `<minage value="..." />`
- `<poll ...>`
- `<poll-summary ...>`
- `<link type="..." ... />`
- `<statistics>`

## Images

### Confirmed

Observed fields:

- `<thumbnail>`
- `<image>`

Examples from the sample:

- `7 Wonders Duel` returns both thumbnail and full image
- `Sagrada` returns both thumbnail and full image
- `Sagrada: 5-6 Player Expansion` returns both thumbnail and full image
- `Azul: Queen's Garden` returns both thumbnail and full image

### Practical Use

These fields are sufficient for the current app needs:

- `thumbnail` can support smaller list or preload use cases
- `image` can be used for main card/detail art

### Recommendation

For this project:

- continue storing both `thumbnailUrl` and `imageUrl`
- prefer `imageUrl` in the UI
- optionally cache the downloaded image locally during the build

## Names

### Confirmed

Observed name variants:

- primary name:

```xml
<name type="primary" sortindex="1" value="Sagrada" />
```

- alternate names:

```xml
<name type="alternate" sortindex="1" value="Azul: Jardín de la Reina" />
```

### Important Limitation

Alternate names are present, but they are **not labeled by locale/language** in a
way that lets us safely infer:

- "this is the Spanish title"
- "this is the English display title"

Implication:

- we should not automatically map UI language to alternate names
- the current strategy remains correct:
  - base BGG name
  - manual override when needed

### Recommended Parsing

Persist:

- `primaryName`
- `alternateNames[]`

Use in product:

- `primaryName` as default display source
- `alternateNames[]` only as supporting metadata or future search boost

## Description

### Confirmed

Observed field:

- `<description> ... </description>`

Description content is long-form plain text embedded in XML.

### Practical Use

Useful for:

- detail panel fallback when no personal note exists
- full-text search enrichment
- future richer detail view

### Recommendation

Persist:

- `description`

UI:

- show only in detail view
- avoid rendering raw HTML assumptions
- treat as plain text unless proven otherwise

## Core Numeric Metadata

### Confirmed

Observed fields:

- `yearpublished`
- `minplayers`
- `maxplayers`
- `playingtime`
- `minplaytime`
- `maxplaytime`
- `minage`

### Practical Use

These map directly to existing app fields:

- `yearPublished`
- `minPlayers`
- `maxPlayers`
- `playingTime`
- `minPlayTime`
- `maxPlayTime`
- `age`

These are stable and high-value fields for filtering and display.

## Polls

### Confirmed Polls

Observed poll names:

- `suggested_numplayers`
- `suggested_playerage`
- `language_dependence`

Observed helper summary:

- `<poll-summary name="suggested_numplayers" ...>`

### Suggested Number of Players

Observed structure:

```xml
<poll name="suggested_numplayers" ...>
  <results numplayers="2">
    <result value="Best" numvotes="1459" />
    <result value="Recommended" numvotes="31" />
    <result value="Not Recommended" numvotes="6" />
  </results>
</poll>
```

Observed summary structure:

```xml
<poll-summary name="suggested_numplayers" ...>
  <result name="bestwith" value="Best with 2 players" />
  <result name="recommmendedwith" value="Recommended with 2 players" />
</poll-summary>
```

### Practical Use

This is richer than the collection CSV fields and could support:

- more precise best player count parsing
- more precise recommended player count parsing
- future UI explanations like:
  - "Best with 2"
  - "Recommended with 1-4"

### Recommendation

Near term:

- keep current CSV-based `recommendedPlayers` and `bestPlayers` if they remain simpler

Medium term:

- parse poll data directly from API
- derive normalized arrays from actual vote distribution

## Language Dependence

### Confirmed

Observed poll:

```xml
<poll name="language_dependence" ...>
  <results>
    <result level="1" value="No necessary in-game text" numvotes="119" />
    ...
  </results>
</poll>
```

### Practical Use

This is directly useful for:

- `languageDependence`
- `languageKey`

It is a stronger source than plain CSV text if we later want to derive:

- winning level by votes
- standardized text labels

### Recommendation

Persist:

- full poll results if we choose to enrich this area

Current app can continue using:

- normalized text label
- derived bucket (`none`, `low`, `moderate`, `high`, `extreme`)

## Links

### Confirmed Link Types

Observed `link type` values include:

- `boardgamecategory`
- `boardgamemechanic`
- `boardgamefamily`
- `boardgameexpansion`
- `boardgameaccessory`
- `boardgameimplementation`
- `boardgamedesigner`
- `boardgameartist`
- `boardgamepublisher`

### Categories

Observed examples:

- `Ancient`
- `Card Game`
- `Abstract Strategy`
- `Expansion for Base-game`

Project value:

- strong candidate for richer filtering
- useful for search text enrichment

### Mechanics

Observed examples:

- `Open Drafting`
- `Pattern Building`
- `Set Collection`
- `Tile Placement`

Project value:

- strong candidate for deeper filtering later
- useful in detail panels and search

### Families

Observed examples:

- `Game: 7 Wonders`
- `Game: Sagrada`
- `Game: Azul`
- various thematic/mechanism/family labels

Project value:

- potentially useful for franchise grouping
- useful for future “related games” logic
- lower immediate value than categories/mechanics

### Designers / Artists / Publishers

Observed and available as links.

Project value:

- not critical for v1
- useful for future credits, metadata panels, and creator filters

## Expansion / Dependency Signals

This is one of the most valuable findings in the sample.

### Signal 1: Item Type

Example:

```xml
<item type="boardgameexpansion" id="244262">
```

This is a direct expansion signal.

### Signal 2: Expansion Link From Base Game

Example from `Sagrada`:

```xml
<link type="boardgameexpansion" id="244262" value="Sagrada: 5-6 Player Expansion" />
```

Meaning:

- base game lists its expansions

### Signal 3: Inbound Expansion Link From Expansion Item

Example from `Sagrada: 5-6 Player Expansion`:

```xml
<link type="boardgameexpansion" id="199561" value="Sagrada" inbound="true"/>
```

Meaning:

- expansion points back to the base game

### Practical Use

This is enough to model:

- `dependencyType = expansion`
- `requiresGameId = 199561`
- reverse relation from base to expansions

### Recommendation

When API enrichment is active, this should become the primary source for:

- expansion grouping
- "requires base game" labels
- related content in detail views

## Statistics

### Confirmed

Observed structure:

```xml
<statistics page="1">
  <ratings>
    <usersrated value="..." />
    <average value="..." />
    <bayesaverage value="..." />
    <ranks>...</ranks>
    <stddev value="..." />
    <median value="..." />
    <owned value="..." />
    <trading value="..." />
    <wanting value="..." />
    <wishing value="..." />
    <numcomments value="..." />
    <numweights value="..." />
    <averageweight value="..." />
  </ratings>
</statistics>
```

### Already Useful

Confirmed useful fields:

- `average`
- `bayesaverage`
- `ranks/rank`
- `averageweight`

These map directly to app concerns:

- average rating
- ranking
- complexity / weight

### Potential Future Use

Possible additional UI or metadata uses:

- `usersrated`
- `owned`
- `wishing`
- `numweights`

Not essential for current product.

## What the Current App Can Safely Use

Based on the observed sample, the following enrichment set looks practical and
high-confidence:

- `thumbnail`
- `image`
- `description`
- `yearpublished`
- `minplayers`
- `maxplayers`
- `playingtime`
- `minplaytime`
- `maxplaytime`
- `minage`
- language dependence poll
- categories
- mechanics
- primary name
- alternate names as non-authoritative support data
- item `type`
- expansion links
- ranking / rating / weight stats

## Recommended Internal Data Model Additions

When API enrichment is enabled, these fields would be good normalized targets:

```json
{
  "bggItemType": "boardgame | boardgameexpansion",
  "primaryName": "string",
  "alternateNames": ["string"],
  "thumbnailUrl": "string",
  "imageUrl": "string",
  "description": "string",
  "categories": ["string"],
  "mechanics": ["string"],
  "families": ["string"],
  "designers": ["string"],
  "artists": ["string"],
  "publishers": ["string"],
  "stats": {
    "average": 0,
    "bayesAverage": 0,
    "averageWeight": 0,
    "rank": 0
  },
  "relations": {
    "expansionIds": [0],
    "baseGameId": 0
  }
}
```

## Current Unknowns

The sample is already strong, but these areas would benefit from more examples:

- games that do **not** return image or thumbnail
- accessories-only items
- standalone games with implementation links only
- games with unusual or missing polls
- edge cases around alternate names and encoding
- examples where multiple inbound/outbound dependency links coexist

## Suggested Follow-Up Samples

If we want to extend this spec later, the most useful additional sample curls are:

### 1. Game with no obvious expansions

```bash
curl -s \
  -H "Authorization: Bearer <TOKEN>" \
  "https://boardgamegeek.com/xmlapi2/thing?id=346965&stats=1"
```

Useful for:

- understanding simpler standalone structure

### 2. Another known expansion from the collection

```bash
curl -s \
  -H "Authorization: Bearer <TOKEN>" \
  "https://boardgamegeek.com/xmlapi2/thing?id=22545&stats=1"
```

Replace the ID with any owned expansion if desired.

Useful for:

- validating whether inbound expansion linking is consistent

### 3. Batch with mixed standalone + expansion + sequel-like games

```bash
curl -s \
  -H "Authorization: Bearer <TOKEN>" \
  "https://boardgamegeek.com/xmlapi2/thing?id=199561,244262,346965,230802&stats=1"
```

Useful for:

- separating true expansions from franchise/implementation relationships

## Implementation Guidance for This Project

### Safe to Implement Now

- image enrichment from `thumbnail` / `image`
- description enrichment
- categories and mechanics enrichment
- richer expansion detection using item type and link relationships

### Not Safe to Automate Yet

- choosing a display name by interface language from alternate names
- assuming every link type exists on every item
- assuming every item has both `image` and `thumbnail`

## Summary

The observed XML sample confirms that BGG `thing` responses provide enough
useful information for this project to support:

- real cover images
- richer detail panels
- category/mechanic enrichment
- stronger search text
- expansion/base-game relationship modeling

The sample does **not** justify automatic localized-name selection by UI
language, so name overrides remain the correct approach there.
