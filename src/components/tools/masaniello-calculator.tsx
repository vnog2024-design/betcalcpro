'use client'

import { useState, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Calculator, Target, Copy, Download, RotateCcw,
  Check, AlertTriangle, TrendingUp, TrendingDown, Info, Shield
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import { useToast } from '@/hooks/use-toast'

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
      `Masaniello Calculator Report`,
      `Total Events: ${totalEvents} | Hits Needed: ${eventsToHit} | Odds: ${odds}`,
      `Bankroll: R$ ${bankroll}`,
      ``,
      ...calculations.events.map((e) =>
        `Event ${e.event}: Bet R$${e.betAmount.toFixed(2)} | If Win: R$${e.ifWinBankroll.toFixed(2)} | If Lose: R$${e.ifLoseBankroll.toFixed(2)}`
      ),
      ``,
      `Best Case Final: R$ ${calculations.bestCase.finalBankroll.toFixed(2)}`,
      `Worst Case Final: R$ ${calculations.worstCase.finalBankroll.toFixed(2)}`,
      `Expected Final (M hits): R$ ${calculations.targetCase.finalBankroll.toFixed(2)}`,
    ].join('\n')

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copied!', description: 'Masaniello report copied to clipboard' })
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
    toast({ title: 'Saved!', description: 'Calculation saved to history' })
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
            Masaniello <span className="gradient-neon-text">Calculator</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Distribute risk across events with the Masaniello progression system
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-neon" /> Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Total Events (N)</Label>
                <Input
                  type="number"
                  value={totalEvents}
                  onChange={(e) => setTotalEvents(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="1"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Events to Hit (M)</Label>
                <Input
                  type="number"
                  value={eventsToHit}
                  onChange={(e) => setEventsToHit(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="1"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Odds (Decimal)</Label>
                <Input
                  type="number"
                  value={odds}
                  onChange={(e) => setOdds(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="1.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Unit Stake (R$)</Label>
                <Input
                  type="number"
                  value={unitStake}
                  onChange={(e) => setUnitStake(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Bankroll (R$)</Label>
                <Input
                  type="number"
                  value={bankroll}
                  onChange={(e) => setBankroll(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                <p className="text-[10px] text-muted-foreground">
                  <Info className="h-3 w-3 inline mr-1" />
                  The Masaniello system distributes risk across N events where you need M correct hits.
                  It calculates the optimal stake for each event based on remaining events and hits needed,
                  using the formula: Stake = Bankroll × (M/N) / (Odds - 1).
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
                  <p className="text-[10px] text-muted-foreground">Best Case (All Wins)</p>
                  <p className="text-lg font-black gradient-neon-text">
                    R$ {calculations.bestCase.finalBankroll.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-neon-blue/20 bg-neon-blue/5">
                <CardContent className="p-3 text-center">
                  <Target className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Target (M Hits)</p>
                  <p className="text-lg font-black neon-text-blue">
                    R$ {calculations.targetCase.finalBankroll.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="p-3 text-center">
                  <TrendingDown className="h-4 w-4 text-red-500 mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Worst Case (All Losses)</p>
                  <p className="text-lg font-black text-red-400">
                    R$ {calculations.worstCase.finalBankroll.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              {/* Hit rate info */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-neon-blue" />
                    <span className="text-xs font-semibold">Required Hit Rate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {eventsToHit}/{totalEvents} events
                    </span>
                    <Badge className="bg-neon-blue/10 text-neon-blue border-0">
                      {((parseInt(eventsToHit) / parseInt(totalEvents)) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      Break-even hit rate at {odds}x odds
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
          <div className="grid grid-cols-3 gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm" className="border-border text-xs">
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button onClick={handleSave} variant="outline" size="sm" className="border-border text-xs">
              <Download className="h-3 w-3 mr-1" /> Save
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm" className="border-border text-xs">
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Chart - Bankroll Scenarios */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-neon" /> Bankroll Scenario Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={calculations.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip
                      contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', fontSize: 12 }}
                      labelStyle={{ color: '#e2e8f0' }}
                      formatter={(value: number, name: string) => {
                        const labels: Record<string, string> = {
                          ifWin: 'If Win',
                          ifLose: 'If Lose',
                          bet: 'Bet Amount',
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
                    If Win Path
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    If Lose Path
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-neon-blue" />
                    Bet Amount
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bar Chart - Bet Amounts */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-neon-blue" /> Bet Distribution per Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={calculations.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip
                      contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', fontSize: 12 }}
                      labelStyle={{ color: '#e2e8f0' }}
                      formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Bet']}
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
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4 text-neon-blue" /> Event Progression Table
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="max-h-[500px]">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-card">
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold text-muted-foreground">Event</th>
                        <th className="text-center p-3 font-semibold text-muted-foreground">Remaining</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Bet Amount</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">If Win</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">If Lose</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Bankroll (Win)</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Bankroll (Lose)</th>
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
                              <Badge className="bg-neon/10 text-neon border-0 text-[10px]">Start</Badge>
                            ) : (
                              <span>Event {event.event}</span>
                            )}
                          </td>
                          <td className="text-center p-3">
                            <div className="flex flex-col items-center gap-0.5">
                              <Badge className="bg-neon-blue/10 text-neon-blue text-[10px] border-0">
                                {event.remainingHits}/{event.remainingEvents} hits
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
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Combinatorial Analysis */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" /> Probability Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-[10px] text-muted-foreground">Total Combinations</p>
                    <p className="text-sm font-bold font-mono">
                      {combinations(parseInt(totalEvents), parseInt(eventsToHit)).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-[10px] text-muted-foreground">Win Probability</p>
                    <p className="text-sm font-bold font-mono text-neon">
                      {((1 / parseFloat(odds)) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-[10px] text-muted-foreground">Hit Rate Required</p>
                    <p className="text-sm font-bold font-mono text-neon-blue">
                      {((parseInt(eventsToHit) / parseInt(totalEvents)) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-[10px] text-muted-foreground">Edge</p>
                    <p className={`text-sm font-bold font-mono ${
                      calculations.expectedProfit > 0 ? 'text-neon' : 'text-red-400'
                    }`}>
                      {calculations.expectedProfit > 0 ? '+' : ''}R$ {calculations.expectedProfit.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Warning */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-500">Warning</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  The Masaniello system distributes risk but does not eliminate it. If you fail to hit the
                  required number of events, losses can still be significant. The system is designed for
                  scenarios where you have a statistical edge. Always ensure the required hit rate is achievable
                  given the odds, and never risk more than you can afford to lose.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
