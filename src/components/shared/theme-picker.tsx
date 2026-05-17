'use client'

import { useAppStore } from '@/store/app-store'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Palette, Check } from 'lucide-react'

export interface ColorThemeOption {
  id: string
  name: string
  color: string
  darkColor: string
  emoji: string
}

export const colorThemes: ColorThemeOption[] = [
  { id: 'neon-green', name: 'Neon Verde', color: '#059669', darkColor: '#00ff88', emoji: '🟢' },
  { id: 'neon-blue', name: 'Neon Azul', color: '#0284c7', darkColor: '#00d4ff', emoji: '🔵' },
  { id: 'neon-purple', name: 'Neon Roxo', color: '#7c3aed', darkColor: '#a855f7', emoji: '🟣' },
  { id: 'neon-pink', name: 'Neon Rosa', color: '#db2777', darkColor: '#f472b6', emoji: '🩷' },
  { id: 'neon-orange', name: 'Neon Laranja', color: '#ea580c', darkColor: '#fb923c', emoji: '🟠' },
  { id: 'neon-red', name: 'Neon Vermelho', color: '#dc2626', darkColor: '#f87171', emoji: '🔴' },
  { id: 'ocean', name: 'Oceano', color: '#0d9488', darkColor: '#14b8a6', emoji: '🌊' },
  { id: 'gold', name: 'Ouro', color: '#ca8a04', darkColor: '#eab308', emoji: '🟡' },
]

export function ThemePicker() {
  const { colorTheme, setColorTheme, theme } = useAppStore()

  const handleSelect = (id: string) => {
    setColorTheme(id)
    document.documentElement.setAttribute('data-color-theme', id)
  }

  const activeColor = colorThemes.find((t) => t.id === colorTheme)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-neon relative"
          aria-label="Mudar tema de cor"
        >
          <Palette className="h-5 w-5" />
          <span
            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-background transition-colors duration-300"
            style={{ 
              backgroundColor: activeColor ? (theme === 'dark' ? activeColor.darkColor : activeColor.color) : 'var(--neon)',
              boxShadow: `0 0 6px ${activeColor ? (theme === 'dark' ? activeColor.darkColor : activeColor.color) : 'var(--neon)'}60`
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="end">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tema de Cor</p>
            <span className="text-[10px] text-muted-foreground">
              {activeColor?.name || 'Neon Verde'}
            </span>
          </div>
          
          {/* Preview bar */}
          <div 
            className="h-1.5 w-full rounded-full transition-all duration-500"
            style={{ 
              background: `linear-gradient(90deg, ${activeColor ? (theme === 'dark' ? activeColor.darkColor : activeColor.color) : '#00ff88'}, ${activeColor ? (theme === 'dark' ? activeColor.darkColor : activeColor.color) : '#00ff88'}60)` 
            }}
          />

          <div className="grid grid-cols-4 gap-1.5">
            {colorThemes.map((ct) => {
              const isActive = colorTheme === ct.id
              const displayColor = theme === 'dark' ? ct.darkColor : ct.color
              return (
                <button
                  key={ct.id}
                  onClick={() => handleSelect(ct.id)}
                  className={`
                    group relative flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all duration-200
                    ${isActive ? 'bg-muted' : 'hover:bg-muted/50'}
                  `}
                  title={ct.name}
                  aria-label={`Tema ${ct.name}`}
                >
                  <span
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300
                      ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                    `}
                    style={{
                      backgroundColor: displayColor,
                      boxShadow: isActive 
                        ? `0 0 12px ${displayColor}50, 0 0 4px ${displayColor}30` 
                        : `0 0 0px transparent`,
                    }}
                  >
                    {isActive && <Check className="h-4 w-4 text-white drop-shadow-sm" />}
                  </span>
                  <span className={`
                    text-[10px] leading-tight text-center transition-colors duration-200
                    ${isActive ? 'text-foreground font-semibold' : 'text-muted-foreground group-hover:text-foreground'}
                  `}>
                    {ct.name.replace('Neon ', '')}
                  </span>
                </button>
              )
            })}
          </div>
          
          <p className="text-[10px] text-muted-foreground/60 text-center">
            Clique para alterar a cor de destaque
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
