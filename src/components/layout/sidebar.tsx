'use client'

import { useAppStore, toolInfo, type ToolPage } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { X, Home, TrendingUp, Wallet, Zap, Dice5, BarChart3, Calculator, RotateCcw, Coins, Shield, Search, Percent, Sparkles, User, Star, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AdSidebar } from '@/components/shared/ad-banner'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, TrendingUp, Wallet, Zap, Dice5, BarChart3, Calculator, RotateCcw, Coins, Shield, Search, Percent, Sparkles, User,
}

const toolGroups = [
  { label: 'Menu', tools: ['home'] as ToolPage[] },
  { label: 'Calculadoras', tools: ['martingale', 'bankroll', 'fibonacci', 'masaniello', 'loss-recovery', 'soros', 'recovery'] as ToolPage[] },
  { label: 'Simuladores', tools: ['crash-simulator', 'double-simulator', 'sequence-analyzer', 'probability-simulator', 'strategy-generator'] as ToolPage[] },
  { label: 'Conta', tools: ['user-panel'] as ToolPage[] },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { currentPage, setCurrentPage, favorites, isFavorite } = useAppStore()

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
                    return (
                      <Button
                        key={fav.toolId}
                        variant={currentPage === fav.toolId ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setCurrentPage(fav.toolId)}
                        className={cn(
                          'w-full justify-start gap-2 text-sm h-9',
                          currentPage === fav.toolId && 'bg-neon-dim text-neon border border-neon/20'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {info.name}
                      </Button>
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
                    const info = toolInfo[toolId]
                    const Icon = iconMap[info.icon] || Calculator
                    const active = currentPage === toolId
                    const fav = isFavorite(toolId)
                    return (
                      <Button
                        key={toolId}
                        variant={active ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setCurrentPage(toolId)}
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
                    )
                  })}
                </div>
                {group.label !== 'Conta' && <Separator className="my-3 bg-border/50" />}
              </div>
            ))}

            {/* Sidebar Ad */}
            <AdSidebar className="mt-4" />
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
