import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Analisador de Sequências',
  description: 'Analise padrões em sequências de resultados com ferramentas estatísticas gratuitas.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/sequence-analyzer',
  },
  openGraph: {
    title: 'Analisador de Sequências',
    description: 'Analise padrões em sequências de resultados com ferramentas estatísticas gratuitas.',
    url: 'https://betcalcpro.com.br/sequence-analyzer',
  },
}

export default function Page() {
  return <PageClient />
}
