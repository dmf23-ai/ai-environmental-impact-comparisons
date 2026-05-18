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
- Verifier runs on GitHub Actions (Node 20 + cheerio 1.0.0), weekly cron + manual dispatch

## Mucha's Notebook redesign — progress (May 2026)

The site is currently mid-visual-redesign under the working title "Mucha's Notebook" — restrained Art Nouveau with Tufte data discipline. Live site reflects work through Phase 2c.

**Design direction locked:**

- Palette: ivory paper (#f4ede0), warm ink (#211d1b), subject colors — water (#3a6b75 teal), electricity (#7a8c6a sage), carbon (#a85a3a rust).
- Typography: Cardo (Fontsource) for body, headlines, and chapter titles at display size. Inter retained for chart labels and UI. No dedicated Nouveau face — letterform restraint, ornament does the period work.
- Home page restructured into six paired chapters: The Hour, The Year, The Water, The Trajectory, In Equivalents, Training vs. Inference.
- Reading style: hybrid spine — essay-led paragraphs interleaved with chart-led plates.
- Scope: all three pages (home, /comparisons, /methods) in this redesign pass.

**Phase progress:**

- Phase 0 (cleanup) — done. Fixed stray `</style>` in `HourlyImpactHero.astro`.
- Phase 1 (design tokens) — done. New palette and Cardo serif in `global.css`. CO₂ subscript restored in `figures.json`.
- Phase 1.5 (hero direction check) — done. `HourlyImpactHero` pulled through end-to-end: wrapped in `OrganicFrame`, sage-italic headline sentence added, rust palette from `--accent`.
- Phase 2a (SubjectMarker + OrganicFrame) — done. Replaced original CornerCurl with subject-themed filled markers (water droplet, electricity lightning bolt, carbon diamond). `OrganicFrame` takes a `subject` prop.
- Phase 2b (SectionDividers) — done. Four motifs: wheat (electricity), vine (electricity, trajectory feel), water (wave + droplets), carbon (diamond). Stroke weights ~2px and filled accents so subject colors hold against ivory.
- Phase 2c (NumericCartouche) — done. Display-size Cardo number with subject-colored almond flourishes on either side. Used in Phase 4 at the top of bar charts.
- Phase 2d (ChapterRail) — pending. Six-dot reading-progress widget for the right margin of the home page.

**Remaining phases:**

- 3 — Home page chapter shell (rewrite `index.astro` into six chapters with `SectionDivider` openings, sage-italic headline sentences, and chapter-by-chapter prose).
- 4a — `InfographicAnnualTwh` + `InfographicWaterBracket` redesign. Includes the right-edge-touching bar fix on water bracket and the U.S./global pair affordance.
- 4b — `InfographicDcTrajectory` + `InfographicAiShareTrajectory` redesign. Sage projection band, stroke modulation on historical line, decision on irregular-anchor-year jumpiness.
- 4c — `InfographicHouseholdEquivalents` + `InfographicWattScalePrimer` redesign. Fix the rung-0 / rung-1 overlap on watt-scale.
- 4d — `InfographicRangeVsPoint` + `InfographicTrainingVsInference` redesign. Fix the truncated caption on training-vs-inference; add a numeric label adjacent to the narrow inference bar.
- 5 — `/comparisons` herbarium rebuild.
- 6 — `/methods` rebuild (2,058 lines — bash heredoc required).
- 7 — Mobile adaptive pass.
- 8 — Anti-AI-speak rubric prose sweep + final Unicode restoration (em-dash, en-dash).

**QA page:** `/dev/ornaments` renders each ornament primitive in isolation plus the four section dividers in chapter order. Internal-only, no nav link from production pages.

**New components added during the redesign:**

- `src/components/OrganicFrame.astro` — thin warm-ink border with asymmetric rounded corners (top-right + bottom-left) and optional `SubjectMarker` corner.
- `src/components/SubjectMarker.astro` — small filled motif in corner: water droplet (teal), electricity lightning bolt (sage), carbon diamond (rust).
- `src/components/SectionDivider.astro` — chapter divider with four motif options (wheat / vine / water / carbon).
- `src/components/NumericCartouche.astro` — headline-figure treatment for bar charts.
- `src/pages/dev/ornaments.astro` — internal QA page.

**Design decisions confirmed during Phase 2:**

- Corner ornament must be informational, not just decorative. `SubjectMarker` earned the corner by identifying the chart's subject; the prior generic `CornerCurl` did not and was retired.
- Stroke weights for botanical motifs must be ~2px or thicker for sage and teal to hold against ivory paper. Lighter weights drift toward gray.
- Water marker uses the canonical droplet shape (bezier sides + half-circle bottom), scaled to roughly match the visual weight of the bolt and diamond.
- `SectionDivider` motifs and `SubjectMarker` motifs use deliberately different vocabularies. The divider is decorative and contextual (chapter title clarifies subject); the marker has to communicate subject in isolation, so it uses the more conventional iconography (droplet, bolt, diamond).

## Where we are

All editorial content is in place. Phases 1–7 closed (these were the pre-redesign content phases — see the Mucha’s Notebook section above for current redesign status).

- **Phases 1–4.** Astro scaffold, GitHub + Vercel deploy, design tokens locked, web fonts, masthead, hourly hero on the home page, all 14 comparison cards live on `/comparisons`.

- **Phase 5 (closed 2026-05-07).** All eight home-page infographics live below the hourly hero, in render order:
  1. `InfographicRangeVsPoint.astro` — "Why every figure here is a range." Pedagogical primer. Single dot + striped band on a shared linear x-axis.
  2. `InfographicAnnualTwh.astro` — "How big is AI, really?" Six-bar snapshot.
  3. `InfographicWaterBracket.astro` — "Are AI data centers thirstier than golf courses?" Six-bar snapshot.
  4. `InfographicDcTrajectory.astro` — "Data-center electricity, 2017 to 2030." Time-axis chart, historical line + projection band 830–1,350 TWh by 2030.
  5. `InfographicAiShareTrajectory.astro` — "AI's slice of data-center electricity." Sister chart, 2024→2030.
  6. `InfographicHouseholdEquivalents.astro` — "Data-center electricity, in household-years." Unit-conversion bar chart with horizontal ACTUAL/PROJECTED hairline.
  7. `InfographicWattScalePrimer.astro` — "What a TWh actually is." Scale ladder primer; five log-spaced rungs (1 kWh → 1,000 TWh) with the site's three anchor figures plotted on the same log axis.
  8. `InfographicTrainingVsInference.astro` — "Where the carbon actually goes." Single-panel log axis (0.1 → 100M tCO₂); five training-event dots vs. one annual-inference range bar.

  The plan's two unbuilt items (visual #5 "Where it lands" map, visual #10 "myths" graphic) are not in scope for v1.

- **Phase 6 (closed 2026-05-06).** `/methods` complete: 23 sections in render order — hourly hero, eight home-page infographics, 14 comparison cards. Each display on the rest of the site carries a "How this was calculated →" link to its matching section.

- **IEA April 2026 audit (closed 2026-05-03).** All site figures reconciled to the IEA April 2026 update — electricity 415→460 TWh in 8 places, CO₂ 220→180 Mt in 5 places, prose recomputed where the math changed, `last_verified` bumped on the affected sections.

- **Phase 7 inventory pass (closed 2026-05-11).** Source manifest committed as `src/data/sources.json` — 30 sources classified across 4 verification modes. Reframed Section 7's parsability axis (stable HTML / PDF / paywalled) as a verification-mode axis — what the script *does* per source, not what the source is. Consolidated a duplicate LBNL DC report URL in `figures.json`.

- **Phase 7 script and workflow (closed 2026-05-16).** `scripts/verify-sources.mjs` + `.github/workflows/weekly-verify.yml` shipped. Manifest final state: 17 hash-only / 10 snapshot-only / 3 manual-quarterly / 0 editorial-only. Initial archives populated `src/data/snapshots/`. First successful cron run on 2026-05-16 bumped 13 display `last_verified` dates and committed cleanly to main; 2 transient Wayback CDX errors on `iea-key-questions-on-ai` and `iea-ev-outlook-2025` that should clear on subsequent runs. Weekly cron runs Mondays at 11:00 UTC.

  Design refinement (both overall and per-component) is the next session. See `website_plan.md` queued items and this file's "Open questions" section.

## Read these in order

1. `website_plan.md` — full plan: editorial frame, audience, structure, comparison set, infographics, defensibility mechanisms, update mechanism, tech stack rationale, phased build, queued items.
2. `authorial_voice.md` — David's voice description. Use as a guideline. The anti-AI-speak rubric in Claude's persistent memory takes precedence when they conflict.
3. `user_profile.md` — collaboration preferences: compact responses, beginner coder, small verifiable milestones, focus on one thing at a time, distinguish facts from hypotheses.
4. `phase1_setup.md` — original Phase 1 walkthrough; mostly historical now.

The anti-AI-speak rubric memory file (in Claude's persistent memory) governs all prose for this project — site copy, chat replies, code comments. Apply it before publishing anything.

## Schema decisions

`figures.json` has six distinct schema shapes for infographics, each tied to a specific visual type. New one-off didactic visuals get their own shape; consolidate when a third visual of the same type appears.

1. **Bar-chart shape** (`figures` array) — `annual-twh`, `water-bracket`
2. **Trajectory shape** (`historicals` + `projection`) — `dc-trajectory`, `ai-share-trajectory`
3. **Unit-conversion shape** (`twh` / `mwh_per_household` / `boundary_after_index`) — `household-equivalents`
4. **Single-figure didactic shape** (`demo_figure` + `caption`) — `range-vs-point-primer`
5. **Rung-ladder shape** (`rungs` + `site_anchors` + `axis_min_twh` / `axis_max_twh`) — `watt-scale-primer`
6. **Training/inference shape** (`training_events` array + `inference` range + `x_min_tco2` / `x_max_tco2`) — `training-vs-inference`

Other architectural decisions worth knowing:

- **`src/data/sources.json` is the verifier's manifest**, separate from `figures.json`. Array keyed by stable `id`, with `url`, `name`, `mode`, `anchors` count, and optional `note`. Top of file carries `modes` and `flags` legends.
  - **Modes:** `hash-only` (weekly fetch + hash + snapshot + PR on change), `snapshot-only` (one-time archive, no re-check), `manual-quarterly` (skipped in cron, surfaced via reminder), `editorial-only` (present in figures.json for credit, not verified).
  - **Flags:**
    - `via_wayback: true` — fetch through the Wayback Machine's most recent 200-status CDX snapshot in `id_` mode rather than directly. All 8 IEA hash-only sources use this because IEA's Cloudflare blocks the verifier even with a full Chrome header set (TLS fingerprinting). Detection lag for IEA changes is 1–7 days behind Wayback's recapture cadence; for slower topic hubs (cement, steel) it can be 1–2 months.
    - `strip_selectors: [...]` — optional CSS selectors removed from the page before hashing. Currently set on `eia-recs` and `eia-use-of-electricity` to strip the `.header-whats-new` rolling news widget (EIA site-template chrome).
  - 30 entries total. Worth re-running the URL-set cross-check (figures.json sources blocks ↔ sources.json entries) whenever either file is touched.

- **Snapshots live in `src/data/snapshots/{id}.{html|pdf}`**, git-tracked. Git diff is the diff engine for source-change PRs. Hash-only sources store cheerio-cleaned HTML; snapshot-only sources store raw bytes. Default cleaner strips: `script, style, noscript, meta, link, input[type="hidden"], astro-island`, HTML comments, and inline event handlers / nonces. Per-source `strip_selectors` get applied on top of the default.

- **The verifier's PR mechanics** are a deliberate departure from the plan's "one PR per changed source": v1 opens a single PR per run aggregating all changed sources, titled `Source change detected: {name}` (single) or `Source changes detected: {N} sources` (multi). The "Allow GitHub Actions to create and approve pull requests" toggle in repo settings must be on for this to work.

- **The verifier's `last_verified` bump rule:** a display's date moves only when (a) every hash-only source it cites verified clean this run, and (b) the run isn't first-run-archiving for any of those sources. Displays backed only by snapshot-only or manual-quarterly sources don't get auto-bumped — their dates move only on human review.

- **`niceCeiling` consolidated to `src/lib/niceCeiling.ts`** with a parameterized `granular: true` opt-in for tighter mantissa steps (used by water-bracket; default by other bar charts). Duplicated across three bar-chart components plus the original coarse version in `RangeBar.astro`. Consolidation queued for next bar-chart visual or design pass.
- **Editorial captions baked into the SVG** for didactic visuals (range-vs-point, watt-scale, training-vs-inference): a one-line italic Source Serif sentence sits between the axis and the footer rule so a saved image carries the rule.
- **Each infographic is a single self-contained `<svg>`** with kicker, title, plot, axis, source attribution, and last-verified stamp baked inside. Surrounding HTML carries only the prose summary and the clickable `SourceLine`. Honors the plan's "right-click-save produces something useful" promise.
- **Components named `Infographic*.astro`,** dropped into `index.astro` in priority order below the hourly hero. A `/figures` gallery is deferred — reassess in the design pass.
- **Reference bars** (e.g., U.S. residential in annual-twh and household-equivalents) use accent color at 0.32 opacity to read as scaffolding. Triggered by `role: "reference"`.
- **`SourceLine.astro`** accepts an optional `methodsAnchor` prop; consumers opt in to render the "How this was calculated →" link.
- **Anchor convention for /methods:** comparison cards reuse their `anchor` field (so `/methods#water-vs-golf` matches `/comparisons#water-vs-golf`). Hourly hero is `hourly-hero`. Infographics use their `figures.json` `id` value.
- **Visual #7 (training-vs-inference) departed from the plan's "two-panel time-axis" framing.** Went with single-panel log-axis snapshot because per-year inference figures pre-2024 are too speculative to anchor honestly. Methodology section walks the editorial rationale.
- **Trajectory geometry duplicated across two trajectory components.** Acceptable per the same logic — refactor at three.

## Open questions for David

Queued for the post-Phase-7 design pass (this is the next session):

- **Inference bar width on visual #7 (training-vs-inference).** The 8.4–27.2 MtCO₂ range is only ~29 px wide on the log axis. Editorially correct but might read as visually underwhelming.
- **Decade tick label style on visual #7.** Compact "1k / 1M / 100M" notation; could swap to expanded "1,000 / 1,000,000 / 100,000,000" if preferred.
- **Mobile readability of visuals #7 and #8.** Wide log axes haven't been verified at narrow viewport widths.
- **Rung-0 / rung-1 spacing on visual #8 (watt-scale primer).** "a microwave for an hour" left-anchored at chart edge has a small theoretical overlap with rung 1 at conservative width estimates.
- **Right-edge touching on infographic bars.** When the highest bar's value equals the chart's `niceCeiling`, the bar runs flush against the axis right edge (queued since Phase 4).
- **Trajectory band fill opacity (0.16).** May be too pale at typical viewing distance.
- **Historical line jumpiness from irregular anchor years** (2017, 2018, 2022, 2024, 2025) on the DC trajectory.
- **U.S./global pair affordance.** The water bracket pairs U.S. and global figures by label parallelism alone.
- **Two virtue-claim patterns in `website_plan.md` Section 1 prose** ("honest ranges" and "calibrate, not to comfort or alarm" on line 9) flagged but not scrubbed. Planning-doc prose, not site copy.
- **Home-page scroll length.** Eight infographics below the hourly hero is approaching long. `/figures` gallery placement reassessment is part of the design pass.

Other open items:

- **Domain name.** Some directions in `website_plan.md` Section 10. Not yet picked.
- **Global golf source.** The water bracket and water-vs-golf comparison currently use a derived "site estimate" range (800–1,500 Bgal) for global golf. Ship-with-explicit-framing decision made; replace if/when a primary source surfaces.
- **Verifier — Wayback recapture lag on slow topic hubs.** `iea-cement-hub` and `iea-steel-hub` may be 1–2 months behind real IEA changes. Acceptable for v1; revisit if either of those figures becomes load-bearing.
- **Verifier — branch protection on main.** If branch protection ever gets enabled on `main`, the workflow's direct-push path (bumped outcome) will fail and need to be rerouted through a PR.

## Working notes

The persistent memory files cover most of these; pointers below for context.

- **Edit/Write tool truncation.** Edit and Write can silently truncate file tails on `.json`, `.astro`, `.md`, and `.mjs` files at sizes from 1.5K up. The tool reports success and the Read tool may show full content, but the on-disk file (visible via the bash mount) is missing its tail. Reliable workarounds: bash Python heredoc for `figures.json` and any structured rewrite; `cat > path << 'EOF' ... EOF` for plain text; verify every change with `wc -lc` and `tail` on the bash mount. Captured in `feedback_edit_tool_truncation.md`. Reinforced repeatedly during Phase 7 — every Edit on the verifier script truncated; the fix is always heredoc rewrite + bash verify.
- **Cowork system-reminder file-dump tax.** Each component edit triggers a system-reminder that re-dumps the full file contents into context (250+ lines, ~2–3K tokens). Account for this when judging fresh-chat timing. Captured in `feedback_cowork_dump_tax.md`.
- **Never run git from the sandbox bash.** Even read-only commands create a stale `.git/index.lock` that blocks David's local git. All git operations run in David's local terminal.
- **Sandbox `npm install` for Astro times out at 45 seconds**, so full builds aren't reliably verifiable in the sandbox. David's local machine handles them fine.
- **PowerShell pager handling.** When giving David CLI instructions, prefer `git --no-pager` to avoid the pager trap on multi-line paste-in blocks. PowerShell also lacks `head` — use `Select-Object -First N` instead. Captured in `feedback_powershell_pager.md`.
- **Draft-then-write workflow.** For prose-heavy file additions, draft prose in chat first, then commit all file work in one atomic Python heredoc rewrite after sign-off. Captured in `feedback_draft_then_write.md`.
- **methods.astro is 2,058 lines / 88.6K** after Phase 5 wrap. Modify via Python heredoc with sentinel-string anchored replaces; the post-edit dump tax does not fire when the file is modified through the bash mount rather than via Edit/Write.
- **Geometry simulation before SVG coding.** For log-scale charts with tight label/dot positioning, simulate positions in Python first to catch overlap issues.
- **Verifier bot-detection escalation ladder (Phase 7 lesson).** Sites that 403 the verifier should be escalated in this order: (1) browser-shaped User-Agent only; (2) full Chrome header set including Sec-Fetch-* and Sec-Ch-Ua-*; (3) Wayback Machine CDX with `id_` mode URLs (best for Cloudflare-protected origins); (4) demote to manual-quarterly if the source is static enough to not need weekly checks. Headless browsers / TLS-fingerprint libraries are the next step if (3) fails, but weren't needed for this project.
- **Verifier strip rules need refresh discipline.** When the default strip set changes, every pre-existing snapshot becomes "stale" and will trip a "changed" status on next run. Fix is to run the script locally to refresh affected snapshots, then commit. The PR path also works — just merge the auto-generated PR after eyeballing the diff is chrome-only.

## File map

```
src/
  data/figures.json                        ← single source of truth (8 infographics + 14 comparisons)
  data/sources.json                        ← verifier manifest: 30 sources × 4 modes
  data/snapshots/                          ← verifier archives, git-tracked
  layouts/Layout.astro                     ← page wrapper: masthead + main slot
  components/
    ComparisonCard.astro                   ← one card per comparison
    HourlyImpactHero.astro                 ← home-page hourly CO2 hero (two stacked RangeBars)
    InfographicAnnualTwh.astro             ← "How big is AI, really?"
    InfographicWaterBracket.astro          ← water bracket (six bars)
    InfographicDcTrajectory.astro          ← data-center electricity 2017→2030 (time-axis)
    InfographicAiShareTrajectory.astro     ← AI's slice of data-center electricity (time-axis)
    InfographicHouseholdEquivalents.astro  ← data-center electricity in household-years
    InfographicRangeVsPoint.astro          ← range-vs-point didactic primer
    InfographicWattScalePrimer.astro       ← watt-scale ladder primer (1 kWh → 1,000 TWh)
    InfographicTrainingVsInference.astro   ← training-events vs. annual-inference snapshot
    RangeBar.astro                         ← horizontal bars; used by ComparisonCard, HourlyImpactHero
    SourceLine.astro                       ← clickable sources + last-verified + optional methodsAnchor
  pages/
    index.astro                            ← home: hero + thesis + cta + 8 infographics
    comparisons.astro                      ← lists all ComparisonCards from figures.json
    methods.astro                          ← per-display methodology page (23 sections)
  lib/niceCeiling.ts                       ← shared niceCeiling helper, parameterized
  styles/global.css                        ← design tokens, base styles, masthead, common chrome
scripts/verify-sources.mjs                 ← weekly source verifier (Phase 7)
.github/workflows/weekly-verify.yml        ← cron + manual dispatch for the verifier

website_plan.md                            ← the plan
phase1_setup.md                            ← original setup walkthrough
authorial_voice.md                         ← voice description
user_profile.md                            ← David's collaboration preferences
README.md                                  ← repo readme
handoff.md                                 ← this file
```
