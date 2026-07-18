'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminShell } from '@/components/admin/admin-shell'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Save, Loader2, RefreshCw, CheckCircle2, Code, FileText, Monitor,
  LayoutGrid, RectangleVertical, List, Film, Plus, Trash2, Puzzle,
  GripVertical, Megaphone, ArrowDownUp, Eye, Square, Columns, PanelTop,
  Rows3, BetweenVerticalStart, Quote, newspaper
} from 'lucide-react'

/* ───────────── Types ───────────── */

interface AdConfigItem {
  value: string
  enabled: boolean
  label: string
  position?: string
}

type AdConfigs = Record<string, AdConfigItem>

interface NewBlockForm {
  name: string
  position: string
  code: string
  enabled: boolean
}

interface NewVideowallForm {
  name: string
  code: string
  enabled: boolean
}

/* ───────────── Constants ───────────── */

// Default system ad keys (cannot be deleted)
const SYSTEM_KEYS = new Set([
  'header_code', 'ads_txt', 'banner_top', 'banner_middle', 'banner_bottom',
  'in_content', 'in_article', 'sidebar_ad', 'in_feed', 'videowall_code',
])

const VIDEOWALL_SYSTEM_KEY = 'videowall_code'

const AD_ICONS: Record<string, React.ElementType> = {
  header_code: Code,
  ads_txt: FileText,
  banner_top: PanelTop,
  banner_middle: Rows3,
  banner_bottom: Monitor,
  in_content: BetweenVerticalStart,
  in_article: Quote,
  sidebar_ad: RectangleVertical,
  in_feed: List,
  videowall_code: Film,
}

const POSITION_OPTIONS = [
  { value: 'before_header', label: 'Antes do Header', icon: PanelTop, group: 'Topo' },
  { value: 'after_header', label: 'Depois do Header', icon: PanelTop, group: 'Topo' },
  { value: 'before_content', label: 'Antes do Conteúdo', icon: Columns, group: 'Conteúdo' },
  { value: 'content_top', label: 'Topo do Conteúdo', icon: ArrowDownUp, group: 'Conteúdo' },
  { value: 'content_middle', label: 'Meio do Conteúdo', icon: Rows3, group: 'Conteúdo' },
  { value: 'content_bottom', label: 'Fim do Conteúdo', icon: Rows3, group: 'Conteúdo' },
  { value: 'after_content', label: 'Depois do Conteúdo', icon: Columns, group: 'Conteúdo' },
  { value: 'before_sidebar', label: 'Antes da Sidebar', icon: RectangleVertical, group: 'Sidebar' },
  { value: 'sidebar_top', label: 'Topo da Sidebar', icon: RectangleVertical, group: 'Sidebar' },
  { value: 'sidebar_middle', label: 'Meio da Sidebar', icon: RectangleVertical, group: 'Sidebar' },
  { value: 'sidebar_bottom', label: 'Fim da Sidebar', icon: RectangleVertical, group: 'Sidebar' },
  { value: 'before_footer', label: 'Antes do Rodapé', icon: Monitor, group: 'Rodapé' },
  { value: 'after_footer', label: 'Depois do Rodapé', icon: Monitor, group: 'Rodapé' },
  { value: 'between_posts', label: 'Entre Postagens', icon: List, group: 'Listas' },
  { value: 'after_nth_post', label: 'A cada N Postagens', icon: List, group: 'Listas' },
  { value: 'floating', label: 'Flutuante (Fixo na Tela)', icon: Eye, group: 'Especial' },
  { value: 'popup', label: 'Popup (Modal)', icon: Square, group: 'Especial' },
  { value: 'interstitial', label: 'Interstitial (Tela Cheia)', icon: Film, group: 'Especial' },
  { value: 'custom', label: 'Posição Customizada', icon: Puzzle, group: 'Especial' },
]

const POSITION_GROUPS = POSITION_OPTIONS.reduce<Record<string, typeof POSITION_OPTIONS>>((acc, p) => {
  if (!acc[p.group]) acc[p.group] = []
  acc[p.group].push(p)
  return acc
}, {})

function getAdTitle(key: string): string {
  const titles: Record<string, string> = {
    header_code: 'Código no Header',
    ads_txt: 'Ads.txt',
    banner_top: 'Banner Topo',
    banner_middle: 'Banner Meio',
    banner_bottom: 'Banner Rodapé',
    in_content: 'In-Content',
    in_article: 'In-Article',
    sidebar_ad: 'Sidebar',
    in_feed: 'In-Feed',
    videowall_code: 'Videowall (Tela Cheia)',
  }
  return titles[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function getPositionLabel(pos: string): string {
  return POSITION_OPTIONS.find(p => p.value === pos)?.label || pos
}

/* ───────────── Component ───────────── */

export default function AdminAnunciosPage() {
  const [configs, setConfigs] = useState<AdConfigs>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [newBlock, setNewBlock] = useState<NewBlockForm>({
    name: '',
    position: 'content_middle',
    code: '',
    enabled: false,
  })
  const [vwDialogOpen, setVwDialogOpen] = useState(false)
  const [newVideowall, setNewVideowall] = useState<NewVideowallForm>({
    name: '',
    code: '',
    enabled: false,
  })

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
      [key]: { ...prev[key], [field]: val },
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
        ...(conf.position ? { position: conf.position } : {}),
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

  const handleDelete = async (key: string) => {
    setDeleting(key)
    try {
      await fetch(`/api/admin/ads?key=${encodeURIComponent(key)}`, { method: 'DELETE' })
      setConfigs((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    } catch { /* ignore */ } finally {
      setDeleting(null)
    }
  }

  const handleCreateBlock = async () => {
    if (!newBlock.name.trim()) return
    const key = `custom_${Date.now().toString(36)}`
    const posLabel = getPositionLabel(newBlock.position)
    const label = `${newBlock.name.trim()} — ${posLabel}`

    setConfigs((prev) => ({
      ...prev,
      [key]: {
        value: newBlock.code,
        enabled: newBlock.enabled,
        label,
        position: newBlock.position,
      },
    }))
    setSaved(false)
    setDialogOpen(false)
    setNewBlock({ name: '', position: 'content_middle', code: '', enabled: false })

    // Auto-save the new block
    const res = await fetch('/api/admin/ads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ key, value: newBlock.code, enabled: newBlock.enabled, label, position: newBlock.position }]),
    })
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const handleCreateVideowall = async () => {
    if (!newVideowall.name.trim()) return
    const key = `videowall_${Date.now().toString(36)}`
    const label = `Videowall — ${newVideowall.name.trim()}`

    setConfigs((prev) => ({
      ...prev,
      [key]: {
        value: newVideowall.code,
        enabled: newVideowall.enabled,
        label,
      },
    }))
    setSaved(false)
    setVwDialogOpen(false)
    setNewVideowall({ name: '', code: '', enabled: false })

    const res = await fetch('/api/admin/ads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ key, value: newVideowall.code, enabled: newVideowall.enabled, label }]),
    })
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  // Separate system ads from custom ads
  const customAdKeys = Object.keys(configs).filter(k => !SYSTEM_KEYS.has(k) && !k.startsWith('videowall_'))
  const generalAds = ['header_code', 'ads_txt'].filter(k => configs[k])
  const locationAds = ['banner_top', 'banner_middle', 'banner_bottom', 'in_content', 'in_article', 'sidebar_ad', 'in_feed'].filter(k => configs[k])
  // All videowall entries: system videowall_code + custom videowall_* entries
  const videowallKeys = Object.keys(configs).filter(k => k === 'videowall_code' || k.startsWith('videowall_'))

  const renderVideowallCard = (key: string) => {
    const config = configs[key]
    if (!config) return null
    const isSystem = key === VIDEOWALL_SYSTEM_KEY

    return (
      <Card key={key} className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isSystem ? 'bg-gray-800' : 'bg-purple-500/10'}`}>
                <Film className={`w-4 h-4 ${isSystem ? 'text-green-400' : 'text-purple-400'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm font-semibold text-white flex items-center gap-2 flex-wrap">
                  {isSystem ? 'Videowall Padrão' : config.label.replace('Videowall — ', '')}
                  {!isSystem && (
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-[10px]">
                      Personalizado
                    </Badge>
                  )}
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
            <div className="flex items-center gap-2 shrink-0">
              {!isSystem && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => handleDelete(key)}
                  disabled={deleting === key}
                >
                  {deleting === key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </Button>
              )}
              <Switch
                checked={config.enabled}
                onCheckedChange={(checked) => updateConfig(key, 'enabled', checked)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            <Label className="text-gray-400 text-xs">Código do Anúncio Videowall</Label>
            <Textarea
              value={config.value}
              onChange={(e) => updateConfig(key, 'value', e.target.value)}
              placeholder={'<!-- Código do anúncio em tela cheia -->\n<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#000;">\n  <!-- Seu código de anúncio aqui -->\n</div>'}
              rows={6}
              className="bg-gray-800/50 border-gray-700 text-green-400 font-mono text-xs resize-y"
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderAdCard = (key: string, showDelete = false) => {
    const config = configs[key]
    if (!config) return null
    const Icon = AD_ICONS[key] || Puzzle
    const isCustom = !SYSTEM_KEYS.has(key)

    return (
      <Card key={key} className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isCustom ? 'bg-purple-500/10' : 'bg-gray-800'}`}>
                <Icon className={`w-4 h-4 ${isCustom ? 'text-purple-400' : 'text-green-400'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm font-semibold text-white flex items-center gap-2 flex-wrap">
                  {getAdTitle(key)}
                  {isCustom && (
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-[10px]">
                      {config.position ? getPositionLabel(config.position) : 'Personalizado'}
                    </Badge>
                  )}
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
            <div className="flex items-center gap-2 shrink-0">
              {showDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => handleDelete(key)}
                  disabled={deleting === key}
                >
                  {deleting === key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </Button>
              )}
              <Switch
                checked={config.enabled}
                onCheckedChange={(checked) => updateConfig(key, 'enabled', checked)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            <Label className="text-gray-400 text-xs">Código do Anúncio</Label>
            <Textarea
              value={config.value}
              onChange={(e) => updateConfig(key, 'value', e.target.value)}
              placeholder={
                key === 'ads_txt'
                  ? 'google.com, pub-XXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0'
                  : key === 'header_code'
                    ? '<!-- Cole aqui scripts, pixels, meta tags -->\n<script>\n  // seu código aqui\n</script>'
                    : key === 'videowall_code'
                      ? '<!-- Código do anúncio em tela cheia -->\n<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#000;">\n  <!-- Seu código de anúncio aqui -->\n</div>'
                      : '<!-- Cole aqui o código do bloco de anúncio -->\n<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-XXXX"\n     data-ad-slot="XXXX"\n     data-ad-format="auto"></ins>\n<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>'
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Anúncios</h1>
            <p className="text-gray-400 mt-1">Configure códigos de anúncio e crie blocos personalizados</p>
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
            {/* ── General / Header / Ads.txt ── */}
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

            {/* ── Ad Locations (System) ── */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <LayoutGrid className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-white">Blocos de Anúncio por Localização</h2>
                <span className="text-xs text-gray-500">Posições fixas do site</span>
              </div>
              <div className="space-y-4">
                {locationAds.map(renderAdCard)}
              </div>
            </section>

            <Separator className="bg-gray-800" />

            {/* ── Videowall ── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-green-400" />
                  <h2 className="text-lg font-semibold text-white">Videowall (Anúncio Tela Cheia)</h2>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Especial</Badge>
                  <Badge className="bg-gray-800 text-gray-400 text-[10px]">
                    {videowallKeys.length} anúncio{videowallKeys.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
                <Button
                  onClick={() => setVwDialogOpen(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Novo Videowall
                </Button>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                O Videowall é um anúncio em tela cheia que aparece quando o usuário entra no site pela primeira vez.
                O usuário precisa fechar o anúncio para continuar navegando. Após fechar, o anúncio não aparece mais por 24 horas.
                Se houver múltiplos videowalls ativos, um será escolhido aleatoriamente a cada visita.
              </p>
              {videowallKeys.length === 0 ? (
                <Card className="border-dashed border-gray-700 bg-gray-900/30">
                  <CardContent className="p-8 text-center">
                    <Film className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm font-medium mb-1">Nenhum anúncio videowall</p>
                    <p className="text-gray-600 text-xs mb-4">
                      Crie anúncios videowall que aparecem em tela cheia na entrada do site.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setVwDialogOpen(true)}
                      className="border-purple-500/30 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Criar Primeiro Videowall
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {videowallKeys.map(renderVideowallCard)}
                </div>
              )}
              {videowallKeys.length > 0 && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setVwDialogOpen(true)}
                    className="w-full border-dashed border-gray-700 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Novo Anúncio Videowall
                  </Button>
                </div>
              )}
            </section>

            <Separator className="bg-gray-800" />

            {/* ── Custom Ad Blocks ── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Puzzle className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-semibold text-white">Blocos Personalizados</h2>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-[10px]">
                    {customAdKeys.length} bloco{customAdKeys.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
                <Button
                  onClick={() => setDialogOpen(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Novo Bloco
                </Button>
              </div>

              {customAdKeys.length === 0 ? (
                <Card className="border-dashed border-gray-700 bg-gray-900/30">
                  <CardContent className="p-8 text-center">
                    <Puzzle className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm font-medium mb-1">Nenhum bloco personalizado</p>
                    <p className="text-gray-600 text-xs mb-4">
                      Crie blocos de anúncio personalizados com código e posição customizada,
                      similar ao Ad Inserter do WordPress.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(true)}
                      className="border-purple-500/30 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Criar Primeiro Bloco
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {customAdKeys.map((key) => renderAdCard(key, true))}
                </div>
              )}

              {/* Add block button at the bottom too */}
              {customAdKeys.length > 0 && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(true)}
                    className="w-full border-dashed border-gray-700 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Novo Bloco de Anúncio
                  </Button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ── New Videowall Dialog ── */}
        <Dialog open={vwDialogOpen} onOpenChange={setVwDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Film className="w-5 h-5 text-purple-400" />
                Novo Anúncio Videowall
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Crie um novo anúncio videowall. Ele aparecerá em tela cheia quando o usuário entrar no site.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5 py-2">
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">Nome do Videowall</Label>
                <Input
                  value={newVideowall.name}
                  onChange={(e) => setNewVideowall(p => ({ ...p, name: e.target.value }))}
                  placeholder="Ex: Promo Black Friday, Oferta Especial, Campanha Natal..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600"
                />
                <p className="text-[11px] text-gray-500">Um nome descritivo para identificar este videowall facilmente</p>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">Código do Anúncio</Label>
                <Textarea
                  value={newVideowall.code}
                  onChange={(e) => setNewVideowall(p => ({ ...p, code: e.target.value }))}
                  placeholder={'<!-- Código do anúncio em tela cheia -->\n<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#000;">\n  <!-- Seu código de anúncio aqui -->\n</div>'}
                  rows={8}
                  className="bg-gray-800 border-gray-700 text-green-400 font-mono text-xs resize-y"
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div>
                  <p className="text-sm text-gray-300">Ativar imediatamente</p>
                  <p className="text-[11px] text-gray-500">O videowall começará a aparecer assim que salvar</p>
                </div>
                <Switch
                  checked={newVideowall.enabled}
                  onCheckedChange={(checked) => setNewVideowall(p => ({ ...p, enabled: checked }))}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setVwDialogOpen(false)}
                className="border-gray-700 text-gray-300 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateVideowall}
                disabled={!newVideowall.name.trim()}
                className="bg-purple-600 hover:bg-purple-500 text-white"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Criar Videowall
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── New Block Dialog ── */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Puzzle className="w-5 h-5 text-purple-400" />
                Novo Bloco de Anúncio
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Crie um novo bloco de anúncio personalizado. Escolha onde ele deve aparecer e cole o código.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-2">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">Nome do Bloco</Label>
                <Input
                  value={newBlock.name}
                  onChange={(e) => setNewBlock(p => ({ ...p, name: e.target.value }))}
                  placeholder="Ex: Banner Topo Mobile, Sidebar Direita, Popup Promo..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600"
                />
                <p className="text-[11px] text-gray-500">Um nome descritivo para identificar este bloco facilmente</p>
              </div>

              {/* Position */}
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">
                  Onde o anúncio deve aparecer?
                </Label>
                <Select value={newBlock.position} onValueChange={(v) => setNewBlock(p => ({ ...p, position: v }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione a posição" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {Object.entries(POSITION_GROUPS).map(([group, options]) => (
                      <div key={group}>
                        <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {group}
                        </div>
                        {options.map(opt => (
                          <SelectItem key={opt.value} value={opt.value} className="text-gray-300 focus:text-white focus:bg-gray-700">
                            <span className="flex items-center gap-2">
                              <opt.icon className="w-3.5 h-3.5 text-gray-500" />
                              {opt.label}
                            </span>
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-gray-500">
                  Posição selecionada: <span className="text-purple-400">{getPositionLabel(newBlock.position)}</span>
                </p>
              </div>

              {/* Code */}
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">Código do Anúncio</Label>
                <Textarea
                  value={newBlock.code}
                  onChange={(e) => setNewBlock(p => ({ ...p, code: e.target.value }))}
                  placeholder={'<!-- Cole aqui o código do anúncio -->\n<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-XXXX"\n     data-ad-slot="XXXX"\n     data-ad-format="auto"\n     data-full-width-responsive="true"></ins>\n<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>'}
                  rows={8}
                  className="bg-gray-800 border-gray-700 text-green-400 font-mono text-xs resize-y"
                />
              </div>

              {/* Enabled */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div>
                  <p className="text-sm text-gray-300">Ativar bloco imediatamente</p>
                  <p className="text-[11px] text-gray-500">O anúncio começará a aparecer assim que salvar</p>
                </div>
                <Switch
                  checked={newBlock.enabled}
                  onCheckedChange={(checked) => setNewBlock(p => ({ ...p, enabled: checked }))}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="border-gray-700 text-gray-300 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateBlock}
                disabled={!newBlock.name.trim()}
                className="bg-purple-600 hover:bg-purple-500 text-white"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Criar Bloco
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminShell>
  )
}