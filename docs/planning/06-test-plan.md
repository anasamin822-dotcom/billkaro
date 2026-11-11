# 06 - Test plan

Manual pass on the live site before showing it:
- Desktop (1440px): every section, nav links scroll, pricing toggle swaps prices,
  plan buttons prefill the form, FAQ opens one at a time, form errors + success
- Mobile (390px): hamburger opens/closes, no horizontal scroll, cards stack,
  floating hero cards don't cover text
- Keyboard: tab through nav, form and FAQ; Escape closes the menu
- Reduced motion: nothing animates
- 404.html renders and links home
- mailto: and tel: links resolve
- Lighthouse-style eyeball: fonts load, favicon shows, meta description present

What I ran: manual browser QA on the deployed site + a phrase scan for AI-sounding
copy. What I could not run here: Pentagi (laptop tool) - scan prompt shared separately.
