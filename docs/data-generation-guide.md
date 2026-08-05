# Data Generation And Update Guide

Status: Current operational reference  
Related docs: [app overview](./app-overview.md), [project README](../README.md)

## Purpose

This guide is the durable reference for people and agents updating the library data. The app is static: it never fetches BoardGameGeek (BGG) at runtime. Every collection, image, description, relationship, summary, and visible Spanish label is prepared before publishing.

## Source Of Truth

| Concern | Source | Notes |
| --- | --- | --- |
| Collection state, edition data, ownership | Current BGG collection CSV | Export this from BGG before a refresh. Do not treat `data/games.json` as the editable source. |
| Enrichment | BGG XML API | Requires a BGG token. Supplies descriptions, images, categories, mechanics, and expansion relations. |
| Spanish summaries and descriptions | `data/translations.json` | Reviewed text keyed by game id and field, protected by a source hash. |
| Spanish category and mechanic labels | `data/tag-translations.json` | BGG English values remain the internal key; this file controls the Spanish label shown in the UI. |
| Curated display names and covers | `data/name-overrides.json`, `data/image-overrides.json` | These win over data coming from BGG. |
| Runtime artifacts | `data/games.json`, `data/games-data.js` | Generated files. Do not edit them by hand. |

## Prerequisites

- Python 3
- A current BGG CSV export
- A BGG token for a complete enrichment refresh. The builder accepts it from `--bgg-token`, `BGG_TOKEN`, or the ignored `.bgg-token` file.
- Node.js dependencies and Playwright only when running visual tests.

## Standard Refresh Workflow

1. Export the current collection CSV from BGG.
2. Ensure `data/translations.json`, `data/tag-translations.json`, and optional override files are present.
3. Run a complete enriched build and export any translation work:

```bash
python3 scripts/build_data.py \
  --csv-path "/absolute/path/to/collection.csv" \
  --export-translation-work generated/translation-work.json \
  --export-tag-translation-work generated/tag-translation-work.json \
  --fail-on-missing-tag-translations
```

4. Read the final report. It includes counts for text translations and tag translations.
5. If work files contain items, complete the relevant translation workflow below, then run the command again.
6. Validate the result:

```bash
python3 -m unittest discover -s tests -p '*test.py'
npm run test:visual
```

## Text Translation Workflow

`generated/translation-work.json` contains summaries missing Spanish text or whose English source changed. An agent translating it must:

1. Use `source` as the factual authority; do not restore unsupported details from `previousTranslation`.
2. Write concise, neutral Rioplatense Spanish in `data/translations.json`.
3. Preserve the exported `sourceHash` exactly.
4. Use the key `<game-id>:summary` or `<game-id>:description`.
5. Rebuild to confirm the translation is applied.

Example entry:

```json
"173346:summary": {
  "sourceHash": "...",
  "es": "Resumen revisado en español."
}
```

The builder intentionally refuses a translation whose hash does not match the current English source. This means changed BGG copy becomes visible work instead of silently publishing stale Spanish text.

Descriptions are optional. By default, export work contains summaries only. Add `--include-descriptions` only when the description backlog is intentionally in scope.

## Tag Translation Workflow

Categories and mechanics use English BGG values internally so filters and shared URLs are stable. The UI translates only the displayed label in Spanish.

When BGG introduces a new category or mechanic, the strict build exits non-zero and writes it to `generated/tag-translation-work.json`. Add each translation to `data/tag-translations.json`:

```json
"Hand Management": "Gestión de mano"
```

Do not translate the key or replace it in a game record. The key is the BGG identifier used by filters; only the value is localized.

## Fast, Safe Checks

Use a limited build while diagnosing a specific game:

```bash
python3 scripts/build_data.py \
  --csv-path "/absolute/path/to/collection.csv" \
  --game-id 173346 \
  --output-path /tmp/games.json \
  --script-output-path /tmp/games-data.js
```

For a normal offline rebuild, omit the BGG token. Existing enrichment for matching game IDs is preserved, but a full token-backed refresh is preferred after collection changes so new games receive descriptions, images, and relationships.

## Common Failure Modes

| Symptom | Meaning | Resolution |
| --- | --- | --- |
| `CSV not found` | Wrong CSV path | Use an absolute path and quote paths containing spaces. |
| New game has no enrichment | Build ran without a BGG token | Provide a token and rebuild. |
| Text translation is marked stale | BGG English source changed | Review the exported work, update the Spanish text and source hash. |
| Strict tag build fails | BGG introduced a new category or mechanic | Translate every item in `generated/tag-translation-work.json`. |
| UI shows English tag in ES | Translation is absent from `tag-translations.json` | Add the exact BGG key, rebuild, and rerun the strict check. |

## Changes To Commit

Include intentional source and generated changes together:

- `data/translations.json` and/or `data/tag-translations.json`
- overrides, if changed
- `data/games.json` and `data/games-data.js`
- relevant builder, test, and documentation changes

Do not commit `.bgg-token` or temporary work files under `generated/`.
