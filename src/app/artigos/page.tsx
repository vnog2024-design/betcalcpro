import { Metadata } from 'next'
import { ArticlesPageClient } from './client'

export const metadata: Metadata = {
  title: 'Artigos sobre Probabilidade e Gestão de Risco',
  description: 'Artigos educacionais sobre probabilidade, estatística, gestão de risco e conceitos matemáticos aplicados. Conteúdo gratuito e informativo.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/artigos',
  },
  openGraph: {
    title: 'Artigos sobre Probabilidade e Gestão de Risco',
    description: 'Artigos educacionais sobre probabilidade, estatística e gestão de risco.',
    url: 'https://betcalcpro.com.br/artigos',
  },
}

export default function ArticlesPage() {
  return <ArticlesPageClient />
}
