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
