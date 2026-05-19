import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Resend } from 'resend'

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const TO_EMAIL = 'valdirnogueira2010@gmail.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de e-mail inválido.' },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'A mensagem deve ter pelo menos 10 caracteres.' },
        { status: 400 }
      )
    }

    // Subject map for display
    const subjectMap: Record<string, string> = {
      duvida: 'Dúvida sobre ferramentas',
      bug: 'Reportar erro/bug',
      sugestao: 'Sugestão de melhoria',
      lgpd: 'Solicitação LGPD (dados pessoais)',
      exclusao_dados: 'Solicitação de exclusão de dados',
      parceria: 'Parceria / Publicidade',
      outro: 'Outro assunto',
    }

    const subjectDisplay = subjectMap[subject] || subject

    // Build HTML email body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #00ff88, #00cc6a); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: #000; margin: 0; font-size: 24px;">BetCalc Pro</h1>
          <p style="color: #000; margin: 5px 0 0; font-size: 14px;">Nova mensagem do formulário de contato</p>
        </div>
        <div style="background: #1a1a2e; padding: 24px; border-radius: 0 0 8px 8px; color: #e0e0e0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #00ff88; width: 100px;">Nome:</td>
              <td style="padding: 8px 0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #00ff88;">E-mail:</td>
              <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #00ff88;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #00ff88;">Assunto:</td>
              <td style="padding: 8px 0;">${escapeHtml(subjectDisplay)}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #333; margin: 16px 0;" />
          <p style="font-weight: bold; color: #00ff88; margin-bottom: 8px;">Mensagem:</p>
          <div style="background: #0d0d1a; padding: 16px; border-radius: 6px; border: 1px solid #333; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
          <hr style="border: none; border-top: 1px solid #333; margin: 16px 0;" />
          <p style="font-size: 12px; color: #888;">Recebido em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
          <p style="font-size: 12px; color: #888;">Prazo de resposta: até 48 horas úteis${subject === 'lgpd' || subject === 'exclusao_dados' ? ' (15 dias úteis para LGPD)' : ''}</p>
        </div>
      </div>
    `

    // Try to send email via Resend
    let emailSent = false
    if (resend) {
      try {
        const { error } = await resend.emails.send({
          from: `BetCalc Pro Contato <${FROM_EMAIL}>`,
          to: [TO_EMAIL],
          replyTo: email,
          subject: `[BetCalc Pro] ${subjectDisplay} — ${escapeHtml(name)}`,
          html: htmlBody,
        })
        if (!error) {
          emailSent = true
        } else {
          console.error('Resend error:', error)
        }
      } catch (err) {
        console.error('Resend send error:', err)
      }
    }

    // Always save to database as backup
    try {
      await db.contactMessage.create({
        data: {
          name,
          email,
          subject: subjectDisplay,
          message,
          emailSent,
          createdAt: new Date(),
        },
      })
    } catch (dbErr) {
      console.error('DB save error:', dbErr)
      // If DB also fails, at least log it
      console.log('Contact form submission (fallback log):', {
        name,
        email,
        subject: subjectDisplay,
        message: message.substring(0, 200),
        emailSent,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json(
      { success: true, message: 'Mensagem recebida com sucesso. Responderemos em até 48 horas úteis.' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
