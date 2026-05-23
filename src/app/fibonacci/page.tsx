import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Sequência Fibonacci',
  description: 'Calcule progressões Fibonacci. Ferramenta matemática gratuita para análise de sequências.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/fibonacci',
  },
  openGraph: {
    title: 'Calculadora de Sequência Fibonacci',
    description: 'Calcule progressões Fibonacci. Ferramenta matemática gratuita para análise de sequências.',
    url: 'https://betcalcpro.com.br/fibonacci',
  },
}

export default function Page() {
  return <PageClient />
}
