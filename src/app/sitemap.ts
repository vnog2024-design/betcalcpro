import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://betcalcpro.com.br'

  const tools = [
    'martingale',
    'bankroll',
    'fibonacci',
    'masaniello',
    'soros',
    'recovery',
    'sequence-analyzer',
    'probability-simulator',
    'strategy-generator',
    'hedging',
    'ciclos',
  ]

  const legal = [
    'faq',
    'privacy',
    'terms',
    'responsible-gaming',
    'contact',
    'about',
    'cookies',
  ]

  const articles = [
    'introducao-probabilidade',
    'gestao-risco-capital',
    'sequencia-fibonacci-matematica',
    'progressao-martingale-analise',
    'estatistica-descritiva-basica',
    'simulacao-monte-carlo',
    'falacias-estatisticas',
    'valor-esperado-matematico',
    'paradoxo-monty-hall',
    'lei-grandes-numeros',
    'distribuicao-normal-gaussiana',
    'introducao-teoria-jogos',
    'como-calcular-probabilidades-odds',
    'o-que-e-drawdown',
    'guia-gestao-bankroll-apostas',
    'sistema-masaniello-pratica',
    'hedging-apostas-guia-completo',
    'fibonacci-vs-martingale',
    'como-identificar-value-bets',
    'lucro-esperado-vs-retorno',
  ]

  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/artigos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/user-panel`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...legal.map((page) => ({
      url: `${baseUrl}/${page}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
    ...articles.map((slug) => ({
      url: `${baseUrl}/artigos/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
