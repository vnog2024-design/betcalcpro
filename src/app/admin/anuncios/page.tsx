'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminShell } from '@/components/admin/admin-shell'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Save, Loader2, RefreshCw, CheckCircle2, Code, FileText, Monitor, LayoutGrid, RectangleVertical, List, Film } from 'lucide-react'

interface AdConfigItem {
  value: string
  enabled: boolean
  label: string
}

type AdConfigs = Record<string, AdConfigItem>

const AD_ICONS: Record<string, React.ElementType> = {
  header_code: Code,
  ads_txt: FileText,
  banner_top: Monitor,
  banner_middle: LayoutGrid,
  banner_bottom: Monitor,
  in_content: FileText,
  in_article: FileText,
  sidebar_ad: RectangleVertical,
  in_feed: List,
  videowall_code: Film,
}

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

  const updateConfig = (key: string, field: 'value' | 'enabled', val: string | boolean) => {
    setConfigs((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: val,
      },
    }))
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

  // Group configs
  const generalAds = ['header_code', 'ads_txt']
  const locationAds = ['banner_top', 'banner_middle', 'banner_bottom', 'in_content', 'in_article', 'sidebar_ad', 'in_feed']
  const videowallAds = ['videowall_code']

  const renderAdCard = (key: string) => {
    const config = configs[key]
    if (!config) return null
    const Icon = AD_ICONS[key] || Code

    return (
      <Card key={key} className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 rounded-lg bg-gray-800 shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                  {key === 'header_code' && 'Código no Header'}
                  {key === 'ads_txt' && 'Ads.txt'}
                  {key === 'banner_top' && 'Banner Topo'}
                  {key === 'banner_middle' && 'Banner Meio'}
                  {key === 'banner_bottom' && 'Banner Rodapé'}
                  {key === 'in_content' && 'In-Content'}
                  {key === 'in_article' && 'In-Article'}
                  {key === 'sidebar_ad' && 'Sidebar'}
                  {key === 'in_feed' && 'In-Feed'}
                  {key === 'videowall_code' && 'Videowall (Tela Cheia)'}
                  {config.enabled ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">Ativo</Badge>
                  ) : (
                    <Badge className="bg-gray-800 text-gray-500 text-[10px]">Inativo</Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {config.label}
                </CardDescription>
              </div>
            </div>
            <Switch
              checked={config.enabled}
              onCheckedChange={(checked) => updateConfig(key, 'enabled', checked)}
              className="shrink-0"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            <Label className="text-gray-400 text-xs">Código do Anúncio</Label>
            <Textarea
              value={config.value}
              onChange={(e) => updateConfig(key, 'value', e.target.value)}
              placeholder={key === 'ads_txt'
                ? 'google.com, pub-XXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0\n'
                : key === 'header_code'
                  ? '<!-- Cole aqui scripts, pixels, meta tags -->\n<script>\n  // seu código aqui\n</script>\n'
                  : key === 'videowall_code'
                    ? '<!-- Código do anúncio em tela cheia -->\n<!-- Este anúncio aparecerá quando o usuário entrar no site -->\n<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#000;">\n  <!-- Seu código de anúncio aqui -->\n</div>\n'
                    : '<!-- Cole aqui o código do bloco de anúncio -->\n<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-XXXX"\n     data-ad-slot="XXXX"\n     data-ad-format="auto"></ins>\n<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>\n'
              }
              rows={key === 'ads_txt' ? 4 : 6}
              className="bg-gray-800/50 border-gray-700 text-green-400 font-mono text-xs resize-y"
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Anúncios</h1>
            <p className="text-gray-400 mt-1">Configure códigos de anúncio em cada posição do site</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={loadConfigs} className="border-gray-700 text-gray-300 hover:text-white">
              <RefreshCw className="w-4 h-4 mr-1.5" />
              Atualizar
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-500 text-white"
            >
              {saving ? (
                <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Salvando...</>
              ) : saved ? (
                <><CheckCircle2 className="w-4 h-4 mr-1.5" /> Salvo!</>
              ) : (
                <><Save className="w-4 h-4 mr-1.5" /> Salvar Tudo</>
              )}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-40 bg-gray-800 rounded" />
                    <div className="h-3 w-72 bg-gray-800 rounded" />
                    <div className="h-24 bg-gray-800 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* General / Header / Ads.txt */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-white">Configurações Gerais</h2>
                <span className="text-xs text-gray-500">Código no header e ads.txt</span>
              </div>
              <div className="space-y-4">
                {generalAds.map(renderAdCard)}
              </div>
            </section>

            <Separator className="bg-gray-800" />

            {/* Ad Locations */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <LayoutGrid className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-white">Blocos de Anúncio por Localização</h2>
                <span className="text-xs text-gray-500">Posições específicas no site</span>
              </div>
              <div className="space-y-4">
                {locationAds.map(renderAdCard)}
              </div>
            </section>

            <Separator className="bg-gray-800" />

            {/* Videowall */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Film className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-white">Videowall (Anúncio Tela Cheia)</h2>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Especial</Badge>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                O Videowall é um anúncio em tela cheia que aparece quando o usuário entra no site pela primeira vez.
                O usuário precisa fechar o anúncio para continuar navegando. Após fechar, o anúncio não aparece mais por 24 horas.
              </p>
              <div className="space-y-4">
                {videowallAds.map(renderAdCard)}
              </div>
            </section>
          </div>
        )}
      </div>
    </AdminShell>
  )
}