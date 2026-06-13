import unittest
from pathlib import Path

from scripts.build_data import (
    apply_image_overrides,
    build_payload,
    hydrate_localized_content_from_cache,
    normalize_image_override_value,
    save_localized_cache,
)


class ImageOverrideSupportTests(unittest.TestCase):
    def test_normalize_image_override_value_accepts_remote_url(self):
        value = "https://example.com/covers/game.jpg"
        self.assertEqual(normalize_image_override_value(value), value)

    def test_normalize_image_override_value_accepts_relative_local_path(self):
        self.assertEqual(
            normalize_image_override_value("./assets/custom-cover.png"),
            "assets/custom-cover.png",
        )

    def test_normalize_image_override_value_rejects_absolute_local_path(self):
        self.assertEqual(normalize_image_override_value("/tmp/custom-cover.png"), "")

    def test_apply_image_overrides_wins_over_existing_image_url(self):
        games = [{"id": 42, "imageUrl": "https://example.com/original.jpg"}]
        apply_image_overrides(games, {"42": "https://example.com/override.jpg"})
        self.assertEqual(games[0]["imageUrl"], "https://example.com/override.jpg")

    def test_build_payload_applies_image_override_without_bgg_token(self):
        rows = [
            {
                "objectid": "42",
                "objectname": "Sample Game",
                "originalname": "",
                "minplayers": "1",
                "maxplayers": "4",
                "playingtime": "30",
                "minplaytime": "30",
                "maxplaytime": "30",
                "avgweight": "2.1",
                "average": "7.2",
                "baverage": "6.8",
                "rank": "123",
                "yearpublished": "2020",
                "bggrecagerange": "10+",
                "bggrecplayers": "2,3,4",
                "bggbestplayers": "2,3",
                "own": "1",
                "prevowned": "0",
                "fortrade": "0",
                "wanttoplay": "0",
                "wanttobuy": "0",
                "wishlist": "0",
                "quantity": "1",
                "privatecomment": "",
                "comment": "",
                "wishlistcomment": "",
                "bgglanguagedependence": "No necessary in-game text",
                "acquisitiondate": "",
                "version_nickname": "",
                "version_publishers": "",
                "version_languages": "Spanish",
                "objecttype": "thing",
                "collid": "1",
            }
        ]
        payload = build_payload(
            rows,
            {},
            {"42": {"imageUrl": "assets/custom-cover.png"}},
            "",
            False,
            Path("data/images"),
            Path("data/games.json"),
            None,
            localized_mode="off",
            local_model="",
            localized_cache_path=Path("generated/localized-content-cache.json"),
            refresh_localized_content=False,
            skip_long_descriptions=True,
            ollama_host="http://127.0.0.1:11434",
            ollama_timeout_seconds=60,
            fail_on_localized_generation_error=False,
        )
        self.assertEqual(payload["games"][0]["imageUrl"], "assets/custom-cover.png")

    def test_hydrate_localized_content_from_cache_populates_summary_in_off_mode(self):
        cache_path = Path("generated/test-localized-cache.json")
        save_localized_cache(
            cache_path,
            {
                "version": 1,
                "entries": {
                    "42:summary:en": {
                        "content": "English summary",
                        "fingerprint": "",
                    },
                    "42:summary:es": {
                        "content": "Resumen en espanol",
                        "fingerprint": "",
                    },
                },
            },
        )
        try:
            games = [
                {
                    "id": 42,
                    "name": "Sample Game",
                    "summary": {"en": "English summary", "es": ""},
                    "description": {"en": "", "es": ""},
                }
            ]
            hydrate_localized_content_from_cache(
                games,
                cache_path=cache_path,
                skip_long_descriptions=True,
            )
            self.assertEqual(games[0]["summary"]["es"], "Resumen en espanol")
        finally:
            if cache_path.exists():
                cache_path.unlink()


if __name__ == "__main__":
    unittest.main()
