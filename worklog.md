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
