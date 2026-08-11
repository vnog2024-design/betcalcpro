import { Metadata } from 'next'
import { ArticlesPageClient } from './client'
import { generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'Artigos sobre Probabilidade e Gestão de Risco',
  description: 'Artigos educacionais sobre probabilidade, estatística, gestão de risco e conceitos matemáticos aplicados. Conteúdo gratuito e informativo.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/artigos',
  },
  openGraph: {
    title: 'Artigos sobre Probabilidade e Gestão de Risco',
    description: 'Artigos educacionais sobre probabilidade, estatística e gestão de risco.',
    url: 'https://betcalcpro.com.br/artigos',
    siteName: 'BetCalc Pro',
    images: [{ url: 'https://betcalcpro.com.br/og-image.png', width: 1344, height: 768 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artigos sobre Probabilidade e Gestão de Risco',
    description: 'Artigos educacionais sobre probabilidade, estatística e gestão de risco.',
    images: ['https://betcalcpro.com.br/og-image.png'],
  },
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Artigos', url: 'https://betcalcpro.com.br/artigos' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Artigos sobre Probabilidade e Gestão de Risco',
  description: 'Artigos educacionais sobre probabilidade, estatística, gestão de risco e conceitos matemáticos aplicados.',
  url: 'https://betcalcpro.com.br/artigos',
})

export default function ArticlesPage() {
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
      <ArticlesPageClient />
    </>
  )
}
