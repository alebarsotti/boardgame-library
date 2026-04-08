# AI-Assisted Localized Content Cache

Status: Proposed
Priority: Later
Related docs: app-overview.md, 01-spec-game-content-enrichment.md

## Problem / Opportunity

The current enrichment pipeline can produce useful descriptions and summaries from BoardGameGeek source data, but those results are still limited by the original source language and by the quality of deterministic text cleanup.

That creates two product gaps:

- some generated summaries still feel too close to raw source copy
- the app cannot yet show richer content in Spanish when the UI is set to Spanish

If the project later wants more natural summaries and localized content while preserving the static-runtime model, it will need an offline generation step with persistent caching rather than fresh AI output on every build.

## Why It Matters

This app is explicitly bilingual and designed for real use at the table. If the richer content layer exists only in English, part of the product value is lost when the UI is being used in Spanish.

An AI-assisted cache could improve the experience by:

- generating shorter, more readable summaries than simple extraction alone
- providing Spanish summaries that match the selected UI language
- avoiding unnecessary regeneration cost when source content has not changed
- preserving the app's static deployment model by preparing all text ahead of time

## Current State

The project currently supports generated summaries and full descriptions in the dataset, but those values are derived from the BGG source text during the build step and are regenerated from source content rather than reused from a persistent localized cache.

The runtime app can already choose among multiple content fields, but it does not yet have a language-aware content model such as:

- `summary.en`
- `summary.es`
- `description.es`

There is also no cache layer that records:

- which source text was used
- which model or prompt generated the result
- whether a localized version is already available and can be reused

## Proposed Direction

Introduce an optional AI-assisted content generation layer that runs during data preparation, stores its outputs locally, and reuses them across future builds unless the underlying source content changes.

The intended product direction is:

- keep the original source description from BoardGameGeek as canonical upstream content
- generate short summaries with AI when that produces better product copy than deterministic cleanup alone
- support localized summary output in both English and Spanish
- optionally support localized long-form descriptions later, but only if the value clearly justifies the extra cost and complexity
- use cache entries keyed by game and source-content fingerprint so repeated builds do not regenerate unchanged content

The app should remain static at runtime. All AI work should happen before publishing or local use, never in the browser.

## In Scope

- define AI-assisted summary generation as a future build-time capability
- support persistent cache reuse so unchanged games do not trigger repeated generation
- define bilingual summary output as the first localized content target
- keep the generated dataset consumable by the current static frontend model
- preserve deterministic fallback behavior when AI generation is unavailable or skipped

## Out of Scope

- runtime AI calls from the browser
- mandatory AI generation as a requirement for basic dataset builds
- collaborative editorial workflows or in-app content editing
- broad localization of all metadata fields in the dataset
- guaranteeing Spanish full descriptions in the first iteration of this idea

## Open Questions

- Should the first AI iteration generate only `summary.en` and `summary.es`, or also `description.es`?
- What should be the source of truth for cache invalidation: raw BGG description hash, normalized source text hash, or a wider content fingerprint?
- Should cache artifacts live under `data/` for transparency or under another generated-assets path to keep runtime payloads separate from authoring state?
- If the prompt or model changes, should all cached entries be considered stale automatically?
- Should manual review or pinning of especially good AI summaries be supported later as a lightweight override layer?

## Notes for Future Implementation

- This should build on the baseline enrichment work from spec 01 rather than replace it.
- A practical first model would likely preserve the current full source `description` field while adding cached localized summary fields.
- The cache should store generation metadata such as source hash, target language, model identifier, and generation timestamp so reuse rules stay understandable.
- The frontend should prefer language-matched content when available, then fall back to English, then fall back to raw description or notes.
- Future implementation should keep AI optional so the project can still rebuild data without model access, using the last cached results or deterministic summaries instead.
