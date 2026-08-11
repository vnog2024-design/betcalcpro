import { Metadata } from 'next'
import { PageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Calculadora de Recuperação de Capital',
  description: 'Planeje a recuperação de perdas com cálculos matemáticos precisos. Defina percentuais de incremento e visualize o plano de recuperação passo a passo.',
  path: '/recovery',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Calculadora de Recuperação de Capital',
  description: 'Planeje a recuperação de perdas com cálculos matemáticos precisos. Defina percentuais de incremento e visualize o plano de recuperação passo a passo.',
  path: '/recovery',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Calculadora de Recuperação de Capital', url: 'https://betcalcpro.com.br/recovery' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Calculadora de Recuperação de Capital',
  description: 'Planeje a recuperação de perdas com cálculos matemáticos precisos. Defina percentuais de incremento e visualize o plano de recuperação passo a passo.',
  url: 'https://betcalcpro.com.br/recovery',
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
