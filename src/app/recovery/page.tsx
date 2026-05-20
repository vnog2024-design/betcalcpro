import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Recuperação de Capital',
  description: 'Calcule planos de recuperação de capital com ferramentas matemáticas gratuitas.',
  openGraph: {
    title: 'Calculadora de Recuperação de Capital | BetCalc Pro',
    description: 'Calcule planos de recuperação de capital com ferramentas matemáticas gratuitas.',
  },
}

export default function Page() {
  return <PageClient />
}
