# Visual Design System Refresh

Status: Implemented
Priority: Completed
Related docs: app-overview.md, 03-spec-information-architecture-refresh.md, 04-spec-discovery-controls-refresh.md

## Problem / Opportunity

The app already has a visual identity, but future navigation changes and richer content will put more pressure on the design system.

A simple dark/light toggle alone would improve flexibility, but it would not fully address broader questions around typography, section identity, hierarchy, and long-term presentation consistency.

## Why It Matters

As the app grows into clearer sections and richer content, visual design becomes part of product usability rather than only decoration.

A broader design-system refresh would help:

- make sections feel intentionally different without becoming inconsistent
- improve readability in both bright and low-light contexts
- support richer browsing controls and denser list views
- give the app a stronger personality that matches its purpose

## Current State

The current app uses one shared visual system across the entire single-page experience. There is no explicit theming model for dark and light modes, and settings-like preferences are minimal.

## Proposed Direction

Define a larger visual refresh that includes theming, typography, presentation rules, and section-level identity.

Dark and light mode should be included, but as one part of a broader design effort rather than as an isolated toggle feature.

The intended direction is:

- support at least light and dark themes
- revisit typography choices and hierarchy
- define how Home, Browse, Archive, and Random can feel distinct while still belonging to one product
- align component presentation with richer content and more expressive controls

## In Scope

- dark and light theme support
- broader visual language review
- typography and hierarchy updates
- styling guidance for distinct sections and controls

## Out of Scope

- brand system work unrelated to the product itself
- accessibility certification processes beyond normal product-quality expectations
- implementation details for every component token in this early spec

## Open Questions

- Should theme preference live in Settings, as a quick header control, or both?
- Should Archive intentionally use a more subdued or different mood than Home and Browse?
- How far should the redesign go before it becomes a full visual rebrand?

## Notes for Future Implementation

- This spec should likely follow the information architecture refresh, since the section structure affects visual requirements.
- Theme support should integrate with future settings decisions rather than being bolted onto the current hero-driven layout.
