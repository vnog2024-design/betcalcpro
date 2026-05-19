'use client'

import Link from 'next/link'
import { toolInfo, toolHref, type ToolPage } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HeroVisual } from '@/components/shared/hero-visual'
import { 
  TrendingUp, BarChart3, Calculator, Sparkles, 
  ArrowRight, ChevronRight, Target, Coins, AlertTriangle,
  Search, Percent, Shield, BookOpen
} from 'lucide-react'

const allTools: { id: ToolPage; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { id: 'martingale', icon: TrendingUp, color: 'neon' },
  { id: 'bankroll', icon: Coins, color: 'neon-blue' },
  { id: 'fibonacci', icon: BarChart3, color: 'purple-500' },
  { id: 'soros', icon: Coins, color: 'neon' },
  { id: 'masaniello', icon: Calculator, color: 'neon-blue' },
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

const featuredArticles = [
  {
    slug: 'introducao-probabilidade',
    title: 'Introdução à Teoria das Probabilidades',
    desc: 'Aprenda os conceitos fundamentais da probabilidade e como aplicá-los na tomada de decisão.',
    icon: Calculator,
  },
  {
    slug: 'gestao-risco-capital',
    title: 'Gestão de Risco e Capital',
    desc: 'Princípios fundamentais de gestão de risco para proteger seu capital contra variações adversas.',
    icon: TrendingUp,
  },
  {
    slug: 'falacias-estatisticas',
    title: 'Falácias Estatísticas Comuns',
    desc: 'Conheça os vieses cognitivos mais comuns e aprenda a pensar de forma mais racional.',
    icon: AlertTriangle,
  },
]

export function LandingPage() {
  const calculators = allTools.filter(t => toolInfo[t.id]?.category === 'calculators')
  const simulators = allTools.filter(t => toolInfo[t.id]?.category === 'simulators')

  return (
    <div className="space-y-10 pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-neon/20 min-h-[420px] sm:min-h-[480px] flex items-center">
        <HeroVisual />
        
        <div className="relative z-10 w-full p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-neon neon-pulse" />
              <span className="text-xs font-medium text-neon">100% Gratuito</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">
              Ferramentas de{' '}
              <span className="gradient-neon-text">Probabilidade</span>{' '}
              e{' '}
              <span className="gradient-neon-text">Gestão de Risco</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Calculadoras, simuladores e artigos educacionais gratuitos. 
              Aprenda probabilidade, estatística e gestão de risco para tomar decisões mais informadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/martingale">
                <Button
                  size="lg"
                  className="gradient-neon text-black font-bold hover:opacity-90 text-base h-12 px-6 neon-glow"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Calculadora Martingale
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/artigos">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 text-base h-12 px-6"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Artigos Educacionais
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-8 pt-6 border-t border-border/30">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-neon" />
                <span className="text-sm text-muted-foreground"><span className="font-bold text-foreground">6</span> Calculadoras</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-neon-blue" />
                <span className="text-sm text-muted-foreground"><span className="font-bold text-foreground">3</span> Simuladores</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-muted-foreground"><span className="font-bold text-foreground">8</span> Artigos</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-neon" />
                <span className="text-sm text-muted-foreground"><span className="font-bold text-foreground">100%</span> Gratuito</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Calculadoras</h2>
        <p className="text-base text-muted-foreground mb-6">Calcule progressões, capital e cenários de risco</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.map((tool) => {
            const info = toolInfo[tool.id]
            if (!info) return null
            const color = colorMap[tool.color]
            const href = toolHref[tool.id] || `/${tool.id}`
            return (
              <Link key={tool.id} href={href}>
                <Card className={`card-hover border-border/50 bg-card/50 backdrop-blur cursor-pointer group ${color.border}`}>
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
              </Link>
            )
          })}
        </div>
      </section>

      {/* Simulators */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Simuladores</h2>
        <p className="text-base text-muted-foreground mb-6">Simule probabilidades e analise cenários</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {simulators.map((tool) => {
            const info = toolInfo[tool.id]
            if (!info) return null
            const color = colorMap[tool.color]
            const href = toolHref[tool.id] || `/${tool.id}`
            return (
              <Link key={tool.id} href={href}>
                <Card className={`card-hover border-border/50 bg-card/50 backdrop-blur cursor-pointer group ${color.border}`}>
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
              </Link>
            )
          })}
        </div>
      </section>

      {/* Articles Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Artigos Educacionais</h2>
            <p className="text-base text-muted-foreground">Aprenda probabilidade, estatística e gestão de risco</p>
          </div>
          <Link href="/artigos" className="hidden sm:flex items-center gap-1 text-sm text-neon font-medium hover:underline">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {featuredArticles.map((article) => {
            const Icon = article.icon
            return (
              <Link key={article.slug} href={`/artigos/${article.slug}`}>
                <Card className="card-hover border-border/50 bg-card/50 backdrop-blur cursor-pointer group h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5 text-neon" />
                      <h3 className="text-base font-bold group-hover:text-neon transition-colors">{article.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{article.desc}</p>
                    <div className="flex items-center gap-1 mt-3 text-sm text-neon font-medium">
                      Ler artigo <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
        <Link href="/artigos" className="sm:hidden flex items-center justify-center gap-1 text-sm text-neon font-medium mt-4 hover:underline">
          Ver todos os artigos <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Risk Management Principles */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Gestão de Risco</h2>
        <p className="text-base text-muted-foreground mb-6">Princípios fundamentais para tomada de decisão informada</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-5 space-y-4">
              {[
                { title: 'Regra do 1-2%', desc: 'Nunca arrisque mais de 1-2% do seu capital total em uma única operação.', icon: Target, color: 'text-neon' },
                { title: 'Stop Loss', desc: 'Defina um limite de perdas. Ao atingir, pare e reavalie sua estratégia.', icon: Shield, color: 'text-neon-blue' },
                { title: 'Diversificação', desc: 'Distribua seu capital entre diferentes operações para reduzir risco concentrado.', icon: BarChart3, color: 'text-purple-500' },
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
                <h3 className="text-base font-semibold text-amber-500">Aviso Importante</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                As ferramentas deste site são para fins <strong className="text-foreground">educacionais</strong>. 
                Não garantem resultados e não devem ser interpretadas como aconselhamento financeiro. 
                Toda decisão envolve risco e deve ser tomada com responsabilidade.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-neon" />
                  Nunca arrisque mais do que pode perder
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-neon-blue" />
                  Defina limites e respeite-os
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  Conteúdo para maiores de 18 anos
                </div>
              </div>
              <Link href="/responsible-gaming">
                <Button variant="outline" size="sm" className="mt-4 border-amber-500/30 text-amber-500 hover:bg-amber-500/10">
                  Saiba mais sobre uso responsável
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
