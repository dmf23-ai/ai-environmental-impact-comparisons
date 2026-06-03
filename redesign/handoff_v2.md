# v2 Redesign — "Compared to What?" — Resume Doc

**STATUS (2026-06-03): Phases 1–5 COMMITTED & PUSHED (Phase 5 build green). Phase 6 CSS prune CODE COMPLETE on disk, awaiting build verify + commit. Phase 7 STATIC correctness sweep DONE; VISUAL QA (Mockup-1 fidelity, mobile, popup chart widths, Lighthouse) is the remaining gate — needs David's local render/screenshots.**


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


## DONE (committed & pushed) — Phase 2 (homepage atlas-first)
New components: `Masthead` (wired into home now), `RangeKey` (horizontal legend), `FeaturedComparisonPlate` (water/golf hero: vignette + bespoke rust-golf/teal-DC chart + ornate stat cartouche + Open Detail), `PlateIllustration` (15 engraved SVG icons), `AtlasFilters` (engraved pills single-select + sort `<select>`, vanilla JS on `.atlas-grid .plate-cell[data-*]`). Rebuilt `ComparisonPlate` into the rich atlas card (plate number, metric/scope chips, illustration, takeaway, mini RangeBar, confidence, Open Detail). New `src/lib/atlasMeta.ts` = additive presentation metadata (order/metric/scope/boundary/confidence/illustration/takeaway) keyed by figures.json id + synthetic `hourly`. Rewrote `src/pages/index.astro`: Masthead -> hero thesis -> RangeKey -> Featured(water-golf) -> "The Atlas of Comparisons" + filters + 14-plate grid (plates 02-15, excl. featured) -> "Field Notes on Scale" (all 8 infographics in OrganicFrames, content preserved, full medallion/accordion treatment deferred to Phase 4) -> methods CTA -> per-plate detail popups (reuse OrnatePopup). Rewrote `src/pages/comparisons.astro` to the new ComparisonPlate (full re-skin/filters = Phase 5). figures.json untouched (read-only).

## SANDBOX BUILD NOW BLOCKED (important)
David's Windows `npm install` (Phase 1) replaced node_modules native binaries with win32 ones, so the Linux sandbox build dies with `Cannot find module '@rollup/rollup-linux-x64-gnu'` (+ esbuild). The committed package-lock.json DOES list all four rollup platforms (David's Windows build is fine). Attempts to drop Linux binaries into node_modules alongside the win32 ones FAILED — the mount won't create files in node_modules subdirs (phantom "No such file or directory", same instability as the git lock), even with sync/sleep. So: verify Phase 2+ via DAVID'S local `npm run build`/`dev`. If a clean linux node_modules is ever restored, `astro.config.sandbox.mjs` build works again. See [[feedback_sandbox_astro_build]].

## NEXT — Phase 3 (atlas interaction polish) then 4/5/6/7
Phase 2 detail popups already wire chart+summary+boundary+sources+method per plate. Phase 3 remaining: deep-links to /comparisons anchors, confirm sort/filter UX, optional in-place expansion. Then Phase 4 (Field Notes medallions/accordions), Phase 5 (/comparisons filters + /methods TOC/#sources re-skin), Phase 6 (artwork polish: refine friezes/illustrations, prune dead .wordmark/.masthead-strip CSS), Phase 7 (QA + Mockup-1 visual checklist + a11y).


## DONE (committed & pushed) — Phase 3 + Phase 4
- Phase 3 (atlas interaction): its core requirement — each plate opens detail with chart, takeaway, boundary note, uncertainty, sources, methods link — was already delivered by Phase 2's per-plate OrnatePopup. Filters + sort live in AtlasFilters. REMAINING for Phase 5: per-plate deep-links to /comparisons#<anchor> (needs anchors added on /comparisons).
- Phase 4 (Field Notes on Scale): replaced the stacked infographics with a 6-medallion row (`FieldNote.astro`, circular medallion + roman numeral + blurb, OrnatePopupTrigger). Each medallion blooms a popup with the lesson's FULL chart(s) + auto source list + methods deep-link: I=Hour (HourlyImpactHero), II=Year (annual-twh), III=Water (water-bracket), IV=Trajectory (dc-trajectory + ai-share), V=Equivalents (watt-scale + household), VI=Training (training-vs-inference). Added 4 icons to PlateIllustration (calendar, droplet, trend, chip). Popups widen to 50rem via `.ornate-popup-frame:has(.popup-wide)` in global.css. NOTE: range-vs-point-primer infographic dropped from homepage (RangeKey covers "how to read"; primer still on /methods). OrganicFrame/InfographicRangeVsPoint imports in index.astro are now unused-but-harmless.

## NEXT — Phase 5 (re-skin /comparisons + /methods), then 6 (artwork polish + prune dead .wordmark/.masthead-strip CSS + widen-popup chart QA), then 7 (QA + Mockup-1 checklist + a11y)
/comparisons already uses the new ComparisonPlate (Phase 2); Phase 5 adds filters/sort (reuse AtlasFilters), per-plate anchors + deep-links, and re-skins /methods: table of contents, consolidated #sources section, anchors per figure/plate, boundary-note callouts, new typography. methods.astro is ~2072 lines — edit via python heredoc with sentinel anchors (Edit truncates).


## DONE (on disk, awaiting build verify + commit) — Phase 5 (/comparisons + /methods re-skin)
**/comparisons.astro** — rewritten to mirror the homepage atlas: `AtlasFilters` (pills + sort) added; each `.plate-cell` now carries the full `data-*` set (order/metric/scope/boundary/confidence/spread/title) so the shared filter/sort script works; **per-plate anchors** via `id={e.id}` + `scroll-margin-top` + a `:target` outline highlight; all 15 plates (incl. the featured water/golf as plate 01); popups unified with the homepage (kicker shows plate number, boundary-note block on boundary-sensitive plates); `#atlas-empty` element; display-face heading + small frieze; "Read the full methodology ledger →" CTA.
**index.astro** — each atlas popup now carries a **deep-link** `See this plate in the full archive → /comparisons#<id>` (+ `.popup-deeplink` style). Rebuilt whole file via heredoc (Edit/Write truncated it mid-write — see below).
**methods.astro** (now ~2354 lines) — re-skin via one python heredoc transformer (sentinel string replaces, each asserted to match exactly once):
  1. **Table of contents** (`<nav id="contents">`) after the lede — grouped "Home-page displays" / "Comparison plates", decimal-leading-zero numbering, anchors to all 23 sections + a "Consolidated source list →" link.
  2. **Consolidated `#sources` section** before `</Layout>` — built in frontmatter (`allSources`): dedupes 67 cited entries by URL → **30 unique**, alphabetized, numbered ledger, links open in new tab, "↑ Back to contents" link. Footer's pre-existing `/methods#sources` link now resolves.
  3. **4 boundary-choice callouts** (`<aside class="boundary-note">`, teal left-rule) on water-bracket, dc-trajectory (actual-vs-projected), water-residential-outdoor, water-vs-golf — added AFTER each h2, no prose removed.
  4. **Typography**: section h2 → `--font-display` (Cormorant), `scroll-margin-top` on sections, `.display-where` → Inter eyebrow; + TOC/ledger/boundary styles appended to `<style>`.

### PRESERVATION VERIFIED (no data loss)
- methods: 24 method-sections (23 original + #sources), **23 SourceLine intact**, all 23 TOC ids resolve to real sections, every section in TOC.
- All 14 comparison `anchor`s (+ hourly-hero) still resolve to methods section ids → "How this was calculated →" links unbroken.
- All 15 atlas ids present as `/comparisons` plate-cell ids → homepage deep-links resolve.
- figures.json untouched (read-only). No numbers/sources/dates changed.

### ⚠️ Edit/Write TRUNCATION hit again this session
The Write tool truncated comparisons.astro at 102 lines mid-popup, and two Edits truncated index.astro tail mid-CSS-rule. Both rebuilt via `cat > file <<'EOF'` heredoc on the mount and re-verified (wc + tail + grep counts). **methods.astro was edited ONLY via python heredoc** for this reason. Reconfirms [[feedback_edit_tool_truncation]] — treat bash mount as ground truth; never trust Edit/Write tail on these files.

## NEXT — Phase 6 (artwork polish + prune dead CSS) then Phase 7 (QA)
- Phase 6: prune dead `.wordmark` (global.css ~L104–142) and `.masthead-strip` (no refs anywhere) — confirmed dead; `.topnav-wordmark` is the live one, leave it. Refine friezes/illustrations; widen-popup chart QA.
- Phase 7: Mockup-1 visual checklist, mobile pass, keyboard/a11y, Lighthouse ≥95, final "no number changed" diff sweep.


## DONE (on disk, awaiting build verify + commit) — Phase 6 (dead-CSS prune)
**global.css** — removed the retired `.wordmark`, `.wordmark:hover`, `.wordmark .dot`, `.masthead-strip` rules + their `@media (min-width:720px)` block (−675 bytes; brace balance 106/106, verified). `.site-mast` KEPT (live — wraps TopNav in Layout). Comment above it refreshed. `.topnav-wordmark` (TopNav.astro) is the live brand mark, untouched. No other Phase 6 artwork changes made — frieze/illustration/popup-width refinement needs a visual render I can't produce in-sandbox (build blocked), so deferred to a David-assisted visual pass rather than guessing blind.

## Phase 7 — STATIC correctness sweep (DONE) / VISUAL (pending)
NO-NUMBER-CHANGED, verified:
- `figures.json` never written this session (sole data source) → confirmed unchanged.
- comparisons.astro carries zero literal data numbers (all via figures.json).
- index.astro rebuilt from the exact original; featured stat `500–700 billion gallons / yr` preserved.
- methods.astro edits purely additive (+TOC/+callouts/+#sources); 10 spot-checked original figures present, all 66 `<strong>` derivation leads intact.
Mockup-1 checklist (structural, from components — visual fidelity still TBD on render): masthead+subscript ✓, balanced nav+GitHub ✓, brief hero ✓, horizontal range key ✓, featured panel (left illo / center chart / right cartouche / Open Detail) ✓, dense atlas w/ mini charts ✓, engraved-plate cards ✓, circular Field Note medallions ✓, footer maxim+roundels+links+last-verified ✓, palette tokens consistent ✓.
REMAINING (needs running site): popup-wide chart rendering at 50rem, mobile layout pass, keyboard/focus pass, contrast spot-check on new TOC/ledger/boundary-note (teal-on-paper), Lighthouse ≥95.

## ⚠️ Process slip this session
Accidentally ran one read-only `git diff --stat main -- src/data/figures.json` IN THE SANDBOX (against the never-run-git-in-sandbox rule) while verifying figures.json was unchanged. Read-only, exit 0, empty diff. Flagged to David to Remove-Item any `.git\index.lock` before his next git op. Do NOT repeat — verify "unchanged" by tracking which files were written, not via git. See [[feedback_sandbox_git_workaround]].
