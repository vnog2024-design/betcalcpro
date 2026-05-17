'use client'

import { useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  RotateCcw, Target, AlertTriangle, Copy, Download, Check, Info, ChevronDown, ChevronUp,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { AdInContent } from '@/components/shared/ad-banner'

interface RecoveryStep {
  step: number
  betAmount: number
  potentialRecovery: number
  cumulativeRecovery: number
  remainingLoss: number
  recoveryPercent: number
}

export function LossRecoveryCalculator() {
  const { toast } = useToast()
  const { addHistory, unlockAchievement } = useAppStore()

  const [amountLost, setAmountLost] = useState('100')
  const [recoveryPercentage, setRecoveryPercentage] = useState('50')
  const [targetMultiplier, setTargetMultiplier] = useState('2.0')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copied, setCopied] = useState(false)

  const calculateSteps = useCallback((): RecoveryStep[] => {
    const lost = parseFloat(amountLost) || 0
    const recoverPct = (parseFloat(recoveryPercentage) || 0) / 100
    const mult = parseFloat(targetMultiplier) || 2

    if (lost <= 0 || recoverPct <= 0 || recoverPct > 1 || mult <= 1) return []

    const steps: RecoveryStep[] = []
    let remainingLoss = lost
    let cumulativeRecovery = 0
    let step = 0
    const maxSteps = 50

    while (remainingLoss > 0.01 && step < maxSteps) {
      step++
      const recoveryTarget = lost * recoverPct
      const betAmount = recoveryTarget / (mult - 1)
      const potentialRecovery = betAmount * (mult - 1)
      cumulativeRecovery += potentialRecovery
      remainingLoss = Math.max(0, lost - cumulativeRecovery)
      const recoveryPercent = Math.min(100, (cumulativeRecovery / lost) * 100)

      steps.push({
        step,
        betAmount,
        potentialRecovery,
        cumulativeRecovery,
        remainingLoss,
        recoveryPercent,
      })

      if (cumulativeRecovery >= lost) break
    }

    return steps
  }, [amountLost, recoveryPercentage, targetMultiplier])

  const steps = useMemo(() => calculateSteps(), [calculateSteps])

  const totalWagered = steps.reduce((sum, s) => sum + s.betAmount, 0)
  const totalSteps = steps.length
  const finalRecoveryPercent = steps.length > 0 ? steps[steps.length - 1].recoveryPercent : 0

  const handleCopy = () => {
    if (steps.length === 0) return
    const text = steps
      .map(
        (s) =>
          `Step ${s.step}: Aposta R$${s.betAmount.toFixed(2)} | Recuperação R$${s.potentialRecovery.toFixed(2)} | Acumulado R$${s.cumulativeRecovery.toFixed(2)} | Restante R$${s.remainingLoss.toFixed(2)}`
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
      tool: 'loss-recovery',
      params: { amountLost, recoveryPercentage, targetMultiplier },
      result: { totalSteps, totalWagered, finalRecoveryPercent },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const handleReset = () => {
    setAmountLost('100')
    setRecoveryPercentage('50')
    setTargetMultiplier('2.0')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <RotateCcw className="h-7 w-7 text-neon" />
            Recuperação de <span className="gradient-neon-text">Loss %</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Calcule a recuperação de perdas com percentual por etapa
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
                <Label className="text-sm text-muted-foreground">Valor Perdido (R$)</Label>
                <Input
                  type="number"
                  value={amountLost}
                  onChange={(e) => setAmountLost(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">% de Recuperação por Etapa</Label>
                <Input
                  type="number"
                  value={recoveryPercentage}
                  onChange={(e) => setRecoveryPercentage(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  max="100"
                  step="1"
                />
                <p className="text-[10px] text-muted-foreground">Qual % da perda tentar recuperar a cada passo</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Multiplicador Alvo</Label>
                <Input
                  type="number"
                  value={targetMultiplier}
                  onChange={(e) => setTargetMultiplier(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1.1"
                  step="0.1"
                />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-sm text-muted-foreground"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                Explicação da Estratégia
              </Button>

              {showAdvanced && (
                <div className="space-y-2 p-3 rounded-lg bg-muted/20 border border-border/50">
                  <p className="text-[10px] text-muted-foreground">
                    <Info className="h-3 w-3 inline mr-1" />
                    Esta estratégia define um percentual da perda total como meta de recuperação por etapa.
                    O valor da aposta é calculado para que, ao ganhar com o multiplicador alvo, 
                    você recupere exatamente esse percentual da perda original. O processo se repete 
                    até que a perda seja totalmente recuperada.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-neon/20 bg-neon/5">
              <CardContent className="p-3 text-center">
                <Target className="h-4 w-4 text-neon mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Etapas Necessárias</p>
                <p className="text-xl font-black gradient-neon-text">{totalSteps}</p>
              </CardContent>
            </Card>
            <Card className="border-neon-blue/20 bg-neon-blue/5">
              <CardContent className="p-3 text-center">
                <RotateCcw className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Total Apostado</p>
                <p className="text-xl font-black neon-text-blue">
                  R$ {totalWagered.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recovery Progress */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Progresso de Recuperação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress value={finalRecoveryPercent} className="h-3 bg-muted/50" />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0%</span>
                <span className="text-neon font-bold">{finalRecoveryPercent.toFixed(1)}%</span>
                <span>100%</span>
              </div>
            </CardContent>
          </Card>

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
          {steps.length === 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-8 text-center">
                <RotateCcw className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-base text-muted-foreground">
                  Preencha os campos ao lado para calcular a progressão de recuperação.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Progress Overview */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground">Perda Original</p>
                      <p className="text-base font-bold text-red-400">
                        R$ {(parseFloat(amountLost) || 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground">% por Etapa</p>
                      <p className="text-base font-bold text-neon-blue">
                        {recoveryPercentage}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground">Recuperação Total</p>
                      <p className="text-base font-bold text-neon">
                        R$ {steps[steps.length - 1]?.cumulativeRecovery.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground">Restante</p>
                      <p className="text-base font-bold text-amber-400">
                        R$ {steps[steps.length - 1]?.remainingLoss.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progression Table */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-neon" /> Tabela de Progressão
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="max-h-[420px]">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-card">
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold text-muted-foreground">Etapa</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Aposta</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Recuperação</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Acumulado</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Restante</th>
                          <th className="text-center p-3 font-semibold text-muted-foreground">%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {steps.map((s, i) => (
                          <tr
                            key={i}
                            className={`border-b border-border/30 transition-colors hover:bg-muted/20 ${
                              s.remainingLoss <= 0 ? 'bg-neon/10' : ''
                            }`}
                          >
                            <td className="p-3 font-bold">
                              <Badge
                                className={`border-0 text-[10px] ${
                                  s.remainingLoss <= 0
                                    ? 'bg-neon/20 text-neon'
                                    : 'bg-muted/50 text-muted-foreground'
                                }`}
                              >
                                Step {s.step}
                              </Badge>
                            </td>
                            <td className="text-right p-3 font-mono">
                              R$ {s.betAmount.toFixed(2)}
                            </td>
                            <td className="text-right p-3 font-mono text-neon">
                              R$ {s.potentialRecovery.toFixed(2)}
                            </td>
                            <td className="text-right p-3 font-mono text-neon-blue">
                              R$ {s.cumulativeRecovery.toFixed(2)}
                            </td>
                            <td className={`text-right p-3 font-mono ${s.remainingLoss <= 0 ? 'text-neon' : 'text-amber-500'}`}>
                              R$ {s.remainingLoss.toFixed(2)}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Progress value={s.recoveryPercent} className="h-1.5 flex-1 bg-muted/50" />
                                <span className="text-[10px] font-mono text-muted-foreground w-10 text-right">
                                  {s.recoveryPercent.toFixed(0)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Visual Progress Bars */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-neon-blue" /> Recuperação Visual por Etapa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {steps.map((s, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-muted-foreground">Step {s.step}</span>
                          <span className="text-neon font-mono">{s.recoveryPercent.toFixed(1)}%</span>
                        </div>
                        <Progress
                          value={s.recoveryPercent}
                          className="h-2 bg-muted/50"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <AdInContent />

          {/* Warning */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-500">Aviso - Jogo Responsável</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Nenhuma estratégia garante recuperação de perdas. Cada aposta carrega risco real de perda adicional.
                  A progressão de recuperação pode levar a apostas cada vez maiores. Defina limites claros e nunca
                  aposte mais do que pode se permitir perder. Jogue com responsabilidade.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
