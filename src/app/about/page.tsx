import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça o BetCalc Pro, nossa missão e valores. Ferramentas matemáticas gratuitas para todos.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/about',
  },
  openGraph: {
    title: 'Sobre Nós | BetCalc Pro',
    description: 'Conheça o BetCalc Pro, nossa missão e valores. Ferramentas matemáticas gratuitas para todos.',
    url: 'https://betcalcpro.com.br/about',
  },
}

export default function Page() {
  return <PageClient />
}
