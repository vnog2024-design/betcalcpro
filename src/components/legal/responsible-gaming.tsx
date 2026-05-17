'use client'

import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Heart, AlertTriangle, ClipboardCheck, Lightbulb, Ban, Phone, ShieldCheck, Mail } from 'lucide-react'

export function ResponsibleGaming() {
  const { setCurrentPage } = useAppStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => setCurrentPage('home')} className="text-muted-foreground hover:text-neon">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <Heart className="h-6 w-6 text-neon" />
        <h1 className="text-2xl font-bold">Jogo Responsável</h1>
      </div>

      {/* Compromisso */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Nosso Compromisso com o Jogo Responsável</h2>
            </div>
            <p>
              O <strong className="text-foreground">BetCalc Pro</strong> tem o compromisso de promover o jogo responsável e
              contribuir para que a atividade de apostas seja realizada de forma consciente e controlada. Acreditamos que
              as ferramentas educacionais que oferecemos podem ajudar apostadores a tomar decisões mais informadas e a
              gerenciar suas bancas de maneira sustentável.
            </p>
            <div className="bg-neon/10 border border-neon/30 rounded-lg p-4">
              <p>
                <strong className="text-foreground">Lembre-se:</strong> Nossas ferramentas são educacionais e não incentivam
                o jogo. Elas existem para ajudar quem já decide apostar a fazer isso de forma mais responsável e consciente.
                Se você não aposta, não há razão para começar.
              </p>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Sinais de Alerta */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Sinais de Alerta do Jogo Problemático</h2>
            </div>
            <p>
              O jogo pode se tornar um problema quando afeta negativamente sua vida financeira, emocional ou social.
              Fique atento aos seguintes sinais:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Gastar mais dinheiro do que pode perder confortavelmente;</li>
              <li>Esconder o hábito de apostar de familiares e amigos;</li>
              <li>Sentir ansiedade, irritabilidade ou inquietação quando não está apostando;</li>
              <li>Perseguir perdas — tentar recuperar o dinheiro perdido com mais apostas;</li>
              <li>Emprestar dinheiro ou vender bens para financiar apostas;</li>
              <li>Deixar de cumprir responsabilidades pessoais, profissionais ou acadêmicas por causa do jogo;</li>
              <li>Pensar frequentemente em apostas, planejando a próxima sessão;</li>
              <li>Sentir necessidade de apostar quantias cada vez maiores para sentir a mesma excitação;</li>
              <li>Ter dificuldade em parar ou controlar o impulso de apostar;</li>
              <li>Usar o jogo como fuga de problemas ou sentimentos negativos.</li>
            </ul>
            <p>
              Se você se identifica com algum destes sinais, recomendamos fortemente que procure ajuda profissional.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Autoavaliação */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Questionário de Autoavaliação</h2>
            </div>
            <p>
              Responda honestamente às perguntas abaixo. Se a resposta for &quot;sim&quot; para 3 ou mais perguntas,
              considere buscar ajuda profissional:
            </p>
            <div className="space-y-3">
              {[
                'Você já sentiu a necessidade de apostar quantias cada vez maiores de dinheiro?',
                'Você já se sentiu inquieto ou irritado quando tentou parar ou diminuir as apostas?',
                'Você já apostou para recuperar perdas anteriores (perseguir perdas)?',
                'Você já mentiu para familiares ou amigos sobre o quanto aposta ou perde?',
                'Você já comprometeu seu orçamento de gastos essenciais (aluguel, alimentação, contas) para apostar?',
                'Você já se sentido ansioso, deprimido ou com sentimento de culpa após apostar?',
              ].map((question, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon/20 text-neon text-xs font-bold">
                    {index + 1}
                  </span>
                  <p className="text-foreground">{question}</p>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Dicas */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Dicas para Apostar com Responsabilidade</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Defina um orçamento',
                  desc: 'Estabeleça um valor máximo que você pode perder sem comprometer suas finanças e nunca ultrapasse esse limite.',
                },
                {
                  title: 'Nunca persiga perdas',
                  desc: 'Aceite que perder faz parte do jogo. Tentar recuperar perdas apostando mais é um dos caminhos mais rápidos para o problema.',
                },
                {
                  title: 'Defina limites de tempo',
                  desc: 'Estabeleça um tempo máximo para suas sessões de apostas e respeite esse limite.',
                },
                {
                  title: 'Não aposte sob influência',
                  desc: 'Evite apostar quando estiver sob efeito de álcool, medicamentos ou em estados emocionais alterados.',
                },
                {
                  title: 'Trate como entretenimento',
                  desc: 'Considere as apostas como uma forma de entretenimento com custo, não como fonte de renda ou investimento.',
                },
                {
                  title: 'Faça pausas regulares',
                  desc: 'Intercale as sessões de apostas com outras atividades. Não deixe o jogo ser sua única fonte de lazer.',
                },
                {
                  title: 'Use nossas ferramentas',
                  desc: 'Aproveite nossas calculadoras para planejar sua banca e definir limites antes de começar a apostar.',
                },
                {
                  title: 'Converse com alguém',
                  desc: 'Se sentir que o jogo está saindo do controle, não hesite em conversar com alguém de confiança ou buscar ajuda profissional.',
                },
              ].map((tip, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg space-y-1">
                  <p className="font-semibold text-foreground text-sm">{tip.title}</p>
                  <p>{tip.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Autoexclusão */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-destructive shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Autoexclusão</h2>
            </div>
            <p>
              Se você sente que precisa de uma pausa do jogo, a autoexclusão é uma ferramenta importante. Consiste em
              solicitar voluntariamente a suspensão do seu acesso a plataformas de apostas por um período determinado.
            </p>
            <p>
              Embora o BetCalc Pro não seja uma plataforma de apostas, se você deseja solicitar a exclusão da sua conta
              em nosso site como parte do seu compromisso com o jogo responsável, entre em contato conosco e
              desativaremos sua conta imediatamente.
            </p>
            <p>
              Para solicitar autoexclusão de plataformas de apostas reais, procure os canais de autoexclusão oferecidos
              pelos próprios sites de apostas ou entre em contato com os órgãos reguladores.
            </p>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="font-semibold text-foreground mb-1">Solicitar autoexclusão do BetCalc Pro:</p>
              <p>
                Envie um e-mail para{' '}
                <a href="mailto:contato@betcalcpro.com" className="text-neon underline hover:no-underline">contato@betcalcpro.com</a>{' '}
                com o assunto &quot;Autoexclusão&quot;. Sua conta será desativada em até 24 horas.
              </p>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Verificação de Idade */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Política de Verificação de Idade</h2>
            </div>
            <p>
              O BetCalc Pro é destinado <strong className="text-foreground">exclusivamente a maiores de 18 anos</strong>.
              Não toleramos o acesso de menores de idade ao nosso site e adotamos as seguintes medidas:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Avisos claros de restrição etária em todo o site;</li>
              <li>Verificação de idade no processo de cadastro;</li>
              <li>Encerramento imediato de contas de menores de idade identificadas;</li>
              <li>Conteúdo educacional que reforça a importância do jogo responsável e legal.</li>
            </ul>
          </section>
        </CardContent>
      </Card>

      {/* Recursos de Ajuda */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Recursos Profissionais de Ajuda no Brasil</h2>
            </div>
            <p>
              Se você ou alguém que conhece está enfrentando problemas com jogos de azar, procure ajuda profissional.
              Aqui estão alguns recursos disponíveis no Brasil:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg space-y-1">
                <p className="font-bold text-foreground">CVV — Centro de Valorização da Vida</p>
                <p>Ligação: <strong className="text-foreground">188</strong> (24 horas, gratuito)</p>
                <p>Chat: <a href="https://www.cvv.org.br/chat" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">www.cvv.org.br/chat</a></p>
                <p className="text-xs">Apoio emocional e prevenção do suicídio. Sigilo total.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg space-y-1">
                <p className="font-bold text-foreground">Jogadores Anônimos Brasil</p>
                <p>Site: <a href="https://www.jogadoresanonimos.org.br" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">www.jogadoresanonimos.org.br</a></p>
                <p>Programa de 12 passos para dependentes de jogo.</p>
                <p className="text-xs">Reuniões presenciais e online em todo o Brasil.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg space-y-1">
                <p className="font-bold text-foreground">SAMU — Serviço de Atendimento Móvel de Urgência</p>
                <p>Ligação: <strong className="text-foreground">192</strong> (24 horas, gratuito)</p>
                <p className="text-xs">Para emergências médicas relacionadas a crises de saúde mental.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg space-y-1">
                <p className="font-bold text-foreground">CAPS — Centros de Atenção Psicossocial</p>
                <p>Unidades do SUS para atendimento em saúde mental.</p>
                <p className="text-xs">Procure o CAPS mais próximo na sua cidade. Atendimento gratuito.</p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Compromisso Educacional */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Nosso Compromisso Educacional</h2>
            </div>
            <p>
              O BetCalc Pro reafirma que suas ferramentas são de natureza exclusivamente educacional. Nosso objetivo
              é fornecer conhecimento e recursos para que apostadores possam:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Compreender os riscos matemáticos envolvidos em diferentes estratégias;</li>
              <li>Gerenciar suas bancas de forma sustentável e consciente;</li>
              <li>Simular cenários antes de aplicar estratégias com dinheiro real;</li>
              <li>Tomar decisões mais informadas baseadas em cálculos e probabilidades.</li>
            </ul>
            <p>
              Não incentivamos, promovemos ou facilitamos o jogo. Se você não aposta, não há necessidade de começar.
              Se você aposta, faça-o com responsabilidade e dentro dos seus limites.
            </p>
          </section>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground italic">
              Precisa de ajuda? Entre em contato: <a href="mailto:contato@betcalcpro.com" className="text-neon underline hover:no-underline">contato@betcalcpro.com</a>.
              Se está em crise, ligue para o CVV: 188.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
