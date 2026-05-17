'use client'

import { useState, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Calculator, Target, Copy, Download, RotateCcw,
  Check, AlertTriangle, TrendingUp, TrendingDown, Info, Shield
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { AdInContent } from '@/components/shared/ad-banner'

interface MasanielloEvent {
  event: number
  remainingEvents: number
  remainingHits: number
  betAmount: number
  ifWin: number
  ifLose: number
  ifWinBankroll: number
  ifLoseBankroll: number
}

function combinations(n: number, k: number): number {
  if (k < 0 || k > n) return 0
  if (k === 0 || k === n) return 1
  let result = 1
  const minK = Math.min(k, n - k)
  for (let i = 0; i < minK; i++) {
    result = result * (n - i) / (i + 1)
  }
  return Math.round(result)
}

// Calculate path for best case (wins first) or worst case (all losses)
function calculatePath(N: number, M: number, O: number, br: number, bestCase: boolean) {
  let currentBankroll = br
  let remainingHits = M
  let remainingEvents = N
  const path: number[] = [br]

  for (let i = 1; i <= N; i++) {
    if (remainingEvents <= 0 || currentBankroll <= 0) break

    const proportion = remainingHits / remainingEvents
    const betAmount = Math.min(currentBankroll * proportion / (O - 1), currentBankroll)

    if (bestCase && remainingHits > 0) {
      currentBankroll += betAmount * (O - 1)
      remainingHits--
    } else {
      currentBankroll -= betAmount
    }
    remainingEvents--
    path.push(currentBankroll)
  }

  return { finalBankroll: currentBankroll, path }
}

// Calculate the target case: exactly M wins distributed evenly
function calculateTargetPath(N: number, M: number, O: number, br: number) {
  let currentBankroll = br
  let remainingHits = M
  let remainingEvents = N
  const path: number[] = [br]

  const winInterval = M > 0 ? N / M : N

  for (let i = 1; i <= N; i++) {
    if (remainingEvents <= 0 || currentBankroll <= 0) break

    const proportion = remainingHits / remainingEvents
    const betAmount = Math.min(currentBankroll * proportion / (O - 1), currentBankroll)

    const eventIndex = i - 1
    const isWin = remainingHits > 0 && eventIndex >= Math.floor((M - remainingHits) * winInterval)

    if (isWin) {
      currentBankroll += betAmount * (O - 1)
      remainingHits--
    } else {
      currentBankroll -= betAmount
    }
    remainingEvents--
    path.push(currentBankroll)
  }

  return { finalBankroll: currentBankroll, path }
}

function computeMasaniello(totalEvents: string, eventsToHit: string, odds: string, unitStake: string, bankroll: string) {
  const N = parseInt(totalEvents) || 0
  const M = parseInt(eventsToHit) || 0
  const O = parseFloat(odds) || 0
  const unit = parseFloat(unitStake) || 0
  const br = parseFloat(bankroll) || 0

  if (N <= 0 || M <= 0 || M > N || O <= 1 || unit <= 0 || br <= 0) return null

  const events: MasanielloEvent[] = []
  let currentBankroll = br
  let remainingHits = M
  let remainingEvents = N

  for (let i = 1; i <= N; i++) {
    if (remainingEvents <= 0 || remainingHits <= 0) break

    const proportion = remainingHits / remainingEvents
    const betAmount = currentBankroll * proportion / (O - 1)
    const cappedBet = Math.min(betAmount, currentBankroll)

    const ifWin = cappedBet * (O - 1)
    const ifLose = cappedBet
    const ifWinBankroll = currentBankroll + ifWin
    const ifLoseBankroll = currentBankroll - ifLose

    events.push({
      event: i,
      remainingEvents,
      remainingHits,
      betAmount: cappedBet,
      ifWin,
      ifLose,
      ifWinBankroll,
      ifLoseBankroll,
    })

    remainingEvents--
  }

  const bestCase = calculatePath(N, M, O, br, true)
  const worstCase = calculatePath(N, M, O, br, false)
  const targetCase = calculateTargetPath(N, M, O, br)

  const chartData = events.map((e) => ({
    name: `E${e.event}`,
    bet: e.betAmount,
    ifWin: e.ifWinBankroll,
    ifLose: e.ifLoseBankroll,
    event: e.event,
  }))

  return {
    events,
    bestCase,
    worstCase,
    targetCase,
    chartData,
    totalBankroll: br,
    expectedProfit: targetCase.finalBankroll - br,
  }
}

export function MasanielloCalculator() {
  const { toast } = useToast()
  const { addHistory, unlockAchievement } = useAppStore()

  // Inputs
  const [totalEvents, setTotalEvents] = useState('10')
  const [eventsToHit, setEventsToHit] = useState('6')
  const [odds, setOdds] = useState('2.0')
  const [unitStake, setUnitStake] = useState('10')
  const [bankroll, setBankroll] = useState('1000')

  // State
  const [copied, setCopied] = useState(false)

  const calculations = useMemo(
    () => computeMasaniello(totalEvents, eventsToHit, odds, unitStake, bankroll),
    [totalEvents, eventsToHit, odds, unitStake, bankroll]
  )

  const handleCopy = () => {
    if (!calculations) return
    const text = [
      `Relatório Masaniello`,
      `Total de Eventos: ${totalEvents} | Acertos Necessários: ${eventsToHit} | Odds: ${odds}`,
      `Banca: R$ ${bankroll}`,
      ``,
      ...calculations.events.map((e) =>
        `Evento ${e.event}: Aposta R$${e.betAmount.toFixed(2)} | Se Ganhar: R$${e.ifWinBankroll.toFixed(2)} | Se Perder: R$${e.ifLoseBankroll.toFixed(2)}`
      ),
      ``,
      `Melhor Cenário Final: R$ ${calculations.bestCase.finalBankroll.toFixed(2)}`,
      `Pior Cenário Final: R$ ${calculations.worstCase.finalBankroll.toFixed(2)}`,
      `Final Esperado (M acertos): R$ ${calculations.targetCase.finalBankroll.toFixed(2)}`,
    ].join('\n')

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Relatório Masaniello copiado para a área de transferência' })
  }

  const handleSave = () => {
    if (!calculations) return
    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'masaniello',
      params: { totalEvents, eventsToHit, odds, unitStake, bankroll },
      result: {
        expectedProfit: calculations.expectedProfit.toFixed(2),
        bestCase: calculations.bestCase.finalBankroll.toFixed(2),
        worstCase: calculations.worstCase.finalBankroll.toFixed(2),
      },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const handleReset = () => {
    setTotalEvents('10')
    setEventsToHit('6')
    setOdds('2.0')
    setUnitStake('10')
    setBankroll('1000')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Calculator className="h-7 w-7 text-neon" />
            Masaniello <span className="gradient-neon-text">Calculadora</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Distribua o risco entre eventos com o sistema de progressão Masaniello
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-neon" /> Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Total de Eventos (N)</Label>
                <Input
                  type="number"
                  value={totalEvents}
                  onChange={(e) => setTotalEvents(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Eventos a Acertar (M)</Label>
                <Input
                  type="number"
                  value={eventsToHit}
                  onChange={(e) => setEventsToHit(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Odds (decimal)</Label>
                <Input
                  type="number"
                  value={odds}
                  onChange={(e) => setOdds(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Unidade (R$)</Label>
                <Input
                  type="number"
                  value={unitStake}
                  onChange={(e) => setUnitStake(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Banca Inicial (R$)</Label>
                <Input
                  type="number"
                  value={bankroll}
                  onChange={(e) => setBankroll(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                <p className="text-[10px] text-muted-foreground">
                  <Info className="h-3 w-3 inline mr-1" />
                  O sistema Masaniello distribui o risco entre N eventos onde você precisa de M acertos.
                  Ele calcula a aposta ideal para cada evento com base nos eventos restantes e acertos necessários,
                  usando a fórmula: Aposta = Banca × (M/N) / (Odds - 1).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          {calculations && (
            <div className="grid grid-cols-1 gap-3">
              <Card className="border-neon/20 bg-neon/5">
                <CardContent className="p-3 text-center">
                  <TrendingUp className="h-4 w-4 text-neon mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Melhor Cenário (Todos Ganhos)</p>
                  <p className="text-xl font-black gradient-neon-text">
                    R$ {calculations.bestCase.finalBankroll.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-neon-blue/20 bg-neon-blue/5">
                <CardContent className="p-3 text-center">
                  <Target className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Alvo (M Acertos)</p>
                  <p className="text-xl font-black neon-text-blue">
                    R$ {calculations.targetCase.finalBankroll.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="p-3 text-center">
                  <TrendingDown className="h-4 w-4 text-red-500 mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Pior Cenário (Todas Perdas)</p>
                  <p className="text-xl font-black text-red-400">
                    R$ {calculations.worstCase.finalBankroll.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              {/* Hit rate info */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-neon-blue" />
                    <span className="text-sm font-semibold">Taxa de Acerto Necessária</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {eventsToHit}/{totalEvents} eventos
                    </span>
                    <Badge className="bg-neon-blue/10 text-neon-blue border-0">
                      {((parseInt(eventsToHit) / parseInt(totalEvents)) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">
                      Taxa de empate com odds de {odds}x
                    </span>
                    <Badge className="bg-amber-500/10 text-amber-500 border-0">
                      {((1 / parseFloat(odds)) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm" className="border-border text-sm">
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm" className="border-border text-sm">
              <RotateCcw className="h-3 w-3 mr-1" /> Resetar
            </Button>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Chart - Bankroll Scenarios */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-neon" /> Análise de Cenários da Banca
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={calculations.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <Tooltip
                      contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                      labelStyle={{ color: "var(--foreground)" }}
                      formatter={(value: number, name: string) => {
                        const labels: Record<string, string> = {
                          ifWin: 'Se Ganhar',
                          ifLose: 'Se Perder',
                          bet: 'Valor da Aposta',
                        }
                        return [`R$ ${value.toFixed(2)}`, labels[name] || name]
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ifWin"
                      stroke="#00ff88"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#00ff88' }}
                      name="ifWin"
                    />
                    <Line
                      type="monotone"
                      dataKey="ifLose"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#ef4444' }}
                      name="ifLose"
                    />
                    <Line
                      type="monotone"
                      dataKey="bet"
                      stroke="#00d4ff"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 2, fill: '#00d4ff' }}
                      name="bet"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-neon" />
                    Caminho Se Ganhar
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    Caminho Se Perder
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-neon-blue" />
                    Valor da Aposta
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bar Chart - Bet Amounts */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-neon-blue" /> Distribuição de Apostas por Evento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={calculations.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <Tooltip
                      contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                      labelStyle={{ color: "var(--foreground)" }}
                      formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Aposta']}
                    />
                    <Bar dataKey="bet" fill="rgba(0, 212, 255, 0.6)" stroke="#00d4ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Detailed Table */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4 text-neon-blue" /> Tabela de Progressão
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-y-auto max-h-[500px]">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-card">
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold text-muted-foreground">Evento</th>
                        <th className="text-center p-3 font-semibold text-muted-foreground">Restante</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Valor da Aposta</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Se Ganhar</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Se Perder</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Banca (Ganho)</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Banca (Perda)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.events.map((event) => (
                        <tr
                          key={event.event}
                          className="border-b border-border/30 transition-colors hover:bg-muted/20"
                        >
                          <td className="p-3 font-bold">
                            {event.event === 1 ? (
                              <Badge className="bg-neon/10 text-neon border-0 text-[10px]">Início</Badge>
                            ) : (
                              <span>Evento {event.event}</span>
                            )}
                          </td>
                          <td className="text-center p-3">
                            <div className="flex flex-col items-center gap-0.5">
                              <Badge className="bg-neon-blue/10 text-neon-blue text-[10px] border-0">
                                {event.remainingHits}/{event.remainingEvents} acertos
                              </Badge>
                            </div>
                          </td>
                          <td className="text-right p-3 font-mono font-bold text-neon-blue">
                            R$ {event.betAmount.toFixed(2)}
                          </td>
                          <td className="text-right p-3 font-mono text-neon">
                            +R$ {event.ifWin.toFixed(2)}
                          </td>
                          <td className="text-right p-3 font-mono text-red-400">
                            -R$ {event.ifLose.toFixed(2)}
                          </td>
                          <td className="text-right p-3 font-mono font-bold text-neon">
                            R$ {event.ifWinBankroll.toFixed(2)}
                          </td>
                          <td className="text-right p-3 font-mono font-bold text-red-400">
                            R$ {event.ifLoseBankroll.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Combinatorial Analysis */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" /> Análise de Probabilidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-[10px] text-muted-foreground">Combinações Totais</p>
                    <p className="text-base font-bold font-mono">
                      {combinations(parseInt(totalEvents), parseInt(eventsToHit)).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-[10px] text-muted-foreground">Probabilidade de Ganhar</p>
                    <p className="text-base font-bold font-mono text-neon">
                      {((1 / parseFloat(odds)) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-[10px] text-muted-foreground">Taxa de Acerto Necessária</p>
                    <p className="text-base font-bold font-mono text-neon-blue">
                      {((parseInt(eventsToHit) / parseInt(totalEvents)) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-[10px] text-muted-foreground">Vantagem</p>
                    <p className={`text-base font-bold font-mono ${
                      calculations.expectedProfit > 0 ? 'text-neon' : 'text-red-400'
                    }`}>
                      {calculations.expectedProfit > 0 ? '+' : ''}R$ {calculations.expectedProfit.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <AdInContent />

          {/* Warning */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-500">Aviso</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  O sistema Masaniello distribui o risco, mas não o elimina. Se você não atingir o
                  número necessário de eventos, as perdas ainda podem ser significativas. O sistema é projetado para
                  cenários onde você tem uma vantagem estatística. Sempre verifique se a taxa de acerto necessária é alcançável
                  considerando as odds, e nunca arrisque mais do que pode se dar ao luxo de perder.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
