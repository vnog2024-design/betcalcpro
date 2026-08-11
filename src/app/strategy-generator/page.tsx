import { Metadata } from 'next'
import { PageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Gerador de Estratégias de Gestão',
  description: 'Gere estratégias personalizadas de gestão de risco com base no seu capital e perfil. Ferramenta gratuita que combina múltiplos critérios matemáticos.',
  path: '/strategy-generator',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Gerador de Estratégias de Gestão',
  description: 'Gere estratégias personalizadas de gestão de risco com base no seu capital e perfil. Ferramenta gratuita que combina múltiplos critérios matemáticos.',
  path: '/strategy-generator',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Gerador de Estratégias de Gestão', url: 'https://betcalcpro.com.br/strategy-generator' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Gerador de Estratégias de Gestão',
  description: 'Gere estratégias personalizadas de gestão de risco com base no seu capital e perfil. Ferramenta gratuita que combina múltiplos critérios matemáticos.',
  url: 'https://betcalcpro.com.br/strategy-generator',
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
