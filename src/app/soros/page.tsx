import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Progressão Geométrica',
  description: 'Calcule progressões geométricas e estratégias de crescimento de capital.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/soros',
  },
  openGraph: {
    title: 'Calculadora de Progressão Geométrica | BetCalc Pro',
    description: 'Calcule progressões geométricas e estratégias de crescimento de capital.',
    url: 'https://betcalcpro.com.br/soros',
  },
}

export default function Page() {
  return <PageClient />
}
