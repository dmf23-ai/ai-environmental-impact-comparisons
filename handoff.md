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

## Where we are

Completed:

- **Phase 1.** Astro scaffold, GitHub repo, Vercel deploy, edit→commit→push→redeploy loop confirmed.
- **Phase 2.** First comparison card (water: AI data centers vs. U.S. golf courses). Built `figures.json`, `RangeBar`, `ComparisonCard`, `SourceLine` components, and the `/comparisons` page.
- **Phase 3.** `Layout.astro` and `global.css` with locked design tokens. Hourly impact hero on the home page using two stacked range-bar charts (full scale + zoomed). Comma-formatted bar values.
- **Phase 3.5.** Web fonts (Inter + Source Serif 4 via Fontsource), slim site masthead with wordmark, subtle box-shadow on cards, alignment fix for the lede width, scrollbar-gutter for stable page centering, prose rewrites to remove AI tells.
- **Phase 4.** All 14 comparison cards in `figures.json`, in this order: golf, video gaming, video streaming, driving, residential lawn water, U.S. household electricity, aviation, cement+steel, cattle, residential AC, EV charging, Bitcoin, lawn equipment, holiday lighting. Each card has a vetted figure with a real-source URL, a confidence level, and a unit caption. Unicode (em-dashes, en-dashes, ₂ subscripts) preserved throughout the new entries. Cards rendering correctly on Vercel.
- **Plan update during Phase 4.** Section 3 `/methods` entry now specifies per-display structure (one section per card and per home-page infographic). Section 11 carries the spec for the small "How this was calculated" link UI on each ComparisonCard / HourlyImpactHero — deferred to Phase 6. Schema note: each card's existing `anchor` field can double as its `/methods` anchor; no new field needed.

Next: **Phase 5 — infographics.** Per the plan (Section 5), eight to ten core static-SVG visuals, each standalone-shareable, each with a baked-in source line. Pace: one or two per session. Suggested starting visuals: "How big is AI, really?" annual TWh bar, the water bracket, and the household-equivalents staircase. The hourly hero on the home page is already a working prototype of the visual style; the rest should match its restraint.

## Read these in order

1. `website_plan.md` — the full project plan: editorial frame, audience, structure, comparison set, infographics, honesty layer, update mechanism, tech stack rationale, phased build, and a "Queued fixes and design notes" section at the bottom (Section 11) with current open issues.
2. `authorial_voice.md` — David's voice description. Use as a guideline. The anti-AI-speak rubric in Claude's persistent memory takes precedence when they conflict.
3. `user_profile.md` — David's collaboration preferences: compact responses, beginner coder, small verifiable milestones, focus on one thing at a time, distinguish facts from hypotheses.
4. `phase1_setup.md` — original Phase 1 walkthrough; mostly historical now.

The Anti-AI-speak rubric memory file (in Claude's persistent memory, not in this folder) governs all prose produced for this project — site copy, chat replies, code comments, documents. Apply it before publishing anything.

## Open questions for David

- Domain name: not picked. Some directions brainstormed in `website_plan.md` Section 10.
- Restoring Unicode in the *original* Phase 2 entries (golf-courses card, hourly hero summary): the new Phase 4 cards have Unicode throughout, but the older entries in `figures.json` still use ASCII fallbacks (`--`, `CO2`, `-` for ranges). Low-priority Unicode-restoration pass before launch.

Closed during Phase 4:

- The home-page lede negation ("what AI's environmental impact actually is — and what it isn't —") stays. David's call: just one Tier 1 instance, not the most typical AI phrasing.

## Working notes

- **The figures.json byte-cap quirk is real and recurred in Phase 4.** A large Edit (adding ten cards in one pass) truncated the file at exactly 4,000 bytes on the bash sandbox view, while the Read tool still saw the full content — meaning the canonical Windows-side file may also have been truncated. The reliable workaround is rewriting the entire file via a Python heredoc through bash (`python3 << 'PYEOF' ... json.dump(...) ... PYEOF`). Small surgical Edits (one card or smaller) work fine. For any bulk change to figures.json, default to the heredoc path.
- Sandbox `npm install` for Astro times out at 45 seconds, so full builds aren't reliably verifiable in the sandbox. David's local machine handles them fine.
- `git config user.name` and `user.email` are already set on David's machine (handled in Phase 1).
- Line endings: `authorial_voice.md` flipped LF↔CRLF in one session; if the sandbox normalizes line endings on a file you didn't intend to touch, revert with `git checkout <file>`.

## File map

```
src/
  data/figures.json              ← single source of truth for all comparison data
  layouts/Layout.astro           ← page wrapper: masthead + main slot
  components/
    ComparisonCard.astro         ← one card per comparison
    HourlyImpactHero.astro       ← home page hero (two stacked RangeBar charts)
    RangeBar.astro               ← horizontal bars, supports point + range values
    SourceLine.astro             ← sources + last-verified footer
  pages/
    index.astro                  ← home: hero + thesis + cta
    comparisons.astro            ← lists all ComparisonCards from figures.json
  styles/global.css              ← design tokens, base styles, masthead, common chrome

website_plan.md                  ← the plan
phase1_setup.md                  ← original setup walkthrough
authorial_voice.md               ← voice description
user_profile.md                  ← David's collaboration preferences
README.md                        ← repo readme
handoff.md                       ← this file
```
