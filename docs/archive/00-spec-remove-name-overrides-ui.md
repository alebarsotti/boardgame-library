# Remove Name Overrides UI

Status: Implemented
Priority: Immediate
Related docs: app-overview.md

## Problem / Opportunity

The game detail view currently exposes three controls that do not fit the intended product experience:

- edit name
- save overrides
- load overrides

These actions make the detail view feel like a temporary internal tool rather than a polished collection browser. They also expose a workflow that is not well integrated into the product and is currently considered poorly designed.

## Why It Matters

The detail view should help users understand and choose games, not surface low-confidence data-maintenance controls.

Keeping these actions visible:

- adds noise to one of the most important UI surfaces
- suggests an editing workflow that is not mature enough to keep
- makes the product feel less intentional than it should

Removing them now creates a cleaner baseline and leaves room to revisit naming and override workflows later with a better design.

## Current State

Today the game detail dialog includes buttons for editing a displayed name, exporting overrides, and importing overrides. The app also stores name overrides in browser-local state and explains this workflow directly inside the detail content.

This behavior exists, but it is not considered a good long-term product feature in its current form.

## Proposed Direction

Remove the current name-override controls and related explanatory copy from the game detail experience.

The intended product behavior is:

- the detail view should no longer expose edit-name actions
- the detail view should no longer expose import or export actions for overrides
- the detail view should no longer present the current override workflow as a user-facing feature

This spec is intentionally limited to removing the current UI. It does not define the replacement approach for future title curation or manual metadata correction.

## In Scope

- remove the current game-detail controls for editing names
- remove the current game-detail controls for importing or exporting overrides
- remove the associated user-facing hint text from the detail UI
- treat the future of overrides as a separate design problem

## Out of Scope

- deleting all underlying code or data support immediately
- defining a permanent replacement workflow for title corrections
- broader metadata editing features

## Open Questions

- Should the underlying override capability remain temporarily in code even after the UI is removed?
- If name correction returns later, should it live in a separate admin-style workflow rather than the main detail view?
- Should future title curation happen in source data, in a build step, or through a dedicated maintenance tool?

## Notes for Future Implementation

- The current UI is wired directly into the game detail dialog, so this should be implementable as a contained cleanup.
- It is acceptable for implementation to remove only the user-facing surface first and defer deeper data-model cleanup if that keeps the change safer.
