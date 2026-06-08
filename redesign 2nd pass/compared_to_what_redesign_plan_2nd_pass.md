# Revised Second-Pass Redesign Implementation Plan for Claude Cowork

**Project:** Compared to What? AI and Water, Electricity, & CO₂  
**Target branch:** current second-pass redesign branch  
**Reference direction:** selected Mockup 1 / Art Nouveau interactive atlas  
**Status change:** The image-generation phase is complete. This plan replaces the previous asset-request section with implementation instructions that assume the finished image assets already exist locally.  
**Local asset folder:** `C:\Users\dmf23\Documents\Claude\Projects\AI Environmental Impact Comparisons\redesign 2nd pass\Assets for Redesign 2nd Pass`

---

## 0. Critical instruction to Claude Cowork

Do **not** treat this as a request to generate new image prompts or redesign the content strategy.

The visual assets have already been generated and are stored in the local folder above. Your job is to integrate those assets into the current working site and complete the visual convergence pass toward the selected Mockup 1 reference: a dense, illustrated, Art Nouveau environmental data atlas.

Preserve all existing data, sources, methods, confidence labels, last-verified dates, routes, and interactive detail behavior. The major work is layout, component structure, styling, responsive behavior, and image-asset integration.

The final site should feel like an illustrated 1890s environmental almanac rebuilt as a modern interactive data atlas: ornamental, wide, pictorial, and data-rich, but still accessible and accurate.

---

## 1. Asset handling and project integration

### 1.1 Source and destination

Use this local source folder as the canonical asset source:

```text
C:\Users\dmf23\Documents\Claude\Projects\AI Environmental Impact Comparisons\redesign 2nd pass\Assets for Redesign 2nd Pass
```

Copy the usable final image assets into the site repo, preferably under a dedicated static path such as:

```text
public/assets/redesign-2nd-pass/
```

Then reference them in code as:

```text
/assets/redesign-2nd-pass/<filename>
```

If the project already has a better static-asset convention, follow that convention, but keep all second-pass generated assets grouped in one clearly named subfolder.

### 1.2 Asset audit before coding

Before editing components, inspect the local asset folder and make a quick inventory:

- Confirm which files are final processed assets versus raw generations.
- Prefer processed PNG assets when both raw and processed versions exist.
- Prefer transparent PNG/RGBA files for ornaments, spot illustrations, medallions, ribbons, and cartouches.
- Do not use raw images that still have white backgrounds unless a processed transparent version is unavailable.
- Do not use images that contain a checkerboard pattern baked into the pixels.
- Do not use any image that includes text meant to be rendered as HTML.

If filenames differ from the names listed below, map the actual filenames to the intended roles and keep that mapping in a small comment or constant file for maintainability.

### 1.3 Suggested asset manifest

Create a central asset manifest so components do not hard-code long paths everywhere.

Suggested file:

```text
src/lib/redesignAssets.ts
```

Suggested shape:

```ts
export const redesignAssets = {
  frame: {
    corners: "/assets/redesign-2nd-pass/asset_page_corner_flourishes.png",
  },
  masthead: {
    poppiesLeft: "/assets/redesign-2nd-pass/asset_masthead_poppies_left.png",
    poppiesRight: "/assets/redesign-2nd-pass/asset_masthead_poppies_right.png",
    frieze: "/assets/redesign-2nd-pass/asset_botanical_frieze_wheat_poppies.png",
  },
  featured: {
    golfWaterPanel: "/assets/redesign-2nd-pass/asset_featured_golf_water_panel.png",
    statCartouche: "/assets/redesign-2nd-pass/asset_cartouche_stat_frame.png",
    ribbon: "/assets/redesign-2nd-pass/asset_featured_ribbon.png",
  },
  spots: {
    golfCourseWater: "/assets/redesign-2nd-pass/spot_golf_course_water.png",
    residentialOutdoorWater: "/assets/redesign-2nd-pass/spot_residential_outdoor_water.png",
    vintageCarEmissions: "/assets/redesign-2nd-pass/spot_vintage_car_emissions.png",
    houseElectricity: "/assets/redesign-2nd-pass/spot_house_electricity.png",
    airplaneAviation: "/assets/redesign-2nd-pass/spot_airplane_aviation.png",
    cementSteelFactory: "/assets/redesign-2nd-pass/spot_cement_steel_factory.png",
    bitcoinMining: "/assets/redesign-2nd-pass/spot_bitcoin_mining.png",
    evCharging: "/assets/redesign-2nd-pass/spot_ev_charging.png",
    videoStreaming: "/assets/redesign-2nd-pass/spot_video_streaming.png",
    videoGaming: "/assets/redesign-2nd-pass/spot_video_gaming.png",
    cattleEmissions: "/assets/redesign-2nd-pass/spot_cattle_emissions.png",
    homeAirConditioning: "/assets/redesign-2nd-pass/spot_home_air_conditioning.png",
    lawnEquipment: "/assets/redesign-2nd-pass/spot_lawn_equipment.png",
    holidayLighting: "/assets/redesign-2nd-pass/spot_holiday_lighting.png",
    aiInferenceTraining: "/assets/redesign-2nd-pass/spot_ai_inference_training.png",
  },
  fieldNotes: {
    hour: "/assets/redesign-2nd-pass/fieldnote_hour.png",
    year: "/assets/redesign-2nd-pass/fieldnote_year.png",
    water: "/assets/redesign-2nd-pass/fieldnote_water.png",
    trajectory: "/assets/redesign-2nd-pass/fieldnote_trajectory.png",
    equivalents: "/assets/redesign-2nd-pass/fieldnote_equivalents.png",
    trainingInference: "/assets/redesign-2nd-pass/fieldnote_training_inference.png",
  },
  footer: {
    earth: "/assets/redesign-2nd-pass/footer_roundel_earth.png",
    sustainableLandscape: "/assets/redesign-2nd-pass/footer_roundel_sustainable_landscape.png",
  },
} as const;
```

Adjust keys and filenames to match the actual project data model and actual asset filenames.

### 1.4 Accessibility rules for generated images

Use generated assets as decorative or illustrative support only.

- Pure page ornaments, vines, ribbons, decorative frames, and corner flourishes: `aria-hidden="true"`, empty `alt`, or CSS background images.
- Spot illustrations on comparison cards: short useful alt text if the image helps identify the topic; otherwise empty alt if the card text already names the topic.
- Footer roundels and Field Notes medallions: short alt text only if not redundant with nearby labels.
- Never bake important text, numbers, chart labels, source citations, or controls into images.
- All charts remain real HTML/SVG/CSS.

---

## 2. What must remain intact

Do not remove or rewrite these foundations:

- The title: **Compared to What? AI and Water, Electricity, & CO₂**.
- The comparison-first homepage.
- The featured comparison: **Water: Data Centers vs. Golf Courses**.
- The atlas cards, filters, and all comparison data.
- The Field Notes chapter/explainer content.
- The `/comparisons` page and all full comparison access.
- The `/methods` page and derivation ledger.
- The popup/detail system, though it needs major visual refinement.
- All existing numbers, source links, confidence language, and last-verified dates.

This is a visual and component-structure pass, not a data rewrite.

---

## 3. Global layout: make the site a wide atlas page

### 3.1 Replace narrow-page assumptions

The current implementation still appears to be governed by a narrow reading-column mentality. For the atlas sections, move to a desktop canvas near 1100–1280 px.

Introduce or update global width tokens:

```css
:root {
  --max-width-reading: 42rem;
  --max-width-wide: 64rem;
  --max-width-atlas: 76rem; /* about 1216px */
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

Apply atlas width to:

- homepage
- `/comparisons`
- any detail or popup view where charts need room

Keep `/methods` reading-width internally, but place that reading-width content inside the same broader page frame.

### 3.2 Add a reusable page frame

Create a reusable `PageFrame` component and wrap the homepage, `/comparisons`, `/methods`, and any about/source pages that are part of this mini-site.

Suggested component:

```astro
---
import { redesignAssets } from "../lib/redesignAssets";
---

<div class="page-frame">
  <img class="page-frame__corner page-frame__corner--tl" src={redesignAssets.frame.corners} alt="" aria-hidden="true" />
  <img class="page-frame__corner page-frame__corner--tr" src={redesignAssets.frame.corners} alt="" aria-hidden="true" />
  <img class="page-frame__corner page-frame__corner--br" src={redesignAssets.frame.corners} alt="" aria-hidden="true" />
  <img class="page-frame__corner page-frame__corner--bl" src={redesignAssets.frame.corners} alt="" aria-hidden="true" />
  <slot />
</div>
```

If the corner-flourish asset is a single sheet instead of four separate corner files, either use CSS `object-position`/masking or split it into four derived files during integration. If the asset was already processed into four files, use those directly.

Suggested CSS:

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

.page-frame__corner {
  position: absolute;
  width: clamp(76px, 10vw, 132px);
  height: auto;
  pointer-events: none;
  z-index: 1;
}

.page-frame__corner--tl { top: 0.35rem; left: 0.35rem; }
.page-frame__corner--tr { top: 0.35rem; right: 0.35rem; transform: scaleX(-1); }
.page-frame__corner--br { bottom: 0.35rem; right: 0.35rem; transform: scale(-1); }
.page-frame__corner--bl { bottom: 0.35rem; left: 0.35rem; transform: scaleY(-1); }
```

Tune positioning based on the actual transparent bounds of the generated corner asset.

---

## 4. Visual system

### 4.1 Color tokens

Use consistent semantic colors across charts, cards, buttons, borders, and ornaments:

```css
:root {
  --paper: #f4ead6;
  --paper-light: #fbf5e8;
  --ink: #1f1a12;
  --ink-soft: #4a4233;
  --rule: rgba(111, 94, 62, 0.72);
  --rule-strong: rgba(91, 74, 44, 0.86);
  --hairline: rgba(154, 137, 102, 0.45);
  --rust: #a85636;
  --rust-soft: #d28b6c;
  --teal: #2f6f73;
  --teal-soft: #8ab2af;
  --sage: #7a8c61;
  --wheat: #c7a76a;
}
```

For charts, strongly consider assigning colors by rhetorical role rather than metric:

- AI/data centers: teal
- comparison/reference category: rust or wheat
- secondary, uncertain, or projected values: sage/hatched

This will make the visual argument clearer than treating water/electricity/CO₂ as rigid color categories in every chart.

### 4.2 Typography

Keep the body elegant and readable, but make the masthead and major section titles much more theatrical.

Suggested stack:

```css
:root {
  --font-display: "Cormorant Garamond", "Bodoni Moda", "Playfair Display", "Cardo", Georgia, serif;
  --font-body: "EB Garamond", "Cardo", Georgia, serif;
  --font-ui: "Inter Variable", system-ui, sans-serif;
}
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

Use the dramatic display treatment only for the masthead and major ornamental headings. Do not make dense explanatory text harder to read.

---

## 5. Homepage implementation requirements

### 5.1 Top navigation

Update the top nav so it looks like an engraved rule system inside the page frame, not a small plain webpage nav.

Target structure:

```text
ABOUT · COMPARISONS             [small ornament/rule]             METHODS · SOURCES · GitHub icon
```

Requirements:

- Small caps.
- Terracotta diamond bullets.
- Thin horizontal rules extending toward the center.
- GitHub icon at far right.
- No sticky behavior.
- Nav sits inside the `PageFrame`.
- Hover/focus states must remain visible and accessible.

### 5.2 Masthead

Required composition:

1. Top nav.
2. Large title line: **Compared to What?**
3. Subtitle line: **AI and Water, Electricity, & CO₂**
4. Large left and right poppy clusters from the generated masthead assets.
5. Centered short dek.
6. Compact “How to read this atlas” strip below.

Use:

- `asset_masthead_poppies_left.png`
- `asset_masthead_poppies_right.png`
- optionally `asset_botanical_frieze_wheat_poppies.png`

If the frieze competes with the poppy clusters, omit it from the masthead and reserve it as a divider between major sections.

The title should be visually dominant. The current version is too restrained; make the masthead feel like the opening plate of a printed atlas.

### 5.3 “How to read this atlas” strip

Build this as a full-width horizontal legend panel.

Content:

```text
HOW TO READ THIS ATLAS | Most numbers are ranges, not single values | Boundary choices change the answer | Sources and methods are linked on every plate | Last verified [date]
```

Design requirements:

- Full-width rounded panel.
- Thin ornamental border.
- Four or five equal cells.
- Small icons: range bracket, boundary marker/leaves, open book, magnifying glass/date.
- Dotted vertical dividers.
- Desktop height around 70–90 px.
- Must read as a major atlas legend, not as a paragraph.

### 5.4 Featured comparison panel

This is the most important component to revise.

Required desktop layout:

```text
[1–3] left illustration      [4–9] chart and explanation       [10–12] stat cartouche + CTA
```

Use:

- `asset_featured_golf_water_panel.png`
- `asset_featured_ribbon.png`
- `asset_cartouche_stat_frame.png`

Required content and layout:

- Large “FEATURED” ribbon at top-left. Use the generated ribbon image as the visual layer and render the word `FEATURED` as HTML text over it.
- Left illustration: golf course, pond, reeds, lilies, and green, occupying the full left third.
- Center title: **Water: Data Centers vs. Golf Courses**.
- Center italic dek explaining the boundary issue.
- Center horizontal bar chart, with rust/orange comparison bars and teal data-center bars.
- Right cartouche: **500–700** as a large HTML numeral, **BILLION GALLONS PER YEAR**, and short caption.
- Teal `Open Detail →` button below the cartouche.
- Decorative corner vines and inner border.

Suggested CSS:

```css
.featured-panel {
  position: relative;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 240px;
  gap: 1.5rem;
  align-items: stretch;
  padding: 1.25rem 1.4rem;
  border: 1px solid var(--rule-strong);
  outline: 1px solid var(--hairline);
  outline-offset: -8px;
  border-radius: 18px;
  background:
    linear-gradient(rgba(251,245,232,0.82), rgba(244,234,214,0.92)),
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.36), transparent 38%);
}

.featured-illustration {
  min-height: 260px;
  border-radius: 16px;
  overflow: hidden;
  display: grid;
  place-items: center;
}

.featured-illustration img {
  width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.featured-chart {
  align-self: center;
  min-width: 0;
}

.featured-stat-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
```

Mobile order:

1. title/dek
2. illustration
3. chart
4. stat cartouche
5. CTA

Do not let the featured chart become illegible on mobile. Use a horizontal scroll area only if necessary, and only for the chart body.

### 5.5 Atlas section

The current atlas grid works functionally but needs to look like a dense cabinet of illustrated specimen plates.

Desktop layout:

- Target four cards per row at full desktop width.
- At very wide widths, a compact final row is acceptable if it improves balance.
- At tablet widths, use two cards per row.
- At mobile widths, use one card per row.

Suggested CSS:

```css
.atlas-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
}

@media (max-width: 900px) {
  .atlas-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 560px) {
  .atlas-grid { grid-template-columns: 1fr; }
}
```

Card requirements:

- More obvious decorative border, closer to Mockup 1.
- Larger spot illustration in lower-left or left side.
- Plate number in a circular medallion.
- Topic icon in a colored droplet/lightning/cloud seal.
- Mini chart with two or three clearly visible bars.
- `Open detail →` as a small link, not the dominant visual element.
- One short italic summary line maximum.
- Less prose; more illustration, chart, and ornament.

### 5.6 Comparison-card image mapping

Use the generated spot illustrations for the atlas cards. Map each comparison to the closest available spot asset. Use exact existing data IDs if they differ from these labels.

| Comparison topic | Preferred asset |
|---|---|
| Data centers vs. golf courses / water | `spot_golf_course_water.png` |
| Data centers vs. residential outdoor water | `spot_residential_outdoor_water.png` |
| AI / data centers vs. car emissions | `spot_vintage_car_emissions.png` |
| AI / data centers vs. household electricity | `spot_house_electricity.png` |
| AI / data centers vs. aviation | `spot_airplane_aviation.png` |
| AI / data centers vs. cement / steel / industrial emissions | `spot_cement_steel_factory.png` |
| Data centers vs. Bitcoin mining | `spot_bitcoin_mining.png` |
| Data centers vs. EV charging | `spot_ev_charging.png` |
| Data centers vs. video streaming | `spot_video_streaming.png` |
| Data centers vs. video gaming | `spot_video_gaming.png` |
| Data centers vs. cattle / food emissions | `spot_cattle_emissions.png` |
| Data centers vs. home air conditioning | `spot_home_air_conditioning.png` |
| Data centers vs. lawn equipment | `spot_lawn_equipment.png` |
| Data centers vs. holiday lighting | `spot_holiday_lighting.png` |
| AI training vs. inference | `spot_ai_inference_training.png` |

If the site has a comparison that does not cleanly match one of these, choose the closest rhetorical match and keep the data title clear.

### 5.7 Atlas filters

Make filters resemble engraved printed labels rather than modern SaaS pills.

Requirements:

- Single horizontal control bar under the atlas title.
- Active state: teal fill, ivory text.
- Inactive state: parchment fill, hairline border.
- Include `Featured Order` select on the right if the data model supports sorting.
- Avoid glossy or modern rounded styles.
- Keyboard focus state must remain obvious.

### 5.8 Field Notes section

Rebuild Field Notes as a wide framed panel with medallions and a right-side CTA.

Layout:

```text
FIELD NOTES ON SCALE
[medallion I] [medallion II] [medallion III] [medallion IV] [medallion V] [medallion VI] | right CTA block
```

Use:

- `fieldnote_hour.png`
- `fieldnote_year.png`
- `fieldnote_water.png`
- `fieldnote_trajectory.png`
- `fieldnote_equivalents.png`
- `fieldnote_training_inference.png`

Labels to keep:

- The Hour
- The Year
- The Water
- The Trajectory
- In Equivalents
- Training vs. Inference

Add right-side text:

```text
Deep dives into the big-picture chapters that explain the numbers behind the atlas.
```

Add teal CTA button:

```text
Explore Chapters →
```

### 5.9 Footer

Rebuild the footer as a rich bottom band that visually balances the masthead.

Use:

- `footer_roundel_earth.png`
- `footer_roundel_sustainable_landscape.png`

Required footer elements:

- Wide framed footer band.
- Left roundel: globe / Earth illustration.
- Right roundel: sustainable landscape with hills, river, and wind turbines.
- Center slogan: **Sustainable futures require informed choices.**
- Footer nav row with small icons: About this Project, Methods, Sources & Data, GitHub.
- Last verified date.
- Final tiny credit line.

---

## 6. `/comparisons` page requirements

The `/comparisons` page should feel like the complete archive of the same Art Nouveau atlas, not a plain archive page.

Required changes:

- Use `main.atlas`, not the narrow reading width.
- Wrap with `PageFrame`.
- Use the same top nav, atlas card style, filters, popup styling, and rich footer as the homepage.
- Add an archive title that is visually subordinate to the homepage masthead but still ornamental.
- Keep all comparison cards.
- Make the default sort/filter state consistent with the homepage.
- Ensure opening a detail popup from any card is wide and chart-friendly.

Specific caution from prior review: the comparison popup looked cramped and visually disconnected. It also showed a small dark browser/control-looking overlay in a screenshot. Review modal behavior carefully so no non-thematic floating dark UI element is introduced by the app itself.

---

## 7. Popup / modal requirements

Current popups are functional but too narrow, text-first, and plain. Restyle them as opened atlas plates.

Required appearance:

- Desktop width: `min(920px, calc(100vw - 48px))`.
- Maximum height: `min(86vh, 820px)`.
- Decorative but unobtrusive side vines or inner borders.
- Strong title area.
- Chart visible without excessive scrolling.
- Sources/methods as a bottom ledger section.
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

For mobile, let the modal become near full-screen while preserving readable padding and an easy close target.

---

## 8. `/methods` page requirements

The `/methods` page may remain long-form, but it should no longer feel like a plain article outside the redesigned world.

Required changes:

- Use the same `PageFrame`, top nav, and footer.
- Add a decorative title panel.
- Add a visible table of contents styled as an engraved ledger.
- Add section numbers in small cartouches.
- Use callout boxes for “Display figure,” “Assumptions,” “Uncertainty,” and “Sources.”
- Keep body text in a comfortable reading width inside the broader page frame.
- Add botanical side ornaments only at major transitions; avoid cluttering long text.

Recommended structure:

```text
[Page frame]
  [Top nav]
  [Methods title cartouche]
  [Ledger TOC panel]
  [Reading-width method sections]
  [Footer]
[/Page frame]
```

---

## 9. Chart styling requirements

Charts must remain accurate, accessible, and rendered as real HTML/SVG/CSS. Do not flatten charts into images.

Required chart changes:

- Thicker, warmer rust/teal bars.
- Thin ink outlines on bars.
- Subtle paper texture behind chart area.
- Small caps axis labels.
- Very subtle hairline gridlines.
- Range bars should use hatching or shaded capsules.
- Point values should use engraved ticks.
- Boundary braces on the featured water chart should be more visible.

Use generated images only around charts, never as chart data itself.

---

## 10. Component-level checklist

### Global / layout

- [ ] Audit generated asset folder and identify final processed files.
- [ ] Copy final assets into a grouped static site folder.
- [ ] Create a central asset manifest or mapping.
- [ ] Add `PageFrame` and wrap homepage, comparisons, methods, and related pages.
- [ ] Change homepage and comparisons to `main.atlas` width.
- [ ] Preserve `/methods` readable text width inside the page frame.
- [ ] Add paper grain and subtle vignette.
- [ ] Add corner ornament image support.

### Masthead

- [ ] Replace synthetic/simple SVG poppy clusters with generated PNG masthead assets.
- [ ] Increase title size and presence.
- [ ] Add engraved nav rules and diamond bullets.
- [ ] Ensure `CO₂` uses a real subscript.
- [ ] Use the botanical frieze only if it strengthens the composition.

### Featured panel

- [ ] Rebuild desktop layout as a 3-column image/chart/stat composition.
- [ ] Add generated golf-water panel image.
- [ ] Add generated featured ribbon with HTML `FEATURED` text overlaid.
- [ ] Add generated stat cartouche frame with HTML stat text overlaid.
- [ ] Strengthen chart styling and boundary braces.
- [ ] Verify mobile stacking order and chart legibility.

### Atlas

- [ ] Widen grid.
- [ ] Increase number of columns on desktop.
- [ ] Add generated plate spot illustrations.
- [ ] Move plate number into circular medallion.
- [ ] Reduce prose density.
- [ ] Make mini charts more engraved and legible.
- [ ] Keep every card clickable and keyboard accessible.

### Field Notes

- [ ] Build wide framed Field Notes panel.
- [ ] Add six generated medallion images.
- [ ] Add Roman numerals.
- [ ] Add right-side explanatory text and CTA.

### Footer

- [ ] Build rich footer band.
- [ ] Add generated Earth and sustainable landscape roundels.
- [ ] Add icon nav row.
- [ ] Add last verified date.

### Popups

- [ ] Increase desktop width.
- [ ] Improve chart layout.
- [ ] Add ledger-style source/method area.
- [ ] Style close button as an engraved circular control.
- [ ] Confirm no accidental dark overlay/control bar is part of the app.

### Methods page

- [ ] Add page frame.
- [ ] Add decorative title panel.
- [ ] Add ledger-style table of contents.
- [ ] Style method subsections as ledger entries.
- [ ] Keep the text readable and avoid ornament overload.

---

## 11. Implementation order

Use this order to avoid making the project visually inconsistent midway through the pass:

1. **Asset audit and copy**: identify final assets, copy them into the repo, and create a manifest.
2. **Global frame and tokens**: add width variables, page frame, paper background, color tokens, and typography tokens.
3. **Masthead and nav**: rebuild the top of the homepage first because it sets the visual language.
4. **Featured panel**: implement the image-left/chart-center/stat-right composition.
5. **Atlas cards and filters**: integrate spot illustrations and card cabinet styling.
6. **Popups**: restyle detail views so card interactions feel like part of the same system.
7. **Field Notes and footer**: add medallions and roundels to complete the page architecture.
8. **Secondary pages**: apply the same frame and visual system to `/comparisons` and `/methods`.
9. **Responsive and accessibility pass**: check desktop, tablet, mobile, keyboard navigation, reduced motion, contrast, image alt behavior, and modal focus handling.
10. **Visual comparison pass**: take a desktop screenshot and compare it against Mockup 1. Adjust density, width, and ornamentation until the relationship is obvious.

---

## 12. Acceptance criteria

The second pass is successful when:

1. A desktop homepage screenshot looks recognizably derived from Mockup 1 without needing explanation.
2. The homepage reads as a wide interactive atlas, not a narrow blog article.
3. The masthead is visually dominant and decorative.
4. The featured comparison panel has image-left, chart-center, stat-right composition.
5. The generated assets are visibly integrated: poppies, page corners, featured illustration, spot plates, medallions, and footer roundels.
6. The atlas grid is dense, illustrated, and ornamental.
7. Every card remains clickable and opens a useful detail view.
8. The `/comparisons` page feels like the full archive of the same atlas, not a separate plain page.
9. The `/methods` page feels like an engraved ledger while remaining readable.
10. All original numbers, sources, confidence labels, and last-verified dates remain intact.
11. No generated image contains essential chart data, chart labels, citations, or control text.
12. The site remains responsive and accessible.
13. Text contrast remains AA-compliant.
14. Decorative images are marked `aria-hidden` or given empty alt text unless informative.
15. The final desktop homepage has visual density close to the selected reference image: ornamental frame, large title, rich featured panel, atlas card cabinet, medallion Field Notes, and illustrated footer.

---

## 13. Fresh-chat / token-economy handoff check for Codex or Claude

This is a good moment to start a fresh implementation chat if the current coding conversation is already long or contains many false starts. The task has a clean boundary now: assets are complete, and the remaining work is integration and visual convergence.

### Old-chat handoff package prompt

```text
Please stop here and create a compact handoff summary for a fresh implementation chat. Include: current branch state, files changed so far, asset folder and copied asset destination, any actual asset filename differences from the manifest, remaining checklist items from the revised second-pass redesign plan, known blockers, commands used, and the most recent screenshot/visual QA observations.
```

### New-chat resume prompt

```text
We are continuing the Compared to What? second-pass redesign. The image assets have already been generated and are in:
C:\Users\dmf23\Documents\Claude\Projects\AI Environmental Impact Comparisons\redesign 2nd pass\Assets for Redesign 2nd Pass

Please follow the attached revised implementation plan. Integrate the existing assets into the site, preserve all data and interactions, and move the design toward the selected Mockup 1 Art Nouveau interactive atlas reference. Start by auditing the asset folder, copying final processed assets into the repo, creating an asset manifest, and then proceed through the implementation checklist without asking for further permission unless a destructive action is required.
```
