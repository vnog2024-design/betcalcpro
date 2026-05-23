---
Task ID: 1
Agent: Main
Task: Fix theme system so color themes are actually visible when changed

Work Log:
- Read all current theme implementation files (app-store.ts, globals.css, header.tsx, theme-picker.tsx, page.tsx, layout.tsx, animated-background.tsx)
- Identified root cause: all CSS utility classes (.neon-glow, .neon-text, .gradient-neon, input:focus, .card-hover, .grid-pattern) and Recharts chart components used hardcoded #00ff88/#00d4ff colors instead of CSS variables, so changing the theme had no visible effect
- Updated globals.css: replaced all hardcoded neon colors in 12 utility classes with CSS variables (var(--neon), var(--neon-blue)) using color-mix() for alpha transparency
- Updated 8 tool components: replaced hardcoded Recharts SVG props with useThemeColors hook values
- Created useThemeColors hook at /src/hooks/use-theme-colors.ts for computed theme colors
- Enhanced ThemePicker UI: larger color swatches, preview bar, active theme label, better visual feedback with glow effects
- Ran lint check - passes cleanly
- Verified dev server compiles and serves pages without errors

Stage Summary:
- All 8 color themes (Neon Verde, Neon Azul, Neon Roxo, Neon Rosa, Neon Laranja, Neon Vermelho, Oceano, Ouro) now work visually
- Theme changes affect: logo gradient, header/sidebar accent colors, buttons, input focus rings, card hover effects, chart colors, background orbs, grid pattern, neon glow/text/border effects
- Theme selection is persisted in localStorage via Zustand persist middleware
- Flash prevention script in layout.tsx ensures correct theme on initial load

---
Task ID: 2
Agent: Main
Task: Add striking visual art/texture to the landing page hero section

Work Log:
- Created HeroVisual component at /src/components/shared/hero-visual.tsx with multiple visual layers
- Layer 1: Base gradient with theme-responsive colors
- Layer 2: Grid pattern overlay
- Layer 3: Morphing glow blobs (3 blobs with different animation speeds)
- Layer 4: Particle field canvas (40 particles with connection lines, animated via requestAnimationFrame)
- Layer 5: SVG floating shapes (animated chart lines, dice, diamond, hexagon, coin, triangle, percentage ring, cross marks)
- Layer 6: Scan line effect
- Layer 7: Vignette overlay
- Layer 8: Border glow pulse
- Added 15+ CSS animations to globals.css (hero-draw-line, hero-node-glow, hero-float-1 through 7, hero-morph-1 through 3, hero-scan, hero-glow-pulse, hero-gradient-shift, hero-ring-spin)
- Updated landing-page.tsx hero section to use HeroVisual component
- Added badge "100% Gratuito" with neon pulse indicator
- Added stats bar (7 Calculadoras, 5 Simuladores, 100% Gratuito)
- Hero section now has min-height for better visual impact
- All animations respect the current color theme via useThemeColors hook
- Lint passes, server compiles without errors

Stage Summary:
- Hero section now features a full cyberpunk-style animated visual with chart lines, floating geometric shapes (dice, coins, diamonds, hexagons), particle field with connection lines, morphing blobs, scan line effect
- All visuals respond to theme color changes
- Multiple layers create depth and visual richness
- Added badge and stats bar for better first impression

---
Task ID: 2-b
Agent: 404 + Links Fix Agent
Task: Create custom 404 page and fix <a> tags to use Next.js <Link>

Work Log:
- Created /src/app/not-found.tsx — server component with metadata (title, description for SEO/AdSense) that renders the client component
- Created /src/app/not-found-client.tsx — client component with styled 404 page featuring gradient-neon-text "404", navigation buttons (Página Inicial, Artigos, FAQ), and quick-access tool links (Martingale, Fibonacci, Bankroll, Soros)
- Fixed /src/components/content/faq-content.tsx — replaced `<a href="/contact">` with `<Link href="/contact">` and added `import Link from 'next/link'`
- Ran lint check — passes cleanly

Stage Summary:
- Custom 404 page handles not-found routes gracefully with helpful navigation links (important for AdSense approval)
- All internal links in faq-content.tsx now use Next.js <Link> for client-side navigation instead of full page reloads

---
Task ID: 2-a
Agent: SW + Structured Data Agent
Task: Register Service Worker, add BreadcrumbList structured data, add google-site-verification meta tag

Work Log:
- Read current layout.tsx and worklog.md
- Added Service Worker registration <Script> component (id="sw-register", strategy="afterInteractive") after the AdSense script tag — registers /sw.js on window load with silent error catch
- Added BreadcrumbList JSON-LD structured data with 4 items (Início, Ferramentas, Artigos, FAQ) and corresponding <script type="application/ld+json"> tag in <head> after the FAQPage schema
- Added "google-site-verification": "PENDING_VERIFICATION" to metadata.other object
- Ran lint check — passes cleanly
- Verified dev server compiles and serves pages without errors

Stage Summary:
- PWA install prompt (pwa-install-prompt.tsx) will now work on Android because the service worker /sw.js is being registered
- BreadcrumbList structured data helps Google understand the site navigation hierarchy for rich search results
- Google site verification placeholder is in place for when the user gets a code from Google Search Console

---
Task ID: 2-c
Agent: Content Expansion Agent
Task: Add 4 new educational articles to increase content depth (CRITICAL for AdSense)

Work Log:
- Read all 4 target files (article-content.tsx, articles-list.tsx, sitemap.ts, landing-page.tsx)
- Added 4 new article entries to article-content.tsx:
  1. 'paradoxo-monty-hall' — O Paradoxo de Monty Hall (Probabilidade, 6 min)
  2. 'lei-grandes-numeros' — A Lei dos Grandes Números (Estatística, 8 min)
  3. 'distribuicao-normal-gaussiana' — A Distribuição Normal (Gaussiana) (Estatística, 9 min)
  4. 'introducao-teoria-jogos' — Introdução à Teoria dos Jogos (Matemática, 10 min)
- Added 4 new article entries to articles-list.tsx with descriptions and icons
- Added 'Probabilidade' category color to categoryColors in articles-list.tsx
- Added 4 new article slugs to sitemap.ts articles array
- Added 'paradoxo-monty-hall' to featuredArticles in landing-page.tsx
- Added Lightbulb to lucide-react imports in landing-page.tsx
- Updated article count from 8 to 12 in landing-page.tsx hero stats
- Updated featured articles grid from 3-col to 4-col layout (lg:grid-cols-4)
- Ran lint check — passes cleanly
- Verified dev server returns 200 OK

Stage Summary:
- Site now has 12 educational articles (up from 8), meeting the AdSense minimum content threshold
- New articles cover: probability (Monty Hall), statistics (Law of Large Numbers, Normal Distribution), and game theory (Prisoner's Dilemma, Nash Equilibrium)
- All 4 new articles have full content, proper categorization, and consistent formatting
- Sitemap includes all 12 article URLs
- Landing page shows updated count and new featured article

---
Task ID: 2
Agent: Main Agent
Task: Implement AdSense approval improvements - Service Worker, Structured Data, 404 Page, New Articles

Work Log:
- Registered service worker in layout.tsx (critical for PWA install to work on Android)
- Added BreadcrumbList structured data (JSON-LD) for SEO
- Added Google Site Verification meta tag placeholder
- Created custom 404 page (not-found.tsx + not-found-client.tsx)
- Added 4 new educational articles: Paradoxo de Monty Hall, Lei dos Grandes Números, Distribuição Normal, Teoria dos Jogos
- Updated articles-list.tsx with new articles and Probabilidade category color
- Updated sitemap.ts with 4 new article slugs
- Updated landing page with new featured article and article count (8→12)
- Fixed FAQ page <a> tag to use Next.js <Link> component
- Pushed all changes to GitHub (commit 23f0306)

Stage Summary:
- Site now has 12 educational articles (was 8)
- PWA install now functional on Android (service worker registered)
- Structured data: WebApplication + FAQPage + BreadcrumbList
- Custom 404 page with helpful navigation
- All pages return correct HTTP status codes
- Lint passes cleanly

---
Task ID: 3
Agent: SEO Fix Agent
Task: Fix critical SEO issues — canonical URLs, FAQPage structured data placement, Article structured data

Work Log:
- Added `alternates.canonical` and `openGraph.url` to 20 pages total (layout + 19 sub-pages)
- Pages updated: layout.tsx (root), faq, about, contact, privacy, terms, cookies, responsible-gaming, artigos, artigos/[slug], martingale, fibonacci, bankroll, soros, masaniello, recovery, sequence-analyzer, probability-simulator, strategy-generator, user-panel
- Removed FAQPage JSON-LD from layout.tsx (was appearing on every page — flagged as spam by Google)
- Added FAQPage JSON-LD only to /faq/page.tsx (where FAQ content actually exists)
- Added Article JSON-LD structured data to /artigos/[slug]/page.tsx with headline, description, author, publisher, url, mainEntityOfPage, inLanguage, datePublished, dateModified
- Made ArticlePage component async to await params for slug-based JSON-LD generation
- Moved articles map to module level in [slug]/page.tsx for shared access between generateMetadata and page component
- Added 4 missing article entries to [slug]/page.tsx articles map (paradoxo-monty-hall, lei-grandes-numeros, distribuicao-normal-gaussiana, introducao-teoria-jogos) — now all 12 articles have proper metadata
- Ran lint check — passes cleanly
- Verified dev server compiles and serves pages without errors

Stage Summary:
- Every page now has a canonical URL tag for proper Google indexing (prevents duplicate content issues)
- Every page with openGraph now has og:url for social sharing accuracy
- FAQPage structured data only appears on the FAQ page (not site-wide spam)
- Article pages have proper Article structured data for Google rich results
- Article [slug] page now covers all 12 articles with dynamic canonical URLs

---
Task ID: 4
Agent: Ad System Fix Agent
Task: Unify ad system and add 3 ad blocks per page

Work Log:
- Replaced `/src/components/shared/ad-banner.tsx` — removed fake placeholder "Anúncio" text slots; now wraps real `AdUnit` from `@/components/ads/ad-unit` for AdBanner, AdInContent, AdSidebar
- Updated landing page with 3 ad units: AdBanner TOP (after hero), AdInContent MIDDLE (between Calculators/Simulators), AdBanner BOTTOM (after Risk Management)
- Verified tool pages already have proper ads: AdInContent (middle) + AdBanner (bottom from tool-page-layout.tsx)
- Added AdBanner to 8 previously ad-free pages: faq-content.tsx, articles-list.tsx, about-page.tsx, contact-page.tsx, privacy-policy.tsx, terms-of-use.tsx, cookies-policy.tsx, responsible-gaming.tsx
- Added AdInContent to article-content.tsx: one after <hr> separator (after header) and one after article content (before closing div)
- Ran lint check — passes cleanly
- Verified dev server compiles and serves all pages without errors

Stage Summary:
- Unified ad system: all AdBanner/AdInContent/AdSidebar now render real AdSense <ins> tags instead of fake "Anúncio" placeholders
- Landing page: 3 ad units (top/middle/bottom) — Google best practice for AdSense approval
- Tool pages: 2-3 ad units per page (in-content + bottom banner)
- Article pages: 3 ad units per page (after header in-content + after content in-content + bottom banner from layout)
- 8 previously ad-free pages now have AdBanner at bottom (1 per page within Google's 3-unit limit)
- All ad slots use "0000000000" placeholder — to be replaced with real slot IDs after AdSense approval

---
Task ID: 5
Agent: Main
Task: Fix disappeared ad blocks — add visible placeholders for AdSense pre-approval

Work Log:
- Investigated missing ad blocks — found the real AdSense <ins> tags were rendering but invisible because placeholder slot ID "0000000000" doesn't serve real ads
- Updated /src/components/ads/ad-unit.tsx — added useState/useEffect to detect if ad has loaded, shows dashed-border placeholder with "Anúncio" label when no ad is served
- Updated /src/components/shared/ad-banner.tsx — added consistent label prop to AdBanner, AdInContent, AdSidebar
- Placeholder is subtle (dashed border, muted text) — disappears automatically when real AdSense ad fills the slot
- Lint passes, dev server compiles, all pages return 200
- Pushed to GitHub (commit 017b529) — Vercel will auto-deploy

Stage Summary:
- Ad blocks now VISIBLE on all pages as subtle dashed-border placeholders with "Anúncio" text
- When AdSense approves and serves real ads, placeholders automatically disappear and real ads show
- Landing page: 3 ad blocks (top/middle/bottom), tools: 2 (in-content/bottom), articles: 3, other pages: 1-2
- All changes deployed via GitHub push to Vercel

---
Task ID: 6
Agent: Main
Task: Improve Soros Calculator with Soros % (reinvestment percentage) and win/loss values per level

Work Log:
- Read current soros-calculator.tsx — found it had hardcoded 2x multiplier, no Soros percentage option, only showed win scenario
- Completely rewrote soros-calculator.tsx with new features:
  - Added Multiplicador (Odds) input — user can set any multiplier (1.5x, 2x, 3x, etc.)
  - Added Soros % slider (1-100%) — controls how much of profit to reinvest vs protect
  - Created detailed SorosStep interface with both WIN and LOSS scenarios per level
  - WIN scenario shows: Lucro Bruto, Valor Protegido, Valor Reinvestido, Novo Capital, Banca Total, Protegido Acumulado
  - LOSE scenario shows: Perda da Operação, Protegido Anterior, Banca Restante, Resultado Líquido
  - Added contextual alerts: "Mesmo perdendo, você sai no lucro!" when partial Soros protects enough
  - Added dual-area chart showing both total bankroll growth and protected profit accumulation
  - Added compact summary table with all key values per step
  - Added visual step cards showing total bankroll and protected amount
- Created /src/components/ui/slider.tsx — shadcn/ui Slider component using @radix-ui/react-slider (package already installed)
- Math verification:
  - Soros 30% + 2x: Step 1 win → R$200 total (R$70 protected + R$130 working), if lose at step 3 → still +R$61 profit
  - Soros 100% + 2x: Traditional doubling (R$200, R$400, R$800...) with no protection
  - Soros 50% + 1.5x: Moderate growth with partial protection
- All calculations verified correct via test scripts
- Lint passes, page compiles and returns 200

Stage Summary:
- Soros Calculator now has full Soros % control (1-100%)
- Each level shows both VITÓRIA and DERROTA scenarios with exact values
- Partial Soros (e.g., 30%) shows how much is protected vs reinvested at each step
- If loss occurs, user can see exactly how much protected profit remains from previous wins
- Dynamic alerts tell user when they're "in the green" even with a loss at that level

---
Task ID: 7
Agent: Main
Task: Build Calculadora de Ciclos — Martingale with cycle-based recovery

Work Log:
- Created /src/components/tools/cycles-calculator.tsx — complete Cycles Calculator component
- Created /src/app/ciclos/page.tsx — route with metadata (title, description, canonical, OG)
- Created /src/app/ciclos/client.tsx — client component wrapper with ToolPageLayout
- Updated /src/store/app-store.ts — added 'ciclos' to ToolPage union, toolInfo (RefreshCw icon, calculators category), toolHref (/ciclos)
- Updated /src/components/layout/sidebar.tsx — added RefreshCw import, iconMap entry, 'ciclos' to Calculadoras tools
- Updated /src/components/landing/landing-page.tsx — added RefreshCw import, ciclos to allTools, updated calculator count 7→8
- Calculation logic verified:
  - Cycle N+1 entry = last bet of Cycle N × cycle multiplier
  - Net profit = bet × payout - (cycle invested + previous losses)
  - With payout 2x, cycle mult 2x, 2 gales: every win gives +R$1 (consistent profit)
  - With cycle mult below minimum (1/(payout-1)): correctly shows negative profit
- Visual features:
  - Cycle-by-cycle expandable cards with detailed table (Jogada, Aposta, Investido Ciclo, Perdas Ant., Total Investido, Retorno, Lucro Líquido)
  - Click any row to simulate a win at that step (GREEN highlight with profit display)
  - Accumulated loss chart per cycle
  - Bankroll support calculator — shows how many cycles your bankroll can handle
  - Visual cycle map (compact cards showing entry/bet range/loss per cycle)
  - Flow diagram showing cycle progression with multiplier arrows
  - Warning when cycle multiplier is too low to recover losses
  - "Como Funciona" expandable explanation section
- Lint passes clean, both /ciclos and / return 200

Stage Summary:
- New "Calculadora de Ciclos" tool fully implemented at /ciclos
- Logic: Martingale within cycles (configurable gales) + recovery between cycles (last bet × cycle mult)
- Key difference from regular Martingale: limits gales per cycle, starts new cycle instead of continuing infinite gales
- Bankroll support feature tells user exactly which cycle/step would break their bankroll
- Visual design matches existing tool pages (neon theme, cards, charts, responsive layout)
- Site now has 8 calculators (was 7)

---
Task ID: 1
Agent: General-Purpose
Task: Fix duplicate page titles (" | BetCalc Pro" suffix causing duplication with layout template)

Work Log:
- Searched all page.tsx files in /home/z/my-project/src/app/ for " | BetCalc Pro" pattern
- Found 18 files with duplicate " | BetCalc Pro" in openGraph.title fields (top-level title fields were already fixed)
- Also found 1 template literal in artigos/[slug]/page.tsx — explicitly excluded per instructions (dynamic, needs different fix)
- Skipped ciclos/page.tsx — already fixed per instructions
- Skipped user-panel/page.tsx and root page.tsx — no " | BetCalc Pro" present
- Fixed openGraph.title in 18 files by removing " | BetCalc Pro" suffix:
  1. hedging/page.tsx: 'Calculadora de Cobertura (Hedging) | BetCalc Pro' → 'Calculadora de Cobertura (Hedging)'
  2. masaniello/page.tsx: 'Calculadora Masaniello | BetCalc Pro' → 'Calculadora Masaniello'
  3. faq/page.tsx: 'Perguntas Frequentes | BetCalc Pro' → 'Perguntas Frequentes'
  4. strategy-generator/page.tsx: 'Gerador de Estratégias de Gestão | BetCalc Pro' → 'Gerador de Estratégias de Gestão'
  5. bankroll/page.tsx: 'Calculadora de Gestão de Capital | BetCalc Pro' → 'Calculadora de Gestão de Capital'
  6. soros/page.tsx: 'Calculadora de Progressão Geométrica | BetCalc Pro' → 'Calculadora de Progressão Geométrica'
  7. fibonacci/page.tsx: 'Calculadora de Sequência Fibonacci | BetCalc Pro' → 'Calculadora de Sequência Fibonacci'
  8. cookies/page.tsx: 'Política de Cookies | BetCalc Pro' → 'Política de Cookies'
  9. responsible-gaming/page.tsx: 'Uso Responsável | BetCalc Pro' → 'Uso Responsável'
  10. martingale/page.tsx: 'Calculadora de Progressão Martingale | BetCalc Pro' → 'Calculadora de Progressão Martingale'
  11. artigos/page.tsx: 'Artigos | BetCalc Pro' → 'Artigos sobre Probabilidade e Gestão de Risco'
  12. sequence-analyzer/page.tsx: 'Analisador de Sequências | BetCalc Pro' → 'Analisador de Sequências'
  13. contact/page.tsx: 'Contato | BetCalc Pro' → 'Contato'
  14. terms/page.tsx: 'Termos de Uso | BetCalc Pro' → 'Termos de Uso'
  15. privacy/page.tsx: 'Política de Privacidade | BetCalc Pro' → 'Política de Privacidade'
  16. probability-simulator/page.tsx: 'Simulador de Probabilidades | BetCalc Pro' → 'Simulador de Probabilidades'
  17. about/page.tsx: 'Sobre Nós | BetCalc Pro' → 'Sobre Nós'
  18. recovery/page.tsx: 'Calculadora de Recuperação de Capital | BetCalc Pro' → 'Calculadora de Recuperação de Capital'
- Verified no remaining " | BetCalc Pro" in any page.tsx except the template literal in artigos/[slug]/page.tsx
- Ran `bun run lint` — passes cleanly with no errors

Stage Summary:
- Fixed duplicate " | BetCalc Pro" suffix in openGraph.title across 18 page.tsx files
- The layout template `"%s | BetCalc Pro"` now correctly appends " | BetCalc Pro" once to all page titles
- Before fix: titles rendered as "Title | BetCalc Pro | BetCalc Pro" (duplicate)
- After fix: titles render as "Title | BetCalc Pro" (single, from layout template)
- Note: artigos/[slug]/page.tsx still has `${article.title} | BetCalc Pro` template literal — excluded per instructions, needs different fix approach
---
Task ID: 1
Agent: Main
Task: Investigate and fix site not loading/updating in browser

Work Log:
- Checked dev server logs - server running fine, returning 200 for all routes
- Ran lint - no errors
- Ran TypeScript check - only pre-existing type errors in other files, none in cycles-calculator
- Used agent-browser to test the site - confirmed it IS loading correctly
- Homepage renders with age gate, header, sidebar, landing page content
- Ciclos page (/ciclos) loads with full calculator UI
- Soros page (/soros) loads correctly
- No JavaScript errors in browser console
- HMR (Hot Module Replacement) connected and working
- Fixed duplicate "BetCalc Pro" in page titles (layout template already appends it)
- Updated Service Worker cache version from v2 to v3 to force cache clear
- Fixed ciclos/page.tsx title: removed " | BetCalc Pro" suffix
- Fixed 18 other page.tsx files with same openGraph.title duplication issue
- Fixed artigos/[slug]/page.tsx openGraph title template literal

Stage Summary:
- Site was actually working fine - the issue was likely browser/Service Worker cache
- Service Worker cache version bumped to v3 to force cache invalidation
- Fixed duplicate page titles across 19+ page files
- All pages compile without errors, lint passes cleanly
---
Task ID: 1
Agent: Main
Task: Fix site not updating when refreshed in browser - Service Worker caching issue

Work Log:
- Identified root cause: Service Worker was using "cache-first" strategy for ALL /_next/static/ assets, causing old JS/CSS bundles to be served instead of new ones
- Rewrote /public/sw.js with major improvements:
  - Development detection (localhost/127.0.0.1) - completely bypasses caching in dev
  - Production uses "stale-while-revalidate" for Next.js chunks (shows cached, updates in background)
  - Cache-first only for truly static assets (images, icons)
  - Added message handlers for FORCE_UPDATE and SKIP_WAITING
  - Bumped cache version to v4
- Updated /src/app/layout.tsx SW registration:
  - In dev: automatically unregisters existing SWs and clears all caches
  - In production: registers SW with 30-second update checks
  - Added controllerchange listener for automatic reload when new SW activates
- Created /src/components/shared/update-detector.tsx:
  - Shows update banner when new SW version detected
  - In dev mode: automatically clears any residual SW registrations
  - In production: checks for waiting SW and version endpoint
  - User can click "Atualizar" to force update
- Created /api/version endpoint for version checking
- Added UpdateDetector to page.tsx
- Fixed next.config.ts: removed problematic headers config that was causing server issues
- Fixed duplicate "BetCalc Pro" in page titles across 19+ page files
- Resolved dev server stability issue - server was dying due to process management in sandbox environment
- Used double-fork daemon approach to keep dev server running persistently

Stage Summary:
- Service Worker completely rewritten with dev/prod awareness
- SW auto-unregisters in development (no more stale cache!)
- Update banner component created for production
- Dev server running stably
- All pages return 200, no JS errors
- Lint passes cleanly
---
Task ID: 2
Agent: Main
Task: Configure automatic deployment to Vercel via GitHub push

Work Log:
- Found existing Vercel project: betcalcpro (betcalcpro.com.br)
- Last deploy was 8h ago - changes were not being pushed to GitHub
- Discovered 5 unpushed commits on main branch
- Pushed all commits to GitHub: git push origin main
- Vercel auto-detected the push and triggered a new deployment
- Deployment completed successfully in 45s
- Created auto-deploy script at .zscripts/auto-deploy.sh
- Added .zscripts/ to .gitignore (contains Vercel token)
- Verified all production routes return 200

Stage Summary:
- Git push to GitHub now auto-triggers Vercel deployment
- Auto-deploy script available: bash .zscripts/auto-deploy.sh "commit message"
- Production site verified: https://betcalcpro.com.br (all routes 200)
- The problem was: changes were being committed but NOT pushed to GitHub

---
Task ID: 2
Agent: Main
Task: UX Improvements — Reduce pop-ups for new users, improve empty panel state, collapse long Martingale table

Work Log:
- **Task 1: PWA Install Prompt** — pwa-install-prompt.tsx
  - Changed from showing after 3-5 seconds to showing ONLY after 60 seconds on site OR after visiting a second page
  - Added localStorage page view tracking (pwa-page-views, pwa-first-visit-ts keys)
  - Added `trackPageView()` function called on component mount to increment page count
  - Added `shouldShowByTimeOrPages()` helper that checks pageCount >= 2 OR firstVisitTs >= 60s ago
  - Replaced immediate setTimeout with polling interval (5s) that checks conditions
  - Kept the 7-day dismissal cooldown unchanged

- **Task 1: Cookie Consent** — cookie-consent.tsx
  - Changed delay from 300ms to 2000ms (2 seconds)
  - Redesigned from large rounded card to slim bottom bar (border-t instead of rounded-xl)
  - Reduced padding from p-5/p-6 to py-2.5 with compact layout
  - Shortened text from full paragraph to concise "Usamos cookies..." one-liner
  - Changed link text from "Política de Cookies" to "Saiba mais" for compactness
  - Reduced button size (h-7, text-xs, px-2.5) and changed label from "Apenas essenciais" to "Essenciais"
  - Changed from flex-col to inline horizontal layout (text + buttons in one row on desktop)
  - Kept all functionality (accept, reject, gtag consent update)

- **Task 2: User Panel Empty State** — user-panel.tsx
  - Replaced "??" avatar text with `<User>` icon from lucide-react
  - Added sample data for not-logged-in state: 42 calculations, "Martingale" most used, "Hoje" member since
  - Added 3 sample achievements: "Primeiro Cálculo" (unlocked), "Entusiasta" (locked), "Estrategista" (locked)
  - Added 3 sample favorite tools: Martingale, Progressão Geométrica, Fibonacci
  - Changed login button text from "Login com Google" to "Crie sua conta grátis"
  - Added "Dados ilustrativos" badge with Eye icon on Stats, Achievements, and Favorites cards
  - Quick Stats Cards show demo values when not logged in (42, 1, 3, 33%)
  - Demo data shown with opacity-70 to visually distinguish from real data

- **Task 3: Martingale Table Collapse** — martingale-calculator.tsx
  - Added `tableExpanded` state (default false)
  - Added `maxVisibleRows = 8` constant
  - Table renders `visibleLevels` (first 8 or all if expanded) instead of all `levels`
  - Added expand/collapse button below table when levels > 8
  - "Ver mais (+N gales)" button with ChevronDown icon when collapsed
  - "Ver menos" button with ChevronUp icon when expanded
  - Button styled with hover:text-neon transition for consistency
  - Same styling and click-to-simulate functionality preserved

- Ran `bun run lint` — passes cleanly with no errors
- Verified dev server compiles and serves pages without errors

Stage Summary:
- New users see only Age Gate on first visit (cookie consent delayed 2s, PWA prompt delayed 60s/2nd page)
- Cookie consent is now a slim, non-intrusive bottom bar
- Not-logged-in user panel shows rich illustrative demo data instead of zeros and "??"
- Martingale table is collapsed by default to 8 rows, expandable with clear CTA
- All existing functionality preserved across all changes

---
Task ID: 1
Agent: SEO-Performance Agent
Task: Apply SEO and performance improvements (sitemap, lazy loading, structured data, AdSense lazy load)

Work Log:
- Read worklog.md and all target files (sitemap.ts, layout.tsx, artigos/[slug]/page.tsx, footer.tsx, header.tsx, landing-page.tsx, hero-visual.tsx, page.tsx)
- Searched all .tsx files for <img and <Image tags — found 3 total: footer.tsx (logo), header.tsx (logo), page.tsx (loading shell logo)
- Task 1: Added 'ciclos' to sitemap.ts tools array (same priority 0.7, monthly change frequency)
- Task 2: Added loading="lazy" to footer.tsx logo image (below fold). Skipped header.tsx and page.tsx logos (in viewport on first load)
- Task 3: Updated datePublished from "2025-01-01" to "2025-01-15" in artigos/[slug]/page.tsx Article JSON-LD. Confirmed dateModified already present (dynamic current date) and openGraph.type already set to 'article'
- Task 4: Changed AdSense script strategy from "afterInteractive" to "lazyOnload" in layout.tsx. Verified google-adsense-account meta tag already present in metadata.other
- Ran bun run lint — passes cleanly with no errors

Stage Summary:
- Sitemap now includes the /ciclos route (priority 0.7, monthly change frequency)
- Footer logo image has loading="lazy" for performance (header/page logos exempt as above-fold)
- Article structured data has correct datePublished "2025-01-15" + dynamic dateModified + openGraph.type 'article'
- AdSense script uses strategy="lazyOnload" to avoid blocking initial render
- google-adsense-account meta tag confirmed present (ca-pub-3765222786344373)

---
Task ID: 3
Agent: Main
Task: Add Site Search (#4) and Export Results (#5) features

Work Log:
- Read worklog.md, header.tsx, all target calculator components, and existing UI components (command.tsx, dialog.tsx, dropdown-menu.tsx)
- Feature 1: Site Search
  - Created /src/components/shared/site-search.tsx as a client component using shadcn CommandDialog
  - Defined 23 searchable items across 3 categories (8 Calculators, 3 Simulators, 12 Articles)
  - Each item has label, description, href, category, icon, and keywords for fuzzy matching
  - Desktop: shows a search input button with ⌘K shortcut hint in the header
  - Mobile: shows a search icon button that opens the same CommandDialog overlay
  - Keyboard shortcut: Ctrl+K / Cmd+K toggles the search dialog
  - ESC closes natively via CommandDialog
  - Results grouped by category (Calculadoras, Simuladores, Artigos) with colored icons
  - Footer shows navigation hints (↑↓ navigate, ↵ open, esc close)
  - Updated /src/components/layout/header.tsx: imported SiteSearch, added to right actions area
- Feature 2: Export Results
  - Created /src/components/shared/export-button.tsx as a client component using shadcn DropdownMenu
  - Supports 2 export formats:
    1. CSV — Creates CSV string from data array and triggers download via Blob URL
    2. Copy as image — Uses html2canvas (dynamically imported) to capture target element, copies to clipboard as PNG. Falls back to copying innerText if html2canvas unavailable
  - Installed html2canvas@1.4.1 package
  - Added ExportButton to 4 calculator components:
    1. martingale-calculator.tsx — added useRef, exportData useMemo, ExportButton above table tab with tableRef
    2. cycles-calculator.tsx — added useRef, exportData useMemo, ExportButton at top of results section with resultsRef
    3. bankroll-calculator.tsx — added useRef, exportData useMemo, ExportButton at top of results section with resultsRef
    4. fibonacci-calculator.tsx — added useRef, exportData useMemo, ExportButton in table card header with tableRef
- Ran `bun run lint` — passes cleanly with no errors
- Verified all 4 calculator pages return 200 (/martingale, /ciclos, /bankroll, /fibonacci)

Stage Summary:
- Site Search fully functional with keyboard shortcuts (⌘K/Ctrl+K), responsive design, and fuzzy matching across all calculators, simulators, and articles
- Export functionality available on 4 calculator pages with CSV download and image copy support
- All existing functionality preserved — no breaking changes
- html2canvas@1.4.1 installed for image capture feature

---
Task ID: 4
Agent: Main
Task: Add content and sharing features — CTAs in articles (#6), social sharing buttons (#7), visual elements in articles (#10)

Work Log:
- Created /src/components/shared/article-cta.tsx — reusable CTA component with gradient border, "Experimente na Prática" title, and calculator links with hover effects
- Created /src/components/shared/share-buttons.tsx — social sharing component with WhatsApp, Twitter/X, Telegram, Copy Link buttons (default and compact variants, with toast on copy)
- Added ctaLinksMap to article-content.tsx mapping all 12 articles to their related calculators per spec
- Updated ArticleContent component to include ShareButtons (below title, next to date) and ArticleCTA (after article content, before ad)
- Updated tool-page-layout.tsx to include compact ShareButtons in top-right area of tool pages
- Added decorative emojis to section headings across all 12 articles (🎲📐🔗🚀🛡️📏🎯📉🔢✨🌻⚙️📊💥🎓📏📊🔔🔄🎯🚀⚠️🛩️🎰📉🔗🔄📐🧮💼⚖️🚪🤯🔍💯🪙🔬🚀⚠️📐📊🌟📐🔒🧠🌍)
- Added formula highlight boxes using Card component in Fibonacci article (φ formula) and Normal Distribution article (Z-score formula)
- Added 💡 Dica callout boxes in 4 articles: introducao-probabilidade, simulacao-monte-carlo, lei-grandes-numeros, introducao-teoria-jogos
- Added ⚠️ Atenção callout boxes in 3 articles: sequencia-fibonacci-matematica, falacias-estatisticas, lei-grandes-numeros
- Lint passes cleanly, dev server compiles and serves all pages without errors

Stage Summary:
- All 12 articles now have CTAs ("Experimente na Prática") directing readers to related calculators
- ShareButtons appear on article pages (below title, with WhatsApp/Twitter/Telegram/Copy) and tool pages (top-right compact variant)
- Visual elements added to all 12 articles: decorative heading emojis, formula highlight boxes, tip/warning callouts
- 7 articles have at least one 💡 Dica or ⚠️ Atenção callout box
- No existing functionality broken
