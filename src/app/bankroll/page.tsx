import { Metadata } from 'next'
import { PageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Calculadora de Gestão de Capital (Bankroll)',
  description: 'Gerencie sua banca com cálculos de risco por operação (conservador, moderado, agressivo). Ferramenta gratuita de gestão de capital baseada na regra do 1-2%.',
  path: '/bankroll',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Calculadora de Gestão de Capital (Bankroll)',
  description: 'Gerencie sua banca com cálculos de risco por operação (conservador, moderado, agressivo). Ferramenta gratuita de gestão de capital baseada na regra do 1-2%.',
  path: '/bankroll',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Calculadora de Gestão de Capital (Bankroll)', url: 'https://betcalcpro.com.br/bankroll' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Calculadora de Gestão de Capital (Bankroll)',
  description: 'Gerencie sua banca com cálculos de risco por operação (conservador, moderado, agressivo). Ferramenta gratuita de gestão de capital baseada na regra do 1-2%.',
  url: 'https://betcalcpro.com.br/bankroll',
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
