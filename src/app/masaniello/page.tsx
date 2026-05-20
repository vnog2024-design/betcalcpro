import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora Masaniello',
  description: 'Calculadora Masaniello para gestão avançada de capital e análise de cenários.',
  openGraph: {
    title: 'Calculadora Masaniello | BetCalc Pro',
    description: 'Calculadora Masaniello para gestão avançada de capital e análise de cenários.',
  },
}

export default function Page() {
  return <PageClient />
}
