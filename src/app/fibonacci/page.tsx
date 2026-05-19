import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Sequência Fibonacci',
  description: 'Calcule progressões Fibonacci. Ferramenta matemática gratuita para análise de sequências.',
  openGraph: {
    title: 'Calculadora de Sequência Fibonacci | BetCalc Pro',
    description: 'Calcule progressões Fibonacci. Ferramenta matemática gratuita para análise de sequências.',
  },
}

export default function Page() {
  return <PageClient />
}
