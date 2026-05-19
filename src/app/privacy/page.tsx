import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade do BetCalc Pro. Saiba como tratamos seus dados e protegemos sua privacidade.',
  openGraph: {
    title: 'Política de Privacidade | BetCalc Pro',
    description: 'Política de Privacidade do BetCalc Pro. Saiba como tratamos seus dados e protegemos sua privacidade.',
  },
}

export default function Page() {
  return <PageClient />
}
