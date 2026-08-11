import { Metadata } from 'next'
import { MartingalePageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Calculadora de Progressão Martingale',
  description: 'Calcule progressões Martingale com níveis ilimitados. Ferramenta matemática gratuita para análise de progressões geométricas e gestão de risco educacional.',
  path: '/martingale',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Calculadora de Progressão Martingale',
  description: 'Calcule progressões Martingale com níveis ilimitados. Ferramenta matemática gratuita para análise de progressões geométricas e gestão de risco educacional.',
  path: '/martingale',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Calculadora de Progressão Martingale', url: 'https://betcalcpro.com.br/martingale' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Calculadora de Progressão Martingale',
  description: 'Calcule progressões Martingale com níveis ilimitados. Ferramenta matemática gratuita para análise de progressões geométricas e gestão de risco educacional.',
  url: 'https://betcalcpro.com.br/martingale',
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
      <MartingalePageClient />
    </>
  )
}
