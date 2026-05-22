'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  HelpCircle,
  MapPin,
  Building2,
  AlertCircle,
} from 'lucide-react'
import { AdBanner } from '@/components/shared/ad-banner'

export function ContactPage() {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitError(data.error || 'Erro ao enviar mensagem.')
        toast({
          title: 'Erro ao enviar',
          description: data.error || 'Ocorreu um erro ao processar sua mensagem. Tente novamente.',
          variant: 'destructive',
        })
        return
      }

      toast({
        title: 'Mensagem enviada!',
        description: 'Recebemos sua mensagem e responderemos em até 48 horas úteis. Obrigado pelo contato!',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setSubmitError('Erro de conexão. Tente novamente mais tarde ou envie um e-mail diretamente para valdirnogueira2010@gmail.com')
      toast({
        title: 'Erro de conexão',
        description: 'Não foi possível enviar sua mensagem. Tente novamente ou envie um e-mail para valdirnogueira2010@gmail.com',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqItems = [
    {
      question: 'O BetCalc Pro é uma plataforma financeira?',
      answer:
        'Não. O BetCalc Pro é uma plataforma de ferramentas educacionais. Oferecemos calculadoras, simuladores e conteúdo educativo para o estudo de probabilidade, estatística e gestão de risco. Não aceitamos depósitos, não operamos nenhuma plataforma de transações financeiras e não processamos pagamentos de qualquer natureza.',
    },
    {
      question: 'As ferramentas garantem resultados precisos para decisões reais?',
      answer:
        'Não. Nossas ferramentas são baseadas em modelos matemáticos teóricos e servem exclusivamente como recursos educacionais. Os resultados das simulações e cálculos são estimativas baseadas em premissas teóricas e não devem ser interpretados como previsões definitivas de eventos reais. Resultados passados e simulações não garantem resultados futuros.',
    },
    {
      question: 'Posso usar o site se tenho menos de 18 anos?',
      answer:
        'Não. O uso do BetCalc Pro é estritamente proibido para menores de 18 anos. Nosso conteúdo é destinado exclusivamente a adultos que podem compreender e avaliar os conceitos de probabilidade e gestão de risco de forma responsável.',
    },
    {
      question: 'Meus dados de cálculo ficam salvos no servidor?',
      answer:
        'Não. Os cálculos são processados localmente no seu navegador. O histórico de cálculos é armazenado apenas no seu dispositivo e pode ser excluído a qualquer momento. Não armazenamos dados de cálculo em nossos servidores.',
    },
    {
      question: 'Como posso excluir meus dados pessoais?',
      answer:
        'Você pode solicitar a exclusão de seus dados pessoais enviando um e-mail para valdirnogueira2010@gmail.com com o assunto "Exclusão de dados — LGPD". O processo será concluído em até 15 dias úteis, conforme previsto na Lei Geral de Proteção de Dados.',
    },
    {
      question: 'O site é gratuito?',
      answer:
        'Sim, todas as ferramentas do BetCalc Pro são gratuitas. Mantemos o site através de publicidade (Google AdSense) para que possamos continuar oferecendo ferramentas de qualidade sem custo para o usuário.',
    },
    {
      question: 'Como reporto um erro em uma calculadora?',
      answer:
        'Se você encontrar um erro ou resultado incorreto em qualquer calculadora, entre em contato conosco pelo formulário abaixo ou pelo e-mail valdirnogueira2010@gmail.com. Iremos investigar e corrigir o problema o mais rápido possível.',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon">
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <Mail className="h-6 w-6 text-neon" />
        <h1 className="text-2xl font-bold">Contato</h1>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon/20">
              <Mail className="h-5 w-5 text-neon" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">E-mail</p>
              <a href="mailto:valdirnogueira2010@gmail.com" className="text-sm font-semibold text-foreground hover:text-neon transition-colors">
                valdirnogueira2010@gmail.com
              </a>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon/20">
              <Mail className="h-5 w-5 text-neon" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">E-mail LGPD</p>
              <a href="mailto:valdirnogueira2010@gmail.com" className="text-sm font-semibold text-neon hover:underline transition-colors">
                valdirnogueira2010@gmail.com
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
              <p className="text-xs text-muted-foreground">Horário de Atendimento</p>
              <p className="text-sm font-semibold text-foreground">Seg–Sex, 9h–18h (BRT)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon/20">
              <MessageCircle className="h-5 w-5 text-neon" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tempo de Resposta</p>
              <p className="text-sm font-semibold text-foreground">Até 48 horas úteis</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações do Projeto */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5 text-neon" /> Informações do Projeto
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 text-neon shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Responsável</p>
                  <p className="text-sm text-foreground">Valdir Nogueira — Projeto pessoal</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-neon shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Localização</p>
                  <p className="text-sm text-foreground">Brasil</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-neon shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">E-mail para Privacidade (LGPD)</p>
                  <a href="mailto:valdirnogueira2010@gmail.com" className="text-sm text-neon hover:underline">
                    valdirnogueira2010@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-neon shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Horário de Atendimento</p>
                  <p className="text-sm text-foreground">Segunda a Sexta, 9h às 18h (Horário de Brasília)</p>
                  <p className="text-xs text-muted-foreground">Sábados, Domingos e Feriados: fechado</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Send className="h-5 w-5 text-neon" /> Envie sua Mensagem
          </h2>
          <p className="text-sm text-muted-foreground">
            Preencha o formulário abaixo e entraremos em contato o mais rápido possível. Campos marcados com * são obrigatórios.
          </p>
          {submitError && (
            <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{submitError}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Nome *</Label>
                <Input
                  id="contact-name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">E-mail *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-subject">Assunto *</Label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Selecione um assunto</option>
                <option value="duvida">Dúvida sobre ferramentas</option>
                <option value="bug">Reportar erro/bug</option>
                <option value="sugestao">Sugestão de melhoria</option>
                <option value="lgpd">Solicitação LGPD (dados pessoais)</option>
                <option value="exclusao_dados">Solicitação de exclusão de dados</option>
                <option value="parceria">Parceria / Publicidade</option>
                <option value="outro">Outro assunto</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Mensagem *</Label>
              <Textarea
                id="contact-message"
                placeholder="Escreva sua mensagem aqui (mínimo 10 caracteres)..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
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
              <p className="text-xs text-muted-foreground">
                Ou envie um e-mail diretamente para{' '}
                <a href="mailto:valdirnogueira2010@gmail.com" className="text-neon underline hover:no-underline">
                  valdirnogueira2010@gmail.com
                </a>
              </p>
            </div>
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

      {/* Canais de Atendimento */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Canais de Atendimento</h2>
          <p className="text-sm text-muted-foreground">
            Além do formulário de contato, você pode nos acionar por e-mail para diferentes tipos de solicitações:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 bg-muted/30 rounded-lg space-y-1">
              <p className="font-semibold text-foreground text-sm">Dúvidas gerais e suporte</p>
              <a href="mailto:valdirnogueira2010@gmail.com" className="text-xs text-neon underline hover:no-underline">
                valdirnogueira2010@gmail.com
              </a>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg space-y-1">
              <p className="font-semibold text-foreground text-sm">Privacidade e LGPD</p>
              <a href="mailto:valdirnogueira2010@gmail.com" className="text-xs text-neon underline hover:no-underline">
                valdirnogueira2010@gmail.com
              </a>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg space-y-1">
              <p className="font-semibold text-foreground text-sm">Parcerias e publicidade</p>
              <a href="mailto:valdirnogueira2010@gmail.com?subject=Parceria%20BetCalc%20Pro" className="text-xs text-neon underline hover:no-underline">
                valdirnogueira2010@gmail.com
              </a>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg space-y-1">
              <p className="font-semibold text-foreground text-sm">Reportar erro técnico</p>
              <a href="mailto:valdirnogueira2010@gmail.com?subject=Bug%20Report%20BetCalc%20Pro" className="text-xs text-neon underline hover:no-underline">
                valdirnogueira2010@gmail.com
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <AdBanner className="mt-6" />

      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          Compromisso de resposta: até 48 horas úteis •{' '}
          <a href="mailto:valdirnogueira2010@gmail.com" className="text-neon underline hover:no-underline">valdirnogueira2010@gmail.com</a>
        </p>
        <p className="text-xs text-muted-foreground">
          Em caso de solicitações relacionadas à LGPD, o prazo de resposta é de até 15 dias úteis, conforme previsto na lei.
        </p>
      </div>
    </div>
  )
}
