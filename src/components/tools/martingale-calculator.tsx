'use client'

import { useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdInContent } from '@/components/shared/ad-banner'
import { 
  TrendingUp, Copy, Star, RotateCcw, Play, Pause,
  BarChart3, Check, Wallet, AlertTriangle
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { useThemeColors } from '@/hooks/use-theme-colors'

interface GaleLevel {
  level: number
  bet: number
  totalInvested: number
  potentialWin: number
  profit: number
  profitPercent: number
}

function formatCurrency(value: number): string {
  if (!isFinite(value)) return '∞'
  if (value >= 1e12) return `R$ ${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `R$ ${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `R$ ${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `R$ ${value.toFixed(2)}`
  return `R$ ${value.toFixed(2)}`
}

export function MartingaleCalculator() {
  const { toast } = useToast()
  const { neon, neonBlue, neonWithAlpha } = useThemeColors()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  const [initialBet, setInitialBet] = useState('10')
  const [multiplier, setMultiplier] = useState('2.0')
  const [galeCount, setGaleCount] = useState('20')
  const [targetMultiplier, setTargetMultiplier] = useState('2.0')

  const [copied, setCopied] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const [autoStep, setAutoStep] = useState(0)
  const [winAtGale, setWinAtGale] = useState<number | null>(null)

  const levels = useMemo(() => {
    const bet = parseFloat(initialBet) || 0
    const mult = parseFloat(multiplier) || 2
    const gales = parseInt(galeCount) || 0
    const target = parseFloat(targetMultiplier) || 2

    const result: GaleLevel[] = []
    let currentBet = bet
    let totalInvested = 0

    for (let i = 0; i <= gales; i++) {
      totalInvested += currentBet
      const potentialWin = currentBet * target
      const profit = potentialWin - totalInvested
      const profitPercent = totalInvested > 0 ? (profit / totalInvested) * 100 : 0

      result.push({ level: i, bet: currentBet, totalInvested, potentialWin, profit, profitPercent })

      if (!isFinite(currentBet) || !isFinite(totalInvested)) break

      currentBet = currentBet * mult
    }

    return result
  }, [initialBet, multiplier, galeCount, targetMultiplier])

  const totalBankroll = levels[levels.length - 1]?.totalInvested || 0
  const maxProfit = levels[levels.length - 1]?.profit || 0

  const chartData = useMemo(() => {
    const maxPoints = 50
    if (levels.length <= maxPoints) {
      return levels.map((l) => ({
        name: l.level === 0 ? 'Entrada' : `G${l.level}`,
        bet: l.bet,
        totalInvested: l.totalInvested,
        profit: l.profit,
      }))
    }
    const step = (levels.length - 1) / (maxPoints - 1)
    const sampled = []
    for (let i = 0; i < maxPoints; i++) {
      const idx = Math.round(i * step)
      const l = levels[idx]
      sampled.push({
        name: l.level === 0 ? 'Entrada' : `G${l.level}`,
        bet: l.bet,
        totalInvested: l.totalInvested,
        profit: l.profit,
      })
    }
    return sampled
  }, [levels])

  const handleCopy = () => {
    const text = levels
      .map((l) => `Gale ${l.level}: Aposta ${formatCurrency(l.bet)} | Investido ${formatCurrency(l.totalInvested)} | Lucro ${formatCurrency(l.profit)}`)
      .join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Tabela copiada para a área de transferência' })
  }

  const handleSave = () => {
    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'martingale',
      params: { initialBet, multiplier, galeCount, targetMultiplier },
      result: { totalBankroll, maxProfit, levels: levels.length },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const handleReset = () => {
    setInitialBet('10')
    setMultiplier('2.0')
    setGaleCount('20')
    setTargetMultiplier('2.0')
    setAutoStep(0)
    setWinAtGale(null)
  }

  const toggleAutoMode = () => {
    const gales = parseInt(galeCount) || 0
    if (autoMode) {
      setAutoMode(false)
      setAutoStep(0)
      setWinAtGale(null)
    } else {
      setAutoMode(true)
      setAutoStep(0)
      setWinAtGale(null)
      let step = 0
      const interval = setInterval(() => {
        step++
        if (step > gales) {
          clearInterval(interval)
          setAutoMode(false)
          return
        }
        setAutoStep(step)
        const winChance = 1 / parseFloat(targetMultiplier)
        if (Math.random() < winChance) {
          setWinAtGale(step)
          clearInterval(interval)
          setTimeout(() => setAutoMode(false), 3000)
        }
      }, 1500)
    }
  }

  const fav = isFavorite('martingale')

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-neon" />
            Calculadora <span className="gradient-neon-text">Martingale</span>
          </h1>
          <p className="text-base text-muted-foreground mt-2">
            Calcule sua progressão Martingale com quantos gales quiser
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fav ? removeFavorite('martingale') : addFavorite('martingale')}
          className={fav ? 'text-neon' : 'text-muted-foreground'}
        >
          <Star className={`h-5 w-5 mr-1 ${fav ? 'fill-neon' : ''}`} />
          {fav ? 'Favoritado' : 'Favoritar'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Esquerda: Configurações */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Configurações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm">Entrada Inicial (R$)</Label>
                <Input type="number" value={initialBet} onChange={(e) => setInitialBet(e.target.value)} className="bg-muted/50 border-border text-base h-11" min="0.01" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Multiplicador do Gale</Label>
                <Input type="number" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="bg-muted/50 border-border text-base h-11" min="1.1" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Quantidade de Gales</Label>
                <Input type="number" value={galeCount} onChange={(e) => setGaleCount(e.target.value)} className="bg-muted/50 border-border text-base h-11" min="1" step="1" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Multiplicador Alvo</Label>
                <Input type="number" value={targetMultiplier} onChange={(e) => setTargetMultiplier(e.target.value)} className="bg-muted/50 border-border text-base h-11" min="1.1" step="0.1" />
              </div>
            </CardContent>
          </Card>

          {/* Resumo */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-neon/20 bg-neon/5">
              <CardContent className="p-4 text-center">
                <Wallet className="h-5 w-5 text-neon mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Banca Necessária</p>
                <p className="text-xl font-black gradient-neon-text">{formatCurrency(totalBankroll)}</p>
              </CardContent>
            </Card>
            <Card className="border-neon-blue/20 bg-neon-blue/5">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-5 w-5 text-neon-blue mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Lucro Máximo</p>
                <p className="text-xl font-black neon-text-blue">{formatCurrency(maxProfit)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Ações */}
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleCopy} variant="outline" className="border-border text-sm h-10">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
            <Button onClick={handleSave} variant="outline" className="border-border text-sm h-10">
              Salvar
            </Button>
            <Button onClick={handleReset} variant="outline" className="border-border text-sm h-10">
              <RotateCcw className="h-4 w-4 mr-2" /> Resetar
            </Button>
            <Button
              onClick={toggleAutoMode}
              className={`text-sm h-10 ${autoMode ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'gradient-neon text-black'}`}
            >
              {autoMode ? <><Pause className="h-4 w-4 mr-2" /> Parar</> : <><Play className="h-4 w-4 mr-2" /> Simular</>}
            </Button>
          </div>

          {autoMode && (
            <Card className="border-neon/30 bg-neon/5 neon-glow">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-neon animate-pulse" />
                  <span className="text-sm font-semibold text-neon">Simulação em andamento</span>
                </div>
                <p className="text-sm text-muted-foreground">Gale atual: <span className="text-neon font-bold">{autoStep}</span> / {galeCount}</p>
                {winAtGale !== null && (
                  <p className="text-sm text-neon font-bold mt-1">✅ GREEN no Gale {winAtGale}! Lucro: {formatCurrency(levels[winAtGale]?.profit || 0)}</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Direita: Resultados */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="table">
            <TabsList className="bg-muted/50 border border-border">
              <TabsTrigger value="table" className="text-sm">Tabela</TabsTrigger>
              <TabsTrigger value="chart" className="text-sm">Gráfico</TabsTrigger>
              <TabsTrigger value="simulator" className="text-sm">Simulador</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="mt-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-0">
                  <div className="overflow-y-auto max-h-[600px]">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-card z-10">
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold text-muted-foreground">Gale</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Aposta</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Investido</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Retorno</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Lucro</th>
                        </tr>
                      </thead>
                      <tbody>
                        {levels.map((level, i) => {
                          const isWin = winAtGale === level.level
                          const isAutoActive = autoMode && autoStep === level.level
                          return (
                            <tr key={i} className={`border-b border-border/30 transition-colors ${isWin ? 'bg-neon/20' : isAutoActive ? 'bg-neon/10 animate-pulse' : 'hover:bg-muted/20'}`}>
                              <td className="p-3 font-bold">
                                {level.level === 0 ? <Badge className="bg-neon/10 text-neon border-0 text-xs">Entrada</Badge> : <span>Gale {level.level}</span>}
                              </td>
                              <td className="text-right p-3 font-mono">{formatCurrency(level.bet)}</td>
                              <td className="text-right p-3 font-mono text-amber-500">{formatCurrency(level.totalInvested)}</td>
                              <td className="text-right p-3 font-mono text-neon-blue">{formatCurrency(level.potentialWin)}</td>
                              <td className={`text-right p-3 font-mono font-bold ${level.profit >= 0 ? 'text-neon' : 'text-red-500'}`}>{formatCurrency(level.profit)}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chart" className="mt-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-neon" /> Progressão
                  </CardTitle>
                  {levels.length > 50 && (
                    <p className="text-xs text-muted-foreground mt-1">Gráfico mostra {chartData.length} pontos de {levels.length} níveis</p>
                  )}
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="invested" className="mb-4">
                    <TabsList className="bg-muted/50 border border-border h-9">
                      <TabsTrigger value="invested" className="text-xs h-7">Investimento</TabsTrigger>
                      <TabsTrigger value="profit" className="text-xs h-7">Lucro</TabsTrigger>
                      <TabsTrigger value="bet" className="text-xs h-7">Aposta</TabsTrigger>
                    </TabsList>
                    <TabsContent value="invested">
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} interval="preserveStartEnd" />
                          <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickFormatter={(v) => typeof v === 'number' && v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                          <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 13 }} />
                          <Area type="monotone" dataKey="totalInvested" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.1)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent value="profit">
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} interval="preserveStartEnd" />
                          <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickFormatter={(v) => typeof v === 'number' && v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                          <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 13 }} />
                          <Area type="monotone" dataKey="profit" stroke={neon} fill={neonWithAlpha(0.1)} strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent value="bet">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} interval="preserveStartEnd" />
                          <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickFormatter={(v) => typeof v === 'number' && v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                          <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 13 }} />
                          <Line type="monotone" dataKey="bet" stroke={neonBlue} strokeWidth={2} dot={{ r: 3, fill: neonBlue }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="simulator" className="mt-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Play className="h-5 w-5 text-neon" /> Simulador
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Clique em um nível para simular um acerto naquele gale.
                  </p>
                  <div className="overflow-y-auto max-h-[400px]">
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => (
                        <button
                          key={level.level}
                          onClick={() => setWinAtGale(level.level)}
                          className={`flex flex-col items-center p-3 rounded-lg border transition-all hover:scale-105 min-w-[72px] ${
                            winAtGale === level.level ? 'border-neon bg-neon/20 neon-glow' : 'border-border/50 bg-muted/20 hover:border-neon/50'
                          }`}
                        >
                          <span className="text-xs text-muted-foreground">
                            {level.level === 0 ? 'Entrada' : `G${level.level}`}
                          </span>
                          <span className="text-sm font-bold font-mono">{formatCurrency(level.bet)}</span>
                          {winAtGale === level.level && (
                            <span className="text-xs text-neon font-bold mt-0.5">+{formatCurrency(level.profit)}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {winAtGale !== null && (
                    <div className="mt-5 p-5 rounded-xl border border-neon/30 bg-neon/5 text-center neon-glow">
                      <p className="text-xl font-black text-neon">
                        ✅ GREEN no {winAtGale === 0 ? 'Entrada' : `Gale ${winAtGale}`}!
                      </p>
                      <p className="text-base text-muted-foreground mt-2">
                        Aposta: {formatCurrency(levels[winAtGale].bet)} | 
                        Investido: {formatCurrency(levels[winAtGale].totalInvested)} | 
                        Lucro: <span className="text-neon font-bold">{formatCurrency(levels[winAtGale].profit)}</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Anúncio */}
          <AdInContent />

          {/* Aviso */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                O Martingale pode gerar perdas exponenciais. A banca necessária cresce muito rápido. Sempre jogue com responsabilidade.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
