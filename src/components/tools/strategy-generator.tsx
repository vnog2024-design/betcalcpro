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
  Star, Copy, Check, RotateCcw, Zap, Dices
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { AdInContent } from '@/components/shared/ad-banner'

type RiskTolerance = 'low' | 'medium' | 'high'
type GameType = 'crash' | 'double' | 'other'

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
  game: GameType,
  duration: number
): StrategySuggestion[] {
  const strategies: StrategySuggestion[] = []
  const betUnit = risk === 'low' ? bankrollAmount * 0.01 : risk === 'medium' ? bankrollAmount * 0.025 : bankrollAmount * 0.05

  if (game === 'crash') {
    // Estratégia conservadora para Crash
    strategies.push({
      id: 'crash-conservative',
      name: 'Crash Conservador',
      description: 'Estratégia conservadora para Crash com auto cashout baixo e gerenciamento rigoroso',
      riskLevel: 'low',
      riskScore: 2,
      rewardScore: 3,
      progressionType: 'Flat (Aposta Fixa)',
      entryRules: [
        'Entrar apenas quando o último crash foi abaixo de 1.5x',
        'Definir auto cashout em 1.5x - 2.0x',
        'Nunca exceder 2% da banca por aposta',
        'Aguardar no mínimo 3 rodadas após um crash alto (>10x)',
      ],
      exitRules: [
        `Parar após ${Math.floor(duration * 0.75)} rodadas ou atingir meta`,
        'Parar imediatamente após 3 reds consecutivos',
        'Parar ao atingir +20% de lucro na sessão',
        'Parar ao atingir -10% de perda na sessão',
      ],
      steps: [
        { step: 1, action: 'Definir Banca', detail: `Aposta base: R$ ${betUnit.toFixed(2)} (1% da banca)` },
        { step: 2, action: 'Configurar Auto Cashout', detail: 'Auto cashout em 1.5x para maximizar taxa de acerto' },
        { step: 3, action: 'Iniciar Sessão', detail: 'Começar com aposta base e manter valor fixo' },
        { step: 4, action: 'Monitorar Streaks', detail: 'Após 3 reds, pausar 5 rodadas antes de continuar' },
        { step: 5, action: 'Encerrar Sessão', detail: 'Sair ao atingir meta de +20% ou limite de -10%' },
      ],
      expectedOutcomes: {
        bestCase: `+R$ ${(bankrollAmount * 0.20).toFixed(2)} (meta atingida em ${Math.floor(duration * 0.5)} rodadas)`,
        expectedCase: `+R$ ${(bankrollAmount * 0.05).toFixed(2)} a +R$ ${(bankrollAmount * 0.10).toFixed(2)}`,
        worstCase: `-R$ ${(bankrollAmount * 0.10).toFixed(2)} (limite de perda atingido)`,
      },
      recommendedBankroll: bankrollAmount,
      recommendedBetSize: betUnit,
      maxDrawdown: '-15% da banca',
    })

    // Estratégia moderada para Crash
    strategies.push({
      id: 'crash-moderate',
      name: 'Crash Moderado',
      description: 'Estratégia moderada com progressão leve e auto cashout intermediário',
      riskLevel: 'medium',
      riskScore: 5,
      rewardScore: 6,
      progressionType: 'Soros (Reinvestimento Parcial)',
      entryRules: [
        'Auto cashout em 2.0x - 3.0x',
        'Reinvestir 50% do lucro na próxima aposta',
        'Nunca exceder 3% da banca por aposta',
        'Entrar em qualquer rodada (sem filtro)',
      ],
      exitRules: [
        `Parar após ${duration} rodadas`,
        'Parar após 4 reds consecutivos',
        'Parar ao atingir +30% de lucro',
        'Parar ao atingir -15% de perda',
      ],
      steps: [
        { step: 1, action: 'Definir Banca', detail: `Aposta base: R$ ${(betUnit * 1.5).toFixed(2)} (2.5% da banca)` },
        { step: 2, action: 'Configurar Auto Cashout', detail: 'Auto cashout em 2.0x para equilibrar risco/recompensa' },
        { step: 3, action: 'Aplicar Soros', detail: 'Após green, apostar base + 50% do lucro' },
        { step: 4, action: 'Após Red', detail: 'Voltar à aposta base imediatamente' },
        { step: 5, action: 'Gerenciar Streaks', detail: 'Após 4 reds, reduzir aposta para 50% da base por 3 rodadas' },
        { step: 6, action: 'Encerrar Sessão', detail: 'Sair ao atingir meta de +30% ou limite de -15%' },
      ],
      expectedOutcomes: {
        bestCase: `+R$ ${(bankrollAmount * 0.30).toFixed(2)} (sessão excelente)`,
        expectedCase: `+R$ ${(bankrollAmount * 0.08).toFixed(2)} a +R$ ${(bankrollAmount * 0.15).toFixed(2)}`,
        worstCase: `-R$ ${(bankrollAmount * 0.15).toFixed(2)} (drawdown significativo)`,
      },
      recommendedBankroll: bankrollAmount,
      recommendedBetSize: betUnit * 1.5,
      maxDrawdown: '-25% da banca',
    })

    // Estratégia agressiva para Crash
    strategies.push({
      id: 'crash-aggressive',
      name: 'Crash Agressivo',
      description: 'Estratégia agressiva com progressão Martingale e auto cashout variável',
      riskLevel: 'high',
      riskScore: 8,
      rewardScore: 8,
      progressionType: 'Martingale Adaptativo',
      entryRules: [
        'Auto cashout variável: 1.5x no gale 0, 2.0x no gale 1, 2.5x no gale 2',
        'Máximo 3 gales',
        'Nunca exceder 5% da banca na aposta inicial',
        'Reservar 30% da banca como reserva',
      ],
      exitRules: [
        `Parar após ${Math.floor(duration * 0.5)} rodadas`,
        'Parar após atingir o limite de 3 gales',
        'Parar ao atingir +50% de lucro',
        'Parar ao atingir -20% de perda',
      ],
      steps: [
        { step: 1, action: 'Dividir Banca', detail: `Ativa: R$ ${(bankrollAmount * 0.7).toFixed(2)} | Reserva: R$ ${(bankrollAmount * 0.3).toFixed(2)}` },
        { step: 2, action: 'Aposta Inicial', detail: `R$ ${(betUnit * 2).toFixed(2)} com auto cashout 1.5x` },
        { step: 3, action: 'Gale 1', detail: `Dobrar aposta: R$ ${(betUnit * 4).toFixed(2)} com auto cashout 2.0x` },
        { step: 4, action: 'Gale 2', detail: `Dobrar aposta: R$ ${(betUnit * 8).toFixed(2)} com auto cashout 2.5x` },
        { step: 5, action: 'Após Green', detail: 'Voltar à aposta base inicial' },
        { step: 6, action: 'Após 3 Gales', detail: 'ABORTAR - Voltar à aposta base e recomeçar' },
        { step: 7, action: 'Encerrar Sessão', detail: 'Sair ao atingir +50% ou -20%' },
      ],
      expectedOutcomes: {
        bestCase: `+R$ ${(bankrollAmount * 0.50).toFixed(2)} (sequência favorável)`,
        expectedCase: `+R$ ${(bankrollAmount * 0.10).toFixed(2)} a +R$ ${(bankrollAmount * 0.25).toFixed(2)}`,
        worstCase: `-R$ ${(bankrollAmount * 0.20).toFixed(2)} (limite atingido com gales)`,
      },
      recommendedBankroll: bankrollAmount,
      recommendedBetSize: betUnit * 2,
      maxDrawdown: '-40% da banca',
    })
  }

  if (game === 'double') {
    // Estratégia conservadora para Double
    strategies.push({
      id: 'double-conservative',
      name: 'Double Conservador',
      description: 'Estratégia conservadora para Double com apostas fixas e gerenciamento rigoroso',
      riskLevel: 'low',
      riskScore: 2,
      rewardScore: 3,
      progressionType: 'Flat (Aposta Fixa)',
      entryRules: [
        'Apostar sempre na mesma cor (vermelho ou preto)',
        'Nunca exceder 1% da banca por aposta',
        'Aguardar 2 resultados da cor oposta antes de entrar',
        'Não apostar em branco (muito arriscado)',
      ],
      exitRules: [
        `Parar após ${Math.floor(duration * 0.75)} rodadas`,
        'Parar após 4 derrotas consecutivas',
        'Parar ao atingir +15% de lucro',
        'Parar ao atingir -8% de perda',
      ],
      steps: [
        { step: 1, action: 'Definir Cor', detail: 'Escolher Vermelho ou Preto e manter consistência' },
        { step: 2, action: 'Aguardar Entrada', detail: 'Esperar 2 resultados consecutivos da cor oposta' },
        { step: 3, action: 'Fazer Aposta', detail: `Aposta fixa: R$ ${betUnit.toFixed(2)} (1% da banca)` },
        { step: 4, action: 'Após Resultado', detail: 'Green: aguardar nova oportunidade | Red: aguardar 2 da oposta novamente' },
        { step: 5, action: 'Encerrar Sessão', detail: 'Sair ao atingir +15% ou -8%' },
      ],
      expectedOutcomes: {
        bestCase: `+R$ ${(bankrollAmount * 0.15).toFixed(2)} (meta atingida)`,
        expectedCase: `+R$ ${(bankrollAmount * 0.03).toFixed(2)} a +R$ ${(bankrollAmount * 0.08).toFixed(2)}`,
        worstCase: `-R$ ${(bankrollAmount * 0.08).toFixed(2)} (limite atingido)`,
      },
      recommendedBankroll: bankrollAmount,
      recommendedBetSize: betUnit,
      maxDrawdown: '-12% da banca',
    })

    // Estratégia moderada para Double
    strategies.push({
      id: 'double-moderate',
      name: 'Double Moderado (Fibonacci)',
      description: 'Estratégia moderada com progressão Fibonacci para recuperação controlada',
      riskLevel: 'medium',
      riskScore: 5,
      rewardScore: 6,
      progressionType: 'Fibonacci',
      entryRules: [
        'Apostar na cor escolhida com progressão Fibonacci',
        'Após vitória, recuar 2 posições na sequência',
        'Após derrota, avançar 1 posição na sequência',
        'Nunca exceder 2.5% da banca na aposta inicial',
      ],
      exitRules: [
        `Parar após ${duration} rodadas`,
        'Parar após 5 derrotas consecutivas',
        'Parar ao atingir +25% de lucro',
        'Parar ao atingir -15% de perda',
      ],
      steps: [
        { step: 1, action: 'Definir Sequência', detail: `Base: R$ ${(betUnit * 1.5).toFixed(2)} | Fib: 1,1,2,3,5,8,13` },
        { step: 2, action: 'Primeira Aposta', detail: `R$ ${(betUnit * 1.5).toFixed(2)} (Fibonacci posição 1)` },
        { step: 3, action: 'Após Vitória', detail: 'Recuar 2 posições na sequência Fibonacci' },
        { step: 4, action: 'Após Derrota', detail: 'Avançar 1 posição na sequência' },
        { step: 5, action: 'Limite de Sequência', detail: 'Se atingir posição 7, voltar ao início' },
        { step: 6, action: 'Encerrar Sessão', detail: 'Sair ao atingir +25% ou -15%' },
      ],
      expectedOutcomes: {
        bestCase: `+R$ ${(bankrollAmount * 0.25).toFixed(2)} (boa sequência de recuperação)`,
        expectedCase: `+R$ ${(bankrollAmount * 0.05).toFixed(2)} a +R$ ${(bankrollAmount * 0.12).toFixed(2)}`,
        worstCase: `-R$ ${(bankrollAmount * 0.15).toFixed(2)} (sequência desfavorável)`,
      },
      recommendedBankroll: bankrollAmount,
      recommendedBetSize: betUnit * 1.5,
      maxDrawdown: '-25% da banca',
    })

    // Estratégia agressiva para Double
    strategies.push({
      id: 'double-aggressive',
      name: 'Double Agressivo (Martingale)',
      description: 'Estratégia agressiva com progressão Martingale - alto risco, alto retorno',
      riskLevel: 'high',
      riskScore: 9,
      rewardScore: 7,
      progressionType: 'Martingale',
      entryRules: [
        'Dobrar a aposta após cada derrota',
        'Máximo 5 gales (6 apostas total)',
        'Apostar sempre na mesma cor',
        'Reservar 40% da banca como reserva de segurança',
      ],
      exitRules: [
        `Parar após ${Math.floor(duration * 0.5)} rodadas`,
        'Parar após atingir limite de 5 gales sem green',
        'Parar ao atingir +40% de lucro',
        'Parar ao atingir -20% de perda',
      ],
      steps: [
        { step: 1, action: 'Dividir Banca', detail: `Ativa: R$ ${(bankrollAmount * 0.6).toFixed(2)} | Reserva: R$ ${(bankrollAmount * 0.4).toFixed(2)}` },
        { step: 2, action: 'Aposta Base', detail: `R$ ${(betUnit * 2).toFixed(2)} na cor escolhida` },
        { step: 3, action: 'Gale 1', detail: `R$ ${(betUnit * 4).toFixed(2)} (dobro)` },
        { step: 4, action: 'Gale 2', detail: `R$ ${(betUnit * 8).toFixed(2)} (dobro)` },
        { step: 5, action: 'Gale 3', detail: `R$ ${(betUnit * 16).toFixed(2)} (dobro)` },
        { step: 6, action: 'Gale 4', detail: `R$ ${(betUnit * 32).toFixed(2)} (dobro) - RISCO EXTREMO` },
        { step: 7, action: 'Após Green', detail: 'Voltar à aposta base' },
        { step: 8, action: 'Após 5 Gales', detail: 'ABORTAR - Reiniciar da aposta base' },
      ],
      expectedOutcomes: {
        bestCase: `+R$ ${(bankrollAmount * 0.40).toFixed(2)} (sequência favorável com gales recuperados)`,
        expectedCase: `+R$ ${(bankrollAmount * 0.05).toFixed(2)} a +R$ ${(bankrollAmount * 0.20).toFixed(2)}`,
        worstCase: `-R$ ${(bankrollAmount * 0.35).toFixed(2)} (falha nos gales - prejuízo significativo)`,
      },
      recommendedBankroll: bankrollAmount,
      recommendedBetSize: betUnit * 2,
      maxDrawdown: '-50% da banca',
    })
  }

  if (game === 'other') {
    // Estratégias genéricas
    strategies.push({
      id: 'generic-conservative',
      name: 'Gestão Conservadora',
      description: 'Estratégia genérica conservadora com foco em preservação de capital',
      riskLevel: 'low',
      riskScore: 2,
      rewardScore: 3,
      progressionType: 'Flat com Meta Diária',
      entryRules: [
        'Apostar sempre 1% da banca atual',
        'Definir meta diária de +10%',
        'Não apostar após atingir a meta',
        'Respeitar horário de sessão pré-definido',
      ],
      exitRules: [
        `Sessão de ${Math.floor(duration * 0.5)} rodadas`,
        'Parar ao atingir meta de +10%',
        'Parar ao atingir -5%',
        'Parar se sentir emoção excessiva',
      ],
      steps: [
        { step: 1, action: 'Definir Meta', detail: `Meta: +R$ ${(bankrollAmount * 0.10).toFixed(2)} (10%)` },
        { step: 2, action: 'Calcular Aposta', detail: `R$ ${betUnit.toFixed(2)} (1% da banca)` },
        { step: 3, action: 'Executar Aposta', detail: 'Manter valor fixo independente do resultado' },
        { step: 4, action: 'Recalcular', detail: 'Ajustar aposta se banca mudar significativamente' },
        { step: 5, action: 'Encerrar', detail: 'Sair ao atingir meta ou limite' },
      ],
      expectedOutcomes: {
        bestCase: `+R$ ${(bankrollAmount * 0.10).toFixed(2)} (meta atingida)`,
        expectedCase: `+R$ ${(bankrollAmount * 0.02).toFixed(2)} a +R$ ${(bankrollAmount * 0.06).toFixed(2)}`,
        worstCase: `-R$ ${(bankrollAmount * 0.05).toFixed(2)} (limite atingido)`,
      },
      recommendedBankroll: bankrollAmount,
      recommendedBetSize: betUnit,
      maxDrawdown: '-8% da banca',
    })

    strategies.push({
      id: 'generic-moderate',
      name: 'Equilíbrio Soros',
      description: 'Estratégia moderada com reinvestimento parcial (Soros) e proteção de capital',
      riskLevel: 'medium',
      riskScore: 5,
      rewardScore: 6,
      progressionType: 'Soros (Reinvestimento Parcial)',
      entryRules: [
        'Apostar 2% da banca como base',
        'Após vitória: apostar base + 50% do lucro',
        'Após derrota: voltar à aposta base',
        'Nunca exceder 5% da banca em uma aposta',
      ],
      exitRules: [
        `Sessão de ${duration} rodadas`,
        'Parar após 3 derrotas consecutivas',
        'Parar ao atingir +20%',
        'Parar ao atingir -12%',
      ],
      steps: [
        { step: 1, action: 'Aposta Base', detail: `R$ ${(betUnit * 2).toFixed(2)} (2% da banca)` },
        { step: 2, action: 'Após Vitória', detail: `Aposta: base + 50% do lucro = R$ ${(betUnit * 2 * 1.5).toFixed(2)}` },
        { step: 3, action: 'Após 2 Vitórias', detail: 'Reavaliar - considerar proteger lucro' },
        { step: 4, action: 'Após Derrota', detail: 'Voltar à aposta base imediatamente' },
        { step: 5, action: 'Encerrar', detail: 'Sair ao atingir +20% ou -12%' },
      ],
      expectedOutcomes: {
        bestCase: `+R$ ${(bankrollAmount * 0.20).toFixed(2)} (compounding favorável)`,
        expectedCase: `+R$ ${(bankrollAmount * 0.05).toFixed(2)} a +R$ ${(bankrollAmount * 0.12).toFixed(2)}`,
        worstCase: `-R$ ${(bankrollAmount * 0.12).toFixed(2)} (streak desfavorável)`,
      },
      recommendedBankroll: bankrollAmount,
      recommendedBetSize: betUnit * 2,
      maxDrawdown: '-20% da banca',
    })

    strategies.push({
      id: 'generic-aggressive',
      name: 'Alta Agressividade',
      description: 'Estratégia agressiva com Martingale limitado e proteção parcial',
      riskLevel: 'high',
      riskScore: 8,
      rewardScore: 7,
      progressionType: 'Martingale Limitado (3 Gales)',
      entryRules: [
        'Aposta base: 2.5% da banca',
        'Máximo 3 gales (4 apostas)',
        'Green: voltar à base',
        'Red: dobrar até limite',
      ],
      exitRules: [
        `Sessão de ${Math.floor(duration * 0.6)} rodadas`,
        'Parar após falha nos 3 gales',
        'Parar ao atingir +35%',
        'Parar ao atingir -20%',
      ],
      steps: [
        { step: 1, action: 'Aposta Base', detail: `R$ ${(betUnit * 2.5).toFixed(2)} (2.5% da banca)` },
        { step: 2, action: 'Gale 1', detail: `R$ ${(betUnit * 5).toFixed(2)}` },
        { step: 3, action: 'Gale 2', detail: `R$ ${(betUnit * 10).toFixed(2)}` },
        { step: 4, action: 'Gale 3', detail: `R$ ${(betUnit * 20).toFixed(2)} - RISCO ALTO` },
        { step: 5, action: 'Após Green', detail: 'Voltar à aposta base' },
        { step: 6, action: 'Após 3 Gales sem Green', detail: 'ABORTAR e voltar à base' },
      ],
      expectedOutcomes: {
        bestCase: `+R$ ${(bankrollAmount * 0.35).toFixed(2)} (recuperações bem-sucedidas)`,
        expectedCase: `+R$ ${(bankrollAmount * 0.05).toFixed(2)} a +R$ ${(bankrollAmount * 0.18).toFixed(2)}`,
        worstCase: `-R$ ${(bankrollAmount * 0.25).toFixed(2)} (gales falharam)`,
      },
      recommendedBankroll: bankrollAmount,
      recommendedBetSize: betUnit * 2.5,
      maxDrawdown: '-35% da banca',
    })
  }

  // Ordenar por alinhamento risco/recompensa com a preferência do usuário
  const riskOrder: Record<RiskTolerance, number> = { low: 0, medium: 1, high: 2 }
  strategies.sort((a, b) => {
    const aDiff = Math.abs(riskOrder[a.riskLevel] - riskOrder[risk])
    const bDiff = Math.abs(riskOrder[b.riskLevel] - riskOrder[risk])
    return aDiff - bDiff
  })

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

export function StrategyGenerator() {
  const { toast } = useToast()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  const [bankroll, setBankroll] = useState('1000')
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>('medium')
  const [gameType, setGameType] = useState<GameType>('crash')
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

    const strategies = generateStrategies(bankrollAmount, riskTolerance, gameType, duration)
    setGeneratedStrategies(strategies)
    setSelectedStrategy(strategies[0]?.id || null)

    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'strategy-generator',
      params: { bankroll, riskTolerance, gameType, sessionDuration },
      result: {
        strategyCount: strategies.length,
        topStrategy: strategies[0]?.name,
      },
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Estratégias Geradas!', description: `${strategies.length} estratégias para ${gameType}` })
  }

  const handleReset = () => {
    setBankroll('1000')
    setRiskTolerance('medium')
    setGameType('crash')
    setSessionDuration('30')
    setGeneratedStrategies(null)
    setSelectedStrategy(null)
  }

  const handleCopy = () => {
    if (!generatedStrategies || !selectedStrategy) return
    const strategy = generatedStrategies.find(s => s.id === selectedStrategy)
    if (!strategy) return

    const text = [
      `Estratégia: ${strategy.name}`,
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
    toast({ title: 'Copiado!', description: 'Estratégia copiada para a área de transferência' })
  }

  const currentStrategy = useMemo(() => {
    if (!generatedStrategies || !selectedStrategy) return null
    return generatedStrategies.find(s => s.id === selectedStrategy) || null
  }, [generatedStrategies, selectedStrategy])

  const fav = isFavorite('strategy-generator')

  const gameIcons: Record<GameType, React.ReactNode> = {
    crash: <Zap className="h-4 w-4" />,
    double: <Dices className="h-4 w-4" />,
    other: <Target className="h-4 w-4" />,
  }

  const gameLabels: Record<GameType, string> = {
    crash: 'Crash',
    double: 'Double',
    other: 'Outro',
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-neon" />
            Gerador de <span className="gradient-neon-text">Estratégias</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Gere estratégias personalizadas com base no seu perfil e tipo de jogo
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
                <Label className="text-sm text-muted-foreground">Banca Disponível (R$)</Label>
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
                <Label className="text-sm text-muted-foreground">Tipo de Jogo</Label>
                <div className="grid grid-cols-3 gap-1">
                  {(['crash', 'double', 'other'] as GameType[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGameType(g)}
                      className={`px-2 py-2 rounded-lg text-[10px] font-semibold transition-all flex items-center justify-center gap-1 ${
                        gameType === g
                          ? 'bg-neon/10 text-neon border border-neon/30'
                          : 'bg-muted/30 text-muted-foreground border border-border/30 hover:border-neon/20'
                      }`}
                    >
                      {gameIcons[g]}
                      {gameLabels[g]}
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

          {/* Lista de Estratégias */}
          {generatedStrategies && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Estratégias Sugeridas</CardTitle>
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

        {/* Detalhes da Estratégia */}
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
                        <p className="text-[10px] text-muted-foreground">Aposta Recomendada</p>
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
                        {copied ? 'Copiado!' : 'Copiar Estratégia'}
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
                  Configure seu perfil e clique em <span className="text-neon font-semibold">Gerar</span> para criar estratégias personalizadas
                </p>
              </CardContent>
            </Card>
          )}

          <AdInContent />

          {/* Aviso */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-500">Jogo Responsável</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Nenhuma estratégia garante lucro em jogos de azar. As estratégias geradas são sugestões baseadas em
                  gerenciamento de risco, mas a casa sempre tem vantagem matemática. Sempre defina limites e nunca aposte
                  mais do que pode perder. Se precisar de ajuda, procure suporte profissional.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
