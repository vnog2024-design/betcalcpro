'use client'

import { useState, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Percent, BarChart3, AlertTriangle, TrendingUp, Calculator,
  Star, Copy, Check, RotateCcw
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { AdInContent } from '@/components/shared/ad-banner'

interface SimulationResult {
  consecutiveWins: number
  consecutiveLosses: number
  maxWinStreak: number
  maxLossStreak: number
  finalBalance: number
}

interface ProbabilityEntry {
  consecutive: number
  winProbability: number
  lossProbability: number
  expectedValue: number
}

export function ProbabilitySimulator() {
  const { toast } = useToast()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  const [probability, setProbability] = useState('48.6')
  const [simulations, setSimulations] = useState('10000')
  const [consecutiveEvents, setConsecutiveEvents] = useState('5')
  const [bankroll, setBankroll] = useState('1000')
  const [betAmount, setBetAmount] = useState('10')

  const [results, setResults] = useState<SimulationResult[] | null>(null)
  const [copied, setCopied] = useState(false)

  const runMonteCarlo = () => {
    const prob = parseFloat(probability) / 100
    const numSims = parseInt(simulations) || 0
    const numConsecutive = parseInt(consecutiveEvents) || 0
    const startBalance = parseFloat(bankroll) || 0
    const bet = parseFloat(betAmount) || 0

    if (prob <= 0 || prob >= 1 || numSims <= 0 || numConsecutive <= 0 || startBalance <= 0 || bet <= 0) {
      toast({ title: 'Erro', description: 'Verifique os valores inseridos', variant: 'destructive' })
      return
    }

    const simResults: SimulationResult[] = []

    for (let s = 0; s < numSims; s++) {
      let balance = startBalance
      let currentWinStreak = 0
      let currentLossStreak = 0
      let maxWinStreak = 0
      let maxLossStreak = 0
      let consecutiveWins = 0
      let consecutiveLosses = 0

      for (let r = 0; r < 100; r++) {
        if (balance < bet) break

        const isWin = Math.random() < prob
        if (isWin) {
          balance += bet
          currentWinStreak++
          currentLossStreak = 0
          maxWinStreak = Math.max(maxWinStreak, currentWinStreak)
          if (currentWinStreak >= numConsecutive) consecutiveWins++
        } else {
          balance -= bet
          currentLossStreak++
          currentWinStreak = 0
          maxLossStreak = Math.max(maxLossStreak, currentLossStreak)
          if (currentLossStreak >= numConsecutive) consecutiveLosses++
        }
      }

      simResults.push({
        consecutiveWins,
        consecutiveLosses,
        maxWinStreak,
        maxLossStreak,
        finalBalance: parseFloat(balance.toFixed(2)),
      })
    }

    setResults(simResults)

    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'probability-simulator',
      params: { probability, simulations, consecutiveEvents, bankroll, betAmount },
      result: {
        avgFinalBalance: (simResults.reduce((s, r) => s + r.finalBalance, 0) / simResults.length).toFixed(2),
        hitConsecutiveWins: simResults.filter(r => r.consecutiveWins > 0).length,
        hitConsecutiveLosses: simResults.filter(r => r.consecutiveLosses > 0).length,
      },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Simulação Concluída!', description: `${numSims.toLocaleString()} simulações realizadas` })
  }

  const theoreticalProbabilities = useMemo(() => {
    const prob = parseFloat(probability) / 100
    const maxConsecutive = Math.min(parseInt(consecutiveEvents) + 5, 15)
    if (isNaN(prob) || prob <= 0 || prob >= 1) return []

    const entries: ProbabilityEntry[] = []
    for (let n = 1; n <= maxConsecutive; n++) {
      const winProb = Math.pow(prob, n)
      const lossProb = Math.pow(1 - prob, n)
      entries.push({
        consecutive: n,
        winProbability: parseFloat((winProb * 100).toFixed(4)),
        lossProbability: parseFloat((lossProb * 100).toFixed(4)),
        expectedValue: parseFloat((prob - (1 - prob)).toFixed(4)),
      })
    }
    return entries
  }, [probability, consecutiveEvents])

  const distributionData = useMemo(() => {
    if (!results) return null

    const balanceBuckets: Record<string, number> = {}
    const minBalance = Math.min(...results.map(r => r.finalBalance))
    const maxBalance = Math.max(...results.map(r => r.finalBalance))
    const step = Math.max((maxBalance - minBalance) / 20, 1)

    for (let b = minBalance; b <= maxBalance; b += step) {
      const bucketLabel = `R$${b.toFixed(0)}`
      balanceBuckets[bucketLabel] = 0
    }

    results.forEach(r => {
      const bucketIndex = Math.floor((r.finalBalance - minBalance) / step)
      const keys = Object.keys(balanceBuckets)
      if (keys[bucketIndex] !== undefined) {
        balanceBuckets[keys[bucketIndex]]++
      }
    })

    return Object.entries(balanceBuckets).map(([name, count]) => ({
      name,
      count,
    }))
  }, [results])

  const statsSummary = useMemo(() => {
    if (!results) return null

    const total = results.length
    const avgBalance = results.reduce((s, r) => s + r.finalBalance, 0) / total
    const profitCount = results.filter(r => r.finalBalance > parseFloat(bankroll)).length
    const lossCount = results.filter(r => r.finalBalance < parseFloat(bankroll)).length
    const bustCount = results.filter(r => r.finalBalance <= 0).length
    const avgMaxWinStreak = results.reduce((s, r) => s + r.maxWinStreak, 0) / total
    const avgMaxLossStreak = results.reduce((s, r) => s + r.maxLossStreak, 0) / total
    const hitConsecWins = results.filter(r => r.consecutiveWins > 0).length
    const hitConsecLosses = results.filter(r => r.consecutiveLosses > 0).length
    const variance = results.reduce((s, r) => s + Math.pow(r.finalBalance - avgBalance, 2), 0) / total
    const stdDev = Math.sqrt(variance)

    return {
      avgBalance,
      profitCount,
      lossCount,
      bustCount,
      profitPct: (profitCount / total) * 100,
      lossPct: (lossCount / total) * 100,
      bustPct: (bustCount / total) * 100,
      avgMaxWinStreak,
      avgMaxLossStreak,
      hitConsecWins,
      hitConsecLosses,
      hitConsecWinsPct: (hitConsecWins / total) * 100,
      hitConsecLossesPct: (hitConsecLosses / total) * 100,
      variance,
      stdDev,
    }
  }, [results, bankroll])

  const handleReset = () => {
    setProbability('48.6')
    setSimulations('10000')
    setConsecutiveEvents('5')
    setBankroll('1000')
    setBetAmount('10')
    setResults(null)
  }

  const handleCopy = () => {
    if (!statsSummary || !theoreticalProbabilities.length) return
    const text = [
      `Simulação de Probabilidade - ${probability}%`,
      '',
      'Probabilidades Teóricas de N Consecutivos:',
      ...theoreticalProbabilities.map(p =>
        `${p.consecutive}x Vitórias: ${p.winProbability}% | ${p.consecutive}x Derrotas: ${p.lossProbability}%`
      ),
      '',
      `Média Saldo Final: R$ ${statsSummary.avgBalance.toFixed(2)}`,
      `Lucro: ${statsSummary.profitPct.toFixed(1)}% | Prejuízo: ${statsSummary.lossPct.toFixed(1)}% | Falência: ${statsSummary.bustPct.toFixed(1)}%`,
    ].join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Resultados copiados' })
  }

  const fav = isFavorite('probability-simulator')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Percent className="h-7 w-7 text-neon" />
            Simulador <span className="gradient-neon-text">Probabilístico</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Simulação Monte Carlo para análise de probabilidades e cenários
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fav ? removeFavorite('probability-simulator') : addFavorite('probability-simulator')}
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
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Percent className="h-4 w-4 text-neon" /> Parâmetros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Probabilidade do Evento (%)</Label>
                <Input
                  type="number"
                  value={probability}
                  onChange={(e) => setProbability(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.1"
                  max="99.9"
                  step="0.1"
                />
                <p className="text-[10px] text-muted-foreground">Ex: 48.6% para vermelho no Double</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Número de Simulações</Label>
                <Input
                  type="number"
                  value={simulations}
                  onChange={(e) => setSimulations(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="100"
                  max="100000"
                  step="100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Eventos Consecutivos para Análise</Label>
                <Input
                  type="number"
                  value={consecutiveEvents}
                  onChange={(e) => setConsecutiveEvents(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  max="20"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Banca Inicial (R$)</Label>
                <Input
                  type="number"
                  value={bankroll}
                  onChange={(e) => setBankroll(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  step="1"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Valor da Aposta (R$)</Label>
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={runMonteCarlo} className="gradient-neon text-black text-sm font-bold">
              <Calculator className="h-3 w-3 mr-1" /> Simular
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm" className="border-border text-sm">
              <RotateCcw className="h-3 w-3 mr-1" /> Resetar
            </Button>
          </div>

          {/* Theoretical Probabilities */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-neon" /> Probabilidades Teóricas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-64">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 font-semibold text-muted-foreground">N</th>
                      <th className="text-right p-2 font-semibold text-muted-foreground">N Vitórias</th>
                      <th className="text-right p-2 font-semibold text-muted-foreground">N Derrotas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {theoreticalProbabilities.map(p => (
                      <tr key={p.consecutive} className={`border-b border-border/20 ${
                        p.consecutive === parseInt(consecutiveEvents) ? 'bg-neon/5' : ''
                      }`}>
                        <td className="p-2 font-bold">{p.consecutive}x</td>
                        <td className="text-right p-2 font-mono text-neon">{p.winProbability}%</td>
                        <td className="text-right p-2 font-mono text-red-500">{p.lossProbability}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>

          {statsSummary && (
            <Button onClick={handleCopy} variant="outline" size="sm" className="w-full border-border text-sm">
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? 'Copiado!' : 'Copiar Resultados'}
            </Button>
          )}
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {statsSummary && distributionData ? (
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="bg-muted/50 border border-border">
                <TabsTrigger value="summary" className="text-sm">Resumo</TabsTrigger>
                <TabsTrigger value="distribution" className="text-sm">Distribuição</TabsTrigger>
                <TabsTrigger value="streaks" className="text-sm">Streaks</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  <Card className="border-neon/20 bg-neon/5">
                    <CardContent className="p-3 text-center">
                      <p className="text-[10px] text-muted-foreground">Saldo Médio Final</p>
                      <p className={`text-xl font-black ${statsSummary.avgBalance >= parseFloat(bankroll) ? 'text-neon' : 'text-red-500'}`}>
                        R$ {statsSummary.avgBalance.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-neon/20 bg-neon/5">
                    <CardContent className="p-3 text-center">
                      <p className="text-[10px] text-muted-foreground">% Lucro</p>
                      <p className="text-xl font-black text-neon">{statsSummary.profitPct.toFixed(1)}%</p>
                    </CardContent>
                  </Card>
                  <Card className="border-red-500/20 bg-red-500/5">
                    <CardContent className="p-3 text-center">
                      <p className="text-[10px] text-muted-foreground">% Prejuízo</p>
                      <p className="text-xl font-black text-red-500">{statsSummary.lossPct.toFixed(1)}%</p>
                    </CardContent>
                  </Card>
                  <Card className="border-amber-500/20 bg-amber-500/5">
                    <CardContent className="p-3 text-center">
                      <p className="text-[10px] text-muted-foreground">Taxa de Falência</p>
                      <p className="text-xl font-black text-amber-500">{statsSummary.bustPct.toFixed(1)}%</p>
                    </CardContent>
                  </Card>
                  <Card className="border-neon-blue/20 bg-neon-blue/5">
                    <CardContent className="p-3 text-center">
                      <p className="text-[10px] text-muted-foreground">Desvio Padrão</p>
                      <p className="text-xl font-black text-neon-blue">R$ {statsSummary.stdDev.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-neon-blue/20 bg-neon-blue/5">
                    <CardContent className="p-3 text-center">
                      <p className="text-[10px] text-muted-foreground">Variância</p>
                      <p className="text-xl font-black text-neon-blue">{statsSummary.variance.toFixed(0)}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Análise de Valor Esperado</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between p-2 rounded-lg bg-muted/20">
                      <span className="text-muted-foreground">Valor Esperado por Aposta</span>
                      <span className={`font-mono font-bold ${
                        parseFloat(probability) / 100 > 0.5 ? 'text-neon' : 'text-red-500'
                      }`}>
                        {((parseFloat(probability) / 100) * parseFloat(betAmount) - (1 - parseFloat(probability) / 100) * parseFloat(betAmount)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-muted/20">
                      <span className="text-muted-foreground">Edge da Casa</span>
                      <span className="font-mono font-bold text-red-500">
                        {((1 - 2 * parseFloat(probability) / 100) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-muted/20">
                      <span className="text-muted-foreground">Prob. {consecutiveEvents} Vitórias Consecutivas</span>
                      <span className="font-mono font-bold text-neon">
                        {(Math.pow(parseFloat(probability) / 100, parseInt(consecutiveEvents)) * 100).toFixed(4)}%
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-muted/20">
                      <span className="text-muted-foreground">Prob. {consecutiveEvents} Derrotas Consecutivas</span>
                      <span className="font-mono font-bold text-red-500">
                        {(Math.pow(1 - parseFloat(probability) / 100, parseInt(consecutiveEvents)) * 100).toFixed(4)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="distribution" className="mt-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-neon" /> Distribuição do Saldo Final
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={distributionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="name" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} angle={-45} textAnchor="end" height={60} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                        <Tooltip
                          contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                          labelStyle={{ color: "var(--foreground)" }}
                          formatter={(value: number) => [value, 'Frequência']}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                          {distributionData.map((entry, index) => (
                            <Cell
                              key={index}
                              fill={entry.name.includes('-') ? '#ef4444' : '#00ff88'}
                              fillOpacity={0.7}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="streaks" className="mt-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-neon" /> Análise de Streaks (Monte Carlo)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-neon/5 border border-neon/20 text-center">
                        <p className="text-[10px] text-muted-foreground">Média Max Streak Vitórias</p>
                        <p className="text-xl font-black text-neon">{statsSummary.avgMaxWinStreak.toFixed(1)}x</p>
                      </div>
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-center">
                        <p className="text-[10px] text-muted-foreground">Média Max Streak Derrotas</p>
                        <p className="text-xl font-black text-red-500">{statsSummary.avgMaxLossStreak.toFixed(1)}x</p>
                      </div>
                      <div className="p-3 rounded-lg bg-neon/5 border border-neon/20 text-center">
                        <p className="text-[10px] text-muted-foreground">Atingiu {consecutiveEvents} Vitórias</p>
                        <p className="text-xl font-black text-neon">{statsSummary.hitConsecWinsPct.toFixed(1)}%</p>
                        <p className="text-[10px] text-muted-foreground">({statsSummary.hitConsecWins} simulações)</p>
                      </div>
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-center">
                        <p className="text-[10px] text-muted-foreground">Atingiu {consecutiveEvents} Derrotas</p>
                        <p className="text-xl font-black text-red-500">{statsSummary.hitConsecLossesPct.toFixed(1)}%</p>
                        <p className="text-[10px] text-muted-foreground">({statsSummary.hitConsecLosses} simulações)</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-neon">Interpretação:</span> Em {simulations} simulações,
                        {statsSummary.hitConsecWinsPct.toFixed(1)}% das sessões atingiram pelo menos {consecutiveEvents} vitórias
                        consecutivas, enquanto {statsSummary.hitConsecLossesPct.toFixed(1)}% atingiram {consecutiveEvents} derrotas
                        consecutivas. A taxa de falência foi de {statsSummary.bustPct.toFixed(1)}%.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-12 text-center">
                <Percent className="h-12 w-12 text-neon/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-base">
                  Configure os parâmetros e clique em <span className="text-neon font-semibold">Simular</span> para executar a simulação Monte Carlo
                </p>
              </CardContent>
            </Card>
          )}

          <AdInContent />

          {/* Warning */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-500">Jogo Responsável</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Simulações Monte Carlo mostram resultados probabilísticos de longo prazo. Na prática, resultados individuais
                  podem variar significativamente. A casa sempre tem vantagem matemática. Nunca aposte mais do que pode perder.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
