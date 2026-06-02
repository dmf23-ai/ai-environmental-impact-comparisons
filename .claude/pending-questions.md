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

_(no open questions)_

## Resolved this run

### Q-01 — skip-to-main link
**Asked at:** 2026-06-02 04:26:28 UTC (7f68307)
**David's answer:** I'll go with your recommendation here.
**Shipped:** 2026-06-02 — `<a class="skip-link" href="#main">Skip to main content</a>` as first child of `<body>` in `Layout.astro`; `<main id="main">` anchor added; CSS in `src/styles/global.css` hides offscreen until `:focus` / `:focus-visible`, slides in at top-left, rust-on-paper, 1px rust border, 4px radius, 160ms transform transition. Reuses existing `--accent` + `--paper` tokens. Verified live across `/`, `/comparisons/`, `/methods/`.

### Q-02 — retire queue item #2 (OrnatePopupTrigger structural rebuild)
**Asked at:** 2026-06-02 04:26:28 UTC (7f68307)
**David's answer:** I'll go with your recommendation here.
**Resolved:** queue item retired in handoff.md run-3 continuation block. The structural pattern (`<div role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="false">`) is already live on every OrnatePopupTrigger and confirmed working under keyboard (Enter + Space) probes. No further work.
