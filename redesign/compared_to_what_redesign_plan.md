# Revised Redesign Plan: “Compared to What? AI and Water, Electricity, & CO₂”

**Target site:** <https://ai-environmental-impact-comparisons.vercel.app/>  
**Primary redesign goal:** Turn the site into an **interactive Art Nouveau atlas of environmental comparisons**.  
**Reference look:** Selected Mockup 1: a dense, ornate Art Nouveau interactive data-atlas homepage with large masthead, featured comparison plate, comparison grid, field-note medallions, and rich footer.  
**Revision note:** This version incorporates useful implementation and design-system ideas from the alternate redesign plan and is now tuned specifically to the user’s selected preferred visual mockup: **Mockup 1**, the dense interactive-atlas design.

---

## 1. Core Goals

1. **Make the site resemble the reference image much more closely in look and feel.**  
   Use the reference’s ivory paper, engraved rules, botanical ornament, small caps, formal masthead, decorative cartouches, muted rust/sage/teal palette, and scientific-plate atmosphere.

2. **Preserve the site’s existing information, data, methodology, and source rigor.**  
   No comparison, methodology explanation, source trail, “last verified” date, or uncertainty logic should be lost. The visual redesign should make the material more compelling without making it less accountable.

3. **Surface the comparison cards from `/comparisons` prominently on the homepage.**  
   The current secondary comparisons page contains the main mission of the site. The homepage should lead with those comparisons, organized as an interactive atlas of “plates.”

4. **Retain the current six educational chapters as supporting material.**  
   The current homepage chapters are useful, but they should no longer dominate the first experience. Move them below the atlas under a “Field Notes on Scale” section or present them as expandable supporting modules.

---

## 2. Final Site Title

Use this title exactly:

```html
Compared to What?<br />
AI and Water, Electricity, &amp; CO<sub>2</sub>
```

Rendered visually as:

> **Compared to What?**  
> **AI and Water, Electricity, & CO₂**

### Title hierarchy

- First line: large expressive Art Nouveau / high-contrast serif display headline.
- Second line: smaller, formal, letter-spaced subtitle.
- The “₂” in CO₂ must be a true subscript, not plain text.

Suggested JSX:

```jsx
<>
  Compared to What?<br />
  AI and Water, Electricity, &amp; CO<sub>2</sub>
</>
```

Suggested CSS:

```css
.site-title-main {
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.9;
  letter-spacing: 0.03em;
}

.site-title-sub {
  font-size: clamp(1.1rem, 2.8vw, 2.3rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-title-sub sub {
  font-size: 0.6em;
  vertical-align: sub;
}
```

---

## 3. Desired Experience

The redesigned site should feel like:

> A cabinet of engraved environmental data plates: interactive, sourced, beautiful, and rigorous.

It should **not** become a single static infographic. The reference image should guide the aesthetic language, but the homepage should remain a browsable and interactive web experience.

The user should be able to:

- Land on the homepage and immediately understand the central question: **Compared to what?**
- Browse the main comparison plates without needing to visit a secondary page.
- Filter comparison plates by metric, scope, and uncertainty.
- Open a plate to see its chart, takeaway, boundary note, uncertainty, sources, and method.
- Continue to the supporting educational chapters for deeper context.
- Inspect the methodology and source trail at any point.

---


---

## 3A. Preferred Visual Mockup Direction: Use Mockup 1 as the Source of Truth

The selected mockup is the **first generated image**: the denser, dashboard-like **interactive atlas** version with a large “Compared to What?” masthead, prominent featured comparison panel, atlas grid, field-note icons, and fully developed footer. This selection should now govern the visual implementation more strongly than the original reference image or the second generated mockup.

### What this means

The implemented site should look like an **ornate interactive data atlas**, not a single illuminated manuscript page. It should preserve the first mockup’s balance of beauty, density, legibility, and functional web UI.

Prioritize these elements from Mockup 1:

- Large centered masthead reading **“Compared to What?”** with the subtitle directly underneath.
- Decorative botanical clusters flanking the title, especially rust-orange poppies and sage vines.
- A compact, horizontal “How to Read This Atlas” strip directly beneath the hero copy.
- A large **Featured Comparison** panel with:
  - a ribbon label,
  - an illustrative landscape vignette on the left,
  - a central chart,
  - a large ornamental stat cartouche on the right,
  - and a clear **Open Detail** call to action.
- A dense but readable **Atlas of Comparisons** section with filters and sorting controls.
- Comparison cards that include small illustrations/icons, plate numbers, mini charts, and chevron/detail affordances.
- A lower **Field Notes on Scale** row using circular medallion illustrations for the six educational chapters.
- A rich footer with medallion artwork, methods/sources/GitHub links, a last-verified line, and the maxim **“Sustainable futures require informed choices.”**

### What to avoid from Mockup 2

Do not make **“A New Kind of Footprint”** the dominant homepage title. That phrase may appear as a section heading or introductory phrase if desired, but it should not replace the selected masthead.

Do not use the more static, single-editorial-spread composition from Mockup 2 as the main layout. The second mockup is beautiful, but it deemphasizes the site’s chosen identity as an interactive comparison atlas.

Do not isolate the range key in a tall side panel. Use the first mockup’s more compact horizontal strip so the featured comparison and atlas appear sooner.

---

## 4. Current Site Audit

This audit should be used by the implementation team to ensure content is preserved.

### Existing homepage

The current homepage is a long vertical scroll built around six chapters. Each chapter has an eyebrow, serif title, introductory prose, a chart card, ornamental styling, source links, a “Last verified” date, and a methodology interaction. It also appears to include a right-rail progress indicator.

#### Chapter I — The Hour

Main subject: hour-by-hour CO₂ comparison.

Current values include:

| Activity | Value |
|---|---:|
| Gasoline driving | 14,000–18,000 g CO₂/hr |
| Heavy AI workflow | 100–500 g CO₂/hr |
| High-end PC gaming | 100–300 g CO₂/hr |
| Ordinary AI chat | 5–200 g CO₂/hr |
| HD video streaming | 36–56 g CO₂/hr |

Purpose: shows that gasoline driving is hundreds to thousands of times larger per hour than ordinary AI chat or streaming.

#### Chapter II — The Year

Main subject: annual electricity comparison.

Current values include:

| Category | Value |
|---|---:|
| U.S. residential electricity, 2024 | 1,550 TWh |
| Global data centers, 2024 | 460 TWh |
| Global video gaming | 75–285 TWh |
| Bitcoin mining, 2024 | 140–200 TWh |
| Global EV charging, 2024 | 180 TWh |
| AI workloads within data centers, 2024 | 30–80 TWh |

Purpose: shows AI workloads as still smaller than many familiar electricity categories, while also emphasizing growth.

#### Chapter III — The Water

Main subject: boundary-sensitive water comparisons.

Current values include:

| Category | Value |
|---|---:|
| Global golf courses | 800–1,500 billion gallons/year |
| U.S. golf courses, 2024 | 531 billion gallons/year |
| Global data centers, including power-generation water | 500–700 billion gallons/year |
| U.S. data centers, including power-generation water | 211 billion gallons/year |
| Global data centers, direct cooling only | 45–90 billion gallons/year |
| U.S. data centers, direct cooling only | 17 billion gallons/year |

Purpose: teaches that the answer depends strongly on whether only direct cooling water is counted or whether upstream power-generation water is included.

#### Chapter IV — The Trajectory

Main subject: data-center and AI electricity growth.

Current values include:

| Metric | Value |
|---|---:|
| Data centers, 2025 | 485 TWh |
| Data centers, 2030 IEA range | 830–1,350 TWh |
| AI workloads, 2024 estimate | 65 TWh central / 30–80 TWh range |
| AI workloads, 2030 IEA range | 200–400 TWh |
| AI central case by 2030 | 300 TWh |

Purpose: shows that the trajectory matters as much as the current footprint.

#### Chapter V — In Equivalents

Main subject: translating TWh into U.S. household-years.

Current values include:

| Metric | Value |
|---|---:|
| 1 TWh | about 85,000 U.S. homes for a year |
| AI workloads, 2024 | 2.5–6.7 million U.S. homes |
| Bitcoin mining, 2024 | 12–17 million U.S. homes |
| Global video gaming | 6.3–24 million U.S. homes |
| Global data centers, 2024 | 39 million U.S. homes |
| Global data centers, 2030 | 70–113 million U.S. homes |
| All U.S. households | 130 million |

Purpose: makes large electricity quantities intuitive.

#### Chapter VI — Training vs. Inference

Main subject: one-time training emissions vs. annual inference emissions.

Current values include:

| Item | Displayed role |
|---|---|
| BERT-base training | Training dot |
| BLOOM training | Training dot |
| Llama 2 training | Training dot |
| GPT-3 training | Training dot |
| Llama 3 training | Largest training dot |
| All AI inference, 2024 | 8.4–27.2 Mt CO₂ |

Purpose: shows that annual inference dwarfs individual model-training events.

### Existing `/comparisons` page

The current comparisons page contains 14 comparison plates. These should become the core homepage experience.

Current plates:

1. Water: AI data centers vs. U.S. golf courses
2. Electricity: Global video gaming vs. data centers
3. Electricity: Global video streaming vs. data centers
4. CO₂: U.S. driving vs. global data centers
5. Water: U.S. residential outdoor use vs. AI data centers
6. Electricity: U.S. residential vs. global data centers
7. CO₂: Global commercial aviation vs. data centers
8. CO₂: Global cement and steel vs. data centers
9. CO₂e: Global cattle vs. data centers
10. Electricity: U.S. residential air conditioning vs. global data centers
11. Electricity: Global EV charging vs. data centers
12. Electricity: Bitcoin mining vs. data centers
13. Emissions: U.S. gas-powered lawn equipment vs. data centers
14. Electricity: U.S. holiday lighting vs. global data centers

Each comparison should retain:

- Title
- Unit category
- Main values
- Chart
- Takeaway prose
- Sources
- Methodology link
- Last verified date
- Any current modal/detail behavior

### Existing `/methods` page

The methods page is the credibility spine of the site. It should be preserved and re-skinned, not reduced.

It should continue to include, for every figure:

- The displayed number or range
- What the figure shows
- How it was derived
- Assumptions
- Error-bar / uncertainty reasoning
- Source citations
- Boundary notes

### Existing modals and interactions

The implementation plan should reuse current modal/detail logic where possible:

- Per-chapter “How this was calculated” methodology modals
- Per-comparison detail modals
- Existing chart data structures
- Existing source links and verification dates

The redesign should primarily change **layout, information hierarchy, typography, color, chart styling, and component presentation**, not the underlying data logic.

---

## 5. Reference Image: Design Analysis

The attached reference image has a consistent visual grammar worth translating into web components.

### Page-level structure

- Formal masthead
- Flanking navigation
- Thin engraved horizontal rules
- Botanical corner ornaments
- Symmetrical botanical banner
- Chapter-like editorial opening
- Large ornamental display title
- Framed chart panels
- Small medallion statistics
- Section dividers
- Footer maxim

### Visual language

Use:

- Ivory paper background
- Fine black/brown engraved linework
- Muted rust-orange, sage-green, teal-blue, wheat-gold, and warm gray
- Botanical framing: poppies, wheat, curling vines, leaves, seed pods
- Rounded rectangular chart frames with vine-like corners
- Decorative cartouches for large numbers
- Charts that look printed or engraved rather than like default dashboards

### Typography

Use:

- High-contrast display serif for the title
- Small caps for nav, labels, metric categories, axis titles, and plate numbers
- Warm serif for body text
- Italics for short editorial deks and epigraphs
- Letter-spaced all-caps for ornamental headings

### Interaction principle

The reference is static, but the redesigned site should be an interactive translation of its design language.

Do not force the homepage to fit a single screen or single poster. Instead, preserve the feeling of a scientific atlas: a sequence of interactive plates.

---

## 6. Recommended Information Architecture

### Top navigation

Use:

- **About**
- **Comparisons**
- **Methods**
- **Sources**

Possible structure:

```text
ABOUT · COMPARISONS        COMPARED TO WHAT?        METHODS · SOURCES
```

Notes:

- `Comparisons` can jump to the homepage atlas section and/or link to `/comparisons`.
- `Methods` links to `/methods`.
- `Sources` links to `/methods#sources`, if a consolidated source list exists or is added.
- Add `/about` if it does not already exist.
- Avoid “Essays” unless actual essay content exists or is planned for the initial release.

### Recommended pages

| Page | Role |
|---|---|
| `/` | Main interactive atlas homepage |
| `/comparisons` | Full comparison archive/index, with filters and deep links |
| `/methods` | Full methodology and source ledger |
| `/about` | Mission statement, editorial standards, correction/contact info |
| `/methods#sources` | Consolidated source list or source index |

Optional future page:

| Page | Role |
|---|---|
| `/essays` | Long-form explanatory pieces, such as “Training vs. Inference,” only if the project wants an essay section |

---

## 7. New Homepage Structure

The homepage should follow the structure and visual density of **Mockup 1**, not the more static editorial-spread structure of Mockup 2.

Recommended order:

```text
Outer engraved page frame
Top navigation and GitHub icon
Large masthead: “Compared to What?”
Subtitle: “AI and Water, Electricity, & CO₂”
Short hero thesis
Compact horizontal “How to Read This Atlas” strip
Large featured comparison panel
Atlas of Comparisons heading
Filter and sort controls
Dense comparison-card grid
Large “View All Comparisons” CTA
Field Notes on Scale medallion row
Footer maxim, link row, medallion art, and last-verified line
```

This preserves the original reference image’s Art Nouveau grammar while implementing the selected mockup’s stronger interactive-atlas feel.

### First-screen hierarchy

The first screenful should make three things immediately clear:

1. The site is titled **Compared to What?**
2. The site is an **interactive atlas** of AI’s water, electricity, and CO₂ comparisons.
3. The featured water comparison demonstrates the core intellectual principle: boundaries change the answer.

The page may scroll, but it should feel intentionally composed from top to bottom, with each major band functioning like a section of an illustrated atlas page.

---

## 8. Homepage Redesign in Detail

## 8.1 Masthead

### Content

```html
<h1>
  Compared to What?<br />
  <span>AI and Water, Electricity, &amp; CO<sub>2</sub></span>
</h1>
```

Subtitle:

> An interactive atlas of AI’s environmental impact in scale, context, and comparison.

### Visual treatment

- Centered title
- Small caps nav on left and right
- Ivory paper background
- Thin engraved rules above and below
- Botanical corner ornaments and flanking poppy/vine clusters, as in Mockup 1
- Optional small GitHub icon at far right, visually integrated into the nav
- Non-sticky by default, unless the existing site strongly benefits from sticky navigation

---

## 8.2 Botanical Hero Frieze

Immediately beneath the masthead, use a horizontal botanical ornament:

- Wheat stalks at center
- Rust-orange poppies at left and right
- Sage-green leaves
- Thin curling vines
- Small seed pods
- Symmetrical or semi-symmetrical composition

Reuse current site artwork if suitable. If new artwork is needed, use SVG or transparent PNG/WebP.

Accessibility:

- Mark purely decorative ornaments as `aria-hidden="true"`.
- Do not place body text on top of the ornament.

---

## 8.3 Hero Thesis

Suggested copy:

> AI’s environmental footprint is real, growing, and often described without enough scale. This atlas compares AI and data centers with familiar systems: homes, roads, golf courses, cattle, aviation, Bitcoin, streaming, gaming, cement, steel, and the electric grid itself.  
>  
> The central question is not only “How large is AI’s footprint?” but **“Compared to what?”**

Design:

- Centered serif prose
- 2–3 short lines
- Ornamental divider beneath
- Keep this short so users reach the atlas quickly

---

## 8.4 “How to Read Ranges” Key

Because uncertainty and boundary choices are core to the site, include a compact visual key before the atlas.

Title:

> How to Read These Plates

Elements:

| Visual | Meaning |
|---|---|
| Solid bar | Point estimate |
| Capsule/range bar | Low–high estimate |
| Tick mark | Central estimate |
| Hatched fill | High uncertainty |
| Dashed outline | Projection |
| Boundary seal | Result depends strongly on accounting boundary |

Suggested copy:

> Most figures are ranges because sources differ and boundaries matter. A range is not a weakness in the data; it is often the honest shape of the answer.

---

## 8.5 Featured Comparison Panel

Use one large “hero plate” before the full atlas grid.

### Recommended featured panel

**Data centers vs. golf-course water**

Reason:

This is the best example of the site’s intellectual mission. It shows that the answer depends on the boundary: direct cooling alone looks small, while including power-generation water makes the comparison much closer.

### Featured chart values

| Category | Value |
|---|---:|
| Global golf courses | 800–1,500 Bgal/year |
| U.S. golf courses | 531 Bgal/year |
| Global data centers including power-generation water | 500–700 Bgal/year |
| U.S. data centers including power-generation water | 211 Bgal/year |
| Global data centers direct cooling only | 45–90 Bgal/year |
| U.S. data centers direct cooling only | 17 Bgal/year |

### Visual treatment

Implement this panel very close to Mockup 1:

- Full-width ornate framed panel.
- Small rust ribbon reading **Featured** or **Featured Comparison**.
- Left-side circular or rounded illustration vignette, ideally a golf-course/water landscape in muted ink-and-watercolor style.
- Center title: **Water: Data Centers vs. Golf Courses**.
- Italic short boundary note beneath the title.
- Central horizontal bar chart.
- Right-side ornamental stat cartouche with **500–700 billion gallons per year**.
- Dark teal **Open Detail →** button at lower right.
- Rust bars for golf.
- Teal or blue-green bars for data centers.
- Sage bracket annotations for “direct cooling only” vs. “including power generation”.

This featured panel is the visual anchor of the whole homepage. It should be more detailed and more ornamental than the smaller atlas cards.

---

## 8.6 Interactive Comparison Atlas

### Section title

> The Atlas of Comparisons

Subtitle:

> Open a plate to see the numbers, assumptions, boundaries, uncertainty, and sources behind each comparison.

### Card / plate behavior

Each comparison should appear as an ornamental plate card matching Mockup 1: cream paper fill, fine botanical border, small circular/illustrated icon, plate number medallion, title, metric label, mini engraved chart, and a small chevron or “open detail” affordance.

Each card should include:

- Plate number
- Metric type: Water / Electricity / CO₂ / CO₂e
- Scope: U.S. / Global
- Main title
- One-sentence takeaway
- Mini engraved chart
- Range or point-estimate visual
- Boundary note if applicable
- Confidence / uncertainty label
- Last verified date
- “Open plate” or “Open detail” interaction
- Link to methodology anchor

### Expanded plate content

When opened, each plate should show:

1. Core comparison
2. Full chart
3. What this means
4. Boundary note
5. Uncertainty
6. Sources
7. Methodology link

Existing modal behavior may be reused. If in-place expansion is easier or more elegant, that is also acceptable.

---

## 9. Recommended Homepage Atlas Ordering

Do not simply mirror the current `/comparisons` order. Lead with the strongest and most mission-defining comparisons.

### Featured first row

1. **Data centers vs. golf-course water**  
   Best “boundary matters” example.

2. **Data centers vs. U.S. residential outdoor water use**  
   Strong familiar-scale water comparison.

3. **U.S. driving vs. global data centers**  
   Strong CO₂ scale anchor.

### Second row

4. **U.S. residential electricity vs. global data centers**
5. **Aviation vs. global data centers**
6. **Cement and steel vs. data centers**

### Third row

7. **Bitcoin mining vs. data centers**
8. **EV charging vs. data centers**
9. **Video streaming vs. data centers**

### Fourth row

10. **Video gaming vs. data centers**
11. **Cattle vs. data centers**
12. **Residential air conditioning vs. data centers**

### Final row

13. **Gas-powered lawn equipment vs. data centers**
14. **Holiday lighting vs. data centers**

### Optional additional plate

Consider adding a 15th plate based on the current Chapter I hourly comparison:

15. **Hourly CO₂: driving vs. AI chat, gaming, and streaming**

This would preserve Chapter I’s strongest comparison inside the atlas itself.

---

## 10. Atlas Filters and Sorting

### Filters

Add engraved pill-style filters near the top of the atlas:

```text
ALL · WATER · ELECTRICITY · CO₂ / CO₂e · U.S. · GLOBAL · BOUNDARY-SENSITIVE · HIGH UNCERTAINTY
```

Useful filter dimensions:

- Metric: Water / Electricity / CO₂ / CO₂e
- Scope: U.S. / Global
- Data shape: Point estimate / Range / Projection
- Confidence: Higher confidence / Higher uncertainty
- Accounting: Boundary-sensitive

### Sorting

Optional but useful:

- Featured order
- Largest difference
- Most boundary-sensitive
- Highest uncertainty
- Alphabetical

Keep sort controls visually quiet. They should not make the site feel like a SaaS dashboard.

---

## 11. Field Notes on Scale

After the comparison atlas, preserve the existing six homepage chapters under a supporting section.

Section title:

> Field Notes on Scale

Subheading:

> Short lessons that explain how to read the comparisons.

Include condensed or expandable versions of:

1. The Hour
2. The Year
3. The Water
4. The Trajectory
5. In Equivalents
6. Training vs. Inference

Each field note should include:

- Short title
- 1–2 sentence summary
- Small chart or medallion stat
- Link to full methodology
- Expandable detail if needed

### Recommended treatment

Use accordions or compact plates rather than full chapter-length sections. The homepage should still feel atlas-first.

---

## 12. Methodology Integration

Every chart or plate should include a clear path to methods.

### On each plate

Include:

- “How this was calculated”
- “Sources”
- “Last verified”
- “Boundary note”
- “Uncertainty”

### On `/methods`

Preserve the full long-form document and improve navigability:

- Add a table of contents
- Add anchors for every figure and plate
- Add a consolidated `#sources` section
- Add “last verified” dates consistently
- Add “boundary choice” callouts
- Re-skin with the same typographic and ornamental system

---

## 13. Visual Design System

## 13.1 Overall Art Direction

Name the visual system internally:

> **Botanical Ledger**

or:

> **Ecological Engraving**

Target feel:

> Art Nouveau environmental field guide + interactive data atlas.

---

## 13.2 Design Tokens

Suggested tokens, suitable for Tailwind config or CSS variables:

```ts
colors: {
  parchment: '#F2E8D2',
  parchmentDeep: '#E9DDC2',
  paperLight: '#F7F0DE',
  ink: '#1F1A12',
  inkSoft: '#4A4233',
  terracotta: '#B85A3E',
  terracottaSoft: '#D4856A',
  sage: '#7D8C5F',
  teal: '#3A6F7E',
  wheat: '#C7A76A',
  hairline: 'rgba(154,137,102,0.45)'
},
fontFamily: {
  display: ['"Cormorant Garamond"', '"Playfair Display"', '"Bodoni Moda"', 'serif'],
  body: ['"EB Garamond"', 'Georgia', 'serif'],
  smallcaps: ['"Cormorant SC"', 'serif']
},
fontSize: {
  eyebrow: ['0.75rem', { letterSpacing: '0.22em' }],
  dek: ['1.125rem', { lineHeight: '1.55' }],
  display: ['3.25rem', { lineHeight: '1.05', letterSpacing: '0.12em' }],
  hero: ['4rem', { lineHeight: '1' }]
}
```

CSS variable version:

```css
:root {
  --paper: #F2E8D2;
  --paper-deep: #E9DDC2;
  --paper-light: #F7F0DE;
  --ink: #1F1A12;
  --ink-soft: #4A4233;
  --terracotta: #B85A3E;
  --terracotta-soft: #D4856A;
  --sage: #7D8C5F;
  --teal: #3A6F7E;
  --wheat: #C7A76A;
  --hairline: rgba(154, 137, 102, 0.45);
}
```

---

## 13.3 Background

Use layered paper texture:

```css
body {
  background:
    radial-gradient(circle at 50% 0%, rgba(255,255,255,.45), transparent 40%),
    linear-gradient(#F7F0DE, #F2E8D2);
  color: var(--ink);
}
```

Optional:

- Add very subtle SVG noise.
- Avoid heavy grunge.
- Avoid low-contrast text.

---

## 13.4 Borders and Frames

Use nested engraved borders:

```css
.plate {
  position: relative;
  border: 1px solid var(--hairline);
  outline: 1px solid rgba(31, 26, 18, 0.16);
  outline-offset: -8px;
  border-radius: 18px;
  background: rgba(247, 240, 222, 0.72);
}
```

Use SVG corner ornaments rather than text glyphs where possible.

---

## 13.5 Typography

### Display / headline

Suggested:

- Cormorant Garamond
- Playfair Display
- Bodoni Moda

### Body

Suggested:

- EB Garamond
- Georgia fallback

### Small caps

Suggested:

- Cormorant SC
- Or CSS `font-variant-caps: small-caps;`
- Use small caps for:
  - Nav
  - Eyebrows
  - Axis labels
  - Metric labels
  - Plate numbers
  - Footer ribbon

---

## 13.6 Chart Styling

Charts should feel printed, not like default web dashboards.

### Rules

- No bright modern palette
- No default chart-library colors
- Muted bars with engraved outlines
- Thin axis rules
- Small caps axis labels
- Hatching/stipple fills for ranges
- Dashed outlines for projections
- Clearly readable value labels

### Color logic

| Category | Color |
|---|---|
| AI / data centers | Teal |
| Fossil / transport / industrial | Terracotta |
| Water / landscape / outdoor use | Sage or teal |
| Reference categories | Wheat or muted gray |
| Projection | Dashed outline or shaded fan |
| Sustainable / lower-bound pathway | Sage |

### Range convention

| Data type | Visual treatment |
|---|---|
| Point estimate | Solid bar or dot |
| Range | Capsule bar or hatched span |
| Central estimate | Vertical tick |
| Projection | Dashed outline |
| High uncertainty | Wider, lighter, hatched band |

---

## 14. Layout Grid

Use a responsive grid inspired by the reference image but suitable for an interactive atlas.

### Desktop

```text
≥ 1024px: 12 columns, 24px gap, max-width 1080–1200px, centered
```

### Tablet

```text
≥ 640px: 8 columns, 20px gap
```

### Mobile

```text
< 640px: 1 column, stacked, generous side padding
```

### Recommended desktop placement

| Section | Columns |
|---|---|
| Masthead + nav | Full width |
| Botanical frieze | Full width |
| Hero thesis | Columns 3–10 |
| Range key | Columns 3–10 |
| Featured comparison | Columns 2–11 |
| Atlas filters | Columns 2–11 |
| Atlas grid | Columns 1–12 |
| Field notes | Columns 2–11 |
| Methodology CTA | Columns 3–10 |
| Footer epigraph / ribbon | Full width |

### Atlas grid

Follow Mockup 1’s denser atlas layout rather than a loose 3-card row by default.

Recommended desktop pattern:

- First 8 cards: 4-column grid, standard card size.
- Final 6 cards: 6-column compact grid, or continue the 4-column grid if implementation simplicity/readability wins.
- Cards should remain visually consistent even if the last row uses a compact size.

Responsive pattern:

- Desktop wide: 4 columns for standard cards; optional compact 6-card row for the final set.
- Desktop narrow / large tablet: 3 columns.
- Tablet: 2 columns.
- Mobile: 1 column.

The grid should feel dense and collectible, like a tray of engraved specimen plates, not like a sparse marketing-card layout.

---

## 15. Component Plan

## 15.1 New components

### `<Masthead />`

Purpose:

- Renders the site title, subtitle, nav, top/bottom engraved rules, and corner ornaments.

Props:

```ts
{
  titleMain: string;
  titleSub: ReactNode;
  subtitle?: string;
}
```

### `<TopNav />`

Purpose:

- Renders `ABOUT · COMPARISONS | METHODS · SOURCES`.

Notes:

- Small caps
- Diamond bullets
- Keyboard-accessible links

### `<BotanicalFrieze />`

Purpose:

- Renders the horizontal poppy/wheat/vine ornament.

Props:

```ts
{
  variant: "hero" | "small" | "footer";
  density?: "light" | "full";
}
```

### `<ChapterHeading />`

Purpose:

- Standard section heading with eyebrow, title, subtitle, and ornamental divider.

Props:

```ts
{
  eyebrow?: string;
  title: string;
  subtitle?: string;
}
```

### `<RangeKey />`

Purpose:

- Shows the visual grammar for point estimates, ranges, projections, and uncertainty.

### `<FeaturedComparisonPlate />`

Purpose:

- Large hero comparison panel, recommended for the water/golf boundary comparison.

### `<ComparisonPlate />`

Purpose:

- Reusable card for each atlas comparison.
- Should match Mockup 1: plate-number medallion, category icon, small illustration, mini chart, decorative border, and chevron/detail affordance.

Props:

```ts
{
  id: string;
  number: string;
  category: "Water" | "Electricity" | "CO2" | "CO2e";
  scope: "US" | "Global" | "Mixed";
  title: string;
  unit: string;
  takeaway: string;
  values: ComparisonValue[];
  lastVerified: string;
  confidence?: "Higher" | "Medium" | "Lower";
  boundarySensitive?: boolean;
  href?: string;
}
```

### `<PlateIllustration />`

Purpose:

- Renders the small watercolor/engraving-style vignette or icon used on each comparison card.

Recommended approach:

- Use a controlled set of hand-tuned SVGs or transparent PNG/WebP assets rather than relying on emoji.
- Keep illustrations muted and diagrammatic: golf pond, house, car, airplane, factory, Bitcoin coin, EV charger, play button, game controller, cow, AC unit, mower, holiday lights.
- Decorative illustrations should not replace text labels; they support quick scanning.

### `<EngravedBarChart />`

Purpose:

- Muted, printed-looking horizontal bar/range chart.

Props:

```ts
{
  unit: string;
  axisMax: number;
  values: {
    label: string;
    low?: number;
    high?: number;
    value?: number;
    group?: string;
    style?: "ai" | "reference" | "industrial" | "water" | "projection";
  }[];
}
```

### `<MedallionStat />`

Purpose:

- Decorative stat callout.

Example uses:

- `500–700 Bgal/yr`
- `30–80 TWh`
- `300 TWh`
- `39M homes`
- `8.4–27.2 Mt CO₂`

### `<FieldNote />`

Purpose:

- Compact supporting module for the former homepage chapters.

### `<MethodologyDetails />`

Purpose:

- Expandable summary or modal/drawer entry for methods.

### `<FooterAtlasFooter />` / `<FooterEpigraph />`

Purpose:

- Implements Mockup 1’s rich footer band: maxim, medallion art, link row, GitHub link, and last-verified line.
- The footer should feel like the lower margin of an illustrated map or scientific plate.

Suggested copy:

> Knowledge gives us power.  
> Wisdom gives us direction.  
> Let computation serve life.

### `<RibbonFooter />`

Purpose:

- Full-width footer maxim.

Text:

> SUSTAINABLE FUTURES REQUIRE INFORMED CHOICES

---

## 15.2 Components to keep and re-skin

Keep current behavior where possible:

- Existing chart data structures
- Existing bar charts
- Existing line charts
- Existing comparison detail modals
- Existing methodology modals
- Existing source-link logic
- Existing “Last verified” display logic
- Existing botanical artwork if it already matches the reference closely

Re-skin:

- Modals
- Comparison cards
- Chart frames
- Buttons
- Source panels
- Methodology pages

---

## 15.3 Components to retire or demote

Retire or remove:

- Right-rail chapter progress dots, unless the team keeps them only within the “Field Notes” section
- Full chapter-first homepage sequence
- Any overly modern card/button treatments that conflict with the Art Nouveau editorial plate feel

Demote:

- The current six homepage chapters into “Field Notes on Scale”
- Long explanatory prose below the atlas or into expandable panels

---

## 16. Page-by-Page Redesign

## 16.1 Homepage `/`

New role:

> Main interactive atlas.

Structure:

1. Masthead
2. Botanical frieze
3. Hero thesis
4. Range key
5. Featured comparison panel
6. Atlas filters
7. Interactive comparison grid
8. Field Notes on Scale
9. Methodology CTA
10. Footer epigraph and ribbon

A user landing on the homepage should see the comparison mission almost immediately.

---

## 16.2 Comparisons `/comparisons`

New role:

> Full comparison archive and deep-linkable index.

Changes:

- Re-skin to match the homepage.
- Keep all 14 existing comparison plates.
- Consider adding the 15th hourly CO₂ plate.
- Add filters and sorting if not already present.
- Add URL anchors or detail routes for each plate.
- Preserve modals or convert to detail drawers if more elegant.
- Add top nav and footer.

Potential URL patterns:

```text
/comparisons
/comparisons#water-golf
/comparisons#driving-data-centers
```

Optional route pattern:

```text
/comparisons/water-golf
/comparisons/driving-data-centers
```

---

## 16.3 Methods `/methods`

New role:

> Scientific ledger / back matter.

Changes:

- Preserve full content.
- Re-skin with the new typography and ornament.
- Add table of contents.
- Add `#sources`.
- Add anchors for every chart and plate.
- Add “boundary note” callout styling.
- Add “last verified” consistently.

The methodology page should feel like the back matter of a scientific atlas.

---

## 16.4 About `/about`

Add a short page if not already present.

Suggested content:

- Mission statement
- What the site compares
- Why ranges are used
- Editorial standard: every figure sourced, every boundary stated
- How to report corrections
- Link to GitHub/source repository if applicable

---

## 17. Content Preservation Map

### Move prominently to homepage

These should appear in the atlas above or near the top:

- Data centers vs. golf-course water
- Data centers vs. U.S. residential outdoor water use
- U.S. driving vs. global data centers
- U.S. residential electricity vs. global data centers
- Aviation vs. global data centers
- Cement and steel vs. data centers

### Preserve in the homepage atlas

All 14 comparison plates should appear on the homepage in the interactive atlas.

### Preserve as supporting educational modules

The current homepage chapters should appear lower as “Field Notes on Scale”:

- The Hour
- The Year
- The Water
- The Trajectory
- In Equivalents
- Training vs. Inference

### Preserve in methodology

All derivations, assumptions, source citations, and last-verified dates.

---

## 18. Suggested Copy Blocks

### Hero copy

> AI’s environmental footprint is real, growing, and often described without enough scale. This atlas compares AI and data centers with familiar systems: homes, roads, golf courses, cattle, aviation, Bitcoin, streaming, gaming, cement, steel, and the electric grid itself.  
>  
> The central question is not only “How large is AI’s footprint?” but **“Compared to what?”**

### Atlas intro

> Each plate places AI or data centers beside another environmental load. Some comparisons are clean. Some are boundary fights. All are ranges unless a primary source supports a single number.

### Range key copy

> Most figures are ranges because sources differ and boundaries matter. A range is not a weakness in the data; it is often the honest shape of the answer.

### Methodology CTA

> Read the ledger: every figure has a derivation, source trail, uncertainty note, and last-verified date.

### Footer epigraph

> Knowledge gives us power.  
> Wisdom gives us direction.  
> Let computation serve life.

### Footer ribbon

> SUSTAINABLE FUTURES REQUIRE INFORMED CHOICES

---

## 19. Accessibility and Usability Requirements

The design should be ornate, but it must remain readable.

Requirements:

- Maintain AA contrast for all text.
- Do not place body text on top of botanical ornament.
- Do not rely on color alone in charts.
- Use patterns, hatching, labels, or icons to distinguish categories.
- Mark decorative SVGs/images as `aria-hidden="true"`.
- Provide alt text or accessible table equivalents for informative charts.
- Keep small caps readable on mobile.
- Ensure filters, cards, modals, accordions, and drawers are keyboard-accessible.
- Provide focus states that match the visual system but remain obvious.
- Support reduced-motion preferences.
- Preserve source links and methodology links for screen readers.

---

## 20. Implementation Phases

### Phase 1 — Design tokens and shared frame

- Add palette and font tokens.
- Build or refactor:
  - `<Masthead />`
  - `<TopNav />`
  - `<BotanicalFrieze />`
  - `<RibbonFooter />`
- Apply shared frame to `/`, `/comparisons`, `/methods`, and `/about`.
- Add `/about` placeholder if needed.

### Phase 2 — Homepage restructure

- Replace the chapter-first homepage with atlas-first structure.
- Add hero thesis.
- Add range key.
- Add featured comparison panel.
- Move all 14 comparison plates onto the homepage atlas.
- Add filters.
- Preserve existing data and source logic.
- Remove or retire the right-rail chapter progress dots.

### Phase 3 — Atlas interaction and details

- Reuse existing comparison modal behavior or implement expandable plates/drawers.
- Ensure each homepage plate opens to chart, sources, uncertainty, and method.
- Add deep links to `/comparisons` anchors or detail pages.
- Add optional sorting.

### Phase 4 — Field Notes

- Convert the six current homepage chapters into compact supporting modules.
- Preserve their charts and methodology access.
- Add “Field Notes on Scale” below the atlas.

### Phase 5 — Comparisons and methods re-skin

- Re-skin `/comparisons` with the new plate design.
- Add filters/sorting to `/comparisons`.
- Re-skin `/methods`.
- Add table of contents and `#sources`.

### Phase 6 — Artwork polish

- Refine botanical banner.
- Add or improve corner ornaments.
- Add optional circular medallion illustrations for footer.
- Ensure all ornamental assets are optimized and accessible.

### Phase 7 — QA

- Mobile layout pass.
- Keyboard navigation pass.
- Screen reader pass.
- Contrast check.
- Chart readability check.
- Verify every source, last-verified date, and methodology link still appears.
- Confirm no number changed unintentionally.

---

## 20A. Visual QA Checklist Against Selected Mockup 1

Before implementation is considered complete, compare the homepage against Mockup 1 and verify the following:

- The masthead is the dominant visual element at the top, with **Compared to What?** large and expressive.
- The subtitle **AI and Water, Electricity, & CO₂** appears directly beneath the masthead with proper subscript.
- The nav is balanced left/right and includes About, Comparisons, Methods, Sources, and GitHub/source access.
- The opening hero copy is brief and does not push the featured comparison too far down.
- The range-reading key is a horizontal strip, not a tall side panel.
- The featured comparison panel has a left illustration, central chart, right stat cartouche, and clear Open Detail button.
- The atlas grid is dense, ornate, and scannable, with mini charts visible on cards.
- The comparison cards feel like collectible engraved plates, not generic cards.
- The Field Notes section uses circular medallion illustrations for the six former chapters.
- The footer includes the maxim, link row, medallion art, source/GitHub access, and last-verified line.
- The whole page uses ivory paper, terracotta, teal, sage, wheat, fine ink linework, and botanical ornament consistently.
- Nothing important becomes too tiny to read; if Mockup 1’s density conflicts with accessibility, preserve the design language while increasing spacing and text size.


## 21. Acceptance Criteria

The redesign is complete when:

1. The homepage title reads **“Compared to What? AI and Water, Electricity, & CO₂”** with CO₂ properly typeset.
2. The homepage clearly presents itself as an **interactive atlas** within the first screenful.
3. All 14 existing comparison plates are visible or reachable directly within the homepage atlas.
4. The comparison atlas appears before the former six chapter modules.
5. Every plate includes or links to:
   - Chart
   - Main takeaway
   - Boundary note where relevant
   - Uncertainty/confidence note
   - Sources
   - Last verified date
   - Methodology
6. The current six homepage chapters are preserved as supporting “Field Notes on Scale.”
7. `/comparisons` remains available as a full archive/index.
8. `/methods` remains available as the full source and derivation ledger.
9. The site uses the Art Nouveau botanical/engraved visual system consistently across pages.
10. The redesign remains responsive and readable on mobile.
11. All interactive elements are keyboard-accessible.
12. No data values, source citations, or methodology statements are removed unless the project intentionally updates them.
13. The site no longer feels like a modern dashboard; it feels like the selected Mockup 1: a dense, ornate, interactive ecological data atlas.
14. Lighthouse accessibility should be at least 95, or any lower score should have documented reasons and fixes planned.

---

## 22. Notes on Ideas Considered but Not Adopted

The alternate plan offered several useful implementation insights, including a detailed audit, concrete design tokens, a 12-column grid, reuse of existing modals, components to keep/re-skin/retire, and acceptance criteria. Those ideas are incorporated here.

However, this revised plan does **not** adopt the alternate plan’s strongest “single editorial spread” direction. The user selected **interactive atlas** as the desired model, and the site’s main mission is to make the full comparison set prominent on the homepage. Therefore:

- Do not reduce the homepage to only a few selected comparisons.
- Do not move most comparisons back to `/comparisons`.
- Do not optimize for fitting the whole homepage into a 1440 × 900 static spread.
- Do not make `/comparisons` the primary place where users encounter the comparison set.
- Do not use a masthead title other than **“Compared to What? AI and Water, Electricity, & CO₂.”**

The reference image should supply the aesthetic grammar, not the complete information architecture.
