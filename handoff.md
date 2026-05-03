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
- **Phase 5 (in progress).** Four of ~8–10 infographics live on the home page below the hourly hero, in this order:
  - `InfographicAnnualTwh.astro` — "How big is AI, really?" Six-bar snapshot. **NOTE:** 2024 figure (415 TWh) is stale per IEA April 2026 update (revised to 460). Needs reconciliation.
  - `InfographicWaterBracket.astro` — "Are AI data centers thirstier than golf courses?" Six-bar snapshot.
  - `InfographicDcTrajectory.astro` — "Data-center electricity, 2017 to 2030." First time-axis chart on the site. Historical line through irregular IEA-published anchor years (2017, 2018, 2022, 2024, 2025); projection band 2025→2030 from 830 TWh (IEA Headwinds) to 1,350 (Goldman April 2026), central dashed line at 950 (IEA Base). ACTUAL/PROJECTED labels split across the boundary hairline.
  - `InfographicAiShareTrajectory.astro` — "AI's slice of data-center electricity." Sister chart, x-axis 2024→2030. Single 2024 anchor at 65 TWh, projection band fanning to 200–400 TWh by 2030. The chart's pre-2024 emptiness is editorially explained in the prose, not visually represented.

Next: **Either the IEA April 2026 update sweep** (reconcile the annual-twh 415→460 figure, audit the other comparison cards for figures that may have drifted, refresh `last_verified` dates) **or visual #5.** Strong visual #5 candidates from Plan section 5: household-equivalents staircase (translating big TWh into "X million U.S. households' worth"), or the "what a watt actually is" scale primer (microwave → house → town → country). Pace: one or two visuals per session.

## Read these in order

1. `website_plan.md` — full plan: editorial frame, audience, structure, comparison set, infographics, honesty layer, update mechanism, tech stack rationale, phased build, and "Queued fixes and design notes" (Section 11).
2. `authorial_voice.md` — David's voice description. Use as a guideline. The anti-AI-speak rubric in Claude's persistent memory takes precedence when they conflict.
3. `user_profile.md` — collaboration preferences: compact responses, beginner coder, small verifiable milestones, focus on one thing at a time, distinguish facts from hypotheses.
4. `phase1_setup.md` — original Phase 1 walkthrough; mostly historical now.

The Anti-AI-speak rubric memory file (in Claude's persistent memory, not this folder) governs all prose for this project — site copy, chat replies, code comments. Apply it before publishing anything.

## Design decisions during Phase 5

- **Infographic data lives in `figures.json` under a sibling key `infographics`,** parallel to `comparisons`. Bar-chart infographics use the same shape as comparisons (figures, sources, summary, last_verified, anchor) plus presentation metadata (kicker, title, unit_caption). When an infographic shares numbers with a comparison (water bracket and water-dc-vs-golf), the figures are duplicated rather than referenced. Single source of truth would be cleaner; refactor if a third overlap appears.
- **Trajectory infographics use a different schema shape** alongside the bar-chart shape: `historicals` (array of year/value anchor points), `projection` (with `central`, `band_low`, `band_high` arrays of year/value pairs), and metadata `x_min`, `x_max`, `y_max`, `boundary_year`. Bar-chart components ignore these fields; trajectory components ignore `figures`. JSON-side schema is loose; TypeScript interfaces are inlined per component.
- **Each infographic is one self-contained `<svg>`** with kicker, title, plot, axis, short source attribution, and last-verified stamp baked inside. Honors the plan's "right-click-save produces something useful" promise (Section 5). Surrounding HTML carries only the prose summary and the clickable `SourceLine`.
- **Components named `Infographic*.astro`,** dropped onto the home page in priority order below the hourly hero. A `/figures` gallery page is deferred until ~5+ infographics exist; the trajectory pair fits on the home page cleanly.
- **Reference bars** (e.g., U.S. residential in annual-twh) use accent color at 0.32 opacity to read as scaffolding. Triggered by a `role: "reference"` field on the figure entry.
- **`niceCeiling` is duplicated per bar-chart component.** `RangeBar.astro` has the original coarse version; `InfographicWaterBracket.astro` and `InfographicAnnualTwh.astro` add granular steps. Trajectory components don't use it (fixed `y_max` per chart). Refactor to `src/lib/niceCeiling.ts` if a third caller appears with different needs.
- **Trajectory geometry is duplicated across the two trajectory components** (same plotLeft/Right/Top/Bottom, same colors, same coordinate mappers, same right-side gutter for endpoint labels). Acceptable per the same logic — refactor to a shared module if a third trajectory chart appears.
- **AI-share trajectory starts at 2024,** not 2022. Two years of empty plot before the single anchor read as broken rather than meaningful. The summary explains the cutoff in prose.
- **Honest uncertainty band on the DC trajectory runs IEA Headwinds (830) to Goldman April 2026 (1,350) by 2030,** wider than IEA scenarios alone. Both sources cited in the SVG footer.

## Open questions for David

- **Domain name** — still not picked. Some directions in `website_plan.md` Section 10.
- **Global golf source.** The water bracket and water comparison currently use a derived "site estimate" range (800–1,500 Bgal) for global golf. Decision: ship with explicit "site estimate" framing now, replace if/when a primary source surfaces.
- **Right-edge touching on infographic bars.** When the highest bar's value equals the chart's `niceCeiling`, the bar runs flush against the axis right edge.
- **U.S./global pair affordance.** The water bracket pairs U.S. and global figures by label parallelism alone. May need a small visual cue if the eye doesn't catch the pairing.
- **`niceCeiling` consolidation.** Two versions live in two files.
- **Trajectory band fill opacity (0.16).** May be too pale at typical viewing distance — visible but doesn't carry much weight. Bump to 0.22 if the live charts read under-emphasized.
- **Historical line jumpiness from irregular anchor years** (2017, 2018, 2022, 2024, 2025) on the DC trajectory. The honest visual choice creates non-uniform slopes between anchors. If it reads as broken rather than precise, options: smooth interpolation with an "interpolated" note in methodology, or accept the jumpiness as source-truth fidelity.
- **IEA April 2026 update reconciliation.** The April 2025 Energy and AI report has been partially superseded by the April 2026 "Key Questions on Energy and AI" update. The trajectory charts use the fresh numbers; the annual-twh chart still cites 415 TWh for 2024. A small sweep across all infographics and comparison cards to audit `last_verified` and citation freshness is overdue.

Closed during Phase 5:
- Schema for bar-chart infographics (sibling array in figures.json, same shape as comparisons).
- Where infographics render (home page in priority order, `/figures` gallery deferred).
- Standalone-shareable interpretation (literal — source attribution baked into the SVG).
- Trajectory schema shape (`historicals` + `projection` fields alongside `figures`).
- Trajectory geometry (shared mental model, duplicated code per component).
- AI-share x_min (2024, not 2022).
- Trajectory uncertainty band sourcing (IEA Headwinds to Goldman April 2026).
- Time-axis chart visual language (historical solid line, dashed projection line, shaded triangular band fanning from boundary, ACTUAL/PROJECTED split labels at the boundary hairline).

## Working notes

- **The figures.json byte-cap quirk affects more files than just figures.json.** During Phase 5 it bit again on `index.astro` (under 1.5KB target). Pattern reconfirmed and refined: the Edit tool (and even the Write tool) reports success, the Read tool sees full content, but the on-disk file is truncated. **Ground truth is the bash mount, not the Read tool — the Read tool can show stale content from earlier successful writes.** The reliable workarounds: bash Python heredoc for `figures.json` (`python3 << 'PYEOF' ... json.dump(...) ... PYEOF`); `cat > <file> << 'EOF' ... EOF` for plain-text files; `git checkout HEAD -- <file>` to restore. **Verify every Edit and every Write with bash `wc -c` and `tail`.** The live site is unaffected when truncation happens between commits since Vercel builds from committed state.
- **Line endings on `.md` files.** `authorial_voice.md` and `user_profile.md` periodically flip between LF and CRLF in the sandbox without intentional changes. If `git status` shows them modified at the end of a session that didn't touch them, revert with `git checkout <file>`.
- **`website_plan.md` git-state weirdness.** During the Phase 5 wrap-up it appeared as both staged-deleted AND untracked while HEAD and disk were byte-identical. Resolution was `git restore --staged website_plan.md`. If it happens again, check HEAD vs disk before doing anything destructive.
- Sandbox `npm install` for Astro times out at 45 seconds, so full builds aren't reliably verifiable in the sandbox. David's local machine handles them fine.
- `git config user.name` and `user.email` are already set on David's machine (handled in Phase 1).
- **Never run git from the sandbox bash, not even read-only commands.** Even `git status` from the sandbox creates a `.git/index.lock` file, and the sandbox can't delete it afterward. The stale lock then blocks David's local git with `fatal: Unable to create '.git/index.lock': File exists`. Clear it with `Remove-Item .git\index.lock` in PowerShell. All git operations should run in David's local terminal.
- **System-reminder file-dump tax.** Cowork triggers a system-reminder after each component edit that includes the entire post-edit file content (often 250+ lines, ~2–3K tokens each). Invisible to David but real context spend. Account for this when judging fresh-chat timing in iteration-heavy work — the visible turn count understates real token use.

## File map

```
src/
  data/figures.json                        ← single source of truth for comparisons + infographics
  layouts/Layout.astro                     ← page wrapper: masthead + main slot
  components/
    ComparisonCard.astro                   ← one card per comparison
    HourlyImpactHero.astro                 ← home-page hourly CO2 hero (two stacked RangeBars)
    InfographicAnnualTwh.astro             ← "How big is AI, really?" (Phase 5 visual #1)
    InfographicWaterBracket.astro          ← "Are AI data centers thirstier than golf courses?" (#2)
    InfographicDcTrajectory.astro          ← "Data-center electricity, 2017 to 2030" (#3, time-axis)
    InfographicAiShareTrajectory.astro     ← "AI's slice of data-center electricity" (#4, time-axis)
    RangeBar.astro                         ← horizontal bars; used by ComparisonCard, HourlyImpactHero
    SourceLine.astro                       ← clickable sources + last-verified footer
  pages/
    index.astro                            ← home: hero + thesis + cta + 4 infographics
    comparisons.astro                      ← lists all ComparisonCards from figures.json
  styles/global.css                        ← design tokens, base styles, masthead, common chrome

website_plan.md                            ← the plan
phase1_setup.md                            ← original setup walkthrough
authorial_voice.md                         ← voice description
user_profile.md                            ← David's collaboration preferences
README.md                                  ← repo readme
handoff.md                                 ← this file
```
