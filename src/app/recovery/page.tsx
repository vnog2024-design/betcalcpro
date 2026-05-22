import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Recuperação de Capital',
  description: 'Calcule planos de recuperação de capital com ferramentas matemáticas gratuitas.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/recovery',
  },
  openGraph: {
    title: 'Calculadora de Recuperação de Capital | BetCalc Pro',
    description: 'Calcule planos de recuperação de capital com ferramentas matemáticas gratuitas.',
    url: 'https://betcalcpro.com.br/recovery',
  },
}

export default function Page() {
  return <PageClient />
}
