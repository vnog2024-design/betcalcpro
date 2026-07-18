'use client'

import { useState } from 'react'
import { MessageCircle, Twitter, Send, Link2, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ShareButtonsProps {
  url: string
  title: string
  variant?: 'default' | 'compact'
}

export function ShareButtons({ url, title, variant = 'default' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}+${encodedUrl}`,
      color: 'hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/30',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-sky-500/10 hover:text-sky-500 hover:border-sky-500/30',
    },
    {
      name: 'Telegram',
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30',
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({ description: 'Link copiado!' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      toast({ description: 'Link copiado!' })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full border border-border/50 text-muted-foreground transition-all ${link.color}`}
            title={link.name}
          >
            <link.icon className="h-3.5 w-3.5" />
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          className={`p-2 rounded-full border border-border/50 text-muted-foreground transition-all hover:bg-neon/10 hover:text-neon hover:border-neon/30 ${copied ? 'bg-neon/10 text-neon border-neon/30' : ''}`}
          title="Copiar link"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground mr-1">Compartilhar:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full border border-border/50 text-muted-foreground transition-all ${link.color}`}
          title={link.name}
        >
          <link.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={handleCopyLink}
        className={`p-2 rounded-full border border-border/50 text-muted-foreground transition-all hover:bg-neon/10 hover:text-neon hover:border-neon/30 ${copied ? 'bg-neon/10 text-neon border-neon/30' : ''}`}
        title="Copiar link"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  )
}
