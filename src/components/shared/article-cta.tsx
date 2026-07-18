'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calculator } from 'lucide-react'

interface CTALink {
  name: string
  href: string
  description: string
}

export function ArticleCTA({ links }: { links: CTALink[] }) {
  if (!links || links.length === 0) return null

  return (
    <Card className="overflow-hidden border-0 mt-8">
      <div className="h-1 gradient-neon" />
      <CardContent className="p-6 bg-gradient-to-br from-neon/5 via-transparent to-neon-blue/5 border border-neon/10 rounded-b-lg">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="h-5 w-5 text-neon" />
          <h3 className="text-lg font-bold">Experimente na Prática</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Coloque em prática o que aprendeu com nossas calculadoras gratuitas:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50 hover:border-neon/30 hover:bg-neon/5 transition-all"
            >
              <div className="flex-shrink-0 p-2 rounded-md bg-neon/10 group-hover:bg-neon/20 transition-colors">
                <ArrowRight className="h-4 w-4 text-neon" />
              </div>
              <div>
                <p className="text-sm font-semibold group-hover:text-neon transition-colors">{link.name}</p>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
