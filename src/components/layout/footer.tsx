'use client'

import { Heart, TrendingUp, Shield, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded gradient-neon flex items-center justify-center">
                <span className="text-black font-bold text-[10px]">BC</span>
              </div>
              <span className="font-bold gradient-neon-text text-sm">BetCalc Pro</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ferramentas inteligentes para apostadores. Calcule, simule e gerencie com precisão.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-neon" /> Ferramentas
            </h4>
            <ul className="space-y-1.5">
              {['Martingale', 'Fibonacci', 'Gestão de Banca', 'Crash Simulator'].map((tool) => (
                <li key={tool}>
                  <span className="text-xs text-muted-foreground hover:text-neon cursor-pointer transition-colors">{tool}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1">
              <Shield className="h-3 w-3 text-neon-blue" /> Recursos
            </h4>
            <ul className="space-y-1.5">
              {['Blog', 'Estratégias', 'Guia Iniciante', 'FAQ'].map((item) => (
                <li key={item}>
                  <span className="text-xs text-muted-foreground hover:text-neon-blue cursor-pointer transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1">
              <Mail className="h-3 w-3 text-neon" /> Newsletter
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              Receba dicas e estratégias no seu email.
            </p>
            <div className="flex gap-1">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 h-8 px-2 text-xs bg-muted/50 border border-border rounded-md focus:border-neon/50 focus:ring-1 focus:ring-neon/20"
              />
              <button className="h-8 px-3 text-[10px] font-bold rounded-md gradient-neon text-black hover:opacity-90 transition-opacity">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-4 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-muted-foreground">
            © 2025 BetCalc Pro. Todas as ferramentas são para fins educacionais. Jogue com responsabilidade.
          </p>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="h-3 w-3 text-red-500 fill-red-500" /> para apostadores inteligentes
          </p>
        </div>
      </div>
    </footer>
  )
}
