# 02 - Design direction

Style (one named style + one accent): minimalism as the base, bento grid as the accent.
Light theme this time, most of my recent projects were dark.

Palette (from the saved reel combos):
- Ivory #F3EEE8 - main background, about 90% of the page
- Teal #17645F - headings, primary buttons, icon accents
- Coral #FF6845 - CTAs and small highlights only, never body text

Type: Fraunces for display headings, Inter for everything else.
Serif display + plain sans body keeps it from looking like a default template.

Inspiration sweep before building (standing list):
- navbar.gallery - sticky top bar with one primary CTA on the right
- supahero.io / landing.love / lapa.ninja - hero layout: copy left, product visual right,
  stat row under the CTAs
- refero.design / hoverstat.es - section rhythm and card treatments
- CTA gallery - pricing toggle and plan card structure
- footer.design - lean footer with only links that exist
- Aceternity / Skiper / componentry / originkit - effect ideas (spotlight, tilt,
  scroll reveal) re-implemented in vanilla CSS/JS since this project is plain HTML
- 3dicons skipped on purpose: the minimal style reads better with flat SVG icons

Motion budget: hero spotlight, card tilt, counters, scroll reveals. All off under
prefers-reduced-motion. Nothing that delays reading the headline.
