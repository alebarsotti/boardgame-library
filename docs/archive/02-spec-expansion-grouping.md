# Expansion Grouping

Status: Implemented
Priority: Completed
Related docs: ../app-overview.md, ./01-spec-game-content-enrichment.md

## Problem / Opportunity

Expansions currently appear as separate items in the collection data, which makes the top-level browsing experience noisier and less aligned with how the collection is usually used.

In practice, expansions are rarely chosen as standalone entries because they normally depend on a base game. Showing them beside full games makes the collection look larger but less useful.

## Why It Matters

The main collection should help answer “what game should we play?” rather than “what owned product exists in the CSV?”.

Grouping expansions under the base game would:

- reduce clutter in the primary lists
- keep the main collection focused on playable starting points
- preserve expansion visibility in the context where it matters most

## Current State

The app now models expansion relationships in the generated dataset and uses them in the browse and detail experiences.

## Proposed Direction

Treat expansions as secondary content attached to their base game instead of as top-level browseable entries.

The intended product behavior is:

- expansions should be hidden from all top-level collection lists
- expansions should appear only inside the detail view of their corresponding base game
- the base game detail should make the relationship explicit, for example through an “Expansions” section or similar grouped presentation

This should be modeled as a data and presentation change together. The feature is only useful if the data layer can reliably identify which entries are expansions and which base game they belong to.

## In Scope

- define the product rule that expansions are not top-level browse items
- expose expansions only within base game details
- require a reliable base game to expansion relationship in generated data
- preserve visibility of owned expansions without treating them as standalone picks

## Out of Scope

- supporting standalone expansions as separate playable entries
- inventory management for expansion ownership beyond the current collection dataset
- redesigning the entire detail view beyond what is needed to display grouped expansions

## Implementation Outcome

- BGG enrichment now stores `bggItemType`, `dependencyType`, `requiresGameId`, and `expansionIds` in the generated dataset
- top-level browse views hide expansions only when the base-game relationship is resolved confidently
- unmatched expansions remain visible rather than being hidden speculatively
- base-game details now include a dedicated expansions section with links to each related expansion

## Follow-up Debt

- manual curation and fallback strategies for unresolved expansion relationships remain future work
- builds without BGG token access do not infer expansion relationships heuristically
- richer card-level cues for bases with expansions remain out of scope for this iteration

## Notes

- The current implementation uses BGG metadata as the source of truth and intentionally avoids weak title-based matching.
- Follow-up work is tracked in `../08-spec-expansion-curation-fallbacks.md`.
