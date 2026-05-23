import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Ciclos',
  description: 'Calculadora de ciclos com martingale limitado. Limite os gales por ciclo e recupere perdas no próximo ciclo.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/ciclos',
  },
  openGraph: {
    title: 'Calculadora de Ciclos',
    description: 'Calculadora de ciclos com martingale limitado. Limite os gales por ciclo e recupere perdas no próximo ciclo.',
    url: 'https://betcalcpro.com.br/ciclos',
  },
}

export default function Page() {
  return <PageClient />
}
