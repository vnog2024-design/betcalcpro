'use client'

import { useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Coins, TrendingUp, AlertTriangle, Copy, Download, Check, Info, ChevronDown, ChevronUp, RotateCcw,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { AdInContent } from '@/components/shared/ad-banner'

interface SorosStep {
  step: number
  startingBankroll: number
  betAmount: number
  potentialWin: number
  bankrollIfWin: number
  profit: number
  growthPercent: number
}

export function SorosCalculator() {
  const { toast } = useToast()
  const { addHistory, unlockAchievement } = useAppStore()

  const [initialBankroll, setInitialBankroll] = useState('100')
  const [targetProfit, setTargetProfit] = useState('200')
  const [numSteps, setNumSteps] = useState('5')
  const [riskPercentage, setRiskPercentage] = useState('100')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copied, setCopied] = useState(false)

  const calculateSteps = useCallback((): SorosStep[] => {
    const bankroll = parseFloat(initialBankroll) || 0
    const target = parseFloat(targetProfit) || 0
    const steps = parseInt(numSteps) || 0
    const riskPct = (parseFloat(riskPercentage) || 0) / 100

    if (bankroll <= 0 || steps <= 0 || riskPct <= 0 || riskPct > 1) return []

    const result: SorosStep[] = []
    let currentBankroll = bankroll
    const oddsPerStep = target / bankroll

    for (let i = 1; i <= steps; i++) {
      const betAmount = currentBankroll * riskPct
      const potentialWin = betAmount * 2 // Soros: assume even money (2x) for simplicity
      const bankrollIfWin = currentBankroll + potentialWin - betAmount // currentBankroll + profit
      const profit = potentialWin - betAmount
      const growthPercent = ((bankrollIfWin - bankroll) / bankroll) * 100

      result.push({
        step: i,
        startingBankroll: currentBankroll,
        betAmount,
        potentialWin,
        bankrollIfWin,
        profit,
        growthPercent,
      })

      currentBankroll = bankrollIfWin
    }

    return result
  }, [initialBankroll, targetProfit, numSteps, riskPercentage])

  const steps = useMemo(() => calculateSteps(), [calculateSteps])

  const totalGrowth = steps.length > 0
    ? ((steps[steps.length - 1].bankrollIfWin - parseFloat(initialBankroll)) / parseFloat(initialBankroll)) * 100
    : 0
  const finalBankroll = steps.length > 0 ? steps[steps.length - 1].bankrollIfWin : 0

  const chartData = [
    { name: 'Início', bankroll: parseFloat(initialBankroll) || 0 },
    ...steps.map((s) => ({
      name: `Etapa ${s.step}`,
      bankroll: s.bankrollIfWin,
    })),
  ]

  const handleCopy = () => {
    if (steps.length === 0) return
    const text = steps
      .map(
        (s) =>
          `Etapa ${s.step}: Banca R$${s.startingBankroll.toFixed(2)} | Aposta R$${s.betAmount.toFixed(2)} | Ganho R$${s.profit.toFixed(2)} | Se Ganhar R$${s.bankrollIfWin.toFixed(2)}`
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
      tool: 'soros',
      params: { initialBankroll, targetProfit, numSteps, riskPercentage },
      result: { totalGrowth, finalBankroll, steps: steps.length },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const handleReset = () => {
    setInitialBankroll('100')
    setTargetProfit('200')
    setNumSteps('5')
    setRiskPercentage('100')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Coins className="h-7 w-7 text-neon" />
            Calculadora <span className="gradient-neon-text">Soros</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Estratégia Soros: reinvesta todos os lucros em cada etapa
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Coins className="h-4 w-4 text-neon" /> Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Banca Inicial (R$)</Label>
                <Input
                  type="number"
                  value={initialBankroll}
                  onChange={(e) => setInitialBankroll(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Lucro Alvo (R$)</Label>
                <Input
                  type="number"
                  value={targetProfit}
                  onChange={(e) => setTargetProfit(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Número de Etapas</Label>
                <Input
                  type="number"
                  value={numSteps}
                  onChange={(e) => setNumSteps(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">% de Risco por Etapa</Label>
                <Input
                  type="number"
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  max="100"
                  step="1"
                />
                <p className="text-[10px] text-muted-foreground">100% = Soros puro (reinveste tudo)</p>
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
                    A estratégia Soros consiste em reinvestir 100% do lucro obtido em cada aposta vencedora.
                    A cada etapa, sua banca cresce de forma composta, e a próxima aposta é baseada na nova banca.
                    Com 100% de risco, você aposta todo o lucro anterior. Com % menor, você protege parte do ganho.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-neon/20 bg-neon/5">
              <CardContent className="p-3 text-center">
                <Coins className="h-4 w-4 text-neon mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Banca Final</p>
                <p className="text-xl font-black gradient-neon-text">
                  R$ {finalBankroll.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-neon-blue/20 bg-neon-blue/5">
              <CardContent className="p-3 text-center">
                <TrendingUp className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Crescimento Total</p>
                <p className="text-xl font-black neon-text-blue">
                  {totalGrowth.toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          </div>

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
                <Coins className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-base text-muted-foreground">
                  Preencha os campos ao lado para calcular a progressão Soros.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Compound Growth Chart */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-neon-blue" /> Crescimento Composto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="bankrollGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                      <Tooltip
                        contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                        labelStyle={{ color: "var(--foreground)" }}
                        formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Banca']}
                      />
                      <Area
                        type="monotone"
                        dataKey="bankroll"
                        stroke="#00ff88"
                        fill="url(#bankrollGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Soros Steps Table */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Coins className="h-4 w-4 text-neon" /> Progressão Soros
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-y-auto max-h-[400px]">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-card">
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold text-muted-foreground">Etapa</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Banca Inicial</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Aposta</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Ganho Potencial</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Banca se Ganhar</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Crescimento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {steps.map((s, i) => (
                          <tr
                            key={i}
                            className="border-b border-border/30 transition-colors hover:bg-muted/20"
                          >
                            <td className="p-3 font-bold">
                              <Badge
                                className={`border-0 text-[10px] ${
                                  s.step === steps.length
                                    ? 'bg-neon/20 text-neon'
                                    : 'bg-muted/50 text-muted-foreground'
                                }`}
                              >
                                Etapa {s.step}
                              </Badge>
                            </td>
                            <td className="text-right p-3 font-mono">
                              R$ {s.startingBankroll.toFixed(2)}
                            </td>
                            <td className="text-right p-3 font-mono text-amber-500">
                              R$ {s.betAmount.toFixed(2)}
                            </td>
                            <td className="text-right p-3 font-mono text-neon">
                              R$ {s.profit.toFixed(2)}
                            </td>
                            <td className="text-right p-3 font-mono text-neon-blue font-bold">
                              R$ {s.bankrollIfWin.toFixed(2)}
                            </td>
                            <td className="text-right p-3 font-mono text-neon">
                              +{s.growthPercent.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Step-by-step visual cards */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-neon" /> Visualização das Etapas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {steps.map((s) => (
                      <div
                        key={s.step}
                        className="flex flex-col items-center p-3 rounded-xl border border-border/50 bg-muted/20 min-w-[90px] hover:border-neon/30 transition-colors"
                      >
                        <span className="text-[10px] text-muted-foreground">Etapa {s.step}</span>
                        <span className="text-base font-bold font-mono text-neon">
                          R${s.bankrollIfWin.toFixed(0)}
                        </span>
                        <span className="text-[10px] text-neon-blue">
                          +{s.growthPercent.toFixed(0)}%
                        </span>
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
                  A estratégia Soros pressupõe vitórias consecutivas, o que é improvável a longo prazo.
                  Uma única perda pode eliminar todo o lucro acumulado. O crescimento composto funciona
                  em ambas as direções. Sempre defina limites de perda e proteja parte dos seus ganhos.
                  Jogue com responsabilidade.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
