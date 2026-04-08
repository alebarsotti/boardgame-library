from __future__ import annotations

import argparse
import csv
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Any


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT_PATH = PROJECT_ROOT / "data" / "games.json"
DEFAULT_SCRIPT_OUTPUT_PATH = PROJECT_ROOT / "data" / "games-data.js"
DEFAULT_IMAGES_DIRECTORY = PROJECT_ROOT / "data" / "images"
DEFAULT_NAME_OVERRIDES_PATH = PROJECT_ROOT / "data" / "name-overrides.json"
DEFAULT_TOKEN_PATH = PROJECT_ROOT / ".bgg-token"
BGG_BATCH_SIZE = 20


def to_bool(value: str | None) -> bool:
    return (value or "").strip() == "1"


def to_nullable_int(value: str | None) -> int | None:
    text = (value or "").strip()
    if not text:
        return None
    try:
        return int(text)
    except ValueError:
        return None


def to_nullable_float(value: str | None) -> float | None:
    text = (value or "").strip()
    if not text:
        return None
    try:
        return round(float(text), 2)
    except ValueError:
        return None


def parse_players_list(value: str | None) -> list[int]:
    text = (value or "").strip()
    if not text:
        return []
    numbers: list[int] = []
    for part in text.split(","):
        candidate = part.strip()
        if candidate.isdigit():
            numbers.append(int(candidate))
    return numbers


def parse_age_value(value: str | None) -> int | None:
    text = (value or "").strip()
    if not text:
        return None
    match = re.search(r"\d+", text)
    return int(match.group(0)) if match else None


def get_weight_band(weight: float | None) -> str:
    if weight is None:
        return "unknown"
    if weight < 1.9:
        return "light"
    if weight < 2.8:
        return "medium-light"
    if weight < 3.6:
        return "medium-heavy"
    return "heavy"


def get_time_band(minutes: int | None) -> str:
    if minutes is None:
        return "unknown"
    if minutes <= 30:
        return "quick"
    if minutes <= 60:
        return "standard"
    if minutes <= 120:
        return "extended"
    return "epic"


def get_player_band(min_players: int | None, max_players: int | None) -> str:
    if min_players is None or max_players is None:
        return "unknown"
    if min_players == 1 and max_players == 1:
        return "solo-only"
    if max_players == 2:
        return "duo"
    if max_players <= 4:
        return "small-group"
    if max_players <= 6:
        return "mid-group"
    return "large-group"


def get_language_key(value: str | None) -> str:
    text = (value or "").strip().lower()
    if not text:
        return "unknown"
    if "no necessary" in text:
        return "none"
    if "some necessary" in text:
        return "low"
    if "moderate" in text:
        return "moderate"
    if "extensive" in text:
        return "high"
    if "unplayable" in text:
        return "extreme"
    return "unknown"


def read_json_map(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    raw = path.read_text(encoding="utf-8").strip()
    if not raw:
        return {}
    parsed = json.loads(raw)
    return parsed if isinstance(parsed, dict) else {}


def resolve_bgg_token(explicit_token: str, token_path: Path) -> str:
    if explicit_token.strip():
        return explicit_token.strip()
    env_token = os.environ.get("BGG_TOKEN", "").strip()
    if env_token:
        return env_token
    if token_path.exists():
        file_token = token_path.read_text(encoding="utf-8").strip()
        if file_token:
            return file_token
    return ""


def unique_list(values: list[str]) -> list[str]:
    seen: set[str] = set()
    output: list[str] = []
    for value in values:
        if value and value not in seen:
            seen.add(value)
            output.append(value)
    return output


def normalize_for_search(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip().lower()


def new_search_tokens(game: dict[str, Any]) -> str:
    parts: list[str] = []
    for value in (
        game.get("name", ""),
        game.get("originalName", ""),
        game.get("notes", ""),
        game.get("summary", ""),
        game.get("description", ""),
        " ".join(game.get("categories", [])),
        " ".join(game.get("mechanics", [])),
        " ".join(game.get("tags", [])),
        " ".join(str(item) for item in game.get("recommendedPlayers", [])),
        " ".join(str(item) for item in game.get("bestPlayers", [])),
    ):
        if isinstance(value, str) and value.strip():
            parts.append(value)
    return normalize_for_search(" ".join(parts))


def request_text(url: str, headers: dict[str, str] | None = None) -> tuple[int, str]:
    request = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(request) as response:
        status = getattr(response, "status", response.getcode())
        payload = response.read().decode("utf-8", errors="replace")
        return status, payload


def invoke_bgg_thing_batch(ids: list[int], token: str) -> ET.Element:
    if not token or not ids:
        raise ValueError("A token and at least one id are required for BGG enrichment.")

    query = urllib.parse.urlencode({"id": ",".join(str(game_id) for game_id in ids), "stats": "1"})
    url = f"https://boardgamegeek.com/xmlapi2/thing?{query}"
    headers = {"Authorization": f"Bearer {token}"}

    for attempt in range(4):
        try:
            status, payload = request_text(url, headers=headers)
        except urllib.error.HTTPError as error:
            if error.code == 202:
                time.sleep(2 + attempt)
                continue
            raise
        if status == 202 or "queued" in payload.lower():
            time.sleep(2 + attempt)
            continue
        return ET.fromstring(payload)

    raise RuntimeError(f"BGG batch for ids '{','.join(str(value) for value in ids)}' did not become available in time.")


def get_local_image_path(image_url: str, game_id: int, images_directory: Path) -> Path:
    suffix = Path(urllib.parse.urlparse(image_url).path).suffix or ".jpg"
    return images_directory / f"{game_id}{suffix}"


def download_image_if_needed(image_url: str, game_id: int, images_directory: Path, token: str) -> Path:
    images_directory.mkdir(parents=True, exist_ok=True)
    local_path = get_local_image_path(image_url, game_id, images_directory)
    if local_path.exists():
        return local_path
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    request = urllib.request.Request(image_url, headers=headers)
    with urllib.request.urlopen(request) as response:
        local_path.write_bytes(response.read())
    time.sleep(0.25)
    return local_path


def get_link_values(item: ET.Element, link_type: str) -> list[str]:
    values: list[str] = []
    for link in item.findall(f"./link[@type='{link_type}']"):
        value = (link.attrib.get("value") or "").strip()
        if value:
            values.append(value)
    return unique_list(values)


def clean_description(raw: str) -> str:
    text = html.unescape(raw or "")
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"\[/?[^\]]+\]", " ", text)
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"</p\s*>", "\n\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", " ", text)
    paragraphs = []
    for chunk in re.split(r"\n\s*\n+", text):
        normalized = re.sub(r"\s+", " ", chunk).strip()
        if normalized:
            paragraphs.append(normalized)
    return "\n\n".join(paragraphs)


def sentence_split(text: str) -> list[str]:
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9\"'])", text)
    return [part.strip() for part in parts if part.strip()]


def paragraph_score(paragraph: str, game_name: str) -> int:
    normalized = paragraph.strip()
    lowered = normalized.lower()
    score = 0

    if not normalized:
        return -100
    if game_name and game_name.lower() in lowered:
        score += 4
    if re.search(r"\b(is|are|features|includes|simulates|uses|builds)\b", lowered):
        score += 2
    if re.search(r"\b(player|players|card game|board game|dice|tile|draft|co-operative|cooperative)\b", lowered):
        score += 2
    if normalized.startswith("Note:"):
        score -= 6
    if "description from the publisher" in lowered:
        score -= 8
    if re.search(r"[—–-]\s*[A-Z][A-Za-z .,'-]+$", normalized) and game_name.lower() not in lowered:
        score -= 5
    if is_list_intro(normalized):
        score -= 5
    if len(re.findall(r"[äöüÄÖÜß]", normalized)) >= 2:
        score -= 6
    if len(normalized) < 90:
        score -= 3
    return score


def is_list_intro(text: str) -> bool:
    lowered = text.strip().lower()
    return lowered.endswith(":") or any(
        lowered.endswith(ending)
        for ending in (
            "the three scenarios are",
            "the scenarios are",
            "there are three different kinds",
            "you'll find",
            "also features a new sixth action",
        )
    )


def truncate_sentences(text: str, max_chars: int) -> str:
    sentences = sentence_split(text)
    if not sentences:
        joined = text
        if len(text) > max_chars:
            truncated = text[:max_chars].rsplit(" ", 1)[0].rstrip(" ,;:-")
            joined = f"{truncated}..." if truncated else text[: max_chars - 3] + "..."
        if is_list_intro(joined):
            joined = joined.rstrip(":").rstrip()
        return joined

    chosen: list[str] = []
    total = 0
    for sentence in sentences:
        extra = len(sentence) + (1 if chosen else 0)
        if chosen and total + extra > max_chars:
            break
        if not chosen and len(sentence) > max_chars:
            return truncate_sentences(sentence, max_chars)
        chosen.append(sentence)
        total += extra
        if total >= int(max_chars * 0.75):
            break

    while len(chosen) > 1 and is_list_intro(chosen[-1]):
        chosen.pop()

    joined = " ".join(chosen).strip()
    if is_list_intro(joined):
        joined = re.sub(
            r"(the three scenarios are|the scenarios are|there are three different kinds|you'll find|also features a new sixth action)\s*:?\s*$",
            "",
            joined,
            flags=re.IGNORECASE,
        ).rstrip(" ,;:-")
    if len(joined) < len(text):
        return joined.rstrip(" ,;:-") + "..."
    return joined


def generate_summary(description: str, game_name: str = "", max_chars: int = 560) -> str:
    cleaned = clean_description(description)
    if not cleaned:
        return ""

    paragraphs = [paragraph.strip() for paragraph in cleaned.split("\n\n") if paragraph.strip()]
    if not paragraphs:
        return ""

    selected: list[str] = []
    total = 0

    ranked: list[tuple[int, int, str]] = []
    for index, paragraph in enumerate(paragraphs):
        normalized = re.sub(r"^\s*(overview|description|summary)\s*:\s*", "", paragraph, flags=re.IGNORECASE)
        if not normalized:
            continue
        ranked.append((paragraph_score(normalized, game_name), index, normalized))

    ranked.sort(key=lambda item: (-item[0], item[1]))
    chosen_indices = {index for score, index, _ in ranked[:4] if score >= 0}
    candidates = [text for _, index, text in ranked if index in chosen_indices]
    if not candidates:
        candidates = [text for _, _, text in ranked[:2]]

    for paragraph in candidates:
        paragraph = truncate_sentences(paragraph, max_chars)
        next_total = total + len(paragraph) + (2 if selected else 0)
        if selected and next_total > max_chars:
            break
        selected.append(paragraph)
        total = next_total
        if len(selected) == 2 or total >= int(max_chars * 0.8):
            break

    summary = "\n\n".join(selected).strip()
    if len(summary) > max_chars:
        summary = summary[: max_chars - 1].rstrip() + "..."
    return summary


def as_relative_image_path(downloaded_path: Path, output_path: Path) -> str:
    images_root = output_path.resolve().parent
    return Path(os.path.relpath(downloaded_path.resolve(), images_root)).as_posix()


def build_game_from_row(row: dict[str, str], name_overrides: dict[str, Any]) -> dict[str, Any]:
    min_players = to_nullable_int(row.get("minplayers"))
    max_players = to_nullable_int(row.get("maxplayers"))
    play_time = to_nullable_int(row.get("playingtime"))
    min_play_time = to_nullable_int(row.get("minplaytime"))
    max_play_time = to_nullable_int(row.get("maxplaytime"))
    avg_weight = to_nullable_float(row.get("avgweight"))
    average_rating = to_nullable_float(row.get("average"))
    bayes_average = to_nullable_float(row.get("baverage"))
    rank = to_nullable_int(row.get("rank"))
    year_published = to_nullable_int(row.get("yearpublished"))
    age = parse_age_value(row.get("bggrecagerange"))
    recommended_players = parse_players_list(row.get("bggrecplayers"))
    best_players = parse_players_list(row.get("bggbestplayers"))

    own = to_bool(row.get("own"))
    prev_owned = to_bool(row.get("prevowned"))
    for_trade = to_bool(row.get("fortrade"))
    want_to_play = to_bool(row.get("wanttoplay"))
    want_to_buy = to_bool(row.get("wanttobuy"))
    wishlist = to_bool(row.get("wishlist"))
    quantity = to_nullable_int(row.get("quantity"))

    note_candidates = [
        (row.get("privatecomment") or "").strip(),
        (row.get("comment") or "").strip(),
        (row.get("wishlistcomment") or "").strip(),
    ]
    notes = next((value for value in note_candidates if value), "")

    tags: list[str] = []
    if own:
        tags.append("owned")
    if prev_owned:
        tags.append("previously-owned")
    if for_trade:
        tags.append("for-trade")
    if want_to_play:
        tags.append("want-to-play")
    if want_to_buy:
        tags.append("want-to-buy")
    if wishlist:
        tags.append("wishlist")
    if min_players == 1:
        tags.append("solo")
    if max_players == 2:
        tags.append("two-player")
    if 2 in recommended_players or 2 in best_players:
        tags.append("great-at-2")
    if max_players is not None and max_players >= 6:
        tags.append("group")
    if play_time is not None and play_time <= 30:
        tags.append("quick")
    if play_time is not None and play_time > 120:
        tags.append("long")
    if avg_weight is not None and avg_weight >= 3.5:
        tags.append("heavy")
    elif avg_weight is not None and avg_weight <= 2.0:
        tags.append("light")
    if avg_weight is not None and avg_weight <= 2.2 and play_time is not None and play_time <= 60:
        tags.append("teaching-friendly")

    game_id = to_nullable_int(row.get("objectid"))
    game: dict[str, Any] = {
        "id": game_id,
        "collId": to_nullable_int(row.get("collid")),
        "name": row.get("objectname", ""),
        "originalName": row.get("originalname", ""),
        "nameOverrides": {"es": "", "en": ""},
        "type": row.get("objecttype", ""),
        "yearPublished": year_published,
        "minPlayers": min_players,
        "maxPlayers": max_players,
        "recommendedPlayers": recommended_players,
        "bestPlayers": best_players,
        "age": age,
        "ageText": row.get("bggrecagerange", ""),
        "playingTime": play_time,
        "minPlayTime": min_play_time,
        "maxPlayTime": max_play_time,
        "averageRating": average_rating,
        "bayesAverage": bayes_average,
        "rank": rank,
        "avgWeight": avg_weight,
        "weightBand": get_weight_band(avg_weight),
        "timeBand": get_time_band(play_time),
        "playerBand": get_player_band(min_players, max_players),
        "languageDependence": row.get("bgglanguagedependence", ""),
        "languageKey": get_language_key(row.get("bgglanguagedependence")),
        "quantity": quantity if quantity is not None else 1,
        "own": own,
        "prevOwned": prev_owned,
        "forTrade": for_trade,
        "wantToPlay": want_to_play,
        "wantToBuy": want_to_buy,
        "wishlist": wishlist,
        "versionNickname": row.get("version_nickname", ""),
        "versionPublishers": row.get("version_publishers", ""),
        "versionLanguages": row.get("version_languages", ""),
        "notes": notes,
        "summary": "",
        "description": "",
        "categories": [],
        "mechanics": [],
        "bggUrl": f"https://boardgamegeek.com/boardgame/{game_id}" if game_id else "",
        "thumbnailUrl": "",
        "imageUrl": "",
        "imageHint": f"{row.get('objectname', '')} ({year_published})" if year_published else row.get("objectname", ""),
        "tags": unique_list(tags),
        "searchText": "",
    }

    if game_id is not None:
        override_entry = name_overrides.get(str(game_id), {})
        if isinstance(override_entry, dict):
            game["nameOverrides"] = {
                "es": str(override_entry.get("es", "") or ""),
                "en": str(override_entry.get("en", "") or ""),
            }

    game["searchText"] = new_search_tokens(game)
    return game


def enrich_games(
    games_by_id: dict[int, dict[str, Any]],
    token: str,
    download_images: bool,
    images_directory: Path,
    output_path: Path,
) -> None:
    ids = sorted(games_by_id)
    for offset in range(0, len(ids), BGG_BATCH_SIZE):
        batch = ids[offset : offset + BGG_BATCH_SIZE]
        xml_root = invoke_bgg_thing_batch(batch, token)

        for item in xml_root.findall("./item"):
            item_id = to_nullable_int(item.attrib.get("id"))
            if item_id is None or item_id not in games_by_id:
                continue
            game = games_by_id[item_id]

            primary_name = next((node.attrib.get("value", "").strip() for node in item.findall("./name") if node.attrib.get("type") == "primary"), "")
            if primary_name:
                game["originalName"] = primary_name

            description = clean_description(item.findtext("./description", default=""))
            game["description"] = description
            game["summary"] = generate_summary(description, game.get("name", ""))
            game["thumbnailUrl"] = (item.findtext("./thumbnail", default="") or "").strip()
            game["imageUrl"] = (item.findtext("./image", default="") or "").strip() or game["thumbnailUrl"]
            game["categories"] = get_link_values(item, "boardgamecategory")
            game["mechanics"] = get_link_values(item, "boardgamemechanic")

            if download_images and game["imageUrl"] and game["id"] is not None:
                downloaded = download_image_if_needed(game["imageUrl"], int(game["id"]), images_directory, token)
                game["imageUrl"] = as_relative_image_path(downloaded, output_path)

            game["searchText"] = new_search_tokens(game)

        time.sleep(0.4)


def build_payload(rows: list[dict[str, str]], name_overrides: dict[str, Any], token: str, download_images: bool, images_directory: Path, output_path: Path) -> dict[str, Any]:
    games = [build_game_from_row(row, name_overrides) for row in rows]
    games_by_id = {game["id"]: game for game in games if game["id"] is not None}

    if token and games_by_id:
        enrich_games(games_by_id, token, download_images, images_directory, output_path)

    summary = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "count": len(games),
        "ownCount": sum(1 for row in rows if row.get("own") == "1"),
        "prevOwnedCount": sum(1 for row in rows if row.get("prevowned") == "1"),
        "recommendations": {
            "quick": sum(1 for game in games if game["timeBand"] == "quick"),
            "duo": sum(1 for game in games if 2 in game["bestPlayers"] or 2 in game["recommendedPlayers"]),
            "teachingFriendly": sum(1 for game in games if "teaching-friendly" in game["tags"]),
            "heavy": sum(1 for game in games if game["weightBand"] == "heavy"),
        },
    }

    return {"summary": summary, "games": games}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build the boardgame-library dataset from a BoardGameGeek collection CSV.")
    parser.add_argument("--csv-path", default="collection.csv")
    parser.add_argument("--output-path", default=str(DEFAULT_OUTPUT_PATH))
    parser.add_argument("--script-output-path", default=str(DEFAULT_SCRIPT_OUTPUT_PATH))
    parser.add_argument("--images-directory", default=str(DEFAULT_IMAGES_DIRECTORY))
    parser.add_argument("--name-overrides-path", default=str(DEFAULT_NAME_OVERRIDES_PATH))
    parser.add_argument("--bgg-token", default="")
    parser.add_argument("--download-images", action="store_true")
    return parser.parse_args()


def ensure_parent(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def main() -> int:
    args = parse_args()

    csv_path = Path(args.csv_path)
    output_path = Path(args.output_path)
    script_output_path = Path(args.script_output_path)
    images_directory = Path(args.images_directory)
    name_overrides_path = Path(args.name_overrides_path)

    if not csv_path.exists():
        print(f"CSV not found at {csv_path}. Pass --csv-path with the exported BoardGameGeek collection CSV.", file=sys.stderr)
        return 1

    token = resolve_bgg_token(args.bgg_token, DEFAULT_TOKEN_PATH)
    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))

    name_overrides = read_json_map(name_overrides_path)
    payload = build_payload(rows, name_overrides, token, args.download_images, images_directory, output_path)
    json_payload = json.dumps(payload, ensure_ascii=False, indent=2)

    ensure_parent(output_path)
    ensure_parent(script_output_path)
    output_path.write_text(json_payload, encoding="utf-8")
    script_output_path.write_text(f"window.__BGG_LIBRARY_DATA__ = {json_payload};", encoding="utf-8")

    print(f"Generated {len(payload['games'])} games into {output_path} and {script_output_path}")
    if not token:
        print("BGG enrichment skipped because no token was provided.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
