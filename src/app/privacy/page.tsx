import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade do BetCalc Pro. Saiba como tratamos seus dados e protegemos sua privacidade.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/privacy',
  },
  openGraph: {
    title: 'Política de Privacidade',
    description: 'Política de Privacidade do BetCalc Pro. Saiba como tratamos seus dados e protegemos sua privacidade.',
    url: 'https://betcalcpro.com.br/privacy',
  },
}

export default function Page() {
  return <PageClient />
}
