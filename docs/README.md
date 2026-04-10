# Product Specs

This `docs/` directory is the canonical place for product-facing specifications and supporting reference material for `boardgame-library`.

It has two purposes:

- explain what the app is today
- capture future improvements as separate high-level specs that can be implemented incrementally
- preserve supporting technical reference material that informs future implementation

The root project [`README.md`](../README.md) should stay focused on setup, data generation, and local usage. This docs area is for product context, roadmap thinking, and implementation guidance at a high level.

## Current Specs

- [`app-overview.md`](./app-overview.md): product overview, goals, current capabilities, and present limitations
- [`07-spec-ai-assisted-localized-content.md`](./07-spec-ai-assisted-localized-content.md): add a cached AI-assisted layer for bilingual summaries and future localized content generation
- [`08-spec-expansion-curation-fallbacks.md`](./08-spec-expansion-curation-fallbacks.md): add manual curation and non-token fallback strategies for unresolved expansion relationships
- [`09-spec-post-ia-layout-polish.md`](./09-spec-post-ia-layout-polish.md): refine spacing, density, hierarchy, and page balance after the information-architecture split

## Technical References

- [`reference/bgg-xmlapi-observed-response-reference.md`](./reference/bgg-xmlapi-observed-response-reference.md): implementation-facing notes about observed BoardGameGeek XML API response structure and safe fields to use
- [`reference/example.xml`](./reference/example.xml): sample BoardGameGeek XML response used by the reference documentation

## Archive

Completed specs should be moved out of the active roadmap and into [`archive/`](./archive/) once their implementation is done and the document is no longer the current working spec.

Recently archived:

- [`archive/06-spec-visual-design-system-refresh.md`](./archive/06-spec-visual-design-system-refresh.md): shipped the broader visual refresh with theme preferences, section identity, and refreshed typography hierarchy
- [`archive/00-spec-remove-name-overrides-ui.md`](./archive/00-spec-remove-name-overrides-ui.md): removed the current game-detail controls for editing names and importing or exporting overrides
- [`archive/01-spec-game-content-enrichment.md`](./archive/01-spec-game-content-enrichment.md): shipped the generated summary, description, categories, mechanics, and cover-art enrichment baseline
- [`archive/02-spec-expansion-grouping.md`](./archive/02-spec-expansion-grouping.md): grouped resolved expansions under their base games and removed them from top-level browse lists
- [`archive/03-spec-information-architecture-refresh.md`](./archive/03-spec-information-architecture-refresh.md): completed the Home, Browse, Archive, Random, and Settings split and moved durable preferences out of the hero
- [`archive/04-spec-discovery-controls-refresh.md`](./archive/04-spec-discovery-controls-refresh.md): refreshed browse controls, expanded sorting, improved list density, and aligned view switching with the results workspace
- [`archive/05-spec-random-picker-experience.md`](./archive/05-spec-random-picker-experience.md): shipped the dedicated Random page, reveal flow, ephemeral history, and richer multi-result decision surface
- [`archive/10-spec-ui-ux-review-followups.md`](./archive/10-spec-ui-ux-review-followups.md): shipped the follow-up polish pass for browse controls, active-filter summaries, and view toggle clarity

Archived specs should keep their numbered filename so the implementation history remains easy to follow.

## How To Add Future Specs

Create one Markdown file per initiative. Keep each spec focused on a single improvement so it can later move into implementation without rewriting a large master document.

Use numbered kebab-case filenames so the intended roadmap order is explicit, such as:

- `00-spec-remove-name-overrides-ui.md`
- `07-spec-search-improvements.md`
- `08-spec-mobile-polish.md`

Reserve `app-overview.md` and `README.md` for foundational documentation. Numbered specs are for future or active initiatives. Supporting technical notes should live outside the numbered sequence, for example under `reference/`.

## Spec Conventions

Write all specs in English and keep them product-oriented. Early specs should be clear enough to align future implementation, but should not over-specify technical details before the work starts.

Each spec should include a simple metadata header in prose:

- `Status`
- `Priority` or `Phase` when useful
- `Related docs` only when there is a real dependency

When a spec has been implemented, move it to `docs/archive/` and update any links from the active index if the archived document is still worth referencing.

## Recommended Template

```md
# Spec Title

Status: Proposed
Priority: Later
Related docs: app-overview.md

## Problem / Opportunity

What is not working well today, or what new capability should exist?

## Why It Matters

Why this change is valuable for the product or the user.

## Current State

How the app behaves today in the area affected by this spec.

## Proposed Direction

The intended product-level change. Keep this high level unless implementation detail is needed to avoid confusion.

## In Scope

- Behaviors and outcomes this spec covers

## Out of Scope

- Things intentionally not included in this iteration

## Open Questions

- Decisions to revisit before implementation

## Notes for Future Implementation

- Constraints, dependencies, or known technical considerations
```

## Writing Guidance

- Prefer one idea per file.
- Use a numeric prefix to make implementation order visible.
- Keep scope boundaries explicit.
- Capture user value before implementation details.
- Note assumptions and limitations when they matter.
- Link related specs only when there is a real dependency or sequence between them.
- Move implemented specs to `docs/archive/` so the active docs list stays focused on pending work.
