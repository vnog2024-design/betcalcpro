'use client'

import { useState, useMemo, useRef } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Wallet, Target, Shield, Copy, RotateCcw,
  Check, AlertTriangle, TrendingUp, TrendingDown, Info
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { AdInContent } from '@/components/shared/ad-banner'
import { ExportButton } from '@/components/shared/export-button'

interface RiskLevel {
  name: string
  percent: number
  color: string
  borderColor: string
  bgColor: string
}

interface RiskResult {
  level: RiskLevel
  betSize: number
  maxDailyLossAmount: number
  profitTarget: number
  betsBeforeBust: number
  dailyProfitTarget: number
}

const RISK_LEVELS: RiskLevel[] = [
  { name: 'Conservador', percent: 1, color: 'text-neon', borderColor: 'border-neon/20', bgColor: 'bg-neon/5' },
  { name: 'Moderado', percent: 1.5, color: 'text-neon-blue', borderColor: 'border-neon-blue/20', bgColor: 'bg-neon-blue/5' },
  { name: 'Agressivo', percent: 2, color: 'text-amber-500', borderColor: 'border-amber-500/20', bgColor: 'bg-amber-500/5' },
]

export function BankrollCalculator() {
  const { toast } = useToast()
  const { addHistory, unlockAchievement } = useAppStore()

  // Inputs
  const [bankroll, setBankroll] = useState('1000')
  const [riskPercent, setRiskPercent] = useState('2')
  const [targetProfit, setTargetProfit] = useState('50')
  const [maxDailyLoss, setMaxDailyLoss] = useState('5')

  // State
  const [copied, setCopied] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const calculations = useMemo(() => {
    const br = parseFloat(bankroll) || 0
    const risk = parseFloat(riskPercent) || 0
    const target = parseFloat(targetProfit) || 0
    const maxLoss = parseFloat(maxDailyLoss) || 0

    if (br <= 0) return null

    const results: RiskResult[] = RISK_LEVELS.map((level) => {
      const betSize = br * (level.percent / 100)
      const maxDailyLossAmount = br * (maxLoss / 100)
      const profitTarget = br * (target / 100)
      const betsBeforeBust = maxDailyLossAmount > 0 && betSize > 0
        ? Math.floor(maxDailyLossAmount / betSize)
        : 0
      const dailyProfitTarget = profitTarget

      return {
        level,
        betSize,
        maxDailyLossAmount,
        profitTarget,
        betsBeforeBust,
        dailyProfitTarget,
      }
    })

    // Also calculate with custom risk percentage
    const customBetSize = br * (risk / 100)
    const customMaxLossAmount = br * (maxLoss / 100)
    const customProfitTarget = br * (target / 100)
    const customBetsBeforeBust = customMaxLossAmount > 0 && customBetSize > 0
      ? Math.floor(customMaxLossAmount / customBetSize)
      : 0

    return {
      bankroll: br,
      riskPercent: risk,
      targetProfit: target,
      maxDailyLoss: maxLoss,
      results,
      custom: {
        betSize: customBetSize,
        maxDailyLossAmount: customMaxLossAmount,
        profitTarget: customProfitTarget,
        betsBeforeBust: customBetsBeforeBust,
      },
    }
  }, [bankroll, riskPercent, targetProfit, maxDailyLoss])

  const exportData = useMemo(() => {
    if (!calculations) return []
    return [
      ...calculations.results.map((r) => ({
        'Nível de Risco': r.level.name,
        'Percentual': `${r.level.percent}%`,
        'Tamanho da Aposta': r.betSize.toFixed(2),
        'Perda Máxima Diária': r.maxDailyLossAmount.toFixed(2),
        'Lucro Alvo': r.profitTarget.toFixed(2),
        'Apostas até Quebrar': r.betsBeforeBust,
      })),
      {
        'Nível de Risco': 'Personalizado',
        'Percentual': `${calculations.riskPercent}%`,
        'Tamanho da Aposta': calculations.custom.betSize.toFixed(2),
        'Perda Máxima Diária': calculations.custom.maxDailyLossAmount.toFixed(2),
        'Lucro Alvo': calculations.custom.profitTarget.toFixed(2),
        'Apostas até Quebrar': calculations.custom.betsBeforeBust,
      },
    ]
  }, [calculations])

  const handleCopy = () => {
    if (!calculations) return
    const text = [
      `Relatório de Gerenciamento de Banca`,
      `Banca: R$ ${calculations.bankroll.toFixed(2)}`,
      `Risco: ${calculations.riskPercent}%`,
      ``,
      ...RISK_LEVELS.map((level, i) => {
        const r = calculations.results[i]
        return [
          `--- ${level.name} (${level.percent}%) ---`,
          `Aposta Recomendada: R$ ${r.betSize.toFixed(2)}`,
          `Perda Máxima Diária: R$ ${r.maxDailyLossAmount.toFixed(2)}`,
          `Lucro Alvo: R$ ${r.profitTarget.toFixed(2)}`,
          `Apostas até Quebrar: ${r.betsBeforeBust}`,
        ].join('\n')
      }),
      ``,
      `--- Personalizado (${calculations.riskPercent}%) ---`,
      `Aposta Recomendada: R$ ${calculations.custom.betSize.toFixed(2)}`,
      `Perda Máxima Diária: R$ ${calculations.custom.maxDailyLossAmount.toFixed(2)}`,
      `Lucro Alvo: R$ ${calculations.custom.profitTarget.toFixed(2)}`,
      `Apostas até Quebrar: ${calculations.custom.betsBeforeBust}`,
    ].join('\n')

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Relatório copiado para a área de transferência' })
  }

  const handleSave = () => {
    if (!calculations) return
    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'bankroll',
      params: { bankroll, riskPercent, targetProfit, maxDailyLoss },
      result: {
        customBet: calculations.custom.betSize.toFixed(2),
        maxDailyLoss: calculations.custom.maxDailyLossAmount.toFixed(2),
        profitTarget: calculations.custom.profitTarget.toFixed(2),
      },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const handleReset = () => {
    setBankroll('1000')
    setRiskPercent('2')
    setTargetProfit('50')
    setMaxDailyLoss('5')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Wallet className="h-7 w-7 text-neon" />
            Gerenciamento de <span className="gradient-neon-text">Banca</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Calcule o tamanho ideal da aposta e gerencie o risco como um profissional
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
                <Label className="text-sm text-muted-foreground">Banca Atual (R$)</Label>
                <Input
                  type="number"
                  value={bankroll}
                  onChange={(e) => setBankroll(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Percentual de Risco (%)</Label>
                <Input
                  type="number"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.1"
                  max="10"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Lucro Alvo (%)</Label>
                <Input
                  type="number"
                  value={targetProfit}
                  onChange={(e) => setTargetProfit(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.1"
                  max="100"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Perda Máxima Diária (%)</Label>
                <Input
                  type="number"
                  value={maxDailyLoss}
                  onChange={(e) => setMaxDailyLoss(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.1"
                  max="100"
                  step="0.1"
                />
              </div>

              <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                <p className="text-[10px] text-muted-foreground">
                  <Info className="h-3 w-3 inline mr-1" />
                  A regra de 1-2% recomenda apostar apenas 1-2% da banca total por aposta.
                  Isso protege contra sequências de perdas e garante sustentabilidade a longo prazo.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          {calculations && (
            <div className="grid grid-cols-1 gap-3">
              <Card className="border-neon/20 bg-neon/5">
                <CardContent className="p-3 text-center">
                  <Wallet className="h-4 w-4 text-neon mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Aposta Recomendada ({calculations.riskPercent}%)</p>
                  <p className="text-xl font-black gradient-neon-text">
                    R$ {calculations.custom.betSize.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="p-3 text-center">
                  <TrendingDown className="h-4 w-4 text-red-500 mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Perda Máxima Diária</p>
                  <p className="text-xl font-black text-red-400">
                    R$ {calculations.custom.maxDailyLossAmount.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-neon-blue/20 bg-neon-blue/5">
                <CardContent className="p-3 text-center">
                  <TrendingUp className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Lucro Diário Alvo</p>
                  <p className="text-xl font-black neon-text-blue">
                    R$ {calculations.custom.profitTarget.toFixed(2)}
                  </p>
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
              <RotateCcw className="h-3 w-3 mr-1" /> Limpar
            </Button>
          </div>
        </div>

        {/* Right: Results */}
        <div ref={resultsRef} className="lg:col-span-2 space-y-4">
          {calculations && (
            <div className="flex justify-end">
              <ExportButton
                data={exportData}
                filename="bankroll-gestao"
                targetRef={resultsRef}
              />
            </div>
          )}
          {/* Risk Level Comparison */}
          {calculations && (
            <>
              {/* Risk Level Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {calculations.results.map((result, i) => (
                  <Card key={i} className={`${result.level.borderColor} ${result.level.bgColor} backdrop-blur`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-base font-bold flex items-center gap-2 ${result.level.color}`}>
                        <Shield className="h-4 w-4" />
                        {result.level.name}
                        <Badge className="bg-muted/50 text-[10px] ml-auto">{result.level.percent}%</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tamanho da Aposta</span>
                        <span className={`font-mono font-bold ${result.level.color}`}>
                          R$ {result.betSize.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Perda Máxima Diária</span>
                        <span className="font-mono text-red-400">
                          R$ {result.maxDailyLossAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lucro Alvo</span>
                        <span className="font-mono text-neon-blue">
                          R$ {result.profitTarget.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-border/30 pt-2">
                        <span className="text-muted-foreground">Apostas até Quebrar</span>
                        <span className={`font-mono font-bold ${result.betsBeforeBust >= 10 ? 'text-neon' : result.betsBeforeBust >= 5 ? 'text-amber-500' : 'text-red-400'}`}>
                          {result.betsBeforeBust}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed Comparison Table */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-neon" /> Comparação de Níveis de Risco
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-y-auto max-h-[400px]">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-card">
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold text-muted-foreground">Nível de Risco</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Tamanho da Aposta</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Perda Máxima Diária</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Lucro Alvo</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Apostas até Quebrar</th>
                          <th className="text-center p-3 font-semibold text-muted-foreground">Classificação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculations.results.map((result, i) => (
                          <tr key={i} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                            <td className="p-3 font-bold">
                              <div className="flex items-center gap-2">
                                <Shield className={`h-3 w-3 ${result.level.color}`} />
                                <span className={result.level.color}>{result.level.name}</span>
                                <Badge className="bg-muted/50 text-[10px]">{result.level.percent}%</Badge>
                              </div>
                            </td>
                            <td className="text-right p-3 font-mono">
                              R$ {result.betSize.toFixed(2)}
                            </td>
                            <td className="text-right p-3 font-mono text-red-400">
                              R$ {result.maxDailyLossAmount.toFixed(2)}
                            </td>
                            <td className="text-right p-3 font-mono text-neon-blue">
                              R$ {result.profitTarget.toFixed(2)}
                            </td>
                            <td className="text-right p-3 font-mono font-bold">
                              <span className={
                                result.betsBeforeBust >= 10
                                  ? 'text-neon'
                                  : result.betsBeforeBust >= 5
                                  ? 'text-amber-500'
                                  : 'text-red-400'
                              }>
                                {result.betsBeforeBust}
                              </span>
                            </td>
                            <td className="text-center p-3">
                              <Badge className={`text-[10px] ${
                                i === 0
                                  ? 'bg-neon/10 text-neon border-0'
                                  : i === 1
                                  ? 'bg-neon-blue/10 text-neon-blue border-0'
                                  : 'bg-amber-500/10 text-amber-500 border-0'
                              }`}>
                                {i === 0 ? 'Baixo' : i === 1 ? 'Médio' : 'Alto'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                        {/* Custom row */}
                        <tr className="border-b border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
                          <td className="p-3 font-bold">
                            <div className="flex items-center gap-2">
                              <Target className="h-3 w-3 text-neon" />
                              <span className="gradient-neon-text">Personalizado</span>
                              <Badge className="bg-neon/10 text-neon text-[10px] border-0">{calculations.riskPercent}%</Badge>
                            </div>
                          </td>
                          <td className="text-right p-3 font-mono font-bold gradient-neon-text">
                            R$ {calculations.custom.betSize.toFixed(2)}
                          </td>
                          <td className="text-right p-3 font-mono text-red-400">
                            R$ {calculations.custom.maxDailyLossAmount.toFixed(2)}
                          </td>
                          <td className="text-right p-3 font-mono text-neon-blue">
                            R$ {calculations.custom.profitTarget.toFixed(2)}
                          </td>
                          <td className="text-right p-3 font-mono font-bold">
                            <span className={
                              calculations.custom.betsBeforeBust >= 10
                                ? 'text-neon'
                                : calculations.custom.betsBeforeBust >= 5
                                ? 'text-amber-500'
                                : 'text-red-400'
                            }>
                              {calculations.custom.betsBeforeBust}
                            </span>
                          </td>
                          <td className="text-center p-3">
                            <Badge className={`text-[10px] ${
                              calculations.riskPercent <= 1
                                ? 'bg-neon/10 text-neon border-0'
                                : calculations.riskPercent <= 1.5
                                ? 'bg-neon-blue/10 text-neon-blue border-0'
                                : calculations.riskPercent <= 2
                                ? 'bg-amber-500/10 text-amber-500 border-0'
                                : 'bg-red-500/10 text-red-400 border-0'
                            }`}>
                              {calculations.riskPercent <= 1 ? 'Baixo' : calculations.riskPercent <= 1.5 ? 'Médio' : calculations.riskPercent <= 2 ? 'Alto' : 'Perigo'}
                            </Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Bankroll Survival Analysis */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-neon-blue" /> Análise de Sobrevivência da Banca
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-y-auto max-h-[300px]">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-card">
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold text-muted-foreground">Perdas Consecutivas</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Banca Restante</th>
                          <th className="text-right p-3 font-semibold text-muted-foreground">Valor Perdido</th>
                          <th className="text-center p-3 font-semibold text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const br = calculations.bankroll
                          const betSize = calculations.custom.betSize
                          const rows = []
                          let remaining = br
                          for (let i = 1; i <= 20 && remaining > 0; i++) {
                            remaining -= betSize
                            if (remaining < 0) remaining = 0
                            const lossPercent = ((br - remaining) / br) * 100
                            rows.push(
                              <tr key={i} className={`border-b border-border/30 transition-colors ${
                                remaining <= 0
                                  ? 'bg-red-500/10'
                                  : lossPercent >= 50
                                  ? 'bg-amber-500/5'
                                  : 'hover:bg-muted/20'
                              }`}>
                                <td className="p-3 font-mono font-bold">
                                  {i} {i === 1 ? 'perda' : 'perdas'}
                                </td>
                                <td className={`text-right p-3 font-mono font-bold ${
                                  remaining <= 0
                                    ? 'text-red-400'
                                    : lossPercent >= 50
                                    ? 'text-amber-500'
                                    : 'text-neon'
                                }`}>
                                  R$ {remaining.toFixed(2)}
                                </td>
                                <td className="text-right p-3 font-mono text-red-400">
                                  -R$ {(br - remaining).toFixed(2)} ({lossPercent.toFixed(1)}%)
                                </td>
                                <td className="text-center p-3">
                                  <Badge className={`text-[10px] ${
                                    remaining <= 0
                                      ? 'bg-red-500/10 text-red-400 border-0'
                                      : lossPercent >= 50
                                      ? 'bg-amber-500/10 text-amber-500 border-0'
                                      : 'bg-neon/10 text-neon border-0'
                                  }`}>
                                    {remaining <= 0 ? 'QUEBRA' : lossPercent >= 50 ? 'PERIGO' : 'SEGURO'}
                                  </Badge>
                                </td>
                              </tr>
                            )
                            if (remaining <= 0) break
                          }
                          return rows
                        })()}
                      </tbody>
                    </table>
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
                <p className="text-sm font-semibold text-amber-500">Aviso</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Nenhuma estratégia de apostas pode garantir lucros. A regra de 1-2% é uma orientação
                  de gerenciamento de risco, não uma garantia de lucro. Sempre aposte com responsabilidade
                  e nunca aposte mais do que pode perder. Resultados passados não garantem resultados futuros.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
