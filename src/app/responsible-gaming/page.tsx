import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Uso Responsável',
  description: 'Compromisso com uso responsável. Informações sobre limites, controle e responsabilidade.',
  openGraph: {
    title: 'Uso Responsável | BetCalc Pro',
    description: 'Compromisso com uso responsável. Informações sobre limites, controle e responsabilidade.',
  },
}

export default function Page() {
  return <PageClient />
}
