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
  Sparkles, Target, Shield, AlertTriangle, TrendingUp,
  Star, Copy, Check, RotateCcw, BarChart3, PieChart, Activity
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { AdInContent } from '@/components/shared/ad-banner'

type RiskTolerance = 'low' | 'medium' | 'high'
type ModelType = 'fixed' | 'variable' | 'adaptive'

interface StrategyStep {
  step: number
  action: string
  detail: string
}

interface StrategySuggestion {
  id: string
  name: string
  description: string
  riskLevel: RiskTolerance
  riskScore: number // 1-10
  rewardScore: number // 1-10
  progressionType: string
  entryRules: string[]
  exitRules: string[]
  steps: StrategyStep[]
  expectedOutcomes: {
    bestCase: string
    expectedCase: string
    worstCase: string
  }
  recommendedBankroll: number
  recommendedBetSize: number
  maxDrawdown: string
}

function generateStrategies(
  bankrollAmount: number,
  risk: RiskTolerance,
  modelType: ModelType,
  duration: number
): StrategySuggestion[] {
  const strategies: StrategySuggestion[] = []
  const baseUnit = risk === 'low' ? bankrollAmount * 0.01 : risk === 'medium' ? bankrollAmount * 0.025 : bankrollAmount * 0.05

  // Modelo Conservador - Flat risk management
  strategies.push({
    id: 'conservative',
    name: 'Modelo Conservador',
    description: 'Modelo de gestão de risco conservador com alocação fixa e foco em preservação de capital',
    riskLevel: 'low',
    riskScore: 2,
    rewardScore: 3,
    progressionType: 'Flat (Capital Fixo)',
    entryRules: [
      'Nunca arriscar mais que 2% do capital por operação',
      'Definir stop-loss antes de cada entrada',
      'Aguardar confirmação de cenário favorável antes de operar',
      'Manter registro detalhado de todas as operações',
    ],
    exitRules: [
      `Encerrar após ${Math.floor(duration * 0.75)} rodadas ou atingir meta`,
      'Parar imediatamente após 3 resultados desfavoráveis consecutivos',
      'Encerrar ao atingir +20% de valorização na sessão',
      'Encerrar ao atingir -10% de perda na sessão',
    ],
    steps: [
      { step: 1, action: 'Definir Capital', detail: `Valor base por operação: R$ ${baseUnit.toFixed(2)} (1% do capital)` },
      { step: 2, action: 'Configurar Stop-Loss', detail: 'Definir limite de perda máximo de 2% por operação' },
      { step: 3, action: 'Iniciar Sessão', detail: 'Começar com valor base e manter valor fixo' },
      { step: 4, action: 'Monitorar Sequências', detail: 'Após 3 resultados desfavoráveis, pausar 5 rodadas antes de continuar' },
      { step: 5, action: 'Encerrar Sessão', detail: 'Sair ao atingir meta de +20% ou limite de -10%' },
    ],
    expectedOutcomes: {
      bestCase: `+R$ ${(bankrollAmount * 0.20).toFixed(2)} (meta atingida em ${Math.floor(duration * 0.5)} rodadas)`,
      expectedCase: `+R$ ${(bankrollAmount * 0.05).toFixed(2)} a +R$ ${(bankrollAmount * 0.10).toFixed(2)}`,
      worstCase: `-R$ ${(bankrollAmount * 0.10).toFixed(2)} (limite de perda atingido)`,
    },
    recommendedBankroll: bankrollAmount,
    recommendedBetSize: baseUnit,
    maxDrawdown: '-15% do capital',
  })

  // Modelo Equilibrado - Progressive risk management
  strategies.push({
    id: 'balanced',
    name: 'Modelo Equilibrado',
    description: 'Modelo de gestão de risco progressivo com reinvestimento parcial e proteção de capital',
    riskLevel: 'medium',
    riskScore: 5,
    rewardScore: 6,
    progressionType: 'Proporcional (Capital Variável)',
    entryRules: [
      'Alocar até 3% do capital por operação',
      'Reinvestir 50% do resultado favorável na próxima operação',
      'Nunca exceder 5% do capital total em uma única entrada',
      'Manter reserva de 30% do capital para proteção',
    ],
    exitRules: [
      `Encerrar após ${duration} rodadas`,
      'Parar após 4 resultados desfavoráveis consecutivos',
      'Encerrar ao atingir +30% de valorização',
      'Encerrar ao atingir -15% de perda',
    ],
    steps: [
      { step: 1, action: 'Definir Capital', detail: `Valor base por operação: R$ ${(baseUnit * 1.5).toFixed(2)} (2.5% do capital)` },
      { step: 2, action: 'Configurar Alocação', detail: 'Definir limite de 3% por operação para equilibrar risco/recompensa' },
      { step: 3, action: 'Aplicar Proporcionalidade', detail: 'Após resultado favorável, operar com base + 50% do ganho' },
      { step: 4, action: 'Após Resultado Desfavorável', detail: 'Retornar ao valor base imediatamente' },
      { step: 5, action: 'Gerenciar Sequências', detail: 'Após 4 resultados desfavoráveis, reduzir valor para 50% da base por 3 rodadas' },
      { step: 6, action: 'Encerrar Sessão', detail: 'Sair ao atingir meta de +30% ou limite de -15%' },
    ],
    expectedOutcomes: {
      bestCase: `+R$ ${(bankrollAmount * 0.30).toFixed(2)} (sessão excelente)`,
      expectedCase: `+R$ ${(bankrollAmount * 0.08).toFixed(2)} a +R$ ${(bankrollAmount * 0.15).toFixed(2)}`,
      worstCase: `-R$ ${(bankrollAmount * 0.15).toFixed(2)} (drawdown significativo)`,
    },
    recommendedBankroll: bankrollAmount,
    recommendedBetSize: baseUnit * 1.5,
    maxDrawdown: '-25% do capital',
  })

  // Modelo Dinâmico - Adaptive risk management
  strategies.push({
    id: 'dynamic',
    name: 'Modelo Dinâmico',
    description: 'Modelo de gestão de risco adaptativo com alocação variável e proteção dinâmica de capital',
    riskLevel: 'high',
    riskScore: 8,
    rewardScore: 8,
    progressionType: 'Adaptativo (Capital Adaptativo)',
    entryRules: [
      'Valor base: até 3% do capital por operação',
      'Ajustar alocação conforme desempenho da sessão',
      'Nunca exceder 5% do capital na entrada inicial',
      'Reservar 30% do capital como reserva de segurança',
    ],
    exitRules: [
      `Encerrar após ${Math.floor(duration * 0.5)} rodadas`,
      'Parar ao atingir limite de 3 recuperações consecutivas sem sucesso',
      'Encerrar ao atingir +50% de valorização',
      'Encerrar ao atingir -20% de perda',
    ],
    steps: [
      { step: 1, action: 'Dividir Capital', detail: `Ativo: R$ ${(bankrollAmount * 0.7).toFixed(2)} | Reserva: R$ ${(bankrollAmount * 0.3).toFixed(2)}` },
      { step: 2, action: 'Entrada Inicial', detail: `R$ ${(baseUnit * 2).toFixed(2)} com stop-loss definido` },
      { step: 3, action: 'Recuperação 1', detail: `Ajustar para R$ ${(baseUnit * 3).toFixed(2)} após resultado desfavorável` },
      { step: 4, action: 'Recuperação 2', detail: `Ajustar para R$ ${(baseUnit * 4.5).toFixed(2)} - limite de segurança` },
      { step: 5, action: 'Após Resultado Favorável', detail: 'Retornar ao valor base inicial' },
      { step: 6, action: 'Após 3 Recuperações sem Sucesso', detail: 'ABORTAR - Retornar ao valor base e recomeçar' },
      { step: 7, action: 'Encerrar Sessão', detail: 'Sair ao atingir +50% ou -20%' },
    ],
    expectedOutcomes: {
      bestCase: `+R$ ${(bankrollAmount * 0.50).toFixed(2)} (sequência favorável)`,
      expectedCase: `+R$ ${(bankrollAmount * 0.10).toFixed(2)} a +R$ ${(bankrollAmount * 0.25).toFixed(2)}`,
      worstCase: `-R$ ${(bankrollAmount * 0.20).toFixed(2)} (limite atingido)`,
    },
    recommendedBankroll: bankrollAmount,
    recommendedBetSize: baseUnit * 2,
    maxDrawdown: '-40% do capital',
  })

  // Ordenar por alinhamento risco/recompensa com a preferência do usuário
  const riskOrder: Record<RiskTolerance, number> = { low: 0, medium: 1, high: 2 }
  strategies.sort((a, b) => {
    const aDiff = Math.abs(riskOrder[a.riskLevel] - riskOrder[risk])
    const bDiff = Math.abs(riskOrder[b.riskLevel] - riskOrder[risk])
    return aDiff - bDiff
  })

  // If modelType is 'fixed', prioritize conservative; 'variable', prioritize balanced; 'adaptive', prioritize dynamic
  if (modelType === 'fixed') {
    strategies.sort((a, b) => {
      const modelOrder: Record<string, number> = { conservative: 0, balanced: 1, dynamic: 2 }
      return modelOrder[a.id] - modelOrder[b.id]
    })
  } else if (modelType === 'variable') {
    strategies.sort((a, b) => {
      const modelOrder: Record<string, number> = { balanced: 0, conservative: 1, dynamic: 2 }
      return modelOrder[a.id] - modelOrder[b.id]
    })
  } else if (modelType === 'adaptive') {
    strategies.sort((a, b) => {
      const modelOrder: Record<string, number> = { dynamic: 0, balanced: 1, conservative: 2 }
      return modelOrder[a.id] - modelOrder[b.id]
    })
  }

  return strategies
}

const riskColors: Record<RiskTolerance, { bg: string; text: string; border: string }> = {
  low: { bg: 'bg-neon/10', text: 'text-neon', border: 'border-neon/30' },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/30' },
  high: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30' },
}

const riskLabels: Record<RiskTolerance, string> = {
  low: 'Baixo',
  medium: 'Médio',
  high: 'Alto',
}

const modelLabels: Record<ModelType, string> = {
  fixed: 'Capital Fixo',
  variable: 'Capital Variável',
  adaptive: 'Capital Adaptativo',
}

export function StrategyGenerator() {
  const { toast } = useToast()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  const [bankroll, setBankroll] = useState('1000')
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>('medium')
  const [modelType, setModelType] = useState<ModelType>('fixed')
  const [sessionDuration, setSessionDuration] = useState('30')

  const [generatedStrategies, setGeneratedStrategies] = useState<StrategySuggestion[] | null>(null)
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    const bankrollAmount = parseFloat(bankroll) || 0
    const duration = parseInt(sessionDuration) || 0

    if (bankrollAmount <= 0 || duration <= 0) {
      toast({ title: 'Erro', description: 'Verifique os valores inseridos', variant: 'destructive' })
      return
    }

    const strategies = generateStrategies(bankrollAmount, riskTolerance, modelType, duration)
    setGeneratedStrategies(strategies)
    setSelectedStrategy(strategies[0]?.id || null)

    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'strategy-generator',
      params: { bankroll, riskTolerance, modelType, sessionDuration },
      result: {
        strategyCount: strategies.length,
        topStrategy: strategies[0]?.name,
      },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Modelos Gerados!', description: `${strategies.length} modelos de gestão gerados` })
  }

  const handleReset = () => {
    setBankroll('1000')
    setRiskTolerance('medium')
    setModelType('fixed')
    setSessionDuration('30')
    setGeneratedStrategies(null)
    setSelectedStrategy(null)
  }

  const handleCopy = () => {
    if (!generatedStrategies || !selectedStrategy) return
    const strategy = generatedStrategies.find(s => s.id === selectedStrategy)
    if (!strategy) return

    const text = [
      `Modelo: ${strategy.name}`,
      `Risco: ${riskLabels[strategy.riskLevel]} | Progressão: ${strategy.progressionType}`,
      '',
      'Regras de Entrada:',
      ...strategy.entryRules.map((r, i) => `${i + 1}. ${r}`),
      '',
      'Regras de Saída:',
      ...strategy.exitRules.map((r, i) => `${i + 1}. ${r}`),
      '',
      'Passo a Passo:',
      ...strategy.steps.map(s => `${s.step}. ${s.action}: ${s.detail}`),
      '',
      'Cenários:',
      `Melhor: ${strategy.expectedOutcomes.bestCase}`,
      `Esperado: ${strategy.expectedOutcomes.expectedCase}`,
      `Pior: ${strategy.expectedOutcomes.worstCase}`,
    ].join('\n')

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Modelo copiado para a área de transferência' })
  }

  const currentStrategy = useMemo(() => {
    if (!generatedStrategies || !selectedStrategy) return null
    return generatedStrategies.find(s => s.id === selectedStrategy) || null
  }, [generatedStrategies, selectedStrategy])

  const fav = isFavorite('strategy-generator')

  const modelIcons: Record<ModelType, React.ReactNode> = {
    fixed: <BarChart3 className="h-4 w-4" />,
    variable: <PieChart className="h-4 w-4" />,
    adaptive: <Activity className="h-4 w-4" />,
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-neon" />
            Gerador de <span className="gradient-neon-text">Modelos de Gestão</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Gere modelos de gestão de risco personalizados com base no seu perfil
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fav ? removeFavorite('strategy-generator') : addFavorite('strategy-generator')}
            className={fav ? 'text-neon' : 'text-muted-foreground'}
          >
            <Star className={`h-4 w-4 mr-1 ${fav ? 'fill-neon' : ''}`} />
            {fav ? 'Favoritado' : 'Favoritar'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Painel de Entrada */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-neon" /> Perfil de Risco
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Capital Disponível (R$)</Label>
                <Input
                  type="number"
                  value={bankroll}
                  onChange={(e) => setBankroll(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="1"
                  step="1"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Tolerância a Risco</Label>
                <div className="grid grid-cols-3 gap-1">
                  {(['low', 'medium', 'high'] as RiskTolerance[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRiskTolerance(r)}
                      className={`px-2 py-2 rounded-lg text-[10px] font-semibold transition-all flex items-center justify-center gap-1 ${
                        riskTolerance === r
                          ? `${riskColors[r].bg} ${riskColors[r].text} border ${riskColors[r].border}`
                          : 'bg-muted/30 text-muted-foreground border border-border/30 hover:border-neon/20'
                      }`}
                    >
                      <Shield className="h-3 w-3" />
                      {riskLabels[r]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Modelo Base</Label>
                <div className="grid grid-cols-3 gap-1">
                  {(['fixed', 'variable', 'adaptive'] as ModelType[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setModelType(m)}
                      className={`px-2 py-2 rounded-lg text-[10px] font-semibold transition-all flex items-center justify-center gap-1 ${
                        modelType === m
                          ? 'bg-neon/10 text-neon border border-neon/30'
                          : 'bg-muted/30 text-muted-foreground border border-border/30 hover:border-neon/20'
                      }`}
                    >
                      {modelIcons[m]}
                      {modelLabels[m]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Duração da Sessão (rodadas)</Label>
                <Input
                  type="number"
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  className="bg-muted/50 border-border h-11"
                  min="5"
                  max="500"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleGenerate} className="gradient-neon text-black text-sm font-bold">
              <Sparkles className="h-3 w-3 mr-1" /> Gerar
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm" className="border-border text-sm">
              <RotateCcw className="h-3 w-3 mr-1" /> Resetar
            </Button>
          </div>

          {/* Lista de Modelos */}
          {generatedStrategies && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Modelos Sugeridos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {generatedStrategies.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStrategy(s.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedStrategy === s.id
                        ? `${riskColors[s.riskLevel].bg} ${riskColors[s.riskLevel].border}`
                        : 'bg-muted/10 border-border/30 hover:border-border/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold">{i + 1}. {s.name}</span>
                      <Badge className={`border-0 text-[8px] ${riskColors[s.riskLevel].bg} ${riskColors[s.riskLevel].text}`}>
                        {riskLabels[s.riskLevel]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>Risco: {s.riskScore}/10</span>
                      <span>|</span>
                      <span>Recompensa: {s.rewardScore}/10</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Detalhes do Modelo */}
        <div className="lg:col-span-2 space-y-4">
          {currentStrategy ? (
            <Tabs defaultValue="steps" className="w-full">
              <TabsList className="bg-muted/50 border border-border">
                <TabsTrigger value="steps" className="text-sm">Passo a Passo</TabsTrigger>
                <TabsTrigger value="rules" className="text-sm">Regras</TabsTrigger>
                <TabsTrigger value="outcomes" className="text-sm">Cenários</TabsTrigger>
              </TabsList>

              <TabsContent value="steps" className="mt-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-neon" /> {currentStrategy.name}
                      </CardTitle>
                      <Badge className={`border-0 text-[10px] ${riskColors[currentStrategy.riskLevel].bg} ${riskColors[currentStrategy.riskLevel].text}`}>
                        {riskLabels[currentStrategy.riskLevel]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{currentStrategy.description}</p>
                  </CardHeader>
                  <CardContent>
                    {/* Resumo Rápido */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 rounded-lg bg-muted/20">
                        <p className="text-[10px] text-muted-foreground">Progressão</p>
                        <p className="text-sm font-bold text-neon">{currentStrategy.progressionType}</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-muted/20">
                        <p className="text-[10px] text-muted-foreground">Valor Recomendado</p>
                        <p className="text-sm font-bold text-neon-blue">R$ {currentStrategy.recommendedBetSize.toFixed(2)}</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-muted/20">
                        <p className="text-[10px] text-muted-foreground">Queda Máxima</p>
                        <p className="text-sm font-bold text-red-500">{currentStrategy.maxDrawdown}</p>
                      </div>
                    </div>

                    {/* Barra Risco/Recompensa */}
                    <div className="mb-4 p-3 rounded-lg bg-muted/20 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-muted-foreground">Risco</span>
                        <span className="text-[10px] text-muted-foreground">Recompensa</span>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-3 flex-1 rounded-sm ${
                              i < currentStrategy.riskScore ? 'bg-red-500' : 'bg-muted/30'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-3 flex-1 rounded-sm ${
                              i < currentStrategy.rewardScore ? 'bg-neon' : 'bg-muted/30'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-red-500 font-bold">{currentStrategy.riskScore}/10</span>
                        <span className="text-[10px] text-neon font-bold">{currentStrategy.rewardScore}/10</span>
                      </div>
                    </div>

                    {/* Passos */}
                    <div className="space-y-3">
                      {currentStrategy.steps.map(step => (
                        <div
                          key={step.step}
                          className="flex gap-3 p-3 rounded-lg bg-muted/20 border border-border/30"
                        >
                          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neon/10 flex items-center justify-center">
                            <span className="text-[10px] font-black text-neon">{step.step}</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold">{step.action}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rules" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-neon/20 bg-neon/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-neon" /> Regras de Entrada
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentStrategy.entryRules.map((rule, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="text-neon font-bold shrink-0">{i + 1}.</span>
                            <span className="text-muted-foreground">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-500/20 bg-red-500/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" /> Regras de Saída
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentStrategy.exitRules.map((rule, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="text-red-500 font-bold shrink-0">{i + 1}.</span>
                            <span className="text-muted-foreground">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="outcomes" className="mt-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-neon" /> Cenários Esperados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-neon/5 border border-neon/20">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-neon" />
                          <span className="text-sm font-bold text-neon">Melhor Cenário</span>
                        </div>
                        <p className="text-base text-muted-foreground">{currentStrategy.expectedOutcomes.bestCase}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-neon-blue/5 border border-neon-blue/20">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-neon-blue" />
                          <span className="text-sm font-bold text-neon-blue">Cenário Esperado</span>
                        </div>
                        <p className="text-base text-muted-foreground">{currentStrategy.expectedOutcomes.expectedCase}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-sm font-bold text-red-500">Pior Cenário</span>
                        </div>
                        <p className="text-base text-muted-foreground">{currentStrategy.expectedOutcomes.worstCase}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-bold text-amber-500">Queda Máxima</span>
                        </div>
                        <p className="text-base text-muted-foreground">{currentStrategy.maxDrawdown}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button onClick={handleCopy} variant="outline" size="sm" className="w-full border-border text-sm">
                        {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                        {copied ? 'Copiado!' : 'Copiar Modelo'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-12 text-center">
                <Sparkles className="h-12 w-12 text-neon/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-base">
                  Configure seu perfil e clique em <span className="text-neon font-semibold">Gerar</span> para criar modelos de gestão personalizados
                </p>
              </CardContent>
            </Card>
          )}

          <AdInContent />

          {/* Aviso Educacional */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-500">Aviso Educacional</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Este conteúdo é exclusivamente para fins educacionais e matemáticos. Os modelos de gestão apresentados
                  não constituem aconselhamento financeiro e não garantem resultados. Sempre defina limites claros e
                  nunca arrisque mais do que pode se permitir perder. Consulte um profissional qualificado antes de
                  tomar decisões financeiras.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer AdSense */}
          <Card className="border-red-500/20 bg-red-500/5">
            <CardContent className="p-4 flex gap-3">
              <Shield className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-500">Aviso Importante</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Este aplicativo NÃO incentiva, facilita ou promove jogos de azar ou apostas. Os modelos matemáticos
                  apresentados são ferramentas educacionais de gestão de risco e capital, aplicáveis a diversos contextos
                  financeiros. Nenhum modelo garante lucro ou retorno financeiro. Utilize exclusivamente como material
                  de estudo e aprendizado.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
