import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça o BetCalc Pro, nossa missão e valores. Ferramentas matemáticas gratuitas para todos.',
  openGraph: {
    title: 'Sobre Nós | BetCalc Pro',
    description: 'Conheça o BetCalc Pro, nossa missão e valores. Ferramentas matemáticas gratuitas para todos.',
  },
}

export default function Page() {
  return <PageClient />
}
