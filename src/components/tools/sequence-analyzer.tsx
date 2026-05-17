'use client'

import { useState, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search, BarChart3, AlertTriangle, TrendingUp, Flame, Snowflake,
  Star, Copy, Check, RotateCcw
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { useToast } from '@/hooks/use-toast'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { AdInContent } from '@/components/shared/ad-banner'

interface StreakInfo {
  outcome: string
  length: number
  startIndex: number
}

interface PatternInfo {
  pattern: string
  count: number
  percentage: number
}

export function SequenceAnalyzer() {
  const { toast } = useToast()
  const { neon } = useThemeColors()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  const [sequenceInput, setSequenceInput] = useState('')
  const [copied, setCopied] = useState(false)

  const parsedSequence = useMemo(() => {
    if (!sequenceInput.trim()) return []
    return sequenceInput
      .toUpperCase()
      .split(/[,;\s\n]+/)
      .map(s => s.trim())
      .filter(s => ['R', 'B', 'W', 'RED', 'BLACK', 'WHITE', 'V', 'P', 'BR'].includes(s))
      .map(s => {
        if (['R', 'RED', 'V'].includes(s)) return 'R'
        if (['B', 'BLACK', 'P'].includes(s)) return 'B'
        if (['W', 'WHITE', 'BR'].includes(s)) return 'W'
        return s
      })
  }, [sequenceInput])

  const analysis = useMemo(() => {
    if (parsedSequence.length === 0) return null

    // Frequency analysis
    const freq: Record<string, number> = { R: 0, B: 0, W: 0 }
    parsedSequence.forEach(s => {
      if (freq[s] !== undefined) freq[s]++
    })
    const total = parsedSequence.length
    const freqData = [
      { name: 'Vermelho (R)', short: 'R', count: freq.R, percentage: (freq.R / total) * 100, color: '#ef4444' },
      { name: 'Preto (B)', short: 'B', count: freq.B, percentage: (freq.B / total) * 100, color: '#6b7280' },
      { name: 'Branco (W)', short: 'W', count: freq.W, percentage: (freq.W / total) * 100, color: '#ffffff' },
    ].filter(d => d.count > 0)

    // Streak analysis
    const streaks: StreakInfo[] = []
    let currentStreakOutcome = parsedSequence[0]
    let currentStreakLength = 1
    let currentStreakStart = 0

    for (let i = 1; i < parsedSequence.length; i++) {
      if (parsedSequence[i] === currentStreakOutcome) {
        currentStreakLength++
      } else {
        streaks.push({
          outcome: currentStreakOutcome,
          length: currentStreakLength,
          startIndex: currentStreakStart,
        })
        currentStreakOutcome = parsedSequence[i]
        currentStreakLength = 1
        currentStreakStart = i
      }
    }
    streaks.push({
      outcome: currentStreakOutcome,
      length: currentStreakLength,
      startIndex: currentStreakStart,
    })

    // Longest streaks per outcome
    const longestStreaks: Record<string, { length: number; startIndex: number }> = {}
    streaks.forEach(streak => {
      if (!longestStreaks[streak.outcome] || streak.length > longestStreaks[streak.outcome].length) {
        longestStreaks[streak.outcome] = { length: streak.length, startIndex: streak.startIndex }
      }
    })

    // Average streak length per outcome
    const avgStreaks: Record<string, number> = {}
    Object.keys(freq).forEach(key => {
      const outcomeStreaks = streaks.filter(s => s.outcome === key)
      if (outcomeStreaks.length > 0) {
        avgStreaks[key] = outcomeStreaks.reduce((sum, s) => sum + s.length, 0) / outcomeStreaks.length
      }
    })

    // Pattern detection (2-length and 3-length patterns)
    const patterns2: Record<string, number> = {}
    const patterns3: Record<string, number> = {}

    for (let i = 0; i < parsedSequence.length - 1; i++) {
      const p2 = parsedSequence[i] + parsedSequence[i + 1]
      patterns2[p2] = (patterns2[p2] || 0) + 1
    }
    for (let i = 0; i < parsedSequence.length - 2; i++) {
      const p3 = parsedSequence[i] + parsedSequence[i + 1] + parsedSequence[i + 2]
      patterns3[p3] = (patterns3[p3] || 0) + 1
    }

    const totalPatterns2 = Object.values(patterns2).reduce((a, b) => a + b, 0)
    const totalPatterns3 = Object.values(patterns3).reduce((a, b) => a + b, 0)

    const patternData2: PatternInfo[] = Object.entries(patterns2)
      .map(([pattern, count]) => ({
        pattern,
        count,
        percentage: (count / totalPatterns2) * 100,
      }))
      .sort((a, b) => b.count - a.count)

    const patternData3: PatternInfo[] = Object.entries(patterns3)
      .map(([pattern, count]) => ({
        pattern,
        count,
        percentage: (count / totalPatterns3) * 100,
      }))
      .sort((a, b) => b.count - a.count)

    // Hot/Cold trends (last 10 vs overall)
    const last10 = parsedSequence.slice(-10)
    const last10Freq: Record<string, number> = { R: 0, B: 0, W: 0 }
    last10.forEach(s => { if (last10Freq[s] !== undefined) last10Freq[s]++ })

    const hotCold = Object.keys(freq).map(key => {
      const overallPct = freq[key] > 0 ? (freq[key] / total) * 100 : 0
      const recentPct = last10Freq[key] > 0 ? (last10Freq[key] / last10.length) * 100 : 0
      return {
        outcome: key,
        overallPct,
        recentPct,
        trend: recentPct > overallPct ? 'hot' as const : recentPct < overallPct ? 'cold' as const : 'neutral' as const,
      }
    })

    // Streak distribution for chart
    const streakDistData: Record<string, Record<number, number>> = { R: {}, B: {}, W: {} }
    streaks.forEach(streak => {
      if (!streakDistData[streak.outcome][streak.length]) {
        streakDistData[streak.outcome][streak.length] = 0
      }
      streakDistData[streak.outcome][streak.length]++
    })

    const streakChart = Object.entries(streakDistData)
      .flatMap(([outcome, dist]) =>
        Object.entries(dist).map(([length, count]) => ({
          outcome,
          length: parseInt(length),
          count,
          label: `${outcome}-streak-${length}`,
        }))
      )
      .sort((a, b) => a.length - b.length)

    return {
      freqData,
      streaks,
      longestStreaks,
      avgStreaks,
      patternData2,
      patternData3,
      hotCold,
      streakChart,
      total,
    }
  }, [parsedSequence])

  const handleAnalyze = () => {
    if (parsedSequence.length === 0) {
      toast({ title: 'Erro', description: 'Insira uma sequência válida (ex: R,B,R,R,W,B)', variant: 'destructive' })
      return
    }

    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'sequence-analyzer',
      params: { sequence: sequenceInput },
      result: {
        total: parsedSequence.length,
        freq: analysis?.freqData.map(d => ({ name: d.short, count: d.count, pct: d.percentage.toFixed(1) })),
      },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Análise Concluída!', description: `${parsedSequence.length} resultados analisados` })
  }

  const handleReset = () => {
    setSequenceInput('')
  }

  const handleCopy = () => {
    if (!analysis) return
    const text = [
      `Análise de Sequência (${analysis.total} resultados)`,
      '',
      'Frequência:',
      ...analysis.freqData.map(d => `${d.name}: ${d.count} (${d.percentage.toFixed(1)}%)`),
      '',
      'Maiores Streaks:',
      ...Object.entries(analysis.longestStreaks).map(([k, v]) =>
        `${k}: ${v.length}x (posição ${v.startIndex + 1})`
      ),
    ].join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Análise copiada para a área de transferência' })
  }

  const loadSampleSequence = () => {
    const outcomes = ['R', 'B', 'W']
    const weights = [0.486, 0.486, 0.028]
    const seq: string[] = []
    for (let i = 0; i < 50; i++) {
      const rand = Math.random()
      if (rand < weights[0]) seq.push('R')
      else if (rand < weights[0] + weights[1]) seq.push('B')
      else seq.push('W')
    }
    setSequenceInput(seq.join(','))
  }

  const fav = isFavorite('sequence-analyzer')

  const outcomeLabel: Record<string, string> = { R: 'Vermelho', B: 'Preto', W: 'Branco' }
  const outcomeColor: Record<string, string> = { R: 'text-red-500', B: 'text-gray-300', W: 'text-white' }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Search className="h-7 w-7 text-neon" />
            Analisador de <span className="gradient-neon-text">Sequência</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Analise padrões, frequências e streaks em sequências de resultados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fav ? removeFavorite('sequence-analyzer') : addFavorite('sequence-analyzer')}
            className={fav ? 'text-neon' : 'text-muted-foreground'}
          >
            <Star className={`h-4 w-4 mr-1 ${fav ? 'fill-neon' : ''}`} />
            {fav ? 'Favoritado' : 'Favoritar'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Search className="h-4 w-4 text-neon" /> Entrada de Sequência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Sequência de Resultados (separados por vírgula)</Label>
                <textarea
                  value={sequenceInput}
                  onChange={(e) => setSequenceInput(e.target.value)}
                  className="w-full h-32 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20"
                  placeholder="R,B,R,R,W,B,R,B,B,R,W,R,R,B,R..."
                />
              </div>

              <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Formatos aceitos: R/B/W ou RED/BLACK/WHITE ou V/P/BR (separados por vírgula, espaço ou quebra de linha)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handleAnalyze}
                  className="gradient-neon text-black text-sm font-bold"
                >
                  <Search className="h-3 w-3 mr-1" /> Analisar
                </Button>
                <Button onClick={handleReset} variant="outline" size="sm" className="border-border text-sm">
                  <RotateCcw className="h-3 w-3 mr-1" /> Limpar
                </Button>
              </div>

              <Button
                onClick={loadSampleSequence}
                variant="outline"
                size="sm"
                className="w-full border-border text-sm"
              >
                <BarChart3 className="h-3 w-3 mr-1" /> Carregar Exemplo (50 resultados)
              </Button>

              {parsedSequence.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  <span className="text-neon font-bold">{parsedSequence.length}</span> resultados detectados
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hot/Cold Trends */}
          {analysis && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-neon" /> Tendências Hot/Cold
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis.hotCold.map(hc => (
                  <div key={hc.outcome} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${outcomeColor[hc.outcome]}`}>
                        {outcomeLabel[hc.outcome]}
                      </span>
                      {hc.trend === 'hot' && <Flame className="h-3 w-3 text-red-500" />}
                      {hc.trend === 'cold' && <Snowflake className="h-3 w-3 text-neon-blue" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground">Geral: {hc.overallPct.toFixed(1)}%</span>
                      <span className="text-[10px] text-muted-foreground">Recente: {hc.recentPct.toFixed(1)}%</span>
                      <Badge className={`border-0 text-[8px] ${
                        hc.trend === 'hot' ? 'bg-red-500/10 text-red-500' :
                        hc.trend === 'cold' ? 'bg-neon-blue/10 text-neon-blue' :
                        'bg-muted/20 text-muted-foreground'
                      }`}>
                        {hc.trend === 'hot' ? 'HOT' : hc.trend === 'cold' ? 'COLD' : 'NEUTRO'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Copy */}
          {analysis && (
            <Button onClick={handleCopy} variant="outline" size="sm" className="w-full border-border text-sm">
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? 'Copiado!' : 'Copiar Análise'}
            </Button>
          )}
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {analysis ? (
            <Tabs defaultValue="frequency" className="w-full">
              <TabsList className="bg-muted/50 border border-border">
                <TabsTrigger value="frequency" className="text-sm">Frequência</TabsTrigger>
                <TabsTrigger value="streaks" className="text-sm">Streaks</TabsTrigger>
                <TabsTrigger value="patterns" className="text-sm">Padrões</TabsTrigger>
              </TabsList>

              <TabsContent value="frequency" className="mt-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-neon" /> Distribuição de Frequência
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={analysis.freqData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="short" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                        <Tooltip
                          contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                          labelStyle={{ color: "var(--foreground)" }}
                          formatter={(value: number, name: string) => {
                            if (name === 'count') return [value, 'Contagem']
                            return [`${value.toFixed(1)}%`, 'Porcentagem']
                          }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                          {analysis.freqData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} fillOpacity={0.8} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {analysis.freqData.map(d => (
                        <div key={d.short} className="text-center p-2 rounded-lg bg-muted/20">
                          <p className="text-xl font-black" style={{ color: d.color }}>{d.count}</p>
                          <p className="text-[10px] text-muted-foreground">{d.percentage.toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="streaks" className="mt-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-neon" /> Análise de Streaks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Longest streaks */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {Object.entries(analysis.longestStreaks).map(([outcome, info]) => (
                        <div key={outcome} className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
                          <p className={`text-sm font-bold ${outcomeColor[outcome]}`}>
                            {outcomeLabel[outcome]}
                          </p>
                          <p className="text-2xl font-black text-neon">{info.length}x</p>
                          <p className="text-[10px] text-muted-foreground">Posição: #{info.startIndex + 1}</p>
                        </div>
                      ))}
                    </div>

                    {/* Average streaks */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {Object.entries(analysis.avgStreaks).map(([outcome, avg]) => (
                        <div key={outcome} className="text-center p-2 rounded-lg bg-muted/20">
                          <p className={`text-sm font-bold ${outcomeColor[outcome]}`}>
                            {outcomeLabel[outcome]}
                          </p>
                          <p className="text-base font-bold text-neon-blue">{avg.toFixed(2)}</p>
                          <p className="text-[10px] text-muted-foreground">Média</p>
                        </div>
                      ))}
                    </div>

                    {/* Streak distribution chart */}
                    {analysis.streakChart.length > 0 && (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={analysis.streakChart}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="length" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                          <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                          <Tooltip
                            contentStyle={{ background: "var(--card)", border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                            labelStyle={{ color: "var(--foreground)" }}
                            formatter={(value: number) => [value, 'Ocorrências']}
                          />
                          <Bar dataKey="count" radius={[4, 4, 0, 0]} fill={neon} fillOpacity={0.7} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                    {/* Streak table */}
                    <div className="overflow-y-auto max-h-48 mt-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-2 font-semibold text-muted-foreground">Resultado</th>
                            <th className="text-center p-2 font-semibold text-muted-foreground">Comprimento</th>
                            <th className="text-right p-2 font-semibold text-muted-foreground">Posição</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analysis.streaks
                            .sort((a, b) => b.length - a.length)
                            .slice(0, 20)
                            .map((streak, i) => (
                              <tr key={i} className="border-b border-border/20">
                                <td className={`p-2 font-bold ${outcomeColor[streak.outcome]}`}>
                                  {outcomeLabel[streak.outcome]}
                                </td>
                                <td className="text-center p-2 font-mono text-neon">{streak.length}x</td>
                                <td className="text-right p-2 font-mono text-muted-foreground">#{streak.startIndex + 1}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="patterns" className="mt-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Search className="h-4 w-4 text-neon" /> Detecção de Padrões
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 2-length patterns */}
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Padrões de 2 Resultados</h3>
                        <div className="space-y-2">
                          {analysis.patternData2.map((p, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                              <span className="text-sm font-mono font-bold">
                                {p.pattern.split('').map((c, ci) => (
                                  <span key={ci} className={outcomeColor[c]}>{c}</span>
                                ))}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono">{p.count}x</span>
                                <Badge className="border-0 text-[8px] bg-neon/10 text-neon">
                                  {p.percentage.toFixed(1)}%
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3-length patterns */}
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Padrões de 3 Resultados</h3>
                        <div className="overflow-y-auto max-h-64">
                          <div className="space-y-2">
                            {analysis.patternData3.slice(0, 15).map((p, i) => (
                              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                                <span className="text-sm font-mono font-bold">
                                  {p.pattern.split('').map((c, ci) => (
                                    <span key={ci} className={outcomeColor[c]}>{c}</span>
                                  ))}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-mono">{p.count}x</span>
                                  <Badge className="border-0 text-[8px] bg-neon-blue/10 text-neon-blue">
                                    {p.percentage.toFixed(1)}%
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-neon/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-base">
                  Insira uma sequência de resultados e clique em <span className="text-neon font-semibold">Analisar</span>
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Exemplo: R,B,R,R,W,B,R
                </p>
              </CardContent>
            </Card>
          )}

          <AdInContent />

          {/* Warning */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-500">Aviso Importante</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  A detecção de padrões em resultados de jogos de azar é ilusória. Cada rodada é independente e
                  resultados passados não influenciam resultados futuros. Padrões identificados são apenas coincidências estatísticas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
