import { Metadata } from 'next'
import { ArticlePageClient } from './client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const articles: Record<string, { title: string; description: string }> = {
    'introducao-probabilidade': {
      title: 'Introdução à Teoria das Probabilidades',
      description: 'Aprenda os conceitos fundamentais da teoria das probabilidades e como aplicá-los na tomada de decisão.',
    },
    'gestao-risco-capital': {
      title: 'Gestão de Risco e Capital',
      description: 'Princípios fundamentais de gestão de risco e capital para tomada de decisão informada.',
    },
    'sequencia-fibonacci-matematica': {
      title: 'A Sequência Fibonacci na Matemática',
      description: 'Entenda a sequência de Fibonacci, suas propriedades matemáticas e aplicações práticas.',
    },
    'progressao-martingale-analise': {
      title: 'Análise Matemática da Progressão Martingale',
      description: 'Análise teórica da progressão Martingale, suas propriedades e limitações matemáticas.',
    },
    'estatistica-descritiva-basica': {
      title: 'Estatística Descritiva Básica',
      description: 'Conceitos de estatística descritiva: média, mediana, variância e desvio padrão explicados.',
    },
    'simulacao-monte-carlo': {
      title: 'Simulação de Monte Carlo',
      description: 'Entenda o método de Monte Carlo e como simulações probabilísticas ajudam na análise de cenários.',
    },
    'falacias-estatisticas': {
      title: 'Falácias Estatísticas Comuns',
      description: 'Conheça as falácias estatísticas mais comuns e aprenda a evitá-las na análise de dados.',
    },
    'valor-esperado-matematico': {
      title: 'Valor Esperado Matemático',
      description: 'O conceito de valor esperado na matemática e sua importância na tomada de decisão racional.',
    },
  }
  
  const article = articles[slug]
  if (!article) return { title: 'Artigo não encontrado' }
  
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} | BetCalc Pro`,
      description: article.description,
    },
  }
}

export default function ArticlePage({ params }: PageProps) {
  return <ArticlePageClient params={params} />
}
