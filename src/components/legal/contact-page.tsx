'use client'

import { useState } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useToast } from '@/hooks/use-toast'
import {
  ArrowLeft,
  Mail,
  Send,
  MessageCircle,
  Clock,
  Instagram,
  Twitter,
  Youtube,
  HelpCircle,
} from 'lucide-react'

export function ContactPage() {
  const { setCurrentPage } = useAppStore()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      toast({
        title: 'Mensagem enviada!',
        description: 'Recebemos sua mensagem e responderemos em até 48 horas úteis. Obrigado pelo contato!',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const faqItems = [
    {
      question: 'O BetCalc Pro é um site de apostas?',
      answer:
        'Não. O BetCalc Pro é um site de ferramentas educacionais. Oferecemos calculadoras, simuladores e conteúdo educativo para ajudar apostadores a gerenciar suas bancas de forma responsável. Não aceitamos apostas, não operamos jogos e não processamos transações financeiras de nenhum tipo.',
    },
    {
      question: 'As ferramentas garantem lucro nas apostas?',
      answer:
        'Não. Nenhuma ferramenta ou estratégia pode garantir lucros em apostas. Nossas calculadoras e simuladores são baseados em modelos matemáticos teóricos e servem apenas como auxílio educacional. Resultados passados e simulações não garantem resultados futuros.',
    },
    {
      question: 'Posso usar o site se tenho menos de 18 anos?',
      answer:
        'Não. O uso do BetCalc Pro é estritamente proibido para menores de 18 anos. Nosso conteúdo é destinado exclusivamente a adultos que podem tomar decisões informadas e responsáveis sobre apostas.',
    },
    {
      question: 'Meus dados de cálculo ficam salvos no servidor?',
      answer:
        'Não. Os cálculos são processados localmente no seu navegador. O histórico de cálculos é armazenado apenas no seu dispositivo e pode ser excluído a qualquer momento. Não armazenamos dados de cálculo em nossos servidores.',
    },
    {
      question: 'Como posso excluir minha conta e meus dados?',
      answer:
        'Você pode solicitar a exclusão da sua conta e de todos os dados associados enviando um e-mail para contato@betcalcpro.com com o assunto "Exclusão de conta". O processo será concluído em até 15 dias úteis, conforme a LGPD.',
    },
    {
      question: 'O site é gratuito?',
      answer:
        'Sim, todas as ferramentas do BetCalc Pro são gratuitas. Mantemos o site através de publicidade (Google AdSense) para que possamos continuar oferecendo ferramentas de qualidade sem custo para o usuário.',
    },
    {
      question: 'Como reporto um erro em uma calculadora?',
      answer:
        'Se você encontrar um erro ou resultado incorreto em qualquer calculadora, entre em contato conosco pelo formulário abaixo ou pelo e-mail contato@betcalcpro.com. Iremos investigar e corrigir o problema o mais rápido possível.',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => setCurrentPage('home')} className="text-muted-foreground hover:text-neon">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <Mail className="h-6 w-6 text-neon" />
        <h1 className="text-2xl font-bold">Contato</h1>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon/20">
              <Mail className="h-5 w-5 text-neon" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">E-mail</p>
              <a href="mailto:contato@betcalcpro.com" className="text-sm font-semibold text-foreground hover:text-neon transition-colors">
                contato@betcalcpro.com
              </a>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon/20">
              <Clock className="h-5 w-5 text-neon" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tempo de Resposta</p>
              <p className="text-sm font-semibold text-foreground">Até 48 horas úteis</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon/20">
              <MessageCircle className="h-5 w-5 text-neon" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Idioma</p>
              <p className="text-sm font-semibold text-foreground">Português (Brasil)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Send className="h-5 w-5 text-neon" /> Envie sua Mensagem
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Nome</Label>
                <Input
                  id="contact-name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">E-mail</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-subject">Assunto</Label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Selecione um assunto</option>
                <option value="duvida">Dúvida sobre ferramentas</option>
                <option value="bug">Reportar erro/bug</option>
                <option value="sugestao">Sugestão de melhoria</option>
                <option value="lgpd">Solicitação LGPD (dados pessoais)</option>
                <option value="autoexclusao">Autoexclusão</option>
                <option value="parceria">Parceria / Publicidade</option>
                <option value="outro">Outro assunto</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Mensagem</Label>
              <Textarea
                id="contact-message"
                placeholder="Escreva sua mensagem aqui..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" /> Enviar Mensagem
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-neon" /> Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Redes Sociais</h2>
          <p className="text-sm text-muted-foreground">
            Siga-nos nas redes sociais para novidades, dicas e atualizações sobre nossas ferramentas:
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href="https://instagram.com/betcalcpro" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href="https://twitter.com/betcalcpro" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" /> Twitter
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href="https://youtube.com/@betcalcpro" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-4 w-4" /> YouTube
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Compromisso de resposta: até 48 horas úteis •{' '}
          <a href="mailto:contato@betcalcpro.com" className="text-neon underline hover:no-underline">contato@betcalcpro.com</a>
        </p>
      </div>
    </div>
  )
}
