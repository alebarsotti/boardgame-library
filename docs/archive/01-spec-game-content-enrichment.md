# Game Content Enrichment

Status: Implemented
Priority: Completed
Related docs: app-overview.md

## Problem / Opportunity

The current app already supports game descriptions and images in the data model, but the generated dataset is often sparse. Many games have empty descriptions and missing cover art, which makes the browsing and detail experience feel incomplete.

This creates a gap between the filtering utility of the app and the richer “what is this game?” understanding that helps people choose quickly at the table.

## Why It Matters

A richer content layer would make the library easier to scan, easier to explain to other players, and more visually engaging.

Short summaries and cover art are especially useful when:

- someone recognizes a box but not the title
- someone knows the title but not the theme or gameplay
- the app is being used to decide quickly among unfamiliar options

## Current State

The runtime app can already display:

- `imageUrl` for cover art in cards and detail views
- `description` or `notes` text in the game detail dialog
- categories and mechanics when those fields are present

The build script now enriches data through BoardGameGeek when a valid application token is available. The generated dataset includes cleaned descriptions, generated summaries, categories, mechanics, and cover images that the runtime app already consumes in cards and details.

## Proposed Direction

Introduce a richer content pipeline for each game, centered on concise, readable summaries and consistent cover images.

The intended product behavior is:

- game cards should reliably show cover art when available
- game details should include a brief summary of what the game is about and what kind of experience it offers
- long raw source descriptions should not be shown as-is when a shorter curated version would be more useful

The preferred source is BoardGameGeek content, transformed into a short one- or two-paragraph summary during data generation or a related preparation step.

Because this depends on external access, the spec should treat BoardGameGeek enrichment as the preferred path, not a guaranteed immediate capability.

## In Scope

- define a richer content baseline for descriptions and cover images
- prefer short readable summaries over raw long-form source text
- use BoardGameGeek as the default upstream source when token access exists
- preserve the app’s static-runtime model by preparing content ahead of time
- leave room for fallback behavior when enrichment is unavailable

## Out of Scope

- full editorial copy workflows for every game
- user-authored collaborative notes or comments
- runtime calls to BoardGameGeek from the browser
- guaranteeing enriched content for every game in the collection

## Implementation Outcome

- the build step now populates `summary`, `description`, `imageUrl`, `categories`, and `mechanics` from BGG when token access is available
- cards and detail views consume that enriched content at runtime without requiring live API calls
- the current dataset already ships with broad coverage for summaries, descriptions, and cover art

## Follow-up Debt

- localized and more editorial summary quality improvements remain future work and are now tracked in `../07-spec-ai-assisted-localized-content.md`
- builds without token access still degrade to a sparser dataset, which remains acceptable for the current static model

## Notes

- The browser runtime remains static; all enrichment happens ahead of time during dataset generation.
- This archived spec establishes the baseline that later localized-content work should build on rather than replace.
