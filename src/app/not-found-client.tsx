'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search, BookOpen, HelpCircle } from 'lucide-react'

export default function NotFoundClient() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-black gradient-neon-text">404</h1>
          <h2 className="text-2xl font-bold">Página Não Encontrada</h2>
          <p className="text-muted-foreground leading-relaxed">
            A página que você procura não existe ou foi movida. 
            Que tal explorar nossas ferramentas ou artigos educacionais?
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="gradient-neon text-black font-bold">
              <Home className="h-4 w-4 mr-2" />
              Página Inicial
            </Button>
          </Link>
          <Link href="/artigos">
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Artigos
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="outline">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          {[
            { label: 'Martingale', href: '/martingale' },
            { label: 'Fibonacci', href: '/fibonacci' },
            { label: 'Bankroll', href: '/bankroll' },
            { label: 'Soros', href: '/soros' },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <div className="p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-neon/10 hover:border-neon/30 transition-all cursor-pointer">
                <p className="text-sm font-medium">{tool.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
