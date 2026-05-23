import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a equipe BetCalc Pro. Fale conosco por e-mail ou formulário.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/contact',
  },
  openGraph: {
    title: 'Contato',
    description: 'Entre em contato com a equipe BetCalc Pro. Fale conosco por e-mail ou formulário.',
    url: 'https://betcalcpro.com.br/contact',
  },
}

export default function Page() {
  return <PageClient />
}
