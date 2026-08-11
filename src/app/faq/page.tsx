import { Metadata } from 'next'
import { FAQPageClient } from './client'
import { faqPageSchema } from '@/components/seo/json-ld'
import { generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'Perguntas Frequentes — BetCalc Pro',
  description: 'Perguntas frequentes sobre o BetCalc Pro, nossas ferramentas de probabilidade e gestão de risco, como usar as calculadoras, privacidade e mais.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/faq',
  },
  openGraph: {
    title: 'Perguntas Frequentes — BetCalc Pro',
    description: 'Tire suas dúvidas sobre as ferramentas do BetCalc Pro: calculadoras, simuladores, privacidade e mais.',
    url: 'https://betcalcpro.com.br/faq',
    siteName: 'BetCalc Pro',
    images: [{ url: '/og-image.png', width: 1344, height: 768 }],
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Perguntas Frequentes — BetCalc Pro',
    description: 'Tire suas dúvidas sobre as ferramentas do BetCalc Pro.',
    images: ['https://betcalcpro.com.br/og-image.png'],
  },
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'FAQ', url: 'https://betcalcpro.com.br/faq' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Perguntas Frequentes',
  description: 'Perguntas frequentes sobre o BetCalc Pro.',
  url: 'https://betcalcpro.com.br/faq',
})

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FAQPageClient />
    </>
  )
}
