'use client'

import { useState, useMemo, useCallback } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AdInContent } from '@/components/ads/ad-unit'
import { 
  Calculator, Copy, Star, RotateCcw, Info,
  Target, TrendingUp, AlertTriangle, Check, X,
  ChevronRight, Play
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type OpResult = 'win' | 'loss' | 'pending'

interface MasanielloStep {
  opNumber: number
  betAmount: number
  ifWinCapital: number
  ifLoseCapital: number
  ifWinReturn: number
  winsNeeded: number
  opsRemaining: number
}

function formatCurrency(value: number): string {
  if (!isFinite(value)) return '∞'
  if (value < 0) return `-R$ ${Math.abs(value).toFixed(2)}`
  return `R$ ${value.toFixed(2)}`
}

/**
 * Build the Masaniello coefficient table NE[events_done][wins_so_far]
 * 
 * This is the exact algorithm from the spreadsheet:
 * - NE[e][w] = 1 if w >= winsNeeded (target reached)
 * - NE[e][w] = O^(totalOps-e) if remaining_wins == remaining_ops (must win all remaining)
 * - Otherwise: NE[e][w] = (O * NE[e+1][w] * NE[e+1][w+1]) / (NE[e+1][w] + (O-1) * NE[e+1][w+1])
 */
function buildCoefficientTable(totalOps: number, winsNeeded: number, payout: number): number[][] {
  const NE: number[][] = []
  for (let e = 0; e <= totalOps + 1; e++) {
    NE[e] = new Array(winsNeeded + 2).fill(0)
  }

  // Boundary: wins >= winsNeeded -> 1
  for (let e = 0; e <= totalOps + 1; e++) {
    NE[e][winsNeeded] = 1
    NE[e][winsNeeded + 1] = 1
  }
  // Beyond all events -> 1
  for (let w = 0; w <= winsNeeded + 1; w++) {
    NE[totalOps + 1][w] = 1
  }

  // All remaining events must be wins
  for (let e = 0; e <= totalOps; e++) {
    for (let w = 0; w <= winsNeeded; w++) {
      const remWins = winsNeeded - w
      const remEvents = totalOps - e
      if (remWins > 0 && remWins === remEvents) {
        NE[e][w] = Math.pow(payout, remEvents)
      }
    }
  }

  // Fill from bottom-right to top-left
  for (let e = totalOps; e >= 0; e--) {
    for (let w = winsNeeded - 1; w >= 0; w--) {
      const remWins = winsNeeded - w
      const remEvents = totalOps - e
      if (remWins > 0 && remWins === remEvents) continue
      if (w >= winsNeeded) continue

      const below = NE[e + 1][w]
      const belowRight = NE[e + 1][w + 1]

      if (below === 0 || belowRight === 0) {
        NE[e][w] = Infinity
      } else {
        NE[e][w] = (payout * below * belowRight) / (below + (payout - 1) * belowRight)
      }
    }
  }

  return NE
}

/**
 * Calculate the investment amount using the exact Masaniello formula:
 * 
 * invest = bank * (1 - O * NE[events+1][wins+1] / (NE[events+1][wins] + (O-1) * NE[events+1][wins+1]))
 */
function calcInvestment(bank: number, eventsDone: number, winsSoFar: number, payout: number, NE: number[][]): number {
  const A = NE[eventsDone + 1][winsSoFar + 1]
  const B = NE[eventsDone + 1][winsSoFar]
  
  if (!A || !B || A === 0 || B === 0 || !isFinite(A) || !isFinite(B)) return 0
  
  const fraction = 1 - (payout * A) / (B + (payout - 1) * A)
  
  if (fraction <= 0 || !isFinite(fraction)) return 0
  
  return Math.min(bank * fraction, bank)
}

export function MasanielloCalculator() {
  const { toast } = useToast()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  // Configuration
  const [capital, setCapital] = useState('200')
  const [totalOps, setTotalOps] = useState('7')
  const [winsNeeded, setWinsNeeded] = useState('2')
  const [payout, setPayout] = useState('2.0')

  // Interactive tracking
  const [results, setResults] = useState<OpResult[]>([])
  const [copied, setCopied] = useState(false)

  const parsedCapital = parseFloat(capital) || 0
  const parsedTotalOps = parseInt(totalOps) || 0
  const parsedWinsNeeded = parseInt(winsNeeded) || 0
  const parsedPayout = parseFloat(payout) || 0

  // Build coefficient table
  const NE = useMemo(() => {
    if (parsedTotalOps <= 0 || parsedWinsNeeded <= 0 || parsedPayout <= 1) return null
    if (parsedWinsNeeded > parsedTotalOps) return null
    return buildCoefficientTable(parsedTotalOps, parsedWinsNeeded, parsedPayout)
  }, [parsedTotalOps, parsedWinsNeeded, parsedPayout])

  // Simulate the full sequence based on current results
  const calculations = useMemo(() => {
    if (!NE || parsedCapital <= 0) return null

    let currentBank = parsedCapital
    let maxBank = parsedCapital
    let winsSoFar = 0
    let lossesSoFar = 0
    let targetReached = false
    let broke = false

    // Apply already-registered results
    for (let i = 0; i < results.length; i++) {
      const eventsDone = winsSoFar + lossesSoFar
      if (eventsDone >= parsedTotalOps || winsSoFar >= parsedWinsNeeded || currentBank <= 0) break

      const invest = calcInvestment(currentBank, eventsDone, winsSoFar, parsedPayout, NE)
      
      if (results[i] === 'win') {
        const returnAmount = invest * (parsedPayout - 1)
        currentBank = currentBank + returnAmount
        winsSoFar++
      } else {
        currentBank = currentBank - invest
        lossesSoFar++
      }
      
      maxBank = Math.max(maxBank, currentBank)
    }

    targetReached = winsSoFar >= parsedWinsNeeded
    broke = currentBank <= 0
    const allDone = (winsSoFar + lossesSoFar) >= parsedTotalOps

    // Calculate next step
    const eventsDoneSoFar = winsSoFar + lossesSoFar
    const nextBet = (!targetReached && !broke && !allDone && eventsDoneSoFar < parsedTotalOps)
      ? calcInvestment(currentBank, eventsDoneSoFar, winsSoFar, parsedPayout, NE)
      : 0

    // Build full progression table (worst-case loss path from current state)
    const steps: MasanielloStep[] = []
    let simBank = currentBank
    let simWins = winsSoFar
    let simLosses = lossesSoFar

    for (let op = eventsDoneSoFar; op < parsedTotalOps; op++) {
      if (simWins >= parsedWinsNeeded || simBank <= 0) break

      const simEventsDone = simWins + simLosses
      const invest = calcInvestment(simBank, simEventsDone, simWins, parsedPayout, NE)
      const ifWinReturn = invest * (parsedPayout - 1)
      const ifWinCapital = simBank + ifWinReturn
      const ifLoseCapital = simBank - invest

      steps.push({
        opNumber: op + 1,
        betAmount: invest,
        ifWinCapital,
        ifLoseCapital,
        ifWinReturn,
        winsNeeded: parsedWinsNeeded - simWins,
        opsRemaining: parsedTotalOps - simEventsDone,
      })

      // Assume loss for next calculation
      simBank = ifLoseCapital
      simLosses++
    }

    const profit = currentBank - parsedCapital

    return {
      steps,
      currentBank,
      maxBank,
      winsSoFar,
      lossesSoFar,
      eventsDoneSoFar,
      nextBet,
      targetReached,
      broke,
      allDone,
      profit,
    }
  }, [NE, parsedCapital, parsedTotalOps, parsedWinsNeeded, parsedPayout, results])

  const handleResult = useCallback((result: 'win' | 'loss') => {
    if (!calculations || calculations.targetReached || calculations.broke || calculations.allDone) return
    setResults(prev => [...prev, result])
  }, [calculations])

  const handleReset = () => {
    setCapital('200')
    setTotalOps('7')
    setWinsNeeded('2')
    setPayout('2.0')
    setResults([])
  }

  const handleRestart = () => {
    setResults([])
  }

  const handleCopy = () => {
    if (!calculations) return
    const lines = [
      `=== Masaniello — Planejamento de Capital ===`,
      `Capital: R$ ${capital} | Operações: ${totalOps} | Vitórias necessárias: ${winsNeeded} | Multiplicador: ${payout}x`,
      ``,
      ...calculations.steps.map((s) =>
        `Op ${s.opNumber}: Aposta R$${s.betAmount.toFixed(2)} | Se ganhar: R$${s.ifWinCapital.toFixed(2)} | Se perder: R$${s.ifLoseCapital.toFixed(2)}`
      ),
      ``,
      `Capital atual: R$ ${calculations.currentBank.toFixed(2)}`,
      `Lucro: R$ ${calculations.profit.toFixed(2)}`,
    ].join('\n')

    navigator.clipboard.writeText(lines)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Resultados copiados' })
  }

  const handleSave = () => {
    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'masaniello',
      params: { capital, totalOps, winsNeeded, payout },
      result: calculations ? { profit: calculations.profit.toFixed(2), capital: calculations.currentBank.toFixed(2) } : {},
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const fav = isFavorite('masaniello')

  // Probability analysis
  const winRateNeeded = parsedTotalOps > 0 ? ((parsedWinsNeeded / parsedTotalOps) * 100).toFixed(1) : '0'
  const breakEvenProb = parsedPayout > 1 ? ((1 / parsedPayout) * 100).toFixed(1) : '0'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black flex items-center gap-3">
            <Calculator className="h-8 w-8 text-neon" />
            Calculadora <span className="gradient-neon-text">Masaniello</span>
          </h1>
          <p className="text-base text-muted-foreground mt-2">
            Distribua seu capital entre operações — acerte o mínimo e saia no lucro
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fav ? removeFavorite('masaniello') : addFavorite('masaniello')}
          className={fav ? 'text-neon' : 'text-muted-foreground'}
        >
          <Star className={`h-5 w-5 mr-1 ${fav ? 'fill-neon' : ''}`} />
          {fav ? 'Favoritado' : 'Favoritar'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Configuration */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-neon" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm">Capital a Arriscar (R$)</Label>
                <Input type="number" value={capital} onChange={(e) => { setCapital(e.target.value); setResults([]) }} className="bg-muted/50 border-border text-base h-11" min="1" step="1" />
                <p className="text-xs text-muted-foreground">Valor total que quer distribuir entre as operações</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Total de Operações</Label>
                <Input type="number" value={totalOps} onChange={(e) => { setTotalOps(e.target.value); setResults([]) }} className="bg-muted/50 border-border text-base h-11" min="1" max="50" step="1" />
                <p className="text-xs text-muted-foreground">Quantas operações vai fazer no máximo</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Vitórias Necessárias</Label>
                <Input type="number" value={winsNeeded} onChange={(e) => { setWinsNeeded(e.target.value); setResults([]) }} className="bg-muted/50 border-border text-base h-11" min="1" max="50" step="1" />
                <p className="text-xs text-muted-foreground">Mínimo de vitórias para ter lucro</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Multiplicador (payout)</Label>
                <Input type="number" value={payout} onChange={(e) => { setPayout(e.target.value); setResults([]) }} className="bg-muted/50 border-border text-base h-11" min="1.1" step="0.1" />
                <p className="text-xs text-muted-foreground">Quanto paga cada vitória (ex: 2.0 = dobra)</p>
              </div>
            </CardContent>
          </Card>

          {/* How it works */}
          <Card className="border-neon/10 bg-neon/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-neon" />
                <h4 className="text-sm font-semibold text-neon">Como funciona</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                O <strong className="text-foreground">Masaniello</strong> usa uma tabela de coeficientes recursivos para calcular 
                a aposta exata a cada operação. A fórmula ajusta automaticamente: se perde, aposta menos; se ganha, 
                a meta se aproxima e as apostas diminuem. Se você precisa de <strong className="text-foreground">{winsNeeded} vitória{parseInt(winsNeeded) > 1 ? 's' : ''}</strong> em <strong className="text-foreground">{totalOps} operações</strong>,
                o algoritmo distribui o capital de forma que atingindo o mínimo, você lucra.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleCopy} variant="outline" className="border-border text-sm h-10">
              {copied ? 'Copiado!' : <><Copy className="h-4 w-4 mr-2" /> Copiar</>}
            </Button>
            <Button onClick={handleSave} variant="outline" className="border-border text-sm h-10">
              Salvar
            </Button>
            <Button onClick={handleReset} variant="outline" className="border-border text-sm h-10">
              <RotateCcw className="h-4 w-4 mr-2" /> Resetar
            </Button>
            <Button onClick={handleRestart} variant="outline" className="border-border text-sm h-10">
              <Play className="h-4 w-4 mr-2" /> Refazer
            </Button>
          </div>

          {/* Probability info */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-4 space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Análise de Probabilidade
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxa de acerto necessária</span>
                  <Badge className="bg-neon-blue/10 text-neon-blue border-0">{winRateNeeded}%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Probabilidade de empate ({payout}x)</span>
                  <Badge className="bg-amber-500/10 text-amber-500 border-0">{breakEvenProb}%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vantagem</span>
                  <Badge className={parseFloat(winRateNeeded) < parseFloat(breakEvenProb) ? 'bg-neon/10 text-neon border-0' : 'bg-red-500/10 text-red-400 border-0'}>
                    {parseFloat(winRateNeeded) < parseFloat(breakEvenProb) ? 'Favorável' : 'Desfavorável'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {calculations && (
            <>
              {/* Current Status */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="border-neon/20 bg-neon/5">
                  <CardContent className="p-4 text-center">
                    <Target className="h-4 w-4 text-neon mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Capital Atual</p>
                    <p className="text-xl font-black gradient-neon-text">{formatCurrency(calculations.currentBank)}</p>
                  </CardContent>
                </Card>
                <Card className={calculations.profit >= 0 ? 'border-neon/20 bg-neon/5' : 'border-red-500/20 bg-red-500/5'}>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-4 w-4 text-neon mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Lucro/Prejuízo</p>
                    <p className={`text-xl font-black ${calculations.profit >= 0 ? 'gradient-neon-text' : 'text-red-400'}`}>
                      {calculations.profit >= 0 ? '+' : ''}{formatCurrency(calculations.profit)}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-neon-blue/20 bg-neon-blue/5">
                  <CardContent className="p-4 text-center">
                    <Calculator className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Próxima Aposta</p>
                    <p className="text-xl font-black neon-text-blue">{formatCurrency(calculations.nextBet)}</p>
                  </CardContent>
                </Card>
                <Card className="border-purple-500/20 bg-purple-500/5">
                  <CardContent className="p-4 text-center">
                    <AlertTriangle className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Progresso</p>
                    <p className="text-xl font-black text-purple-500">{calculations.winsSoFar}/{parsedWinsNeeded} vit.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Status Banner */}
              {calculations.targetReached && (
                <Card className="border-neon/30 bg-neon/10 neon-glow">
                  <CardContent className="p-5 text-center">
                    <p className="text-2xl font-black gradient-neon-text">META ATINGIDA! 🎯</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Você atingiu o mínimo de {winsNeeded} vitória{parseInt(winsNeeded) > 1 ? 's' : ''}. 
                      Lucro: <span className="text-neon font-bold">{formatCurrency(calculations.profit)}</span>
                    </p>
                  </CardContent>
                </Card>
              )}

              {calculations.broke && !calculations.targetReached && (
                <Card className="border-red-500/30 bg-red-500/10">
                  <CardContent className="p-5 text-center">
                    <p className="text-2xl font-black text-red-400">CAPITAL ZERADO ❌</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Não foi possível atingir {winsNeeded} vitória{parseInt(winsNeeded) > 1 ? 's' : ''} com este capital.
                    </p>
                  </CardContent>
                </Card>
              )}

              {calculations.allDone && !calculations.targetReached && (
                <Card className="border-red-500/30 bg-red-500/10">
                  <CardContent className="p-5 text-center">
                    <p className="text-2xl font-black text-red-400">OPERAÇÕES ESGOTADAS ❌</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Todas as {totalOps} operações realizadas sem atingir {winsNeeded} vitória{parseInt(winsNeeded) > 1 ? 's' : ''}.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Interactive: Record Results */}
              {!calculations.targetReached && !calculations.broke && !calculations.allDone && calculations.nextBet > 0 && (
                <Card className="border-neon/20 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Play className="h-4 w-4 text-neon" />
                      Operação {calculations.eventsDoneSoFar + 1}
                      <Badge className="bg-neon-blue/10 text-neon-blue border-0 text-xs ml-2">
                        Faltam {parsedWinsNeeded - calculations.winsSoFar} vit. / {parsedTotalOps - calculations.eventsDoneSoFar} ops
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm text-muted-foreground">Aposta sugerida</p>
                        <p className="text-2xl font-black neon-text-blue">{formatCurrency(calculations.nextBet)}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Se ganhar: <span className="text-neon font-bold">{formatCurrency(calculations.steps[0]?.ifWinCapital || 0)}</span> 
                          {' · '}Se perder: <span className="text-red-400 font-bold">{formatCurrency(calculations.steps[0]?.ifLoseCapital || 0)}</span>
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleResult('win')}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold text-base px-6 h-12"
                        >
                          <Check className="h-5 w-5 mr-2" /> Vitória
                        </Button>
                        <Button
                          onClick={() => handleResult('loss')}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold text-base px-6 h-12"
                        >
                          <X className="h-5 w-5 mr-2" /> Derrota
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Results history */}
              {results.length > 0 && (
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">Histórico de Operações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {results.map((r, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
                            r === 'win' 
                              ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {r === 'win' ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                          Op {i + 1}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Full Table */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-neon-blue" />
                    Tabela de Progressão
                    <span className="text-xs text-muted-foreground font-normal ml-1">(caminho de perdas consecutivas)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-y-auto max-h-[500px]">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-card z-10">
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold text-muted-foreground">Op</th>
                          <th className="text-center p-3 font-semibold text-muted-foreground">Faltam</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Aposta</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Se Ganhar ✅</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Se Perder ❌</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculations.steps.map((step, i) => {
                          const isCurrent = i === 0 && !calculations.targetReached && !calculations.broke && !calculations.allDone
                          return (
                            <tr
                              key={step.opNumber}
                              className={`border-b border-border/30 transition-colors ${
                                isCurrent ? 'bg-neon/10 border-l-2 border-l-neon' : 'hover:bg-muted/20'
                              }`}
                            >
                              <td className="p-3 font-bold">
                                {isCurrent ? (
                                  <Badge className="bg-neon/10 text-neon border-0 text-xs">
                                    <ChevronRight className="h-3 w-3 mr-0.5" /> Op {step.opNumber}
                                  </Badge>
                                ) : (
                                  <span>Op {step.opNumber}</span>
                                )}
                              </td>
                              <td className="text-center p-3">
                                <Badge className="bg-neon-blue/10 text-neon-blue border-0 text-xs">
                                  {step.winsNeeded} vit. / {step.opsRemaining} ops
                                </Badge>
                              </td>
                              <td className="text-right p-3 font-mono font-bold text-neon-blue">
                                {formatCurrency(step.betAmount)}
                              </td>
                              <td className="text-right p-3 font-mono text-neon">
                                {formatCurrency(step.ifWinCapital)}
                              </td>
                              <td className="text-right p-3 font-mono text-red-400">
                                {formatCurrency(step.ifLoseCapital)}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Ad */}
              <AdInContent />

              {/* Warning */}
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardContent className="p-4 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      <strong className="text-foreground">Aviso educacional:</strong> O Masaniello redistribui o capital, mas <strong className="text-foreground">não garante lucro</strong>. 
                      Se você não atingir o mínimo de vitórias, o capital é perdido.
                    </p>
                    <p>
                      A taxa de acerto necessária ({winRateNeeded}%) precisa ser realista comparada à probabilidade do evento ({breakEvenProb}% para {payout}x).
                      Se a taxa necessária for maior que a probabilidade, o sistema é matematicamente desfavorável.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-8 text-center">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">Configure os parâmetros</p>
                <p className="text-sm text-muted-foreground">Defina o capital, número de operações e vitórias necessárias</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
