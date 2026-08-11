import { Metadata } from 'next'
import { PageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Calculadora de Progressão Geométrica (Soros)',
  description: 'Simule progressões geométricas que reinvestem lucros após ganhos. Ferramenta educacional gratuita para entender estratégias de crescimento de capital.',
  path: '/soros',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Calculadora de Progressão Geométrica (Soros)',
  description: 'Simule progressões geométricas que reinvestem lucros após ganhos. Ferramenta educacional gratuita para entender estratégias de crescimento de capital.',
  path: '/soros',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Calculadora de Progressão Geométrica (Soros)', url: 'https://betcalcpro.com.br/soros' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Calculadora de Progressão Geométrica (Soros)',
  description: 'Simule progressões geométricas que reinvestem lucros após ganhos. Ferramenta educacional gratuita para entender estratégias de crescimento de capital.',
  url: 'https://betcalcpro.com.br/soros',
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
