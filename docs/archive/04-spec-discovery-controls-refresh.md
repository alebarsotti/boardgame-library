# Discovery Controls Refresh

Status: Proposed
Priority: Mid-term
Related docs: app-overview.md, 03-spec-information-architecture-refresh.md

## Problem / Opportunity

The current browsing controls are functional but uniform. Most filters are dropdowns, sorting is limited to a small set of options, and view mode switching is basic.

That makes the app easy to build, but not necessarily the best fit for fast real-world browsing across different kinds of decisions.

## Why It Matters

Different collection questions benefit from different control styles.

Examples:

- player count often feels better as pills or segmented choices
- duration may be easier to understand through range-like controls
- boolean or categorical states may be clearer as chips or checkboxes

A better control system would make the app faster to scan and more pleasant to use repeatedly.

## Current State

The current app already supports:

- filtering by search, players, duration, weight, language, best player count, age, section, and recommendation shortcuts
- sorting by name, BGG rating, BGG rank, weight, and duration
- switching between gallery and list views

So this is a redesign-and-expansion effort, not a net-new feature area.

## Proposed Direction

Refresh the browsing controls so that each control type better matches the decision it represents.

The intended product direction is:

- replace some dropdowns with pills, chips, checkboxes, or sliders where that improves speed and clarity
- broaden sorting so users can order the list by additional practical attributes such as maximum players
- keep compact list mode as a first-class view option across all relevant sections
- make the overall control system feel more intentional and less form-like

This should stay focused on usability and decision speed rather than exposing every possible data attribute.

## In Scope

- redesign filter controls based on control-type fit
- expand sorting options beyond the current set
- make compact list view a clear and consistent cross-section mode
- align control behavior with the future Home/Browse/Archive separation

## Out of Scope

- advanced query builders or saved searches
- user-defined custom sort formulas
- large data-management controls unrelated to choosing a game

## Open Questions

- Which filters should remain simple dropdowns because they are already good enough?
- Should compact list mode show a denser summary or simply collapse the current card layout?
- Which new sort dimensions matter most in practice beyond maximum players?

## Notes for Future Implementation

- The app already supports sort and view state in a basic form, so future work can evolve those behaviors instead of replacing them completely.
- Control redesign should be coordinated with the information architecture refresh so the Browse experience does not inherit layout assumptions from the current single-page structure.
