import { Metadata } from 'next'
import { MartingalePageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Progressão Martingale',
  description: 'Calcule progressões Martingale com níveis ilimitados. Ferramenta matemática gratuita para análise de progressões e gestão de risco.',
  openGraph: {
    title: 'Calculadora de Progressão Martingale | BetCalc Pro',
    description: 'Calcule progressões Martingale com níveis ilimitados. Ferramenta matemática gratuita.',
  },
}

export default function MartingalePage() {
  return <MartingalePageClient />
}
