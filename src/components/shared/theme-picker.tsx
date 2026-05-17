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
}

export const colorThemes: ColorThemeOption[] = [
  { id: 'neon-green', name: 'Neon Verde', color: '#059669', darkColor: '#00ff88' },
  { id: 'neon-blue', name: 'Neon Azul', color: '#0284c7', darkColor: '#00d4ff' },
  { id: 'neon-purple', name: 'Neon Roxo', color: '#7c3aed', darkColor: '#a855f7' },
  { id: 'neon-pink', name: 'Neon Rosa', color: '#db2777', darkColor: '#f472b6' },
  { id: 'neon-orange', name: 'Neon Laranja', color: '#ea580c', darkColor: '#fb923c' },
  { id: 'neon-red', name: 'Neon Vermelho', color: '#dc2626', darkColor: '#f87171' },
  { id: 'ocean', name: 'Oceano', color: '#0d9488', darkColor: '#14b8a6' },
  { id: 'gold', name: 'Ouro', color: '#ca8a04', darkColor: '#eab308' },
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
            className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full ring-1 ring-background"
            style={{ backgroundColor: activeColor ? (theme === 'dark' ? activeColor.darkColor : activeColor.color) : 'var(--neon)' }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="end">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tema de Cor</p>
          <div className="grid grid-cols-4 gap-2">
            {colorThemes.map((ct) => {
              const isActive = colorTheme === ct.id
              const displayColor = theme === 'dark' ? ct.darkColor : ct.color
              return (
                <button
                  key={ct.id}
                  onClick={() => handleSelect(ct.id)}
                  className="group relative flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-muted/50"
                  title={ct.name}
                  aria-label={`Tema ${ct.name}`}
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-background transition-all"
                    style={{
                      backgroundColor: displayColor,
                      ringColor: isActive ? displayColor : 'transparent',
                      boxShadow: isActive ? `0 0 8px ${displayColor}40` : 'none',
                    }}
                  >
                    {isActive && <Check className="h-3.5 w-3.5 text-white drop-shadow-sm" />}
                  </span>
                  <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors leading-tight text-center">
                    {ct.name.replace('Neon ', '')}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
