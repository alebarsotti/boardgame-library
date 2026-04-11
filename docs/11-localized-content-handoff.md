# Localized Content Handoff

Status: Working notes
Related docs: 07-spec-ai-assisted-localized-content.md, README.md

## What Landed

- `scripts/build_data.py` now supports local-first localized generation through Ollama.
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

1. Install Ollama and one stronger candidate model for `local-full`.
2. Keep `qwen3:4b` available only as the `local-lite` baseline.
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
5. Once a stronger model is chosen, update the `local-full` default in `scripts/build_data.py`.

## Useful Commands

Run localized build in lite mode:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local-lite \
  --local-model qwen3:4b
```

Run localized build in full mode:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local-full \
  --local-model "<desktop-model>"
```

Fail fast when local generation is not available:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local-full \
  --fail-on-localized-generation-error
```

Skip long descriptions during fast iteration:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local-lite \
  --local-model qwen3:4b \
  --skip-long-descriptions
```

## Suggested Follow-Up Improvements

- Add a `--limit` flag for quick sampling runs.
- Add a `--game-id` or similar narrow-scope selector for model evaluation.
- Add a small evaluation harness or script that prints side-by-side outputs for fixed sample titles.
