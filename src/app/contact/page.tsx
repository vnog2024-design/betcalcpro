import { Metadata } from 'next'
import { PageClient } from './client'
import { generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'Contato — BetCalc Pro',
  description: 'Entre em contato com a equipe BetCalc Pro. Envie dúvidas, sugestões ou reporte problemas pelo nosso formulário de contato.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/contact',
  },
  openGraph: {
    title: 'Contato — BetCalc Pro',
    description: 'Entre em contato com a equipe BetCalc Pro. Envie dúvidas, sugestões ou reporte problemas pelo nosso formulário de contato.',
    url: 'https://betcalcpro.com.br/contact',
    siteName: 'BetCalc Pro',
    images: [{ url: 'https://betcalcpro.com.br/og-image.png', width: 1344, height: 768 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contato — BetCalc Pro',
    description: 'Entre em contato com a equipe BetCalc Pro. Envie dúvidas, sugestões ou reporte problemas pelo nosso formulário de contato.',
    images: ['https://betcalcpro.com.br/og-image.png'],
  },
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Contato', url: 'https://betcalcpro.com.br/contact' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Contato — BetCalc Pro',
  description: 'Entre em contato com a equipe BetCalc Pro. Envie dúvidas, sugestões ou reporte problemas pelo nosso formulário de contato.',
  url: 'https://betcalcpro.com.br/contact',
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
