# Random Picker Experience

Status: Archived after implementation
Priority: Mid-term
Related docs: app-overview.md, 03-spec-information-architecture-refresh.md

## Problem / Opportunity

The original random picker was useful, but it behaved like a lightweight utility rather than a memorable decision experience.

That left one of the app's most distinctive and social use cases underdeveloped: helping the table land on a choice when no one wants to decide manually.

## Why It Matters

A stronger random picker turns indecision into a more enjoyable moment instead of a fallback tool.

This matters most when:

- several filtered candidates already look good
- the group wants a playful tie-breaker
- comparing a few random options is more useful than surfacing only one

## Current State

The app now treats `Random` as a dedicated top-level destination instead of a lightweight modal utility.

The shipped experience preserves the core rule that random draws always respect the active filter scope from the last workspace the user used (`Browse` or `Archive`).

## Implemented Direction

The shipped implementation turned random selection into a more expressive decision surface while preserving the filter-aware draw rule.

Implemented product behaviors:

- `Random` has its own dedicated page in the top-level navigation
- draws use the active filter scope inherited from the last workspace
- the main draw flow includes a brief reveal state before results appear
- the result area can surface multiple titles in a single draw
- each current result includes cover art or fallback artwork, score, practical metadata, tags, and short descriptive context
- the session keeps a lightweight ephemeral history of recent draws
- history entries highlight the current draw and allow reopening game details
- rerolls prefer avoiding very recent repeats when alternatives exist

The history remains intentionally temporary and session-scoped rather than persistent.

## In Scope

- define random selection as a stronger standalone experience
- preserve filter-aware drawing
- add animation or reveal sequencing
- support ephemeral session history for recent draws
- support comparing multiple current results in the same draw
- improve quick-read result context with visuals and summary content

## Out of Scope

- permanent saved draw history across devices
- ranking or voting systems for groups
- complex tournament-style selection flows

## Resolution Notes

- Random continues to respect the current `Browse` or `Archive` filter scope rather than defining a separate scope model
- session history is capped to a short recent list rather than becoming a long-lived log
- recent results are softly deprioritized during rerolls when the candidate pool allows it
- the draw count is user-selectable per session within a small bounded range rather than becoming a complex tournament flow

## Notes for Future Implementation

- Future work can still expand the theatrical side of Random with richer motion or social decision mechanics if later justified.
- Persistent history, voting, or bracket-style flows remain intentionally out of scope for the shipped version.
