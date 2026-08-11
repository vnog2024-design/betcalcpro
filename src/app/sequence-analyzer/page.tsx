import { Metadata } from 'next'
import { PageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Analisador de Sequências Estatísticas',
  description: 'Analise padrões em sequências de resultados com estatísticas detalhadas. Ferramenta gratuita que calcula frequências, probabilidades observadas e streaks.',
  path: '/sequence-analyzer',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Analisador de Sequências Estatísticas',
  description: 'Analise padrões em sequências de resultados com estatísticas detalhadas. Ferramenta gratuita que calcula frequências, probabilidades observadas e streaks.',
  path: '/sequence-analyzer',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Analisador de Sequências Estatísticas', url: 'https://betcalcpro.com.br/sequence-analyzer' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Analisador de Sequências Estatísticas',
  description: 'Analise padrões em sequências de resultados com estatísticas detalhadas. Ferramenta gratuita que calcula frequências, probabilidades observadas e streaks.',
  url: 'https://betcalcpro.com.br/sequence-analyzer',
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
