# Handoff

> **AUTONOMOUS SESSION 7 — SEO + SOCIAL PREVIEW + SITEMAP (2026-05-30 early morning, scheduled task `ai-impact-autonomous-resume-4` queued for +4 hours).** Session entered post-redesign-complete state and shipped the link-sharing-readiness work the project's stated use case (point people at it during conversations) actually depended on.
>
> **Commits this session:**
>
> - `99d6c8d fix(cartouche)` — `NumericCartouche.astro` ornate value/unit switched to clamp(cqi)-sized + `white-space: nowrap`. Wrap was the actual defect, not absolute font size: at the ~140px-wide annotation column on desktop, "14–18" at 43.2px wrapped at the en-dash and pushed the figure past the 3:2 frame's bottom border.
> - `c224e1b chore(handoff)` — run-6 closeout block, now retired below by this session-7 block.
> - `7a7de69 assets: masthead-strip RGBA` — alpha-keyed in the sandbox from ChatGPT's RGB output (per-pixel distance-from-white → linear alpha ramp). Stops fighting ChatGPT's RGB-only PNG encoder and just post-processes its output.
> - `9dc92aa chore(ornaments): lossless PNG optimization via oxipng` — 5.99 MB → 5.79 MB across 5 of 6 ornaments. frame-side-left excluded (unusual chunk layout, non-pixel-identical re-encode; reverted).
> - `6ccc2c5 chore(handoff): Mucha redesign complete` — explicit marker that the scoped redesign is done.
> - `d7ea97f feat(seo): OG/Twitter meta tags, favicon, OG card, canonical URLs` — `public/og-card.png` (1200×630 generated via PIL + Cardo TTF extracted from Fontsource WOFF2), favicon/apple-touch-icon (rust diamond on ivory), Layout.astro head expanded with canonical / OG / Twitter / theme-color / favicon links. `astro.config.mjs` sets `site:` to the Vercel URL so Astro.site resolves and per-page canonical/og:url thread through automatically.
> - `d34b339 feat(seo): sitemap.xml, robots.txt, JSON-LD WebPage schema` — Astro endpoints at `src/pages/sitemap.xml.ts` and `src/pages/robots.txt.ts` (both use Astro.site), JSON-LD WebPage schema with `isPartOf` linking to the parent WebSite in Layout.astro head.
>
> **What's pending — David's local actions before the next scheduled run fires:**
>
> - Nothing blocking. All commits pushed and verified live this session. OG card render confirmed by David. The scheduled run can pick up cleanly without a David action between sessions.
> - When the custom domain lands (deferred until the site is ready to show the world): update one line in `astro.config.mjs` — change `site:` to the new origin. Every canonical, og:url, sitemap entry, robots.txt sitemap line, and JSON-LD URL re-points automatically through Astro.site.
> - Sandbox build configs left on disk (`astro.config.build.mjs`, `astro.config.build2.mjs`, `astro.config.build3.mjs`) are safe to delete locally — none are used by Vercel; only `astro.config.mjs` is the production config.
> - Three files (`authorial_voice.md`, `user_profile.md`, `src/data/snapshots/iea-ev-outlook-2025.html`) continue to sit unstaged on purpose.
>
> **What's queued for session 8 (next-Claude's call):**
>
> Ordered roughly by autonomous-friendliness:
>
> 1. **Custom 404 page** — `src/pages/404.astro` using the existing Layout. Short branded message ("This page doesn't exist — back to home"), masthead and footer intact. Vocabulary-on, contained, no design judgment beyond friendly copy. Highest-leverage next pick.
> 2. **Final visual walk + polish sweep** — fresh-eyes walk of `/`, `/comparisons/`, `/methods/`, and view-source on each. Surface any leftover defects that didn't catch this session: dead links, missing alt text, focus indicators, mismatched footer/header rhythm, etc. Bundle small fixes into one commit.
> 3. **Performance/Lighthouse audit via Claude in Chrome** — DevTools Performance tab or Lighthouse run on the live deploy. Identify real (not theoretical) load-time bottlenecks. Likely candidates: the 1.7 MB masthead is `fetchpriority="high"` and blocks first paint; the side-ornament PNGs sum to ~1.7 MB; cumulative font loading. Report findings; defer fixes to a focused session if invasive.
> 4. **HTML validation pass** — `npx html-validate dist/**/*.html` or equivalent. Surface any malformed markup the build didn't catch.
> 5. **Accessibility pass deeper than aria-haspopup** — axe-core via Claude in Chrome, or manual checks on tab order / focus indicators / color contrast / SR semantics for the comparison plates. Bundle clean wins.
> 6. **Pngquant lossy compression** — needs David's local install (`choco install pngquant` or download Windows binary, then a quality=90 batch over the three largest ornaments with eyeballed visual comparison). David-gated; cannot run from sandbox autonomously. Mention in handoff if budget runs out before something else lands.
> 7. **/methods inline SubjectMarkers** — color-code the 24 H2s by water/electricity/carbon. Design judgment call David previously called "optional polish, not blocking." Skip in autonomous mode unless David confirms.
> 8. **Pngquant lossy / SVG conversion of simpler ornaments** — further compression beyond lossless. Lossy is risky for botanical alpha edges; SVG conversion is real design work. Both for focused future sessions.
>
> **Composes with [[feedback_autonomous_completion_mode]], [[feedback_autonomous_walk_not_scope]], [[feedback_usage_check_protocol]], [[feedback_sandbox_git_workaround]], [[feedback_sandbox_lock_cleanup]], [[feedback_edit_tool_truncation]].** Session 7 hit the Edit-tool-truncation pattern twice (handoff.md tail lost during the run-6 closeout edit; Layout.astro tail lost during JSON-LD addition) — both recovered via `git show HEAD:path` splice. Reinforces "Python heredoc rewrite, then bash mount verification" as the right pattern for any non-trivial file change.
>
> ---

> **MUCHA REDESIGN COMPLETE (2026-05-29 evening).** The masthead RGBA conversion landed in `7a7de69 assets: masthead-strip RGBA — alpha-keyed from RGB output` after David ran the in-sandbox alpha-keying pipeline on the RGB output ChatGPT produced (alpha derived from per-pixel distance-from-white: `dist <= 5 -> alpha=0`, `dist >= 30 -> alpha=255`, linear ramp between for anti-aliased edges). Live deploy verified visually — botanical sits on ivory paper with no bounding rectangle. Followed by `9dc92aa chore(ornaments): lossless PNG optimization via oxipng` shaving 203 KB across five of six ornaments (frame-side-left excluded; its source has an unusual chunk layout oxipng can't re-encode pixel-identically). Total ornament weight: 6.30 MB pre-redesign-close → 5.79 MB now. All ornaments are RGBA with real alpha.
>
> **What's still deferred:** further compression beyond lossless. The five lossless-optimized ornaments hit a plateau at oxipng level=6 (zopfli pass timed out in sandbox); meaningful additional savings would require either pngquant lossy quantization at quality=90+ (carries small risk of botanical-edge degradation and should be eyeballed before commit) or SVG-conversion of the simpler ornaments (cartouche-frame and the side-botanicals are plausible candidates if a clean SVG path can be derived from the raster). Both belong to a focused future session, not autonomous mode.
>
> **What's pending — David's local actions:**
>
> - **Before any git command:** `Remove-Item .git\index.lock, .git\HEAD.lock, .git\refs\heads\main.lock -ErrorAction SilentlyContinue`. Zero-byte phantom `.git/index.lock` is still present from sandbox commits.
> - **`git reset` then `git push origin main`.** The reset resyncs the stale `.git/index` so the 5 optimized PNGs stop showing as `MM` in status. Push covers `9dc92aa` (lossless optimization) plus this handoff update commit.
> - `astro.config.build.mjs` (sandbox build config) remains safe to delete locally — not used by Vercel.
> - Three files (`authorial_voice.md`, `user_profile.md`, `src/data/snapshots/iea-ev-outlook-2025.html`) continue to sit unstaged on purpose.
>
> The redesign as scoped is done: ornate Art Nouveau imprint with click-to-expand popups, six paired chapters, asymmetric magazine-spread plates, interludes, ornate cartouches, side botanicals, masthead and footer botanicals, /comparisons redesign in the same vocabulary, accessibility (aria-haspopup + aria-expanded + aria-modal), prose audits clean, all ornaments alpha-correct. Phase 8 PNG compression and Phase 9+ work (custom domain, /methods polish, mobile pass beyond what's in) queue for future focused sessions.
>
> ---

> **AUTONOMOUS RUN 4 — ACCESSIBILITY + POLISH (2026-05-29).** David flagged that stopping at 41% session use after the figcaption fix was too narrow a read of autonomous mode — finishing the scoped task ≠ project complete; the queued-phase list still had real work. Resumed and finished the genuinely-actionable items.
>
> **Commit (this run):** to follow — `fb59351`. Single push needed: `git push origin main` after the commit lands.
>
> **What got addressed:**
>
> 1. **Popup accessibility (OrnatePopup + OrnatePopupTrigger).** Triggers now carry `aria-haspopup="dialog"` and a controller-toggled `aria-expanded` (true on open, false on close). Dialog carries explicit `aria-modal="true"` (implicit via `showModal()` but explicit helps screen-reader behavior across engines). Behavior confirmed by JS test on live deploy: ESC dismiss, backdrop dismiss, focus restoration to trigger, focus-into-dialog on open — all working before the patch. The only real gap was trigger semantics for screen readers; now fixed.
> 2. **/methods coherence check.** Walked the page. 23 method-sections, plain prose under H2s, no ornate frames / cartouches / SubjectMarkers. Confirmed deliberate: imprint pages (/, /comparisons) carry the Mucha vocabulary; /methods is the back-of-book reference appendix where scanning beats ornament. Not a defect. Could optionally add inline SubjectMarkers beside each H2 to color-code by subject — left as a small future polish, not blocking.
> 3. **Phase 3.7 status confirmed shipped in 2c081af.** Token compression (--space-7 3rem → 2.25rem, --space-8 4rem → 3rem, --space-9 6rem → 4.25rem) landed in run 2 with the explanatory comment block. Earlier "Pending — Phase 3.7" wording in handoff was stale and has been retired.
> 4. **Prose pass on visible strings.** Read each visible string on / and /comparisons against [[feedback_anti_ai_speak_rubric]] with fresh eyes. No Tier-1 hits. The staccato comparison sentences in Chapter II ("Bitcoin is larger. EV charging is larger...") do concrete chart-pointing work per [[feedback_prose_specificity]] — defensible. Footer 3-line close survives the "All X are Y" anaphora retirement noted earlier. No changes warranted without David's signoff on copy.
> 5. **Ornament PNG file-size audit (Phase 8 prep).** Total `public/ornaments/` weight: **9.2 MB** across 6 files. Largest: masthead-strip.png 1.4MB, footer-roundel-landscape 1.3MB, footer-roundel-earth 1.1MB. Phase 8 still needs to compress/vectorize before launch — leaving compression itself for a focused session because lossy on alpha-channel PNGs can damage botanical edges.
>
> **Memory updates this run:**
>
> - New: [[feedback_autonomous_walk_not_scope]] — captures David's correction that scoped-task completion under autonomous mode is not a stop signal; keep moving down the queued-phase list while budget allows.
>
> **What's pending — David's local actions:**
>
> - **`git push origin main`** from PowerShell at the project root. Single push covers the accessibility fixes + handoff update.
> - After Vercel redeploys (~60-90 sec), screen-reader test optional: NVDA / VoiceOver should now announce "button, has popup dialog, collapsed" → "expanded" → "collapsed" as triggers are activated.
> - Phase 3.6c (masthead 8:1 → 16:1) still pending image-gen on your side. Side-ornaments and roundels already re-exported with real RGBA alpha — no action needed.
> - Phase 8 PNG compression (~9.2MB total) — defer to focused session, see numbers above for planning.
> - Three unstaged files (`authorial_voice.md`, `user_profile.md`, `src/data/snapshots/iea-ev-outlook-2025.html`) continue to sit unstaged on purpose.
> - `astro.config.tmp.mjs` was removed in run 3; this run created `astro.config.build.mjs` instead (same content). Safe to remove from PowerShell after the push.
>
> **Session budget at close:** check `claude.ai/settings/usage` reading at run end recorded below.

>
> **AUTONOMOUS RUN 6 — CARTOUCHE FIX SHIPPED, MASTHEAD STILL GATED ON DAVID (2026-05-29, session opened at 9%).** Scheduled task `ai-impact-autonomous-resume-3` fired. Of the two defects flagged in the prior pause note, one was Claude-actionable and one is image-gen-gated.
>
> **What got done:**
>
> 1. **Cartouche overflow fixed (commit `773a7bd`).** Root cause was not "value font too big in absolute terms" — it was that the ornate cartouche sits inside ChapterPlate's 30% annotation column, which on desktop renders ~140px wide. At that width "14–18" at 2.4rem (43.2px on the project's 18px root) wrapped at the en-dash to two lines; the wrapped figure was 95px tall but the 3:2 frame box was only 93px tall, so the figure pushed past the bottom border and overlapped the bottom ornament. Fix: `container-type: inline-size` on `.cartouche-ornate`, value/unit font-sizes switched to `clamp(min, Xcqi, max)` capped at the previous desktop maxes (2.4rem / 1.05rem), plus `white-space: nowrap` on both — wrap-prevention is the load-bearing change. Figure also capped at 80% interior width so wide nowrap strings stay inside the frame's safe inner band. Verified via CSS injection on the live deploy across all 10 ornate cartouches (8 chapter plates + 2 Interlude pairs): every one renders at AR=1.5 with figure inside the box, no overflow. Screenshot of Chapter I post-fix confirms "14–18" sits cleanly on one line inside the frame.
> 2. **Masthead alpha still RGB — David must re-export.** Verified the file at `public/ornaments/masthead-strip.png` is 5015×314 mode RGB. The commit `2bf0bff "assets: masthead-strip widened to 16:1 with true alpha"` that landed earlier today is misleading — the file shape is correct (16:1) but the alpha claim is false; ChatGPT honored AR but not RGBA. Stronger image-gen prompt provided below for David's next attempt.
>
> **Commit (this run):** `773a7bd` (cartouche fix). Push pending — David runs `git push origin main` from PowerShell. Single push covers the cartouche fix + this handoff update (which lands as a follow-on `chore(handoff)` commit below).
>
> **What's pending — David's local actions:**
>
> - **Before any git command this session:** `Remove-Item .git\index.lock, .git\HEAD.lock, .git\refs\heads\main.lock -ErrorAction SilentlyContinue` from PowerShell at the project root. Run 6's commit was made via the direct-refs-overwrite plumbing fallback and left a zero-byte `.git/index.lock` the sandbox could not delete — confirmed via `ls -la .git/index.lock` at run end (size 0, mtime 22:39 UTC). PowerShell can delete it; the sandbox cannot. See [[feedback_sandbox_lock_cleanup]].
> - `git push origin main` from PowerShell at the project root. Push covers `773a7bd` (cartouche) plus any follow-on handoff commit.
> - **Re-export `masthead-strip.png` with real alpha.** Use the stronger prompt below verbatim. Drag-verify the resulting PNG onto a Chrome tab — real alpha renders the botanical against Chrome's clean white tab background with no bounding rectangle. If you still see a rectangle, the file is still RGB and the prompt didn't take.
> - Phase 8 PNG compression (~9.2MB total) — still deferred to a focused session; autonomous runs avoid this because lossy compression on alpha-channel PNGs damages the botanical edge.
> - Three files (`authorial_voice.md`, `user_profile.md`, `src/data/snapshots/iea-ev-outlook-2025.html`) continue to sit unstaged on purpose.
> - `astro.config.build.mjs` is the sandbox build config (cacheDir redirect to /tmp). Safe to delete locally after push — it's not used by Vercel.
>
> **Stronger masthead image-gen prompt (for David's tool — paste verbatim):**
>
> > A horizontal Art Nouveau botanical banner in the style of Alphonse Mucha, drawn as a continuous wide frieze with no central focal point. Wheat sheaves, ivory-orange California poppies in bloom, slender green-sage leaves and curling tendrils, intertwined and repeating across the full width. Muted antique palette: soft rust-orange poppies (#a85a3a), sage-green foliage (#7a8c6a), warm ink line work (#211d1b). Hand-drawn ink-and-watercolor feel, not flat vector. Canvas dimensions exactly 3200 pixels wide by 200 pixels tall (16:1 aspect ratio). CRITICAL: Return PNG-32 with a real alpha channel. The image mode MUST be RGBA, not RGB. Pixels outside the botanical MUST be fully transparent (alpha = 0), not filled with white or any solid color. Do NOT bake the transparency-indicator checkerboard pattern into the pixels. The botanical elements should sit on absolute transparency so the page's ivory paper color shows through behind them.
>
> **Verification step after David's re-export:** `python3 -c "from PIL import Image; im = Image.open('public/ornaments/masthead-strip.png'); print(im.size, im.mode)"` should return `(3200, 200) RGBA` (or larger dimensions at 16:1). If `RGB`, the file is still broken — re-export.
>
> **Session budget at run end:** 9% at open, well under the 80% pause threshold throughout. No self-chain scheduled — remaining work is entirely David-gated (image-gen for masthead, PowerShell push, optional Phase 8 compression). Once David's masthead re-export lands and pushes cleanly, the Mucha redesign is complete; the only deferred item is Phase 8 PNG compression for launch readiness.
>
> ---

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

## Mucha's Notebook redesign — progress (current state 2026-05-28)

Mid-visual-redesign. Live site reflects Phases 3, 4a–d (with TDZ hotfix). Working tree as of 2026-05-28 also contains Phase 3.5 (Reading-C component-and-content layer) and Phase 3.6 (bug-fix pass after a screenshot critique). David tests in browser and commits when ready. Two structural pieces remain before the new Reading-C layout is visible on the home page: Phase 4-redo (strip SVG-baked editorial chrome from each Infographic) and Phase 3-redo (rewrite index.astro to use ChapterPlate + Interlude with the approved annotation drafts, relocate RangeVsPoint, rewrite chapter intros). Phase 3.7 (rhythm compression) sits ahead of those — small global-CSS pass. Asset regen (3.6c) is async on David's image-gen tool — three prompts captured verbatim below.

**Design direction (palette + typography + chapter spine unchanged):**

- Palette: ivory paper (#f4ede0), warm ink (#211d1b), subject colors — water (#3a6b75 teal), electricity (#7a8c6a sage), carbon (#a85a3a rust).
- Typography: Cardo (Fontsource) for body, headlines, chapter titles. Inter retained for chart labels, kickers, UI, and the masthead wordmark.
- Six paired chapters with load-bearing ids: `the-hour`, `the-year`, `the-water`, `the-trajectory`, `in-equivalents`, `training-vs-inference`. The ChapterRail targets these.
- Asset pipeline hybrid (PNGs for botanicals in `/public/ornaments/`, simple ornaments hand-coded).

**Phase progress:**

- Phase 0–2e — done (see git history). Components shipped: OrganicFrame, SubjectMarker, SectionDivider, NumericCartouche, ChapterRail, ChapterTitle, Layout masthead + footer, dev/ornaments QA page.
- Phase 3 (six-chapter shell on index.astro) — done 2026-05-25. SectionDivider + ChapterTitle + intro paragraph + ornate-framed plate per chapter. RangeVsPoint as no-chapter preamble. Existing thesis paragraph kept as closing coda. ChapterRail mounted.
- Phase 4a (AnnualTwh + WaterBracket) — done 2026-05-25. Mucha palette, `headroom` opt-in on `niceCeiling`, water-bracket 18px pair gaps, global CSS rule stripping standalone `.infographic-card` chrome when nested in `.organic-frame`.
- Phase 4b (DcTrajectory + AiShareTrajectory) — done 2026-05-25. Sage projection band, DC historical line split into confidence-aware segments (early medium: faint 1.75px / 55% opacity; recent medium-high+: bold 3px) sharing 2022 vertex. Band fill-opacity bumped 0.16 → 0.22.
- Phase 4c (WattScalePrimer + HouseholdEquivalents) — done 2026-05-25. Mucha palette, rung-0 force-wrap with " for " secondary break point.
- Phase 4d (RangeVsPoint + TrainingVsInference) — done 2026-05-25. Mucha palette, `wrapCaption()` helper, numeric "8.4–27.2 Mt" label above the narrow inference bar.
- Phase 4d TDZ hotfix — done 2026-05-25. Moved `wrapCaption()` const declarations before the geometry block in both files so `footerRuleY`'s reference to `captionLine2H` no longer fires in the temporal dead zone.
- Phase 3.5 (six substeps) — shipped to working tree 2026-05-28. New components: `ChapterPlate.astro` (30/70 magazine-spread wrapping OrganicFrame with sideLeft+sideRight; annotation column with serif small-caps kicker + ornate NumericCartouche + brief italic + SubjectMarker; chart canvas in right slot; stacks below 720px). `Interlude.astro` (3-column mid-chapter pause: cartouche / italic / cartouche; stacks below 720px). `ChapterTitle.astro` refactored (Cardo small-caps kicker, no terracotta dropcap, plain hairline rule with no diamond). Masthead initially capped at 40/52px via object-fit cover — superseded in 3.6a after visible cropping. Scoped `background: white` stripped to transparent in all 8 `Infographic*.astro`. `Layout.astro` footer rewritten with approved 3-line close ("A shared starting point / Numbers everyone can see / Sources everyone can check") and new tagline ("Sustainable futures require informed choices"). Dev/ornaments QA page extended with ChapterPlate + Interlude render blocks.
- Phase 3.6 (three substeps) — shipped to working tree 2026-05-28, after David surfaced a masthead crop regression and a design-critique pass on four screenshots. (a) Masthead CSS reverted: `width: 100% / height: auto` on mobile, `width: auto / max-height: 80px` centered on desktop — strip never cropped, interim until asset regen lands a wider source AR. (b) Global `.organic-frame .infographic-card` override bumped with `!important` on every chrome property because Astro's scoped specificity was beating it. The 8 chart components now strip border / shadow / padding cleanly when nested in OrganicFrame. (c) `HourlyImpactHero.astro` stripped of its internal OrganicFrame wrapper — was creating a frame-inside-frame bug visible in screenshot 3 (two corner SubjectMarkers stacked, two sets of rounded corners). Now inherits its frame from the parent.

### Mid-Phase-4 design critique → Reading C plan (2026-05-25)

David viewed the Vercel deploy and flagged six issues. Five were tactical fixes; one (issue 5: "first things the viewer sees should be several striking comparisons at a glance") raised the architectural question. After re-examining `design/mockup_art_nouveau_reference.png` together, the pattern wasn't pure Reading A (essay-led, tight) or pure Reading B (dashboard hero) — it was **Reading C: magazine-spread chapters**. Each chapter integrates a chart + numeric cartouches + (sometimes) a second chart in one asymmetric ornate layout. The chapter spine stays; each chapter just gets denser.

**Architectural moves (Phase 3.5 + 4-redo + 3-redo):**

1. **New component `ChapterPlate.astro`.** Wraps `OrganicFrame` with `sideLeft sideRight` and a 30/70 flex layout. Left slot: annotation block (small-caps kicker + ornate `NumericCartouche` + brief italic + `SubjectMarker`). Right slot: chart SVG. Collapses to stacked layout below ~720px.
2. **New component `Interlude.astro`.** 3-column mid-section: two `NumericCartouches` flanking centered italic prose. Used inside chapters IV (Trajectory) and V (Equivalents) between Plate 1 and Plate 2.
3. **ChapterTitle refactor.** Serif kicker (Cardo small caps, not Inter); remove the `::first-letter` terracotta dropcap; remove the diamond on `.chapter-rule::before`. The visible duplicate-diamond bug appears only on carbon chapters (SectionDivider's carbon motif is itself a diamond + chapter-rule had its own diamond accent).
4. **Masthead height cap** ~80–110 px in `Layout.astro` / `global.css`. Currently unconstrained vertically and dominating first-paint viewport.
5. **Infographic-card scoped white background → transparent** in each Infographic component. The Phase 4a global override `.organic-frame .infographic-card { background: transparent }` loses specificity to the scoped style; the white covers the ornate frame's botanical.
6. **SVG-baked kicker / title / unit-caption removed** from every Infographic component. The chart canvas starts at the axis area; source line + verified stamp stay baked. The annotation column carries the editorial signage on the rendered page. Right-click-save loses the kicker/title but keeps the data + sources — accepted trade.
7. **Side botanicals on both sides** (`sideLeft` + `sideRight`) of every plate. Tighten frame padding so the chart canvas isn't squeezed.
8. **RangeVsPoint relocates** from above-the-fold preamble to a small slimmer "How to read this site" element above the site footer.
9. **Footer rewrite.** Tagline → "Sustainable futures require informed choices." Three-line italic close replaced (drafts approved, below). Drop the "All X are Y" anaphora that flagged as borderline AI-speak in the rubric.

**Approved editorial drafts (2026-05-25) — pre-locked, do not re-derive:**

Per-plate annotation blocks. Each plate's left column: kicker → ornate `NumericCartouche` (value + unit + caption) → brief italic.

| # | Chapter | Kicker | Cartouche value · unit | Cartouche caption | Brief italic |
|---|---|---|---|---|---|
| 1 | I · The Hour | ONE HOUR, COMPARED | 14–18 · kg / hr | CO₂ FROM ORDINARY DRIVING | *Hundreds of times an hour of gaming. Thousands of times an hour of chat.* |
| 2 | II · The Year | AI'S YEAR, IN CONTEXT | 30–80 · TWh | AI IN DATA CENTERS, 2024 | *Even at the top of its range, the shortest bar on the chart.* |
| 3 | III · The Water | WHERE THE LINE FALLS | 500–700 · Bgal / yr | GLOBAL DC WATER, COUNTING POWER | *Direct cooling alone is an order of magnitude smaller. Counting the power plants brings AI near U.S. golf.* |
| 4 | IV · The Trajectory (DC) | THE LINE THAT BENT | 830–1,350 · TWh by 2030 | DATA CENTERS, IEA RANGE | *Flat through 2018, then bent. Heading for double to triple by 2030.* |
| 5 | IV · The Trajectory (AI) | AI'S SHARE OF THE LINE | 200–400 · TWh by 2030 | AI'S SLICE, IEA RANGE | *From 65 in 2024 to three or six times that by 2030.* |
| 6 | V · In Equivalents (Watt) | WHAT A TWh MEANS | 85,000 · homes | ONE TWh, FOR A YEAR | *AI in 2024 sits at thirty to eighty of these. U.S. residential at 1,550.* |
| 7 | V · In Equivalents (HH) | ELECTRICITY, IN HOMES | 39M · U.S. homes | GLOBAL DATA CENTERS, 2024 | *AI's slice inside that bar: 2.5 to 7 million households.* |
| 8 | VI · Training vs. Inference | TRAINING vs. INFERENCE | 8.4–27.2 · Mt CO₂ | ANNUAL AI INFERENCE, 2024 | *One round of training. One year of every prompt anyone ever sent.* |

Interlude (Chapter IV, between DcTrajectory and AiShareTrajectory):

- Left cartouche: **485** · *TWh* — DATA CENTERS, 2025
- Centered italic: *The line bent because data centers got bigger. They got bigger because of AI.*
- Right cartouche: **300** · *TWh* — AI BY 2030, CENTRAL CASE

Interlude (Chapter V, between WattScalePrimer and HouseholdEquivalents):

- Left cartouche: **1** · *kWh* — A MICROWAVE FOR AN HOUR
- Centered italic: *From microwave-hour to grid total — and the same math both ways.*
- Right cartouche: **70–113M** · *homes* — GLOBAL DC, 2030 PROJECTIONS

Footer 3-line close (option A, approved):

- *A shared starting point.*
- *Numbers everyone can see.*
- *Sources everyone can check.*

Bottom tagline: **Sustainable futures require informed choices.** (replaces "Argue from the same place.")

The chapter intros from Phase 3 (one per chapter, 2–4 short sentences each) stay in `index.astro` above each plate; the annotation italic adds *new* specific detail rather than restating the intro. Captured in memory as [[feedback_layered_prose_redundancy]].

### Design critique from live deploy screenshots (2026-05-28)

David ran the dev server on the post-3.5 state, captured four screenshots (3 from home, 1 from /comparisons), and asked for an expert-design / Internet-is-Beautiful critique. Findings, in severity order:

**Fixed in Phase 3.6:**

- *Masthead vertical cropping.* 3.5d's `object-fit: cover` lopped the top and bottom off the botanical strip. Reverted in 3.6a to non-cropping CSS.
- *Inner chart card chrome leaking through ornate frame.* 3.5e's scoped `background: white → transparent` fix didn't touch border / shadow / padding / border-radius — and Astro's scoped selector specificity beats the global `.organic-frame .infographic-card` override. Fixed in 3.6b with `!important` on the override.
- *Frame-inside-frame on HourlyImpactHero.* The component wrapped itself in OrganicFrame internally while `index.astro` also wrapped it externally. Two corner SubjectMarkers visible. Fixed in 3.6b by removing the internal wrapper.

**Pending — Phase 3.6c (David runs image-gen):**

- *Side-ornament PNGs have transparency-indicator checkerboard baked into the pixels.* Both `frame-side-left.png` and `frame-side-right.png` show a gray-and-white checkerboard behind the botanical on every plate. The image-gen tool that produced the assets exported the editor's transparency indicator as actual pixels rather than as alpha. Fix: regenerate with explicit true-alpha-channel prompts (below).
- *Masthead-strip.png aspect ratio.* Current 3546×443 (8:1) is too tall when rendered full-width on desktop (150px @ 1200px viewport). Target ~16:1 (3200×200 or similar) so full-width display naturally lands inside the ~80px height cap without CSS cropping. Once the new asset is in, CSS can revert to plain `width: 100%; height: auto` at all breakpoints.

**Pending — Phase 3.7 (rhythm compression):**

- Vertical rhythm too loose. Between masthead and first frame, between frame and section divider, between divider and chapter title — each gap looks considered alone but stacks into a page that pauses at every step. Compress between-section margins ~25-30% globally before 3-redo lands so the new layout reads as composed rather than padded.

**Pending — Phase 3-redo:**

- *RangeVsPoint primer is the literal first frame on the home page.* Wrong hero. A pedagogical primer can't carry the imprint moment — the first chart someone sees should be the most arresting comparison on the site. 3-redo relocates the primer to a slimmer "How to read this" element above the footer.
- *Chapter intro prose trips the prose-specificity rule almost word-for-word.* Current Chapter I intro: "Most arguments about AI start at this scale." The [[prose-refers-directly-to-the-infographic]] memory cites a near-identical example as the antipattern. All six chapter intros need rewriting in the 3-redo prose sweep to point at chart specifics, not at the discourse.
- */comparisons page is visually a different site.* No side botanicals, no ornate frame, plain card. Phase 5 work closes the cohesion gap.

**Standing — minor, debatable:**

- SubjectMarker tucked inside the rounded corner of the ornate frame can look pinched on heavier markers (water droplet, sage leaf). Position could shift to above-and-outside the curve. Defer unless it bothers David at scale.

### Asset regeneration prompts (Phase 3.6c — pending David's image-gen tool)

Three assets need regeneration. David runs his image-gen tool with each prompt and saves to the named filename in `/public/ornaments/`, overwriting the existing file. Verify alpha is real before deploying — open the generated PNG in a viewer with a transparency-indicator toggle (Windows Photos, IrfanView). With the indicator OFF, real-alpha PNGs show the botanical against a solid color; bad-alpha PNGs still show checkerboard.

***`masthead-strip.png`*** — current 3546×443 (8:1) is too tall for full-width desktop display. Target a wider source AR so the natural height when scaled to width is appropriate.

> A horizontal Art Nouveau botanical banner in the style of Alphonse Mucha, drawn as a continuous wide frieze with no central focal point. Wheat sheaves, ivory-orange California poppies in bloom, slender green-sage leaves and curling tendrils, intertwined and repeating across the full width. Muted antique palette: soft rust-orange poppies (#a85a3a), sage-green foliage (#7a8c6a), warm ink line work (#211d1b). Hand-drawn ink-and-watercolor feel, not flat vector. Source resolution at least 3200 pixels wide by 200 pixels tall (16:1 aspect ratio). Transparent background with true alpha channel — no checkerboard pattern, no white fill, no canvas color. PNG-32 with alpha. The botanical elements should sit on absolute transparency so the page's ivory paper color shows through behind them when placed on a webpage.

***`frame-side-left.png`*** — composition is fine; re-export with real alpha.

> A tall vertical Art Nouveau botanical ornament in the style of Mucha — wheat stalks and curling sage-green leaves rising along the left edge of a page, drawn as a slender column to be placed inside the left margin of a framed illustration. Hand-drawn ink-and-watercolor feel, warm ink line work (#211d1b), sage-green foliage (#7a8c6a), occasional small rust-orange floral accent (#a85a3a). Aspect ratio approximately 1:6 (tall and narrow). Source resolution at least 400 pixels wide by 2400 pixels tall. Transparent background with true alpha channel — no checkerboard pattern, no white fill, no canvas color. PNG-32 with alpha. Only the botanical elements should be visible; the rest must be fully transparent.

***`frame-side-right.png`*** — same fix as left, complementary composition.

> A tall vertical Art Nouveau botanical ornament in the style of Mucha — California poppies in bloom and curling sage-green leaves cascading down the right edge of a page, drawn as a slender column to be placed inside the right margin of a framed illustration. Compositionally complements but does not mirror the left-side wheat-and-leaves ornament. Hand-drawn ink-and-watercolor feel, warm ink line work (#211d1b), rust-orange poppies (#a85a3a), sage-green foliage (#7a8c6a). Aspect ratio approximately 1:6 (tall and narrow). Source resolution at least 400 pixels wide by 2400 pixels tall. Transparent background with true alpha channel — no checkerboard pattern, no white fill, no canvas color. PNG-32 with alpha. Only the botanical elements should be visible; the rest must be fully transparent.

### Claude Design (Anthropic Labs product) — considered, declined for this phase

David asked 2026-05-28 whether to hand the project (or part of it) over to Claude Design (Anthropic Labs research preview, launched April 17 2026, Opus 4.7 under the hood, bundled into Pro/Max/Team/Enterprise with its own metered weekly allowance). Assessment: not for this phase of this project. The design vocabulary is already locked (palette, type, ornament library, asymmetric plate pattern, approved annotation drafts). Remaining work is code editing on top of those decisions — Claude Design's output would still need translating back into Astro components, and chat already has bash mount + file tools. Most plausible future trigger: Phase 5 herbarium card design exploration, where the visual vocabulary still needs invention. Pro covers a session or two before throttling for that one-shot use. Full assessment with sources in the chat that asked the question.

**Next-batch ordering (start here in the fresh chat):**

- **Phase 3.6c (David, async).** Run the three asset regen prompts above in image-gen tool. Save over existing files in `/public/ornaments/`. Verify side-ornament checkerboard is gone (transparency-aware viewer). Once new masthead strip is in, revert masthead CSS to plain `width: 100%; height: auto` at all breakpoints.
- **Phase 3.7 (next code work).** Rhythm compression. Global CSS pass tightening between-section margins ~25-30% — chapter-title margins, organic-frame margins, section-divider spacing. Small, contained, deploys independently of the larger 4-redo / 3-redo work.
- **Phase 4-redo.** For each Infographic: remove SVG-baked kicker / title / unit-caption. Source line + verified stamp stay baked. The annotation column carries the editorial signage on the rendered page. Verify chart still reads at narrower right-column width (~70% of plate).
- **Phase 3-redo.** Rewrite `index.astro` to wrap each chart in `ChapterPlate` with the approved annotation drafts. Drop in `Interlude`s between paired plates in chapters IV and V. Relocate RangeVsPoint from hero to footer-adjacent primer. Rewrite all six chapter intros to drop abstract-opener antipatterns. Note: 4-redo and 3-redo can be batched as one atomic visible change if preferred — they pair naturally, and shipping 4-redo alone leaves the home page in a transient "naked charts" state.
- **Phase 5+ unchanged conceptually.** /comparisons herbarium inherits the asymmetric-plate vocabulary; /methods, mobile, prose sweep all queue after.

**Components in place:**

- `src/components/OrganicFrame.astro` — restrained + ornate (sideLeft/sideRight) variants.
- `src/components/SubjectMarker.astro` — water droplet (teal), electricity bolt (sage), carbon diamond (rust).
- `src/components/SectionDivider.astro` — four motifs (wheat / vine / water / carbon).
- `src/components/NumericCartouche.astro` — restrained + ornate (3:2 locked) variants.
- `src/components/ChapterRail.astro` — six-dot reading-progress widget; mounted in index.astro only; hidden below 980px.
- `src/components/ChapterTitle.astro` — refactored 2026-05-28: Cardo small-caps kicker, no dropcap, plain hairline rule (no diamond).
- `src/components/ChapterPlate.astro` — Phase 3.5a. 30/70 magazine-spread layout wrapping OrganicFrame with sideLeft+sideRight. Annotation column on the left, chart canvas in right slot.
- `src/components/Interlude.astro` — Phase 3.5b. 3-column mid-chapter pause: cartouche / italic / cartouche.
- `src/layouts/Layout.astro` — masthead capped 2026-05-28 (interim CSS pending Phase 3.6c asset regen); footer rewritten with the approved 3-line close and new tagline.
- All eight `Infographic*.astro` — tokenized to Mucha palette in Phase 4a–d. Scoped `background: white` stripped to transparent in Phase 3.5e. **Still pending SVG-header strip per Phase 4-redo.**
- `src/components/HourlyImpactHero.astro` — internal OrganicFrame wrapper removed in Phase 3.6b (was double-framing inside `index.astro`). Inherits frame from parent.
- `src/pages/dev/ornaments.astro` — QA page; will need new render blocks for `ChapterPlate` + `Interlude` when those land.

**Runtime assets in `/public/ornaments/`:**

- `masthead-strip.png`, `frame-side-left.png`, `frame-side-right.png`, `cartouche-frame.png`, `footer-roundel-earth.png`, `footer-roundel-landscape.png`. All ~1.5–2 MB each; Phase 8 compresses or vectorizes before launch.

**Design references:**

- `design/mockup_art_nouveau_reference.png` — the design destination. Reading C revision was anchored on re-reading this with David.
- `design/README.md` — describes the mockup and asset locations.

**QA page:** `/dev/ornaments` renders every primitive in isolation. Phase 3.5 will add `ChapterPlate` + `Interlude` render blocks.

**Design decisions worth carrying forward:**

- Corner ornament must be informational (SubjectMarker earned the corner; CornerCurl retired in Phase 1.5).
- Botanical strokes ~2px or thicker for sage and teal to hold against ivory.
- ChapterRail mounts only on the home page.
- Ornate cartouche locks to 3:2 (asset's native ratio).
- Prose discipline: short sentences, no preamble, refer directly to the chart. Three prose memories govern: anti-AI-speak rubric, prose-defers-to-infographics, prose-refers-directly-to-the-infographic. Plus the new layered-prose-redundancy memory.
- The "All X are Y" parallel-anaphora structure in the old footer close is RETIRED per Reading C — leaned on the "honest" virtue-claim pattern flagged in the rubric.

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
    ChapterRail.astro                      ← six-dot reading-progress widget, home page only (Phase 2d)
    ChapterTitle.astro                     ← chapter header: kicker + dropcap + rule + headline (Phase 2e.2)
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
design/                                    ← visual reference material (Mucha's Notebook redesign)
  README.md                                ← describes what's in the references
  mockup_art_nouveau_reference.png         ← the mockup David picked as the design destination
public/
  ornaments/                               ← six runtime PNG assets served at /ornaments/<name>.png
    masthead-strip.png
    frame-side-left.png
    frame-side-right.png
    cartouche-frame.png
    footer-roundel-earth.png
    footer-roundel-landscape.png

website_plan.md                            ← the plan
phase1_setup.md                            ← original setup walkthrough
authorial_voice.md                         ← voice description
user_profile.md                            ← David's collaboration preferences
README.md                                  ← repo readme
handoff.md                                 ← this file
```
       