import { Metadata } from 'next'
import { MartingalePageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Progressão Martingale',
  description: 'Calcule progressões Martingale com níveis ilimitados. Ferramenta matemática gratuita para análise de progressões e gestão de risco.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/martingale',
  },
  openGraph: {
    title: 'Calculadora de Progressão Martingale | BetCalc Pro',
    description: 'Calcule progressões Martingale com níveis ilimitados. Ferramenta matemática gratuita.',
    url: 'https://betcalcpro.com.br/martingale',
  },
}

export default function MartingalePage() {
  return <MartingalePageClient />
}
