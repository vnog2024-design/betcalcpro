'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  LogOut,
  Shield,
  Menu,
  X,
  KeyRound,
  ArrowLeft,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/postagens', label: 'Postagens', icon: FileText },
  { href: '/admin/anuncios', label: 'Anúncios', icon: Megaphone },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [username, setUsername] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [changePwdOpen, setChangePwdOpen] = useState(false)
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [pwdError, setPwdError] = useState('')
  const [pwdSuccess, setPwdSuccess] = useState(false)
  const [pwdLoading, setPwdLoading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/auth/session')
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) {
          router.push('/admin/login')
        } else {
          setUsername(d.username)
        }
      })
      .catch(() => router.push('/admin/login'))
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const handleChangePassword = async () => {
    setPwdError('')
    setPwdSuccess(false)
    if (newPwd !== confirmPwd) {
      setPwdError('As senhas não coincidem')
      return
    }
    if (newPwd.length < 6) {
      setPwdError('Nova senha deve ter no mínimo 6 caracteres')
      return
    }
    setPwdLoading(true)
    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: currentPwd, newPassword: newPwd }),
      })
      const data = await res.json()
      if (res.ok) {
        setPwdSuccess(true)
        setCurrentPwd('')
        setNewPwd('')
        setConfirmPwd('')
        setTimeout(() => {
          setChangePwdOpen(false)
          setPwdSuccess(false)
        }, 2000)
      } else {
        setPwdError(data.error || 'Erro ao alterar senha')
      }
    } catch {
      setPwdError('Erro de conexão')
    } finally {
      setPwdLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">BetCalc Pro</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Admin Panel</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Separator className="bg-gray-800" />

        <ScrollArea className="flex-1 py-3 px-2">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href)
                    setSidebarOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-green-500/10 text-green-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="p-3 border-t border-gray-800 space-y-1">
          <div className="px-3 py-1.5">
            <div className="text-xs text-gray-500">Logado como</div>
            <div className="text-sm font-medium text-gray-300">{username}</div>
          </div>
          <button
            onClick={() => setChangePwdOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <KeyRound className="w-4 h-4" />
            Alterar Senha
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-gray-800 bg-gray-900/50 backdrop-blur flex items-center px-4 gap-3 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <ArrowLeft
              className="w-4 h-4 cursor-pointer hover:text-white transition-colors"
              onClick={() => router.push('/')}
            />
            <span className="hidden sm:inline">Voltar ao site</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={changePwdOpen} onOpenChange={setChangePwdOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription className="text-gray-400">
              Digite sua senha atual e a nova senha desejada.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {pwdError && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {pwdError}
              </div>
            )}
            {pwdSuccess && (
              <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                Senha alterada com sucesso!
              </div>
            )}
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">Senha Atual</Label>
              <Input
                type="password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">Nova Senha</Label>
              <Input
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">Confirmar Nova Senha</Label>
              <Input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setChangePwdOpen(false)} className="text-gray-400">
              Cancelar
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={pwdLoading}
              className="bg-green-600 hover:bg-green-500 text-white"
            >
              {pwdLoading ? 'Salvando...' : 'Salvar Senha'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}