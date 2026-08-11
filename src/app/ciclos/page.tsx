import { Metadata } from 'next'
import { PageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Calculadora de Ciclos com Martingale Limitado',
  description: 'Simule ciclos de martingale com limite de gales por ciclo. Ferramenta educacional para entender gerenciamento de perdas em ciclos controlados.',
  path: '/ciclos',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Calculadora de Ciclos com Martingale Limitado',
  description: 'Simule ciclos de martingale com limite de gales por ciclo. Ferramenta educacional para entender gerenciamento de perdas em ciclos controlados.',
  path: '/ciclos',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Calculadora de Ciclos com Martingale Limitado', url: 'https://betcalcpro.com.br/ciclos' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Calculadora de Ciclos com Martingale Limitado',
  description: 'Simule ciclos de martingale com limite de gales por ciclo. Ferramenta educacional para entender gerenciamento de perdas em ciclos controlados.',
  url: 'https://betcalcpro.com.br/ciclos',
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
