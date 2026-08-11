import { writeFileSync } from 'fs'
import { join } from 'path'

interface ToolConfig {
  path: string
  clientImport: string
  title: string
  description: string
}

const tools: ToolConfig[] = [
  {
    path: 'martingale',
    clientImport: 'MartingalePageClient',
    title: 'Calculadora de Progressão Martingale',
    description: 'Calcule progressões Martingale com níveis ilimitados. Ferramenta matemática gratuita para análise de progressões geométricas e gestão de risco educacional.',
  },
  {
    path: 'bankroll',
    clientImport: 'PageClient',
    title: 'Calculadora de Gestão de Capital (Bankroll)',
    description: 'Gerencie sua banca com cálculos de risco por operação (conservador, moderado, agressivo). Ferramenta gratuita de gestão de capital baseada na regra do 1-2%.',
  },
  {
    path: 'fibonacci',
    clientImport: 'FibonacciPageClient',
    title: 'Calculadora de Sequência Fibonacci',
    description: 'Visualize e calcule progressões Fibonacci aplicadas a gestão de risco. Ferramenta educacional gratuita para entender a sequência de Fibonacci na prática.',
  },
  {
    path: 'masaniello',
    clientImport: 'PageClient',
    title: 'Calculadora Masaniello',
    description: 'Calculadora Masaniello para gestão avançada de capital. Calcule cenários de alocação combinando probabilidade de sucesso e objetivo de lucro.',
  },
  {
    path: 'soros',
    clientImport: 'PageClient',
    title: 'Calculadora de Progressão Geométrica (Soros)',
    description: 'Simule progressões geométricas que reinvestem lucros após ganhos. Ferramenta educacional gratuita para entender estratégias de crescimento de capital.',
  },
  {
    path: 'recovery',
    clientImport: 'PageClient',
    title: 'Calculadora de Recuperação de Capital',
    description: 'Planeje a recuperação de perdas com cálculos matemáticos precisos. Defina percentuais de incremento e visualize o plano de recuperação passo a passo.',
  },
  {
    path: 'sequence-analyzer',
    clientImport: 'SequenceAnalyzerPageClient',
    title: 'Analisador de Sequências Estatísticas',
    description: 'Analise padrões em sequências de resultados com estatísticas detalhadas. Ferramenta gratuita que calcula frequências, probabilidades observadas e streaks.',
  },
  {
    path: 'probability-simulator',
    clientImport: 'ProbabilitySimulatorPageClient',
    title: 'Simulador de Probabilidades',
    description: 'Simule cenários probabilísticos com milhares de iterações. Ferramenta educacional para entender variância, distribuição de resultados e a lei dos grandes números.',
  },
  {
    path: 'strategy-generator',
    clientImport: 'StrategyGeneratorPageClient',
    title: 'Gerador de Estratégias de Gestão',
    description: 'Gere estratégias personalizadas de gestão de risco com base no seu capital e perfil. Ferramenta gratuita que combina múltiplos critérios matemáticos.',
  },
  {
    path: 'hedging',
    clientImport: 'HedgingPageClient',
    title: 'Calculadora de Cobertura (Hedging)',
    description: 'Calcule estratégias de cobertura para dois resultados simultâneos. Ferramenta matemática gratuita que determina apostas ideais para minimizar perdas.',
  },
  {
    path: 'ciclos',
    clientImport: 'CiclosPageClient',
    title: 'Calculadora de Ciclos com Martingale Limitado',
    description: 'Simule ciclos de martingale com limite de gales por ciclo. Ferramenta educacional para entender gerenciamento de perdas em ciclos controlados.',
  },
]

const BASE = '/home/z/my-project/src/app'

for (const tool of tools) {
  const content = `import { Metadata } from 'next'
import { ${tool.clientImport} } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: '${tool.title}',
  description: '${tool.description}',
  path: '/${tool.path}',
})

const toolJsonLd = generateToolJsonLd({
  title: '${tool.title}',
  description: '${tool.description}',
  path: '/${tool.path}',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Ferramentas', url: 'https://betcalcpro.com.br/${tool.path}' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: '${tool.title}',
  description: '${tool.description}',
  url: 'https://betcalcpro.com.br/${tool.path}',
})

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <${tool.clientImport} />
    </>
  )
}
`
  writeFileSync(join(BASE, tool.path, 'page.tsx'), content)
  console.log(`✅ Updated: ${tool.path}/page.tsx`)
}

console.log(`\nDone! Updated ${tools.length} tool pages.`)
