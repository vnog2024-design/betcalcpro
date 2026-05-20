import { Metadata } from 'next'
import { ArticlesPageClient } from './client'

export const metadata: Metadata = {
  title: 'Artigos sobre Probabilidade e Gestão de Risco',
  description: 'Artigos educacionais sobre probabilidade, estatística, gestão de risco e conceitos matemáticos aplicados. Conteúdo gratuito e informativo.',
  openGraph: {
    title: 'Artigos | BetCalc Pro',
    description: 'Artigos educacionais sobre probabilidade, estatística e gestão de risco.',
  },
}

export default function ArticlesPage() {
  return <ArticlesPageClient />
}
