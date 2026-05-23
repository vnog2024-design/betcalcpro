import { Metadata } from 'next'
import { ArticlePageClient } from './client'

interface PageProps {
  params: Promise<{ slug: string }>
}

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
  'paradoxo-monty-hall': {
    title: 'O Paradoxo de Monty Hall',
    description: 'Entenda o famoso paradoxo de Monty Hall e por que a intuição nos engana sobre probabilidade.',
  },
  'lei-grandes-numeros': {
    title: 'A Lei dos Grandes Números',
    description: 'Compreenda a Lei dos Grandes Números e sua importância para a estatística e análise de dados.',
  },
  'distribuicao-normal-gaussiana': {
    title: 'A Distribuição Normal (Gaussiana)',
    description: 'Aprenda sobre a distribuição normal, suas propriedades e por que é tão importante na estatística.',
  },
  'introducao-teoria-jogos': {
    title: 'Introdução à Teoria dos Jogos',
    description: 'Conheça os conceitos fundamentais da teoria dos jogos e suas aplicações práticas.',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  if (!article) return { title: 'Artigo não encontrado' }
  
  const url = `https://betcalcpro.com.br/artigos/${slug}`
  
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: 'article',
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = articles[slug]

  const articleJsonLd = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": "BetCalc Pro"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BetCalc Pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://betcalcpro.com.br/logo-icon.png"
      }
    },
    "url": `https://betcalcpro.com.br/artigos/${slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://betcalcpro.com.br/artigos/${slug}`
    },
    "inLanguage": "pt-BR",
    "datePublished": "2025-01-15",
    "dateModified": new Date().toISOString().split('T')[0]
  } : null

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <ArticlePageClient params={params} />
    </>
  )
}
