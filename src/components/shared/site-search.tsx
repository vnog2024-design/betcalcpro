'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import {
  Search,
  TrendingUp,
  Wallet,
  BarChart3,
  Calculator,
  Coins,
  Shield,
  ShieldCheck,
  RefreshCw,
  Search as SearchIcon,
  Percent,
  Sparkles,
  BookOpen,
  Keyboard,
} from 'lucide-react'

interface SearchableItem {
  id: string
  label: string
  description: string
  href: string
  category: 'calculators' | 'simulators' | 'articles'
  icon: React.ElementType
  keywords: string[]
}

const searchableItems: SearchableItem[] = [
  // Calculators
  {
    id: 'martingale',
    label: 'Martingale',
    description: 'Calculadora de progressão Martingale com níveis ilimitados',
    href: '/martingale',
    category: 'calculators',
    icon: TrendingUp,
    keywords: ['martingale', 'gale', 'progressao', 'multiplicador'],
  },
  {
    id: 'fibonacci',
    label: 'Fibonacci',
    description: 'Calculadora de sequência Fibonacci para análise de progressões',
    href: '/fibonacci',
    category: 'calculators',
    icon: BarChart3,
    keywords: ['fibonacci', 'sequencia', 'progressao', 'golden ratio'],
  },
  {
    id: 'bankroll',
    label: 'Gestão de Capital',
    description: 'Calcule seu capital ideal e gerencie riscos',
    href: '/bankroll',
    category: 'calculators',
    icon: Wallet,
    keywords: ['bankroll', 'banca', 'capital', 'gestao', 'risco'],
  },
  {
    id: 'soros',
    label: 'Progressão Geométrica',
    description: 'Calculadora de progressão geométrica e crescimento de capital',
    href: '/soros',
    category: 'calculators',
    icon: Coins,
    keywords: ['soros', 'geometrica', 'progressao', 'lucro', 'reinvestir'],
  },
  {
    id: 'masaniello',
    label: 'Masaniello',
    description: 'Calculadora Masaniello para gestão avançada de capital',
    href: '/masaniello',
    category: 'calculators',
    icon: Calculator,
    keywords: ['masaniello', 'avancado', 'gestao', 'capital'],
  },
  {
    id: 'recovery',
    label: 'Recuperação de Capital',
    description: 'Calcule planos de recuperação de capital',
    href: '/recovery',
    category: 'calculators',
    icon: Shield,
    keywords: ['recovery', 'recuperacao', 'capital', 'plano'],
  },
  {
    id: 'hedging',
    label: 'Cobertura (Hedging)',
    description: 'Calcule estratégias de cobertura para dois resultados simultâneos',
    href: '/hedging',
    category: 'calculators',
    icon: ShieldCheck,
    keywords: ['hedging', 'cobertura', 'protecao', 'seguro'],
  },
  {
    id: 'ciclos',
    label: 'Ciclos',
    description: 'Martingale em ciclos: limite os gales e recupere no próximo ciclo',
    href: '/ciclos',
    category: 'calculators',
    icon: RefreshCw,
    keywords: ['ciclos', 'cycle', 'martingale', 'recuperacao', 'gales'],
  },
  // Simulators
  {
    id: 'sequence-analyzer',
    label: 'Analisador de Sequências',
    description: 'Analise padrões em sequências de resultados',
    href: '/sequence-analyzer',
    category: 'simulators',
    icon: SearchIcon,
    keywords: ['sequence', 'sequencia', 'analisador', 'padroes', 'analise'],
  },
  {
    id: 'probability-simulator',
    label: 'Simulador de Probabilidades',
    description: 'Simule probabilidades e cenários',
    href: '/probability-simulator',
    category: 'simulators',
    icon: Percent,
    keywords: ['probability', 'probabilidade', 'simulador', 'cenario'],
  },
  {
    id: 'strategy-generator',
    label: 'Gerador de Estratégias',
    description: 'Gere estratégias personalizadas de gestão',
    href: '/strategy-generator',
    category: 'simulators',
    icon: Sparkles,
    keywords: ['strategy', 'estrategia', 'gerador', 'personalizada'],
  },
  // Articles
  {
    id: 'introducao-probabilidade',
    label: 'Introdução à Probabilidade',
    description: 'Conceitos fundamentais de probabilidade',
    href: '/artigos/introducao-probabilidade',
    category: 'articles',
    icon: BookOpen,
    keywords: ['probabilidade', 'introducao', 'conceitos', 'basico'],
  },
  {
    id: 'gestao-risco-capital',
    label: 'Gestão de Risco e Capital',
    description: 'Aprenda a gerenciar risco e proteger seu capital',
    href: '/artigos/gestao-risco-capital',
    category: 'articles',
    icon: BookOpen,
    keywords: ['risco', 'capital', 'gestao', 'protecao'],
  },
  {
    id: 'sequencia-fibonacci-matematica',
    label: 'Sequência Fibonacci na Matemática',
    description: 'A matemática por trás da sequência Fibonacci',
    href: '/artigos/sequencia-fibonacci-matematica',
    category: 'articles',
    icon: BookOpen,
    keywords: ['fibonacci', 'matematica', 'sequencia', 'golden ratio'],
  },
  {
    id: 'progressao-martingale-analise',
    label: 'Análise da Progressão Martingale',
    description: 'Análise detalhada da progressão Martingale',
    href: '/artigos/progressao-martingale-analise',
    category: 'articles',
    icon: BookOpen,
    keywords: ['martingale', 'analise', 'progressao', 'gale'],
  },
  {
    id: 'estatistica-descritiva-basica',
    label: 'Estatística Descritiva Básica',
    description: 'Fundamentos de estatística descritiva',
    href: '/artigos/estatistica-descritiva-basica',
    category: 'articles',
    icon: BookOpen,
    keywords: ['estatistica', 'descritiva', 'media', 'mediana'],
  },
  {
    id: 'simulacao-monte-carlo',
    label: 'Simulação de Monte Carlo',
    description: 'Entenda o método de simulação de Monte Carlo',
    href: '/artigos/simulacao-monte-carlo',
    category: 'articles',
    icon: BookOpen,
    keywords: ['monte carlo', 'simulacao', 'metodo', 'modelo'],
  },
  {
    id: 'falacias-estatisticas',
    label: 'Falácias Estatísticas',
    description: 'Erros comuns de raciocínio estatístico',
    href: '/artigos/falacias-estatisticas',
    category: 'articles',
    icon: BookOpen,
    keywords: ['falacia', 'estatistica', 'erro', 'vies'],
  },
  {
    id: 'valor-esperado-matematico',
    label: 'Valor Esperado Matemático',
    description: 'Entenda o conceito de valor esperado',
    href: '/artigos/valor-esperado-matematico',
    category: 'articles',
    icon: BookOpen,
    keywords: ['valor esperado', 'matematico', 'expectativa', 'ev'],
  },
  {
    id: 'paradoxo-monty-hall',
    label: 'O Paradoxo de Monty Hall',
    description: 'O famoso paradoxo de probabilidade',
    href: '/artigos/paradoxo-monty-hall',
    category: 'articles',
    icon: BookOpen,
    keywords: ['monty hall', 'paradoxo', 'probabilidade', 'porta'],
  },
  {
    id: 'lei-grandes-numeros',
    label: 'A Lei dos Grandes Números',
    description: 'Entenda a lei dos grandes números',
    href: '/artigos/lei-grandes-numeros',
    category: 'articles',
    icon: BookOpen,
    keywords: ['lei', 'grandes numeros', 'convergencia', 'amostra'],
  },
  {
    id: 'distribuicao-normal-gaussiana',
    label: 'A Distribuição Normal (Gaussiana)',
    description: 'A distribuição mais importante da estatística',
    href: '/artigos/distribuicao-normal-gaussiana',
    category: 'articles',
    icon: BookOpen,
    keywords: ['distribuicao', 'normal', 'gaussiana', 'curva sino'],
  },
  {
    id: 'introducao-teoria-jogos',
    label: 'Introdução à Teoria dos Jogos',
    description: 'Conceitos fundamentais de teoria dos jogos',
    href: '/artigos/introducao-teoria-jogos',
    category: 'articles',
    icon: BookOpen,
    keywords: ['teoria', 'jogos', 'nash', 'dilema', 'estrategia'],
  },
]

const categoryLabels: Record<SearchableItem['category'], string> = {
  calculators: 'Calculadoras',
  simulators: 'Simuladores',
  articles: 'Artigos',
}

export function SiteSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // ESC to close is handled by CommandDialog natively

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router]
  )

  const calculators = searchableItems.filter((i) => i.category === 'calculators')
  const simulators = searchableItems.filter((i) => i.category === 'simulators')
  const articles = searchableItems.filter((i) => i.category === 'articles')

  return (
    <>
      {/* Desktop: Search input */}
      <Button
        variant="outline"
        className="hidden lg:flex items-center gap-2 h-9 px-3 text-muted-foreground bg-muted/30 border-border/50 hover:bg-muted/50 hover:text-foreground w-56 justify-start"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="text-sm">Buscar ferramentas...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Mobile: Search icon button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-muted-foreground hover:text-neon"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Buscar</span>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Buscar no BetCalc Pro"
        description="Busque calculadoras, simuladores e artigos"
      >
        <CommandInput placeholder="Digite para buscar..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

          <CommandGroup heading={categoryLabels.calculators}>
            {calculators.map((item) => (
              <CommandItem
                key={item.id}
                value={`${item.label} ${item.keywords.join(' ')}`}
                onSelect={() => handleSelect(item.href)}
              >
                <item.icon className="h-4 w-4 text-neon" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={categoryLabels.simulators}>
            {simulators.map((item) => (
              <CommandItem
                key={item.id}
                value={`${item.label} ${item.keywords.join(' ')}`}
                onSelect={() => handleSelect(item.href)}
              >
                <item.icon className="h-4 w-4 text-neon-blue" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={categoryLabels.articles}>
            {articles.map((item) => (
              <CommandItem
                key={item.id}
                value={`${item.label} ${item.keywords.join(' ')}`}
                onSelect={() => handleSelect(item.href)}
              >
                <item.icon className="h-4 w-4 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>

        <div className="flex items-center justify-between border-t border-border/50 px-3 py-2">
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Keyboard className="h-3 w-3" />
              <kbd className="rounded border border-border/50 bg-muted/50 px-1 font-mono text-[9px]">↑↓</kbd> navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border/50 bg-muted/50 px-1 font-mono text-[9px]">↵</kbd> abrir
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border/50 bg-muted/50 px-1 font-mono text-[9px]">esc</kbd> fechar
            </span>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}
