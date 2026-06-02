# Pending judgment calls for David

This file is the coordination point between Claude's autonomous sessions
and David. When Claude encounters an item it shouldn't decide alone
(aesthetic, scope, contested copy), it writes an entry here and skips to
the next queue item.

David answers by adding a `**David's answer:**` line under any entry.
On the next session start, Claude reads this file and acts on every
answered entry.

## Format

```
### Q-NN — short slug
**Asked at:** 2026-MM-DD HH:MM:SS (commit-sha)
**Context:** what queue item I was working on, what came up.
**My recommendation:** what I'd do if you ack.
**Why I'm deferring:** which category from autonomous-config triggered.
**What I'll do when you answer:** specific next step.

**David's answer:** _(append here)_
```

---

### Q-01 — add a "Skip to main content" link as the first focusable element
**Asked at:** 2026-06-02 04:26:28 UTC (7f68307)
**Context:** axe-core run on the live deploy (per autonomous run 3, deeper a11y pass). Zero serious or critical violations across `/`, `/comparisons/`, `/methods/`. One uncomplicated WCAG 2.4.1 enhancement surfaced: the home page has 63 focusable elements; tab order opens with the wordmark, then 6 rail-dots, then content. A keyboard user lands on the wordmark and has to tab through 7 nav elements to reach the first chapter. WCAG 2.4.1 "Bypass Blocks" recommends a skip link.
**My recommendation:** add `<a class="skip-link" href="#main">Skip to main content</a>` as the very first child of `<body>` in `Layout.astro`, with CSS that hides it offscreen until it receives `:focus-visible`. On focus it slides in at the top-left, rust-on-paper, with the standard `:focus-visible` ring. The `<main id="main">` anchor already exists. Site-wide enhancement (lands on all 3 pages via Layout). About 15 lines of CSS + 1 line of markup; no design judgment needed beyond the visual treatment when focused (paper background, rust text, same outline-offset/border-radius as other focus-visible elements — reuses existing tokens).
**Why I'm deferring:** site structure change (a new visible element on every page when focused). Falls under "new page sections or site structure" from the defer categories.
**What I'll do when you answer:** add the markup + CSS to `src/layouts/Layout.astro` in one focused commit `feat(a11y): skip-to-main link surfaced on :focus-visible`. Build gate + deploy verify.

**David's answer:** _(append here)_

---

### Q-02 — retire queue item #2 (OrnatePopupTrigger structural rebuild)?
**Asked at:** 2026-06-02 04:26:28 UTC (7f68307)
**Context:** handoff queue still lists "OrnatePopupTrigger structural rebuild — the 22 element-permitted-content errors (`<div>` inside `<button>`) — fix means switching to `<div role=\"button\" tabindex=\"0\"> + manual keyboard handler (Enter, Space) + ARIA state. Real work, breaks current focus behavior subtly. Focused session only." On audit, every `.ornate-popup-trigger` on the live deploy is **already** `<div role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="…">`. Synthetic keydown probes confirm Enter and Space both open the `<dialog>` and `aria-expanded` toggles correctly. No `<div>`-inside-`<button>` violation remains.
**My recommendation:** retire this item from the queue. The work has been completed by an earlier session (likely session 9 or 10, hidden in a non-focused commit). The `feedback_html5_validity` story for this site is now closed; nothing else queued for it.
**Why I'm deferring:** scope/queue change — handoff edits that retire planned items belong to David's discretion, not autonomous-mode.
**What I'll do when you answer:** rewrite handoff.md queue to remove item #2, renumber the remaining items, and move on to the next listed work (was: in-place popup for "How this was calculated", or further pngquant/SVG ornament work).

**David's answer:** _(append here)_

---
