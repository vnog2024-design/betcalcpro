'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppStore, toolInfo, toolHref, type ToolPage } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { X, Home, TrendingUp, Wallet, BarChart3, Calculator, Coins, Shield, Search, Percent, Sparkles, User, Star, ChevronRight, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, TrendingUp, Wallet, BarChart3, Calculator, Coins, Shield, Search, Percent, Sparkles, User, BookOpen,
}

const toolGroups = [
  { label: 'Menu', tools: ['home'] as const },
  { label: 'Calculadoras', tools: ['martingale', 'bankroll', 'fibonacci', 'masaniello', 'soros', 'recovery'] as const },
  { label: 'Simuladores', tools: ['sequence-analyzer', 'probability-simulator', 'strategy-generator'] as const },
  { label: 'Conteúdo', tools: ['artigos'] as const },
  { label: 'Conta', tools: ['user-panel'] as const },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { favorites, isFavorite } = useAppStore()
  const pathname = usePathname()

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          'fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-card/50 backdrop-blur-xl border-r border-border/50 transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <ScrollArea className="h-full">
          <div className="p-4 space-y-5">
            <div className="flex items-center justify-between lg:hidden">
              <span className="text-base font-semibold text-muted-foreground">Menu</span>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-9 w-9">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {favorites.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-neon" /> Favoritos
                </h3>
                <div className="space-y-1">
                  {favorites.map((fav) => {
                    const info = toolInfo[fav.toolId]
                    const Icon = iconMap[info.icon] || Calculator
                    const href = toolHref[fav.toolId]
                    const active = pathname === href
                    return (
                      <Link key={fav.toolId} href={href} onClick={onClose}>
                        <Button
                          variant={active ? 'secondary' : 'ghost'}
                          size="sm"
                          className={cn(
                            'w-full justify-start gap-2 text-sm h-9',
                            active && 'bg-neon-dim text-neon border border-neon/20'
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {info.name}
                        </Button>
                      </Link>
                    )
                  })}
                </div>
                <Separator className="my-3 bg-border/50" />
              </div>
            )}

            {toolGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {group.label}
                </h3>
                <div className="space-y-0.5">
                  {group.tools.map((toolId) => {
                    const info = toolInfo[toolId as ToolPage]
                    const Icon = iconMap[info.icon] || Calculator
                    const href = toolHref[toolId as ToolPage]
                    const active = pathname === href
                    const fav = isFavorite(toolId as ToolPage)
                    return (
                      <Link key={toolId} href={href} onClick={onClose}>
                        <Button
                          variant={active ? 'secondary' : 'ghost'}
                          size="sm"
                          className={cn(
                            'w-full justify-start gap-2 text-sm h-10 group',
                            active && 'bg-neon-dim text-neon border border-neon/20'
                          )}
                        >
                          <Icon className={cn('h-4 w-4', active && 'text-neon')} />
                          <span className="flex-1 text-left truncate">{info.name}</span>
                          {fav && <Star className="h-3.5 w-3.5 text-neon fill-neon" />}
                          {active && <ChevronRight className="h-3.5 w-3.5 text-neon ml-auto" />}
                        </Button>
                      </Link>
                    )
                  })}
                </div>
                {group.label !== 'Conta' && <Separator className="my-3 bg-border/50" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
