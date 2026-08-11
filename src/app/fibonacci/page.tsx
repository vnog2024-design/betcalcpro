import { Metadata } from 'next'
import { PageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Calculadora de Sequência Fibonacci',
  description: 'Visualize e calcule progressões Fibonacci aplicadas a gestão de risco. Ferramenta educacional gratuita para entender a sequência de Fibonacci na prática.',
  path: '/fibonacci',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Calculadora de Sequência Fibonacci',
  description: 'Visualize e calcule progressões Fibonacci aplicadas a gestão de risco. Ferramenta educacional gratuita para entender a sequência de Fibonacci na prática.',
  path: '/fibonacci',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Calculadora de Sequência Fibonacci', url: 'https://betcalcpro.com.br/fibonacci' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Calculadora de Sequência Fibonacci',
  description: 'Visualize e calcule progressões Fibonacci aplicadas a gestão de risco. Ferramenta educacional gratuita para entender a sequência de Fibonacci na prática.',
  url: 'https://betcalcpro.com.br/fibonacci',
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
      <PageClient />
    </>
  )
}
