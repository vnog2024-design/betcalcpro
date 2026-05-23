import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Simulador de Probabilidades',
  description: 'Simule probabilidades e cenários com ferramentas matemáticas e estatísticas gratuitas.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/probability-simulator',
  },
  openGraph: {
    title: 'Simulador de Probabilidades',
    description: 'Simule probabilidades e cenários com ferramentas matemáticas e estatísticas gratuitas.',
    url: 'https://betcalcpro.com.br/probability-simulator',
  },
}

export default function Page() {
  return <PageClient />
}
