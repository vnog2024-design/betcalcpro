'use client'

import { useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import {
  Coins, TrendingUp, TrendingDown, AlertTriangle, Copy, Check, Info,
  ChevronDown, ChevronUp, RotateCcw, Shield, Zap, ArrowUpRight, ArrowDownRight,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { AdInContent } from '@/components/shared/ad-banner'

interface SorosStep {
  step: number
  workingCapital: number       // capital de trabalho (valor apostado)
  // WIN scenario
  grossProfit: number          // lucro bruto da operação
  protectedAmount: number      // valor protegido (1 - soros%)
  reinvestedAmount: number     // valor reinvestido (soros%)
  newWorkingCapital: number    // novo capital de trabalho
  accumulatedProtected: number // lucro protegido acumulado
  totalBankrollIfWin: number   // banca total se ganhar
  // LOSE scenario
  lossAmount: number           // perda da operação
  remainingIfLoss: number      // banca restante se perder
  netResultIfLoss: number      // resultado líquido vs inicial se perder
}

export function SorosCalculator() {
  const { toast } = useToast()
  const { neon, neonWithAlpha } = useThemeColors()
  const { addHistory, unlockAchievement } = useAppStore()

  const [initialBankroll, setInitialBankroll] = useState('100')
  const [multiplier, setMultiplier] = useState('2.0')
  const [sorosPercentage, setSorosPercentage] = useState('100')
  const [numSteps, setNumSteps] = useState('5')
  const [showExplanation, setShowExplanation] = useState(false)
  const [copied, setCopied] = useState(false)

  const calculateSteps = useCallback((): SorosStep[] => {
    const bankroll = parseFloat(initialBankroll) || 0
    const mult = parseFloat(multiplier) || 0
    const sorosPct = (parseFloat(sorosPercentage) || 0) / 100
    const steps = parseInt(numSteps) || 0

    if (bankroll <= 0 || mult <= 1 || sorosPct <= 0 || sorosPct > 1 || steps <= 0) return []

    const result: SorosStep[] = []
    let workingCapital = bankroll
    let accumulatedProtected = 0

    for (let i = 1; i <= steps; i++) {
      const bet = workingCapital
      const grossProfit = bet * (mult - 1)
      const protectedAmt = grossProfit * (1 - sorosPct)
      const reinvestedAmt = grossProfit * sorosPct
      const newWorkingCapital = bet + reinvestedAmt
      accumulatedProtected += protectedAmt
      const totalIfWin = newWorkingCapital + accumulatedProtected

      // If loss at this step
      const lossAmt = bet
      const remainingIfLoss = accumulatedProtected - protectedAmt // protected from PREVIOUS steps only
      const netIfLoss = remainingIfLoss - bankroll + bankroll // = remaining protected only

      result.push({
        step: i,
        workingCapital: bet,
        grossProfit,
        protectedAmount: protectedAmt,
        reinvestedAmount: reinvestedAmt,
        newWorkingCapital,
        accumulatedProtected,
        totalBankrollIfWin: totalIfWin,
        lossAmount: lossAmt,
        remainingIfLoss: accumulatedProtected - protectedAmt, // what was protected BEFORE this step
        netResultIfLoss: (accumulatedProtected - protectedAmt) - bankroll,
      })

      workingCapital = newWorkingCapital
    }

    return result
  }, [initialBankroll, multiplier, sorosPercentage, numSteps])

  const steps = useMemo(() => calculateSteps(), [calculateSteps])

  const bankrollVal = parseFloat(initialBankroll) || 0
  const finalBankroll = steps.length > 0 ? steps[steps.length - 1].totalBankrollIfWin : bankrollVal
  const totalGrowth = bankrollVal > 0 && steps.length > 0
    ? ((finalBankroll - bankrollVal) / bankrollVal) * 100
    : 0
  const totalProfitIfAllWin = steps.length > 0 ? finalBankroll - bankrollVal : 0

  // Worst case: lose at step 1
  const worstCaseRemaining = steps.length > 0 ? steps[0].remainingIfLoss : 0
  const worstCaseNet = steps.length > 0 ? steps[0].netResultIfLoss : 0

  // Best case: win all
  const sorosPctNum = parseFloat(sorosPercentage) || 100

  const chartData = [
    { name: 'Início', bankroll: bankrollVal, protected: 0 },
    ...steps.map((s) => ({
      name: `Etapa ${s.step}`,
      bankroll: s.totalBankrollIfWin,
      protected: s.accumulatedProtected,
    })),
  ]

  const handleCopy = () => {
    if (steps.length === 0) return
    const header = `Soros ${sorosPctNum}% | Banca: R$${bankrollVal.toFixed(2)} | Mult: ${multiplier}x`
    const lines = steps.map((s) => {
      const winLine = `  ✅ VITÓRIA: Lucro R$${s.grossProfit.toFixed(2)} | Protegido R$${s.protectedAmount.toFixed(2)} | Reinvestido R$${s.reinvestedAmount.toFixed(2)} | Banca Total R$${s.totalBankrollIfWin.toFixed(2)}`
      const loseLine = `  ❌ DERROTA: Perda R$${s.lossAmount.toFixed(2)} | Protegido Acum. R$${s.remainingIfLoss.toFixed(2)} | Resultado R$${s.netResultIfLoss.toFixed(2)}`
      return `Etapa ${s.step} | Capital: R$${s.workingCapital.toFixed(2)}\n${winLine}\n${loseLine}`
    })
    const text = [header, ...lines].join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Tabela copiada para a área de transferência' })
  }

  const handleSave = () => {
    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'soros',
      params: { initialBankroll, multiplier, sorosPercentage, numSteps },
      result: { totalGrowth, finalBankroll, steps: steps.length },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const handleReset = () => {
    setInitialBankroll('100')
    setMultiplier('2.0')
    setSorosPercentage('100')
    setNumSteps('5')
  }

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
            Reinvista parte do lucro e proteja o restante em cada etapa
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
                  placeholder="Ex: 100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Multiplicador (Odds)</Label>
                <Input
                  type="number"
                  value={multiplier}
                  onChange={(e) => setMultiplier(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1.01"
                  max="100"
                  step="0.01"
                  placeholder="Ex: 2.0"
                />
                <p className="text-[10px] text-muted-foreground">
                  Ex: 2.0 = dobra o valor | 1.5 = 50% de lucro
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center justify-between">
                  <span>% Soros (Reinversão do Lucro)</span>
                  <span className="font-bold text-neon text-base">{sorosPctNum}%</span>
                </Label>
                <Slider
                  value={[parseFloat(sorosPercentage) || 100]}
                  onValueChange={(v) => setSorosPercentage(String(v[0]))}
                  max={100}
                  min={1}
                  step={1}
                  className="py-2"
                />
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>1% (Conservador)</span>
                  <span>100% (Soros Puro)</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  <Shield className="h-3 w-3 inline mr-1" />
                  {sorosPctNum < 100
                    ? `Você protege ${100 - sorosPctNum}% do lucro a cada vitória e reinveste ${sorosPctNum}%`
                    : 'Soros puro: reinveste 100% do lucro (mais agressivo)'
                  }
                </p>
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

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-sm text-muted-foreground"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                {showExplanation ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                Como Funciona o Soros
              </Button>

              {showExplanation && (
                <div className="space-y-3 p-3 rounded-lg bg-muted/20 border border-border/50">
                  <p className="text-xs text-muted-foreground">
                    <Info className="h-3 w-3 inline mr-1" />
                    A estratégia Soros consiste em reinvestir o lucro obtido em cada operação vencedora.
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Zap className="h-3 w-3 text-neon mt-0.5 shrink-0" />
                      <span><strong className="text-foreground">Soros 100%:</strong> Reinveste todo o lucro. Maior crescimento, mas se perder, perde tudo.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                      <span><strong className="text-foreground">Soros Parcial (ex: 30%):</strong> Reinveste apenas 30% do lucro e protege 70%. Se perder, mantém o lucro protegido das etapas anteriores.</span>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-muted/30 text-[10px] text-muted-foreground">
                    <strong>Exemplo:</strong> Banca R$100, Mult 2x, Soros 30%<br />
                    Etapa 1: Operação R$100 → Ganha R$100 → Protege R$70, Reinveste R$30<br />
                    Etapa 2: Operação R$130 → Se perder, ainda fica com R$70 protegidos!
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-neon/20 bg-neon/5">
              <CardContent className="p-3 text-center">
                <TrendingUp className="h-4 w-4 text-neon mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Se Ganhar Tudo</p>
                <p className="text-lg font-black gradient-neon-text">
                  R$ {formatCurrency(finalBankroll)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-3 text-center">
                <TrendingDown className="h-4 w-4 text-red-500 mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Se Perder na 1ª</p>
                <p className={`text-lg font-black ${worstCaseNet >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  R$ {formatCurrency(worstCaseRemaining)}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="border-neon-blue/20 bg-neon-blue/5">
              <CardContent className="p-3 text-center">
                <Coins className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Lucro Total</p>
                <p className="text-lg font-black neon-text-blue">
                  R$ {formatCurrency(totalProfitIfAllWin)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-3 text-center">
                <Shield className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Protegido Final</p>
                <p className="text-lg font-black text-emerald-500">
                  R$ {formatCurrency(steps.length > 0 ? steps[steps.length - 1].accumulatedProtected : 0)}
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
                <p className="text-sm text-muted-foreground mt-2">
                  O multiplicador deve ser maior que 1.0 e o % Soros entre 1 e 100.
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
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="bankrollGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={neon} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={neon} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="protectedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                      <Tooltip
                        contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                        labelStyle={{ color: "var(--foreground)" }}
                        formatter={(value: number, name: string) => [
                          `R$ ${value.toFixed(2)}`,
                          name === 'bankroll' ? 'Banca Total' : 'Protegido'
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="bankroll"
                        stroke={neon}
                        fill="url(#bankrollGradient)"
                        strokeWidth={2}
                        name="bankroll"
                      />
                      <Area
                        type="monotone"
                        dataKey="protected"
                        stroke="#10b981"
                        fill="url(#protectedGradient)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="protected"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-0.5 bg-neon rounded" />
                      <span>Banca Total</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-0.5 bg-emerald-500 rounded" style={{ borderTop: '1px dashed' }} />
                      <span>Lucro Protegido</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step-by-step detail cards */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-neon" /> Progressão por Etapa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {steps.map((s, idx) => (
                      <div
                        key={s.step}
                        className="rounded-xl border border-border/50 bg-muted/10 overflow-hidden"
                      >
                        {/* Step header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/30">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`border-0 text-xs font-bold ${
                                idx === steps.length - 1
                                  ? 'bg-neon/20 text-neon'
                                  : 'bg-muted/50 text-muted-foreground'
                              }`}
                            >
                              Etapa {s.step}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Capital de Trabalho:
                            </span>
                            <span className="text-sm font-bold font-mono">
                              R$ {formatCurrency(s.workingCapital)}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {((s.workingCapital / bankrollVal - 1) * 100) >= 0 ? '+' : ''}
                            {((s.workingCapital / bankrollVal - 1) * 100).toFixed(0)}% vs inicial
                          </span>
                        </div>

                        {/* Win / Loss columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/30">
                          {/* WIN */}
                          <div className="p-3 space-y-2">
                            <div className="flex items-center gap-1.5 mb-2">
                              <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                              <span className="text-xs font-bold text-emerald-500 uppercase">Se Vitória</span>
                            </div>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                              <div>
                                <span className="text-muted-foreground">Lucro Bruto</span>
                                <p className="font-mono font-bold text-emerald-400">
                                  + R$ {formatCurrency(s.grossProfit)}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Novo Capital</span>
                                <p className="font-mono font-bold">
                                  R$ {formatCurrency(s.newWorkingCapital)}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Shield className="h-2.5 w-2.5" /> Protegido
                                </span>
                                <p className="font-mono font-semibold text-emerald-500">
                                  R$ {formatCurrency(s.protectedAmount)}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Zap className="h-2.5 w-2.5" /> Reinvestido
                                </span>
                                <p className="font-mono font-semibold text-amber-500">
                                  R$ {formatCurrency(s.reinvestedAmount)}
                                </p>
                              </div>
                            </div>
                            <div className="pt-1.5 border-t border-border/20 flex items-center justify-between">
                              <span className="text-[10px] text-muted-foreground">Banca Total</span>
                              <span className="text-sm font-black font-mono text-neon">
                                R$ {formatCurrency(s.totalBankrollIfWin)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-muted-foreground">Protegido Acumulado</span>
                              <span className="text-xs font-semibold font-mono text-emerald-500">
                                R$ {formatCurrency(s.accumulatedProtected)}
                              </span>
                            </div>
                          </div>

                          {/* LOSE */}
                          <div className="p-3 space-y-2">
                            <div className="flex items-center gap-1.5 mb-2">
                              <ArrowDownRight className="h-4 w-4 text-red-500" />
                              <span className="text-xs font-bold text-red-500 uppercase">Se Derrota</span>
                            </div>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                              <div>
                                <span className="text-muted-foreground">Perda da Operação</span>
                                <p className="font-mono font-bold text-red-400">
                                  - R$ {formatCurrency(s.lossAmount)}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Protegido Anterior</span>
                                <p className="font-mono font-semibold text-emerald-500">
                                  R$ {formatCurrency(s.remainingIfLoss)}
                                </p>
                              </div>
                            </div>
                            <div className="pt-1.5 border-t border-border/20 flex items-center justify-between">
                              <span className="text-[10px] text-muted-foreground">Banca Restante</span>
                              <span className={`text-sm font-black font-mono ${s.remainingIfLoss > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                R$ {formatCurrency(s.remainingIfLoss)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-muted-foreground">Resultado Líquido</span>
                              <span className={`text-xs font-bold font-mono ${s.netResultIfLoss >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {s.netResultIfLoss >= 0 ? '+' : ''} R$ {formatCurrency(s.netResultIfLoss)}
                              </span>
                            </div>
                            {s.remainingIfLoss > 0 && s.netResultIfLoss < 0 && (
                              <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20">
                                <p className="text-[10px] text-amber-500">
                                  <Shield className="h-2.5 w-2.5 inline mr-1" />
                                  Você protegeu R$ {formatCurrency(s.remainingIfLoss)} dos ganhos anteriores
                                </p>
                              </div>
                            )}
                            {s.netResultIfLoss >= 0 && s.step > 1 && (
                              <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                <p className="text-[10px] text-emerald-500">
                                  <Shield className="h-2.5 w-2.5 inline mr-1" />
                                  Mesmo perdendo, você sai no lucro!
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compact overview table */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Coins className="h-4 w-4 text-neon" /> Resumo Rápido
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="sticky top-0 bg-card">
                        <tr className="border-b border-border">
                          <th className="text-left p-2.5 font-semibold text-muted-foreground">Etapa</th>
                          <th className="text-right p-2.5 font-semibold text-muted-foreground">Operação</th>
                          <th className="text-right p-2.5 font-semibold text-amber-500">Reinveste</th>
                          <th className="text-right p-2.5 font-semibold text-emerald-500">Protege</th>
                          <th className="text-right p-2.5 font-semibold text-neon">Banca ✅</th>
                          <th className="text-right p-2.5 font-semibold text-red-500">Resta ❌</th>
                        </tr>
                      </thead>
                      <tbody>
                        {steps.map((s, i) => (
                          <tr
                            key={i}
                            className="border-b border-border/30 transition-colors hover:bg-muted/20"
                          >
                            <td className="p-2.5 font-bold">
                              <Badge className="border-0 text-[10px] bg-muted/50 text-muted-foreground">
                                {s.step}
                              </Badge>
                            </td>
                            <td className="text-right p-2.5 font-mono">
                              R$ {formatCurrency(s.workingCapital)}
                            </td>
                            <td className="text-right p-2.5 font-mono text-amber-500">
                              R$ {formatCurrency(s.reinvestedAmount)}
                            </td>
                            <td className="text-right p-2.5 font-mono text-emerald-500">
                              R$ {formatCurrency(s.protectedAmount)}
                            </td>
                            <td className="text-right p-2.5 font-mono text-neon font-bold">
                              R$ {formatCurrency(s.totalBankrollIfWin)}
                            </td>
                            <td className={`text-right p-2.5 font-mono font-bold ${s.remainingIfLoss > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                              R$ {formatCurrency(s.remainingIfLoss)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Visual step cards */}
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
                          R${s.totalBankrollIfWin.toFixed(0)}
                        </span>
                        <span className="text-[10px] text-emerald-500">
                          🛡 R${s.accumulatedProtected.toFixed(0)}
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
                <p className="text-sm font-semibold text-amber-500">Aviso Educacional</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Este simulador demonstra o conceito matemático de reinvestimento parcial (Soros). Os resultados
                  são meramente ilustrativos e não constituem aconselhamento financeiro. Nenhum modelo
                  garante lucro.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
