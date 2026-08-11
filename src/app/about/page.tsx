import { Metadata } from 'next'
import { PageClient } from './client'
import { generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'Sobre Nós — BetCalc Pro',
  description: 'Conheça o BetCalc Pro, nossa missão de democratizar a educação matemática e os valores que guiam nossa plataforma gratuita.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/about',
  },
  openGraph: {
    title: 'Sobre Nós — BetCalc Pro',
    description: 'Conheça o BetCalc Pro, nossa missão de democratizar a educação matemática e os valores que guiam nossa plataforma gratuita.',
    url: 'https://betcalcpro.com.br/about',
    siteName: 'BetCalc Pro',
    images: [{ url: 'https://betcalcpro.com.br/og-image.png', width: 1344, height: 768 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nós — BetCalc Pro',
    description: 'Conheça o BetCalc Pro, nossa missão de democratizar a educação matemática e os valores que guiam nossa plataforma gratuita.',
    images: ['https://betcalcpro.com.br/og-image.png'],
  },
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Sobre Nós', url: 'https://betcalcpro.com.br/about' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Sobre Nós — BetCalc Pro',
  description: 'Conheça o BetCalc Pro, nossa missão de democratizar a educação matemática e os valores que guiam nossa plataforma gratuita.',
  url: 'https://betcalcpro.com.br/about',
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
