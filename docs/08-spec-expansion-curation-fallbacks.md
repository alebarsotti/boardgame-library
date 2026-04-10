# Expansion Curation And Fallbacks

Status: Proposed
Priority: Later
Related docs: app-overview.md, archive/02-spec-expansion-grouping.md

## Problem / Opportunity

The current expansion-grouping implementation intentionally depends on confident BGG metadata. That keeps the browse experience safe, but it leaves two gaps:

- unresolved expansions remain visible as top-level items
- rebuilds without token-backed enrichment cannot recover expansion relationships

This is the right default for now, but it leaves room for a maintenance-oriented follow-up.

## Why It Matters

The library should stay clean even when upstream metadata is incomplete or unavailable.

A follow-up curation layer would help:

- keep expansion grouping reliable across rebuilds
- support hard cases where BGG links are missing or ambiguous
- preserve the current rule of not hiding data speculatively

## Current State

Today the app groups expansions only when BGG metadata resolves the relationship confidently.

When that does not happen:

- the expansion remains visible in browse
- no title-based heuristic match is attempted
- there is no manual override layer for correction

## Proposed Direction

Introduce a lightweight authoring path for expansion relationships that complements the current BGG-driven baseline.

The intended direction is:

- support a local override file for manually pinning expansion-to-base relationships when needed
- optionally preserve resolved relationships across rebuilds even when token access is unavailable
- keep manual curation narrow and maintenance-friendly rather than turning the app into a general catalog editor

## In Scope

- define a manual override path for unresolved expansion relationships
- define whether a no-token rebuild can reuse previously resolved relationships safely
- keep browse behavior conservative unless a relationship is trusted

## Out of Scope

- broad metadata editing workflows
- fuzzy title matching as the default behavior
- redesigning the current detail UI beyond what curation requires

## Open Questions

- Should manual overrides live beside `name-overrides.json` or in a dedicated dependency file?
- Should previously resolved relationships be cached automatically, or only through explicit overrides?
- Should the app surface a visible badge when a grouped expansion was matched manually rather than from BGG?

## Notes for Future Implementation

- This work should preserve the current rule that unresolved data remains visible rather than disappearing silently.
- Any fallback approach should be explainable and easy to inspect in source control.
