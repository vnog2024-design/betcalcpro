'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

const AGE_GATE_KEY = 'age-verified'

function getInitialVisibility(): boolean {
  if (typeof window === 'undefined') return false
  return !localStorage.getItem(AGE_GATE_KEY)
}

export function AgeGate() {
  const [visible, setVisible] = useState(getInitialVisibility)

  const handleVerify = useCallback(() => {
    localStorage.setItem(AGE_GATE_KEY, 'true')
    setVisible(false)
  }, [])

  const handleDeny = useCallback(() => {
    window.location.href = 'https://www.google.com'
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-2xl border border-border/60 bg-card p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="h-10 w-10 text-amber-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Verificação de Idade</h2>
          <p className="text-muted-foreground">
            Este site contém conteúdo sobre probabilidade e gestão de risco destinado a adultos.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
          <p className="text-sm text-amber-500 font-medium">
            Você tem 18 anos ou mais?
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            onClick={handleVerify}
            className="gradient-neon text-black font-bold hover:opacity-90 h-12"
          >
            Sim, tenho 18 anos ou mais
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleDeny}
            className="border-border/60 text-muted-foreground hover:bg-muted/50 h-12"
          >
            Não, sou menor de idade
          </Button>
        </div>

        <p className="text-xs text-muted-foreground/60 leading-relaxed">
          Ao confirmar, você declara ter pelo menos 18 anos e concorda com nossos{' '}
          <span className="text-muted-foreground">Termos de Uso</span> e{' '}
          <span className="text-muted-foreground">Política de Privacidade</span>.
        </p>
      </div>
    </div>
  )
}
