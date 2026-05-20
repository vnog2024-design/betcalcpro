import { Metadata } from 'next'
import { FAQPageClient } from './client'

export const metadata: Metadata = {
  title: 'Perguntas Frequentes',
  description: 'Perguntas frequentes sobre o BetCalc Pro, nossas ferramentas de probabilidade e gestão de risco, como usar as calculadoras e mais.',
  openGraph: {
    title: 'Perguntas Frequentes | BetCalc Pro',
    description: 'Tire suas dúvidas sobre as ferramentas do BetCalc Pro.',
  },
}

export default function FAQPage() {
  return <FAQPageClient />
}
