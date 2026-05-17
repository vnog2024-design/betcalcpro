'use client'

import { useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Zap, TrendingUp, Play, RotateCcw, AlertTriangle, Wallet, BarChart3,
  Star, Copy, Check
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { AdInContent } from '@/components/shared/ad-banner'

interface CrashRound {
  round: number
  crashPoint: number
  cashout: number
  result: 'green' | 'red'
  bet: number
  payout: number
  balance: number
}

export function CrashSimulator() {
  const { toast } = useToast()
  const { neon, neonBlue } = useThemeColors()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  const [initialBet, setInitialBet] = useState('10')
  const [autoCashout, setAutoCashout] = useState('2.0')
  const [bankroll, setBankroll] = useState('1000')
  const [rounds, setRounds] = useState('50')

  const [results, setResults] = useState<CrashRound[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateCrashPoint = useCallback(() => {
    return Math.max(1.0, 0.99 / (1 - Math.random()))
  }, [])

  const runSimulation = useCallback(() => {
    const bet = parseFloat(initialBet) || 0
    const cashout = parseFloat(autoCashout) || 2
    let balance = parseFloat(bankroll) || 0
    const numRounds = parseInt(rounds) || 0

    if (bet <= 0 || cashout <= 1 || balance <= 0 || numRounds <= 0) {
      toast({ title: 'Erro', description: 'Verifique os valores inseridos', variant: 'destructive' })
      return
    }

    setIsRunning(true)
    const simulationResults: CrashRound[] = []

    for (let i = 0; i < numRounds; i++) {
      if (balance < bet) break

      const crashPoint = generateCrashPoint()
      const isGreen = crashPoint >= cashout
      const payout = isGreen ? bet * (cashout - 1) : -bet
      balance += payout

      simulationResults.push({
        round: i + 1,
        crashPoint: parseFloat(crashPoint.toFixed(2)),
        cashout,
        result: isGreen ? 'green' : 'red',
        bet,
        payout: parseFloat(payout.toFixed(2)),
        balance: parseFloat(balance.toFixed(2)),
      })
    }

    setResults(simulationResults)
    setIsRunning(false)

    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'crash-simulator',
      params: { initialBet, autoCashout, bankroll, rounds },
      result: {
        totalRounds: simulationResults.length,
        greens: simulationResults.filter(r => r.result === 'green').length,
        reds: simulationResults.filter(r => r.result === 'red').length,
        finalBalance: simulationResults[simulationResults.length - 1]?.balance || 0,
      },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
  }, [initialBet, autoCashout, bankroll, rounds, generateCrashPoint, addHistory, unlockAchievement, toast])

  const handleReset = () => {
    setInitialBet('10')
    setAutoCashout('2.0')
    setBankroll('1000')
    setRounds('50')
    setResults([])
  }

  const handleCopy = () => {
    const text = results
      .map(r => `Rodada ${r.round}: Crash ${r.crashPoint}x | ${r.result === 'green' ? 'GREEN' : 'RED'} | Saldo: R$${r.balance.toFixed(2)}`)
      .join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Resultados copiados para a área de transferência' })
  }

  const stats = useMemo(() => {
    if (results.length === 0) return null
    const greens = results.filter(r => r.result === 'green').length
    const reds = results.filter(r => r.result === 'red').length
    const finalBalance = results[results.length - 1]?.balance || 0
    const startBalance = parseFloat(bankroll) || 0
    const profitLoss = finalBalance - startBalance
    const winRate = (greens / results.length) * 100
    const avgCrash = results.reduce((sum, r) => sum + r.crashPoint, 0) / results.length
    const maxCrash = Math.max(...results.map(r => r.crashPoint))
    const minCrash = Math.min(...results.map(r => r.crashPoint))

    return { greens, reds, finalBalance, profitLoss, winRate, avgCrash, maxCrash, minCrash }
  }, [results, bankroll])

  const chartData = useMemo(() => {
    return results.map(r => ({
      round: r.round,
      balance: r.balance,
      crashPoint: r.crashPoint,
    }))
  }, [results])

  const fav = isFavorite('crash-simulator')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Zap className="h-7 w-7 text-neon" />
            Simulador <span className="gradient-neon-text">Crash</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Simule rodadas de Crash com auto cashout e analise seus resultados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fav ? removeFavorite('crash-simulator') : addFavorite('crash-simulator')}
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
                <Zap className="h-4 w-4 text-neon" /> Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Aposta Inicial (R$)</Label>
                <Input
                  type="number"
                  value={initialBet}
                  onChange={(e) => setInitialBet(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Auto Cashout (Multiplicador)</Label>
                <Input
                  type="number"
                  value={autoCashout}
                  onChange={(e) => setAutoCashout(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1.01"
                  step="0.1"
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
                <Label className="text-sm text-muted-foreground">Número de Rodadas</Label>
                <Input
                  type="number"
                  value={rounds}
                  onChange={(e) => setRounds(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  max="10000"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={runSimulation}
              disabled={isRunning}
              className="gradient-neon text-black text-sm font-bold"
            >
              <Play className="h-3 w-3 mr-1" /> Simular
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm" className="border-border text-sm">
              <RotateCcw className="h-3 w-3 mr-1" /> Resetar
            </Button>
            <Button onClick={handleCopy} variant="outline" size="sm" className="border-border text-sm" disabled={results.length === 0}>
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
          </div>

          {/* Summary Stats */}
          {stats && (
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-neon/20 bg-neon/5">
                <CardContent className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground">Greens</p>
                  <p className="text-xl font-black text-neon">{stats.greens}</p>
                </CardContent>
              </Card>
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground">Reds</p>
                  <p className="text-xl font-black text-red-500">{stats.reds}</p>
                </CardContent>
              </Card>
              <Card className="border-neon-blue/20 bg-neon-blue/5">
                <CardContent className="p-3 text-center">
                  <Wallet className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Saldo Final</p>
                  <p className={`text-xl font-black ${stats.finalBalance >= parseFloat(bankroll) ? 'text-neon' : 'text-red-500'}`}>
                    R$ {stats.finalBalance.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-neon-blue/20 bg-neon-blue/5">
                <CardContent className="p-3 text-center">
                  <BarChart3 className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Lucro/Prejuízo</p>
                  <p className={`text-xl font-black ${stats.profitLoss >= 0 ? 'gradient-neon-text' : 'text-red-500'}`}>
                    {stats.profitLoss >= 0 ? '+' : ''}R$ {stats.profitLoss.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {stats && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Estatísticas Avançadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa de Acerto</span>
                  <span className="font-mono text-neon">{stats.winRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crash Médio</span>
                  <span className="font-mono text-neon-blue">{stats.avgCrash.toFixed(2)}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crash Máximo</span>
                  <span className="font-mono text-neon">{stats.maxCrash.toFixed(2)}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crash Mínimo</span>
                  <span className="font-mono text-red-500">{stats.minCrash.toFixed(2)}x</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {results.length > 0 ? (
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="bg-muted/50 border border-border">
                <TabsTrigger value="table" className="text-sm">Resultados</TabsTrigger>
                <TabsTrigger value="chart" className="text-sm">Gráfico</TabsTrigger>
              </TabsList>

              <TabsContent value="table" className="mt-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-0">
                    <div className="overflow-y-auto max-h-[500px]">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-card">
                          <tr className="border-b border-border">
                            <th className="text-left p-3 font-semibold text-muted-foreground">Rodada</th>
                            <th className="text-right p-3 font-semibold text-muted-foreground">Crash</th>
                            <th className="text-right p-3 font-semibold text-muted-foreground">Cashout</th>
                            <th className="text-center p-3 font-semibold text-muted-foreground">Resultado</th>
                            <th className="text-right p-3 font-semibold text-muted-foreground">Aposta</th>
                            <th className="text-right p-3 font-semibold text-muted-foreground">Pagamento</th>
                            <th className="text-right p-3 font-semibold text-muted-foreground">Saldo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((r, i) => (
                            <tr
                              key={i}
                              className={`border-b border-border/30 transition-colors ${
                                r.result === 'green' ? 'hover:bg-neon/5' : 'hover:bg-red-500/5'
                              }`}
                            >
                              <td className="p-3 font-bold">#{r.round}</td>
                              <td className="text-right p-3 font-mono">{r.crashPoint}x</td>
                              <td className="text-right p-3 font-mono">{r.cashout}x</td>
                              <td className="text-center p-3">
                                <Badge className={`border-0 text-[10px] ${
                                  r.result === 'green'
                                    ? 'bg-neon/10 text-neon'
                                    : 'bg-red-500/10 text-red-500'
                                }`}>
                                  {r.result === 'green' ? 'GREEN' : 'RED'}
                                </Badge>
                              </td>
                              <td className="text-right p-3 font-mono">R$ {r.bet.toFixed(2)}</td>
                              <td className={`text-right p-3 font-mono font-bold ${
                                r.payout >= 0 ? 'text-neon' : 'text-red-500'
                              }`}>
                                {r.payout >= 0 ? '+' : ''}R$ {r.payout.toFixed(2)}
                              </td>
                              <td className={`text-right p-3 font-mono ${
                                r.balance >= parseFloat(bankroll) ? 'text-neon-blue' : 'text-amber-500'
                              }`}>
                                R$ {r.balance.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chart" className="mt-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-neon" /> Saldo ao Longo das Rodadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis
                          dataKey="round"
                          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                          label={{ value: 'Rodada', position: 'insideBottom', offset: -5, fontSize: 10, fill: "var(--muted-foreground)" }}
                        />
                        <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                        <Tooltip
                          contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                          labelStyle={{ color: "var(--foreground)" }}
                          formatter={(value: number, name: string) => {
                            if (name === 'balance') return [`R$ ${value.toFixed(2)}`, 'Saldo']
                            return [`${value.toFixed(2)}x`, 'Crash']
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="balance"
                          stroke={neon}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4, fill: neon }}
                        />
                      </LineChart>
                    </ResponsiveContainer>

                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Pontos de Crash</p>
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="round" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                          <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                          <Tooltip
                            contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                            labelStyle={{ color: "var(--foreground)" }}
                            formatter={(value: number) => [`${value.toFixed(2)}x`, 'Ponto Crash']}
                          />
                          <Line
                            type="monotone"
                            dataKey="crashPoint"
                            stroke={neonBlue}
                            strokeWidth={1}
                            dot={{ r: 2, fill: neonBlue }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-12 text-center">
                <Zap className="h-12 w-12 text-neon/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-base">
                  Configure os parâmetros e clique em <span className="text-neon font-semibold">Simular</span> para começar
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
                  Este simulador é apenas para fins educacionais. Resultados passados não garantem resultados futuros.
                  Crash games são jogos de azar com vantagem da casa. Nunca aposte mais do que pode perder.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
