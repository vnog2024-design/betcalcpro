import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, verifyPassword, verifyAdminLogin } from '@/lib/auth'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

// Simple DB helper for password storage (reuses store infrastructure)
const PASSWORD_KEY = 'admin_password_hash'

async function getStoredPasswordHash(): Promise<string | null> {
  try {
    const { getData } = await import('@/lib/store' as any)
    const data = await getData(PASSWORD_KEY)
    return data?.hash || null
  } catch {
    return null
  }
}

async function setStoredPasswordHash(hash: string): Promise<void> {
  try {
    const { setData } = await import('@/lib/store' as any)
    await setData(PASSWORD_KEY, { hash })
  } catch {
    // Silently fail
  }
}

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

    // Verify current password (checks env var first, then default)
    const valid = await verifyAdminLogin(auth.username, currentPassword)
    if (!valid) {
      return NextResponse.json({ error: 'Senha atual incorreta' }, { status: 401 })
    }

    // Hash new password and save to database
    const newHash = await hashPassword(newPassword)
    await setStoredPasswordHash(newHash)

    return NextResponse.json({
      success: true,
      message: 'Senha alterada com sucesso!',
    })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}