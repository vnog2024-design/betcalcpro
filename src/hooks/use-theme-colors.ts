'use client'

import { useAppStore } from '@/store/app-store'
import { colorThemes } from '@/components/shared/theme-picker'

/**
 * Hook that provides actual computed color values for the current theme.
 * Use this for components that need real color values (e.g., Recharts SVG props)
 * since CSS variables like var(--neon) may not work in all SVG attribute contexts.
 */
export function useThemeColors() {
  const { colorTheme, theme } = useAppStore()
  
  const activeTheme = colorThemes.find((t) => t.id === colorTheme)
  const fallback = colorThemes[0] // neon-green
  
  const ct = activeTheme || fallback
  const isDark = theme === 'dark'
  
  const neon = isDark ? ct.darkColor : ct.color
  const neonBlue = isDark 
    ? (colorThemes.find(t => t.id === colorTheme)?.darkColor || '#00d4ff') 
    : (colorThemes.find(t => t.id === colorTheme)?.color || '#0284c7')

  // Helper to create rgba from hex
  const hexToRgba = (hex: string, alpha: number): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return `rgba(0, 255, 136, ${alpha})`
    return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
  }

  return {
    neon,
    neonBlue,
    neonDim: hexToRgba(neon, 0.15),
    neonWithAlpha: (alpha: number) => hexToRgba(neon, alpha),
    neonBlueWithAlpha: (alpha: number) => hexToRgba(neonBlue, alpha),
    isDark,
  }
}
