'use client'

import { useEffect, useState, useRef } from 'react'
import { useAppStore, toolInfo, type ToolPage } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, Zap, Shield, BarChart3, Calculator, Sparkles, 
  ArrowRight, Users, Activity, Star, ChevronRight, 
  Target, Coins, Brain, BookOpen, AlertTriangle, 
  RotateCcw, Search, Percent
} from 'lucide-react'

const featuredTools: ToolPage[] = ['martingale', 'bankroll', 'crash-simulator', 'fibonacci', 'soros', 'masaniello']
const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: TrendingUp,
  TrendingUp: TrendingUp,
  Wallet: Coins,
  Zap: Zap,
  Dice5: BarChart3,
  BarChart3: BarChart3,
  Calculator: Calculator,
  RotateCcw: RotateCcw,
  Coins: Coins,
  Shield: Shield,
  Search: Search,
  Percent: Percent,
  Sparkles: Sparkles,
  User: Users,
}

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [visible, target])

  return <div ref={ref}>{prefix}{count.toLocaleString()}{suffix}</div>
}

export function LandingPage() {
  const { setCurrentPage } = useAppStore()
  const [blogPosts] = useState([
    { title: 'Como Gerenciar Sua Banca em 2025', category: 'Gestão', readTime: '5 min' },
    { title: 'Martingale vs Fibonacci: Qual Escolher?', category: 'Estratégia', readTime: '7 min' },
    { title: '5 Erros Fatais de Apostadores Iniciantes', category: 'Dicas', readTime: '4 min' },
    { title: 'Estratégia Soros: Guia Completo', category: 'Estratégia', readTime: '8 min' },
  ])

  return (
    <div className="space-y-16 pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-neon/20 bg-gradient-to-br from-card via-card to-card/50 p-6 sm:p-10 lg:p-16 neon-glow">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl">
          <Badge className="mb-4 bg-neon/10 text-neon border-neon/30 hover:bg-neon/20">
            <Sparkles className="h-3 w-3 mr-1" /> Nova Ferramenta
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            Ferramentas <span className="gradient-neon-text">Inteligentes</span> para Apostadores
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Calculadoras avançadas, simuladores em tempo real e estratégias comprovadas. 
            Maximize seus lucros e gerencie riscos com precisão cirúrgica.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={() => setCurrentPage('martingale')}
              className="gradient-neon text-black font-bold hover:opacity-90 text-sm"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Calculadora Martingale
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentPage('strategy-generator')}
              className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 text-sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Gerar Estratégia
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Cálculos Realizados', value: 284500, suffix: '+', icon: Calculator, color: 'neon' },
          { label: 'Apostadores Ativos', value: 12847, suffix: '', icon: Users, color: 'neon-blue' },
          { label: 'Ferramentas Premium', value: 12, suffix: '', icon: Activity, color: 'neon' },
          { label: 'Estratégias Salvas', value: 45200, suffix: '+', icon: Star, color: 'neon-blue' },
        ].map((stat) => (
          <Card key={stat.label} className="card-hover border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-4 sm:p-6">
              <div className={`inline-flex p-2 rounded-lg mb-3 ${stat.color === 'neon' ? 'bg-neon/10' : 'bg-neon-blue/10'}`}>
                <stat.icon className={`h-4 w-4 ${stat.color === 'neon' ? 'text-neon' : 'text-neon-blue'}`} />
              </div>
              <div className={`text-2xl sm:text-3xl font-black ${stat.color === 'neon' ? 'gradient-neon-text' : 'neon-text-blue'}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Featured Tools */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Ferramentas em <span className="gradient-neon-text">Destaque</span></h2>
            <p className="text-sm text-muted-foreground mt-1">As mais usadas pela comunidade</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((toolId, index) => {
            const info = toolInfo[toolId]
            const IconComp = toolIcons[info.icon] || Calculator
            const colors = [
              { bg: 'bg-neon/10', text: 'text-neon', border: 'border-neon/20' },
              { bg: 'bg-neon-blue/10', text: 'text-neon-blue', border: 'border-neon-blue/20' },
              { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
              { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
              { bg: 'bg-neon/10', text: 'text-neon', border: 'border-neon/20' },
              { bg: 'bg-neon-blue/10', text: 'text-neon-blue', border: 'border-neon-blue/20' },
            ]
            const color = colors[index % colors.length]
            return (
              <Card
                key={toolId}
                className={`card-hover border-border/50 bg-card/50 backdrop-blur cursor-pointer group ${color.border}`}
                onClick={() => setCurrentPage(toolId)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex p-2 rounded-lg ${color.bg}`}>
                      <IconComp className={`h-5 w-5 ${color.text}`} />
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      #{index + 1} Mais Usada
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold mt-2 group-hover:gradient-neon-text transition-all">
                    {info.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">{info.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-neon">
                    Usar ferramenta <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Tools Ranking */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-6">
          Ranking <span className="neon-text-blue">das Ferramentas</span>
        </h2>
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {[
                { name: 'Martingale', uses: '84.5K', change: '+12%', icon: '🥇' },
                { name: 'Gestão de Banca', uses: '62.3K', change: '+8%', icon: '🥈' },
                { name: 'Simulador Crash', uses: '45.7K', change: '+15%', icon: '🥉' },
                { name: 'Fibonacci', uses: '38.2K', change: '+5%', icon: '4' },
                { name: 'Soros', uses: '29.1K', change: '+22%', icon: '5' },
                { name: 'Simulador Double', uses: '24.8K', change: '+9%', icon: '6' },
                { name: 'Masaniello', uses: '18.6K', change: '+18%', icon: '7' },
                { name: 'Recuperação Loss', uses: '15.3K', change: '+7%', icon: '8' },
              ].map((tool, i) => (
                <div
                  key={tool.name}
                  className="flex items-center justify-between p-3 sm:p-4 hover:bg-neon/5 transition-colors cursor-pointer"
                  onClick={() => {
                    const pageMap: Record<string, ToolPage> = {
                      'Martingale': 'martingale',
                      'Gestão de Banca': 'bankroll',
                      'Simulador Crash': 'crash-simulator',
                      'Fibonacci': 'fibonacci',
                      'Soros': 'soros',
                      'Simulador Double': 'double-simulator',
                      'Masaniello': 'masaniello',
                      'Recuperação Loss': 'loss-recovery',
                    }
                    setCurrentPage(pageMap[tool.name] || 'home')
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 text-center text-sm font-bold">
                      {typeof tool.icon === 'string' && tool.icon.length > 2 ? tool.icon : (
                        <span className={i < 3 ? 'text-neon' : 'text-muted-foreground'}>{tool.icon}</span>
                      )}
                    </span>
                    <span className="text-sm font-medium">{tool.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{tool.uses} usos</span>
                    <Badge className="bg-neon/10 text-neon border-0 text-[10px]">{tool.change}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-6">
          Gestão de Banca <span className="gradient-neon-text">101</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-neon" />
                Princípios Fundamentais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Regra do 1-2%', desc: 'Nunca arrisque mais de 1-2% da sua banca em uma única aposta. Isso garante sobrevivência a sequências negativas.', icon: Target, color: 'text-neon' },
                { title: 'Stop Loss Diário', desc: 'Defina um limite de perdas diário. Ao atingir, pare. Amanhã é um novo dia.', icon: Shield, color: 'text-neon-blue' },
                { title: 'Gestão Emocional', desc: 'Não tente recuperar perdas imediatamente. Mantenha a disciplina e siga sua estratégia.', icon: Brain, color: 'text-purple-500' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-3 rounded-lg bg-muted/20 hover:bg-neon/5 transition-colors">
                  <div className={`p-2 rounded-lg bg-muted/30 h-fit`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-0.5">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-neon/20 bg-gradient-to-b from-card to-card/50 neon-glow">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Aviso Importante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                As ferramentas deste site são para fins educacionais e de entretenimento. 
                Não garantem lucro. Apostas envolvem risco e você deve sempre jogar com responsabilidade.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-neon" />
                  Nunca aposte mais do que pode perder
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-neon-blue" />
                  Defina limites e respeite-os
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Busque ajuda se necessário
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Blog Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Blog & <span className="gradient-neon-text">Estratégias</span></h2>
            <p className="text-sm text-muted-foreground mt-1">Conteúdo atualizado para apostadores</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogPosts.map((post) => (
            <Card key={post.title} className="card-hover border-border/50 bg-card/50 backdrop-blur cursor-pointer group">
              <CardContent className="p-4">
                <div className="h-28 rounded-lg bg-gradient-to-br from-neon/10 to-neon-blue/10 mb-3 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-neon/30" />
                </div>
                <Badge variant="secondary" className="text-[10px] mb-2">{post.category}</Badge>
                <h3 className="text-sm font-semibold mb-1 group-hover:text-neon transition-colors">{post.title}</h3>
                <p className="text-[10px] text-muted-foreground">{post.readTime} de leitura</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-2xl border border-neon/20 bg-gradient-to-r from-neon/5 via-card to-neon-blue/5 p-6 sm:p-10 text-center">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Pronto para <span className="gradient-neon-text">Dominar</span> as Apostas?
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
            Acesse todas as ferramentas premium, simule estratégias e gerencie sua banca como um profissional.
          </p>
          <Button
            size="lg"
            onClick={() => setCurrentPage('martingale')}
            className="gradient-neon text-black font-bold hover:opacity-90"
          >
            Começar Agora <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  )
}
