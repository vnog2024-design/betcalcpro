'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from '@/components/admin/admin-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Megaphone, Eye, EyeOff, Users, Mail } from 'lucide-react'

interface Stats {
  posts: number
  publishedPosts: number
  activeAds: number
  totalAds: number
  subscribers: number
  messages: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    posts: 0,
    publishedPosts: 0,
    activeAds: 0,
    totalAds: 0,
    subscribers: 0,
    messages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const [postsRes, adsRes, subsRes, msgsRes] = await Promise.all([
          fetch('/api/admin/posts'),
          fetch('/api/admin/ads'),
          fetch('/api/subscribe').catch(() => null),
          fetch('/api/contact/messages?limit=1').catch(() => null),
        ])
        const posts = postsRes.ok ? await postsRes.json() : []
        const adsData = adsRes.ok ? await adsRes.json() : {}
        const subsData = subsRes?.ok ? await subsRes.json() : []
        const msgsData = msgsRes?.ok ? await msgsRes.json() : { total: 0 }

        const adsList = Object.values(adsData) as { enabled: boolean }[]
        setStats({
          posts: posts.length,
          publishedPosts: posts.filter((p: { published: boolean }) => p.published).length,
          activeAds: adsList.filter((a) => a.enabled).length,
          totalAds: adsList.length,
          subscribers: Array.isArray(subsData) ? subsData.length : 0,
          messages: msgsData.total || 0,
        })
      } catch {
        // keep defaults
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const cards = [
    { label: 'Total de Postagens', value: stats.posts, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Postagens Publicadas', value: stats.publishedPosts, icon: Eye, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Postagens Rascunho', value: stats.posts - stats.publishedPosts, icon: EyeOff, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Anúncios Ativos', value: `${stats.activeAds}/${stats.totalAds}`, icon: Megaphone, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Inscritos E-mail', value: stats.subscribers, icon: Mail, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Mensagens Contato', value: stats.messages, icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  ]

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Visão geral do painel administrativo</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 bg-gray-800 rounded" />
                    <div className="h-8 w-16 bg-gray-800 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <Card key={card.label} className="border-gray-800 bg-gray-900/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      {card.label}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${card.bg}`}>
                      <Icon className={`w-4 h-4 ${card.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="text-2xl font-bold text-white">{card.value}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <Card className="border-gray-800 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-white text-lg">Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Versão</span>
              <span className="text-white">BetCalc Pro Admin v1.0</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Login padrão</span>
              <span className="text-amber-400 font-medium">admin / admin123</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Acesso</span>
              <span className="text-white">/admin</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-amber-400 text-xs">
              Recomendação: Altere a senha padrão imediatamente clicando em &quot;Alterar Senha&quot; no menu lateral.
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}