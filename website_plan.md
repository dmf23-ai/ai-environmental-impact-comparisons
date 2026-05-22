# AI Environmental Impact Comparisons — Website Plan

*Drafted May 1, 2026. This is a planning document, not a spec. It captures the editorial frame, the structure, the comparison set, the infographics, what keeps the figures defensible, the update mechanism, the tech stack, and a phased build.*

## 1. Editorial frame (the north star)

The site exists to give people a shared, verifiable footing for conversations about AI's environmental impact. It opens with — and quietly insists on — one organizing distinction: the *prompt-level* frame is the wrong scale, and the *infrastructure-level* frame is the right one. An hour of ordinary chat is small; a 100-acre data-center campus drawing a gigawatt off a regional grid is not. Most public arguments confuse the two and end up either dismissive ("it's just a search query") or apocalyptic ("each prompt boils a lake"). Both are wrong, and the data shows why.

Everything on the site flows from that frame: comparisons exist to set the scale of the thing. Each number is a range with the spread shown and the sources linked. The reader leaves with the ability to say "AI is roughly the size of X today, growing toward Y, and the things that matter most are Z," rather than with a single talking point.

## 2. Audience and voice

Primary reader: a curious, intelligent non-specialist who has heard the claims, doesn't trust any one source, and wants to think clearly without becoming an expert. Voice runs slightly more direct and concise than David's usual register but keeps the throughline: precise but alive, willing to make distinctions, dryly amused now and then, never chirpy or managerial. No exclamation points. No "in conclusion" wrap-ups. Numbers always paired with what they mean.

A reader should be able to skim the site in five minutes and walk away with the right shape of the picture, or spend an hour and get methodological transparency.

## 3. Site structure

A small, hub-shaped site rather than a single very long scroll. Six top-level destinations:

**Home / The shape of the picture.** A single page that works as a lean essay: opening frame, the headline numbers in three or four big infographics, and a short paragraph for each major comparison with a "see more" hand-off into the deeper page. Designed to be linkable directly into arguments.

**/comparisons.** The full comparison set as modular cards or sections. Each comparison has its own anchor and is linkable on its own (so someone can send `/comparisons#golf-courses`). Each card has the headline figure, a one-paragraph plain-language read, the range and confidence level, the sources with direct links, and a "last verified" stamp.

**/methods.** Every figure on the site has a section here, named for the display it explains: one section per comparison card on /comparisons, one per infographic on the home page, and one for the hourly hero. Each section walks through how the figure was derived, what assumptions were made, where the math came from, and where the uncertainty lives. Each display on the rest of the site carries a small "How this was calculated" link in its footer that anchor-jumps directly to its methodology section. The link pattern keeps the rest of the site readable; the methodology page is where readers go when the answer to "how do you know that?" matters more than the conclusion.

**/myths.** A short, surgical page addressing the most viral specific claims: the "500 ml per ChatGPT query" water figure (Ren et al. — the report ignores this and the site shouldn't), the "ten times more than a Google search" claim, the "boils a lake every prompt" framing, and the opposite-failure-mode claim that data centers "barely use anything compared to lawns." Each gets a short, neutral, sourced rebuttal.

**/places.** Where the buildout actually lands. Specific clusters and the local conversations around them: Loudoun County, VA (Data Center Alley); Memphis, TN (xAI Colossus and the methane-turbine controversy); Mesa/Phoenix, AZ; Dublin, Ireland (already 18%+ of national electricity); Santiago de Querétaro and Cerrillos in the Americas. This is where "infrastructure accountability" stops being abstract.

**/changelog.** A reverse-chronological list of when figures were verified, what changed, and why. Functions as the site's transparency log and incidentally is what makes the "last verified" stamps trustworthy.

A persistent footer carries the source roll-up, the GitHub repo link, and a one-sentence note on who runs this and why.

## 4. The comparison set

Kept from the PDF (David explicitly required these): **golf courses (water)**, **the global video-game ecosystem (electricity)**, **car driving (CO2 per hour)**.

Also kept from the PDF because they earn their place: **video streaming, Bitcoin mining, EV charging, U.S. household electricity, U.S. residential outdoor water, training-run emissions, data-center electricity vs. clean-energy buildout**.

Proposed additions, in rough order of how vivid and useful I think they are:

- **Commercial aviation.** One of the most legible comparisons in public discourse; reframes "AI is the new flying" claims with actual numbers. ICAO and IEA both publish.
- **Beef and dairy production.** Water and emissions; gives a non-digital benchmark with a familiar moral charge. UN FAO and USDA.
- **Cement and steel production.** The two largest industrial emitters; useful for showing what "really big" looks like. IEA tracks both.
- **Residential air conditioning (U.S. summer load).** Seasonal grid demand peaks dwarf data-center bases; IEA Future of Cooling and EIA RECS.
- **Lawn and garden equipment (gas mowers, blowers).** EPA estimates these emit a surprising share of small-engine air pollution; pairs naturally with the lawn-water angle.
- **U.S. holiday lighting (the "Christmas lights vs. countries" meme).** Used carefully, this is a fun way to show that aesthetic energy use can rival national grids; CSP-style estimates from DOE.
- **Web search (Google) per query.** The report flags this as a comparison "mainly to warn against false precision." The site should keep it on those terms — it's exactly the kind of apparently-clean comparison that misleads.

Possible additions if scope allows: **household appliances (clothes dryers, dishwashers)** for everyday-scale calibration; **the U.S. military's energy footprint** for institutional-scale calibration; **passenger rail vs. driving** for displaced-emissions comparison.

What the site does *not* try to be: a comprehensive AI policy tracker, a corporate accountability scorecard, a real-time data-center monitor, or a how-to-prompt-greener guide. Each of those is a different project; staying narrow is what makes this one credible.

## 5. Infographics

Eight to ten core visuals, each designed to be standalone-shareable (right-click-save will produce something useful with the source line baked in).

1. **"One hour of ___" panel.** Five horizontal bars: gasoline driving, high-end PC gaming, video streaming, ordinary LLM chat, heavy LLM workflow. CO2-per-hour, with range whiskers. The single most quoted-from-the-site visual.
2. **"How big is AI, really?" annual bar chart.** Global data-center electricity, AI-specific share, video games, Bitcoin, EV charging, plus a reference line for U.S. household total. TWh on the x-axis, sources on hover.
3. **The water bracket.** Two stacked bars side by side: "U.S. golf courses, one year" vs. "Global data centers, one year — direct only" vs. "Global data centers, one year — including indirect electricity water." The second comparison flips the answer; the visual makes that visible.
4. **The trajectory.** IEA's projection of data-center electricity from 2024 to 2030, with a shaded uncertainty band. Sister chart: AI-specific share within that.
5. **Where it lands.** A small map with a half-dozen pinned data-center clusters, each linked to a /places entry. Not a heat map of every facility — a curated set of the contested ones.
6. **Household equivalents bar.** "Global data centers in 2025 = the annual electricity of about 46 million U.S. households." Staircase of equivalences for the major figures, with a footnote about why this analogy is useful and where it misleads.
7. **Range vs. point estimate primer.** A small didactic graphic showing why each figure on the site has a range — a single dot vs. a confidence band — with a one-line caption.
8. **Training vs. inference over time.** A two-panel chart: GPT-3-era training was a vivid one-shot emission; modern systems' lifetime emissions are dominated by inference once they're widely used. Frames the "but training is huge" conversation correctly.
9. **What a watt actually is, briefly.** A small scale primer for readers who don't know whether 486 TWh is a lot. Reference points: a microwave, a house, a town, a country.
10. **Optional: a "myths" visual.** The 500 ml claim drawn at scale next to the actual defensible range, with a short caption.

Style: clean, restrained, blue-and-warm-accent palette, generous whitespace, type-driven rather than chart-junk-driven. Closer to *Our World in Data* or the *FT* graphics desk than to corporate dashboards. Every chart has a source line and a "last verified" date.

## 6. How the figures stay defensible

Three mechanisms hold the figures up.

**Ranges, not points.** Every headline number is a range with a stated confidence level (medium-high, medium-low, etc.), as the PDF already does. Single numbers appear only where the underlying source publishes one (EPA's 400 g CO2/mile is a single figure; Epoch's 0.3 Wh/query is presented with caveats).

**A specific viral-claims page.** /myths exists so the site doesn't have to either ignore those claims or absorb them into the main flow. They get addressed directly, with the same source-link pattern as everything else.

**A visible changelog.** Every change to a figure is logged with the date, the old value, the new value, and the source. Nothing changes silently.

The site also says, plainly, what it is *not* sure about. AI-specific electricity is the weakest figure on the page; gaming is the second weakest. Both get explicit notes, not euphemisms.

## 7. Update mechanism

A weekly GitHub Action runs a verifier script. For each tracked source URL:

1. Fetch the page (or PDF) and compute a content hash.
2. Where the relevant number sits in a structured location (e.g., a press-release headline, a known cell in an HTML table), parse and compare to the stored value.
3. If the hash and the parsed value are unchanged: bump `last_verified` to today's date in `data/figures.json` and commit.
4. If the hash *or* the parsed value has changed: do *not* auto-update the displayed figure. Instead, open a pull request flagged "Source change detected: [source name]" with a diff and a short note. A human (you, or me when you ask) reviews and merges.

This means the site stays honest in two directions: figures aren't stale (the verified date is fresh), but they also don't silently mutate when a source page reformats its HTML. The /changelog reflects only real changes.

Most weeks, the action will be a no-op except for date bumps. When IEA's spring or fall reports drop, when LBNL releases a new data-center energy report, or when GCSAA updates the golf survey, the action surfaces it and we update.

A small additional touch: each figure caches the source page snapshot at the moment of verification. If a source page later disappears or changes its URL, the snapshot remains as evidence.

## 8. Tech stack and hosting

**Framework: Astro.** A static-site generator that's beginner-friendly, produces fast pages with almost no client-side JavaScript by default, and lets us write content in Markdown. Better than vanilla HTML because content updates from the data file regenerate the site automatically; better than Next.js because there's less to maintain and no server.

**Styling: Tailwind CSS, kept minimal.** Picked because it makes the visual choices reviewable in one place and because most beginner tutorials use it. We won't lean on heavy component libraries.

**Charts: a mix.** Static SVG (hand-built or generated once in D3 and exported) for the durable headline visuals; lightweight Observable Plot or Chart.js *only* where genuine interactivity helps. For a beginner-friendly maintenance story, "static SVG with a clean source-of-truth data file" beats "live D3 every load."

**Hosting: Netlify.** Free tier, automatic builds from GitHub, easy custom domain when you want one. GitHub Pages would also work; Netlify wins on deploy previews and form-handling if we ever want a feedback channel.

**Verifier: Node script.** Lives in `/scripts/verify-sources.mjs`, run by GitHub Actions on a weekly cron. Uses fetch + a small HTML parser (cheerio) for HTML sources and pdf-parse for PDFs. Writes to `data/figures.json` and `data/changelog.json`.

**Repo layout (sketch):**
```
src/
  pages/        Astro pages (index, comparisons, methods, myths, places, changelog)
  components/   Card, Figure, RangeBar, SourceLine
  content/      Markdown for each comparison
  data/         figures.json, changelog.json, sources.json
  styles/       global.css, tailwind config
scripts/
  verify-sources.mjs
.github/
  workflows/    weekly-verify.yml, deploy.yml
```

This stack is durable, free, and as beginner-friendly as anything that does what we want. If you'd rather skip Tailwind and use plain CSS, we can — it's a 30-minute swap.

## 9. Build phases (small, verifiable milestones)

Sized for someone who wants step-by-step terminal/file/deploy instructions and dislikes juggling many files at once.

**Phase 1 — Skeleton (one session).** Initialize the Astro project, set up the repo on GitHub, deploy a placeholder home page to Netlify. Verify: site is live at a Netlify URL.

**Phase 2 — One real comparison, end to end (one session).** Implement the golf-course comparison fully: data file entry, comparison card component, source line, last-verified stamp. Verify: card renders correctly with real data.

**Phase 3 — Visual identity (one session).** Lock the type, color palette, spacing scale, and the look of a comparison card. Build the home page hero with one headline infographic ("One hour of ___"). Verify: home page reads well on phone and desktop.

**Phase 4 — Comparison cards complete (one or two sessions).** Build out the rest of /comparisons. Mostly content work, very little new code.

**Phase 5 — Infographics (two or three sessions, paced).** One or two visuals per session. Static SVG approach. Verify each one reads correctly without needing the surrounding text.

**Phase 6 — /methods, /myths, /places, /changelog (one or two sessions).** The deeper pages. Heavy on content, light on new components.

**Phase 7 — Verifier script and GitHub Action (one session).** Build the source-checking script, point it at the data file, set up the weekly cron. Verify: a manual run of the action either bumps dates or opens a PR.

**Phase 8 — Polish and launch (one session).** Custom domain, accessibility pass, Open Graph cards, a small "About" footer. Verify: a stranger can land on the site, get the picture in 90 seconds, and find a source for any claim.

Each phase ends in a working, deployed state. No phase requires editing more than a handful of files at once.

## 10. Things I'm watching and decisions still to make

**Wireframes and infographic mocks.** As you noted, premature for now. When we get there, I'll propose two or three home-page layouts and two or three styles for the headline "one hour of ___" chart, and we'll narrow.

**The 500 ml claim.** I think the /myths page should engage it directly using Ren et al.'s actual paper rather than the press distortion of it. That's a small editorial decision worth flagging.

**Geographic scope.** The PDF (and most public data) is U.S.-heavy on water and global on electricity. The site will inherit that imbalance honestly rather than pretend to global parity it can't source. A short "Why the U.S. shows up so much" note on /methods will handle this.

**Whether to add a small calculator.** A "what's an hour of *your* AI use?" interactive widget is appealing but slightly cuts against the thesis (the thesis says individual use isn't where the action is). I'd lean toward *not* including one in v1; if we later add one, it should be framed explicitly as "this is the small-scale picture; the big picture is over here."

**Comments / feedback.** Probably none in v1. A `mailto:` link or a simple Netlify form is enough.

**Domain name.** Worth picking before launch. Some directions to consider: `aiimpact.observed`, `byhour.org`, `whatpowersai.com`, or something less branded like `ai-environmental-comparisons.org`. I'm happy to brainstorm when we're closer.

**Funding / hosting permanence.** Vercel free tier is fine indefinitely for a site of this scale. (Switched from Netlify in the original plan since David already has the Vercel + Cloudflare DNS workflow from prior projects.) No urgency.

## 11. Queued fixes and design notes

**Restore Unicode in figures.json.** During Phase 3 the Write tool kept truncating the data file at a hard byte cap when overwriting it, so I fell back to ASCII for em-dashes (`--`), the CO₂ subscript (`CO2`), and the en-dash range separators (`-` instead of `–`). The site reads cleanly with the fallbacks, but the typographic intent was Unicode. To fix once the tool quirk is sorted: hand-edit figures.json to restore `—`, `–`, and `₂` in the strings David has seen — primarily the hourly summary, the comparison summary, and the source names. Low priority. Fix before launch.

**Design direction: more editorial, less bare.** David flagged after Phase 3 that the look skewed too plain. The Phase 3.5 pass added Inter + Source Serif 4 web fonts, a slim site masthead, and subtle box-shadows on the cards. Future phases should keep pushing in that direction: small ornaments, considered typographic hierarchy, a touch of color where it earns its place. The failure mode to fear is busy and decorative; bare is the safer side to drift toward.

**Prose patterns to avoid.** A full anti-AI-speak rubric lives in Claude's persistent memory; consult it before producing any site copy. The two patterns David has personally flagged sit at the top: the "X isn't A, it's B" negation-then-correction, and the "the [X] worth [verb-ing]" formula ("the conversations worth having," "the questions worth asking"). The rubric overrides authorial_voice.md when they conflict — voice is the destination, the rubric prevents arriving via the AI airport.

**Methodology page and per-display links.** The /methods page is structured per-display: one section per comparison card, one per home-page infographic, one for the hourly hero. Each section walks through figure derivation, assumptions, sources, and remaining uncertainty. Implementation: ComparisonCard.astro and HourlyImpactHero.astro each gain a small "How this was calculated" link in the card/figure footer that anchor-jumps to the matching section on /methods. Schema implication: each card's existing `anchor` field can double as its methodology anchor on /methods (e.g. `/methods#water-vs-golf`); no new figures.json field needed unless an /methods anchor needs to differ from the /comparisons anchor. Build order when this gets implemented: write the per-display methodology sections first (so the anchors exist), add the link UI to ComparisonCard and HourlyImpactHero, then ship. This work belongs in Phase 6 alongside /myths, /places, and /changelog.

**figures.json byte-cap quirk, reconfirmed.** Hit again during Phase 4 when adding ten cards in one Edit: the file got truncated at exactly 4,000 bytes on the bash sandbox mount even though the Read tool saw the full content. The handoff's heredoc workaround (rewrite the file via a Python heredoc through bash) restored it cleanly. Lesson: small surgical Edits to figures.json are fine; large multi-card additions should go through the bash heredoc path. Worth investigating whether this is a quota on the agent's Edit tool, a sandbox sync limit, or something else — but for now the workaround is reliable.

**Mucha-density ornament direction (Phase 2e onward).** The redesign's original "restrained Mucha" framing has been superseded by a fuller Mucha density per David's reference mockup at `design/mockup_art_nouveau_reference.png` (ChatGPT-generated; lorem ipsum prose, used for visual direction only). Phase 2e adds ornate variants of OrganicFrame and NumericCartouche, a ChapterTitle component (kicker + dropcap + ornament rule), a masthead botanical strip, and a real footer composition with decorative roundels. Phases 3–6 inherit the higher density. Home is the showcase; /comparisons and /methods sit slightly below but are still highly styled. Data marks inside charts stay clean — that's the Tufte side.

**Asset pipeline: hybrid (Phase 2e onward).** Complex botanicals (masthead strip, frame side accents, footer roundels) live as imported SVG assets in `design/assets/`. Generated via the same image-gen tool that produced the mockup, or sourced from public-domain Mucha libraries (Wikimedia Commons). Simple ornaments (subject markers, rail dots, divider motifs, cartouche flourishes) stay hand-coded. Decision: code-only would produce simpler-than-mockup results; pure-assets gives up version control on simple ornaments that benefit from it.

**Prose discipline (Phase 3 onward).** Three feedback memories now govern site prose: the anti-AI-speak rubric (voice), prose-defers-to-infographics (amount — short sentences, minimal preamble), and prose-refers-directly-to-the-infographic (reference target — point at the chart's specific figures and comparison, not at general framings about the topic). Apply all three before publishing any site copy.
