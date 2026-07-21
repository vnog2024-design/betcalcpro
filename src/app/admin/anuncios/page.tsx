'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminShell } from '@/components/admin/admin-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Save, Loader2, CheckCircle2, Code, Monitor, RectangleVertical,
  Rss, Bell, ArrowRightLeft, Megaphone,
} from 'lucide-react'

/* ───────────── Types ───────────── */

interface AdConfigItem {
  value: string
  enabled: boolean
  label: string
}

type AdConfigs = Record<string, AdConfigItem>

/* ───────────── Slot Definitions —-widgets reais do Adskeeper ───────────── */

interface SlotDef {
  key: string
  label: string
  description: string
  icon: React.ElementType
  color: string
  bg: string
  group: 'widget' | 'special'
  placeholder: string
}

const SLOTS: SlotDef[] = [
  // Widgets normais
  { key: 'header_banner',  label: 'Widget do Cabeçalho',       description: 'Banner no topo da área de conteúdo, antes das ferramentas.',          icon: Monitor,          color: 'text-blue-400',   bg: 'bg-blue-500/10',   group: 'widget',  placeholder: '2056709' },
  { key: 'sidebar',        label: 'Widget da Barra Lateral',     description: 'Widget na barra lateral de navegação, visível em todas as páginas.',   icon: RectangleVertical, color: 'text-purple-400', bg: 'bg-purple-500/10', group: 'widget',  placeholder: '2056711' },
  { key: 'below_article',  label: 'Widget Embaixo do Artigo',   description: 'Aparece após o conteúdo de cada artigo educacional.',                   icon: Rss,              color: 'text-green-400',  bg: 'bg-green-500/10',  group: 'widget',  placeholder: '2056706' },
  { key: 'in_article',     label: 'Widget no Artigo',           description: 'Aparece no meio do conteúdo do artigo.',                                icon: Rss,              color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   group: 'widget',  placeholder: '2056707' },
  { key: 'feed',           label: 'Feed',                        description: 'Anúncios nativos entre os cards de conteúdo (calculadoras, artigos).',  icon: Rss,              color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   group: 'widget',  placeholder: '2056705' },

  // Formatos Especiais
  { key: 'notification',   label: 'Notificação no Site',        description: 'Barra fixa na parte inferior da tela. Fecha com um clique (1x por sessão).', icon: Bell,             color: 'text-orange-400', bg: 'bg-orange-500/10', group: 'special', placeholder: '2056713' },
  { key: 'exit_popup',     label: 'Sair do Pop-up',             description: 'Popup que aparece quando o usuário move o mouse para sair do site (exit intent).', icon: ArrowRightLeft,  color: 'text-red-400',    bg: 'bg-red-500/10',    group: 'special', placeholder: '2056714' },
]

const HEADER_SLOT = {
  key: 'header_code',
  label: 'Código no Header',
  description: 'Script de carregamento do Adskeeper (obrigatório para todos os widgets funcionarem).',
  placeholder: '<script src="https://jsc.adskeeper.com/site/1104734.js" async></script>',
}

/* ───────────── Component ───────────── */

export default function AdminAnunciosPage() {
  const [configs, setConfigs] = useState<AdConfigs>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const loadConfigs = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/ads')
      if (res.ok) {
        const data = await res.json()
        setConfigs(data)
      }
    } catch { /* ignore */ } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadConfigs() }, [loadConfigs])

  const updateValue = (key: string, value: string) => {
    setConfigs((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }))
    setSaved(false)
  }

  const toggleEnabled = (key: string) => {
    setConfigs((prev) => {
      const current = prev[key]
      if (!current) return prev
      return {
        ...prev,
        [key]: { ...current, enabled: !current.enabled },
      }
    })
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const updates = Object.entries(configs).map(([key, conf]) => ({
        key,
        value: conf.value,
        enabled: conf.enabled,
        label: conf.label,
      }))
      const res = await fetch('/api/admin/ads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch { /* ignore */ } finally {
      setSaving(false)
    }
  }

  const widgetSlots = SLOTS.filter((s) => s.group === 'widget')
  const specialSlots = SLOTS.filter((s) => s.group === 'special')
  const enabledCount = Object.values(configs).filter((c) => c.enabled).length
  const totalCount = Object.keys(configs).length

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Anúncios</h1>
            <p className="text-gray-400 mt-1">
              {enabledCount}/{totalCount} posições ativas — Adskeeper (MGID)
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-neon hover:bg-neon/90 text-black font-semibold min-w-[140px]"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : saved ? (
              <CheckCircle2 className="h-4 w-4 mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saved ? 'Salvo!' : 'Salvar Tudo'}
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-32 bg-gray-800 rounded" />
                    <div className="h-10 bg-gray-800 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Código no Header */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-white">Código no Header</h2>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
                  Obrigatório
                </Badge>
              </div>
              <Card className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-300">{HEADER_SLOT.description}</p>
                    <Switch
                      checked={configs.header_code?.enabled ?? false}
                      onCheckedChange={() => toggleEnabled('header_code')}
                    />
                  </div>
                  <Textarea
                    value={configs.header_code?.value || ''}
                    onChange={(e) => updateValue('header_code', e.target.value)}
                    placeholder={HEADER_SLOT.placeholder}
                    className="font-mono text-xs bg-gray-800/50 border-gray-700 text-gray-300 min-h-[60px]"
                    rows={2}
                  />
                </CardContent>
              </Card>
            </section>

            <Separator className="bg-gray-800" />

            {/* Widgets Adskeeper */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Monitor className="h-5 w-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Widgets Adskeeper</h2>
                <span className="text-xs text-gray-500">Widget ID de cada posição</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {widgetSlots.map((slot) => (
                  <SlotCard
                    key={slot.key}
                    slot={slot}
                    value={configs[slot.key]?.value || ''}
                    enabled={configs[slot.key]?.enabled ?? false}
                    onValueChange={(v) => updateValue(slot.key, v)}
                    onToggle={() => toggleEnabled(slot.key)}
                  />
                ))}
              </div>
            </section>

            <Separator className="bg-gray-800" />

            {/* Formatos Especiais */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-orange-400" />
                <h2 className="text-lg font-semibold text-white">Formatos Especiais</h2>
                <span className="text-xs text-gray-500">1x por sessão</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialSlots.map((slot) => (
                  <SlotCard
                    key={slot.key}
                    slot={slot}
                    value={configs[slot.key]?.value || ''}
                    enabled={configs[slot.key]?.enabled ?? false}
                    onValueChange={(v) => updateValue(slot.key, v)}
                    onToggle={() => toggleEnabled(slot.key)}
                  />
                ))}
              </div>
            </section>

            <Separator className="bg-gray-800" />

            {/* Info */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <Megaphone className="h-5 w-5 text-neon mt-0.5 shrink-0" />
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>
                      <strong className="text-gray-300">Como funciona:</strong> O preloader do Adskeeper é carregado no header. Cada widget usa um <code className="text-neon bg-neon/10 px-1 rounded">div data-type="_mgwidget"</code> com o Widget ID correspondente, seguido de um trigger <code className="text-neon bg-neon/10 px-1 rounded">_mgc.load</code>.
                    </p>
                    <p>
                      <strong className="text-gray-300">Painel Adskeeper:</strong> Acesse <a href="https://dashboard.adskeeper.com" target="_blank" className="text-neon hover:underline">dashboard.adskeeper.com</a> para ver métricas e criar novos widgets.
                    </p>
                    <p>
                      <strong className="text-gray-300">Widget ID:</strong> É o número identificador de cada widget (ex: 2056705). Cole apenas o número no campo acima.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminShell>
  )
}

/* ───────────── Slot Card ───────────── */

function SlotCard({
  slot,
  value,
  enabled,
  onValueChange,
  onToggle,
}: {
  slot: SlotDef
  value: string
  enabled: boolean
  onValueChange: (v: string) => void
  onToggle: () => void
}) {
  const Icon = slot.icon
  return (
    <Card className={`border-gray-800 bg-gray-900/50 transition-colors ${enabled ? 'ring-1 ring-neon/20' : ''}`}>
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${slot.bg}`}>
              <Icon className={`h-4 w-4 ${slot.color}`} />
            </div>
            <CardTitle className="text-sm font-semibold text-white">{slot.label}</CardTitle>
            {enabled && (
              <Badge className="bg-neon/20 text-neon border-neon/30 text-[10px]">Ativo</Badge>
            )}
          </div>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        <p className="text-xs text-gray-500 leading-relaxed">{slot.description}</p>
        <div className="space-y-1.5">
          <Label className="text-gray-400 text-xs">Widget ID (Adskeeper)</Label>
          <Input
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={slot.placeholder}
            disabled={!enabled}
            className="bg-gray-800/50 border-gray-700 text-gray-300 text-sm h-9 font-mono"
          />
        </div>
      </CardContent>
    </Card>
  )
}