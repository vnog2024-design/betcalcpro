'use client'

import { useAppStore, type ToolPage } from '@/store/app-store'
import { TrendingUp, Shield, Mail, Heart, Info, Cookie, FileText, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const toolLinks: { label: string; page: ToolPage }[] = [
  { label: 'Martingale', page: 'martingale' },
  { label: 'Fibonacci', page: 'fibonacci' },
  { label: 'Gestão de Banca', page: 'bankroll' },
  { label: 'Simulador Crash', page: 'crash-simulator' },
  { label: 'Soros', page: 'soros' },
  { label: 'Masaniello', page: 'masaniello' },
]

const legalLinks: { label: string; page: ToolPage; icon: React.ReactNode }[] = [
  { label: 'Política de Privacidade', page: 'privacy', icon: <Shield className="h-3.5 w-3.5" /> },
  { label: 'Termos de Uso', page: 'terms', icon: <FileText className="h-3.5 w-3.5" /> },
  { label: 'Jogo Responsável', page: 'responsible-gaming', icon: <Heart className="h-3.5 w-3.5" /> },
  { label: 'Política de Cookies', page: 'cookies', icon: <Cookie className="h-3.5 w-3.5" /> },
  { label: 'Sobre Nós', page: 'about', icon: <Info className="h-3.5 w-3.5" /> },
  { label: 'Contato', page: 'contact', icon: <Mail className="h-3.5 w-3.5" /> },
]

export function Footer() {
  const { setCurrentPage } = useAppStore()

  return (
    <footer className="mt-auto border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded gradient-neon flex items-center justify-center">
                <span className="text-black font-bold text-xs">BC</span>
              </div>
              <span className="font-bold gradient-neon-text text-lg">BetCalc Pro</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Ferramentas educacionais gratuitas para apostadores. Calculadoras, simuladores e estratégias para gerenciar sua banca com responsabilidade.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-amber-500/80">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span>Conteúdo para maiores de 18 anos</span>
            </div>
          </div>

          {/* Ferramentas */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-neon" /> Ferramentas
            </h4>
            <ul className="space-y-1.5">
              {toolLinks.map((tool) => (
                <li key={tool.page}>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-neon transition-colors justify-start"
                    onClick={() => setCurrentPage(tool.page)}
                  >
                    {tool.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-neon-blue" /> Legal
            </h4>
            <ul className="space-y-1.5">
              {legalLinks.map((link) => (
                <li key={link.page}>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-neon-blue transition-colors justify-start gap-1.5"
                    onClick={() => setCurrentPage(link.page)}
                  >
                    {link.icon} {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Aviso Importante */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Aviso Importante
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>
                O BetCalc Pro é uma ferramenta <strong className="text-foreground">educacional</strong>. 
                Não operamos jogos de azar, não aceitamos apostas e não incentivamos o jogo.
              </p>
              <p>
                As ferramentas não garantem lucro. Jogue sempre com responsabilidade e nunca aposte mais do que pode perder.
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center justify-center h-5 px-1.5 rounded bg-amber-500/10 text-amber-500 font-bold text-[10px]">
                  18+
                </span>
                <span>Proibido para menores de 18 anos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-4 border-t border-border/30 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} BetCalc Pro. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-neon-blue"
                onClick={() => setCurrentPage('privacy')}
              >
                Privacidade
              </Button>
              <span className="text-border">•</span>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-neon-blue"
                onClick={() => setCurrentPage('terms')}
              >
                Termos
              </Button>
              <span className="text-border">•</span>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-neon-blue"
                onClick={() => setCurrentPage('cookies')}
              >
                Cookies
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] text-muted-foreground/60">
            <span>Este site exibe anúncios do Google AdSense.</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Ao utilizar nosso site, você concorda com nossos{' '}
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-[11px] text-muted-foreground/60 hover:text-neon-blue underline"
                onClick={() => setCurrentPage('terms')}
              >
                Termos de Uso
              </Button>{' '}
              e{' '}
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-[11px] text-muted-foreground/60 hover:text-neon-blue underline"
                onClick={() => setCurrentPage('privacy')}
              >
                Política de Privacidade
              </Button>.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
