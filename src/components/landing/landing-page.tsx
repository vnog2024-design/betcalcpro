'use client'

import { useAppStore, toolInfo, type ToolPage } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdInContent } from '@/components/shared/ad-banner'
import { 
  TrendingUp, Zap, BarChart3, Calculator, Sparkles, 
  ArrowRight, ChevronRight, Target, Coins, AlertTriangle,
  RotateCcw, Search, Percent, Shield
} from 'lucide-react'

const allTools: { id: ToolPage; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { id: 'martingale', icon: TrendingUp, color: 'neon' },
  { id: 'bankroll', icon: Coins, color: 'neon-blue' },
  { id: 'crash-simulator', icon: Zap, color: 'amber-500' },
  { id: 'fibonacci', icon: BarChart3, color: 'purple-500' },
  { id: 'soros', icon: Coins, color: 'neon' },
  { id: 'masaniello', icon: Calculator, color: 'neon-blue' },
  { id: 'double-simulator', icon: BarChart3, color: 'amber-500' },
  { id: 'loss-recovery', icon: RotateCcw, color: 'purple-500' },
  { id: 'recovery', icon: Shield, color: 'neon' },
  { id: 'sequence-analyzer', icon: Search, color: 'neon-blue' },
  { id: 'probability-simulator', icon: Percent, color: 'amber-500' },
  { id: 'strategy-generator', icon: Sparkles, color: 'purple-500' },
]

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  'neon': { bg: 'bg-neon/10', text: 'text-neon', border: 'border-neon/20' },
  'neon-blue': { bg: 'bg-neon-blue/10', text: 'text-neon-blue', border: 'border-neon-blue/20' },
  'amber-500': { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
  'purple-500': { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
}

export function LandingPage() {
  const { setCurrentPage } = useAppStore()

  const calculators = allTools.filter(t => toolInfo[t.id].category === 'calculators')
  const simulators = allTools.filter(t => toolInfo[t.id].category === 'simulators')

  return (
    <div className="space-y-10 pb-8">
      {/* Hero — Clean and direct */}
      <section className="relative overflow-hidden rounded-2xl border border-neon/20 bg-gradient-to-br from-card via-card to-card/50 p-8 sm:p-12 lg:p-16">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">
            Ferramentas para <span className="gradient-neon-text">Apostadores</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Calculadoras, simuladores e análises gratuitas. 
            Tudo o que você precisa para gerenciar sua banca e tomar decisões melhores.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={() => setCurrentPage('martingale')}
              className="gradient-neon text-black font-bold hover:opacity-90 text-base h-12 px-6"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Calculadora Martingale
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentPage('bankroll')}
              className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 text-base h-12 px-6"
            >
              Gestão de Banca
            </Button>
          </div>
        </div>
      </section>

      {/* All Calculators */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Calculadoras</h2>
        <p className="text-base text-muted-foreground mb-6">Calcule progressões, banca e recuperações</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.map((tool) => {
            const info = toolInfo[tool.id]
            const color = colorMap[tool.color]
            return (
              <Card
                key={tool.id}
                className={`card-hover border-border/50 bg-card/50 backdrop-blur cursor-pointer group ${color.border}`}
                onClick={() => setCurrentPage(tool.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex p-2.5 rounded-lg ${color.bg}`}>
                      <tool.icon className={`h-5 w-5 ${color.text}`} />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-neon transition-colors">{info.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-sm text-neon font-medium">
                    Usar <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Ad */}
      <AdInContent />

      {/* Simulators */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Simuladores</h2>
        <p className="text-base text-muted-foreground mb-6">Simule resultados e teste estratégias</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {simulators.map((tool) => {
            const info = toolInfo[tool.id]
            const color = colorMap[tool.color]
            return (
              <Card
                key={tool.id}
                className={`card-hover border-border/50 bg-card/50 backdrop-blur cursor-pointer group ${color.border}`}
                onClick={() => setCurrentPage(tool.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex p-2.5 rounded-lg ${color.bg}`}>
                      <tool.icon className={`h-5 w-5 ${color.text}`} />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-neon transition-colors">{info.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-sm text-neon font-medium">
                    Usar <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Education — factual, not selling */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Gestão de Banca</h2>
        <p className="text-base text-muted-foreground mb-6">Princípios fundamentais para apostadores</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-5 space-y-4">
              {[
                { title: 'Regra do 1-2%', desc: 'Nunca arrisque mais de 1-2% da sua banca em uma única aposta.', icon: Target, color: 'text-neon' },
                { title: 'Stop Loss Diário', desc: 'Defina um limite de perdas diário. Ao atingir, pare.', icon: Shield, color: 'text-neon-blue' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-lg bg-muted/20">
                  <div className="p-2.5 rounded-lg bg-muted/30 h-fit">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="text-base font-semibold text-amber-500">Jogo Responsável</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                As ferramentas deste site são para fins educacionais. Não garantem lucro. 
                Apostas envolvem risco e você deve sempre jogar com responsabilidade.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-neon" />
                  Nunca aposte mais do que pode perder
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-neon-blue" />
                  Defina limites e respeite-os
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  Menores de 18 anos não podem apostar
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
