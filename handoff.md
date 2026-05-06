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
- **Phase 5.** Wrapped at six visuals 2026-05-04 (decision in this session: pivot to Phase 6 over a seventh visual). Six of the originally planned ~8–10 infographics live on the home page below the hourly hero, in this order:
  - `InfographicRangeVsPoint.astro` — "Why every figure here is a range." Pedagogical primer placed between the hourly hero and the rest of the stack. Two horizontal scales share a single x-axis: a single dot at 65 TWh on top, a striped range bar 30–80 TWh with a faint central tick at 65 below, tied by a faint dashed vertical guide at the central value. Editorial caption ("Each figure is a range unless the source itself publishes a single defensible number.") baked into the SVG so the saved image carries the rule. First use of the baked-in-SVG editorial caption pattern.
  - `InfographicAnnualTwh.astro` — "How big is AI, really?" Six-bar snapshot.
  - `InfographicWaterBracket.astro` — "Are AI data centers thirstier than golf courses?" Six-bar snapshot.
  - `InfographicDcTrajectory.astro` — "Data-center electricity, 2017 to 2030." First time-axis chart on the site. Historical line through irregular IEA-published anchor years (2017, 2018, 2022, 2024, 2025); projection band 2025→2030 from 830 TWh (IEA Headwinds) to 1,350 (Goldman April 2026), central dashed line at 950 (IEA Base). ACTUAL/PROJECTED labels split across the boundary hairline.
  - `InfographicAiShareTrajectory.astro` — "AI's slice of data-center electricity." Sister chart, x-axis 2024→2030. Single 2024 central anchor at 65 TWh; 2024 band runs 30–80 TWh (widened from 50–80 this session for consistency with the household-equivalents and primer ranges); projection band fans to 200–400 TWh by 2030. Wider literature reaches as high as 900 TWh, treated as a tail in prose. The chart's pre-2024 emptiness is editorially explained in the prose, not visually represented.
  - `InfographicHouseholdEquivalents.astro` — "Data-center electricity, in household-years." Translates TWh into millions of U.S. households at 11.9 MWh/HH/yr. Six bars in display order: U.S. residential reference (130M, faint scaffolding at the top), AI 2024 (2.5–6.7M), Bitcoin 2024 (12–17M), global gaming (6.3–24M), global data centers 2024 (39M), global data centers 2030 IEA scenarios (70–113M, IEA base tick at 80M). First use of a horizontal ACTUAL/PROJECTED hairline on a bar chart — the trajectory charts use a vertical one at the boundary year; this one runs between the DC 2024 and DC 2030 rows.

IEA April 2026 audit completed 2026-05-03 — all figures reconciled (electricity 415→460 TWh in 8 places, CO₂ 220→180 Mt in 5 places), prose recomputes applied (ratios, percentages, "X times" phrasings), `last_verified` bumped on 13 sections (12 comparison cards + annual-twh infographic). The site is consistent with the IEA April 2026 "Key Questions on Energy and AI" update across all displays.

**Phase 6 in progress.** Session A of the infographics methodology pass landed 2026-05-05 — three new sections in methods.astro (range-vs-point-primer, annual-twh, water-bracket) plus the matching three components now pass `methodsAnchor={data.anchor}` to SourceLine. Each rendered card on the home page now shows a "How this was calculated →" link below its source line.

Cadence note: David and Claude opted for two sessions over one, grouped by methodological interlock. Session A took the three independent infographics; Session B takes the interlocking triad (DC trajectory, AI-share trajectory, household-equivalents), which all share IEA scenarios + Goldman April 2026 + the AI 2024 anchor as cross-references and benefit from being written in one pass.

Next: **Session B** — three remaining infographic methodology sections (DC trajectory, AI-share trajectory, household-equivalents) plus their `methodsAnchor` wirings. After that: comparison cards (one or two sessions). Visual #7 (training vs. inference over time) and Visual #8 (watt-scale primer) remain parked, slated to ship after their methodology sections exist.

## Read these in order

1. `website_plan.md` — full plan: editorial frame, audience, structure, comparison set, infographics, what keeps the figures defensible, update mechanism, tech stack rationale, phased build, and "Queued fixes and design notes" (Section 11).
2. `authorial_voice.md` — David's voice description. Use as a guideline. The anti-AI-speak rubric in Claude's persistent memory takes precedence when they conflict.
3. `user_profile.md` — collaboration preferences: compact responses, beginner coder, small verifiable milestones, focus on one thing at a time, distinguish facts from hypotheses.
4. `phase1_setup.md` — original Phase 1 walkthrough; mostly historical now.

The Anti-AI-speak rubric memory file (in Claude's persistent memory, not this folder) governs all prose for this project — site copy, chat replies, code comments. Apply it before publishing anything.

## Design decisions during Phase 5

- **`niceCeiling` is consolidated to `src/lib/niceCeiling.ts`** with a parameterized API: `niceCeiling(n, { granular: true })` accesses the 6/7/8 mantissa steps WaterBracket relies on; the bare call uses the default 1/1.25/1.5/1.6/2/2.5/3/4/5/10 steps, which gives most charts useful breathing room on the right edge. The asymmetry is deliberate: the default steps prevent the right-edge-touching issue the handoff flags as queued. Future bar charts pick `granular: true` only if they need a tighter ceiling for a specific max value.
- **The range-vs-point primer uses a fourth schema shape** in `figures.json`: a single `demo_figure` object (`label`, `central`, `low`, `high`, `confidence`) plus top-level `caption` and `summary`. Other infographics use bar-chart shape (`figures` array), trajectory shape (`historicals` + `projection`), or unit-conversion shape (`twh*` + `mwh_per_household` + `boundary_after_index`). The primer's structure is single-figure, single-purpose, so it didn't earn shared schema; refactor only if a second didactic infographic appears.
- **Editorial caption baked into the SVG** is a new pattern for didactic visuals. The primer's one-line caption ("Each figure is a range unless the source itself publishes a single defensible number.") sits inside the `<svg>` between the axis and the footer rule, in italic Source Serif. Reasoning: a saved image of the primer needs the rule; without it, the chart is just dot-vs-band with no editorial position. Other infographics carry their summary in the surrounding `<figcaption>` only.
- **Bar-chart infographic data** lives in `figures.json` under a sibling key `infographics`, parallel to `comparisons`. Same shape as comparisons (figures, sources, summary, last_verified, anchor) plus presentation metadata (kicker, title, unit_caption). When an infographic shares numbers with a comparison (water bracket and water-dc-vs-golf), the figures are duplicated rather than referenced. Single source of truth would be cleaner; refactor if a third overlap appears.
- **Trajectory infographics use a different schema shape** alongside the bar-chart shape: `historicals` (array of year/value anchor points), `projection` (with `central`, `band_low`, `band_high` arrays of year/value pairs), and metadata `x_min`, `x_max`, `y_max`, `boundary_year`. Bar-chart components ignore these fields; trajectory components ignore `figures`. JSON-side schema is loose; TypeScript interfaces are inlined per component.
- **Unit-conversion infographics use a third schema shape.** Figures carry `twh` / `twh_low` / `twh_high` (and optional `twh_central`) instead of raw `value` fields, plus a top-level `mwh_per_household` constant and a `boundary_after_index` integer pointing at the row above which the ACTUAL/PROJECTED hairline draws. The component derives household equivalents from the TWh values at render time, so the data file stays anchored in the underlying physical quantity. Currently used only by `InfographicHouseholdEquivalents.astro`.
- **Each infographic is one self-contained `<svg>`** with kicker, title, plot, axis, short source attribution, and last-verified stamp baked inside. Honors the plan's "right-click-save produces something useful" promise (Section 5). Surrounding HTML carries only the prose summary and the clickable `SourceLine`.
- **Components named `Infographic*.astro`,** dropped onto the home page in priority order below the hourly hero. A `/figures` gallery page is deferred until ~5+ infographics exist; we are now at five and the home page still reads cleanly. Reassess gallery placement at visual #7 or whenever the home-page scroll starts to feel bloated.
- **Reference bars** (e.g., U.S. residential in annual-twh and household-equivalents) use accent color at 0.32 opacity to read as scaffolding. Triggered by a `role: "reference"` field on the figure entry.
- **Projected bars** in unit-conversion charts use the same striped range pattern as ordinary range bars, distinguished editorially by the ACTUAL/PROJECTED hairline rather than by a unique fill. A central tick marks the IEA-base case within the range when `twh_central` is provided.
- **Horizontal ACTUAL/PROJECTED hairline** — new pattern this session. Trajectory charts use a vertical hairline at the boundary year; the household-equivalents bar chart uses a horizontal one between the DC 2024 and DC 2030 rows, with ACTUAL above and PROJECTED below, center-aligned in the chart. A 26-pixel boundary gap is inserted only for rows after the boundary so the labels don't crowd adjacent bar labels.
- **`niceCeiling` is now duplicated across three bar-chart components** (`InfographicAnnualTwh`, `InfographicWaterBracket`, `InfographicHouseholdEquivalents`) plus the original coarse version in `RangeBar.astro`. The handoff's prior "refactor at three callers" trigger has been crossed; the next agent should consolidate to `src/lib/niceCeiling.ts` if any further bar-chart visual needs it, or as queued maintenance.
- **Trajectory geometry is duplicated across the two trajectory components** (same plotLeft/Right/Top/Bottom, same colors, same coordinate mappers, same right-side gutter for endpoint labels). Acceptable per the same logic — refactor to a shared module if a third trajectory chart appears.
- **AI-share trajectory starts at 2024,** not 2022. Two years of empty plot before the single anchor read as broken rather than meaningful. The summary explains the cutoff in prose.
- **Uncertainty band on the DC trajectory runs IEA Headwinds (830) to Goldman April 2026 (1,350) by 2030,** wider than IEA scenarios alone. Both sources cited in the SVG footer. The household-equivalents 2030 bar reuses this same range.
- **Chart-side number formatting** in the household-equivalents component uses integers above 10 ("39", "70–113", "130") and one decimal below ("2.5–6.7"). Mixed precision in a range like "6.3–24" is fine; the low end keeps the decimal it deserves. The rule keeps the chart consistent with the summary prose, which anchors on "39 million American homes" rather than "38.7 million."

## Open questions for David

- **Domain name** — still not picked. Some directions in `website_plan.md` Section 10.
- **Global golf source.** The water bracket and water comparison currently use a derived "site estimate" range (800–1,500 Bgal) for global golf. Decision: ship with explicit "site estimate" framing now, replace if/when a primary source surfaces.
- **Right-edge touching on infographic bars.** When the highest bar's value equals the chart's `niceCeiling`, the bar runs flush against the axis right edge.
- **U.S./global pair affordance.** The water bracket pairs U.S. and global figures by label parallelism alone. May need a small visual cue if the eye doesn't catch the pairing.
- **Trajectory band fill opacity (0.16).** May be too pale at typical viewing distance — visible but doesn't carry much weight. Bump to 0.22 if the live charts read under-emphasized.
- **Two virtue-claim patterns in `website_plan.md` Section 1 prose** — "honest ranges" and "calibrate, not to comfort or alarm" (both on line 9) — flagged during the Section 6 rename pass but not scrubbed. Planning-doc prose rather than site copy; decide whether to scrub next pass.
- **Historical line jumpiness from irregular anchor years** (2017, 2018, 2022, 2024, 2025) on the DC trajectory. The source-faithful choice creates non-uniform slopes between anchors. If it reads as broken rather than precise, options: smooth interpolation with an "interpolated" note in methodology, or accept the jumpiness as source-truth fidelity.
- **HourlyImpactHero.astro has stray duplicate-tail content** from a prior recovery — the `<style>` block closes cleanly, then there's an orphan `font-size: 1.7rem; }} </style>` tacked on after. Astro is tolerating it on the live build, but the file is dirty. Five-second cleanup; queued for Session B housekeeping or skip.

Closed during Phase 6:

- Range-vs-point primer methodology section landed 2026-05-05. Walks the AI-2024 demo number (65 TWh central, 30–80 band) with three derivation paragraphs: the single-point framing, the range framing, and "the licensed exception" describing where point estimates are still allowed. `InfographicRangeVsPoint.astro` now passes `methodsAnchor={data.anchor}` to SourceLine.
- Annual-TWh methodology section landed 2026-05-05. Six-figure walkthrough — U.S. residential reference (1,550 TWh), global data centers (460), gaming (75–285), Bitcoin (140–200), EV charging (180), AI (30–80) — with per-figure source notes. The IEA April 2026 reconciliation (415→460) is called out in the data-centers paragraph. `InfographicAnnualTwh.astro` wired same pattern.
- Water-bracket methodology section landed 2026-05-05. Walked Derivation by bucket (golf U.S./global, DC direct, DC inclusive) — six rows but four logical buckets, since the U.S./global rows pair within each boundary. Two-paragraph Assumptions block: three modeling assumptions, plus a separate framing note that golf irrigation and data-center water differ in environmental terms and the chart shows volumes not impacts. `InfographicWaterBracket.astro` wired same pattern.
- methods.astro frontmatter pattern established: a `findInfographic(id)` helper does lookup-by-id on the `infographics` array, with each section's data assigned to a named const (`primer`, `annual`, `waterBracket`, ...). Adding a new section in Session B = one find-call line + one `<section>` block + the component wiring.
- Warmup scrub of website_plan.md Section 1: replaced "honest ranges" and "calibrate, not to comfort or alarm" virtue-claim patterns. New text: "comparisons exist to set the scale of the thing. Each number is a range with the spread shown and the sources linked." Anti-AI-speak rubric Tier 1 #1 (negation-correction) and Tier 2 #14 (honest virtue-claim) both addressed.
- /methods page skeleton landed 2026-05-04 — first section ships with the hourly-hero (per-hour CO₂ comparison). Section schema established: small uppercase locator + h2 title + intro paragraph + Derivation subsection + Assumptions subsection + Uncertainty subsection + SourceLine. Reusable for all subsequent per-display sections.
- "How this was calculated →" link affordance pattern landed via `SourceLine.astro` 2026-05-04 — accepts an optional `methodsAnchor` prop and conditionally renders an `<a>` pointing at `/methods#<methodsAnchor>` below the verified date. Consumers opt in by passing the prop. `HourlyImpactHero.astro` is the first consumer; `ComparisonCard.astro` and the six infographic components plug in next.
- Anchor convention for /methods: comparison cards reuse their existing `anchor` field (so `/methods#water-vs-golf` matches `/comparisons#water-vs-golf`). Hourly hero is `hourly-hero`. Infographics use their figures.json `infographics` key in lowercase-hyphen form (e.g. `range-vs-point-primer`, `dc-trajectory`).
- Methodology prose register established on the hourly-hero section: walks through specific arithmetic (e.g. `400 g/mile × 30 mph = 12,000 g/hr`, plus 15–30% upstream → 14–18 kg/hr) for each of the five figures, with assumptions and per-figure confidence levels called out separately. Drawn from the original PDF report's sections A1–A3 and Methods block. If David wants this more conceptual or more concrete, easier to revise the one section before the pattern propagates to the other six infographics.

Closed during Phase 5:

- Range-vs-point primer shipped 2026-05-04 — visual #6 of Phase 5. New schema shape (single `demo_figure` object with `central`, `low`, `high` plus `caption`, no `figures` array). New visual pattern: editorial sentence baked into the SVG so a saved image carries the rule. New layout pattern: two scales sharing a single x-axis with a faint dashed vertical guide at the shared central value.
- AI 2024 range reconciled to 30–80 TWh across all three displays (trajectory, household-equivalents, primer). The trajectory's `band_low[2024].value` was widened from 50 to 30; summary rewritten to acknowledge the wider literature at 2024 explicitly. `last_verified` bumped 2026-05-04.
- `niceCeiling` consolidated to `src/lib/niceCeiling.ts` with a parameterized `granular` opt-in. Three callers (annual-twh, household-equivalents, range-vs-point) use the default; WaterBracket passes `{ granular: true }` to access the additional 6/7/8 mantissa steps it needs to keep its right-edge breathing room. RangeBar's coarser version stays inline — different shape, different purpose, not part of this refactor.
- The word "honest" struck from site copy in two places (DC trajectory summary and primer summary). Anti-AI-speak rubric extended with Tier 2 #14 ("honest / honestly" as a virtue claim) so the pattern won't recur. Tier 3 items renumbered 14–18 → 15–19.
- Section 6 of `website_plan.md` renamed `The honesty layer` → `How the figures stay defensible` 2026-05-04. Body opener tightened from "Three things keep the site trustworthy" → "Three mechanisms hold the figures up." Doc-summary sentence and handoff.md reading-order summary updated to match. The new title describes the procedural property rather than naming a virtue (rubric Tier 2 #14).
- IEA April 2026 audit (electricity 415→460 TWh, CO₂ 220→180 Mt, prose recomputes, `last_verified` bumped on 13 sections — committed 2026-05-03). The 220 Mt figure was a calc-based approximation rather than a direct IEA cite; the April 2026 update consistently quotes 180 Mt.
- Household-equivalents infographic shipped 2026-05-04 — visual #5 of Phase 5. Adds the unit-conversion schema shape, the horizontal ACTUAL/PROJECTED hairline pattern, and the `fmtHH` integer-above-10 formatting rule.
- Multi-touch figures.json updates via Python script written to outputs and run from bash (extends the heredoc workaround in working notes). Cleaner than chained Edits and dodges the byte-cap quirk.
- Schema for bar-chart infographics (sibling array in figures.json, same shape as comparisons).
- Schema for unit-conversion infographics (`mwh_per_household`, `boundary_after_index`, `twh`/`twh_low`/`twh_high`/`twh_central`).
- Where infographics render (home page in priority order, `/figures` gallery deferred — reassess at visual #7).
- Standalone-shareable interpretation (literal — source attribution baked into the SVG).
- Trajectory schema shape (`historicals` + `projection` fields alongside `figures`).
- Trajectory geometry (shared mental model, duplicated code per component).
- AI-share x_min (2024, not 2022).
- Trajectory uncertainty band sourcing (IEA Headwinds to Goldman April 2026).
- Time-axis chart visual language (historical solid line, dashed projection line, shaded triangular band fanning from boundary, ACTUAL/PROJECTED split labels at the boundary hairline).
- Bar-chart ACTUAL/PROJECTED visual language (horizontal hairline between bar rows, center-aligned ACTUAL/PROJECTED labels, 26-pixel boundary gap).

## Working notes

- **The byte-cap quirk hit a 1.5K `index.astro` on a two-line surgical Edit this session — confirms it is not file-size-dependent.** A simple Edit adding the primer's `<InfographicRangeVsPoint />` line reported success but truncated the file at the closing `<a` tag of the cta paragraph; the `</Layout>` and entire `<style>` block were gone on disk. Restored via bash heredoc. The file was small enough that prior heuristics ('only large files at risk') do not hold.
- **The figures.json byte-cap quirk affects more files than just figures.json — and now confirmed to bite small surgical Edits to ~10K component files, not just multi-card additions.** During visual #5 work, a single small Edit to a `fmtHH` function in a 10.8K Astro component reported success but truncated the file's closing CSS block on disk. Pattern reconfirmed: the Edit tool (and even the Write tool) reports success, the Read tool sees full content, but the on-disk file is truncated. **Ground truth is the bash mount, not the Read tool — the Read tool can show stale content from earlier successful writes.** The reliable workarounds: bash Python heredoc for `figures.json` (`python3 << 'PYEOF' ... json.dump(...) ... PYEOF`); `cat > <file> << 'EOF' ... EOF` or Write-to-outputs-then-bash-cp for plain-text files; `git checkout HEAD -- <file>` to restore. **Verify every Edit and every Write with bash `wc -c` and `tail`.** The live site is unaffected when truncation happens between commits since Vercel builds from committed state.
- **Byte-cap quirk now confirmed on .md files.** During the Phase 6 kickoff session (2026-05-04), three sequential Edits to `handoff.md` and two surgical Edits to `website_plan.md` silently truncated their tails — closing portions of each file got eaten on disk. A 1-line surgical Edit to `HourlyImpactHero.astro` also lost the closing `</style>` block. Recovery via bash heredoc append. Pattern: more sequential Edits to one file in one turn → higher truncation risk. Workaround: any file getting more than two sequential Edits in a turn is safer to update via a single Python heredoc rewrite. Bash mount is ground truth; the Read tool can show pre-truncation cached content. The Edit tool's success report is not reliable.
- **Line endings on `.md` files.** `authorial_voice.md` and `user_profile.md` periodically flip between LF and CRLF in the sandbox without intentional changes. If `git status` shows them modified at the end of a session that didn't touch them, revert with `git checkout <file>`.
- **`website_plan.md` git-state weirdness.** During the Phase 5 wrap-up it appeared as both staged-deleted AND untracked while HEAD and disk were byte-identical. Resolution was `git restore --staged website_plan.md`. If it happens again, check HEAD vs disk before doing anything destructive.
- Sandbox `npm install` for Astro times out at 45 seconds, so full builds aren't reliably verifiable in the sandbox. David's local machine handles them fine.
- `git config user.name` and `user.email` are already set on David's machine (handled in Phase 1).
- **Never run git from the sandbox bash, not even read-only commands.** Even `git status` from the sandbox creates a `.git/index.lock` file, and the sandbox can't delete it afterward. The stale lock then blocks David's local git with `fatal: Unable to create '.git/index.lock': File exists`. Clear it with `Remove-Item .git\index.lock` in PowerShell. All git operations should run in David's local terminal.
- **System-reminder file-dump tax.** Cowork triggers a system-reminder after each component edit that includes the entire post-edit file content (often 250+ lines, ~2–3K tokens each). Invisible to David but real context spend. Account for this when judging fresh-chat timing in iteration-heavy work — the visible turn count understates real token use.
- **Byte-cap on Edit/Write observed at ~6.5–7K bytes during Session A (2026-05-05).** Both surgical 1-line Edits and full-file Writes truncated at roughly the same byte position when the target file landed near or above that range. Prior episodes hit at 1.5K and 4K respectively, so the cap is variable; within a single session it has appeared more consistent. Practical rule: if the target file is approaching ~6K bytes after the edit, skip Edit/Write entirely and go straight to a Python heredoc through bash. Saves the truncate-and-recover round-trip. The `feedback_edit_tool_truncation.md` memory captures the broader pattern.

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
    InfographicHouseholdEquivalents.astro  ← "Data-center electricity, in household-years" (#5, unit-conversion bar chart)
    InfographicRangeVsPoint.astro          ← "Why every figure here is a range" (#6, didactic primer)
    RangeBar.astro                         ← horizontal bars; used by ComparisonCard, HourlyImpactHero
    SourceLine.astro                       ← clickable sources + last-verified + optional methodsAnchor link
  pages/
    index.astro                            ← home: hero + thesis + cta + 6 infographics
    comparisons.astro                      ← lists all ComparisonCards from figures.json
    methods.astro                          ← per-display methodology page (Phase 6, 4 sections live: hourly-hero, range-vs-point-primer, annual-twh, water-bracket)
  lib/niceCeiling.ts                       ← shared niceCeiling helper, parameterized for granular mantissa steps
  styles/global.css                        ← design tokens, base styles, masthead, common chrome

website_plan.md                            ← the plan
phase1_setup.md                            ← original setup walkthrough
authorial_voice.md                         ← voice description
user_profile.md                            ← David's collaboration preferences
README.md                                  ← repo readme
handoff.md                                 ← this file
```
