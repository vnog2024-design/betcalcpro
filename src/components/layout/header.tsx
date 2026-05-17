'use client'

import { useAppStore, toolInfo, type ToolPage } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Menu, X, User, Sun, Moon } from 'lucide-react'
import { ThemePicker } from '@/components/shared/theme-picker'

export function Header() {
  const { sidebarOpen, setSidebarOpen, isLoggedIn, userName, setCurrentPage, theme, setTheme, colorTheme } = useAppStore()

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

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
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="h-9 w-9 rounded-lg gradient-neon flex items-center justify-center">
              <span className="text-black font-bold text-base">BC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-neon-text">BetCalc Pro</h1>
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
              className="text-muted-foreground hover:text-neon hover:bg-neon-dim text-sm"
            >
              {toolInfo[page].name}
            </Button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Color theme picker */}
          <ThemePicker />

          {/* Dark/Light toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-neon"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* User */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage('user-panel')}
            className="text-muted-foreground hover:text-neon gap-2"
          >
            <User className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">
              {isLoggedIn ? userName : 'Entrar'}
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}
