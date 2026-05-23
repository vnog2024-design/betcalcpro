# Task 1 — SEO-Performance Agent

## Task: Apply SEO and performance improvements

### Changes Made

1. **Sitemap — Added 'ciclos' route** (`/src/app/sitemap.ts`)
   - Added `'ciclos'` to the `tools` array alongside the other 10 tools
   - Same priority 0.7, monthly change frequency as other tool pages

2. **Lazy loading for images** (`/src/components/layout/footer.tsx`)
   - Added `loading="lazy"` to the footer logo `<img>` tag
   - Skipped header.tsx logo (in viewport on first load)
   - Skipped page.tsx loading shell logo (visible on first load)
   - Searched entire project — only 3 `<img>` tags found, no `<Image>` components

3. **Article structured data** (`/src/app/artigos/[slug]/page.tsx`)
   - Changed `datePublished` from `"2025-01-01"` to `"2025-01-15"`
   - Confirmed `dateModified` already present (dynamic: `new Date().toISOString().split('T')[0]`)
   - Confirmed `openGraph.type = 'article'` already set (line 76)

4. **AdSense lazy load** (`/src/app/layout.tsx`)
   - Changed AdSense `<Script>` strategy from `"afterInteractive"` to `"lazyOnload"`
   - Confirmed `google-adsense-account` meta tag present in `metadata.other` (line 75)

### Lint Result
- `bun run lint` — passes cleanly, no errors
