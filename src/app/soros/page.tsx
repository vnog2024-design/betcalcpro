import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Progressão Geométrica',
  description: 'Calcule progressões geométricas e estratégias de crescimento de capital.',
  openGraph: {
    title: 'Calculadora de Progressão Geométrica | BetCalc Pro',
    description: 'Calcule progressões geométricas e estratégias de crescimento de capital.',
  },
}

export default function Page() {
  return <PageClient />
}
