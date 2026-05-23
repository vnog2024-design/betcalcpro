import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso do BetCalc Pro. Conheça as condições de utilização das nossas ferramentas.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/terms',
  },
  openGraph: {
    title: 'Termos de Uso',
    description: 'Termos de Uso do BetCalc Pro. Conheça as condições de utilização das nossas ferramentas.',
    url: 'https://betcalcpro.com.br/terms',
  },
}

export default function Page() {
  return <PageClient />
}
