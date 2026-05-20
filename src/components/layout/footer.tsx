'use client'

import Link from 'next/link'
import { TrendingUp, Shield, Mail, Heart, Info, Cookie, FileText, AlertTriangle } from 'lucide-react'

const toolLinks: { label: string; href: string }[] = [
  { label: 'Martingale', href: '/martingale' },
  { label: 'Fibonacci', href: '/fibonacci' },
  { label: 'Gestão de Capital', href: '/bankroll' },
  { label: 'Soros', href: '/soros' },
  { label: 'Masaniello', href: '/masaniello' },
  { label: 'Artigos', href: '/artigos' },
]

const legalLinks: { label: string; href: string; icon: React.ReactNode }[] = [
  { label: 'Política de Privacidade', href: '/privacy', icon: <Shield className="h-3.5 w-3.5" /> },
  { label: 'Termos de Uso', href: '/terms', icon: <FileText className="h-3.5 w-3.5" /> },
  { label: 'Uso Responsável', href: '/responsible-gaming', icon: <Heart className="h-3.5 w-3.5" /> },
  { label: 'Política de Cookies', href: '/cookies', icon: <Cookie className="h-3.5 w-3.5" /> },
  { label: 'Sobre Nós', href: '/about', icon: <Info className="h-3.5 w-3.5" /> },
  { label: 'Contato', href: '/contact', icon: <Mail className="h-3.5 w-3.5" /> },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img 
                src="/logo-icon.png" 
                alt="BetCalc Pro" 
                className="h-7 w-7 rounded object-cover"
              />
              <span className="font-bold gradient-neon-text text-lg">BetCalc Pro</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Ferramentas educacionais gratuitas para probabilidade, estatística e gestão de risco. Calculadoras, simuladores e conteúdo educativo para decisões conscientes.
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
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-muted-foreground hover:text-neon transition-colors"
                  >
                    {tool.label}
                  </Link>
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
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-neon-blue transition-colors"
                  >
                    {link.icon} {link.label}
                  </Link>
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
                Não operamos plataformas de apostas, não aceitamos depósitos e não incentivamos atividades de risco.
              </p>
              <p>
                As ferramentas não garantem resultados. Utilize-as de forma responsável e nunca tome decisões baseando-se exclusivamente em simulações.
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
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-neon-blue transition-colors">
                Privacidade
              </Link>
              <span className="text-border">•</span>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-neon-blue transition-colors">
                Termos
              </Link>
              <span className="text-border">•</span>
              <Link href="/cookies" className="text-xs text-muted-foreground hover:text-neon-blue transition-colors">
                Cookies
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] text-muted-foreground/60">
            <span>Este site exibe anúncios do Google AdSense.</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Ao utilizar nosso site, você concorda com nossos{' '}
              <Link href="/terms" className="text-[11px] text-muted-foreground/60 hover:text-neon-blue underline transition-colors">
                Termos de Uso
              </Link>{' '}
              e{' '}
              <Link href="/privacy" className="text-[11px] text-muted-foreground/60 hover:text-neon-blue underline transition-colors">
                Política de Privacidade
              </Link>.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
