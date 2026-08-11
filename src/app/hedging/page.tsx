import { Metadata } from 'next'
import { HedgingPageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Calculadora de Cobertura (Hedging)',
  description: 'Calcule estratégias de cobertura para dois resultados simultâneos. Ferramenta matemática gratuita que determina apostas ideais para minimizar perdas.',
  path: '/hedging',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Calculadora de Cobertura (Hedging)',
  description: 'Calcule estratégias de cobertura para dois resultados simultâneos. Ferramenta matemática gratuita que determina apostas ideais para minimizar perdas.',
  path: '/hedging',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Calculadora de Cobertura (Hedging)', url: 'https://betcalcpro.com.br/hedging' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Calculadora de Cobertura (Hedging)',
  description: 'Calcule estratégias de cobertura para dois resultados simultâneos. Ferramenta matemática gratuita que determina apostas ideais para minimizar perdas.',
  url: 'https://betcalcpro.com.br/hedging',
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
      <HedgingPageClient />
    </>
  )
}
