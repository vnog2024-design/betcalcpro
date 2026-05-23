import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora Masaniello',
  description: 'Calculadora Masaniello para gestão avançada de capital e análise de cenários.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/masaniello',
  },
  openGraph: {
    title: 'Calculadora Masaniello',
    description: 'Calculadora Masaniello para gestão avançada de capital e análise de cenários.',
    url: 'https://betcalcpro.com.br/masaniello',
  },
}

export default function Page() {
  return <PageClient />
}
