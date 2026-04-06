# Expansion Grouping

Status: Proposed
Priority: Near-term
Related docs: app-overview.md, 01-spec-game-content-enrichment.md

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

The current app lists games directly from the generated dataset. There is no visible concept of base game versus expansion grouping in the browsing UI, and the current dataset does not appear to include a clear parent-child relationship for expansions.

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

## Open Questions

- What is the best source of truth for expansion relationships: BGG metadata, manual overrides, or a hybrid approach?
- How should the app behave when an expansion cannot be matched confidently to a base game?
- Should expansion presence influence the base game card or detail summary, such as showing an expansion count?

## Notes for Future Implementation

- This likely depends on richer BoardGameGeek metadata or a manual mapping layer, so it may share groundwork with content enrichment.
- The implementation should avoid hiding data irreversibly; unmatched expansions should remain traceable during data preparation even if they are not surfaced in the same way in the UI.
