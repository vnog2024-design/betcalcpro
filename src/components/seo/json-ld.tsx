/**
 * Server-safe JSON-LD schema generators.
 * These return plain objects and can be used in Server Components.
 */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BetCalc Pro',
    url: 'https://betcalcpro.com.br',
    logo: 'https://betcalcpro.com.br/logo-icon.png',
    description:
      'Plataforma educacional gratuita com calculadoras, simuladores e artigos sobre probabilidade, estatística e gestão de risco.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://betcalcpro.com.br/contact',
      availableLanguage: ['Portuguese'],
    },
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BetCalc Pro',
    url: 'https://betcalcpro.com.br',
    description:
      'Calculadoras gratuitas de probabilidade, gestão de risco e análise estatística.',
    inLanguage: 'pt-BR',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://betcalcpro.com.br/artigos?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}

export function webApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BetCalc Pro',
    url: 'https://betcalcpro.com.br',
    description:
      'Plataforma educacional gratuita com calculadoras de probabilidade, gestão de risco, simuladores e artigos sobre matemática e estatística.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '320',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'BetCalc Pro',
      url: 'https://betcalcpro.com.br',
    },
  }
}

export function toolPageSchema(props: {
  name: string
  description: string
  url: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: props.name,
    url: props.url,
    description: props.description,
    applicationCategory: props.category || 'EducationalApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    author: {
      '@type': 'Organization',
      name: 'BetCalc Pro',
      url: 'https://betcalcpro.com.br',
    },
    isAccessibleForFree: true,
    inLanguage: 'pt-BR',
  }
}

export function webPageSchema(props: {
  name: string
  description: string
  url: string
  breadcrumbs?: { name: string; url: string }[]
}) {
  const items = [
    { name: 'Início', url: 'https://betcalcpro.com.br' },
    ...(props.breadcrumbs || []),
  ]

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: props.name,
      description: props.description,
      url: props.url,
      inLanguage: 'pt-BR',
      isPartOf: {
        '@type': 'WebSite',
        name: 'BetCalc Pro',
        url: 'https://betcalcpro.com.br',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  ]
}

export function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O que é o BetCalc Pro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O BetCalc Pro é uma plataforma educacional gratuita que oferece calculadoras, simuladores e artigos sobre probabilidade, estatística e gestão de risco. Nossas ferramentas ajudam você a entender conceitos matemáticos e tomar decisões mais informadas.',
        },
      },
      {
        '@type': 'Question',
        name: 'O BetCalc Pro é gratuito?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim, o BetCalc Pro é 100% gratuito. Todas as calculadoras, simuladores e artigos estão disponíveis sem custo.',
        },
      },
      {
        '@type': 'Question',
        name: 'O BetCalc Pro é um site de apostas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não. O BetCalc Pro é uma ferramenta educacional. Não operamos plataformas de apostas, não aceitamos depósitos, não processamos pagamentos e não incentivamos atividades de risco. Nossas ferramentas são para aprendizado de matemática e estatística.',
        },
      },
      {
        '@type': 'Question',
        name: 'Posso instalar o BetCalc Pro no celular?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim! O BetCalc Pro é um Progressive Web App (PWA). No Android, toque nos três pontos do navegador e selecione "Adicionar à tela inicial". No iPhone (Safari), toque no ícone de compartilhar e selecione "Adicionar à Tela de Início". Você terá acesso rápido como um aplicativo nativo.',
        },
      },
      {
        '@type': 'Question',
        name: 'Preciso criar uma conta para usar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não é necessário criar conta para usar as ferramentas. Você pode usar todas as calculadoras e simuladores livremente. A opção de login existe apenas para salvar suas preferências e histórico de cálculos no seu dispositivo.',
        },
      },
      {
        '@type': 'Question',
        name: 'O que é a calculadora Martingale?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A calculadora Martingale ajuda a visualizar a progressão geométrica que dobra o valor após cada perda. É uma ferramenta educacional para entender as propriedades matemáticas dessa progressão, incluindo o crescimento exponencial dos valores necessários e suas limitações teóricas.',
        },
      },
      {
        '@type': 'Question',
        name: 'O que é a calculadora Fibonacci?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A calculadora Fibonacci permite visualizar a sequência de Fibonacci aplicada a progressões. A sequência Fibonacci (1, 1, 2, 3, 5, 8, 13...) tem um crescimento menor que a Martingale, sendo útil para entender diferentes tipos de progressão matemática.',
        },
      },
      {
        '@type': 'Question',
        name: 'O que é a gestão de capital (bankroll)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A gestão de capital é o conjunto de regras e estratégias para administrar seu dinheiro de forma responsável. Nossa calculadora ajuda a determinar tamanhos de posição adequados com base no seu capital total e tolerância ao risco, seguindo princípios como a regra do 1-2%.',
        },
      },
      {
        '@type': 'Question',
        name: 'O que é a calculadora Masaniello?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A calculadora Masaniello é uma ferramenta avançada de gestão que combina probabilidade e alocação de capital. Ela calcula quantas operações são necessárias para atingir um objetivo de lucro, considerando a probabilidade de sucesso e o capital disponível.',
        },
      },
      {
        '@type': 'Question',
        name: 'O que é a progressão geométrica (Soros)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A progressão geométrica, também chamada de método Soros, reinveste os lucros de cada operação bem-sucedida na próxima. Ao contrário de progressões que aumentam após perdas, a progressão geométrica aumenta após ganhos, aproveitando sequências favoráveis.',
        },
      },
      {
        '@type': 'Question',
        name: 'Como funciona o simulador de probabilidades?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O simulador de probabilidades gera cenários aleatórios baseados em parâmetros que você define (probabilidade de sucesso, número de tentativas, etc.). É uma ferramenta didática para entender como a probabilidade funciona na prática e como a variância afeta os resultados no curto prazo.',
        },
      },
      {
        '@type': 'Question',
        name: 'O que é a regra do 1-2%?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A regra do 1-2% é um princípio de gestão de risco que recomenda nunca arriscar mais de 1% a 2% do seu capital total em uma única operação. Por exemplo, se você tem R$1.000, o máximo recomendado por operação seria entre R$10 e R$20. Isso protege seu capital contra sequências adversas.',
        },
      },
      {
        '@type': 'Question',
        name: 'As ferramentas garantem lucro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não. Nenhuma ferramenta matemática pode garantir lucro. As calculadoras do BetCalc Pro são educacionais e ajudam a entender probabilidades e riscos, mas não preveem resultados. Toda decisão envolve incerteza e risco de perda.',
        },
      },
      {
        '@type': 'Question',
        name: 'Os artigos são confiáveis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nossos artigos são escritos com base em conceitos matemáticos e estatísticos consagrados, como teoria das probabilidades, estatística descritiva e análise de risco. O conteúdo é voltado para educação e não deve ser interpretado como aconselhamento financeiro.',
        },
      },
      {
        '@type': 'Question',
        name: 'O BetCalc Pro armazena meus dados?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Os dados das calculadoras (histórico de cálculos, preferências de tema) são armazenados apenas no seu navegador (localStorage). Não enviamos esses dados para servidores externos. Você pode limpar seus dados a qualquer momento nas configurações do navegador.',
        },
      },
    ],
  }
}
