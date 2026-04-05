# Product Specs

This `docs/` directory is the canonical place for product-facing specifications for `boardgame-library`.

It has two purposes:

- explain what the app is today
- capture future improvements as separate high-level specs that can be implemented incrementally

The root project [`README.md`](../README.md) should stay focused on setup, data generation, and local usage. This docs area is for product context, roadmap thinking, and implementation guidance at a high level.

## Current Specs

- [`app-overview.md`](./app-overview.md): product overview, goals, current capabilities, and present limitations

## How To Add Future Specs

Create one Markdown file per initiative. Keep each spec focused on a single improvement so it can later move into implementation without rewriting a large master document.

Use descriptive kebab-case filenames such as:

- `spec-search-improvements.md`
- `spec-game-notes.md`
- `spec-mobile-polish.md`

## Spec Conventions

Write all specs in English and keep them product-oriented. Early specs should be clear enough to align future implementation, but should not over-specify technical details before the work starts.

Each spec should include a simple metadata header in prose:

- `Status`
- `Priority` or `Phase` when useful
- `Related docs` only when there is a real dependency

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
- Keep scope boundaries explicit.
- Capture user value before implementation details.
- Note assumptions and limitations when they matter.
- Link related specs only when there is a real dependency or sequence between them.
