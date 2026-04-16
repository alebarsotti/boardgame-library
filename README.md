# Ale's Board Game Library

Static site for exploring a BoardGameGeek collection with:

- filters by players, duration, weight, language, and age
- gallery or compact view
- tabs for current collection and archive
- random picker based on the filtered set
- ES/EN interface
- optional local-first bilingual content generation with Ollama

## Main Files

- `index.html`: main structure
- `styles.css`: editorial look and responsive layout
- `app.js`: data loading, filters, persistence, and modals
- `scripts/build_data.py`: generates `data/games.json` and `data/games-data.js` from the CSV

## Regenerating Data

```bash
python scripts/build_data.py --csv-path "C:\path\your-collection.csv"
```

You can also provide output paths:

```bash
python scripts/build_data.py --csv-path "C:\path\your-collection.csv" --output-path ".\data\games.json"
```

## Enriching with BGG

If you have a BGG application token, you can enrich the dataset with cover images, short summaries, full descriptions, categories, and mechanics.

The script accepts the token in three ways, in this order:

- `--bgg-token "YOUR_TOKEN"`
- `BGG_TOKEN` environment variable
- a local `.bgg-token` file in the project root

The `.bgg-token` file is ignored by Git.

Only enrich remote URLs:

```bash
python scripts/build_data.py --csv-path "C:\path\your-collection.csv" --bgg-token "YOUR_TOKEN"
```

Enrich and download images locally:

```bash
python scripts/build_data.py --csv-path "C:\path\your-collection.csv" --bgg-token "YOUR_TOKEN" --download-images
```

This generates:

- `data/games.json`
- `data/games-data.js`
- `data/images/` if `--download-images` is enabled

## Localized Content With Ollama

The build can optionally generate bilingual localized text offline with Ollama.

This is local-first:

- no paid API is required
- nothing runs in the browser
- generated content is cached outside `data/`
- if Ollama or the model is unavailable, the build falls back to deterministic content

### Prerequisites

1. Install Ollama and make sure the local server is running.
2. Pull a model for the profile you want to use.

Recommended defaults:

- `local`: `mistral-small3.2:24b`

Example model download:

```bash
ollama pull mistral-small3.2:24b
```

### Local Mode

- `local`: intended for the primary desktop build machine
- default behavior: generate bilingual summaries only
- optional behavior: include bilingual long descriptions with an explicit flag

### Example Commands

Desktop-oriented localized build:

```bash
python scripts/build_data.py --csv-path "C:\path\your-collection.csv" --bgg-token "YOUR_TOKEN" --localized-content-mode local
```

Use a specific model and refresh the localized cache:

```bash
python scripts/build_data.py --csv-path "/path/your-collection.csv" --localized-content-mode local --local-model "mistral-small3.2:24b" --refresh-localized-content
```

Limit a run to a tiny sample:

```bash
python scripts/build_data.py --csv-path "/path/your-collection.csv" --localized-content-mode local --limit 3
```

Run against specific games only:

```bash
python scripts/build_data.py --csv-path "/path/your-collection.csv" --localized-content-mode local --game-id 173346 --game-id 15987 --game-id 230802
```

Include bilingual long descriptions explicitly:

```bash
python scripts/build_data.py --csv-path "/path/your-collection.csv" --localized-content-mode local --include-long-descriptions
```

Recommended resilient workflow for larger libraries:

```bash
python scripts/build_data.py --csv-path "/path/your-collection.csv" --localized-content-mode local --limit 2
```

### CLI Options

- `--localized-content-mode off|local`
- `--local-model <name>`
- `--limit <n>`
- `--game-id <id>` (repeatable)
- `--localized-cache-path <path>`
- `--refresh-localized-content`
- `--include-long-descriptions`
- `--ollama-host <url>`
- `--ollama-timeout-seconds <n>`
- `--fail-on-localized-generation-error`

### Evaluation Harness

For quick model comparison on a very small sample, use:

```bash
python scripts/evaluate_localized_content.py --csv-path "/path/your-collection.csv" --localized-content-mode local
```

If no `--game-id` is passed, the harness uses this fixed trio by default:

- `7 Wonders Duel`
- `Arkham Horror`
- `Azul`

You can also narrow it explicitly:

```bash
python scripts/evaluate_localized_content.py --csv-path "/path/your-collection.csv" --localized-content-mode local --game-id 173346 --game-id 230802
```

The evaluator prints, for each selected title:

- source summary in English
- source description in English
- generated summary in English and Spanish
- generated description in English and Spanish when `--include-long-descriptions` is enabled

### Cache And Fallback Behavior

Localized content is cached by source text, field, language, profile, model, prompt version, and generation parameters.

The builder now saves localized cache incrementally after each game that produces new content, so long-running batches can resume without losing all progress.

Default cache path:

- `generated/localized-content-cache.json`

If localized generation is not available:

- the build prints a warning
- the dataset still builds successfully by default
- English deterministic content from the cleaned BGG description remains available
- Spanish localized fields fall back to English at runtime when needed

If you want the build to fail instead of warning, pass:

```bash
python scripts/build_data.py --csv-path "/path/your-collection.csv" --localized-content-mode local --fail-on-localized-generation-error
```

### Runtime Data Shape

The generated dataset now stores content as localized objects:

```json
{
  "summary": { "en": "...", "es": "..." },
  "description": { "en": "...", "es": "..." }
}
```

The frontend still accepts legacy string-based datasets during the transition.

## Name Overrides

Displayed names use the base BGG names plus any overrides already prepared in the generated dataset.

There is no runtime UI for editing or importing overrides from the app itself. Title curation should happen in source data by maintaining `data/name-overrides.json` and then rebuilding the dataset:

```bash
python scripts/build_data.py --csv-path "C:\path\your-collection.csv"
```

When that file is present, the build step merges the override values into the generated data so the app can display them without exposing an editing workflow in the detail view.

## Publishing

You can upload the project as-is to any static hosting provider. The app does not depend on live BGG requests; it consumes the local JSON generated by the script.

## Local Usage

It can also be opened directly by double-clicking `index.html`. For that workflow, the build generates:

- `data/games.json` for regular static hosting
- `data/games-data.js` for direct `file://` usage

## Visual Testing

Playwright is configured for lightweight visual smoke coverage of the static app.

### Install once

```bash
npm install
npx playwright install chromium
```

### Run the visual verification suite

```bash
npm run test:visual
```

What this currently verifies:

- theme controls render in the header and in Settings
- section navigation still works across Home, Browse, Archive, Random, and Settings
- dark mode can be activated and remains active after reload
- a basic mobile pass keeps the theme control visible in Settings

The test runner starts a local static server automatically, so there is no separate dev server step.

### Generate representative screenshots for PRs

```bash
npm run test:visual:capture
```

This produces PNG captures under `test-results/` for the most representative states of the app, including:

- `home-light.png`
- `browse-light.png`
- `archive-light.png`
- `random-light.png`
- `settings-light.png`
- `settings-dark.png`
- `browse-dark.png`
- `archive-dark.png`
- `settings-mobile-dark.png`

Recommended PR workflow:

1. Run `npm run test:visual`.
2. Run `npm run test:visual:capture` if the change affects layout, theme, hierarchy, or responsive behavior.
3. Attach the most relevant screenshots from `test-results/` to the PR description.
4. Prefer one image per meaningful state change instead of dumping every capture into the PR.

This setup is meant as practical regression coverage and PR evidence, not as a full snapshot-testing system.

## GitHub Actions

The repository includes a lightweight GitHub Actions workflow at `.github/workflows/visual-checks.yml`.

What it does on pull requests:

- runs `npm run test:visual`
- runs `npm run test:visual:capture`
- uploads the generated `test-results/` folder as a workflow artifact
- posts or updates a PR comment with the workflow run link and the capture bundle name

Why it is set up this way:

- it uses `ubuntu-latest` to keep GitHub Free usage efficient
- it only triggers automatically when app, data, Playwright, or workflow files change
- it keeps captures as short-lived artifacts instead of committing them to the repo

Recommended PR habit:

1. Wait for the `Visual Checks` workflow to finish.
2. Open the sticky `Visual Checks` comment added by the workflow.
3. Use the workflow link from that comment to download the artifact bundle.
4. Attach only the most representative screenshots to the PR body.
5. Mention any intentional visual deltas in the PR summary.
