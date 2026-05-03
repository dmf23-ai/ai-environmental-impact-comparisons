# Handoff

Entry point for a fresh chat picking up the AI Environmental Impact Comparisons project. Read this first, then the docs linked below.

## What this project is

A static website that puts AI's water and energy footprint next to other large uses people already understand — driving, gaming, golf courses, lawns, streaming, Bitcoin, EV charging, residential AC. The site is meant to give arguments about AI's environmental impact a shared, sourced starting point. David is building it as a personal side project so he can point people at it during conversations.

- **Live site:** https://ai-environmental-impact-comparisons.vercel.app/
- **GitHub repo:** https://github.com/dmf23-ai/ai-environmental-impact-comparisons
- **Local directory:** `C:\Users\dmf23\Documents\Claude\Projects\AI Environmental Impact Comparisons`

## Tech stack

- Astro 5.x static site (no Tailwind; plain CSS with tokens in `src/styles/global.css`)
- Web fonts via Fontsource: Inter Variable (body) + Source Serif 4 Variable (headings)
- Hosted on Vercel via auto-deploy from the GitHub `main` branch
- DNS through David's Cloudflare account; no custom domain assigned yet
- David is on Windows, uses PowerShell, has GitHub CLI installed

## Where we are

Completed:

- **Phases 1–4.** Astro scaffold, GitHub + Vercel deploy, design tokens locked, web fonts, masthead, hourly hero on the home page, all 14 comparison cards live on `/comparisons`.
- **Phase 5 (in progress).** Two of ~8–10 infographics live on the home page below the hourly hero:
  - `InfographicAnnualTwh.astro` — "How big is AI, really?" Six bars: U.S. residential (muted reference) + global data centers + global gaming + Bitcoin + EV charging + AI workloads within data centers. Annual TWh, with the AI slice (30–80 TWh, low-medium confidence) marked as the chart's softest figure.
  - `InfographicWaterBracket.astro` — "Are AI data centers thirstier than golf courses?" Six bars: global golf (site estimate) + U.S. golf + global DC indirect + U.S. DC indirect + global DC direct + U.S. DC direct.
  
  The water bracket's six-bar expansion also reshaped the matching `water-dc-vs-golf` comparison card — same six bars, updated summary, R&A added to sources, Phase 2's ASCII fallbacks in that entry got cleaned up to Unicode em-dashes incidentally.

Next: **Phase 5 continued — visual #3.** Strong candidates: **the trajectory chart** (IEA's data-center electricity projection 2024 → 2030 with a shaded uncertainty band — would be the first time-axis chart on the site) or **the household-equivalents staircase** (translating big TWh numbers into "X million U.S. households' worth"). Pace: one or two visuals per session. Plan section 5 has the full list of 8–10 candidates.

## Read these in order

1. `website_plan.md` — full plan: editorial frame, audience, structure, comparison set, infographics, honesty layer, update mechanism, tech stack rationale, phased build, and "Queued fixes and design notes" (Section 11).
2. `authorial_voice.md` — David's voice description. Use as a guideline. The anti-AI-speak rubric in Claude's persistent memory takes precedence when they conflict.
3. `user_profile.md` — collaboration preferences: compact responses, beginner coder, small verifiable milestones, focus on one thing at a time, distinguish facts from hypotheses.
4. `phase1_setup.md` — original Phase 1 walkthrough; mostly historical now.

The Anti-AI-speak rubric memory file (in Claude's persistent memory, not this folder) governs all prose for this project — site copy, chat replies, code comments. Apply it before publishing anything.

## Design decisions during Phase 5

- **Infographic data lives in `figures.json` under a sibling key `infographics`,** parallel to `comparisons`. Same shape (figures, sources, summary, last_verified, anchor) plus presentation metadata (kicker, title, unit_caption). When an infographic shares numbers with a comparison (water bracket and water-dc-vs-golf), the figures are duplicated rather than referenced. Single source of truth would be cleaner; refactor if a third overlap appears.
- **Each infographic is one self-contained `<svg>`** with kicker, title, bars, axis, short source attribution, and last-verified stamp baked inside. This honors the plan's "right-click-save produces something useful" promise (Section 5). Surrounding HTML carries only the prose summary and the clickable `SourceLine`.
- **Components named `Infographic*.astro`,** dropped onto the home page in priority order below the hourly hero. A `/figures` gallery page is deferred until ~3+ infographics exist.
- **Reference bars** (e.g., U.S. residential in annual-twh) use accent color at 0.32 opacity to read as scaffolding rather than competition. Triggered by a `role: "reference"` field on the figure entry.
- **`niceCeiling` is duplicated per component.** `RangeBar.astro` has the original coarse version (rounds to 1, 2, 2.5, 5, 10); `InfographicWaterBracket.astro` and `InfographicAnnualTwh.astro` add granular steps (including 1.25, 1.5, 1.6, 6, 7, 8). Duplication is acceptable until a third caller needs different behavior, then refactor to `src/lib/niceCeiling.ts`.

## Open questions for David

- **Domain name** — still not picked. Some directions in `website_plan.md` Section 10.
- **Global golf source.** The water bracket and water comparison both currently use a derived "site estimate" range (800–1,500 Bgal) for global golf because the most-circulated figure (912 Bgal/year) traces back to a confused UN claim about drinking water needs for 4.7 billion people. R&A and USGA publish regional but not global totals. Decision: ship the derived range with explicit "site estimate" framing now, replace if/when a primary source surfaces. Keep ear out during future research.
- **Right-edge touching on infographic bars.** When the highest bar's value equals the chart's `niceCeiling` ceiling (e.g., global golf 1,500 hits 1,500 ceiling), the bar runs flush against the axis right edge. Currently accepted as visually dramatic; could be tuned by adjusting `niceCeiling` rules.
- **U.S./global pair affordance.** The water bracket's six-bar layout pairs U.S. and global figures by label parallelism alone. If the eye doesn't catch the pairing on use, may need a small visual cue (country-code chip, grouped row backgrounds, inline grouping).
- **`niceCeiling` consolidation.** Two versions live in two files. Worth extracting to `src/lib/niceCeiling.ts` if a third caller wants its own granularity.

Closed during Phase 5:
- Schema for infographics (decided: sibling array in figures.json, same shape).
- Where infographics render (decided: home page in priority order, `/figures` gallery deferred).
- Standalone-shareable interpretation (decided: literal — source attribution baked into the SVG itself).

## Working notes

- **The figures.json byte-cap quirk affects more files than just figures.json.** During Phase 5 it bit on Edit operations on `figures.json` (around 24KB), `index.astro` (under 1KB), AND on a small Edit to this very `handoff.md` during the wrap-up. Pattern: the Edit tool reports success, the Read tool sees the full content, but the on-disk file is truncated. The live site is unaffected when the truncation happens between commits, because Vercel builds from committed state. The reliable workarounds: bash Python heredoc for `figures.json` (`python3 << 'PYEOF' ... json.dump(...) ... PYEOF`); `git checkout HEAD -- <file>` to restore from the last good commit; or `cat > <file> << 'EOF' ... EOF` for plain-text files. **Updated heuristic: default to heredoc / restore-from-git / Write-tool for any structural file rewrite, regardless of size.** Edit tool is no longer trusted for any meaningful change on this project — verify with bash `wc -c` and `tail` after every Edit.
- **Line endings on `.md` files.** `authorial_voice.md` and `user_profile.md` periodically flip between LF and CRLF in the sandbox without intentional changes. If `git status` shows them modified at the end of a session that didn't touch them, revert with `git checkout <file>`.
- **`website_plan.md` git-state weirdness.** During the Phase 5 wrap-up it appeared as both staged-deleted AND untracked while HEAD and disk were byte-identical. Resolution was `git restore --staged website_plan.md`. Likely a sandbox-side `git rm` ran inadvertently. If it happens again, check HEAD vs disk before doing anything destructive.
- Sandbox `npm install` for Astro times out at 45 seconds, so full builds aren't reliably verifiable in the sandbox. David's local machine handles them fine.
- `git config user.name` and `user.email` are already set on David's machine (handled in Phase 1).
- **Never run git from the sandbox bash, not even read-only commands.** Even `git status` from the sandbox creates a `.git/index.lock` file, and the sandbox can't delete it afterward (no write permission to `.git`). The stale lock then blocks David's local git from doing anything that writes the index, with `fatal: Unable to create '.git/index.lock': File exists`. If this happens, David clears it with `Remove-Item .git\index.lock` in PowerShell. All git operations should run in David's local terminal.

## File map

```
src/
  data/figures.json                ← single source of truth for comparisons + infographics
  layouts/Layout.astro             ← page wrapper: masthead + main slot
  components/
    ComparisonCard.astro           ← one card per comparison
    HourlyImpactHero.astro         ← home-page hourly CO2 hero (two stacked RangeBars)
    InfographicAnnualTwh.astro     ← "How big is AI, really?" (Phase 5 visual #1)
    InfographicWaterBracket.astro  ← "Are AI data centers thirstier than golf courses?" (Phase 5 visual #2)
    RangeBar.astro                 ← horizontal bars, point + range values; used by ComparisonCard, HourlyImpactHero
    SourceLine.astro               ← clickable sources + last-verified footer
  pages/
    index.astro                    ← home: hero + thesis + cta + infographics
    comparisons.astro              ← lists all ComparisonCards from figures.json
  styles/global.css                ← design tokens, base styles, masthead, common chrome

website_plan.md                    ← the plan
phase1_setup.md                    ← original setup walkthrough
authorial_voice.md                 ← voice description
user_profile.md                    ← David's collaboration preferences
README.md                          ← repo readme
handoff.md                         ← this file
```
