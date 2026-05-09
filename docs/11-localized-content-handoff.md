# Localized Content Implementation Checklist

Status: Landed checklist
Related docs: 07-spec-ai-assisted-localized-content.md, README.md

This note records the localized-content work that has already landed. It is kept as a reference checklist, not as an active roadmap spec.

## Landed

- `scripts/build_data.py` supports local-first localized generation through Ollama.
- `scripts/build_data.py` supports narrow evaluation runs with `--limit` and repeatable `--game-id`.
- The generated dataset supports localized content objects:
  - `summary: { en, es }`
  - `description: { en, es }`
- The frontend reads localized content with this fallback order:
  - `notes`
  - current UI language
  - English
  - alternate localized field when needed
- Legacy datasets with string `summary` or `description` are still accepted.
- Localized cache is stored outside `data/` under `generated/` and ignored by Git.
- Localized cache saves incrementally after each generated game.
- Localized generation prints progress per game.
- The default localized workflow generates bilingual summaries only.
- Bilingual long descriptions are explicit opt-in via `--include-long-descriptions`.
- `scripts/evaluate_localized_content.py` prints side-by-side source and generated bilingual content.

## Verified Previously

- Ollama was installed and responding locally on the Mac evaluation machine.
- `qwen3:4b` was reachable through the script.
- The script accepts Qwen responses where JSON output appears in `thinking` while `response` is empty.
- Validation covered:
  - `python3 -m py_compile scripts/build_data.py`
  - `npm run test:visual`
  - tolerant warning path when Ollama is unavailable
  - strict failure path with `--fail-on-localized-generation-error`

## Findings To Keep In Mind

- On a MacBook Pro M1 with 16 GB RAM, `qwen3:4b` worked but was too slow for comfortable batch evaluation.
- The model looked usable for bilingual summaries.
- Long bilingual descriptions were not strong or fast enough on that machine to make it the primary generation environment.
- At least one Spanish fidelity issue was observed during evaluation, so generated copy still needs review before large-scale use.

## Suggested Future Follow-Ups

- Evaluate a stronger local model on the Windows desktop before changing the default model again.
- Use tiny batches by default, such as `--limit 1`, `--limit 2`, or explicit `--game-id`.
- Compare a fixed sample before larger runs:
  - `7 Wonders Duel`
  - `Arkham Horror`
  - `Azul`
- Add compact scoring or annotation for model comparison if preserving evaluation notes becomes useful.
- Consider CSV or Markdown export from the evaluator only if terminal comparison becomes too ephemeral.

## Useful Commands

Run localized build:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local
```

Run a small resilient sample:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local \
  --limit 2
```

Run explicit game IDs:

```bash
python scripts/evaluate_localized_content.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local \
  --game-id 173346 \
  --game-id 15987 \
  --game-id 230802
```

Include long descriptions explicitly:

```bash
python scripts/build_data.py \
  --csv-path docs/reference/collection.csv \
  --localized-content-mode local \
  --include-long-descriptions
```
