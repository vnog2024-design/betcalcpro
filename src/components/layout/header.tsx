'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppStore, toolInfo, type ToolPage } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Menu, X, User, Sun, Moon } from 'lucide-react'
import { ThemePicker } from '@/components/shared/theme-picker'
import { SiteSearch } from '@/components/shared/site-search'
import { cn } from '@/lib/utils'

const quickNavTools: ToolPage[] = ['martingale', 'bankroll', 'fibonacci', 'soros']

export function Header() {
  const { sidebarOpen, setSidebarOpen, isLoggedIn, userName, theme, setTheme, colorTheme } = useAppStore()
  const pathname = usePathname()

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
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo-icon.png" 
              alt="BetCalc Pro" 
              className="h-9 w-9 rounded-lg object-cover"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-neon-text">BetCalc Pro</h1>
            </div>
          </Link>
        </div>

        {/* Center: Quick nav (desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {quickNavTools.map((page) => {
            const href = page === 'home' ? '/' : `/${page}`
            const isActive = pathname === href
            return (
              <Link key={page} href={href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'text-sm',
                    isActive
                      ? 'text-neon bg-neon-dim'
                      : 'text-muted-foreground hover:text-neon hover:bg-neon-dim'
                  )}
                >
                  {toolInfo[page].name}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Site Search */}
          <SiteSearch />

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
          <Link href="/user-panel">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-neon gap-2"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">
                {isLoggedIn ? userName : 'Entrar'}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
