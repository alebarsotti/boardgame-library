from __future__ import annotations

import argparse
import csv
import hashlib
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
DEFAULT_LOCALIZED_CACHE_PATH = PROJECT_ROOT / "generated" / "localized-content-cache.json"
DEFAULT_TOKEN_PATH = PROJECT_ROOT / ".bgg-token"
DEFAULT_OLLAMA_HOST = "http://127.0.0.1:11434"
DEFAULT_LOCALIZED_MODE = "off"
DEFAULT_FULL_MODEL = "qwen3:14b"
DEFAULT_LITE_MODEL = "qwen3:4b"
LOCALIZED_LANGUAGES = ("en", "es")
LOCALIZED_CACHE_VERSION = 1
LOCALIZED_SUMMARY_PROMPT_VERSION = "v1"
LOCALIZED_DESCRIPTION_PROMPT_VERSION = "v1"
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


def make_localized_text(en: str = "", es: str = "") -> dict[str, str]:
    return {"en": str(en or ""), "es": str(es or "")}


def normalize_localized_text(value: Any) -> dict[str, str]:
    if isinstance(value, str):
        return make_localized_text(en=value)
    if isinstance(value, dict):
        return make_localized_text(
            en=str(value.get("en", "") or ""),
            es=str(value.get("es", "") or ""),
        )
    return make_localized_text()


def get_localized_text(value: Any, language: str) -> str:
    return normalize_localized_text(value).get(language, "")


def iter_text_values(value: Any) -> list[str]:
    if isinstance(value, str):
        return [value] if value.strip() else []
    if isinstance(value, dict):
        return [text for text in normalize_localized_text(value).values() if text.strip()]
    return []


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
        parts.extend(iter_text_values(value))
    return normalize_for_search(" ".join(parts))


def request_text(url: str, headers: dict[str, str] | None = None, timeout: float = 30) -> tuple[int, str]:
    request = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        status = getattr(response, "status", response.getcode())
        payload = response.read().decode("utf-8", errors="replace")
        return status, payload


def request_json(
    url: str,
    *,
    method: str = "GET",
    payload: dict[str, Any] | None = None,
    headers: dict[str, str] | None = None,
    timeout: float = 30,
) -> Any:
    request_headers = {"Content-Type": "application/json", **(headers or {})}
    body = json.dumps(payload).encode("utf-8") if payload is not None else None
    request = urllib.request.Request(url, data=body, headers=request_headers, method=method)
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


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


def get_link_id_values(item: ET.Element, link_type: str, *, inbound: bool | None = None) -> list[int]:
    values: list[int] = []
    for link in item.findall(f"./link[@type='{link_type}']"):
        inbound_attr = (link.attrib.get("inbound") or "").strip().lower()
        is_inbound = inbound_attr == "true"
        if inbound is not None and is_inbound != inbound:
            continue
        value = to_nullable_int(link.attrib.get("id"))
        if value is not None and value not in values:
            values.append(value)
    return values


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


def normalize_generation_source(text: str) -> str:
    return clean_description(text).replace("\n\n", "\n").strip()


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


def trim_generated_text(text: str, max_chars: int) -> str:
    normalized = clean_description(text)
    if not normalized:
        return ""
    if len(normalized) <= max_chars:
        return normalized

    paragraphs = [paragraph.strip() for paragraph in normalized.split("\n\n") if paragraph.strip()]
    selected: list[str] = []
    total = 0
    for paragraph in paragraphs:
        candidate = truncate_sentences(paragraph, max_chars if not selected else max(120, max_chars - total - 2))
        next_total = total + len(candidate) + (2 if selected else 0)
        if selected and next_total > max_chars:
            break
        selected.append(candidate)
        total = next_total
        if total >= int(max_chars * 0.92):
            break
    output = "\n\n".join(selected).strip() or truncate_sentences(normalized, max_chars)
    if len(output) > max_chars:
        output = truncate_sentences(output, max_chars)
    return output


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
        "summary": make_localized_text(),
        "description": make_localized_text(),
        "categories": [],
        "mechanics": [],
        "bggItemType": "",
        "dependencyType": "",
        "requiresGameId": None,
        "requiresGameName": "",
        "expansionIds": [],
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
            game["description"] = make_localized_text(en=description)
            game["summary"] = make_localized_text(en=generate_summary(description, game.get("name", "")))
            game["thumbnailUrl"] = (item.findtext("./thumbnail", default="") or "").strip()
            game["imageUrl"] = (item.findtext("./image", default="") or "").strip() or game["thumbnailUrl"]
            game["categories"] = get_link_values(item, "boardgamecategory")
            game["mechanics"] = get_link_values(item, "boardgamemechanic")
            game["bggItemType"] = (item.attrib.get("type") or "").strip()

            if game["bggItemType"] == "boardgameexpansion":
                game["dependencyType"] = "expansion"

            inbound_base_ids = get_link_id_values(item, "boardgameexpansion", inbound=True)
            outbound_expansion_ids = get_link_id_values(item, "boardgameexpansion", inbound=False)

            if inbound_base_ids:
                game["dependencyType"] = "expansion"
                game["requiresGameId"] = inbound_base_ids[0]
                base_name = next(
                    (
                        (link.attrib.get("value") or "").strip()
                        for link in item.findall("./link[@type='boardgameexpansion']")
                        if (link.attrib.get("inbound") or "").strip().lower() == "true"
                        and to_nullable_int(link.attrib.get("id")) == inbound_base_ids[0]
                    ),
                    "",
                )
                game["requiresGameName"] = base_name

            if outbound_expansion_ids:
                game["expansionIds"] = outbound_expansion_ids

            if download_images and game["imageUrl"] and game["id"] is not None:
                downloaded = download_image_if_needed(game["imageUrl"], int(game["id"]), images_directory, token)
                game["imageUrl"] = as_relative_image_path(downloaded, output_path)

        time.sleep(0.4)

    for game_id, game in games_by_id.items():
        expansion_ids = [value for value in game.get("expansionIds", []) if value in games_by_id]
        game["expansionIds"] = expansion_ids

        requires_game_id = game.get("requiresGameId")
        if requires_game_id not in games_by_id:
            game["requiresGameId"] = None
        elif not game.get("requiresGameName"):
            game["requiresGameName"] = games_by_id[requires_game_id].get("originalName") or games_by_id[requires_game_id].get("name", "")

        if game.get("dependencyType") == "expansion" and game.get("requiresGameId") in games_by_id:
            base_game = games_by_id[game["requiresGameId"]]
            if game_id not in base_game["expansionIds"]:
                base_game["expansionIds"].append(game_id)

    for game in games_by_id.values():
        game["expansionIds"] = sorted(set(game.get("expansionIds", [])))


def ensure_deterministic_localized_content(game: dict[str, Any]) -> None:
    description = normalize_localized_text(game.get("description"))
    summary = normalize_localized_text(game.get("summary"))

    if description["en"] and not summary["en"]:
        summary["en"] = generate_summary(description["en"], game.get("name", ""))

    game["description"] = description
    game["summary"] = summary


def content_fingerprint(source_text: str, *, field: str, language: str, model: str, profile: str, prompt_version: str, parameters: dict[str, Any]) -> str:
    payload = json.dumps(
        {
            "source_hash": hashlib.sha256(source_text.encode("utf-8")).hexdigest(),
            "field": field,
            "language": language,
            "model": model,
            "profile": profile,
            "prompt_version": prompt_version,
            "parameters": parameters,
        },
        ensure_ascii=False,
        sort_keys=True,
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def load_localized_cache(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"version": LOCALIZED_CACHE_VERSION, "entries": {}}
    try:
        parsed = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {"version": LOCALIZED_CACHE_VERSION, "entries": {}}
    if not isinstance(parsed, dict):
        return {"version": LOCALIZED_CACHE_VERSION, "entries": {}}
    entries = parsed.get("entries", {})
    return {
        "version": parsed.get("version", LOCALIZED_CACHE_VERSION),
        "entries": entries if isinstance(entries, dict) else {},
    }


def save_localized_cache(path: Path, cache: dict[str, Any]) -> None:
    ensure_parent(path)
    path.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")


def cache_key(game_id: int, field: str, language: str) -> str:
    return f"{game_id}:{field}:{language}"


def warn(message: str) -> None:
    print(f"Warning: {message}", file=sys.stderr)


class LocalizedGenerationFailure(RuntimeError):
    pass


class OllamaClient:
    def __init__(self, host: str, timeout_seconds: float) -> None:
        self.host = host.rstrip("/")
        self.timeout_seconds = timeout_seconds

    def list_models(self) -> list[str]:
        payload = request_json(f"{self.host}/api/tags", timeout=self.timeout_seconds)
        models = payload.get("models", []) if isinstance(payload, dict) else []
        names: list[str] = []
        for entry in models:
            if isinstance(entry, dict):
                name = str(entry.get("name", "") or "").strip()
                if name:
                    names.append(name)
        return names

    def generate_json(self, *, model: str, prompt: str, options: dict[str, Any]) -> dict[str, Any]:
        payload = request_json(
            f"{self.host}/api/generate",
            method="POST",
            payload={
                "model": model,
                "prompt": prompt,
                "stream": False,
                "format": "json",
                "options": options,
            },
            timeout=self.timeout_seconds,
        )
        response_text = str(payload.get("response", "") or "").strip() if isinstance(payload, dict) else ""
        if not response_text and isinstance(payload, dict):
            # Some local models expose the structured answer in `thinking` even when
            # `response` is empty. Accept that payload so lighter Qwen variants work.
            response_text = str(payload.get("thinking", "") or "").strip()
        if not response_text:
            raise LocalizedGenerationFailure("Ollama returned an empty response.")
        try:
            parsed = json.loads(response_text)
        except json.JSONDecodeError as error:
            raise LocalizedGenerationFailure(f"Ollama returned invalid JSON: {error}") from error
        if not isinstance(parsed, dict):
            raise LocalizedGenerationFailure("Ollama returned JSON that was not an object.")
        return parsed


def get_profile_defaults(mode: str) -> dict[str, Any]:
    if mode == "local-full":
        return {
            "model": DEFAULT_FULL_MODEL,
            "summary_max_chars": 380,
            "description_max_chars": 1200,
            "options": {"temperature": 0.2},
            "supports_long_descriptions": True,
        }
    return {
        "model": DEFAULT_LITE_MODEL,
        "summary_max_chars": 280,
        "description_max_chars": 780,
        "options": {"temperature": 0.2},
        "supports_long_descriptions": True,
    }


def get_ollama_host(explicit_host: str) -> str:
    if explicit_host.strip():
        return explicit_host.strip()
    env_host = os.environ.get("OLLAMA_HOST", "").strip()
    if env_host:
        return env_host
    return DEFAULT_OLLAMA_HOST


def build_summary_prompt(game: dict[str, Any], source_description: str, max_chars: int) -> str:
    return f"""
You are writing structured board game catalog copy.

Return valid JSON only with this exact shape:
{{
  "summary": {{
    "en": "string",
    "es": "string"
  }}
}}

Requirements:
- Use only details supported by the source text.
- Write concise, natural catalog summaries.
- Keep each summary under {max_chars} characters.
- English should read like polished product copy, not marketing hype.
- Spanish should be natural rioplatense-neutral product Spanish.
- Do not mention that this was translated or generated.
- Do not include markdown.

Game:
- Name: {game.get("name", "")}
- Original name: {game.get("originalName", "")}
- Year: {game.get("yearPublished", "")}
- Categories: {", ".join(game.get("categories", []))}
- Mechanics: {", ".join(game.get("mechanics", []))}

Source description:
{source_description}
""".strip()


def build_description_prompt(game: dict[str, Any], source_description: str, max_chars: int) -> str:
    return f"""
You are writing structured board game catalog copy.

Return valid JSON only with this exact shape:
{{
  "description": {{
    "en": "string",
    "es": "string"
  }}
}}

Requirements:
- Use only details supported by the source text.
- Rewrite the source into a clearer, better-organized description.
- Preserve key gameplay and victory details when present.
- Keep each description under {max_chars} characters.
- English should be polished and readable.
- Spanish should be natural, clear, and faithful to the same content.
- Do not invent rules, awards, or opinions.
- Do not include markdown.

Game:
- Name: {game.get("name", "")}
- Original name: {game.get("originalName", "")}
- Year: {game.get("yearPublished", "")}
- Categories: {", ".join(game.get("categories", []))}
- Mechanics: {", ".join(game.get("mechanics", []))}

Source description:
{source_description}
""".strip()


def validate_localized_pair(payload: dict[str, Any], key: str, max_chars: int) -> dict[str, str]:
    node = payload.get(key)
    if not isinstance(node, dict):
        raise LocalizedGenerationFailure(f"Missing '{key}' object in model response.")
    output = make_localized_text()
    for language in LOCALIZED_LANGUAGES:
        text = str(node.get(language, "") or "").strip()
        if not text:
            raise LocalizedGenerationFailure(f"Missing '{key}.{language}' in model response.")
        output[language] = trim_generated_text(text, max_chars)
        if not output[language]:
            raise LocalizedGenerationFailure(f"Generated '{key}.{language}' was empty after normalization.")
    return output


def invoke_with_retries(callback: Any, *, retries: int) -> Any:
    last_error: Exception | None = None
    for _ in range(retries + 1):
        try:
            return callback()
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, LocalizedGenerationFailure, json.JSONDecodeError) as error:
            last_error = error
    if last_error is None:
        raise LocalizedGenerationFailure("Localized generation failed without an error.")
    raise LocalizedGenerationFailure(str(last_error)) from last_error


def populate_from_cache(
    game: dict[str, Any],
    *,
    cache: dict[str, Any],
    game_id: int,
    field: str,
    fingerprints: dict[str, str],
) -> set[str]:
    resolved: set[str] = set()
    node = normalize_localized_text(game.get(field))
    entries = cache.get("entries", {})
    for language in LOCALIZED_LANGUAGES:
        entry = entries.get(cache_key(game_id, field, language))
        if (
            isinstance(entry, dict)
            and entry.get("fingerprint") == fingerprints[language]
            and isinstance(entry.get("content"), str)
            and entry["content"].strip()
        ):
            node[language] = entry["content"].strip()
            resolved.add(language)
    game[field] = node
    return resolved


def update_cache_entries(
    cache: dict[str, Any],
    *,
    game_id: int,
    field: str,
    values: dict[str, str],
    fingerprints: dict[str, str],
    model: str,
    profile: str,
    prompt_version: str,
    parameters: dict[str, Any],
    source_text: str,
) -> None:
    entries = cache.setdefault("entries", {})
    generated_at = time.strftime("%Y-%m-%dT%H:%M:%S")
    source_hash = hashlib.sha256(source_text.encode("utf-8")).hexdigest()
    for language in LOCALIZED_LANGUAGES:
        entries[cache_key(game_id, field, language)] = {
            "content": values.get(language, ""),
            "fingerprint": fingerprints[language],
            "sourceHash": source_hash,
            "field": field,
            "language": language,
            "model": model,
            "profile": profile,
            "promptVersion": prompt_version,
            "parameters": parameters,
            "generatedAt": generated_at,
        }


def apply_localized_content(
    games: list[dict[str, Any]],
    *,
    mode: str,
    model: str,
    cache_path: Path,
    refresh_cache: bool,
    skip_long_descriptions: bool,
    ollama_host: str,
    ollama_timeout_seconds: float,
    fail_on_error: bool,
) -> None:
    if mode == "off":
        return

    profile_defaults = get_profile_defaults(mode)
    resolved_model = model or profile_defaults["model"]
    generation_options = dict(profile_defaults["options"])
    profile = mode

    try:
        client = OllamaClient(ollama_host, ollama_timeout_seconds)
        model_names = client.list_models()
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, json.JSONDecodeError) as error:
        message = f"localized content generation skipped because Ollama is not available at {ollama_host}: {error}"
        if fail_on_error:
            raise LocalizedGenerationFailure(message) from error
        warn(message)
        return

    if resolved_model not in model_names:
        message = (
            f"localized content generation skipped because model '{resolved_model}' is not installed in Ollama. "
            f"Run: ollama pull {resolved_model}"
        )
        if fail_on_error:
            raise LocalizedGenerationFailure(message)
        warn(message)
        return

    cache = load_localized_cache(cache_path)
    cache_changed = False

    for game in games:
        game_id = game.get("id")
        if game_id is None:
            continue

        ensure_deterministic_localized_content(game)
        source_description = normalize_generation_source(get_localized_text(game.get("description"), "en"))
        if not source_description:
            continue

        summary_fingerprints = {
            language: content_fingerprint(
                source_description,
                field="summary",
                language=language,
                model=resolved_model,
                profile=profile,
                prompt_version=LOCALIZED_SUMMARY_PROMPT_VERSION,
                parameters={
                    **generation_options,
                    "summary_max_chars": profile_defaults["summary_max_chars"],
                },
            )
            for language in LOCALIZED_LANGUAGES
        }
        description_fingerprints = {
            language: content_fingerprint(
                source_description,
                field="description",
                language=language,
                model=resolved_model,
                profile=profile,
                prompt_version=LOCALIZED_DESCRIPTION_PROMPT_VERSION,
                parameters={
                    **generation_options,
                    "description_max_chars": profile_defaults["description_max_chars"],
                },
            )
            for language in LOCALIZED_LANGUAGES
        }

        if refresh_cache:
            cached_summary_languages: set[str] = set()
            cached_description_languages: set[str] = set()
        else:
            cached_summary_languages = populate_from_cache(game, cache=cache, game_id=int(game_id), field="summary", fingerprints=summary_fingerprints)
            cached_description_languages = populate_from_cache(game, cache=cache, game_id=int(game_id), field="description", fingerprints=description_fingerprints)

        if cached_summary_languages != set(LOCALIZED_LANGUAGES):
            try:
                summary_payload = invoke_with_retries(
                    lambda: client.generate_json(
                        model=resolved_model,
                        prompt=build_summary_prompt(game, source_description, profile_defaults["summary_max_chars"]),
                        options=generation_options,
                    ),
                    retries=1,
                )
                summary_values = validate_localized_pair(summary_payload, "summary", profile_defaults["summary_max_chars"])
                summary_node = normalize_localized_text(game.get("summary"))
                summary_node.update(summary_values)
                game["summary"] = summary_node
                update_cache_entries(
                    cache,
                    game_id=int(game_id),
                    field="summary",
                    values=summary_values,
                    fingerprints=summary_fingerprints,
                    model=resolved_model,
                    profile=profile,
                    prompt_version=LOCALIZED_SUMMARY_PROMPT_VERSION,
                    parameters={**generation_options, "summary_max_chars": profile_defaults["summary_max_chars"]},
                    source_text=source_description,
                )
                cache_changed = True
            except LocalizedGenerationFailure as error:
                message = f"summary generation failed for game {game_id} ({game.get('name', '')}): {error}"
                if fail_on_error:
                    raise LocalizedGenerationFailure(message) from error
                warn(message)

        if skip_long_descriptions:
            continue

        if cached_description_languages != set(LOCALIZED_LANGUAGES):
            try:
                description_payload = invoke_with_retries(
                    lambda: client.generate_json(
                        model=resolved_model,
                        prompt=build_description_prompt(game, source_description, profile_defaults["description_max_chars"]),
                        options=generation_options,
                    ),
                    retries=1,
                )
                description_values = validate_localized_pair(description_payload, "description", profile_defaults["description_max_chars"])
                description_node = normalize_localized_text(game.get("description"))
                description_node.update(description_values)
                game["description"] = description_node
                update_cache_entries(
                    cache,
                    game_id=int(game_id),
                    field="description",
                    values=description_values,
                    fingerprints=description_fingerprints,
                    model=resolved_model,
                    profile=profile,
                    prompt_version=LOCALIZED_DESCRIPTION_PROMPT_VERSION,
                    parameters={**generation_options, "description_max_chars": profile_defaults["description_max_chars"]},
                    source_text=source_description,
                )
                cache_changed = True
            except LocalizedGenerationFailure as error:
                message = f"description generation failed for game {game_id} ({game.get('name', '')}): {error}"
                if fail_on_error:
                    raise LocalizedGenerationFailure(message) from error
                warn(message)

    if cache_changed:
        save_localized_cache(cache_path, cache)


def build_payload(
    rows: list[dict[str, str]],
    name_overrides: dict[str, Any],
    token: str,
    download_images: bool,
    images_directory: Path,
    output_path: Path,
    *,
    localized_mode: str,
    local_model: str,
    localized_cache_path: Path,
    refresh_localized_content: bool,
    skip_long_descriptions: bool,
    ollama_host: str,
    ollama_timeout_seconds: float,
    fail_on_localized_generation_error: bool,
) -> dict[str, Any]:
    games = [build_game_from_row(row, name_overrides) for row in rows]
    games_by_id = {game["id"]: game for game in games if game["id"] is not None}

    if token and games_by_id:
        enrich_games(games_by_id, token, download_images, images_directory, output_path)

    for game in games:
        ensure_deterministic_localized_content(game)

    apply_localized_content(
        games,
        mode=localized_mode,
        model=local_model,
        cache_path=localized_cache_path,
        refresh_cache=refresh_localized_content,
        skip_long_descriptions=skip_long_descriptions,
        ollama_host=ollama_host,
        ollama_timeout_seconds=ollama_timeout_seconds,
        fail_on_error=fail_on_localized_generation_error,
    )

    for game in games:
        ensure_deterministic_localized_content(game)
        game["searchText"] = new_search_tokens(game)

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
        "localizedContent": {
            "mode": localized_mode,
            "model": local_model or get_profile_defaults(localized_mode).get("model", "") if localized_mode != "off" else "",
            "cachePath": str(localized_cache_path) if localized_mode != "off" else "",
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
    parser.add_argument("--localized-cache-path", default=str(DEFAULT_LOCALIZED_CACHE_PATH))
    parser.add_argument("--bgg-token", default="")
    parser.add_argument("--download-images", action="store_true")
    parser.add_argument("--localized-content-mode", choices=["off", "local-full", "local-lite"], default=DEFAULT_LOCALIZED_MODE)
    parser.add_argument("--local-model", default="")
    parser.add_argument("--refresh-localized-content", action="store_true")
    parser.add_argument("--skip-long-descriptions", action="store_true")
    parser.add_argument("--ollama-host", default="")
    parser.add_argument("--ollama-timeout-seconds", type=float, default=60)
    parser.add_argument("--fail-on-localized-generation-error", action="store_true")
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
    localized_cache_path = Path(args.localized_cache_path)
    localized_mode = args.localized_content_mode
    resolved_ollama_host = get_ollama_host(args.ollama_host)

    if not csv_path.exists():
        print(f"CSV not found at {csv_path}. Pass --csv-path with the exported BoardGameGeek collection CSV.", file=sys.stderr)
        return 1

    token = resolve_bgg_token(args.bgg_token, DEFAULT_TOKEN_PATH)
    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))

    name_overrides = read_json_map(name_overrides_path)
    try:
        payload = build_payload(
            rows,
            name_overrides,
            token,
            args.download_images,
            images_directory,
            output_path,
            localized_mode=localized_mode,
            local_model=args.local_model,
            localized_cache_path=localized_cache_path,
            refresh_localized_content=args.refresh_localized_content,
            skip_long_descriptions=args.skip_long_descriptions,
            ollama_host=resolved_ollama_host,
            ollama_timeout_seconds=args.ollama_timeout_seconds,
            fail_on_localized_generation_error=args.fail_on_localized_generation_error,
        )
    except LocalizedGenerationFailure as error:
        print(str(error), file=sys.stderr)
        return 1

    json_payload = json.dumps(payload, ensure_ascii=False, indent=2)

    ensure_parent(output_path)
    ensure_parent(script_output_path)
    output_path.write_text(json_payload, encoding="utf-8")
    script_output_path.write_text(f"window.__BGG_LIBRARY_DATA__ = {json_payload};", encoding="utf-8")

    print(f"Generated {len(payload['games'])} games into {output_path} and {script_output_path}")
    if not token:
        print("BGG enrichment skipped because no token was provided.")
    if localized_mode == "off":
        print("Localized content generation skipped because --localized-content-mode=off.")
    else:
        print(
            "Localized content mode: "
            f"{localized_mode} using model '{payload['summary']['localizedContent'].get('model', '')}' "
            f"with cache at {localized_cache_path}"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
