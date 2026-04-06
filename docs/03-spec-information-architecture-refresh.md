# Information Architecture Refresh

Status: Proposed
Priority: Mid-term
Related docs: app-overview.md, 05-spec-random-picker-experience.md, 06-spec-visual-design-system-refresh.md

## Problem / Opportunity

The current app places the hero, filters, collection results, archive access, and language switching in one combined experience. That makes the product functional, but it compresses several different jobs into a single screen.

As the app grows, this structure will make it harder to give each area the right emphasis and layout.

## Why It Matters

The app is evolving beyond a single filtered gallery. Clearer top-level sections would make it easier to understand where to browse, where to filter deeply, where to review archived games, and where to use supporting utilities.

This should also create space for stronger visual identity in each area instead of forcing every feature into the same layout shell.

## Current State

Today the app behaves as one main page with:

- a hero section at the top
- the language selector embedded in that hero
- filters and recommendations in a sidebar
- collection and archive switching inside the same browsing flow
- random selection exposed as modal actions inside the same page

## Proposed Direction

Reframe the product as a set of clearly separated sections or pages rather than one unified browsing surface.

The target structure should move toward something like:

- Home: a cleaner entry point focused on the current collection
- Browse: the deeper filtering and exploration workspace
- Archive: a distinct section for previously owned games, with room for a different visual treatment
- Random: either a dedicated page or a strongly separated utility area
- Settings or equivalent utility space for language and future preferences

The language selector should move out of the hero and into a more durable utility location, such as Settings or another persistent preference area.

## In Scope

- define clearer top-level sections with distinct roles
- separate Home from advanced Browse behavior
- separate Archive from the current collection flow
- move language selection out of the hero
- create room for future utility areas without overloading the landing view

## Out of Scope

- final routing technology choices
- detailed wireframes for every page
- final visual language for each section beyond directional intent

## Open Questions

- Should Random become a permanent top-level destination or remain a utility reachable from elsewhere?
- Should Settings be its own page, a drawer, or a smaller utility surface?
- How much content should remain on Home beyond the collection list itself?

## Notes for Future Implementation

- This spec should guide navigation and section boundaries first; detailed styling can be handled with the visual design refresh.
- Archive may benefit from intentionally different presentation rather than being only a filtered variant of the collection page.
