# OrnatePopup system

Locks the spec before the build. Design direction (2026-05-28): the landing page and `/comparisons` shed prose. Detail moves into ornate Art Nouveau popups that bloom from the click point and carry what the page used to say in margins and paragraphs.

## Trigger model

Any element on the page can become a popup trigger by adding two data attributes:

```html
<button data-popup-trigger="how-the-hour-was-computed">…</button>
```

A matching content template sits in the same page:

```html
<template data-popup-content="how-the-hour-was-computed">
  <header>
    <p class="popup-kicker">Methodology</p>
    <h2 id="popup-title-how-the-hour-was-computed">The hour, in carbon</h2>
  </header>
  <div class="popup-body">
    …prose, figures, source list…
  </div>
</template>
```

The controller wires triggers to templates at `DOMContentLoaded`. Triggers without a matching template log a console warning and stay inert.

## DOM contract

The runtime injects one `<dialog>` element at the document root:

```html
<dialog class="ornate-popup" aria-labelledby="popup-title-{id}">
  <div class="ornate-popup-frame">
    <img class="ornate-popup-side ornate-popup-side-left"  src="/ornaments/frame-side-left.png"  alt="" aria-hidden="true">
    <img class="ornate-popup-side ornate-popup-side-right" src="/ornaments/frame-side-right.png" alt="" aria-hidden="true">
    <button class="ornate-popup-close" aria-label="Close">×</button>
    <div class="ornate-popup-content"><!-- cloned from template --></div>
  </div>
</dialog>
```

One dialog is reused for every popup; opening swaps the content + `aria-labelledby` rather than spawning a fresh element. Avoids stacking, avoids DOM churn.

## Motion

The popup blooms from the click point.

1. On `click`, capture `event.clientX` / `event.clientY` (or the trigger's bounding-rect center for keyboard activation).
2. Set CSS custom properties on the dialog: `--popup-origin-x`, `--popup-origin-y`.
3. Call `dialog.showModal()`.
4. CSS transition runs `transform: scale(0.05) translate(…)` → `scale(1) translate(0, 0)` with `transform-origin` at the captured point. 280ms `cubic-bezier(0.2, 0.8, 0.2, 1)`.
5. Backdrop fades 0 → 0.6 paper-soft tint over the same window.

Reduced motion (`prefers-reduced-motion: reduce`): skip the scale, swap to a 120ms opacity fade.

## Close affordances

- ESC key (handled natively by `<dialog>`).
- Click on the backdrop area outside the frame.
- Click the `×` close button.
- Programmatic `dialog.close()` returns focus to the original trigger.

Animation on close mirrors open: scale + fade back toward the trigger's bounding center over 200ms.

## Focus management

- On open: focus the close button. (Not the first interactive content element — the popup contents are read-only by default; the only required action is to dismiss.)
- On close: focus returns to the trigger. Maintained via a module-scoped `lastTrigger` reference.
- `<dialog>`'s native modal behavior traps Tab inside the popup; no manual focus-trap code needed.

## Visual vocabulary

The popup is a small chapter plate, not a generic modal:

- Ivory paper background, 1px warm-ink border, asymmetric corners (0 18px 0 18px) — same as `OrganicFrame`.
- Both side botanicals (`frame-side-left.png` + `frame-side-right.png`) along the inside edges of the frame. Cropped to the popup's vertical extent.
- Cardo body, Cardo small-caps kicker, no terracotta dropcap.
- Inline `NumericCartouche` allowed in popup content for figures that deserve display weight.
- Source list at the bottom: same `SourceLine` component the rest of the site uses.
- Close button: 28px circle, warm-ink × glyph, no chrome other than a 1px ink-soft border. Sits top-right inside the frame, outside the content column.

## Content shape (recommended)

Most popups carry one of three shapes:

1. **Methodology popup** — kicker "Methodology", title, 1–3 short paragraphs explaining how a number was computed, link to the matching `/methods` anchor.
2. **Source popup** — kicker "Sources", title, list of `SourceLine`s, optional one-line note on verification cadence.
3. **Comparison popup** (`/comparisons`) — kicker e.g. "Water · golf vs. AI", title, NumericCartouche, 2–3 short paragraphs, source list, "How this was calculated →" link.

Content authors aren't constrained to these — they're the patterns the page expects.

## Sizing

- Desktop: `max-width: 36rem`, `max-height: 80vh`, scrollable content area when overflowed.
- Tablet (≤900px): `max-width: 32rem`, side botanicals proportionally smaller.
- Mobile (≤720px): full-bleed minus 12px gutters, `max-height: 90vh`, side botanicals scale down to 12% width each so the content column keeps breathing room.

## Accessibility

- Trigger elements are `<button type="button">` when interactive. Inline trigger text in prose uses a styled `<button>`, not an `<a>`, so screen readers announce "button" rather than "link to nowhere."
- `<dialog>` provides `role="dialog"` implicitly.
- `aria-labelledby` points at the popup title; `aria-describedby` is not used (content can be too varied).
- Each popup template's title carries a stable `id` of the form `popup-title-{popup-id}`.
- Close button has explicit `aria-label="Close"`.
- Content order in DOM matches reading order; visual ornaments are `aria-hidden`.

## No-JS fallback

If JS is disabled, triggers fall back to anchor links pointing at hidden content sections rendered statically below the page. The controller transparently replaces this on hydration.

A pragmatic v1 may skip the no-JS path and let triggers be inert without JS — acceptable for this site since every chart already requires JS-free SVG rendering and the popup carries supplemental detail, not load-bearing content. **v1 decision: skip no-JS fallback, accept that detail is JS-gated.**

## File layout

- `src/components/OrnatePopup.astro` — emits the single root `<dialog>` element + controller script. Drop one instance into `Layout.astro`.
- `src/components/OrnatePopupTrigger.astro` — renders a `<button>` with the trigger attributes; convenience wrapper.
- `src/components/OrnatePopupContent.astro` — renders a `<template>` with the content attributes; convenience wrapper around author-supplied slot.
- `src/styles/global.css` — popup styles inline at the bottom of the file (avoid an Astro-scoped specificity fight with the dialog injection).

## Out of scope for v1

- Nested popups (popup-within-popup). Triggers inside popup content are inert until v2.
- Deep-linking (`#popup-…` URL hash to auto-open). Possible but not required by the design direction.
- History integration (popup as routable state). Same — defer.
- Animation polish beyond the bloom (e.g., botanical-stroke trace-in). Visual delight pass, defer to a later phase if budget allows.
