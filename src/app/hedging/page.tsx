import { Metadata } from 'next'
import { HedgingPageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Cobertura (Hedging)',
  description: 'Calcule estratégias de cobertura (hedging) para dois resultados simultâneos. Ferramenta matemática gratuita de gestão de risco e probabilidade.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/hedging',
  },
  openGraph: {
    title: 'Calculadora de Cobertura (Hedging) | BetCalc Pro',
    description: 'Calcule estratégias de cobertura para dois resultados simultâneos com recuperação Martingale.',
    url: 'https://betcalcpro.com.br/hedging',
  },
}

export default function HedgingPage() {
  return <HedgingPageClient />
}
