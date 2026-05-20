import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Simulador de Probabilidades',
  description: 'Simule probabilidades e cenários com ferramentas matemáticas e estatísticas gratuitas.',
  openGraph: {
    title: 'Simulador de Probabilidades | BetCalc Pro',
    description: 'Simule probabilidades e cenários com ferramentas matemáticas e estatísticas gratuitas.',
  },
}

export default function Page() {
  return <PageClient />
}
