import { Metadata } from 'next'
import { PageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Simulador de Probabilidades',
  description: 'Simule cenários probabilísticos com milhares de iterações. Ferramenta educacional para entender variância, distribuição de resultados e a lei dos grandes números.',
  path: '/probability-simulator',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Simulador de Probabilidades',
  description: 'Simule cenários probabilísticos com milhares de iterações. Ferramenta educacional para entender variância, distribuição de resultados e a lei dos grandes números.',
  path: '/probability-simulator',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Simulador de Probabilidades', url: 'https://betcalcpro.com.br/probability-simulator' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Simulador de Probabilidades',
  description: 'Simule cenários probabilísticos com milhares de iterações. Ferramenta educacional para entender variância, distribuição de resultados e a lei dos grandes números.',
  url: 'https://betcalcpro.com.br/probability-simulator',
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
