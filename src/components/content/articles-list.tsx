'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdBanner } from '@/components/shared/ad-banner'
import { Calculator, BarChart3, TrendingUp, BookOpen, Lightbulb, AlertTriangle, ArrowRight } from 'lucide-react'

const articles = [
  {
    slug: 'introducao-probabilidade',
    title: 'Introdução à Teoria das Probabilidades',
    description: 'Aprenda os conceitos fundamentais da teoria das probabilidades, desde eventos simples até probabilidades condicionais, e como aplicá-los na tomada de decisão.',
    icon: Calculator,
    category: 'Fundamentos',
    readTime: '8 min',
  },
  {
    slug: 'gestao-risco-capital',
    title: 'Gestão de Risco e Capital',
    description: 'Princípios fundamentais de gestão de risco e capital. Aprenda a calcular o tamanho ideal de posição e proteger seu capital contra variações adversas.',
    icon: TrendingUp,
    category: 'Gestão',
    readTime: '10 min',
  },
  {
    slug: 'sequencia-fibonacci-matematica',
    title: 'A Sequência Fibonacci na Matemática',
    description: 'Entenda a sequência de Fibonacci, suas propriedades matemáticas, a proporção áurea e como essa sequência aparece na natureza e em diversas aplicações práticas.',
    icon: BarChart3,
    category: 'Matemática',
    readTime: '7 min',
  },
  {
    slug: 'progressao-martingale-analise',
    title: 'Análise Matemática da Progressão Martingale',
    description: 'Análise teórica detalhada da progressão Martingale. Entenda suas propriedades matemáticas, requisitos de capital e limitações teóricas.',
    icon: TrendingUp,
    category: 'Análise',
    readTime: '12 min',
  },
  {
    slug: 'estatistica-descritiva-basica',
    title: 'Estatística Descritiva Básica',
    description: 'Conceitos essenciais de estatística descritiva: média, mediana, moda, variância e desvio padrão explicados de forma clara com exemplos práticos.',
    icon: BarChart3,
    category: 'Estatística',
    readTime: '9 min',
  },
  {
    slug: 'simulacao-monte-carlo',
    title: 'Simulação de Monte Carlo',
    description: 'Entenda o método de Monte Carlo, como simulações probabilísticas funcionam e como podem ser usadas para analisar cenários complexos e estimar resultados.',
    icon: Calculator,
    category: 'Simulação',
    readTime: '11 min',
  },
  {
    slug: 'falacias-estatisticas',
    title: 'Falácias Estatísticas Comuns',
    description: 'Conheça as falácias estatísticas mais comuns como o viés do sobrevivente, regressão à média e correlação espúria. Aprenda a identificá-las e evitá-las.',
    icon: AlertTriangle,
    category: 'Estatística',
    readTime: '8 min',
  },
  {
    slug: 'valor-esperado-matematico',
    title: 'Valor Esperado Matemático',
    description: 'O conceito de valor esperado (esperança matemática), como calculá-lo e sua importância fundamental na tomada de decisão racional e análise de cenários.',
    icon: Lightbulb,
    category: 'Fundamentos',
    readTime: '7 min',
  },
  {
    slug: 'paradoxo-monty-hall',
    title: 'O Paradoxo de Monty Hall',
    description: 'Descubra por que trocar de porta no famoso paradoxo de Monty Hall dobra suas chances. Um problema de probabilidade condicional que desafia a intuição.',
    icon: Lightbulb,
    category: 'Probabilidade',
    readTime: '6 min',
  },
  {
    slug: 'lei-grandes-numeros',
    title: 'A Lei dos Grandes Números',
    description: 'Entenda por que a média dos resultados converge para o valor esperado conforme o número de experimentos aumenta e evite interpretações equivocadas.',
    icon: BarChart3,
    category: 'Estatística',
    readTime: '8 min',
  },
  {
    slug: 'distribuicao-normal-gaussiana',
    title: 'A Distribuição Normal (Gaussiana)',
    description: 'Conheça a distribuição mais importante da estatística: a regra 68-95-99,7, o Teorema Central do Limite e a pontuação Z explicadas de forma clara.',
    icon: BarChart3,
    category: 'Estatística',
    readTime: '9 min',
  },
  {
    slug: 'introducao-teoria-jogos',
    title: 'Introdução à Teoria dos Jogos',
    description: 'Explore o dilema do prisioneiro, o equilíbrio de Nash e estratégias dominantes. A matemática das decisões estratégicas explicada de forma acessível.',
    icon: Calculator,
    category: 'Matemática',
    readTime: '10 min',
  },
]

const categoryColors: Record<string, string> = {
  'Fundamentos': 'bg-neon/10 text-neon border-neon/20',
  'Gestão': 'bg-neon-blue/10 text-neon-blue border-neon-blue/20',
  'Matemática': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'Análise': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'Estatística': 'bg-neon-blue/10 text-neon-blue border-neon-blue/20',
  'Simulação': 'bg-neon/10 text-neon border-neon/20',
  'Probabilidade': 'bg-neon/10 text-neon border-neon/20',
}

export function ArticlesList() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-6 w-6 text-neon" />
          <h1 className="text-3xl font-bold">Artigos Educacionais</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Artigos sobre probabilidade, estatística, gestão de risco e conceitos matemáticos. 
          Conteúdo educacional gratuito para todos os níveis.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => {
          const Icon = article.icon
          return (
            <Link key={article.slug} href={`/artigos/${article.slug}`}>
              <Card className="card-hover border-border/50 bg-card/50 backdrop-blur cursor-pointer group h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-muted/30 shrink-0">
                      <Icon className="h-5 w-5 text-neon" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={`text-xs ${categoryColors[article.category] || ''}`}>
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                      <h3 className="font-bold text-base mb-1.5 group-hover:text-neon transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-sm text-neon font-medium">
                        Ler artigo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Ad */}
      <AdBanner className="mt-6" />
    </div>
  )
}
