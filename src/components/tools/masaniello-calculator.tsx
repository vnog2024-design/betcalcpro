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

interface OpStep {
  opNumber: number
  remainingOps: number
  remainingWinsNeeded: number
  betAmount: number
  ifWin: number
  ifLose: number
  ifWinCapital: number
  ifLoseCapital: number
}

type OpResult = 'win' | 'loss' | 'pending'

function formatCurrency(value: number): string {
  if (!isFinite(value)) return '∞'
  if (value < 0) return `-R$ ${Math.abs(value).toFixed(2)}`
  return `R$ ${value.toFixed(2)}`
}

export function MasanielloCalculator() {
  const { toast } = useToast()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  // Configuration
  const [capital, setCapital] = useState('100')
  const [totalOps, setTotalOps] = useState('10')
  const [winsNeeded, setWinsNeeded] = useState('1')
  const [multiplier, setMultiplier] = useState('2.0')

  // Interactive tracking
  const [results, setResults] = useState<OpResult[]>([])
  const [copied, setCopied] = useState(false)

  const parsedCapital = parseFloat(capital) || 0
  const parsedTotalOps = parseInt(totalOps) || 0
  const parsedWinsNeeded = parseInt(winsNeeded) || 0
  const parsedMultiplier = parseFloat(multiplier) || 0

  // Calculate the full Masaniello table from current state
  const calculations = useMemo(() => {
    if (parsedCapital <= 0 || parsedTotalOps <= 0 || parsedWinsNeeded <= 0 || parsedMultiplier <= 1) return null
    if (parsedWinsNeeded > parsedTotalOps) return null

    const steps: OpStep[] = []
    let currentCapital = parsedCapital
    let remWins = parsedWinsNeeded
    let remOps = parsedTotalOps

    // Apply already-registered results
    for (let i = 0; i < results.length && i < parsedTotalOps; i++) {
      if (currentCapital <= 0 || remOps <= 0) break

      const proportion = remWins / remOps
      const bet = Math.min(currentCapital * proportion / (parsedMultiplier - 1), currentCapital)

      if (results[i] === 'win') {
        currentCapital += bet * (parsedMultiplier - 1)
        remWins--
      } else if (results[i] === 'loss') {
        currentCapital -= bet
      }
      remOps--
    }

    // Calculate remaining steps
    const startOp = results.length
    let simCapital = currentCapital
    let simWins = remWins
    let simOps = remOps

    for (let i = 0; i < simOps; i++) {
      if (simCapital <= 0 || simOps - i <= 0 || simWins <= 0) {
        // No more bets needed (already hit target or broke)
        if (simWins <= 0) break
        if (simCapital <= 0) break
      }

      const proportion = simWins / (simOps - i)
      const bet = Math.min(simCapital * proportion / (parsedMultiplier - 1), simCapital)
      const ifWin = bet * (parsedMultiplier - 1)
      const ifLose = bet
      const ifWinCapital = simCapital + ifWin
      const ifLoseCapital = simCapital - ifLose

      steps.push({
        opNumber: startOp + i + 1,
        remainingOps: simOps - i,
        remainingWinsNeeded: simWins,
        betAmount: bet,
        ifWin,
        ifLose,
        ifWinCapital,
        ifLoseCapital,
      })

      // Default path: assume loss for next calculation
      simCapital -= ifLose
      simWins = simWins // stays same on loss
    }

    const targetReached = remWins <= 0
    const broke = currentCapital <= 0
    const allDone = results.length >= parsedTotalOps
    const profit = currentCapital - parsedCapital

    return {
      steps,
      currentCapital,
      remainingWins: remWins,
      remainingOps: remOps,
      targetReached,
      broke,
      allDone,
      profit,
      nextBet: steps.length > 0 ? steps[0].betAmount : 0,
    }
  }, [parsedCapital, parsedTotalOps, parsedWinsNeeded, parsedMultiplier, results])

  const handleResult = useCallback((result: 'win' | 'loss') => {
    if (!calculations || calculations.targetReached || calculations.broke || calculations.allDone) return
    setResults(prev => [...prev, result])
  }, [calculations])

  const handleReset = () => {
    setCapital('100')
    setTotalOps('10')
    setWinsNeeded('1')
    setMultiplier('2.0')
    setResults([])
  }

  const handleRestart = () => {
    setResults([])
  }

  const handleCopy = () => {
    if (!calculations) return
    const lines = [
      `=== Masaniello — Planejamento de Capital ===`,
      `Capital: R$ ${capital} | Operações: ${totalOps} | Vitórias necessárias: ${winsNeeded} | Multiplicador: ${multiplier}x`,
      ``,
      ...calculations.steps.map((s) =>
        `Op ${s.opNumber}: Aposta R$${s.betAmount.toFixed(2)} | Se ganhar: R$${s.ifWinCapital.toFixed(2)} | Se perder: R$${s.ifLoseCapital.toFixed(2)}`
      ),
      ``,
      `Capital atual: R$ ${calculations.currentCapital.toFixed(2)}`,
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
      params: { capital, totalOps, winsNeeded, multiplier },
      result: calculations ? { profit: calculations.profit.toFixed(2), capital: calculations.currentCapital.toFixed(2) } : {},
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const fav = isFavorite('masaniello')

  // Win rate needed
  const winRateNeeded = parsedTotalOps > 0 ? ((parsedWinsNeeded / parsedTotalOps) * 100).toFixed(1) : '0'
  // Break-even probability for this multiplier
  const breakEvenProb = parsedMultiplier > 1 ? ((1 / parsedMultiplier) * 100).toFixed(1) : '0'

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
                <Input type="number" value={multiplier} onChange={(e) => { setMultiplier(e.target.value); setResults([]) }} className="bg-muted/50 border-border text-base h-11" min="1.1" step="0.1" />
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
                O <strong className="text-foreground">Masaniello</strong> redistribui seu capital automaticamente a cada operação. 
                Se você precisa de <strong className="text-foreground">{winsNeeded} vitória{parseInt(winsNeeded) > 1 ? 's' : ''}</strong> em <strong className="text-foreground">{totalOps} operações</strong>,
                a calculadora ajusta o valor de cada aposta conforme os resultados vão aparecendo. 
                Se perder, as próximas apostas diminuem. Se ganhar, a meta é atingida e para.
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
                  <span className="text-muted-foreground">Probabilidade de empate ({multiplier}x)</span>
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
                    <p className="text-xl font-black gradient-neon-text">{formatCurrency(calculations.currentCapital)}</p>
                  </CardContent>
                </Card>
                <Card className={`border-${calculations.profit >= 0 ? 'neon' : 'red-500'}/20 bg-${calculations.profit >= 0 ? 'neon' : 'red-500'}/5`}>
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
                    <p className="text-xs text-muted-foreground">Restante</p>
                    <p className="text-xl font-black text-purple-500">{calculations.remainingWins} vit. / {calculations.remainingOps} ops</p>
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
                      Todas as {totalOps} operações foram realizadas sem atingir o mínimo de {winsNeeded} vitória{parseInt(winsNeeded) > 1 ? 's' : ''}.
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
                      Operação {results.length + 1}
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
                    Tabela de Progressão Completa
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
                          <th className="text-right p-3 font-semibold text-muted-foreground">Se Ganhar</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Se Perder</th>
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
                                  {step.remainingWinsNeeded} vit. / {step.remainingOps} ops
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
                      A taxa de acerto necessária ({winRateNeeded}%) precisa ser realista comparada à probabilidade do evento ({breakEvenProb}% para {multiplier}x).
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
