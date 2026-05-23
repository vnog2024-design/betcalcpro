---
Task ID: 4
Agent: Ad System Fix Agent
Task: Unify ad system and add 3 ad blocks per page

Work Log:
- Read worklog.md and all target files before editing
- Step 1: Replaced `/src/components/shared/ad-banner.tsx` — removed fake placeholder slots showing "Anúncio" text; now wraps real `AdUnit` from `@/components/ads/ad-unit` for AdBanner, AdInContent, and AdSidebar
- Step 2: Updated `/src/components/landing/landing-page.tsx` — added AdBanner at TOP (after hero, before Calculators), kept existing AdInContent in MIDDLE (between Calculators and Simulators), added AdBanner at BOTTOM (after Risk Management section). Total: 3 ad units on landing page
- Step 3: Verified tool pages — `tool-page-layout.tsx` already has AdBanner at bottom; tool calculators (martingale, fibonacci, etc.) use AdInContent which now renders real AdSense units after Step 1 fix
- Step 4: Added AdBanner to 8 pages that previously had no ads:
  1. `/src/components/content/faq-content.tsx` — AdBanner before "Ainda tem dúvidas?" section
  2. `/src/components/content/articles-list.tsx` — AdBanner at bottom after articles grid
  3. `/src/components/legal/about-page.tsx` — AdBanner at bottom after last Card
  4. `/src/components/legal/contact-page.tsx` — AdBanner at bottom before "text-center" footer
  5. `/src/components/legal/privacy-policy.tsx` — AdBanner at bottom after last Card
  6. `/src/components/legal/terms-of-use.tsx` — AdBanner at bottom after last Card
  7. `/src/components/legal/cookies-policy.tsx` — AdBanner at bottom after last Card
  8. `/src/components/legal/responsible-gaming.tsx` — AdBanner at bottom after last Card
- Step 5: Updated `/src/components/content/article-content.tsx` — added AdInContent after <hr> separator (after article header), and another AdInContent after article content (before closing div). Total: 2 in-content ads per article page (plus AdBanner from tool-page-layout = 3 total)
- Ran lint check — passes cleanly
- Verified dev server compiles and serves all pages without errors

Stage Summary:
- Unified ad system: all AdBanner/AdInContent/AdSidebar components now use real AdUnit with AdSense <ins> tags instead of fake "Anúncio" placeholders
- Landing page: 3 ad units (AdBanner top, AdInContent middle, AdBanner bottom)
- Tool pages: AdInContent (middle) + AdBanner (bottom from layout) = 2-3 per page
- Article pages: AdInContent (after header) + AdInContent (after content) + AdBanner (bottom from layout) = 3 per page
- 8 previously ad-free pages now have AdBanner at the bottom (1-2 per page within Google's 3-unit limit)
- All ad slots use "0000000000" placeholder to be replaced with real slot IDs after AdSense approval
