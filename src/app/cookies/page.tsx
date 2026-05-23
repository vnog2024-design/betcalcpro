import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de Cookies do BetCalc Pro. Saiba como utilizamos cookies em nosso site.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/cookies',
  },
  openGraph: {
    title: 'Política de Cookies',
    description: 'Política de Cookies do BetCalc Pro. Saiba como utilizamos cookies em nosso site.',
    url: 'https://betcalcpro.com.br/cookies',
  },
}

export default function Page() {
  return <PageClient />
}
