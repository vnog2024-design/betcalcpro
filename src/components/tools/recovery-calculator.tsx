'use client'

import { useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Shield, Target, AlertTriangle, Copy, Download, Check, Info, ChevronDown, ChevronUp,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface StrategyStep {
  step: number
  betAmount: number
  bankrollAfterWin: number
  bankrollAfterLoss: number
  profit: number
}

interface StrategyResult {
  name: string
  icon: string
  color: string
  description: string
  steps: StrategyStep[]
  totalBets: number
  totalWagered: number
  maxDrawdown: number
  riskLevel: 'low' | 'medium' | 'high'
}

export function RecoveryCalculator() {
  const { toast } = useToast()
  const { addHistory, unlockAchievement } = useAppStore()

  const [currentBankroll, setCurrentBankroll] = useState('50')
  const [targetBankroll, setTargetBankroll] = useState('100')
  const [oddsPerBet, setOddsPerBet] = useState('2.0')
  const [riskPercentage, setRiskPercentage] = useState('5')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copied, setCopied] = useState(false)

  const calculateStrategies = useCallback((): StrategyResult[] => {
    const current = parseFloat(currentBankroll) || 0
    const target = parseFloat(targetBankroll) || 0
    const odds = parseFloat(oddsPerBet) || 2
    const riskPct = (parseFloat(riskPercentage) || 0) / 100

    if (current <= 0 || target <= current || odds <= 1 || riskPct <= 0 || riskPct >= 1) return []

    const deficit = target - current
    const maxSteps = 100

    // Strategy 1: Flat Recovery - Fixed bet amount each time
    const flatSteps: StrategyStep[] = []
    const flatBet = current * riskPct
    const flatProfit = flatBet * (odds - 1)
    let flatBankroll = current
    let flatTotalWagered = 0
    let flatMaxDrawdown = 0
    let flatCurrentLow = current

    for (let i = 1; i <= maxSteps; i++) {
      const bet = flatBet
      flatTotalWagered += bet
      const bankrollAfterWin = flatBankroll + bet * (odds - 1)
      const bankrollAfterLoss = flatBankroll - bet
      flatCurrentLow = Math.min(flatCurrentLow, bankrollAfterLoss)
      flatMaxDrawdown = Math.max(flatMaxDrawdown, current - flatCurrentLow)

      flatSteps.push({
        step: i,
        betAmount: bet,
        bankrollAfterWin,
        bankrollAfterLoss,
        profit: flatProfit,
      })
      flatBankroll = bankrollAfterWin
      if (flatBankroll >= target) break
    }

    // Strategy 2: Progressive Recovery - Increase bet as bankroll grows
    const progressiveSteps: StrategyStep[] = []
    let progBankroll = current
    let progTotalWagered = 0
    let progMaxDrawdown = 0
    let progCurrentLow = current

    for (let i = 1; i <= maxSteps; i++) {
      const bet = progBankroll * riskPct
      progTotalWagered += bet
      const bankrollAfterWin = progBankroll + bet * (odds - 1)
      const bankrollAfterLoss = progBankroll - bet
      progCurrentLow = Math.min(progCurrentLow, bankrollAfterLoss)
      progMaxDrawdown = Math.max(progMaxDrawdown, current - progCurrentLow)

      progressiveSteps.push({
        step: i,
        betAmount: bet,
        bankrollAfterWin,
        bankrollAfterLoss,
        profit: bet * (odds - 1),
      })
      progBankroll = bankrollAfterWin
      if (progBankroll >= target) break
    }

    // Strategy 3: Aggressive Recovery - Target a fixed % of remaining deficit each step
    const aggressiveSteps: StrategyStep[] = []
    let aggBankroll = current
    let aggTotalWagered = 0
    let aggMaxDrawdown = 0
    let aggCurrentLow = current

    for (let i = 1; i <= maxSteps; i++) {
      const remaining = target - aggBankroll
      if (remaining <= 0) break
      const recoveryTarget = remaining * riskPct * 2 // Double the risk for aggressive
      const bet = Math.min(recoveryTarget / (odds - 1), aggBankroll * 0.5) // Cap at 50% of bankroll
      aggTotalWagered += bet
      const bankrollAfterWin = aggBankroll + bet * (odds - 1)
      const bankrollAfterLoss = aggBankroll - bet
      aggCurrentLow = Math.min(aggCurrentLow, bankrollAfterLoss)
      aggMaxDrawdown = Math.max(aggMaxDrawdown, current - aggCurrentLow)

      aggressiveSteps.push({
        step: i,
        betAmount: bet,
        bankrollAfterWin,
        bankrollAfterLoss,
        profit: bet * (odds - 1),
      })
      aggBankroll = bankrollAfterWin
      if (aggBankroll >= target) break
    }

    return [
      {
        name: 'Flat',
        icon: '🛡️',
        color: 'text-neon-blue',
        description: 'Aposta fixa em cada etapa. Mais seguro, mas mais lento.',
        steps: flatSteps,
        totalBets: flatSteps.length,
        totalWagered: flatTotalWagered,
        maxDrawdown: flatMaxDrawdown,
        riskLevel: 'low',
      },
      {
        name: 'Progressiva',
        icon: '🎯',
        color: 'text-neon',
        description: 'Aposta cresce com a banca. Equilíbrio entre velocidade e risco.',
        steps: progressiveSteps,
        totalBets: progressiveSteps.length,
        totalWagered: progTotalWagered,
        maxDrawdown: progMaxDrawdown,
        riskLevel: 'medium',
      },
      {
        name: 'Agressiva',
        icon: '⚡',
        color: 'text-amber-500',
        description: 'Mira % do déficit restante. Mais rápido, porém mais arriscado.',
        steps: aggressiveSteps,
        totalBets: aggressiveSteps.length,
        totalWagered: aggTotalWagered,
        maxDrawdown: aggMaxDrawdown,
        riskLevel: 'high',
      },
    ]
  }, [currentBankroll, targetBankroll, oddsPerBet, riskPercentage])

  const strategies = useMemo(() => calculateStrategies(), [calculateStrategies])

  const handleCopy = () => {
    if (strategies.length === 0) return
    const text = strategies
      .map(
        (s) =>
          `--- ${s.name} ---\n` +
          s.steps
            .map(
              (st) =>
                `Step ${st.step}: Aposta R$${st.betAmount.toFixed(2)} | Se Ganhar R$${st.bankrollAfterWin.toFixed(2)} | Se Perder R$${st.bankrollAfterLoss.toFixed(2)}`
            )
            .join('\n')
      )
      .join('\n\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Tabela copiada para a área de transferência' })
  }

  const handleSave = () => {
    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'recovery',
      params: { currentBankroll, targetBankroll, oddsPerBet, riskPercentage },
      result: {
        strategies: strategies.map((s) => ({
          name: s.name,
          totalBets: s.totalBets,
          totalWagered: s.totalWagered,
          maxDrawdown: s.maxDrawdown,
        })),
      },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const handleReset = () => {
    setCurrentBankroll('50')
    setTargetBankroll('100')
    setOddsPerBet('2.0')
    setRiskPercentage('5')
  }

  const getRiskBadge = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return <Badge className="bg-neon-blue/20 text-neon-blue border-0 text-[10px]">Baixo Risco</Badge>
      case 'medium':
        return <Badge className="bg-neon/20 text-neon border-0 text-[10px]">Risco Médio</Badge>
      case 'high':
        return <Badge className="bg-amber-500/20 text-amber-500 border-0 text-[10px]">Alto Risco</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Shield className="h-7 w-7 text-neon" />
            Recuperação de <span className="gradient-neon-text">Banca</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Compare estratégias de recuperação de banca lado a lado
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-neon" /> Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Banca Atual (R$)</Label>
                <Input
                  type="number"
                  value={currentBankroll}
                  onChange={(e) => setCurrentBankroll(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Banca Alvo (R$)</Label>
                <Input
                  type="number"
                  value={targetBankroll}
                  onChange={(e) => setTargetBankroll(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Odds por Aposta</Label>
                <Input
                  type="number"
                  value={oddsPerBet}
                  onChange={(e) => setOddsPerBet(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="1.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">% de Risco da Banca</Label>
                <Input
                  type="number"
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(e.target.value)}
                  className="bg-muted/50 border-border"
                  min="0.1"
                  max="99"
                  step="0.1"
                />
                <p className="text-[10px] text-muted-foreground">Percentual da banca arriscado por aposta</p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                Explicação das Estratégias
              </Button>

              {showAdvanced && (
                <div className="space-y-3 p-3 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-neon-blue shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground">
                      <strong className="text-neon-blue">Flat:</strong> Aposta um valor fixo em cada rodada. 
                      Mais conservador e previsível, porém requer mais apostas para recuperar.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-neon shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground">
                      <strong className="text-neon">Progressiva:</strong> A aposta cresce proporcionalmente à banca.
                      Equilíbrio entre velocidade de recuperação e proteção contra perdas.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground">
                      <strong className="text-amber-500">Agressiva:</strong> Mira um percentual do déficit restante a cada passo.
                      Recuperação mais rápida, mas com maior risco de drawdown.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="border-neon/20 bg-neon/5">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-neon" />
                <span className="text-xs font-semibold text-muted-foreground">Déficit a Recuperar</span>
              </div>
              <p className="text-xl font-black gradient-neon-text text-center">
                R$ {Math.max(0, (parseFloat(targetBankroll) || 0) - (parseFloat(currentBankroll) || 0)).toFixed(2)}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm" className="border-border text-xs">
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
            <Button onClick={handleSave} variant="outline" size="sm" className="border-border text-xs">
              <Download className="h-3 w-3 mr-1" /> Salvar
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm" className="border-border text-xs">
              <Shield className="h-3 w-3 mr-1" /> Resetar
            </Button>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {strategies.length === 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Preencha os campos ao lado para comparar as estratégias de recuperação.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Strategy Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {strategies.map((s) => (
                  <Card key={s.name} className="border-border/50 bg-card/50 backdrop-blur">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{s.icon}</span>
                          <span className={`text-sm font-bold ${s.color}`}>{s.name}</span>
                        </div>
                        {getRiskBadge(s.riskLevel)}
                      </div>
                      <p className="text-[10px] text-muted-foreground">{s.description}</p>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Apostas Necessárias</span>
                          <span className="font-bold">{s.totalBets}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Total Apostado</span>
                          <span className="font-bold font-mono">R$ {s.totalWagered.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Max Drawdown</span>
                          <span className="font-bold font-mono text-red-400">R$ {s.maxDrawdown.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Comparison Table */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-neon" /> Comparação de Estratégias
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="max-h-[400px]">
                    <table className="w-full text-xs">
                      <thead className="sticky top-0 bg-card">
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold text-muted-foreground">Métrica</th>
                          <th className="text-center p-3 font-semibold text-neon-blue">🛡️ Flat</th>
                          <th className="text-center p-3 font-semibold text-neon">🎯 Progressiva</th>
                          <th className="text-center p-3 font-semibold text-amber-500">⚡ Agressiva</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/30 hover:bg-muted/20">
                          <td className="p-3 text-muted-foreground">Apostas até o alvo</td>
                          <td className="text-center p-3 font-bold">{strategies[0]?.totalBets || 0}</td>
                          <td className="text-center p-3 font-bold">{strategies[1]?.totalBets || 0}</td>
                          <td className="text-center p-3 font-bold">{strategies[2]?.totalBets || 0}</td>
                        </tr>
                        <tr className="border-b border-border/30 hover:bg-muted/20">
                          <td className="p-3 text-muted-foreground">Total apostado</td>
                          <td className="text-center p-3 font-mono">R$ {strategies[0]?.totalWagered.toFixed(2)}</td>
                          <td className="text-center p-3 font-mono">R$ {strategies[1]?.totalWagered.toFixed(2)}</td>
                          <td className="text-center p-3 font-mono">R$ {strategies[2]?.totalWagered.toFixed(2)}</td>
                        </tr>
                        <tr className="border-b border-border/30 hover:bg-muted/20">
                          <td className="p-3 text-muted-foreground">Max Drawdown</td>
                          <td className="text-center p-3 font-mono text-red-400">R$ {strategies[0]?.maxDrawdown.toFixed(2)}</td>
                          <td className="text-center p-3 font-mono text-red-400">R$ {strategies[1]?.maxDrawdown.toFixed(2)}</td>
                          <td className="text-center p-3 font-mono text-red-400">R$ {strategies[2]?.maxDrawdown.toFixed(2)}</td>
                        </tr>
                        <tr className="border-b border-border/30 hover:bg-muted/20">
                          <td className="p-3 text-muted-foreground">Primeira aposta</td>
                          <td className="text-center p-3 font-mono">R$ {strategies[0]?.steps[0]?.betAmount.toFixed(2)}</td>
                          <td className="text-center p-3 font-mono">R$ {strategies[1]?.steps[0]?.betAmount.toFixed(2)}</td>
                          <td className="text-center p-3 font-mono">R$ {strategies[2]?.steps[0]?.betAmount.toFixed(2)}</td>
                        </tr>
                        <tr className="border-b border-border/30 hover:bg-muted/20">
                          <td className="p-3 text-muted-foreground">Última aposta</td>
                          <td className="text-center p-3 font-mono">
                            R$ {strategies[0]?.steps[strategies[0].steps.length - 1]?.betAmount.toFixed(2)}
                          </td>
                          <td className="text-center p-3 font-mono">
                            R$ {strategies[1]?.steps[strategies[1].steps.length - 1]?.betAmount.toFixed(2)}
                          </td>
                          <td className="text-center p-3 font-mono">
                            R$ {strategies[2]?.steps[strategies[2].steps.length - 1]?.betAmount.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="border-b border-border/30 hover:bg-muted/20">
                          <td className="p-3 text-muted-foreground">Nível de risco</td>
                          <td className="text-center p-3">{getRiskBadge('low')}</td>
                          <td className="text-center p-3">{getRiskBadge('medium')}</td>
                          <td className="text-center p-3">{getRiskBadge('high')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Strategy Detail Tabs */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-4">
                  <Tabs defaultValue="flat" className="w-full">
                    <TabsList className="bg-muted/50 border border-border w-full">
                      <TabsTrigger value="flat" className="text-xs flex-1">
                        🛡️ Flat
                      </TabsTrigger>
                      <TabsTrigger value="progressive" className="text-xs flex-1">
                        🎯 Progressiva
                      </TabsTrigger>
                      <TabsTrigger value="aggressive" className="text-xs flex-1">
                        ⚡ Agressiva
                      </TabsTrigger>
                    </TabsList>

                    {strategies.map((strategy, idx) => {
                      const tabValue = idx === 0 ? 'flat' : idx === 1 ? 'progressive' : 'aggressive'
                      return (
                        <TabsContent key={tabValue} value={tabValue} className="mt-4">
                          <ScrollArea className="max-h-[350px]">
                            <table className="w-full text-xs">
                              <thead className="sticky top-0 bg-card">
                                <tr className="border-b border-border">
                                  <th className="text-left p-3 font-semibold text-muted-foreground">Etapa</th>
                                  <th className="text-right p-3 font-semibold text-muted-foreground">Aposta</th>
                                  <th className="text-right p-3 font-semibold text-muted-foreground">Lucro</th>
                                  <th className="text-right p-3 font-semibold text-muted-foreground">Se Ganhar</th>
                                  <th className="text-right p-3 font-semibold text-muted-foreground">Se Perder</th>
                                </tr>
                              </thead>
                              <tbody>
                                {strategy.steps.map((st) => (
                                  <tr
                                    key={st.step}
                                    className={`border-b border-border/30 transition-colors hover:bg-muted/20 ${
                                      st.bankrollAfterWin >= (parseFloat(targetBankroll) || 0)
                                        ? 'bg-neon/10'
                                        : ''
                                    }`}
                                  >
                                    <td className="p-3 font-bold">
                                      <Badge
                                        className={`border-0 text-[10px] ${
                                          st.bankrollAfterWin >= (parseFloat(targetBankroll) || 0)
                                            ? 'bg-neon/20 text-neon'
                                            : 'bg-muted/50 text-muted-foreground'
                                        }`}
                                      >
                                        Step {st.step}
                                      </Badge>
                                    </td>
                                    <td className="text-right p-3 font-mono text-amber-500">
                                      R$ {st.betAmount.toFixed(2)}
                                    </td>
                                    <td className="text-right p-3 font-mono text-neon">
                                      R$ {st.profit.toFixed(2)}
                                    </td>
                                    <td className="text-right p-3 font-mono text-neon-blue font-bold">
                                      R$ {st.bankrollAfterWin.toFixed(2)}
                                    </td>
                                    <td className="text-right p-3 font-mono text-red-400">
                                      R$ {st.bankrollAfterLoss.toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </ScrollArea>
                        </TabsContent>
                      )
                    })}
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}

          {/* Warning */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-500">Aviso - Jogo Responsável</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Estas simulações consideram cenários onde todas as apostas são vencedoras, o que é altamente improvável.
                  Na realidade, sequências de perdas podem ocorrer e levar à perda total da banca.
                  Nenhuma estratégia garante lucro ou recuperação. Sempre jogue com dinheiro que pode perder
                  e defina limites rigorosos de perda diária. Procure ajuda se o jogo estiver fora de controle.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
