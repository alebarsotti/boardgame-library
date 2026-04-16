# Localized Content Handoff

Status: Working notes
Related docs: 07-spec-ai-assisted-localized-content.md, README.md

## What Landed

- `scripts/build_data.py` now supports local-first localized generation through Ollama.
- `scripts/build_data.py` now also supports narrow evaluation runs with:
  - `--limit`
  - repeatable `--game-id`
- The generated dataset supports:
  - `summary: { en, es }`
  - `description: { en, es }`
- The frontend in `app.js` now reads localized content with fallback order:
  1. `notes`
  2. current UI language
  3. English
  4. alternate localized field when needed
- Legacy datasets with string `summary` / `description` are still accepted.
- Localized cache is stored outside `data/` under `generated/` and ignored by Git.
- `scripts/evaluate_localized_content.py` now prints side-by-side source vs generated bilingual content for a small sample or selected ids.

## What Was Verified On The Mac

- `ollama` is installed and responding locally.
- `qwen3:4b` is installed and reachable through the script.
- The Ollama integration needed one compatibility fix:
  - some Qwen responses place JSON output in `thinking` while `response` is empty
  - the script now accepts that format
- Build/test validation completed:
  - `python3 -m py_compile scripts/build_data.py`
  - `npm run test:visual`
  - tolerant warning path when Ollama is unavailable
  - strict failure path with `--fail-on-localized-generation-error`

## Important Findings

- On the MacBook Pro M1 with 16 GB RAM, `qwen3:4b` works but is too slow for comfortable batch evaluation.
- The model appears usable for `summary.en/es` validation.
- For long `description.en/es`, quality and speed are not strong enough to make this machine the primary generation environment.
- A direct sample on existing enriched data showed:
  - usable bilingual summaries
  - weaker bilingual long descriptions
  - at least one fidelity issue/typo in Spanish (`7 Wens` while processing `7 Wonders Duel`)

## Recommended Next Steps On The Desktop

Use the Windows desktop as the primary evaluation machine.

Suggested workflow:

1. Install Ollama and keep one primary local model for the localized build workflow.
2. Use very small batches as the default operating pattern:
   - `--limit 1`
   - `--limit 2`
   - or explicit `--game-id`
3. Evaluate a very small fixed sample before large runs:
   - `7 Wonders Duel`
   - `Arkham Horror`
   - `Azul`
4. Compare:
   - latency per title
   - `summary.en`
   - `summary.es`
   - `description.en`
   - `description.es`
   - factual fidelity vs BGG text
5. Keep bilingual long descriptions as an explicit opt-in path, not the default batch workflow.
6. Once a stronger model is chosen, update the default local model in `scripts/build_data.py`.

## Useful Commands

Run localized build:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local
```

Run localized build in the recommended resilient pattern:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local \
  --limit 2
```

Run localized build with an explicit model:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local \
  --local-model "<desktop-model>"
```

Fail fast when local generation is not available:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local \
  --fail-on-localized-generation-error
```

Include long descriptions explicitly:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local \
  --include-long-descriptions
```

## Newly Landed Follow-Up Improvements

- Added `--limit` to support quick sampling runs from the main build script.
- Added repeatable `--game-id` selection to support narrow model evaluation runs.
- Localized cache now saves incrementally after each game instead of only at the end of the full run.
- Localized generation now prints progress per game so long batches are observable while they run.
- The default localized workflow now generates bilingual summaries only; long descriptions are explicit opt-in.
- Added `scripts/evaluate_localized_content.py` to print side-by-side outputs for:
  - source summary and description in English
  - generated summary in English and Spanish
  - generated description in English and Spanish
  - default sample titles: `7 Wonders Duel`, `Arkham Horror`, `Azul`

## Suggested Next Follow-Ups

- Add a compact scoring or annotation step to record fidelity notes during model comparison.
- Consider a CSV or Markdown export mode for evaluation results if we want to preserve comparisons outside the terminal.
