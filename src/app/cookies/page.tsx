import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de Cookies do BetCalc Pro. Saiba como utilizamos cookies em nosso site.',
  openGraph: {
    title: 'Política de Cookies | BetCalc Pro',
    description: 'Política de Cookies do BetCalc Pro. Saiba como utilizamos cookies em nosso site.',
  },
}

export default function Page() {
  return <PageClient />
}
