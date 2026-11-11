# 05 - Security checklist (standing 21 points + reel tests)

What applies to a zero-dependency static page:
- No secrets, tokens or API keys in the code - there is no backend at all
- Form input is never written into the DOM as HTML, only textContent (no XSS)
- Honeypot field + 10s client-side resend limit on the form
- No eval, no inline event handlers, no third-party JS, so nothing to audit with npm
- HTTPS comes free with GitHub Pages
- git history checked for secrets before making the repo public
- No debug code left in

Not applicable here (no server side exists): row-level security, API auth, rate
limiting on routes, parameterized queries, CORS, webhook signatures, storage
buckets, admin pages, IDOR, file upload checks, admin logging, CAPTCHA.
If this page ever gets a real form endpoint, that list comes back.

Reel tests (DfdSZzURvdt): secrets scan + debug-off + git history scan done.
Auth/database/price verification don't exist on this page.
