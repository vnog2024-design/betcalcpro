'use client'

import { TrendingUp, Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded gradient-neon flex items-center justify-center">
                <span className="text-black font-bold text-xs">BC</span>
              </div>
              <span className="font-bold gradient-neon-text text-lg">BetCalc Pro</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ferramentas gratuitas para apostadores. Calculadoras, simuladores e estratégias para gerenciar sua banca.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-neon" /> Ferramentas
            </h4>
            <ul className="space-y-2">
              {['Martingale', 'Fibonacci', 'Gestão de Banca', 'Simulador Crash', 'Soros'].map((tool) => (
                <li key={tool}>
                  <span className="text-sm text-muted-foreground hover:text-neon cursor-pointer transition-colors">{tool}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-neon-blue" /> Informações
            </h4>
            <ul className="space-y-2">
              {['Política de Privacidade', 'Termos de Uso', 'Jogo Responsável', 'Contato'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-neon-blue cursor-pointer transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-4 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © 2025 BetCalc Pro. Ferramentas para fins educacionais. Jogue com responsabilidade.
          </p>
          <p className="text-xs text-muted-foreground">
            18+ apenas. As ferramentas não garantem lucro.
          </p>
        </div>
      </div>
    </footer>
  )
}
