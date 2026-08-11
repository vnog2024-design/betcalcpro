import { Metadata } from 'next'
import { PageClient } from './client'
import { generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'Uso Responsável — BetCalc Pro',
  description: 'Compromisso do BetCalc Pro com o uso responsável. Informações sobre limites, autocontrole e responsabilidade no uso de ferramentas de probabilidade.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/responsible-gaming',
  },
  openGraph: {
    title: 'Uso Responsável — BetCalc Pro',
    description: 'Compromisso do BetCalc Pro com o uso responsável. Informações sobre limites, autocontrole e responsabilidade no uso de ferramentas de probabilidade.',
    url: 'https://betcalcpro.com.br/responsible-gaming',
    siteName: 'BetCalc Pro',
    images: [{ url: 'https://betcalcpro.com.br/og-image.png', width: 1344, height: 768 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uso Responsável — BetCalc Pro',
    description: 'Compromisso do BetCalc Pro com o uso responsável. Informações sobre limites, autocontrole e responsabilidade no uso de ferramentas de probabilidade.',
    images: ['https://betcalcpro.com.br/og-image.png'],
  },
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Uso Responsável', url: 'https://betcalcpro.com.br/responsible-gaming' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Uso Responsável — BetCalc Pro',
  description: 'Compromisso do BetCalc Pro com o uso responsável. Informações sobre limites, autocontrole e responsabilidade no uso de ferramentas de probabilidade.',
  url: 'https://betcalcpro.com.br/responsible-gaming',
})

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
        <PageClient />
    </>
  )
}
