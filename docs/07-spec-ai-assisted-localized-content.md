# Local-First Localized Content Cache

Status: Proposed
Priority: Later
Related docs: app-overview.md, archive/01-spec-game-content-enrichment.md

## Problem / Opportunity

The current enrichment pipeline can produce useful descriptions and summaries from BoardGameGeek source data, but those results are still limited by the original source language and by the quality of deterministic text cleanup.

That creates two product gaps:

- some generated summaries still feel too close to raw source copy
- the app cannot yet show richer content in Spanish when the UI is set to Spanish

The project also needs to avoid paid API usage for this capability. That means the next iteration should prefer local generation and persistent reuse over a cloud-only workflow.

## Why It Matters

This app is explicitly bilingual and designed for real use at the table. If the richer content layer exists only in English, part of the product value is lost when the UI is being used in Spanish.

A local-first cache could improve the experience by:

- generating shorter, more readable summaries than simple extraction alone
- providing Spanish summaries and descriptions that match the selected UI language
- avoiding unnecessary regeneration work when source content has not changed
- preserving the app's static deployment model by preparing all text ahead of time
- keeping recurring cost at zero by using local models such as Ollama-hosted models

## Current State

The project now supports generated summaries and full descriptions in the dataset as a shipped baseline, but those values are still derived from the BGG source text during the build step and are regenerated from source content rather than reused from a persistent localized cache.

The runtime app can already choose among multiple content fields, but it does not yet have a language-aware content model such as:

- `summary.en`
- `summary.es`
- `description.en`
- `description.es`

There is also no cache layer that records:

- which source text was used
- which local model or prompt generated the result
- whether a localized version is already available and can be reused

## Proposed Direction

Introduce an optional local-first content generation layer that runs during data preparation, stores its outputs locally, and reuses them across future builds unless the underlying source content changes.

The intended product direction is:

- keep the original source description from BoardGameGeek as canonical upstream content
- generate short summaries and improved long descriptions locally when that produces better product copy than deterministic cleanup alone
- support localized summary and description output in both English and Spanish
- use cache entries keyed by game and source-content fingerprint so repeated builds do not regenerate unchanged content
- optimize the default profile for a stronger desktop machine while keeping a lighter fallback profile for lower-memory hardware

The app should remain static at runtime. All generation work should happen before publishing or local use, never in the browser.

## In Scope

- define local-first summary and description generation as a build-time capability
- support persistent cache reuse so unchanged games do not trigger repeated generation
- define bilingual summary and description output as the first localized content target
- keep the generated dataset consumable by the current static frontend model
- preserve deterministic fallback behavior when local generation is unavailable or skipped
- support an Ollama-backed workflow as the default implementation path

## Out of Scope

- runtime AI calls from the browser
- mandatory local generation as a requirement for basic dataset builds
- paid API usage as the default implementation path
- collaborative editorial workflows or in-app content editing
- broad localization of all metadata fields in the dataset

## Open Questions

- Which local model should become the default `local-full` profile after practical quality testing on the desktop machine?
- Should the `local-lite` profile generate shorter descriptions by default, or skip them unless explicitly enabled?
- Should cache artifacts remain purely local, or should the repo eventually support committing selected generated content?
- Should manual review or pinning of especially good generated summaries be supported later as a lightweight override layer?

## Notes for Future Implementation

- This should build on the baseline enrichment work from spec 01 rather than replace it.
- A practical first model should preserve the current cleaned BGG description as canonical source input while adding cached localized summary and description fields.
- The cache should store generation metadata such as source hash, target language, model identifier, profile, prompt version, parameters, and generation timestamp so reuse rules stay understandable.
- The frontend should prefer language-matched content when available, then fall back to English, then fall back to deterministic content.
- Future implementation should keep local generation optional so the project can still rebuild data without Ollama access, using deterministic summaries and the current English source content.
