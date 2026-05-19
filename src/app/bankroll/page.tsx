import { Metadata } from 'next'
import { PageClient } from './client'

export const metadata: Metadata = {
  title: 'Calculadora de Gestão de Capital',
  description: 'Calcule sua banca ideal e gerencie riscos com ferramentas matemáticas gratuitas.',
  openGraph: {
    title: 'Calculadora de Gestão de Capital | BetCalc Pro',
    description: 'Calcule sua banca ideal e gerencie riscos com ferramentas matemáticas gratuitas.',
  },
}

export default function Page() {
  return <PageClient />
}
