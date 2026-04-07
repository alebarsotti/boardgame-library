# Product Specs

This `docs/` directory is the canonical place for product-facing specifications for `boardgame-library`.

It has two purposes:

- explain what the app is today
- capture future improvements as separate high-level specs that can be implemented incrementally

The root project [`README.md`](../README.md) should stay focused on setup, data generation, and local usage. This docs area is for product context, roadmap thinking, and implementation guidance at a high level.

## Current Specs

- [`app-overview.md`](./app-overview.md): product overview, goals, current capabilities, and present limitations
- [`00-spec-remove-name-overrides-ui.md`](./00-spec-remove-name-overrides-ui.md): remove the current game-detail controls for editing names and importing or exporting overrides
- [`01-spec-game-content-enrichment.md`](./01-spec-game-content-enrichment.md): richer game descriptions, cover art, and content quality improvements powered by generated data
- [`02-spec-expansion-grouping.md`](./02-spec-expansion-grouping.md): hide expansions from top-level listings and surface them only within their base game details
- [`03-spec-information-architecture-refresh.md`](./03-spec-information-architecture-refresh.md): split the app into clearer top-level sections such as Home, Browse, Archive, and future utility areas
- [`04-spec-discovery-controls-refresh.md`](./04-spec-discovery-controls-refresh.md): improve filters, sorting, and view modes across collection browsing
- [`05-spec-random-picker-experience.md`](./05-spec-random-picker-experience.md): evolve the random picker into a dedicated, more expressive experience
- [`06-spec-visual-design-system-refresh.md`](./06-spec-visual-design-system-refresh.md): define a broader visual refresh including theming, typography, and presentation polish

## Archive

Completed specs should be moved out of the active roadmap and into [`archive/`](./archive/) once their implementation is done and the document is no longer the current working spec.

Archived specs should keep their numbered filename so the implementation history remains easy to follow.

## How To Add Future Specs

Create one Markdown file per initiative. Keep each spec focused on a single improvement so it can later move into implementation without rewriting a large master document.

Use numbered kebab-case filenames so the intended roadmap order is explicit, such as:

- `00-spec-remove-name-overrides-ui.md`
- `07-spec-search-improvements.md`
- `08-spec-mobile-polish.md`

Reserve `app-overview.md` and `README.md` for foundational documentation. Numbered specs are for future or active initiatives.

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
