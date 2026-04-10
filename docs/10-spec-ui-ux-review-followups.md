# UI / UX Review Follow-ups

Status: Proposed
Priority: Later
Related docs: 05-spec-random-picker-experience.md, 06-spec-visual-design-system-refresh.md, 09-spec-post-ia-layout-polish.md

## Problem / Opportunity

The browse-control refresh has improved the practical filtering flow, but real usage surfaced a second layer of refinements that are better handled as follow-up UX review work instead of continuing to stretch spec 04.

These are not blockers for the current product behavior. They are quality-of-use observations that should be validated after some real interaction with the app across desktop and mobile.

## Why It Matters

The current UI is now functional in the right places, but a few controls and layout details may still have room to become clearer, more compact, or more expressive.

Capturing these ideas in a dedicated spec keeps the implemented browse refresh closed while preserving useful design feedback for future polish.

## Current State

The app now includes:

- mixed control types across Browse and Archive
- ordinal duration and weight filters with `exact`, `until`, and `from` modes
- a compact toolbar-level view toggle for gallery and list
- independent filter-panel scrolling
- a denser list presentation for result cards

During implementation and review, several possible next-step refinements emerged, but none were required to ship the current iteration.

## Proposed Direction

Review the new interface in use and decide which of the following deserve a focused polish pass:

- whether `weight` should remain chip-based or evolve into a more scale-like discrete control
- whether `best players` is best kept as a compact select or should return to a faster direct-touch control
- whether the duration and weight mode controls need stronger visual explanation or more compact phrasing
- whether active-filter summaries should become even more explicit for ordinal filters
- whether the toolbar view toggle should remain minimal or gain a more overt switch treatment
- whether any of the refreshed controls feel cramped, oversized, or slow to scan on mobile

## In Scope

- post-implementation review of control clarity and hierarchy
- visual polish ideas discovered through actual usage
- mobile and responsive UX observations after the browse-control refresh
- follow-up improvements that do not require a new data model

## Out of Scope

- redoing the completed spec 04 implementation from scratch
- backend or dataset changes
- broad branding or theming work that belongs to spec 06
- random-experience redesign that belongs to spec 05

## Open Questions

- Is the current duration and weight interaction the right balance between power and readability?
- Do the compact select-based filters feel appropriately secondary, or too hidden?
- Does the list/gallery toggle feel sufficiently obvious and discoverable in repeated use?
- Which issues appear only on mobile or smaller laptop screens?

## Notes for Future Implementation

- Treat this as an observation-driven polish spec, not a net-new feature initiative.
- Prefer validating issues through actual usage before redesigning controls again.
- Keep follow-up changes scoped to UI/UX quality unless repeated use reveals a true behavior gap.
- If several items here cluster around spacing and hierarchy rather than interaction design, they may partially overlap with spec 09 and should be coordinated rather than duplicated.
