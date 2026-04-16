from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path
from typing import Any

from build_data import (
    DEFAULT_LOCALIZED_CACHE_PATH,
    DEFAULT_NAME_OVERRIDES_PATH,
    DEFAULT_TOKEN_PATH,
    build_payload,
    get_ollama_host,
    read_json_map,
    resolve_bgg_token,
    select_rows,
)


DEFAULT_SAMPLE_GAME_IDS = [173346, 15987, 230802]
SECTION_WIDTH = 88


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run a narrow localized-content evaluation and print side-by-side catalog output for selected games."
    )
    parser.add_argument("--csv-path", default="collection.csv")
    parser.add_argument("--name-overrides-path", default=str(DEFAULT_NAME_OVERRIDES_PATH))
    parser.add_argument("--localized-cache-path", default=str(DEFAULT_LOCALIZED_CACHE_PATH))
    parser.add_argument("--bgg-token", default="")
    parser.add_argument("--game-id", type=int, action="append", default=[])
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--localized-content-mode", choices=["local"], default="local")
    parser.add_argument("--local-model", default="")
    parser.add_argument("--refresh-localized-content", action="store_true")
    parser.add_argument("--include-long-descriptions", action="store_true")
    parser.add_argument("--ollama-host", default="")
    parser.add_argument("--ollama-timeout-seconds", type=float, default=60)
    parser.add_argument("--fail-on-localized-generation-error", action="store_true")
    return parser.parse_args()


def divider(label: str = "") -> str:
    if not label:
        return "=" * SECTION_WIDTH
    text = f" {label} "
    edge = max(4, (SECTION_WIDTH - len(text)) // 2)
    return f"{'=' * edge}{text}{'=' * edge}"


def print_block(label: str, value: str) -> None:
    print(divider(label))
    print((value or "").strip() or "[empty]")
    print()


def build_selected_payload(
    rows: list[dict[str, str]],
    *,
    name_overrides: dict[str, Any],
    token: str,
    localized_mode: str,
    local_model: str,
    localized_cache_path: Path,
    refresh_localized_content: bool,
    skip_long_descriptions: bool,
    ollama_host: str,
    ollama_timeout_seconds: float,
    fail_on_localized_generation_error: bool,
) -> dict[str, Any]:
    return build_payload(
        rows,
        name_overrides,
        token,
        False,
        Path("data/images"),
        Path("data/games.json"),
        localized_mode=localized_mode,
        local_model=local_model,
        localized_cache_path=localized_cache_path,
        refresh_localized_content=refresh_localized_content,
        skip_long_descriptions=skip_long_descriptions,
        ollama_host=ollama_host,
        ollama_timeout_seconds=ollama_timeout_seconds,
        fail_on_localized_generation_error=fail_on_localized_generation_error,
    )


def main() -> int:
    args = parse_args()

    csv_path = Path(args.csv_path)
    name_overrides_path = Path(args.name_overrides_path)
    localized_cache_path = Path(args.localized_cache_path)
    resolved_ollama_host = get_ollama_host(args.ollama_host)

    if not csv_path.exists():
        print(f"CSV not found at {csv_path}. Pass --csv-path with the exported BoardGameGeek collection CSV.", file=sys.stderr)
        return 1

    token = resolve_bgg_token(args.bgg_token, DEFAULT_TOKEN_PATH)
    if not token:
        print("A BGG token is required for evaluation because source descriptions are fetched during enrichment.", file=sys.stderr)
        return 1

    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        all_rows = list(csv.DictReader(handle))

    requested_ids = args.game_id or DEFAULT_SAMPLE_GAME_IDS
    try:
        rows = select_rows(all_rows, game_ids=requested_ids, limit=args.limit)
    except ValueError as error:
        print(str(error), file=sys.stderr)
        return 1

    name_overrides = read_json_map(name_overrides_path)

    source_payload = build_selected_payload(
        rows,
        name_overrides=name_overrides,
        token=token,
        localized_mode="off",
        local_model="",
        localized_cache_path=localized_cache_path,
        refresh_localized_content=False,
        skip_long_descriptions=not args.include_long_descriptions,
        ollama_host=resolved_ollama_host,
        ollama_timeout_seconds=args.ollama_timeout_seconds,
        fail_on_localized_generation_error=False,
    )
    localized_payload = build_selected_payload(
        rows,
        name_overrides=name_overrides,
        token=token,
        localized_mode=args.localized_content_mode,
        local_model=args.local_model,
        localized_cache_path=localized_cache_path,
        refresh_localized_content=args.refresh_localized_content,
        skip_long_descriptions=not args.include_long_descriptions,
        ollama_host=resolved_ollama_host,
        ollama_timeout_seconds=args.ollama_timeout_seconds,
        fail_on_localized_generation_error=args.fail_on_localized_generation_error,
    )

    source_games = {game["id"]: game for game in source_payload["games"] if game.get("id") is not None}
    localized_games = {game["id"]: game for game in localized_payload["games"] if game.get("id") is not None}

    model_label = localized_payload["summary"]["localizedContent"].get("model", "")
    print(divider("Localized Content Evaluation"))
    print(f"Games: {len(rows)}")
    print(f"Mode: {args.localized_content_mode}")
    print(f"Model: {model_label or '[default profile model]'}")
    print(f"Ollama host: {resolved_ollama_host}")
    print(f"Include long descriptions: {'yes' if args.include_long_descriptions else 'no'}")
    print()

    for row in rows:
        game_id = int(row["objectid"])
        source_game = source_games.get(game_id)
        localized_game = localized_games.get(game_id)
        if not source_game or not localized_game:
            continue

        print(divider(f"{localized_game.get('name', '')} [{game_id}]"))
        print_block("Source Summary (EN)", source_game.get("summary", {}).get("en", ""))
        print_block("Source Description (EN)", source_game.get("description", {}).get("en", ""))
        print_block("Generated Summary (EN)", localized_game.get("summary", {}).get("en", ""))
        print_block("Generated Summary (ES)", localized_game.get("summary", {}).get("es", ""))
        print_block("Generated Description (EN)", localized_game.get("description", {}).get("en", ""))
        print_block("Generated Description (ES)", localized_game.get("description", {}).get("es", ""))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
