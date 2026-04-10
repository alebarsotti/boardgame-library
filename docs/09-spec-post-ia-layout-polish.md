# Post-IA Layout Polish

Status: Proposed
Priority: Near-term
Related docs: 03-spec-information-architecture-refresh.md, 06-spec-visual-design-system-refresh.md

## Problem / Opportunity

The information-architecture split introduced clear top-level destinations, but the first implementation is still structurally heavier than it needs to be.

Several screens now have too much empty space, some headings dominate more than intended, and the density relationship between page headers, controls, and content is not yet balanced.

This is not a navigation problem anymore. It is a layout-polish problem that appears after the section split.

## Why It Matters

The new section model only feels successful if each page also feels intentional at a visual and spatial level.

Without that follow-up polish:

- Home can feel oversized and under-filled
- Settings can feel sparse rather than purposeful
- Browse and Archive can feel administratively heavy instead of fast and practical
- Random can feel like a placeholder destination instead of a lightweight decision surface

This work should make the new IA feel finished enough for repeated real use before a larger design-system refresh happens later.

## Current State

The app now includes distinct `Home`, `Browse`, `Archive`, `Random`, and `Settings` areas, but there are still visible layout issues:

- Home hero copy can wrap too aggressively and create unnecessary vertical mass
- hero stats can feel detached from the main message instead of supporting it
- some section headers create large empty zones, especially on wider screens
- Settings currently gives too much visual weight to its intro block and not enough to its actual controls
- Browse and Archive still have slightly too much separation between section header, results toolbar, filters, and content
- Random still behaves correctly but can feel visually light or transitional

## Proposed Direction

Polish the post-IA layout so each top-level area has clearer proportions, tighter hierarchy, and better use of space without changing the core navigation model introduced by spec 03.

The intended direction is:

- make Home feel like a confident landing surface rather than a large hero plus leftover space
- make Browse and Archive feel denser and faster to scan
- make Settings feel compact and utility-first
- make Random feel intentional, even when it has no current draw yet
- improve spacing behavior on large screens before doing broader theme or component-system work

## In Scope

- tighten page-header spacing and proportions after the IA split
- rebalance Home hero, stats, CTAs, and supporting cards
- reduce oversized empty regions in Settings and Random
- improve density and rhythm in Browse and Archive
- align supporting copy so sections feel product-facing rather than transitional
- review responsive behavior where current spacing choices scale poorly

## Out of Scope

- full visual rebrand or theme redesign
- replacing the current control types from spec 04
- major typography-system work beyond what layout balance requires
- backend, routing, or data-model changes

## Open Questions

- Should Home keep a prominent hero at all, or move toward a shorter dashboard-like intro?
- Should Settings remain a two-card utility page or become a more compact stacked preferences surface?
- Should Random stay minimal and tactical, or become more expressive before animation work from spec 05?
- How much density should Browse gain before it starts to feel visually crowded?

## Notes for Future Implementation

- Favor proportional fixes over adding more content. Most of the current issue is empty space, not missing features.
- When adjusting Home, consider whether stats belong beside the hero copy or directly beneath it.
- Browse and Archive likely benefit more from compaction than redesign: smaller paddings, tighter vertical rhythm, and stronger alignment between header and results summary.
- Settings should visually prioritize the preference controls over introductory copy.
- Random empty state should feel deliberate and useful, not like an unfinished placeholder.
- This spec should likely land before or alongside a broader visual-system refresh from spec 06 so the section split feels mature.
