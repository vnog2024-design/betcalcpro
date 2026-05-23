'use client'

import { useState, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AdInContent } from '@/components/ads/ad-unit'
import { 
  ShieldCheck, Copy, Star, RotateCcw, Info,
  Target, TrendingUp, AlertTriangle, Calculator, ArrowRight
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface HedgingResult {
  // Primary entry
  primaryOutcomeA: number
  primaryOutcomeB: number
  primaryTotal: number
  primaryProfit: number
  // Gale 1 (recovery)
  galeOutcomeA: number
  galeOutcomeB: number
  galeTotal: number
  galeProfit: number
  // Gale 2 (recovery)
  gale2OutcomeA: number
  gale2OutcomeB: number
  gale2Total: number
  gale2Profit: number
  // Meta
  targetCash: number
  entriesNeeded: number
  totalRisk: number
}

function formatCurrency(value: number): string {
  if (!isFinite(value)) return '∞'
  if (value < 0) return `-R$ ${Math.abs(value).toFixed(2)}`
  return `R$ ${value.toFixed(2)}`
}

export function HedgingCalculator() {
  const { toast } = useToast()
  const { addHistory, addFavorite, removeFavorite, isFavorite, unlockAchievement } = useAppStore()

  const [bankroll, setBankroll] = useState('100')
  const [targetPercent, setTargetPercent] = useState('10')
  const [riskPercent, setRiskPercent] = useState('1')
  const [payoutA, setPayoutA] = useState('2.0')
  const [payoutB, setPayoutB] = useState('14.0')
  const [showGale2, setShowGale2] = useState(false)
  const [copied, setCopied] = useState(false)

  const result = useMemo<HedgingResult | null>(() => {
    const bank = parseFloat(bankroll) || 0
    const target = parseFloat(targetPercent) || 0
    const risk = parseFloat(riskPercent) || 0
    const pA = parseFloat(payoutA) || 2
    const pB = parseFloat(payoutB) || 14

    if (bank <= 0 || risk <= 0 || pA <= 1 || pB <= 1) return null
    // B must pay more than A for hedging to work
    if (pB <= pA) return null

    // Target
    const targetCash = bank * (target / 100)

    // ═══════════════════════════════════════════════════════════
    // CÁLCULO DE COBERTURA (HEDGING)
    // ═══════════════════════════════════════════════════════════
    //
    // Você aposta A no Resultado A (paga pA×) e B no Resultado B (paga pB×)
    // Total investido = A + B
    //
    // Se A ganha: Lucro = pA×A - (A + B) = A(pA-1) - B
    // Se B ganha: Lucro = pB×B - (A + B) = B(pB-1) - A
    //
    // Para lucro igual nos dois casos:
    //   A(pA-1) - B = B(pB-1) - A
    //   A×pA = B×pB
    //   A/B = pB/pA    ← PROPORÇÃO CORRETA
    //
    // Exemplo: pA=2, pB=14 → A/B = 14/2 = 7 → A = 7B
    // ═══════════════════════════════════════════════════════════

    const ratio = pB / pA  // CORRETO: pB/pA (não (pB-1)/(pA-1))

    let pTotal = bank * (risk / 100)
    if (pTotal < 0.01) pTotal = 0.01

    // Distribuir o total entre A e B na proporção correta
    // A = ratio × B, Total = A + B = B(1 + ratio)
    const primaryOutcomeB = pTotal / (1 + ratio)
    const primaryOutcomeA = pTotal - primaryOutcomeB

    // Lucro líquido (descontando as duas apostas)
    // Se A ganha: pA × A - (A + B) = A(pA-1) - B
    const primaryProfit = primaryOutcomeA * (pA - 1) - primaryOutcomeB

    // ═══════════════════════════════════════════════════════════
    // GALE 1 — Recuperação após perda da entrada principal
    // ═══════════════════════════════════════════════════════════
    //
    // Perdeu pTotal. Precisa recuperar E ainda lucrar primaryProfit.
    // Nova entrada: gA no resultado A, gB no resultado B (mesma proporção)
    // Lucro se A ganha: gA(pA-1) - gB = primaryProfit + pTotal
    // gA = ratio × gB
    // ratio × gB × (pA-1) - gB = primaryProfit + pTotal
    // gB × (ratio × (pA-1) - 1) = primaryProfit + pTotal
    //
    // Para pA=2, ratio=7: gB × (7×1 - 1) = gB × 6 = primaryProfit + pTotal
    // ═══════════════════════════════════════════════════════════

    const galeDenom = ratio * (pA - 1) - 1
    if (galeDenom <= 0) return null

    const galeOutcomeB = (primaryProfit + pTotal) / galeDenom
    const galeOutcomeA = ratio * galeOutcomeB
    const galeTotal = galeOutcomeA + galeOutcomeB
    // Lucro líquido no Gale 1 = lucro da entrada - perda acumulada
    const galeProfit = galeOutcomeA * (pA - 1) - galeOutcomeB - pTotal

    // ═══════════════════════════════════════════════════════════
    // GALE 2 — Segunda recuperação
    // ═══════════════════════════════════════════════════════════

    const gale2TotalLoss = pTotal + galeTotal
    const gale2OutcomeB = (primaryProfit + gale2TotalLoss) / galeDenom
    const gale2OutcomeA = ratio * gale2OutcomeB
    const gale2Total = gale2OutcomeA + gale2OutcomeB
    const gale2Profit = gale2OutcomeA * (pA - 1) - gale2OutcomeB - gale2TotalLoss

    // Entries needed
    const entriesNeeded = primaryProfit > 0 ? Math.ceil(targetCash / primaryProfit) : Infinity

    return {
      primaryOutcomeA,
      primaryOutcomeB,
      primaryTotal: pTotal,
      primaryProfit,
      galeOutcomeA,
      galeOutcomeB,
      galeTotal,
      galeProfit,
      gale2OutcomeA,
      gale2OutcomeB,
      gale2Total,
      gale2Profit,
      targetCash,
      entriesNeeded,
      totalRisk: pTotal + galeTotal + gale2Total,
    }
  }, [bankroll, targetPercent, riskPercent, payoutA, payoutB])

  const handleCopy = () => {
    if (!result) return
    const lines = [
      `=== Calculadora de Cobertura (Hedging) ===`,
      `Banca: R$ ${bankroll} | Meta: ${targetPercent}% | Risco: ${riskPercent}%`,
      `Pagamentos: A=${payoutA}x / B=${payoutB}x`,
      ``,
      `--- Entrada Principal ---`,
      `Resultado A: ${formatCurrency(result.primaryOutcomeA)}`,
      `Resultado B: ${formatCurrency(result.primaryOutcomeB)}`,
      `Total: ${formatCurrency(result.primaryTotal)}`,
      `Lucro: ${formatCurrency(result.primaryProfit)}`,
      ``,
      `--- Gale 1 (Recuperação) ---`,
      `Resultado A: ${formatCurrency(result.galeOutcomeA)}`,
      `Resultado B: ${formatCurrency(result.galeOutcomeB)}`,
      `Total: ${formatCurrency(result.galeTotal)}`,
      `Lucro líquido: ${formatCurrency(result.galeProfit)}`,
      ``,
      `Meta: ${formatCurrency(result.targetCash)} em ~${result.entriesNeeded} entradas`,
    ]
    navigator.clipboard.writeText(lines.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: 'Copiado!', description: 'Resultados copiados para a área de transferência' })
  }

  const handleSave = () => {
    addHistory({
      id: Math.random().toString(36).substring(7),
      tool: 'hedging',
      params: { bankroll, targetPercent, riskPercent, payoutA, payoutB },
      result: result ? { profit: result.primaryProfit, entries: result.entriesNeeded } : {},
      timestamp: Date.now(),
    })
    unlockAchievement('first-calc')
    toast({ title: 'Salvo!', description: 'Cálculo salvo no histórico' })
  }

  const handleReset = () => {
    setBankroll('100')
    setTargetPercent('10')
    setRiskPercent('1')
    setPayoutA('2.0')
    setPayoutB('14.0')
    setShowGale2(false)
  }

  const fav = isFavorite('hedging')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-neon" />
            Calculadora de <span className="gradient-neon-text">Cobertura</span>
          </h1>
          <p className="text-base text-muted-foreground mt-2">
            Estratégia de hedging — cubra dois resultados simultaneamente com lucro garantido em ambos
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fav ? removeFavorite('hedging') : addFavorite('hedging')}
          className={fav ? 'text-neon' : 'text-muted-foreground'}
        >
          <Star className={`h-5 w-5 mr-1 ${fav ? 'fill-neon' : ''}`} />
          {fav ? 'Favoritado' : 'Favoritar'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Configuration */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calculator className="h-5 w-5 text-neon" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm">Capital Inicial (R$)</Label>
                <Input type="number" value={bankroll} onChange={(e) => setBankroll(e.target.value)} className="bg-muted/50 border-border text-base h-11" min="1" step="1" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Meta de Lucro (%)</Label>
                <Input type="number" value={targetPercent} onChange={(e) => setTargetPercent(e.target.value)} className="bg-muted/50 border-border text-base h-11" min="0.1" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Risco por Entrada (% do capital)</Label>
                <Input type="number" value={riskPercent} onChange={(e) => setRiskPercent(e.target.value)} className="bg-muted/50 border-border text-base h-11" min="0.1" step="0.1" />
                <p className="text-xs text-muted-foreground">Sugestão: 0.5% a 1.5% para segurança com recuperação.</p>
              </div>

              <Separator className="bg-border/50" />

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  Pagamento Resultado A
                  <Badge variant="outline" className="text-xs border-neon/30 text-neon">Principal</Badge>
                </Label>
                <Input type="number" value={payoutA} onChange={(e) => setPayoutA(e.target.value)} className="bg-muted/50 border-border text-base h-11" min="1.1" step="0.1" />
                <p className="text-xs text-muted-foreground">Multiplicador de pagamento do resultado principal</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  Pagamento Resultado B
                  <Badge variant="outline" className="text-xs border-neon-blue/30 text-neon-blue">Cobertura</Badge>
                </Label>
                <Input type="number" value={payoutB} onChange={(e) => setPayoutB(e.target.value)} className="bg-muted/50 border-border text-base h-11" min="1.1" step="0.1" />
                <p className="text-xs text-muted-foreground">Multiplicador de pagamento do resultado de cobertura</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleCopy} variant="outline" className="border-border text-sm h-10">
              {copied ? 'Copiado!' : <><Copy className="h-4 w-4 mr-2" /> Copiar</>}
            </Button>
            <Button onClick={handleSave} variant="outline" className="border-border text-sm h-10">
              Salvar
            </Button>
            <Button onClick={handleReset} variant="outline" className="border-border text-sm h-10">
              <RotateCcw className="h-4 w-4 mr-2" /> Resetar
            </Button>
            <Button
              onClick={() => setShowGale2(!showGale2)}
              variant="outline"
              className={`text-sm h-10 ${showGale2 ? 'border-neon-blue/30 text-neon-blue' : 'border-border'}`}
            >
              {showGale2 ? 'Ocultar Gale 2' : 'Mostrar Gale 2'}
            </Button>
          </div>

          {/* How it works */}
          <Card className="border-neon/10 bg-neon/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-neon" />
                <h4 className="text-sm font-semibold text-neon">Como funciona</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A <strong className="text-foreground">estratégia de cobertura (hedging)</strong> distribui o valor entre dois resultados 
                para que o lucro líquido seja <strong className="text-foreground">idêntico</strong> independente de qual acontece. 
                Se A paga {payoutA}× e B paga {payoutB}×: aposte na proporção{' '}
                <span className="text-neon font-mono">A/B = {payoutB}/{payoutA} = {(parseFloat(payoutB)/parseFloat(payoutA)).toFixed(1)}</span>. 
                O lucro desconta ambas as apostas feitas.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {result && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="border-neon/20 bg-neon/5">
                  <CardContent className="p-4 text-center">
                    <Target className="h-4 w-4 text-neon mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Meta</p>
                    <p className="text-lg font-black gradient-neon-text">{formatCurrency(result.targetCash)}</p>
                  </CardContent>
                </Card>
                <Card className="border-neon-blue/20 bg-neon-blue/5">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Lucro/Entrada</p>
                    <p className="text-lg font-black neon-text-blue">{formatCurrency(result.primaryProfit)}</p>
                  </CardContent>
                </Card>
                <Card className="border-purple-500/20 bg-purple-500/5">
                  <CardContent className="p-4 text-center">
                    <ArrowRight className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Entradas p/ Meta</p>
                    <p className="text-lg font-black text-purple-500">{isFinite(result.entriesNeeded) ? result.entriesNeeded : '∞'}</p>
                  </CardContent>
                </Card>
                <Card className="border-amber-500/20 bg-amber-500/5">
                  <CardContent className="p-4 text-center">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Risco Total</p>
                    <p className="text-lg font-black text-amber-500">{formatCurrency(showGale2 ? result.totalRisk : result.primaryTotal + result.galeTotal)}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Primary Entry */}
              <Card className="border-neon/20 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-neon" />
                    Entrada Principal
                    <Badge variant="outline" className="text-xs border-neon/30 text-neon ml-1">Hedging</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-neon/5 border border-neon/10">
                      <div>
                        <p className="text-sm font-medium">Resultado A <span className="text-xs text-muted-foreground">({payoutA}x)</span></p>
                        <p className="text-xs text-muted-foreground">Resultado principal</p>
                      </div>
                      <span className="text-lg font-bold text-neon font-mono">{formatCurrency(result.primaryOutcomeA)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-neon-blue/5 border border-neon-blue/10">
                      <div>
                        <p className="text-sm font-medium">Resultado B <span className="text-xs text-muted-foreground">({payoutB}x)</span></p>
                        <p className="text-xs text-muted-foreground">Cobertura (hedge)</p>
                      </div>
                      <span className="text-lg font-bold text-neon-blue font-mono">{formatCurrency(result.primaryOutcomeB)}</span>
                    </div>
                    <Separator className="bg-border/30" />
                    <div className="flex justify-between items-center px-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Total investido</p>
                      </div>
                      <span className="text-base font-semibold font-mono">{formatCurrency(result.primaryTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-green-500/5 border border-green-500/10">
                      <div>
                        <p className="text-sm font-medium text-green-500">Lucro líquido (independente do resultado)</p>
                      </div>
                      <span className="text-xl font-black text-green-500 font-mono">{formatCurrency(result.primaryProfit)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gale 1 */}
              <Card className="border-yellow-500/20 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                    Gale 1 — Recuperação
                    <Badge variant="outline" className="text-xs border-yellow-500/30 text-yellow-500 ml-1">Após perda</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                      <div>
                        <p className="text-sm font-medium">Resultado A <span className="text-xs text-muted-foreground">({payoutA}x)</span></p>
                      </div>
                      <span className="text-lg font-bold text-yellow-500 font-mono">{formatCurrency(result.galeOutcomeA)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                      <div>
                        <p className="text-sm font-medium">Resultado B <span className="text-xs text-muted-foreground">({payoutB}x)</span></p>
                      </div>
                      <span className="text-lg font-bold text-yellow-500 font-mono">{formatCurrency(result.galeOutcomeB)}</span>
                    </div>
                    <Separator className="bg-border/30" />
                    <div className="flex justify-between items-center px-3">
                      <p className="text-sm text-muted-foreground">Total investido (esta entrada)</p>
                      <span className="text-base font-semibold font-mono">{formatCurrency(result.galeTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center px-3">
                      <p className="text-sm text-muted-foreground">Total em risco (acumulado)</p>
                      <span className="text-base font-semibold font-mono text-amber-500">{formatCurrency(result.primaryTotal + result.galeTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-green-500/5 border border-green-500/10">
                      <p className="text-sm font-medium text-green-500">Lucro líquido se ganhar no Gale</p>
                      <span className="text-xl font-black text-green-500 font-mono">{formatCurrency(result.galeProfit)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gale 2 (optional) */}
              {showGale2 && (
                <Card className="border-red-500/20 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                      Gale 2 — Segunda Recuperação
                      <Badge variant="outline" className="text-xs border-red-500/30 text-red-500 ml-1">Alto risco</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                        <div>
                          <p className="text-sm font-medium">Resultado A <span className="text-xs text-muted-foreground">({payoutA}x)</span></p>
                        </div>
                        <span className="text-lg font-bold text-red-400 font-mono">{formatCurrency(result.gale2OutcomeA)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                        <div>
                          <p className="text-sm font-medium">Resultado B <span className="text-xs text-muted-foreground">({payoutB}x)</span></p>
                        </div>
                        <span className="text-lg font-bold text-red-400 font-mono">{formatCurrency(result.gale2OutcomeB)}</span>
                      </div>
                      <Separator className="bg-border/30" />
                      <div className="flex justify-between items-center px-3">
                        <p className="text-sm text-muted-foreground">Total investido (esta entrada)</p>
                        <span className="text-base font-semibold font-mono">{formatCurrency(result.gale2Total)}</span>
                      </div>
                      <div className="flex justify-between items-center px-3">
                        <p className="text-sm text-muted-foreground">Total em risco (acumulado)</p>
                        <span className="text-base font-semibold font-mono text-red-500">{formatCurrency(result.totalRisk)}</span>
                      </div>
                      <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-green-500/5 border border-green-500/10">
                        <p className="text-sm font-medium text-green-500">Lucro líquido se ganhar no Gale 2</p>
                        <span className="text-xl font-black text-green-500 font-mono">{formatCurrency(result.gale2Profit)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Meta Summary */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Entradas vitoriosas para atingir a meta</p>
                    <p className="text-5xl font-black gradient-neon-text">{isFinite(result.entriesNeeded) ? result.entriesNeeded : '∞'}</p>
                    <div className="flex justify-center gap-6 text-sm">
                      <span className="text-muted-foreground">Meta: <span className="text-neon font-bold">{formatCurrency(result.targetCash)}</span></span>
                      <span className="text-muted-foreground">Lucro/entrada: <span className="text-green-500 font-bold">{formatCurrency(result.primaryProfit)}</span></span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ad */}
              <AdInContent />

              {/* Warning */}
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardContent className="p-4 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      <strong className="text-foreground">Aviso educacional:</strong> Esta calculadora demonstra o conceito matemático de{' '}
                      <strong className="text-foreground">hedging (cobertura)</strong>, amplamente utilizado em finanças e seguros. 
                      Os resultados são meramente ilustrativos.
                    </p>
                    <p>
                      A estratégia de recuperação (gale) pode gerar perdas acumuladas significativas. 
                      Sempre utilize gestão de risco responsável.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!result && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-8 text-center">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">Configure os parâmetros</p>
                <p className="text-sm text-muted-foreground">Ajuste os valores ao lado para ver o cálculo de cobertura</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
