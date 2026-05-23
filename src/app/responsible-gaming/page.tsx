import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Uso Responsável',
  description: 'Compromisso com uso responsável. Informações sobre limites, controle e responsabilidade.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/responsible-gaming',
  },
  openGraph: {
    title: 'Uso Responsável',
    description: 'Compromisso com uso responsável. Informações sobre limites, controle e responsabilidade.',
    url: 'https://betcalcpro.com.br/responsible-gaming',
  },
}

export default function Page() {
  return <PageClient />
}
