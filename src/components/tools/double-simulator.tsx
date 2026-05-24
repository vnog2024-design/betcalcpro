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
  Dices, TrendingUp, Play, RotateCcw, AlertTriangle, Wallet, BarChart3,
  Star, Copy, Check
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { AdInContent } from '@/components/shared/ad-banner'

type Strategy = 'martingale' | 'fibonacci' | 'flat'
type TargetOption = 'A' | 'B' | 'C'
type OutcomeResult = 'A' | 'B' | 'C'

interface BinaryRound {
  round: number
  result: OutcomeResult
  target: TargetOption
  isFavorable: boolean
  operationValue: number
  payout: number
  balance: number
  streak: number
}

const OPTION_MAP: Record<OutcomeResult, { bg: string; text: string; label: string }> = {
  A: { bg: 'bg-neon/10', text: 'text-neon', label: 'Opção A' },
  B: { bg: 'bg-neon-blue/10', text: 'text-neon-blue', label: 'Opção B' },
  C: { bg: 'bg-amber-500/10', text: 'text-amber-500', label: 'Opção C' },
}

function generateOutcome(): OutcomeResult {
  const rand = Math.random()
  if (rand < 0.486) return 'A'
  if (rand < 0.972) return 'B'
  return 'C'
}

function getFibonacciBet(fibIndex: number, baseBet: number): number {
  const fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]
  const idx = Math.min(fibIndex, fibs.length - 1)
  return baseBet * fibs[idx]
}

export function BinaryScenarioSimulator() {
  const { toast } = useToast()
  const { neon } = useThemeColors()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  const [initialOperation, setInitialOperation] = useState('10')
  const [strategy, setStrategy] = useState<Strategy>('martingale')
  const [bankroll, setBankroll] = useState('1000')
  const [targetOption, setTargetOption] = useState<TargetOption>('A')
  const [numRounds, setNumRounds] = useState('50')

  const [results, setResults] = useState<BinaryRound[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const runSimulation = useCallback(() => {
    const baseOperationValue = parseFloat(initialOperation) || 0
    let balance = parseFloat(bankroll) || 0
    const totalRounds = parseInt(numRounds) || 0

    if (baseOperationValue <= 0 || balance <= 0 || totalRounds <= 0) {
      toast({ title: 'Erro', description: 'Verifique os valores inseridos', variant: 'destructive' })
      return
    }

    setIsRunning(true)
    const simulationResults: BinaryRound[] = []
    let currentOperationValue = baseOperationValue
    let fibIndex = 0
    let currentStreak = 0

    for (let i = 0; i < totalRounds; i++) {
      if (balance < currentOperationValue) break

      const outcomeResult = generateOutcome()
      const isFavorable = outcomeResult === targetOption

      const multiplier = targetOption === 'C' ? 14 : 2
      const payout = isFavorable ? currentOperationValue * (multiplier - 1) : -currentOperationValue
      balance += payout

      if (isFavorable) {
        currentStreak = currentStreak > 0 ? currentStreak + 1 : 1
      } else {
        currentStreak = currentStreak < 0 ? currentStreak - 1 : -1
      }

      simulationResults.push({
        round: i + 1,
        result: outcomeResult,
        target: targetOption,
        isFavorable,
        operationValue: currentOperationValue,
        payout: parseFloat(payout.toFixed(2)),
        balance: parseFloat(balance.toFixed(2)),
        streak: currentStreak,
      })

      // Update operation value based on strategy
      if (strategy === 'martingale') {
        currentOperationValue = isFavorable ? baseOperationValue : currentOperationValue * 2
      } else if (strategy === 'fibonacci') {
        if (isFavorable) {
          fibIndex = Math.max(0, fibIndex - 2)
        } else {
          fibIndex = fibIndex + 1
        }
        currentOperationValue = getFibonacciBet(fibIndex, baseOperationValue)
      } else {
        currentOperationValue = baseOperationValue
      }

      // Ensure operation value doesn't exceed balance
      currentOperationValue = Math.min(currentOperationValue, balance)
      if (currentOperationValue <= 0) break
    }

    setResults(simulationResults)
    setIsRunning(false)

    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'binary-scenario-simulator',
      params: { initialOperation, strategy, bankroll, targetOption, numRounds },
      result: {
        totalRounds: simulationResults.length,
        favorables: simulationResults.filter(r => r.isFavorable).length,
        unfavorables: simulationResults.filter(r => !r.isFavorable).length,
        finalBalance: simulationResults[simulationResults.length - 1]?.balance || 0,
      },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
  }, [initialOperation, strategy, bankroll, targetOption, numRounds, addHistory, unlockAchievement, toast])

  const handleReset = () => {
    setInitialOperation('10')
    setStrategy('martingale')
    setBankroll('1000')
    setTargetOption('A')
    setNumRounds('50')
    setResults([])
  }

  const handleCopy = () => {
    const text = results
      .map(r => `Rodada ${r.round}: ${OPTION_MAP[r.result].label} | ${r.isFavorable ? 'FAVORÁVEL' : 'DESFAVORÁVEL'} | Operação: R$${r.operationValue.toFixed(2)} | Saldo: R$${r.balance.toFixed(2)}`)
      .join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Resultados copiados para a área de transferência' })
  }

  const stats = useMemo(() => {
    if (results.length === 0) return null
    const favorables = results.filter(r => r.isFavorable).length
    const unfavorables = results.filter(r => !r.isFavorable).length
    const finalBalance = results[results.length - 1]?.balance || 0
    const startBalance = parseFloat(bankroll) || 0
    const profitLoss = finalBalance - startBalance
    const hitRate = (favorables / results.length) * 100
    const maxOperationValue = Math.max(...results.map(r => r.operationValue))
    const maxStreak = Math.max(...results.map(r => Math.abs(r.streak)))
    const maxFavorableStreak = Math.max(...results.map(r => r.streak))
    const maxUnfavorableStreak = Math.min(...results.map(r => r.streak))

    return {
      favorables, unfavorables, finalBalance, profitLoss, hitRate,
      maxOperationValue, maxStreak, maxFavorableStreak, maxUnfavorableStreak,
    }
  }, [results, bankroll])

  const chartData = useMemo(() => {
    return results.map(r => ({
      round: r.round,
      balance: r.balance,
    }))
  }, [results])

  const fav = isFavorite('binary-scenario-simulator')

  const strategyLabels: Record<Strategy, string> = {
    martingale: 'Martingale',
    fibonacci: 'Fibonacci',
    flat: 'Valor Fixo',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Dices className="h-7 w-7 text-neon" />
            Simulador de <span className="gradient-neon-text">Cenários Binários</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Simule cenários com resultados binários e múltiplas progressões matemáticas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fav ? removeFavorite('binary-scenario-simulator') : addFavorite('binary-scenario-simulator')}
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
                <Dices className="h-4 w-4 text-neon" /> Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Valor da Operação (R$)</Label>
                <Input
                  type="number"
                  value={initialOperation}
                  onChange={(e) => setInitialOperation(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Estratégia</Label>
                <div className="grid grid-cols-3 gap-1">
                  {(['martingale', 'fibonacci', 'flat'] as Strategy[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStrategy(s)}
                      className={`px-2 py-2 rounded-lg text-[10px] font-semibold transition-all ${
                        strategy === s
                          ? 'bg-neon/10 text-neon border border-neon/30'
                          : 'bg-muted/30 text-muted-foreground border border-border/30 hover:border-neon/20'
                      }`}
                    >
                      {strategyLabels[s]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Opção Alvo</Label>
                <div className="grid grid-cols-3 gap-1">
                  {(['A', 'B', 'C'] as TargetOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setTargetOption(opt)}
                      className={`px-2 py-2 rounded-lg text-[10px] font-semibold transition-all ${
                        targetOption === opt
                          ? opt === 'A'
                            ? 'bg-neon/20 text-neon border border-neon/30'
                            : opt === 'B'
                            ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                            : 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                          : 'bg-muted/30 text-muted-foreground border border-border/30 hover:border-neon/20'
                      }`}
                    >
                      Opção {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Capital Inicial (R$)</Label>
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
                  value={numRounds}
                  onChange={(e) => setNumRounds(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  max="10000"
                />
              </div>

              <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Probabilidades: Opção A: 48.6% | Opção B: 48.6% | Opção C: 2.7% (paga 14x)
                </p>
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
                  <p className="text-[10px] text-muted-foreground">Favoráveis</p>
                  <p className="text-xl font-black text-neon">{stats.favorables}</p>
                </CardContent>
              </Card>
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground">Desfavoráveis</p>
                  <p className="text-xl font-black text-red-500">{stats.unfavorables}</p>
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
                  <span className="text-muted-foreground">Taxa Favorável</span>
                  <span className="font-mono text-neon">{stats.hitRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Máximo da Operação</span>
                  <span className="font-mono text-amber-500">R$ {stats.maxOperationValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sequência Favorável Máxima</span>
                  <span className="font-mono text-neon">{stats.maxFavorableStreak}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sequência Desfavorável Máxima</span>
                  <span className="font-mono text-red-500">{Math.abs(stats.maxUnfavorableStreak)}</span>
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
                            <th className="text-center p-3 font-semibold text-muted-foreground">Resultado</th>
                            <th className="text-center p-3 font-semibold text-muted-foreground">Alvo</th>
                            <th className="text-center p-3 font-semibold text-muted-foreground">Status</th>
                            <th className="text-right p-3 font-semibold text-muted-foreground">Operação</th>
                            <th className="text-right p-3 font-semibold text-muted-foreground">Resultado</th>
                            <th className="text-right p-3 font-semibold text-muted-foreground">Saldo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((r, i) => (
                            <tr
                              key={i}
                              className={`border-b border-border/30 transition-colors ${
                                r.isFavorable ? 'hover:bg-neon/5' : 'hover:bg-red-500/5'
                              }`}
                            >
                              <td className="p-3 font-bold">#{r.round}</td>
                              <td className="text-center p-3">
                                <Badge className={`border-0 text-[10px] ${OPTION_MAP[r.result].bg} ${OPTION_MAP[r.result].text}`}>
                                  {OPTION_MAP[r.result].label}
                                </Badge>
                              </td>
                              <td className="text-center p-3">
                                <Badge className={`border-0 text-[10px] ${OPTION_MAP[r.target].bg} ${OPTION_MAP[r.target].text}`}>
                                  {OPTION_MAP[r.target].label}
                                </Badge>
                              </td>
                              <td className="text-center p-3">
                                <Badge className={`border-0 text-[10px] ${
                                  r.isFavorable ? 'bg-neon/10 text-neon' : 'bg-red-500/10 text-red-500'
                                }`}>
                                  {r.isFavorable ? 'FAVORÁVEL' : 'DESFAVORÁVEL'}
                                </Badge>
                              </td>
                              <td className="text-right p-3 font-mono">R$ {r.operationValue.toFixed(2)}</td>
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
                    <ResponsiveContainer width="100%" height={350}>
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
                          formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Saldo']}
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
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-12 text-center">
                <Dices className="h-12 w-12 text-neon/30 mx-auto mb-4" />
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
                <p className="text-sm font-semibold text-amber-500">Aviso Educacional</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Este simulador demonstra conceitos matemáticos de progressões (Martingale, Fibonacci) em cenários hipotéticos. Nenhum modelo matemático garante resultados positivos. As probabilidades utilizadas são ilustrativas e não representam nenhum produto real.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
