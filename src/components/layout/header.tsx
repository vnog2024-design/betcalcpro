'use client'

import { useAppStore, toolInfo, type ToolPage } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Bell, Menu, X, User, Star, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { sidebarOpen, setSidebarOpen, notifications, achievements, isLoggedIn, userName, setCurrentPage } = useAppStore()
  const unreadCount = notifications.filter(n => !n.read).length
  const unlockedCount = achievements.filter(a => a.unlockedAt).length

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-neon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="h-8 w-8 rounded-lg gradient-neon flex items-center justify-center">
              <span className="text-black font-bold text-sm">BC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold gradient-neon-text">BetCalc Pro</h1>
            </div>
          </button>
        </div>

        {/* Center: Quick nav (desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {(['martingale', 'bankroll', 'crash-simulator', 'fibonacci'] as ToolPage[]).map((page) => (
            <Button
              key={page}
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="text-muted-foreground hover:text-neon hover:bg-neon-dim text-xs"
            >
              {toolInfo[page].name}
            </Button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-neon">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 text-white border-0">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 bg-card border-border">
              <div className="p-3 border-b border-border">
                <h3 className="font-semibold text-sm">Notificações</h3>
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  Nenhuma notificação
                </div>
              ) : (
                notifications.slice(0, 5).map((n) => (
                  <DropdownMenuItem key={n.id} className="p-3 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{n.title}</span>
                      <span className="text-xs text-muted-foreground">{n.message}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Achievements */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-neon hidden sm:flex"
            onClick={() => setCurrentPage('user-panel')}
          >
            <Trophy className="h-4 w-4" />
            {unlockedCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-neon text-black border-0">
                {unlockedCount}
              </Badge>
            )}
          </Button>

          {/* User */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage('user-panel')}
            className="text-muted-foreground hover:text-neon gap-2"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">
              {isLoggedIn ? userName : 'Entrar'}
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}
