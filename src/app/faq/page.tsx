import { Metadata } from 'next'
import { FAQPageClient } from './client'

export const metadata: Metadata = {
  title: 'Perguntas Frequentes',
  description: 'Perguntas frequentes sobre o BetCalc Pro, nossas ferramentas de probabilidade e gestão de risco, como usar as calculadoras e mais.',
  alternates: {
    canonical: 'https://betcalcpro.com.br/faq',
  },
  openGraph: {
    title: 'Perguntas Frequentes | BetCalc Pro',
    description: 'Tire suas dúvidas sobre as ferramentas do BetCalc Pro.',
    url: 'https://betcalcpro.com.br/faq',
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o BetCalc Pro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O BetCalc Pro é uma plataforma educacional gratuita que oferece calculadoras, simuladores e artigos sobre probabilidade, estatística e gestão de risco."
      }
    },
    {
      "@type": "Question",
      "name": "O BetCalc Pro é gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o BetCalc Pro é 100% gratuito. Todas as calculadoras, simuladores e artigos estão disponíveis sem custo."
      }
    },
    {
      "@type": "Question",
      "name": "O BetCalc Pro é um site de apostas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. O BetCalc Pro é uma ferramenta educacional. Não operamos plataformas de apostas, não aceitamos depósitos e não incentivamos atividades de risco."
      }
    },
    {
      "@type": "Question",
      "name": "Posso instalar o BetCalc Pro no celular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim! O BetCalc Pro é um Progressive Web App (PWA). No Android, toque nos três pontos do navegador e selecione 'Adicionar à tela inicial'. No iPhone (Safari), toque no ícone de compartilhar e selecione 'Adicionar à Tela de Início'."
      }
    },
    {
      "@type": "Question",
      "name": "As ferramentas garantem lucro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Nenhuma ferramenta matemática pode garantir lucro. As calculadoras do BetCalc Pro são educacionais e ajudam a entender probabilidades e riscos."
      }
    }
  ]
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQPageClient />
    </>
  )
}
