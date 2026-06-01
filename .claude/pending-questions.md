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
