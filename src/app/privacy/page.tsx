import { Metadata } from 'next'
import { PageClient } from './client'
import { generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'Política de Privacidade — BetCalc Pro',
  description: 'Política de Privacidade do BetCalc Pro. Saiba como tratamos seus dados, quais informações coletamos e como protegemos sua privacidade.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/privacy',
  },
  openGraph: {
    title: 'Política de Privacidade — BetCalc Pro',
    description: 'Política de Privacidade do BetCalc Pro. Saiba como tratamos seus dados, quais informações coletamos e como protegemos sua privacidade.',
    url: 'https://betcalcpro.com.br/privacy',
    siteName: 'BetCalc Pro',
    images: [{ url: 'https://betcalcpro.com.br/og-image.png', width: 1344, height: 768 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política de Privacidade — BetCalc Pro',
    description: 'Política de Privacidade do BetCalc Pro. Saiba como tratamos seus dados, quais informações coletamos e como protegemos sua privacidade.',
    images: ['https://betcalcpro.com.br/og-image.png'],
  },
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Privacidade', url: 'https://betcalcpro.com.br/privacy' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Política de Privacidade — BetCalc Pro',
  description: 'Política de Privacidade do BetCalc Pro. Saiba como tratamos seus dados, quais informações coletamos e como protegemos sua privacidade.',
  url: 'https://betcalcpro.com.br/privacy',
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
