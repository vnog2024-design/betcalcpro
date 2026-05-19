import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Gerador de Estratégias de Gestão',
  description: 'Gere estratégias personalizadas de gestão de risco e capital.',
  openGraph: {
    title: 'Gerador de Estratégias de Gestão | BetCalc Pro',
    description: 'Gere estratégias personalizadas de gestão de risco e capital.',
  },
}

export default function Page() {
  return <PageClient />
}
