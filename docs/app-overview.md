# App Overview

Status: Current baseline
Phase: Foundation
Related docs: docs/README.md

## What The App Is

`boardgame-library` is a static web app for browsing and choosing games from a personal BoardGameGeek collection export.

The app is designed for real table-side use: it helps narrow a collection quickly, surface good candidates for the current group, and pick a game without relying on live API calls at runtime.

## Product Goal

The product goal is to make a personal board game collection easier to explore and easier to decide from.

The current experience focuses on:

- filtering the collection by practical play constraints
- surfacing fast recommendation shortcuts
- separating currently owned games from archived ones
- supporting both Spanish and English UI copy
- offering a random picker that respects the active filters

## Current State

Today the app is a self-contained frontend with locally generated data.

Core parts of the project:

- `index.html` provides the page structure, dialogs, and app shell
- `styles.css` defines the visual system and responsive layout
- `app.js` handles data loading, filtering, rendering, localization, dialogs, persistence, and random selection
- `data/` contains generated collection data and optional supporting files
- `scripts/build-data.ps1` transforms a BoardGameGeek collection CSV into the runtime dataset

The current dataset model includes collection metadata plus per-game fields such as player counts, play time, weight, age guidance, ownership state, tags, ratings, and optional enrichment fields like descriptions, mechanics, categories, and images.

## Current User-Facing Capabilities

- Search games by text
- Filter by players, best player count, duration, weight, language dependence, and age band
- Switch between owned collection and archive views
- Sort results by name, rating, rank, weight, or time
- Toggle gallery and list views
- Use recommendation shortcuts such as quick, duo, teaching-friendly, and heavy
- Open a detail dialog for each game
- Pick a random game from the currently filtered result set
- Switch UI language between Spanish and English
- Save UI preferences in the browser

## Data Flow

The runtime app reads local generated data instead of depending on live BoardGameGeek requests in the browser.

The current flow is:

1. Export collection data from BoardGameGeek as CSV.
2. Run `scripts/build-data.ps1`.
3. Generate `data/games.json` for normal static hosting.
4. Generate `data/games-data.js` for direct `file://` usage.
5. Optionally enrich data with BoardGameGeek metadata and optionally download images locally.

## Deployment Model

The app is intended to remain easy to host and easy to open.

Current supported usage patterns:

- direct local usage by opening `index.html`
- deployment to any static hosting provider

No backend service is required for the current product.

## Current Constraints And Limitations

- No backend, server-side storage, or authenticated user model
- No live sync with BoardGameGeek at runtime
- Data quality depends on the exported CSV and optional enrichment step
- Title curation such as name overrides is handled during data preparation and baked into the generated dataset
- The app is oriented around a single personal collection rather than multiple users or shared libraries
- Current product behavior is driven by generated local files, so data refresh is a manual workflow

## Why This Baseline Matters

This overview defines the product baseline that future specs should build on.

New initiative specs should assume this app is currently:

- a static collection browser
- optimized for choosing games quickly
- powered by generated local data
- intentionally lightweight in infrastructure and deployment
