import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, verifyPassword } from '@/lib/auth'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

async function requireAuth(): Promise<{ username: string } | Response> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const payload = await verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'Sessão expirada' }, { status: 401 })

  return payload
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth()
  if (auth instanceof Response) return auth

  try {
    const { currentPassword, newPassword } = await request.json()
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Preencha todos os campos' }, { status: 400 })
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Nova senha deve ter no mínimo 6 caracteres' }, { status: 400 })
    }

    // Verify current password
    const { verifyAdminLogin } = await import('@/lib/auth')
    const valid = await verifyAdminLogin(auth.username, currentPassword)
    if (!valid) {
      return NextResponse.json({ error: 'Senha atual incorreta' }, { status: 401 })
    }

    // For production: user must set ADMIN_PASSWORD_HASH env var manually with the new hash
    // We return the new hash so the user can set it in Vercel env vars
    const newHash = await hashPassword(newPassword)

    return NextResponse.json({
      success: true,
      message: 'Senha alterada. Copie o hash abaixo e defina como ADMIN_PASSWORD_HASH nas variáveis de ambiente da Vercel.',
      hash: newHash,
    })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}