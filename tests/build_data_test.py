import hashlib
import json
import tempfile
import unittest
from pathlib import Path

from scripts.build_data import (
    apply_image_overrides,
    apply_translations,
    build_translation_work,
    get_tag_translation_work,
    load_tag_translations,
    normalize_image_override_value,
    source_text_hash,
)


class BuildDataTests(unittest.TestCase):
    def test_normalize_image_override_value_accepts_relative_local_path(self):
        self.assertEqual(normalize_image_override_value("./assets/custom-cover.png"), "assets/custom-cover.png")

    def test_apply_image_overrides_wins_over_existing_image_url(self):
        games = [{"id": 42, "imageUrl": "https://example.com/original.jpg"}]
        apply_image_overrides(games, {"42": "https://example.com/override.jpg"})
        self.assertEqual(games[0]["imageUrl"], "https://example.com/override.jpg")

    def test_translation_is_applied_when_source_hash_matches(self):
        source = "An English summary."
        games = [{"id": 42, "summary": {"en": source, "es": ""}, "description": {"en": "", "es": ""}}]
        entries = {"42:summary": {"sourceHash": source_text_hash(source), "es": "Un resumen en español."}}
        report = apply_translations(games, entries)
        self.assertEqual(games[0]["summary"]["es"], "Un resumen en español.")
        self.assertEqual(report["applied"], 1)

    def test_translation_is_not_applied_when_source_hash_is_stale(self):
        games = [{"id": 42, "summary": {"en": "New source", "es": ""}, "description": {"en": "", "es": ""}}]
        report = apply_translations(games, {"42:summary": {"sourceHash": hashlib.sha256(b"old").hexdigest(), "es": "Vieja"}})
        self.assertEqual(games[0]["summary"]["es"], "")
        self.assertEqual(report["stale"], 1)

    def test_translation_work_exports_missing_and_stale_entries(self):
        games = [{"id": 42, "name": "Sample", "originalName": "", "summary": {"en": "Source", "es": ""}, "description": {"en": "Long source", "es": ""}}]
        work = build_translation_work(games, {"42:summary": {"sourceHash": "old", "es": "Vieja"}}, include_descriptions=False)
        self.assertEqual(len(work["items"]), 1)
        self.assertEqual(work["items"][0]["previousTranslation"], "Vieja")
        self.assertEqual(work["items"][0]["sourceHash"], source_text_hash("Source"))

    def test_tag_translation_report_detects_missing_category_and_mechanic(self):
        games = [{"categories": ["Card Game"], "mechanics": ["Hand Management", "Drafting"]}]
        report, missing = get_tag_translation_work(games, {"Card Game": "Juego de cartas", "Hand Management": "Gestión de mano"})
        self.assertEqual(report, {"total": 3, "translated": 2, "missing": 1})
        self.assertEqual(missing, [{"tag": "Drafting", "types": ["mechanic"]}])

    def test_tag_translations_require_the_current_version(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "tags.json"
            path.write_text(json.dumps({"version": 0, "entries": {"Card Game": "Juego de cartas"}}), encoding="utf-8")
            with self.assertRaises(ValueError):
                load_tag_translations(path)


if __name__ == "__main__":
    unittest.main()
