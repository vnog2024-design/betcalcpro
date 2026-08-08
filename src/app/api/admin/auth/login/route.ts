import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminLogin, createToken, getSessionCookieName } from '@/lib/auth'

export const runtime = 'nodejs'
export const maxDuration = 10

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: 'Usuário e senha são obrigatórios' }, { status: 400 })
    }

    const valid = await verifyAdminLogin(username, password)
    if (!valid) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
    }

    const token = await createToken(username)
    const response = NextResponse.json({
      success: true,
      username,
    })

    response.cookies.set(getSessionCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return response
  } catch (error) {
    // Log the FULL error for debugging
    console.error('[LOGIN ERROR]')
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}