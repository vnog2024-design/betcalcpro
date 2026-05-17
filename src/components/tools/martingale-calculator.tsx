'use client'

import { useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  TrendingUp, Copy, Star, RotateCcw, Download, Play, Pause,
  ChevronDown, ChevronUp, AlertTriangle, Target, Wallet, BarChart3,
  Check, Info
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import { useToast } from '@/hooks/use-toast'

interface GaleLevel {
  level: number
  bet: number
  totalInvested: number
  potentialWin: number
  profit: number
  profitPercent: number
}

export function MartingaleCalculator() {
  const { toast } = useToast()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  // Inputs
  const [initialBet, setInitialBet] = useState('10')
  const [multiplier, setMultiplier] = useState('2.0')
  const [galeCount, setGaleCount] = useState('5')
  const [targetMultiplier, setTargetMultiplier] = useState('2.0')

  // State
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copied, setCopied] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const [autoStep, setAutoStep] = useState(0)
  const [history, setHistory] = useState<string[]>([])
  const [winAtGale, setWinAtGale] = useState<number | null>(null)

  const calc = useCallback(() => {
    const bet = parseFloat(initialBet) || 0
    const mult = parseFloat(multiplier) || 2
    const gales = parseInt(galeCount) || 0
    const target = parseFloat(targetMultiplier) || 2

    const levels: GaleLevel[] = []
    let currentBet = bet
    let totalInvested = 0

    for (let i = 0; i <= gales; i++) {
      totalInvested += currentBet
      const potentialWin = currentBet * target
      const profit = potentialWin - totalInvested
      const profitPercent = (profit / totalInvested) * 100

      levels.push({
        level: i,
        bet: currentBet,
        totalInvested,
        potentialWin,
        profit,
        profitPercent,
      })

      currentBet = currentBet * mult
    }

    return levels
  }, [initialBet, multiplier, galeCount, targetMultiplier])

  const levels = useMemo(() => calc(), [calc])
  const totalBankroll = levels[levels.length - 1]?.totalInvested || 0
  const maxProfit = levels[levels.length - 1]?.profit || 0

  const chartData = levels.map((l) => ({
    name: `Gale ${l.level}`,
    bet: l.bet,
    totalInvested: l.totalInvested,
    profit: l.profit,
  }))

  const handleCopy = () => {
    const text = levels
      .map(
        (l) =>
          `Gale ${l.level}: Aposta R$${l.bet.toFixed(2)} | Investido R$${l.totalInvested.toFixed(2)} | Lucro R$${l.profit.toFixed(2)}`
      )
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
    setGaleCount('5')
    setTargetMultiplier('2.0')
    setAutoStep(0)
    setWinAtGale(null)
  }

  const toggleAutoMode = () => {
    if (autoMode) {
      setAutoMode(false)
      setAutoStep(0)
      setWinAtGale(null)
    } else {
      setAutoMode(true)
      setAutoStep(0)
      setWinAtGale(null)
      // Simulate auto progression
      let step = 0
      const interval = setInterval(() => {
        step++
        if (step > parseInt(galeCount)) {
          clearInterval(interval)
          setAutoMode(false)
          setWinAtGale(null)
          return
        }
        setAutoStep(step)
        // Random chance of winning (simulated)
        const winChance = 1 / parseFloat(targetMultiplier)
        if (Math.random() < winChance) {
          setWinAtGale(step)
          clearInterval(interval)
          setTimeout(() => setAutoMode(false), 3000)
        }
      }, 1500)
    }
  }

  const handleSimulateWin = (galeLevel: number) => {
    setWinAtGale(galeLevel)
    setTimeout(() => setWinAtGale(null), 3000)
  }

  const fav = isFavorite('martingale')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-neon" />
            Calculadora <span className="gradient-neon-text">Martingale</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Calcule sua progressão Martingale com níveis ilimitados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fav ? removeFavorite('martingale') : addFavorite('martingale')}
            className={fav ? 'text-neon' : 'text-muted-foreground'}
          >
            <Star className={`h-4 w-4 mr-1 ${fav ? 'fill-neon' : ''}`} />
            {fav ? 'Favoritado' : 'Favoritar'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-neon" /> Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Valor da Entrada Inicial (R$)</Label>
                <Input
                  type="number"
                  value={initialBet}
                  onChange={(e) => setInitialBet(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Multiplicador do Gale</Label>
                <Input
                  type="number"
                  value={multiplier}
                  onChange={(e) => setMultiplier(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="1.1"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Quantidade de Gales</Label>
                <Input
                  type="number"
                  value={galeCount}
                  onChange={(e) => setGaleCount(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="0"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Multiplicador Alvo (entrada)</Label>
                <Input
                  type="number"
                  value={targetMultiplier}
                  onChange={(e) => setTargetMultiplier(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="1.1"
                  step="0.1"
                />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                Opções Avançadas
              </Button>

              {showAdvanced && (
                <div className="space-y-2 p-3 rounded-lg bg-muted/20 border border-border/50">
                  <p className="text-[10px] text-muted-foreground">
                    <Info className="h-3 w-3 inline mr-1" />
                    Martingale é uma progressão onde após cada perda, a aposta é multiplicada pelo fator configurado. 
                    O objetivo é recuperar perdas anteriores e obter lucro no primeiro acerto.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-neon/20 bg-neon/5">
              <CardContent className="p-3 text-center">
                <Wallet className="h-4 w-4 text-neon mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Banca Necessária</p>
                <p className="text-lg font-black gradient-neon-text">
                  R$ {totalBankroll.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-neon-blue/20 bg-neon-blue/5">
              <CardContent className="p-3 text-center">
                <BarChart3 className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Lucro Máximo</p>
                <p className="text-lg font-black neon-text-blue">
                  R$ {maxProfit.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm" className="border-border text-xs">
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
            <Button onClick={handleSave} variant="outline" size="sm" className="border-border text-xs">
              <Download className="h-3 w-3 mr-1" /> Salvar
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm" className="border-border text-xs">
              <RotateCcw className="h-3 w-3 mr-1" /> Resetar
            </Button>
            <Button
              onClick={toggleAutoMode}
              size="sm"
              className={`text-xs ${autoMode ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' : 'gradient-neon text-black'}`}
            >
              {autoMode ? <><Pause className="h-3 w-3 mr-1" /> Parar</> : <><Play className="h-3 w-3 mr-1" /> Auto</>}
            </Button>
          </div>

          {/* Auto Mode Status */}
          {autoMode && (
            <Card className="border-neon/30 bg-neon/5 neon-glow">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-neon animate-pulse" />
                  <span className="text-xs font-semibold text-neon">Modo Automático Ativo</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Gale atual: <span className="text-neon font-bold">{autoStep}</span> / {galeCount}
                </p>
                {winAtGale !== null && (
                  <p className="text-xs text-neon font-bold mt-1">
                    ✅ GREEN no Gale {winAtGale}! Lucro: R$ {levels[winAtGale]?.profit.toFixed(2)}
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="bg-muted/50 border border-border">
              <TabsTrigger value="table" className="text-xs">Tabela</TabsTrigger>
              <TabsTrigger value="chart" className="text-xs">Gráfico</TabsTrigger>
              <TabsTrigger value="simulator" className="text-xs">Simulador</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="mt-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-0">
                  <ScrollArea className="max-h-[500px]">
                    <table className="w-full text-xs">
                      <thead className="sticky top-0 bg-card">
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold text-muted-foreground">Gale</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Aposta</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Investido</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Retorno</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Lucro</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">%</th>
                          <th className="text-center p-3 font-semibold text-muted-foreground">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {levels.map((level, i) => {
                          const isWin = winAtGale === level.level
                          const isAutoActive = autoMode && autoStep === level.level
                          return (
                            <tr
                              key={i}
                              className={`border-b border-border/30 transition-colors ${
                                isWin
                                  ? 'bg-neon/20'
                                  : isAutoActive
                                  ? 'bg-neon/10 animate-pulse'
                                  : 'hover:bg-muted/20'
                              }`}
                            >
                              <td className="p-3 font-bold">
                                {level.level === 0 ? (
                                  <Badge className="bg-neon/10 text-neon border-0 text-[10px]">Entrada</Badge>
                                ) : (
                                  <span>Gale {level.level}</span>
                                )}
                              </td>
                              <td className="text-right p-3 font-mono">
                                R$ {level.bet.toFixed(2)}
                              </td>
                              <td className="text-right p-3 font-mono text-amber-500">
                                R$ {level.totalInvested.toFixed(2)}
                              </td>
                              <td className="text-right p-3 font-mono text-neon-blue">
                                R$ {level.potentialWin.toFixed(2)}
                              </td>
                              <td className={`text-right p-3 font-mono font-bold ${level.profit >= 0 ? 'text-neon' : 'text-red-500'}`}>
                                R$ {level.profit.toFixed(2)}
                              </td>
                              <td className={`text-right p-3 font-mono ${level.profitPercent >= 0 ? 'text-neon' : 'text-red-500'}`}>
                                {level.profitPercent.toFixed(1)}%
                              </td>
                              <td className="text-center p-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-[10px] text-neon hover:bg-neon/10"
                                  onClick={() => handleSimulateWin(level.level)}
                                >
                                  GREEN
                                </Button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chart" className="mt-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-neon" /> Progressão Visual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="invested" className="mb-4">
                    <TabsList className="bg-muted/50 border border-border h-8">
                      <TabsTrigger value="invested" className="text-[10px] h-6">Investimento</TabsTrigger>
                      <TabsTrigger value="profit" className="text-[10px] h-6">Lucro</TabsTrigger>
                      <TabsTrigger value="bet" className="text-[10px] h-6">Aposta</TabsTrigger>
                    </TabsList>
                    <TabsContent value="invested">
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                          <Tooltip
                            contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', fontSize: 12 }}
                            labelStyle={{ color: '#e2e8f0' }}
                            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Investido']}
                          />
                          <Area type="monotone" dataKey="totalInvested" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.1)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent value="profit">
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                          <Tooltip
                            contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', fontSize: 12 }}
                            labelStyle={{ color: '#e2e8f0' }}
                            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Lucro']}
                          />
                          <Area type="monotone" dataKey="profit" stroke="#00ff88" fill="rgba(0, 255, 136, 0.1)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent value="bet">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                          <Tooltip
                            contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', fontSize: 12 }}
                            labelStyle={{ color: '#e2e8f0' }}
                            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Aposta']}
                          />
                          <Line type="monotone" dataKey="bet" stroke="#00d4ff" strokeWidth={2} dot={{ r: 4, fill: '#00d4ff' }} />
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
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Play className="h-4 w-4 text-neon" /> Simulador Visual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Clique em um nível para simular um acerto (GREEN) naquele gale.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => (
                        <button
                          key={level.level}
                          onClick={() => handleSimulateWin(level.level)}
                          className={`relative flex flex-col items-center p-3 rounded-xl border transition-all hover:scale-105 min-w-[80px] ${
                            winAtGale === level.level
                              ? 'border-neon bg-neon/20 neon-glow'
                              : 'border-border/50 bg-muted/20 hover:border-neon/50'
                          }`}
                        >
                          <span className="text-[10px] text-muted-foreground">
                            {level.level === 0 ? 'Entrada' : `G${level.level}`}
                          </span>
                          <span className="text-sm font-bold font-mono">
                            R${level.bet.toFixed(0)}
                          </span>
                          {winAtGale === level.level && (
                            <span className="text-[10px] text-neon font-bold mt-1">
                              +R${level.profit.toFixed(2)}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    {winAtGale !== null && (
                      <div className="mt-4 p-4 rounded-xl border border-neon/30 bg-neon/5 text-center neon-glow">
                        <p className="text-lg font-black text-neon">
                          ✅ GREEN no {winAtGale === 0 ? 'Entrada' : `Gale ${winAtGale}`}!
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Aposta: R$ {levels[winAtGale].bet.toFixed(2)} | 
                          Investido: R$ {levels[winAtGale].totalInvested.toFixed(2)} | 
                          Lucro: <span className="text-neon font-bold">R$ {levels[winAtGale].profit.toFixed(2)}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Warning */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-500">Atenção</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  O sistema Martingale pode gerar perdas exponenciais. A banca necessária cresce rapidamente 
                  com cada gale. Sempre defina um limite e gerencie seu bankroll com responsabilidade.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
