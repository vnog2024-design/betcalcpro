'use client'

import { useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  RefreshCw, TrendingUp, TrendingDown, AlertTriangle, Copy, Check, Info,
  ChevronDown, ChevronUp, RotateCcw, Wallet, ArrowUpRight,
  Layers, Shield, Zap,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { AdInContent } from '@/components/shared/ad-banner'

interface CycleStep {
  cycle: number
  stepInCycle: number        // 0=entrada, 1=gale1, etc.
  stepLabel: string           // "Entrada", "Gale 1", etc.
  bet: number                 // valor da aposta
  cycleInvested: number       // total investido neste ciclo
  totalLoss: number           // prejuízo acumulado de ciclos anteriores
  totalInvested: number       // total investido (ciclo atual + perdas anteriores)
  potentialReturn: number     // aposta × payout
  netProfit: number           // lucro líquido: retorno - total investido
}

interface CycleGroup {
  cycle: number
  steps: CycleStep[]
  cycleLoss: number           // prejuízo total se perder todo o ciclo
  lastBet: number             // última aposta do ciclo (para calcular próximo ciclo)
  entryBet: number            // entrada do ciclo
}

function formatCurrency(value: number): string {
  if (!isFinite(value)) return '∞'
  if (Math.abs(value) >= 1e12) return `R$ ${(value / 1e12).toFixed(2)}T`
  if (Math.abs(value) >= 1e9) return `R$ ${(value / 1e9).toFixed(2)}B`
  if (Math.abs(value) >= 1e6) return `R$ ${(value / 1e6).toFixed(2)}M`
  if (Math.abs(value) >= 1e3) return `R$ ${value.toFixed(2)}`
  return `R$ ${value.toFixed(2)}`
}

export function CyclesCalculator() {
  const { toast } = useToast()
  const { neon, neonWithAlpha } = useThemeColors()
  const { addHistory, unlockAchievement } = useAppStore()

  const [initialBet, setInitialBet] = useState('1')
  const [payout, setPayout] = useState('2.0')
  const [galeMultiplier, setGaleMultiplier] = useState('2.0')
  const [galesPerCycle, setGalesPerCycle] = useState('2')
  const [cycleMultiplier, setCycleMultiplier] = useState('2.0')
  const [numCycles, setNumCycles] = useState('5')
  const [bankroll, setBankroll] = useState('100')
  const [showExplanation, setShowExplanation] = useState(false)
  const [copied, setCopied] = useState(false)
  const [winAtStep, setWinAtStep] = useState<string | null>(null)

  const calculateCycles = useCallback((): CycleGroup[] => {
    const bet = parseFloat(initialBet) || 0
    const pay = parseFloat(payout) || 0
    const gMult = parseFloat(galeMultiplier) || 0
    const gales = parseInt(galesPerCycle) || 0
    const cMult = parseFloat(cycleMultiplier) || 0
    const cycles = parseInt(numCycles) || 0

    if (bet <= 0 || pay <= 1 || gMult <= 0 || gales <= 0 || cMult <= 0 || cycles <= 0) return []

    const result: CycleGroup[] = []
    let totalLossFromPrevCycles = 0
    let currentEntryBet = bet

    for (let c = 1; c <= cycles; c++) {
      const steps: CycleStep[] = []
      let cycleInvested = 0
      let currentBet = currentEntryBet

      for (let g = 0; g <= gales; g++) {
        cycleInvested += currentBet
        const potentialReturn = currentBet * pay
        const totalInvested = cycleInvested + totalLossFromPrevCycles
        const netProfit = potentialReturn - totalInvested

        steps.push({
          cycle: c,
          stepInCycle: g,
          stepLabel: g === 0 ? 'Entrada' : `Gale ${g}`,
          bet: currentBet,
          cycleInvested,
          totalLoss: totalLossFromPrevCycles,
          totalInvested,
          potentialReturn,
          netProfit,
        })

        currentBet *= gMult
      }

      const lastBet = steps[steps.length - 1].bet
      const cycleLoss = steps[steps.length - 1].totalInvested

      result.push({
        cycle: c,
        steps,
        cycleLoss,
        lastBet,
        entryBet: currentEntryBet,
      })

      // Next cycle: last bet of this cycle × cycle multiplier
      totalLossFromPrevCycles = cycleLoss
      currentEntryBet = lastBet * cMult
    }

    return result
  }, [initialBet, payout, galeMultiplier, galesPerCycle, cycleMultiplier, numCycles])

  const cycles = useMemo(() => calculateCycles(), [calculateCycles])

  const bankrollVal = parseFloat(bankroll) || 0
  const totalSteps = cycles.reduce((acc, c) => acc + c.steps.length, 0)

  // Find how many cycles the bankroll supports
  const bankrollSupport = (() => {
    if (bankrollVal <= 0) return { supportedCycles: 0, breaksAt: '' }
    for (const cycle of cycles) {
      for (const step of cycle.steps) {
        if (step.totalInvested > bankrollVal) {
          return {
            supportedCycles: cycle.cycle - 1,
            breaksAt: `Ciclo ${cycle.cycle} — ${step.stepLabel} (precisa R$${step.totalInvested.toFixed(2)}, tem R$${bankrollVal.toFixed(2)})`,
          }
        }
      }
    }
    return { supportedCycles: cycles.length, breaksAt: '' }
  })()

  // Max loss (if all cycles fail)
  const maxLoss = cycles.length > 0 ? cycles[cycles.length - 1].steps[cycles[cycles.length - 1].steps.length - 1]?.totalInvested || 0 : 0
  // Max bet
  const maxBet = cycles.length > 0 ? Math.max(...cycles.flatMap(c => c.steps.map(s => s.bet))) : 0

  // Chart data: total invested per cycle (if lose all steps)
  const chartData = [
    { name: 'Início', invested: 0, entryBet: parseFloat(initialBet) || 0 },
    ...cycles.map(c => ({
      name: `C${c.cycle}`,
      invested: c.cycleLoss,
      entryBet: c.entryBet,
    })),
  ]

  // Minimum cycle multiplier to break even (for first cycle loss recovery)
  const minCycleMult = parseFloat(payout) > 1 ? (1 / (parseFloat(payout) - 1)) : Infinity
  const isCycleMultTooLow = parseFloat(cycleMultiplier) < minCycleMult && cycles.length > 1

  const handleCopy = () => {
    if (cycles.length === 0) return
    const lines: string[] = []
    lines.push(`Calculadora de Ciclos | Entrada R$${initialBet} | Payout ${payout}x | ${galesPerCycle} Gales | Ciclo Mult ${cycleMultiplier}x`)
    lines.push('')
    for (const cycle of cycles) {
      lines.push(`--- CICLO ${cycle.cycle} ---`)
      for (const step of cycle.steps) {
        const profit = step.netProfit >= 0 ? `+R$${step.netProfit.toFixed(2)}` : `-R$${Math.abs(step.netProfit).toFixed(2)}`
        lines.push(`  ${step.stepLabel}: Aposta R$${step.bet.toFixed(2)} | Investido R$${step.totalInvested.toFixed(2)} | Lucro ${profit}`)
      }
      lines.push(`  Se perder: -R$${cycle.cycleLoss.toFixed(2)}`)
    }
    navigator.clipboard.writeText(lines.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Tabela copiada para a área de transferência' })
  }

  const handleSave = () => {
    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'ciclos',
      params: { initialBet, payout, galeMultiplier, galesPerCycle, cycleMultiplier, numCycles, bankroll },
      result: { maxLoss, totalSteps, supportedCycles: bankrollSupport.supportedCycles },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const handleReset = () => {
    setInitialBet('1')
    setPayout('2.0')
    setGaleMultiplier('2.0')
    setGalesPerCycle('2')
    setCycleMultiplier('2.0')
    setNumCycles('5')
    setBankroll('100')
    setWinAtStep(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <RefreshCw className="h-7 w-7 text-neon" />
            Calculadora de <span className="gradient-neon-text">Ciclos</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Martingale em ciclos: limite os gales e recupere no próximo ciclo
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Config Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-neon" /> Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Valor da Entrada (R$)</Label>
                <Input
                  type="number"
                  value={initialBet}
                  onChange={(e) => setInitialBet(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                  placeholder="Ex: 1"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Payout (Multiplicador)</Label>
                <Input
                  type="number"
                  value={payout}
                  onChange={(e) => setPayout(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1.01"
                  max="100"
                  step="0.01"
                  placeholder="Ex: 2.0"
                />
                <p className="text-[10px] text-muted-foreground">
                  Retorno da aposta (2.0 = dobra)
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-neon" /> Dentro do Ciclo (Gales)
                </p>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-[11px] text-muted-foreground">Multiplicador do Gale</Label>
                    <Input
                      type="number"
                      value={galeMultiplier}
                      onChange={(e) => setGaleMultiplier(e.target.value)}
                      className="bg-muted/50 border-border h-10 text-sm"
                      min="1.1"
                      step="0.1"
                      placeholder="Ex: 2.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] text-muted-foreground">Gales por Ciclo</Label>
                    <Input
                      type="number"
                      value={galesPerCycle}
                      onChange={(e) => setGalesPerCycle(e.target.value)}
                      className="bg-muted/50 border-border h-10 text-sm"
                      min="0"
                      max="50"
                      step="1"
                      placeholder="Ex: 2"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      0 = só entrada, sem gale
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neon/5 border border-neon/20">
                <p className="text-xs font-semibold text-neon mb-2 flex items-center gap-1.5">
                  <RefreshCw className="h-3.5 w-3.5" /> Entre Ciclos (Recuperação)
                </p>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-[11px] text-muted-foreground">Multiplicador do Ciclo</Label>
                    <Input
                      type="number"
                      value={cycleMultiplier}
                      onChange={(e) => setCycleMultiplier(e.target.value)}
                      className="bg-muted/50 border-border h-10 text-sm"
                      min="0.1"
                      step="0.1"
                      placeholder="Ex: 2.0"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Entrada do próximo ciclo = última aposta × este valor
                    </p>
                    {isCycleMultTooLow && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Mínimo para recuperar: {minCycleMult.toFixed(2)}x
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] text-muted-foreground">Número de Ciclos</Label>
                    <Input
                      type="number"
                      value={numCycles}
                      onChange={(e) => setNumCycles(e.target.value)}
                      className="bg-muted/50 border-border h-10 text-sm"
                      min="1"
                      max="50"
                      step="1"
                      placeholder="Ex: 5"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Sua Banca (R$)</Label>
                <Input
                  type="number"
                  value={bankroll}
                  onChange={(e) => setBankroll(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0"
                  step="0.01"
                  placeholder="Ex: 100"
                />
                <p className="text-[10px] text-muted-foreground">
                  Para calcular quantos ciclos sua banca suporta
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-sm text-muted-foreground"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                {showExplanation ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                Como Funciona
              </Button>

              {showExplanation && (
                <div className="space-y-3 p-3 rounded-lg bg-muted/20 border border-border/50">
                  <p className="text-xs text-muted-foreground">
                    <Info className="h-3 w-3 inline mr-1" />
                    A Calculadora de Ciclos é uma variação do Martingale que limita o número de gales por ciclo.
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Layers className="h-3 w-3 text-neon mt-0.5 shrink-0" />
                      <span><strong className="text-foreground">Dentro do ciclo:</strong> Se perder a entrada, faz os gales normalmente (ex: Gale 1, Gale 2).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <RefreshCw className="h-3 w-3 text-neon-blue mt-0.5 shrink-0" />
                      <span><strong className="text-foreground">Entre ciclos:</strong> Se perder todos os gales do ciclo, inicia um novo ciclo com entrada = última aposta × multiplicador do ciclo.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                      <span><strong className="text-foreground">Vantagem:</strong> Evita sequências infinitas de gales. Limita o risco por ciclo e recupera no próximo.</span>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-muted/30 text-[10px] text-muted-foreground">
                    <strong>Exemplo:</strong> Entrada R$1, 2 gales, ciclo mult 2x<br />
                    Ciclo 1: R$1 → R$2 → R$4 (perde tudo: R$7)<br />
                    Ciclo 2: R$8 (4×2) → R$16 → R$32 (se ganhar, lucro +R$1)
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-neon/20 bg-neon/5">
              <CardContent className="p-3 text-center">
                <Wallet className="h-4 w-4 text-neon mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Prejuízo Máximo</p>
                <p className="text-lg font-black gradient-neon-text">
                  {formatCurrency(maxLoss)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-neon-blue/20 bg-neon-blue/5">
              <CardContent className="p-3 text-center">
                <TrendingUp className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Maior Aposta</p>
                <p className="text-lg font-black neon-text-blue">
                  {formatCurrency(maxBet)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bankroll Support */}
          <Card className={`border-2 ${bankrollSupport.breaksAt ? 'border-amber-500/30 bg-amber-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Shield className={`h-4 w-4 ${bankrollSupport.breaksAt ? 'text-amber-500' : 'text-emerald-500'}`} />
                <span className="text-xs font-semibold text-foreground">Sua Banca</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] text-muted-foreground">Suporta</span>
                <span className={`text-lg font-black ${bankrollSupport.breaksAt ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {bankrollSupport.supportedCycles} de {cycles.length} ciclos
                </span>
              </div>
              {bankrollSupport.breaksAt && (
                <p className="text-[10px] text-amber-500 mt-1">
                  <AlertTriangle className="h-3 w-3 inline mr-1" />
                  Quebra no {bankrollSupport.breaksAt}
                </p>
              )}
              {!bankrollSupport.breaksAt && bankrollVal > 0 && (
                <p className="text-[10px] text-emerald-500 mt-1">
                  ✅ Banca suficiente para todos os ciclos
                </p>
              )}
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
          {cycles.length === 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-8 text-center">
                <RefreshCw className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-base text-muted-foreground">
                  Preencha os campos ao lado para calcular os ciclos.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Payout deve ser maior que 1.0, multiplicadores maiores que 0.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Investment Growth Chart */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-amber-500" /> Prejuízo Acumulado por Ciclo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickFormatter={(v) => typeof v === 'number' && v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                      <Tooltip
                        contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                        labelStyle={{ color: "var(--foreground)" }}
                        formatter={(value: number, name: string) => [
                          `R$ ${value.toFixed(2)}`,
                          name === 'invested' ? 'Prejuízo Total' : 'Entrada do Ciclo'
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="invested"
                        stroke="#f59e0b"
                        fill="url(#lossGradient)"
                        strokeWidth={2}
                        name="invested"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Cycle-by-Cycle Detail Cards */}
              {cycles.map((cycle) => (
                <Card key={cycle.cycle} className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
                  {/* Cycle Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-neon/10 via-transparent to-transparent border-b border-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-neon/20 border border-neon/30">
                          <RefreshCw className="h-4 w-4 text-neon" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground">Ciclo {cycle.cycle}</h3>
                          <p className="text-[10px] text-muted-foreground">
                            Entrada: {formatCurrency(cycle.entryBet)} | Última aposta: {formatCurrency(cycle.lastBet)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground">Se perder tudo</p>
                        <p className="text-sm font-bold text-red-400">
                          -{formatCurrency(cycle.cycleLoss)}
                        </p>
                      </div>
                    </div>
                    {cycle.cycle > 1 && cycles[cycle.cycle - 2] && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-amber-500">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>Entrada = {formatCurrency(cycles[cycle.cycle - 2].lastBet)} × {cycleMultiplier}x = {formatCurrency(cycle.entryBet)}</span>
                      </div>
                    )}
                  </div>

                  {/* Steps Table */}
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border/30">
                            <th className="text-left p-2.5 font-semibold text-muted-foreground">Jogada</th>
                            <th className="text-right p-2.5 font-semibold text-muted-foreground">Aposta</th>
                            <th className="text-right p-2.5 font-semibold text-muted-foreground">Investido Ciclo</th>
                            <th className="text-right p-2.5 font-semibold text-muted-foreground">Perdas Ant.</th>
                            <th className="text-right p-2.5 font-semibold text-muted-foreground">Total Investido</th>
                            <th className="text-right p-2.5 font-semibold text-amber-500">Retorno</th>
                            <th className="text-right p-2.5 font-semibold text-neon">Lucro Líquido</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cycle.steps.map((step, i) => {
                            const stepKey = `${cycle.cycle}-${step.stepInCycle}`
                            const isWin = winAtStep === stepKey
                            return (
                              <tr
                                key={i}
                                className={`border-b border-border/20 transition-colors cursor-pointer ${
                                  isWin ? 'bg-neon/20' : 'hover:bg-muted/20'
                                }`}
                                onClick={() => setWinAtStep(isWin ? null : stepKey)}
                              >
                                <td className="p-2.5">
                                  <Badge className={`border-0 text-[10px] ${
                                    step.stepInCycle === 0
                                      ? 'bg-neon/10 text-neon'
                                      : 'bg-muted/50 text-muted-foreground'
                                  }`}>
                                    {step.stepLabel}
                                  </Badge>
                                </td>
                                <td className="text-right p-2.5 font-mono font-bold">
                                  {formatCurrency(step.bet)}
                                </td>
                                <td className="text-right p-2.5 font-mono text-muted-foreground">
                                  {formatCurrency(step.cycleInvested)}
                                </td>
                                <td className="text-right p-2.5 font-mono text-red-400">
                                  {step.totalLoss > 0 ? `-${formatCurrency(step.totalLoss)}` : '—'}
                                </td>
                                <td className="text-right p-2.5 font-mono text-amber-500 font-semibold">
                                  {formatCurrency(step.totalInvested)}
                                </td>
                                <td className="text-right p-2.5 font-mono text-neon-blue">
                                  {formatCurrency(step.potentialReturn)}
                                </td>
                                <td className={`text-right p-2.5 font-mono font-bold ${
                                  step.netProfit >= 0 ? 'text-neon' : 'text-red-400'
                                }`}>
                                  {step.netProfit >= 0 ? '+' : ''}{formatCurrency(step.netProfit)}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Win simulation result */}
                    {winAtStep && winAtStep.startsWith(`${cycle.cycle}-`) && (
                      <div className="p-3 mx-3 mb-3 rounded-lg border border-neon/30 bg-neon/5">
                        {(() => {
                          const [, stepIdx] = winAtStep.split('-').map(Number)
                          const step = cycle.steps[stepIdx]
                          if (!step) return null
                          return (
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-neon/20">
                                <ArrowUpRight className="h-5 w-5 text-neon" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-neon">
                                  ✅ GREEN no Ciclo {cycle.cycle} — {step.stepLabel}!
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Aposta {formatCurrency(step.bet)} | Retorno {formatCurrency(step.potentialReturn)} | Investido {formatCurrency(step.totalInvested)}
                                </p>
                                <p className="text-xs font-bold text-neon">
                                  Lucro líquido: +{formatCurrency(step.netProfit)}
                                </p>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Compact Overview: Visual Cycle Map */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-neon" /> Mapa dos Ciclos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cycles.map((cycle) => {
                      const isSupported = bankrollVal <= 0 || cycle.cycleLoss <= bankrollVal
                      return (
                        <div
                          key={cycle.cycle}
                          className={`flex flex-col items-center p-3 rounded-xl border transition-colors min-w-[100px] ${
                            isSupported
                              ? 'border-border/50 bg-muted/20 hover:border-neon/30'
                              : 'border-red-500/30 bg-red-500/5'
                          }`}
                        >
                          <span className="text-[10px] text-muted-foreground">Ciclo {cycle.cycle}</span>
                          <span className="text-sm font-bold font-mono text-neon">
                            {formatCurrency(cycle.entryBet)}
                          </span>
                          <span className="text-[10px] text-amber-500">
                            até {formatCurrency(cycle.lastBet)}
                          </span>
                          <span className={`text-[10px] font-semibold ${isSupported ? 'text-muted-foreground' : 'text-red-400'}`}>
                            perda: {formatCurrency(cycle.cycleLoss)}
                          </span>
                          {!isSupported && (
                            <span className="text-[9px] text-red-400">⚠ Ultrapassa banca</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Flow Diagram */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Layers className="h-4 w-4 text-neon-blue" /> Fluxo de Recuperação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {cycles.map((cycle, idx) => (
                      <div key={cycle.cycle} className="flex items-center gap-1.5">
                        <div className="flex flex-col items-center px-3 py-2 rounded-lg border border-neon/20 bg-neon/5">
                          <span className="text-[9px] text-neon font-semibold">C{cycle.cycle}</span>
                          <span className="font-mono font-bold">{formatCurrency(cycle.entryBet)}</span>
                          <span className="text-[9px] text-muted-foreground">{parseInt(galesPerCycle) + 1} jogadas</span>
                        </div>
                        {idx < cycles.length - 1 && (
                          <div className="flex flex-col items-center text-neon">
                            <ArrowUpRight className="h-4 w-4" />
                            <span className="text-[9px] font-semibold">×{cycleMultiplier}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-3">
                    Cada seta indica que a entrada do próximo ciclo = última aposta do ciclo anterior × {cycleMultiplier}x
                  </p>
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
                  A estratégia de ciclos limita os gales por rodada, mas o prejuízo acumula exponencialmente
                  entre ciclos. Verifique se sua banca suporta os ciclos planejados. O multiplicador do ciclo
                  deve ser alto o suficiente para recuperar as perdas anteriores. Sempre defina limites e
                  jogue com responsabilidade.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
