# Task ID: 3 - SEO Fix Agent

## Summary
Fixed all critical SEO issues: added canonical URLs to all pages, moved FAQPage structured data from layout to FAQ page only, and added Article structured data to article pages.

## Work Log

### Issue 1: Added canonical URLs to ALL pages
Added `alternates.canonical` and `openGraph.url` to metadata on every page:

1. **`/src/app/layout.tsx`** — Added `alternates: { canonical: "https://betcalcpro.com.br" }` and `openGraph.url: "https://betcalcpro.com.br"`
2. **`/src/app/faq/page.tsx`** — canonical: "https://betcalcpro.com.br/faq", og:url added
3. **`/src/app/about/page.tsx`** — canonical: "https://betcalcpro.com.br/about", og:url added
4. **`/src/app/contact/page.tsx`** — canonical: "https://betcalcpro.com.br/contact", og:url added
5. **`/src/app/privacy/page.tsx`** — canonical: "https://betcalcpro.com.br/privacy", og:url added
6. **`/src/app/terms/page.tsx`** — canonical: "https://betcalcpro.com.br/terms", og:url added
7. **`/src/app/cookies/page.tsx`** — canonical: "https://betcalcpro.com.br/cookies", og:url added
8. **`/src/app/responsible-gaming/page.tsx`** — canonical: "https://betcalcpro.com.br/responsible-gaming", og:url added
9. **`/src/app/artigos/page.tsx`** — canonical: "https://betcalcpro.com.br/artigos", og:url added
10. **`/src/app/artigos/[slug]/page.tsx`** — canonical dynamically set to `https://betcalcpro.com.br/artigos/${slug}`, og:url added, og:type set to 'article'
11. **`/src/app/martingale/page.tsx`** — canonical: "https://betcalcpro.com.br/martingale", og:url added
12. **`/src/app/fibonacci/page.tsx`** — canonical: "https://betcalcpro.com.br/fibonacci", og:url added
13. **`/src/app/bankroll/page.tsx`** — canonical: "https://betcalcpro.com.br/bankroll", og:url added
14. **`/src/app/soros/page.tsx`** — canonical: "https://betcalcpro.com.br/soros", og:url added
15. **`/src/app/masaniello/page.tsx`** — canonical: "https://betcalcpro.com.br/masaniello", og:url added
16. **`/src/app/recovery/page.tsx`** — canonical: "https://betcalcpro.com.br/recovery", og:url added
17. **`/src/app/sequence-analyzer/page.tsx`** — canonical: "https://betcalcpro.com.br/sequence-analyzer", og:url added
18. **`/src/app/probability-simulator/page.tsx`** — canonical: "https://betcalcpro.com.br/probability-simulator", og:url added
19. **`/src/app/strategy-generator/page.tsx`** — canonical: "https://betcalcpro.com.br/strategy-generator", og:url added
20. **`/src/app/user-panel/page.tsx`** — canonical: "https://betcalcpro.com.br/user-panel" (no og:url since no openGraph)

### Issue 2: Moved FAQPage JSON-LD from layout to FAQ page only
- **Removed** `faqJsonLd` constant and its `<script type="application/ld+json">` tag from `/src/app/layout.tsx`
- **Added** `faqJsonLd` constant and `<script type="application/ld+json">` tag to `/src/app/faq/page.tsx` — FAQPage schema now only appears on the FAQ page where FAQ content actually exists
- Layout still retains WebApplication and BreadcrumbList JSON-LD (these are site-wide and appropriate)

### Issue 3: Added Article structured data to article pages
- Updated `/src/app/artigos/[slug]/page.tsx`:
  - Moved `articles` map to module level so it's accessible in both `generateMetadata` and the page component
  - Added 4 missing article entries (paradoxo-monty-hall, lei-grandes-numeros, distribuicao-normal-gaussiana, introducao-teoria-jogos) — was 8, now 12
  - Made `ArticlePage` async so it can `await params` for the slug
  - Added Article JSON-LD structured data with: headline, description, author (Organization: BetCalc Pro), publisher with logo, url, mainEntityOfPage, inLanguage (pt-BR), datePublished, dateModified
  - JSON-LD only renders when article exists (null check)

### Verification
- `bun run lint` passes cleanly with no errors
- Dev server compiles and serves pages successfully (200 status)
