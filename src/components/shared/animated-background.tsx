'use client'

import { useAppStore } from '@/store/app-store'
import { colorThemes } from '@/components/shared/theme-picker'

export function AnimatedBackground() {
  const { colorTheme, theme } = useAppStore()
  
  const activeTheme = colorThemes.find((t) => t.id === colorTheme)
  const accentColor = activeTheme ? (theme === 'dark' ? activeTheme.darkColor : activeTheme.color) : '#00ff88'
  
  // Convert hex to rgb for rgba usage
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 255, 136'
  }
  
  const rgb = hexToRgb(accentColor)

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 grain-texture opacity-[0.03] dark:opacity-[0.04]" />

      {/* Floating gradient orbs — uses theme accent color */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full animate-float-orb-1"
        style={{ background: `radial-gradient(circle, rgba(${rgb}, 0.08) 0%, transparent 70%)` }}
      />
      <div 
        className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full animate-float-orb-2"
        style={{ background: `radial-gradient(circle, rgba(${rgb}, 0.06) 0%, transparent 70%)` }}
      />
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[450px] h-[450px] rounded-full animate-float-orb-3"
        style={{ background: `radial-gradient(circle, rgba(${rgb}, 0.05) 0%, transparent 70%)` }}
      />
      <div 
        className="absolute top-[60%] left-[50%] w-[350px] h-[350px] rounded-full animate-float-orb-4"
        style={{ background: `radial-gradient(circle, rgba(${rgb}, 0.04) 0%, transparent 70%)` }}
      />
      <div 
        className="absolute top-[10%] right-[30%] w-[300px] h-[300px] rounded-full animate-float-orb-5"
        style={{ background: `radial-gradient(circle, rgba(${rgb}, 0.04) 0%, transparent 70%)` }}
      />
    </div>
  )
}
