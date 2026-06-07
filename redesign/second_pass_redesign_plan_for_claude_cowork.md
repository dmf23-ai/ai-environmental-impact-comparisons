# Second-Pass Redesign Brief for Claude Cowork

**Project:** Compared to What? AI and Water, Electricity, & CO₂  
**Branch under review:** current redesign branch supplied as `ai-environmental-redesign-branch.zip`  
**Reference target:** selected Mockup 1 / Art Nouveau interactive atlas  
**Primary goal:** Move the implemented site much closer to the selected reference image while preserving all current data, sources, methods, and interactive detail behavior.

---

## 0. Executive summary

The current redesign is directionally correct in information architecture: it has the correct title, comparison-first homepage, featured comparison, atlas cards, filters, Field Notes, `/comparisons`, `/methods`, and popups. However, visually it still reads much more like a restrained literary webpage with light ornamentation than like the dense, illustrated Art Nouveau data atlas shown in the selected reference mockup.

The most important second-pass change is **not** to rewrite the data model or content. It is to substantially change the visual system and layout density:

1. Widen the homepage and comparison grid so it reads as a broad illustrated atlas page, not a narrow centered column.
2. Add a full decorative page frame, stronger masthead, rich botanical ornaments, and large raster/illustrated assets.
3. Rebuild the featured comparison to match Mockup 1: image-left, chart-center, cartouche-right, CTA at lower right, all inside one dense ornamental panel.
4. Make comparison plates more pictorial and less plain: larger illustrations, stronger borders, more visible plate numbers, better mini-chart styling, and a compact multi-column layout.
5. Make the footer and Field Notes section feel like the reference: medallions, botanical roundels, engraved divider rules, and a stronger final ribbon.
6. Re-skin `/comparisons`, `/methods`, and all popups to match the homepage, rather than letting them remain narrow text pages.

The site should feel like a **digital museum plate / illustrated scientific field guide / Art Nouveau data cabinet**, not merely a clean serif site with decorative SVG corners.

---

## 1. What the current redesign gets right

Do not throw these away:

- The title is correct: **Compared to What? AI and Water, Electricity, & CO₂**.
- The homepage is now comparison-first.
- The featured comparison is the right one: **Water: Data Centers vs. Golf Courses**.
- The atlas includes all comparison cards and has filter controls.
- The Field Notes section preserves the original chapter/explainer content.
- The `/comparisons` page preserves full comparison access.
- The `/methods` page preserves the derivation ledger.
- The popup/detail system is working and should remain, though it needs major visual refinement.
- Source/data fidelity appears preserved and should remain the top nonvisual constraint.

---

## 2. Core visual diagnosis

### 2.1 The current site is too narrow

The current CSS still uses a narrow reading-column mentality:

```css
:root {
  --max-width: 42rem;
  --max-width-wide: 52rem;
}
```

This is the biggest structural reason the site does not resemble Mockup 1. The selected mockup is a **wide atlas page**. It needs a desktop canvas closer to **1100–1280 px**, with the atlas grid spanning most of that width.

### Required change

Introduce an atlas page width system:

```css
:root {
  --max-width-reading: 42rem;
  --max-width-wide: 64rem;
  --max-width-atlas: 76rem; /* 1216px */
  --page-gutter: clamp(1rem, 3vw, 2.5rem);
}

main {
  max-width: var(--max-width-atlas);
  padding-inline: var(--page-gutter);
}

main.reading {
  max-width: var(--max-width-reading);
}

main.atlas {
  max-width: var(--max-width-atlas);
}
```

Apply the atlas width to:

- homepage
- `/comparisons`
- popup detail views where charts are displayed

Keep `/methods` narrower for long-form text, but wrap it in the same page frame and use ornamental side notes.

---

### 2.2 The current site lacks a full page frame

Mockup 1 has a visible page border: rounded corners, engraved linework, small corner flourishes, and a framed parchment-page feeling. The current site floats on a plain parchment background with no enclosing page architecture.

### Required change

Add a reusable page-frame component around the visible page content.

Suggested component:

```astro
<PageFrame>
  <slot />
</PageFrame>
```

Suggested CSS direction:

```css
.page-frame {
  position: relative;
  width: min(var(--max-width-atlas), calc(100vw - 2rem));
  margin: 0 auto;
  padding: clamp(1rem, 2vw, 1.8rem);
  border: 1px solid rgba(112, 96, 62, 0.78);
  outline: 1px solid rgba(112, 96, 62, 0.28);
  outline-offset: -8px;
  border-radius: 18px;
  background:
    radial-gradient(circle at 50% 0%, rgba(255,255,255,0.36), transparent 42%),
    linear-gradient(#f7efdf, #efe2c8);
  box-shadow:
    0 18px 50px rgba(50, 37, 20, 0.13),
    inset 0 0 60px rgba(120, 86, 42, 0.08);
}

.page-frame::before,
.page-frame::after {
  content: "";
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(154, 137, 102, 0.35);
  border-radius: 12px;
  pointer-events: none;
}
```

Then add decorative corner images as absolutely positioned PNGs/SVGs, not CSS glyphs.

---

### 2.3 The current ornamentation is too sparse and too synthetic

The current SVG ornaments are technically good but visually too plain. Mockup 1 uses naturalistic, hand-drawn botanical illustration: poppies, wheat, curling vines, leaves, small pods, medallions, and decorated panel corners.

The current top ornament and poppies do not yet have enough volume, texture, asymmetry, or watercolor/ink character.

### Required change

Keep simple SVG only for structural lines and icons. Use generated transparent PNGs for the organic botanical material:

- masthead left and right poppy clusters
- full-width botanical frieze
- featured panel golf-course illustration
- plate spot illustrations
- footer medallions
- page corner ornaments

Use these generated images as decorative assets layered over real HTML/SVG charts and text.

Do **not** flatten charts/text into generated images. Charts must remain real SVG/HTML/CSS for accessibility and data accuracy.

---

### 2.4 The current typography is too restrained

The current Cormorant/Cardo pairing is elegant, but Mockup 1 needs a more dramatic display hierarchy. The implemented masthead does not yet produce the oversized engraved poster title feel.

### Required change

Use a more theatrical display treatment for only the masthead and major section titles.

Recommended font stack:

```css
--font-display: "Cormorant Garamond", "Bodoni Moda", "Playfair Display", "Cardo", Georgia, serif;
--font-body: "EB Garamond", "Cardo", Georgia, serif;
--font-ui: "Inter Variable", system-ui, sans-serif;
```

Masthead sizing:

```css
.site-title-main {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(4.2rem, 9vw, 8.5rem);
  line-height: 0.84;
  letter-spacing: 0.005em;
}

.site-title-sub {
  font-family: var(--font-body);
  font-variant-caps: small-caps;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: clamp(1.25rem, 2.6vw, 2.25rem);
}
```

Important: in the selected mockup, the title is huge. The current title is not yet visually dominant enough.

---

## 3. Homepage second-pass requirements

### 3.1 Top navigation

Current nav is too small and plain. It should be a visible engraved rule system around the masthead.

Required structure:

```text
ABOUT · COMPARISONS             [small ornament/rule]             METHODS · SOURCES · GitHub icon
```

Requirements:

- Small caps.
- Terracotta diamond bullets.
- Thin horizontal rules extending toward the center.
- GitHub icon at far right, as in Mockup 1.
- No sticky behavior.
- It should sit inside the page frame.

---

### 3.2 Masthead

The current masthead is the correct content but too modest. It needs to occupy more vertical and emotional space, like Mockup 1.

Required masthead composition:

1. Top nav.
2. Large title line: **Compared to What?**
3. Subtitle line: **AI and Water, Electricity, & CO₂**
4. Left and right poppy clusters, large and painterly.
5. Centered short dek.
6. Compact “How to read this atlas” strip below.

Remove the current small frieze if it competes with the larger poppy clusters. Use the full-width botanical frieze only if it helps the title feel closer to the reference.

---

### 3.3 “How to read this atlas” strip

The current strip is directionally right but too light. In Mockup 1, this is a boxed horizontal legend with several cells.

Required content and layout:

```text
HOW TO READ THIS ATLAS | Most numbers are ranges, not single values | Boundary choices change the answer | Sources and methods are linked on every plate | Last verified [date]
```

Required design:

- Full-width horizontal rounded panel.
- Thin ornamental border.
- Four or five equal cells.
- Small icons: range bracket, leaves/boundary marker, open book, magnifying glass/date.
- Dotted vertical dividers.
- Height: about 70–90 px on desktop.
- Must visually read as a major strip, not a paragraph.

---

### 3.4 Featured comparison panel

This is the most important visual component. The current panel is too simple and too vertically stacked. It must match Mockup 1 much more closely.

#### Required desktop layout

Use a 12-column layout inside one large ornate panel:

```text
[1–3] left illustration      [4–9] chart and explanation       [10–12] stat cartouche + CTA
```

#### Required elements

- Large “FEATURED” ribbon at top-left, terracotta with shadow/ink outline.
- Left illustration: golf course + pond + reeds + lilies, painted/engraved style, occupying the full left third.
- Center title: **Water: Data Centers vs. Golf Courses**.
- Center italic dek explaining the boundary issue.
- Center horizontal bar chart, with rust/orange golf bars and teal data-center bars.
- Right cartouche: **500–700** big numeral, **BILLION GALLONS PER YEAR**, short caption.
- Teal “Open Detail →” button below the cartouche.
- Decorative corner vines and inner border.

#### Required CSS structure

```css
.featured-panel {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 240px;
  gap: 1.5rem;
  align-items: stretch;
  padding: 1.25rem 1.4rem;
  border: 1px solid var(--rule-strong);
  outline: 1px solid var(--hairline);
  outline-offset: -8px;
  border-radius: 18px;
}

.featured-illustration {
  min-height: 260px;
  border-radius: 16px;
  overflow: hidden;
}

.featured-chart {
  align-self: center;
}

.featured-stat-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
```

#### Required mobile behavior

Stack in this order:

1. title/dek
2. illustration
3. chart
4. stat cartouche
5. CTA

Do not allow the chart to become illegible.

---

### 3.5 Atlas section

The current atlas grid works functionally but looks too plain, too narrow, and too text-heavy. It needs to become a dense ornamental card cabinet.

#### Required desktop layout

Use the Mockup 1 rhythm:

- First two rows: 4 cards per row.
- Third row: 6 smaller cards if feasible, or continue 4-per-row at 1216 px.
- Cards should be visually compact but illustration-rich.

Recommended CSS:

```css
.atlas-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
}

@media (min-width: 1180px) {
  .atlas-grid.compact-tail .tail-card {
    /* optional: allow final row to use 6 smaller cards */
  }
}

@media (max-width: 900px) {
  .atlas-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 560px) {
  .atlas-grid { grid-template-columns: 1fr; }
}
```

#### Required card visual changes

Each plate should have:

- More obvious decorative border, closer to Mockup 1.
- A larger illustration thumbnail in the lower-left or left side.
- Plate number in a circular medallion, not just text.
- Topic icon in a colored droplet/lightning/cloud seal.
- Mini chart with two or three clearly visible bars.
- `Open detail →` as a small link, not the dominant content.
- Less summary text. Keep one short italic line max.

#### Current card problem

The current cards look like small document excerpts. Mockup 1 cards look like illustrated specimen plates. The next pass should reduce prose and increase illustration/chart/ornament presence.

---

### 3.6 Atlas filters

Filters should resemble engraved pills as in Mockup 1.

Required improvements:

- Move filters into a single horizontal control bar under the atlas title.
- Use active state: teal fill, ivory text.
- Use inactive state: parchment fill, hairline border.
- Include `Featured Order` select on the right.
- Avoid modern rounded SaaS styling; make the controls feel like printed labels.

---

### 3.7 Field Notes section

The current Field Notes section is too small and airy. Mockup 1 uses a strong framed panel with medallion icons and a right-side CTA.

Required layout:

```text
FIELD NOTES ON SCALE
[medallion I] [medallion II] [medallion III] [medallion IV] [medallion V] [medallion VI] | right CTA block
```

Requirements:

- Put the whole section inside a wide ornate panel.
- Use circular illustrated medallions for each note.
- Use Roman numerals below or inside the medallions.
- Keep labels: The Hour, The Year, The Water, The Trajectory, In Equivalents, Training vs. Inference.
- Add right-side text: “Deep dives into the big-picture chapters that explain the numbers behind the atlas.”
- Add teal CTA button: `Explore Chapters →`.

---

### 3.8 Footer

The current footer is still too minimal. It needs the rich bottom panel from Mockup 1.

Required footer elements:

- Wide framed footer band.
- Left roundel: globe / earth illustration.
- Right roundel: sustainable landscape with hills, river, wind turbines.
- Center slogan: **Sustainable futures require informed choices.**
- Footer nav row with small icons: About this Project, Methods, Sources & Data, GitHub.
- Last verified date.
- Final tiny credit line.

The footer should visually balance the masthead. At present it reads like ordinary page text.

---

## 4. `/comparisons` page second-pass requirements

The `/comparisons` page currently feels like an archive page, not like part of the same Art Nouveau atlas. It should reuse the same broad page frame, masthead, filter controls, and card cabinet styling as the homepage.

### Required changes

- Use `main.atlas`, not the narrow reading width.
- Add the full page frame and richer footer.
- Use the same atlas card design as the homepage.
- Add an archive title that is visually subordinate to the main masthead but still ornamental.
- Keep all 15 cards.
- Make the default sort/filter state identical to homepage.
- Ensure the open popup from any card is much wider and chart-friendly.

### Specific issue from screenshot

The open comparison popup appears cramped and visually disconnected from the selected mockup. It also creates a small dark browser/control-looking bar overlay in the screenshot. Whether that overlay is from the screenshot tool or app behavior, review popup behavior carefully. The final modal should not introduce any non-thematic floating dark UI elements.

---

## 5. Popup / modal second-pass requirements

Current popups are functional but too narrow, too text-first, and too plain.

### Required modal appearance

- Wider on desktop: `min(920px, calc(100vw - 48px))`.
- More like an opened atlas plate than a generic dialog.
- Decorative but unobtrusive side vines.
- Strong title area.
- Chart visible without excessive scrolling.
- Sources/methods as bottom ledger section.
- Close button styled as a small engraved circular control.

Suggested CSS:

```css
.ornate-popup-frame {
  width: min(920px, calc(100vw - 48px));
  max-height: min(86vh, 820px);
  border-radius: 18px;
  border: 1px solid rgba(112, 96, 62, 0.82);
  outline: 1px solid rgba(154, 137, 102, 0.35);
  outline-offset: -8px;
  background: linear-gradient(#f7efdf, #efe1c6);
}

.ornate-popup-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  padding: 2rem 2.5rem;
}

.popup-chart-area {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--hairline);
  background: rgba(255,255,255,0.18);
}

.popup-ledger {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--hairline);
  font-size: 0.9rem;
}
```

For mobile, allow the modal to be near full-screen but keep enough padding for readability.

---

## 6. `/methods` page second-pass requirements

The `/methods` page can remain long-form, but it currently looks like a plain article and therefore breaks the redesigned world.

### Required changes

- Use the same page frame and top nav/footer.
- Add a decorative title panel.
- Add a visible table of contents styled as an engraved ledger.
- Add section numbers in small cartouches.
- Use callout boxes for “Display figure,” “Assumptions,” “Uncertainty,” and “Sources.”
- Keep body text in a comfortable reading width inside the broader page frame.
- Add botanical side ornaments only at major transitions; do not clutter long text.

Recommended structure:

```text
[Page frame]
  [Masthead/top nav]
  [Methods title cartouche]
  [Ledger TOC panel]
  [Reading-width method sections]
  [Footer]
[/Page frame]
```

---

## 7. Chart styling second pass

Charts currently work, but they still look too modern/simple. They should look like printed engravings while remaining accurate.

### Required chart changes

- Thicker, warmer rust/teal bars.
- Thin ink outlines on bars.
- Subtle paper texture behind chart area.
- Small caps axis labels.
- Hairline gridlines, very low opacity.
- Range bars should use hatching or shaded capsules.
- Point values should use engraved ticks.
- Boundary braces on featured water chart should be more visible.

### Color assignments

Use consistent semantic colors:

```css
--paper: #f4ead6;
--paper-light: #fbf5e8;
--ink: #1f1a12;
--ink-soft: #4a4233;
--rule: rgba(111, 94, 62, 0.72);
--hairline: rgba(154, 137, 102, 0.45);
--rust: #a85636;
--rust-soft: #d28b6c;
--teal: #2f6f73;
--teal-soft: #8ab2af;
--sage: #7a8c61;
--wheat: #c7a76a;
```

Important: electricity is currently sage. In Mockup 1, teal is used prominently for AI/data centers and rust for comparison/reference bars. Consider assigning chart colors by rhetorical role rather than metric:

- AI/data centers: teal
- comparison category: rust or wheat
- secondary/uncertain/projection: sage/hatched

This will make the visual argument clearer.

---

## 8. Asset strategy for second pass

Cowork’s SVG-only pass is not enough for the selected visual target. Use generated PNG-32/RGBA assets for naturalistic botanical and medallion artwork.

### Rules for assets

- Use real alpha transparency for ornaments and spot illustrations.
- Do not include fake checkerboard backgrounds.
- Do not flatten text or data into images.
- Keep all text and charts as HTML/SVG/CSS.
- Use PNG/WebP for painterly assets, SVG only for simple icons/rules.
- Provide alt text only when the image conveys meaning; purely decorative ornaments should be `aria-hidden="true"`.

---

## 9. Image asset request list and prompts

The following are the image assets recommended for the second pass. These are written as prompts the project owner can paste back into ChatGPT image generation. Filenames are suggestions.

### 9.1 `asset_page_corner_flourishes.png`

**Purpose:** Four corner ornaments for the outer page frame. Can be generated as one sheet or four separate images.  
**Recommended size:** 1200 × 1200 px if one sheet; or 512 × 512 px each if separate.  
**Transparency:** PNG-32 / RGBA. Fully transparent background outside the ink-and-botanical ornament.

**Prompt:**

> Create a transparent PNG-32 RGBA image containing four separate Art Nouveau botanical corner flourishes for a website page frame. Style: late-19th-century scientific journal, Alphonse Mucha-inspired botanical engraving, hand-drawn ink and watercolor. Motifs: curling sage-green vines, small wheat sprigs, tiny seed pods, and subtle rust-orange poppy accents. Palette: warm dark ink #211d1b, sage green #7a8c6a, wheat #c7a76a, rust orange #a85636. Each corner should be ornate but thin and elegant, suitable for placement in the four corners of an ivory parchment webpage. No text. No background. The background must be fully transparent alpha = 0, not white. Do not include a checkerboard pattern.

---

### 9.2 `asset_masthead_poppies_left.png` and `asset_masthead_poppies_right.png`

**Purpose:** Large flanking botanical clusters beside the main title.  
**Recommended size:** 900 × 700 px each.  
**Transparency:** PNG-32 / RGBA. Fully transparent outside the botanical.

**Prompt:**

> Create a transparent PNG-32 RGBA Art Nouveau botanical illustration for the left side of a website masthead. It should show a large rust-orange poppy flower in bloom, one smaller poppy bud, sage-green acanthus-like leaves, thin curling vines, and small wheat details. Style: hand-drawn ink-and-watercolor, late-19th-century botanical plate, elegant Mucha-inspired linework, muted antique palette. The composition should curl inward toward the center of the masthead, with open negative space so it can sit beside a large title. No text. No frame. No background. Pixels outside the botanical must be fully transparent alpha = 0. Do not bake in a checkerboard.

For the right side, either mirror the left asset in CSS or use this prompt:

> Create a transparent PNG-32 RGBA Art Nouveau botanical illustration for the right side of a website masthead. It should show a large rust-orange poppy flower in bloom, one smaller poppy bud, sage-green acanthus-like leaves, thin curling vines, and small wheat details. Style: hand-drawn ink-and-watercolor, late-19th-century botanical plate, elegant Mucha-inspired linework, muted antique palette. The composition should curl inward toward the center of the masthead from the right side. No text. No frame. No background. Pixels outside the botanical must be fully transparent alpha = 0. Do not bake in a checkerboard.

---

### 9.3 `asset_botanical_frieze_wheat_poppies.png`

**Purpose:** Optional full-width frieze below masthead or between major sections.  
**Recommended size:** 3200 × 450 px.  
**Transparency:** PNG-32 / RGBA. Fully transparent outside the botanical.

**Prompt:**

> Create a wide horizontal Art Nouveau botanical frieze for a website header, exactly 3200 pixels wide by 450 pixels tall. The frieze should be symmetrical but hand-drawn rather than mechanically mirrored. At the center, include a fan of wheat stalks; extending left and right, include curling sage-green vines, acanthus-like leaves, poppy buds, seed pods, and rust-orange poppies near the outer ends. Style: late-19th-century scientific journal, Alphonse Mucha-inspired ink-and-watercolor, muted antique palette: rust orange #a85636, sage green #7a8c6a, wheat #c7a76a, warm dark ink #211d1b. No text. No rectangular border. Background must be fully transparent alpha = 0. Do not include white fill or a checkerboard.

---

### 9.4 `asset_featured_golf_water_panel.png`

**Purpose:** Large left illustration in the featured water comparison panel.  
**Recommended size:** 900 × 900 px.  
**Transparency:** Either transparent outside an oval/cartouche edge, or full rectangular parchment background depending on implementation. Best option: transparent outside the illustrated cartouche shape.

**Prompt:**

> Create a square Art Nouveau scientific-plate illustration for a website’s featured comparison panel. Scene: a quiet golf-course water landscape with a small putting green and flag in the middle distance, a pond in the foreground with reeds and lily pads, trees behind the green, and subtle rolling hills. Style: hand-drawn ink-and-watercolor, late-19th-century environmental journal, ornate but readable, muted antique palette: sage green, soft wheat, teal water, rust-orange floral accents, warm dark ink. Include a thin organic oval/rounded cartouche border made of curling vines and small leaves. No text. The area outside the cartouche border must be fully transparent alpha = 0. Do not include a white background or checkerboard. The interior may have a parchment-toned wash.

---

### 9.5 `asset_cartouche_stat_frame.png`

**Purpose:** Reusable frame around large numeric stat callouts, especially `500–700`.  
**Recommended size:** 900 × 700 px.  
**Transparency:** PNG-32 / RGBA. Transparent inside and outside frame if text will be HTML overlaid.

**Prompt:**

> Create a transparent PNG-32 RGBA ornamental Art Nouveau cartouche frame for a large statistic on a website. Shape: vertical rounded rectangle / shield-like frame with curling vine corners, small leaves, and a small water-drop ornament at the top. Style: thin engraved warm ink linework with sage-green botanical accents and subtle wheat-gold details. The center must be empty and transparent so HTML text can be placed over it. No numbers. No words. No background. All non-ornament pixels must be fully transparent alpha = 0.

---

### 9.6 `asset_featured_ribbon.png`

**Purpose:** “FEATURED” ribbon in top-left of featured panel.  
**Recommended size:** 900 × 300 px.  
**Transparency:** PNG-32 / RGBA, transparent outside ribbon.

**Prompt:**

> Create a transparent PNG-32 RGBA vintage Art Nouveau ribbon banner for a website label. The ribbon should be terracotta/rust orange with warm ink outlines, slight engraved shading, and curled ends, angled slightly upward from left to right. It should have no text; the center should be plain enough for HTML text to be overlaid. Style: late-19th-century print illustration, subtle watercolor texture. Transparent background outside the ribbon, alpha = 0. No checkerboard.

---

## Plate spot illustrations

Use these as small illustrated thumbnails inside comparison cards. Recommended size for each: **512 × 512 px**. Transparency: **PNG-32 / RGBA**, fully transparent outside the illustration or circular medallion. These should be visually consistent.

### 9.7 `spot_golf_course_water.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of a golf-course pond with a small flag on a green, reeds, lily pads, and trees. Style: late-19th-century scientific field guide, hand-drawn ink-and-watercolor, muted sage, teal water, wheat, and rust accents. Include a very thin circular botanical border. No text. Transparent outside the circular illustration.

### 9.8 `spot_residential_outdoor_water.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of residential outdoor water use: a garden hose, watering can, small lawn, and garden plants near a modest house. Style: antique environmental field guide, ink-and-watercolor, muted sage greens, teal water accents, warm parchment tones, thin botanical circular border. No text. Transparent outside the circular illustration.

### 9.9 `spot_vintage_car_emissions.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of an early 20th-century automobile on a road, with a small stylized exhaust cloud and distant trees. Style: antique scientific journal, ink-and-watercolor, muted rust, sage, wheat, and warm dark ink. Include a thin circular botanical border. No text. Transparent outside the circle.

### 9.10 `spot_house_electricity.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of a small house glowing with electric light, with a power line or utility pole nearby. Style: late-19th-century inspired environmental atlas, ink-and-watercolor, muted sage, wheat, teal shadow, warm ink. Thin circular botanical border. No text. Transparent outside the circle.

### 9.11 `spot_airplane_aviation.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of a vintage-inspired airplane in flight above soft clouds, with a subtle rust-toned emissions trail. Style: scientific field guide engraving with watercolor wash, muted antique palette. Thin circular botanical border. No text. Transparent outside the circle.

### 9.12 `spot_cement_steel_factory.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of an industrial cement and steel works: kiln, smokestack, steel beams, and factory silhouettes, rendered in elegant antique ink-and-watercolor rather than harsh modern style. Palette: rust, warm gray, sage, wheat, dark ink. Thin circular botanical border. No text. Transparent outside the circle.

### 9.13 `spot_bitcoin_mining.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration representing Bitcoin mining: an antique-styled coin with a Bitcoin symbol, surrounded by subtle server-rack geometry and lightning motifs, rendered like a vintage scientific plate. Palette: wheat gold, rust, teal shadows, warm ink. Thin circular botanical border. No text other than the Bitcoin symbol if needed. Transparent outside the circle.

### 9.14 `spot_ev_charging.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of an electric vehicle charging at a station, with a charging cable and small lightning motif. Style: antique botanical-scientific atlas, ink-and-watercolor, muted teal, sage, wheat, rust accents. Thin circular botanical border. No text. Transparent outside the circle.

### 9.15 `spot_video_streaming.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration representing video streaming: a vintage screen or circular play-button medallion with subtle signal waves and decorative vines. Style: late-19th-century print meets modern symbol, ink-and-watercolor, muted teal, rust, sage, parchment. Thin circular botanical border. No text. Transparent outside the circle.

### 9.16 `spot_video_gaming.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of a video game controller rendered as an antique scientific specimen, with small decorative wires/vines around it. Style: ink-and-watercolor, muted teal, sage, rust, wheat, warm dark ink. Thin circular botanical border. No text. Transparent outside the circle.

### 9.17 `spot_cattle_emissions.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of a cow in a pasture, with small grass and meadow plants, rendered as an antique agricultural field-guide plate. Palette: warm browns, sage green, wheat, rust accents, dark ink. Thin circular botanical border. No text. Transparent outside the circle.

### 9.18 `spot_home_air_conditioning.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of a window air-conditioning unit in a house window, with subtle cool air lines and a small electric motif. Style: vintage scientific journal, ink-and-watercolor, muted teal, sage, wheat, warm dark ink. Thin circular botanical border. No text. Transparent outside the circle.

### 9.19 `spot_lawn_equipment.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of a gas-powered lawn mower on grass with a small stylized exhaust puff, rendered as an antique environmental field-guide plate. Palette: sage, rust, wheat, warm dark ink. Thin circular botanical border. No text. Transparent outside the circle.

### 9.20 `spot_holiday_lighting.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration of a string of glowing holiday lights draped through curling vines, with warm bulbs and subtle ink outlines. Style: antique print / botanical ornament, muted gold, rust, sage, teal shadows, parchment warmth. Thin circular botanical border. No text. Transparent outside the circle.

### 9.21 `spot_ai_inference_training.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau spot illustration representing AI training versus inference: a stylized human brain or neural network drawn like a botanical specimen, with branching vine-like nodes and a subtle electric glow. Style: late-19th-century scientific journal, ink-and-watercolor, muted teal, sage, wheat, rust accents, warm dark ink. Thin circular botanical border. No text. Transparent outside the circle.

---

## Field Notes medallions

These can reuse some plate illustrations, but if generating separately, use a larger **768 × 768 px** medallion format.

### 9.22 `fieldnote_hour.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau medallion for “The Hour,” showing a vintage car, a clock face, and small CO₂-like cloud motifs without any text. Antique scientific journal style, ink-and-watercolor, muted rust, sage, teal, wheat, warm dark ink. Transparent outside the circle.

### 9.23 `fieldnote_year.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau medallion for “The Year,” showing electric transmission towers, a calendar-like sun arc, and small lightning motifs without text. Antique scientific journal style, muted teal, sage, wheat, rust, warm dark ink. Transparent outside the circle.

### 9.24 `fieldnote_water.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau medallion for “The Water,” showing a large water droplet above rippling water, reeds, and small leaves. Antique ink-and-watercolor style, teal water, sage leaves, wheat, warm dark ink. No text. Transparent outside the circle.

### 9.25 `fieldnote_trajectory.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau medallion for “The Trajectory,” showing a rising line chart drawn on parchment with a small horizon and botanical accents, no text or numbers. Antique scientific journal style, rust line, sage accents, warm ink. Transparent outside the circle.

### 9.26 `fieldnote_equivalents.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau medallion for “In Equivalents,” showing a small illuminated house, a scale, and electricity motifs, no text. Antique scientific journal style, muted wheat, sage, teal, rust, warm dark ink. Transparent outside the circle.

### 9.27 `fieldnote_training_inference.png`

> Create a transparent PNG-32 RGBA circular Art Nouveau medallion for “Training vs. Inference,” showing a stylized brain/neural network with branching nodes and a small energy meter motif, no text. Antique scientific journal style, muted teal, sage, wheat, rust accents. Transparent outside the circle.

---

## Footer assets

### 9.28 `footer_roundel_earth.png`

**Recommended size:** 900 × 900 px.  
**Transparency:** PNG-32 / RGBA, transparent outside circular roundel.

**Prompt:**

> Create a transparent PNG-32 RGBA circular Art Nouveau footer medallion showing the Earth as a vintage globe surrounded by sage-green leaves and small wheat ornaments. Style: late-19th-century scientific journal, hand-drawn ink-and-watercolor, muted teal oceans, sage land, wheat-gold, warm dark ink. Thin circular border. No text. Transparent outside the circular medallion.

### 9.29 `footer_roundel_sustainable_landscape.png`

**Recommended size:** 900 × 900 px.  
**Transparency:** PNG-32 / RGBA, transparent outside circular roundel.

**Prompt:**

> Create a transparent PNG-32 RGBA circular Art Nouveau footer medallion showing a sustainable landscape: rolling hills, a river, small wind turbines, and a warm sky, surrounded by botanical leaves and wheat ornaments. Style: late-19th-century environmental journal, hand-drawn ink-and-watercolor, muted sage, teal, wheat, rust accents, warm dark ink. Thin circular border. No text. Transparent outside the circular medallion.

---

## 10. Component-level implementation checklist

### Global / layout

- [ ] Add `PageFrame.astro` and wrap homepage, comparisons, methods, about.
- [ ] Change homepage and comparisons to `main.atlas` width.
- [ ] Preserve `/methods` readable text width inside the page frame.
- [ ] Add paper grain and subtle vignette.
- [ ] Add corner ornament image support.

### Masthead

- [ ] Replace SVG poppy clusters with generated PNG assets.
- [ ] Increase title size and presence.
- [ ] Add engraved nav rules and diamond bullets.
- [ ] Ensure `CO₂` uses real subscript.

### Featured panel

- [ ] Rebuild desktop layout as 3-column image/chart/stat composition.
- [ ] Add generated golf-water panel image.
- [ ] Add featured ribbon.
- [ ] Add stat cartouche frame image with HTML text overlaid.
- [ ] Strengthen chart styling and boundary braces.

### Atlas

- [ ] Widen grid.
- [ ] Increase number of columns on desktop.
- [ ] Add generated plate spot illustrations.
- [ ] Move plate number into circular medallion.
- [ ] Reduce prose density.
- [ ] Make mini charts more engraved and legible.

### Field Notes

- [ ] Build wide framed panel.
- [ ] Add six medallion images.
- [ ] Add right-side CTA.

### Footer

- [ ] Build rich footer band.
- [ ] Add generated earth and sustainable landscape roundels.
- [ ] Add icon nav row.
- [ ] Add last verified date.

### Popups

- [ ] Increase desktop width.
- [ ] Improve chart layout.
- [ ] Add ledger-style source/method area.
- [ ] Confirm no accidental dark overlay/control bar is part of the app.

### Methods page

- [ ] Add page frame.
- [ ] Add decorative title panel.
- [ ] Add table of contents.
- [ ] Style method subsections as ledger entries.

---

## 11. Acceptance criteria for second pass

The second pass is successful when:

1. A screenshot of the homepage at desktop width looks recognizably derived from Mockup 1 without needing explanation.
2. The homepage reads as a wide interactive atlas, not a narrow blog article.
3. The masthead is visually dominant and decorative.
4. The featured comparison panel has image-left, chart-center, stat-right composition.
5. The atlas grid is dense, illustrated, and ornamental.
6. Every card is still clickable and opens a useful detail view.
7. The `/comparisons` page feels like the full archive of the same atlas, not a separate plain page.
8. The `/methods` page feels like an engraved ledger, while remaining readable.
9. All original numbers, sources, confidence labels, and last-verified dates remain intact.
10. All generated images are decorative or illustrative only; no chart text or data is baked into images.
11. The site remains responsive and accessible.
12. Text contrast remains AA-compliant.
13. Decorative images are marked `aria-hidden` unless informative.
14. The final desktop homepage has a visual density close to the selected reference image: ornamental frame, large title, rich featured panel, atlas card cabinet, medallion Field Notes, and illustrated footer.

---

## 12. Critical instruction to Cowork

Do not interpret this as a request for a new content strategy. The content strategy is already correct. This is a **visual convergence pass** toward the selected Mockup 1 reference.

The strongest version of this site will combine:

- the current branch’s working data and interaction system,
- the selected mockup’s dense Art Nouveau illustrated atlas look,
- generated transparent PNG assets for organic illustration,
- and real HTML/SVG/CSS for all text, data, charts, sources, and interactions.

The final result should feel as if an illustrated 1890s environmental almanac has been rebuilt as a modern interactive data atlas.
