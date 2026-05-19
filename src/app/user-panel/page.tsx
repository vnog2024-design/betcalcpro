import { Metadata } from 'next'
import { UserPanelClient } from './client'

export const metadata: Metadata = {
  title: 'Meu Painel',
  description: 'Seu dashboard pessoal com histórico, conquistas e favoritos.',
}

export default function UserPanelPage() {
  return <UserPanelClient />
}
