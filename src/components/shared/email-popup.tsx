'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { X, Mail, Gift } from 'lucide-react'

export function EmailPopup() {
  const { emailPopupShown, setEmailPopupShown } = useAppStore()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!emailPopupShown) {
      const timer = setTimeout(() => {
        setEmailPopupShown(true)
      }, 30000)
      return () => clearTimeout(timer)
    }
  }, [emailPopupShown, setEmailPopupShown])

  if (!emailPopupShown) return null

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true)
      setTimeout(() => setEmailPopupShown(false), 3000)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-neon/30 bg-card p-6 neon-glow">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => setEmailPopupShown(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-lg font-bold gradient-neon-text mb-2">Obrigado!</h3>
            <p className="text-sm text-muted-foreground">Você receberá nossas melhores dicas e estratégias.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full gradient-neon mb-3">
                <Gift className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-lg font-bold gradient-neon-text mb-1">
                Guia Gratuito de Gestão de Banca
              </h3>
              <p className="text-sm text-muted-foreground">
                Receba nosso ebook exclusivo + dicas semanais para maximizar seus lucros
              </p>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 text-sm bg-muted/50 border border-border rounded-lg focus:border-neon/50 focus:ring-1 focus:ring-neon/20"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </div>
              <Button onClick={handleSubmit} className="gradient-neon text-black font-bold hover:opacity-90">
                Quero!
              </Button>
            </div>

            <p className="text-[10px] text-muted-foreground text-center mt-3">
              Sem spam. Cancele quando quiser.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
