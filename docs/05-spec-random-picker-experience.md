# Random Picker Experience

Status: Proposed
Priority: Mid-term
Related docs: app-overview.md, 03-spec-information-architecture-refresh.md

## Problem / Opportunity

The current random picker is useful, but it behaves like a lightweight utility modal rather than a memorable decision experience.

That is enough for basic use, but it underuses one of the most distinctive and social parts of the app: helping the table land on a choice when no one wants to decide manually.

## Why It Matters

A stronger random picker can turn indecision into a fun moment instead of a fallback tool.

This is especially valuable when:

- several filtered candidates already look good
- the group wants a playful tie-breaker
- multiple random results are useful before making the final pick

## Current State

Today the app can select one random game from the current filtered result set, show it in a modal, and reroll immediately. The current behavior respects active filters, which is already a strong product rule.

There is no visible animation sequence, no dedicated section, and no ephemeral history of previous random results.

## Proposed Direction

Evolve random selection into a more expressive product area while preserving the current “respect active filters” rule.

The intended direction is:

- give random selection its own clearer section or page
- add a brief animated reveal or delayed draw experience
- keep rerolling easy
- maintain an ephemeral history of recent random results during the current session so the user can compare multiple candidates

The history should feel lightweight and temporary, useful during a choice session rather than as long-term saved state.

## In Scope

- define random selection as a stronger standalone experience
- preserve filter-aware drawing
- add animation or reveal sequencing
- support ephemeral session history for recent draws

## Out of Scope

- permanent saved draw history across devices
- ranking or voting systems for groups
- complex tournament-style selection flows

## Open Questions

- Should random draws always respect the current Browse filters, or can the dedicated section also define its own scope?
- How many recent results should session history keep before it becomes noisy?
- Should previously drawn games be temporarily deprioritized during rerolls, or remain fully random each time?

## Notes for Future Implementation

- This spec becomes more important if Random moves into its own top-level section as part of the information architecture refresh.
- Session history should remain lightweight and not introduce unnecessary persistence complexity unless later justified.
