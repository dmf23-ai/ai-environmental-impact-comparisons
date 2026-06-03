# v2 Redesign — "Compared to What?" — Resume Doc

**Branch:** `v2-compared-to-what` (off `main`; main is the preserved pre-redesign state).
**Plan (source of truth):** `redesign/compared_to_what_redesign_plan.md`
**Reference mockup:** `redesign/homepage reference image.png` (Mockup 1, the interactive atlas).
**Mode:** autonomous completion; usage self-throttle; this doc is the cross-session entry point for the redesign (the big root `handoff.md` covers pre-redesign history).

## Confirmed decisions (David, 2026-06-02)
- Branch name `v2-compared-to-what`.
- Illustrations: author as SVG + reuse existing PNG ornaments; fully autonomous (no image-gen handoffs) as long as it matches the plan/mockup.
- Visual QA: local build + screenshots (branch is NOT deployed; production untouched).
- Include all optional items: 15th plate (hourly CO2), /about page, atlas sort controls.
- Palette: EXTEND the existing "Mucha's Notebook" tokens, don't replace (keeps verified AA contrast). Added display face Cormorant Garamond for the masthead/headlines only; Cardo stays for body.
- Two-tier nav: slim TopNav on every page (Layout) + big homepage-only Masthead hero.

## Sandbox build workaround (IMPORTANT)
The Windows mount blocks `unlink`/`rmdir`, breaking vite dep-reopt and git locks. Build with:
`npx astro build --config astro.config.sandbox.mjs` (gitignored; redirects cache/out/vite to native `/tmp/astro-sb`). A trailing `EPERM ... unlink '.astro/...'` with `rc=1` is HARMLESS — it fires AFTER all routes generate. Success signal = the per-page "/x/index.html" lines + "generating static routes". `_astro/` bundle + fonts do NOT fully emit in the sandbox (EPERM truncates the tail) — that's fine, they emit on David's real Windows build. Helper: `bash sbbuild.sh`. Sandbox is ephemeral per bash call; first build of a session is a cold ~5–40s re-opt (occasionally exceeds the 45s bash limit — just retry).

## DONE — Phase 1 (design tokens + shared frame)
- `src/styles/global.css`: +Cormorant @imports (top); +Botanical Ledger token layer at end (--paper-light, --wheat, --teal/-sage/-terracotta aliases, --hairline, --font-display); +.smallcaps/.eyebrow/.hairline/.display utilities; +.site-mast-frieze & .footer-nav styles.
- `src/components/TopNav.astro` — NEW. About·Comparisons | wordmark | Methods·Sources + GitHub icon, small-caps, diamond separators, active-page state, mobile-collapses center wordmark.
- `src/components/BotanicalFrieze.astro` — NEW. Symmetric inline-SVG frieze (mirrored vine spray + central wheat sheaf + poppies). variants: hero/small/footer.
- `src/components/Masthead.astro` — NEW. Homepage hero: big Cormorant "Compared to What?" + small-caps subtitle w/ true CO<sub>2</sub> + dek + flanking poppy clusters (shared #cw-poppy-cluster symbol) + hero frieze. NOT yet wired into a page (that's Phase 2).
- `src/layouts/Layout.astro` — TopNav + small frieze replace the old wordmark/masthead-strip; footer gains a small-caps nav link row.
- `src/pages/about.astro` — NEW. Mission / what you'll find / why ranges / editorial standard / corrections. Concrete prose (anti-AI-speak rubric).
- Dependency added: `@fontsource/cormorant-garamond` (package.json + lockfile). **David must `npm install`.**
- Build: passes (all routes generate; about page + TopNav + frieze confirmed in emitted HTML).

## NEXT — Phase 2 (homepage restructure, atlas-first)
Replace chapter-first `index.astro` with: Masthead → hero thesis → RangeKey strip → FeaturedComparisonPlate (water/golf boundary) → "Atlas of Comparisons" heading → filters → dense ComparisonPlate grid (all 14 + 15th hourly) → (Phase 4 Field Notes) → methodology CTA. New components needed: RangeKey, FeaturedComparisonPlate, atlas grid wrapper, enhanced ComparisonPlate (plate number, metric/scope labels, mini RangeBar, illustration icon). Reuse OrnatePopup detail system. Keep `figures.json` as read-only source of truth — no data/source/last_verified changes. Demote ChapterRail/ChapterTitle/ChapterPlate/Interlude (move chapters to Field Notes in Phase 4).

## Known gaps / notes
- Usage page (claude.ai/settings/usage) didn't render its % via Claude in Chrome this run (client modal redirect). Retry next session.
- Old `.wordmark`/`.masthead-strip` CSS in global.css is now unused (harmless; can prune in Phase 6).


## DONE (written, pending David's build) — Phase 2 (homepage atlas-first)
New components: `Masthead` (wired into home now), `RangeKey` (horizontal legend), `FeaturedComparisonPlate` (water/golf hero: vignette + bespoke rust-golf/teal-DC chart + ornate stat cartouche + Open Detail), `PlateIllustration` (15 engraved SVG icons), `AtlasFilters` (engraved pills single-select + sort `<select>`, vanilla JS on `.atlas-grid .plate-cell[data-*]`). Rebuilt `ComparisonPlate` into the rich atlas card (plate number, metric/scope chips, illustration, takeaway, mini RangeBar, confidence, Open Detail). New `src/lib/atlasMeta.ts` = additive presentation metadata (order/metric/scope/boundary/confidence/illustration/takeaway) keyed by figures.json id + synthetic `hourly`. Rewrote `src/pages/index.astro`: Masthead -> hero thesis -> RangeKey -> Featured(water-golf) -> "The Atlas of Comparisons" + filters + 14-plate grid (plates 02-15, excl. featured) -> "Field Notes on Scale" (all 8 infographics in OrganicFrames, content preserved, full medallion/accordion treatment deferred to Phase 4) -> methods CTA -> per-plate detail popups (reuse OrnatePopup). Rewrote `src/pages/comparisons.astro` to the new ComparisonPlate (full re-skin/filters = Phase 5). figures.json untouched (read-only).

## SANDBOX BUILD NOW BLOCKED (important)
David's Windows `npm install` (Phase 1) replaced node_modules native binaries with win32 ones, so the Linux sandbox build dies with `Cannot find module '@rollup/rollup-linux-x64-gnu'` (+ esbuild). The committed package-lock.json DOES list all four rollup platforms (David's Windows build is fine). Attempts to drop Linux binaries into node_modules alongside the win32 ones FAILED — the mount won't create files in node_modules subdirs (phantom "No such file or directory", same instability as the git lock), even with sync/sleep. So: verify Phase 2+ via DAVID'S local `npm run build`/`dev`. If a clean linux node_modules is ever restored, `astro.config.sandbox.mjs` build works again. See [[feedback_sandbox_astro_build]].

## NEXT — Phase 3 (atlas interaction polish) then 4/5/6/7
Phase 2 detail popups already wire chart+summary+boundary+sources+method per plate. Phase 3 remaining: deep-links to /comparisons anchors, confirm sort/filter UX, optional in-place expansion. Then Phase 4 (Field Notes medallions/accordions), Phase 5 (/comparisons filters + /methods TOC/#sources re-skin), Phase 6 (artwork polish: refine friezes/illustrations, prune dead .wordmark/.masthead-strip CSS), Phase 7 (QA + Mockup-1 visual checklist + a11y).


## DONE (written, pending David's build) — Phase 3 + Phase 4
- Phase 3 (atlas interaction): its core requirement — each plate opens detail with chart, takeaway, boundary note, uncertainty, sources, methods link — was already delivered by Phase 2's per-plate OrnatePopup. Filters + sort live in AtlasFilters. REMAINING for Phase 5: per-plate deep-links to /comparisons#<anchor> (needs anchors added on /comparisons).
- Phase 4 (Field Notes on Scale): replaced the stacked infographics with a 6-medallion row (`FieldNote.astro`, circular medallion + roman numeral + blurb, OrnatePopupTrigger). Each medallion blooms a popup with the lesson's FULL chart(s) + auto source list + methods deep-link: I=Hour (HourlyImpactHero), II=Year (annual-twh), III=Water (water-bracket), IV=Trajectory (dc-trajectory + ai-share), V=Equivalents (watt-scale + household), VI=Training (training-vs-inference). Added 4 icons to PlateIllustration (calendar, droplet, trend, chip). Popups widen to 50rem via `.ornate-popup-frame:has(.popup-wide)` in global.css. NOTE: range-vs-point-primer infographic dropped from homepage (RangeKey covers "how to read"; primer still on /methods). OrganicFrame/InfographicRangeVsPoint imports in index.astro are now unused-but-harmless.

## NEXT — Phase 5 (re-skin /comparisons + /methods), then 6 (artwork polish + prune dead .wordmark/.masthead-strip CSS + widen-popup chart QA), then 7 (QA + Mockup-1 checklist + a11y)
/comparisons already uses the new ComparisonPlate (Phase 2); Phase 5 adds filters/sort (reuse AtlasFilters), per-plate anchors + deep-links, and re-skins /methods: table of contents, consolidated #sources section, anchors per figure/plate, boundary-note callouts, new typography. methods.astro is ~2072 lines — edit via python heredoc with sentinel anchors (Edit truncates).
