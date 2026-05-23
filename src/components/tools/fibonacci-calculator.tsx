'use client'

import { useState, useMemo, useRef } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3, TrendingUp, Copy, Download, RotateCcw,
  Check, AlertTriangle, Info
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { AdInContent } from '@/components/shared/ad-banner'
import { ExportButton } from '@/components/shared/export-button'

interface FibLevel {
  level: number
  fibNumber: number
  betAmount: number
  totalInvested: number
  potentialReturn: number
  profit: number
}

export function FibonacciCalculator() {
  const { toast } = useToast()
  const { neon, neonBlue, neonBlueWithAlpha } = useThemeColors()
  const { addHistory, unlockAchievement } = useAppStore()

  // Inputs
  const [initialBet, setInitialBet] = useState('10')
  const [levels, setLevels] = useState('10')
  const [targetMultiplier, setTargetMultiplier] = useState('2.0')

  // State
  const [copied, setCopied] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  const calculations = useMemo(() => {
    const bet = parseFloat(initialBet) || 0
    const numLevels = parseInt(levels) || 0
    const target = parseFloat(targetMultiplier) || 2

    if (bet <= 0 || numLevels <= 0) return null

    // Generate Fibonacci sequence
    const fibSequence: number[] = [1, 1]
    for (let i = 2; i < numLevels; i++) {
      fibSequence.push(fibSequence[i - 1] + fibSequence[i - 2])
    }

    // Build level data
    const fibLevels: FibLevel[] = []
    let totalInvested = 0

    for (let i = 0; i < numLevels; i++) {
      const fibNum = fibSequence[i]
      const betAmount = bet * fibNum
      totalInvested += betAmount
      const potentialReturn = betAmount * target
      const profit = potentialReturn - totalInvested

      fibLevels.push({
        level: i + 1,
        fibNumber: fibNum,
        betAmount,
        totalInvested,
        potentialReturn,
        profit,
      })
    }

    return {
      fibLevels,
      fibSequence,
      totalBankrollNeeded: totalInvested,
      maxProfit: fibLevels[fibLevels.length - 1]?.profit || 0,
      maxBet: fibLevels[fibLevels.length - 1]?.betAmount || 0,
    }
  }, [initialBet, levels, targetMultiplier])

  const chartData = useMemo(() => {
    if (!calculations) return []
    return calculations.fibLevels.map((l) => ({
      name: `N${l.level}`,
      bet: l.betAmount,
      totalInvested: l.totalInvested,
      profit: l.profit,
      fibNumber: l.fibNumber,
    }))
  }, [calculations])

  const exportData = useMemo(() =>
    calculations
      ? calculations.fibLevels.map((l) => ({
          'Nível': l.level,
          'Fibonacci #': l.fibNumber,
          'Valor da Aposta': l.betAmount.toFixed(2),
          'Total Investido': l.totalInvested.toFixed(2),
          'Retorno Potencial': l.potentialReturn.toFixed(2),
          'Lucro': l.profit.toFixed(2),
        }))
      : [],
    [calculations]
  )

  const handleCopy = () => {
    if (!calculations) return
    const text = [
      `Relatório de Progressão Fibonacci`,
      `Aposta Inicial: R$ ${initialBet}`,
      `Níveis: ${levels}`,
      `Multiplicador Alvo: ${targetMultiplier}x`,
      ``,
      ...calculations.fibLevels.map((l) =>
        `Nível ${l.level} (Fib:${l.fibNumber}): Aposta R$${l.betAmount.toFixed(2)} | Investido R$${l.totalInvested.toFixed(2)} | Retorno R$${l.potentialReturn.toFixed(2)} | Lucro R$${l.profit.toFixed(2)}`
      ),
    ].join('\n')

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Tabela Fibonacci copiada para a área de transferência' })
  }

  const handleSave = () => {
    if (!calculations) return
    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'fibonacci',
      params: { initialBet, levels, targetMultiplier },
      result: {
        totalBankroll: calculations.totalBankrollNeeded.toFixed(2),
        maxProfit: calculations.maxProfit.toFixed(2),
        maxBet: calculations.maxBet.toFixed(2),
      },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const handleReset = () => {
    setInitialBet('10')
    setLevels('10')
    setTargetMultiplier('2.0')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-neon" />
            Fibonacci <span className="gradient-neon-text">Calculator</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Calcule sua progressão de apostas Fibonacci com análise visual
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-neon" /> Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Aposta Inicial (R$)</Label>
                <Input
                  type="number"
                  value={initialBet}
                  onChange={(e) => setInitialBet(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Quantidade de Níveis</Label>
                <Input
                  type="number"
                  value={levels}
                  onChange={(e) => setLevels(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  max="30"
                />
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

              <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                <p className="text-[10px] text-muted-foreground">
                  <Info className="h-3 w-3 inline mr-1" />
                  A sequência Fibonacci soma os dois números anteriores: 1, 1, 2, 3, 5, 8, 13, 21, 34...
                  A aposta de cada nível = aposta inicial × número Fibonacci. A progressão é menos agressiva
                  que Martingale, mas ainda exige cuidado com o gerenciamento da banca.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          {calculations && (
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-neon/20 bg-neon/5">
                <CardContent className="p-3 text-center">
                  <BarChart3 className="h-4 w-4 text-neon mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Banca Necessária</p>
                  <p className="text-xl font-black gradient-neon-text">
                    R$ {calculations.totalBankrollNeeded.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-neon-blue/20 bg-neon-blue/5">
                <CardContent className="p-3 text-center">
                  <TrendingUp className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">Lucro Máximo</p>
                  <p className="text-xl font-black neon-text-blue">
                    R$ {calculations.maxProfit.toFixed(2)}
                  </p>
              </CardContent>
              </Card>
              <Card className="border-amber-500/20 bg-amber-500/5 col-span-2">
                <CardContent className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground">Maior Aposta (Nível {calculations.fibLevels.length})</p>
                  <p className="text-xl font-black text-amber-500">
                    R$ {calculations.maxBet.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Fibonacci Sequence Preview */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">Sequência Fibonacci</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {calculations.fibSequence.map((num, i) => (
                    <Badge key={i} className="bg-neon/10 text-neon text-[10px] border-0">
                      {num}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm" className="border-border text-sm">
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm" className="border-border text-sm">
              <RotateCcw className="h-3 w-3 mr-1" /> Reiniciar
            </Button>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Chart */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-neon" /> Gráfico de Progressão de Apostas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <Tooltip
                      contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                      labelStyle={{ color: "var(--foreground)" }}
                      formatter={(value: number, name: string) => {
                        const labels: Record<string, string> = {
                          bet: 'Valor da Aposta',
                          totalInvested: 'Total Investido',
                          profit: 'Lucro',
                        }
                        return [`R$ ${value.toFixed(2)}`, labels[name] || name]
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bet"
                      stroke={neonBlue}
                      strokeWidth={2}
                      dot={{ r: 4, fill: neonBlue }}
                      name="bet"
                    />
                    <Line
                      type="monotone"
                      dataKey="totalInvested"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#f59e0b' }}
                      name="totalInvested"
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke={neon}
                      strokeWidth={2}
                      dot={{ r: 3, fill: neon }}
                      name="profit"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-neon-blue" />
                    Valor da Aposta
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Total Investido
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-neon" />
                    Lucro
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Table */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <div className="flex items-center justify-between px-4 pt-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-neon-blue" /> Tabela de Progressão
                </CardTitle>
                <ExportButton
                  data={exportData}
                  filename="fibonacci-progressao"
                  targetRef={tableRef}
                />
              </div>
              <CardContent className="p-0">
                <div ref={tableRef} className="overflow-y-auto max-h-[500px]">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-card">
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold text-muted-foreground">Nível</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Fibonacci #</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Valor da Aposta</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Total Investido</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Retorno Potencial</th>
                        <th className="text-right p-3 font-semibold text-muted-foreground">Lucro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.fibLevels.map((level) => (
                        <tr
                          key={level.level}
                          className={`border-b border-border/30 transition-colors hover:bg-muted/20 ${
                            level.level <= 3 ? 'bg-neon/5' : ''
                          }`}
                        >
                          <td className="p-3 font-bold">
                            {level.level === 1 ? (
                              <Badge className="bg-neon/10 text-neon border-0 text-[10px]">Entrada</Badge>
                            ) : (
                              <span>Nível {level.level}</span>
                            )}
                          </td>
                          <td className="text-right p-3 font-mono text-neon-blue font-bold">
                            {level.fibNumber}
                          </td>
                          <td className="text-right p-3 font-mono">
                            R$ {level.betAmount.toFixed(2)}
                          </td>
                          <td className="text-right p-3 font-mono text-amber-500">
                            R$ {level.totalInvested.toFixed(2)}
                          </td>
                          <td className="text-right p-3 font-mono text-neon-blue">
                            R$ {level.potentialReturn.toFixed(2)}
                          </td>
                          <td className={`text-right p-3 font-mono font-bold ${level.profit >= 0 ? 'text-neon' : 'text-red-500'}`}>
                            R$ {level.profit.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Area Chart - Investment Growth */}
          {calculations && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-amber-500" /> Crescimento do Investimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <Tooltip
                      contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                      labelStyle={{ color: "var(--foreground)" }}
                      formatter={(value: number, name: string) => {
                        const labels: Record<string, string> = {
                          totalInvested: 'Total Investido',
                          bet: 'Valor da Aposta',
                        }
                        return [`R$ ${value.toFixed(2)}`, labels[name] || name]
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="totalInvested"
                      stroke="#f59e0b"
                      fill="rgba(245, 158, 11, 0.1)"
                      strokeWidth={2}
                      name="totalInvested"
                    />
                    <Area
                      type="monotone"
                      dataKey="bet"
                      stroke={neonBlue}
                      fill={neonBlueWithAlpha(0.1)}
                      strokeWidth={2}
                      name="bet"
                    />
                  </AreaChart>
                </ResponsiveContainer>
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
                  A progressão Fibonacci cresce mais devagar que Martingale, mas ainda exige uma banca
                  significativa para níveis mais profundos. O total investido aumenta a cada nível, e sequências
                  longas de perdas podem esgotar sua banca rapidamente. Sempre defina limites de perda rigorosos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
