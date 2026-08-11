import { Metadata } from 'next'
import { PageClient } from './client'
import { generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'Política de Cookies — BetCalc Pro',
  description: 'Política de Cookies do BetCalc Pro. Entenda como utilizamos cookies essenciais e de publicidade no nosso site.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/cookies',
  },
  openGraph: {
    title: 'Política de Cookies — BetCalc Pro',
    description: 'Política de Cookies do BetCalc Pro. Entenda como utilizamos cookies essenciais e de publicidade no nosso site.',
    url: 'https://betcalcpro.com.br/cookies',
    siteName: 'BetCalc Pro',
    images: [{ url: 'https://betcalcpro.com.br/og-image.png', width: 1344, height: 768 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política de Cookies — BetCalc Pro',
    description: 'Política de Cookies do BetCalc Pro. Entenda como utilizamos cookies essenciais e de publicidade no nosso site.',
    images: ['https://betcalcpro.com.br/og-image.png'],
  },
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Cookies', url: 'https://betcalcpro.com.br/cookies' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Política de Cookies — BetCalc Pro',
  description: 'Política de Cookies do BetCalc Pro. Entenda como utilizamos cookies essenciais e de publicidade no nosso site.',
  url: 'https://betcalcpro.com.br/cookies',
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
