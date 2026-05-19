import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Analisador de Sequências',
  description: 'Analise padrões em sequências de resultados com ferramentas estatísticas gratuitas.',
  openGraph: {
    title: 'Analisador de Sequências | BetCalc Pro',
    description: 'Analise padrões em sequências de resultados com ferramentas estatísticas gratuitas.',
  },
}

export default function Page() {
  return <PageClient />
}
