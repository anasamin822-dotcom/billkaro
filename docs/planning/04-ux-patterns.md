# 04 - SaaS UX patterns (standing list of 20)

Applied to this build:
- Smart form validation: inline, debounced, per-field messages on the contact form
- Debouncing: validation waits for a 450ms pause in typing
- Loading + success states: submit button shows "Sending...", panel swaps to success
- Custom 404 page
- Mobile-optimized layout: hamburger menu, single-column sections, big tap targets
- Keyboard support: skip link, Escape closes menu, aria-expanded/pressed states

Skipped because a static landing page has nothing for them to act on:
optimistic UI, skeleton loaders, command palette, persistent sidebar, autosave,
throttling, bulk actions, data tables, filtering, keyboard shortcut map,
tier-based UI, onboarding capture, referral pages, destructive-action protection,
graceful API error recovery. No app, no data, no API.
