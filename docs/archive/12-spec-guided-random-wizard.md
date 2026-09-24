# Guided Random Wizard

Status: Implemented
Priority: Completed
Related docs: app-overview.md, archive/05-spec-random-picker-experience.md
Related issue: #15

## Problem / Opportunity

The Random page is visually complete and produces useful results, but its input model is still implicit. It inherits the filters from the last Browse or Archive workspace, so someone arriving from Home or opening Random directly must understand another part of the app before they can shape the draw.

That makes Random work well as a tie-breaker after browsing, but less well as a direct answer to the table-side question: “What should we play right now?”

## Why It Matters

A short guided flow can turn practical constraints into a confident recommendation without presenting the full browse filter panel.

The intended experience should:

- be understandable when entered directly from Home
- ask only questions that materially change the candidate pool
- expose how many games remain after each answer
- preserve the playful reveal, multiple-result support, and session history already shipped
- remain compatible with Browse instead of creating a second filtering system

## Current State

Random is a dedicated top-level page that:

- draws from the currently active Browse or Archive scope
- inherits the filters from that workspace
- allows one to five results per draw
- shows a reveal state before results
- presents practical game metadata and detail links
- keeps a short, session-only draw history
- avoids recent repeats when the candidate pool permits

The page displays its inherited context, but it does not guide the user through creating that context.

## Proposed Direction

Replace the empty Random state with a compact, question-by-question wizard. Each step edits the same underlying filter state already used by Browse and Random, so there is still one source of truth and one shareable route model.

The wizard should default to the owned collection. If Random is opened from Archive, it should preserve Archive as the source scope and make that scope visible during review.

Existing filter values should preselect the corresponding answers. A visible reset action should allow starting over without requiring a return to Browse.

## Guided Flow

### Step 1: Players

Question: “How many people are playing?”

Answers:

- Any
- 1
- 2
- 3
- 4
- 5

This maps to the existing player-count eligibility filter. The 5 option means the game supports five players; it does not imply six or more. The wizard does not ask separately for “best player count” in the first version.

### Step 2: Available Time

Question: “How much time do you have?”

Answers:

- Any amount of time
- Up to 30 minutes
- Up to 60 minutes
- Up to 120 minutes
- More than 120 minutes

The “up to” answers may map to multiple existing duration bands. The wording should describe the actual inclusive behavior rather than expose internal band names.

### Step 3: Complexity

Question: “How demanding should the game be?”

Answers:

- Any complexity
- Light
- Medium
- Heavy

“Medium” may include the existing medium-light and medium-heavy bands. The wizard should optimize for a natural table-side choice rather than mirror every Browse option.

### Step 4: Result Count

Question: “How many options should we reveal?”

Answers:

- 1 game
- 2 games
- 3 games
- 4 games
- 5 games

Keep the current one-to-five range. A larger initial selection gives groups a useful shortlist that they can refine without repeating the entire draw.

### Review

Before drawing, show:

- the selected answers as removable or editable summary chips
- the source scope: Collection or Archive
- the live candidate count
- a primary “Draw” action
- a secondary “Adjust in Browse” action for advanced filters
- a reset action

If there are no candidates, do not allow an empty reveal. Keep the user in review, explain that no games match, and provide a direct way to revisit the most restrictive answers.

### Reveal And Results

The existing reveal, result cards, detail links, reroll behavior, and session history should remain. Reroll should reuse the completed wizard answers rather than restart the flow.

Each result card should offer a “Veto and replace” action. It removes that game from the current selection, excludes it from subsequent replacements and rerolls for the current decision session, and draws one new eligible game into that same position. The other cards stay in place. Multiple cards can be replaced independently.

The replacement pool consists of games matching the active answers and advanced filters, excluding the games currently shown and all games vetoed in this decision session. A replacement must never duplicate another visible card.

Show the vetoed games in a compact, reversible list. Removing a veto makes that game eligible for future draws again; it does not immediately overwrite the current selection. Starting a new decision clears all vetoes. Regular rerolls within the current decision retain them.

If a replacement cannot be found, leave the vetoed position empty and explain that no eligible alternatives remain. Offer actions to undo that veto or adjust the answers. Do not restore a rejected game or repeat another visible result automatically.

An “Adjust answers” action should return to the wizard with all selections preserved.

## Interaction Model

- Present one question at a time.
- Show compact progress such as “2 of 4” and the current step name.
- Provide Back and Continue actions; the final step advances to Review rather than drawing immediately.
- Allow answer cards to advance the flow only when that behavior is predictable; keyboard users must have an explicit Continue action available.
- Preserve answers when moving backward or opening a game detail.
- Preserve the current shortlist and vetoes while the user inspects game details.
- Keep the current context in the URL so refresh, sharing, and browser navigation remain reliable.
- Use the same underlying filters as Browse so opening Browse reflects the wizard choices.

## Candidate Feedback

The candidate count should remain visible throughout the flow. It is advisory rather than blocking until Review.

When an answer reduces the pool to zero:

- show that immediately
- allow Continue so the user can understand the full combination
- identify the zero-result state clearly in Review
- offer editing rather than silently relaxing constraints

The app must never choose a game outside the stated answers.

## Entry Points

- Home opens Random at the first incomplete step, or Review when all guided answers are already defined.
- The Browse toolbar opens Random with the current filters preselected and may go directly to Review.
- Top-level navigation preserves the current wizard state during the session.
- A shared Random URL restores the scope, answers, result count, and current wizard step.

## In Scope

- four-step guided question flow
- live candidate count
- review state before drawing
- compatibility with current Browse and Archive filters
- reset and edit-answer behaviors
- individual result replacement and reversible, session-scoped vetoes
- URL-backed wizard state
- responsive desktop and mobile layouts
- Spanish and English copy
- accessible focus, labels, progress, and keyboard navigation
- preservation of existing reveal, results, rerolls, and session history

## Out Of Scope

- new collection metadata or new filter dimensions
- categories, mechanics, age, copy language, or search as wizard questions
- voting, group phones, brackets, or elimination rounds
- persistent draw history
- recommendations based on past behavior
- silently relaxing filters when there are no candidates
- redesigning game detail cards outside the Random flow

## Acceptance Criteria

- A user can reach a draw from Home by answering four short questions and reviewing the resulting context.
- Each answer updates the eligible candidate count.
- Back, Continue, reset, refresh, and shared URLs preserve a coherent state.
- Browse-originated filters appear as preselected wizard answers where they map cleanly.
- The final draw contains only games matching the wizard answers and selected source scope.
- A user can replace one of up to five results without changing the other cards, and no visible card is duplicated.
- Vetoed games stay excluded from replacements and rerolls until their veto is removed or a new decision starts.
- An exhausted replacement pool produces an explicit, recoverable empty position.
- Zero candidates produce a recoverable review state rather than an empty reveal.
- Games drawn in the current session continue to appear in the existing Random history.
- The flow works at desktop and mobile widths and is operable with a keyboard.
- Existing Browse, Archive, detail, history, and Random result behavior remains covered by regression tests.

## Implementation Notes

- Reuse the existing `players`, `duration`, `weight`, section, and draw-count state rather than introducing parallel filtering logic.
- Add a small wizard state value for the active step and review state; serialize it in the Random route.
- Treat the wizard duration and complexity choices as presentation-level groupings over the existing filter bands.
- Keep advanced filters inherited from Browse visible in Review even when they do not have a dedicated wizard question.
- If an inherited advanced filter is causing zero candidates, “Adjust in Browse” is the explicit escape hatch.
- Retain the current recent-result avoidance and reveal timing.
- Keep vetoes separate from the existing recent-result history: recent results are a soft preference, while vetoes are a hard exclusion for the current decision.
- Represent the visible selection as stable positions so replacing one result does not reorder or reroll the rest.

## Resolved Product Decisions

- The wizard is a guided editor of the existing filter context, not a separate recommendation engine.
- Owned Collection remains the default scope.
- Archive remains supported when it is the originating scope.
- The first version asks only high-signal practical questions.
- Review is mandatory before the reveal.
- The wizard offers up to five results.
- Users may veto and replace individual results; vetoes can be undone and last for the current decision session.
- Constraints are never relaxed automatically.
