import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a equipe BetCalc Pro. Fale conosco por e-mail ou formulário.',
  openGraph: {
    title: 'Contato | BetCalc Pro',
    description: 'Entre em contato com a equipe BetCalc Pro. Fale conosco por e-mail ou formulário.',
  },
}

export default function Page() {
  return <PageClient />
}
