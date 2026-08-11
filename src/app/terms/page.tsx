import { Metadata } from 'next'
import { PageClient } from './client'
import { generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'Termos de Uso — BetCalc Pro',
  description: 'Termos de Uso do BetCalc Pro. Conheça as condições de utilização das nossas ferramentas educacionais gratuitas.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/terms',
  },
  openGraph: {
    title: 'Termos de Uso — BetCalc Pro',
    description: 'Termos de Uso do BetCalc Pro. Conheça as condições de utilização das nossas ferramentas educacionais gratuitas.',
    url: 'https://betcalcpro.com.br/terms',
    siteName: 'BetCalc Pro',
    images: [{ url: 'https://betcalcpro.com.br/og-image.png', width: 1344, height: 768 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Termos de Uso — BetCalc Pro',
    description: 'Termos de Uso do BetCalc Pro. Conheça as condições de utilização das nossas ferramentas educacionais gratuitas.',
    images: ['https://betcalcpro.com.br/og-image.png'],
  },
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Termos', url: 'https://betcalcpro.com.br/terms' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Termos de Uso — BetCalc Pro',
  description: 'Termos de Uso do BetCalc Pro. Conheça as condições de utilização das nossas ferramentas educacionais gratuitas.',
  url: 'https://betcalcpro.com.br/terms',
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
