# Design references

This folder holds visual reference material for the Mucha's Notebook redesign. Files here are mood-board / direction references, not specs.

## mockup_art_nouveau_reference.png

The ChatGPT-generated mockup David picked as the design destination when choosing among three direction options earlier in the project. He chose Option 3 (Art Nouveau).

**What it shows** (from inspection — the mockup uses Latin lorem ipsum so the prose itself is not a reference, only the visual treatment):

- A masthead "THE ECOLOGIST" with a subtitle, framed by a small ornamental box at left and right edges and a horizontal botanical strip (wheat sheaves, poppies, leaves) running the full page width below it.
- A centered chapter opening: "CHAPTER I" as a small caps kicker, "A NEW KIND OF FOOTPRINT" as a large Cardo display title with a decorative dropcap on the first letter, an ornament rule beneath, then two short italic centered lines.
- The first infographic frame: a horizontal bar chart of electricity consumption (countries vs. AI projected), wrapped in a rounded-corner border with botanical motifs (wheat / leaves) climbing the LEFT side of the frame inside the border. A NumericCartouche ("55 TWh") sits in an ornate cartouche frame in the lower-left, outside the chart's plot area but inside the outer frame.
- A "De Hydro et Energia" mid-section with two cartouches flanking centered italic prose: "6.4B" (water droplet motif) on the left, "2.5×" (lightning motif) on the right, each in an ornate framed cartouche.
- A second infographic frame: a line chart ("A Trajectory Unwritten") with two trajectories and a shaded range, ornate frame, botanical motifs on the LEFT side, floral accent on the RIGHT side, NumericCartouche ("1.2 Gt") in the lower-left.
- A footer with three centered italic lines, an "EXPLORE THE DATA" CTA in small caps with a brief description, two small decorative roundels at the bottom corners (an earth globe at left, a landscape vignette at right), and a footer rule with a centered tagline "SUSTAINABLE FUTURES REQUIRE INFORMED CHOICES".

**Distance from current build:** The mockup is significantly more ornamented than the existing Phase 1–2 ornament library. Current components (OrganicFrame, SubjectMarker, SectionDivider, NumericCartouche) are restrained; the mockup pushes toward full-on Mucha. The data marks themselves remain clean — that's the Tufte side of the equation.

**Treat as direction, not literal spec.** The Latin lorem ipsum tells us nothing about real prose register; the figures shown are not real site figures; the layout is one chapter, not all six. But the ornamental vocabulary and density it implies are what David wants to see in the build.

## Runtime asset location

The six AI-generated PNG assets (masthead strip, frame side accents, footer roundels, ornate cartouche frame) live at `/public/ornaments/` so Astro serves them at `/ornaments/<name>.png` URLs. Future asset regenerations should be saved directly to `/public/ornaments/`, overwriting the existing file of the same name.

The previous `design/assets/` folder is no longer used. (The empty directory may persist on the local filesystem; safe to delete.)
