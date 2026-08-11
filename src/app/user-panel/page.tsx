import { Metadata } from 'next'
import { UserPanelClient } from './client'
import { generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'Meu Painel — BetCalc Pro',
  description: 'Seu dashboard pessoal com histórico de cálculos, conquistas e preferências salvas localmente no dispositivo.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/user-panel',
  },
  openGraph: {
    title: 'Meu Painel — BetCalc Pro',
    description: 'Seu dashboard pessoal com histórico de cálculos, conquistas e preferências salvas localmente no dispositivo.',
    url: 'https://betcalcpro.com.br/user-panel',
    siteName: 'BetCalc Pro',
    images: [{ url: 'https://betcalcpro.com.br/og-image.png', width: 1344, height: 768 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meu Painel — BetCalc Pro',
    description: 'Seu dashboard pessoal com histórico de cálculos, conquistas e preferências salvas localmente no dispositivo.',
    images: ['https://betcalcpro.com.br/og-image.png'],
  },
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Painel', url: 'https://betcalcpro.com.br/user-panel' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Meu Painel — BetCalc Pro',
  description: 'Seu dashboard pessoal com histórico de cálculos, conquistas e preferências salvas localmente no dispositivo.',
  url: 'https://betcalcpro.com.br/user-panel',
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
      <UserPanelClient />
    </>
  )
}
