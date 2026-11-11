# BillKaro

A responsive SaaS landing page for **BillKaro**, a fictional invoicing and payment-tracking
product for Indian freelancers.

Built as the front-end development assignment for Sankar Group (Internshala, November 2026).

**Live site:** https://anasamin822-dotcom.github.io/billkaro/

## What's inside

- Sticky nav with mobile hamburger menu and active-section highlighting
- Hero with a mouse-follow spotlight, animated stat counters and a CSS-built product mock
- Bento-grid features section with 3D-tilt cards
- 3-step "how it works" section
- Pricing with a monthly/yearly toggle (3 plans)
- Testimonials and an FAQ accordion
- Contact form with inline validation, honeypot spam check and a success state
- Custom 404 page
- Fully responsive (mobile-first breakpoints at 960px and 640px)

## Tech

Plain HTML, CSS and JavaScript. No frameworks, no build step, no backend.
Fonts: Fraunces and Inter via Google Fonts. All icons are inline SVG.

## Run it locally

It's a static site, so any of these work:

```bash
# option 1: just open the file
open index.html            # macOS
start index.html           # Windows

# option 2: serve it properly
python -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
billkaro/
├── index.html
├── 404.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/favicon.svg
├── screenshots/       # desktop + mobile captures of the live site
├── docs/planning/     # notes written before and during the build
└── README.md
```

## Design notes

- Colour palette: ivory `#F3EEE8` base, teal `#17645F` secondary, coral `#FF6845`
  reserved for CTAs and small highlights (roughly a 90/10 split).
- Style direction: minimalism with a bento-grid feature section. Light theme.
- Motion is kept purposeful: scroll reveals, card tilt, counters and a hero spotlight.
  Everything is disabled under `prefers-reduced-motion`.
- The contact form validates on the client (name, email format, message length),
  uses a honeypot against bots, and escapes user input by only ever writing it
  through `textContent`.

## Checks done before shipping

- W3C-friendly semantic markup, skip link, aria states on menu/accordion/toggle
- No horizontal overflow at 360px, 768px and 1440px
- Forms show inline errors and a success message
- `mailto:` and `tel:` links work
- No secrets or API keys anywhere in the code (there is no backend)
- Copy and comments passed an AI-slop wording scan (theclaymethod/unslop rules)

## License

MIT - see [LICENSE](LICENSE).
