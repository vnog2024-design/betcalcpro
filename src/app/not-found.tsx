import { Metadata } from 'next'
import NotFoundClient from './not-found-client'

export const metadata: Metadata = {
  title: 'Página Não Encontrada',
  description: 'A página que você procura não existe ou foi movida.',
}

export default function NotFound() {
  return <NotFoundClient />
}
