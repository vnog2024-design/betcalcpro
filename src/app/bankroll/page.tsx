import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Gestão de Capital',
  description: 'Calcule sua banca ideal e gerencie riscos com ferramentas matemáticas gratuitas.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/bankroll',
  },
  openGraph: {
    title: 'Calculadora de Gestão de Capital',
    description: 'Calcule sua banca ideal e gerencie riscos com ferramentas matemáticas gratuitas.',
    url: 'https://betcalcpro.com.br/bankroll',
  },
}

export default function Page() {
  return <PageClient />
}
