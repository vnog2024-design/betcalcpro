import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso do BetCalc Pro. Conheça as condições de utilização das nossas ferramentas.',
  openGraph: {
    title: 'Termos de Uso | BetCalc Pro',
    description: 'Termos de Uso do BetCalc Pro. Conheça as condições de utilização das nossas ferramentas.',
  },
}

export default function Page() {
  return <PageClient />
}
