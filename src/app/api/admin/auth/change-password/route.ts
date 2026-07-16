import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword, verifyPassword } from '@/lib/auth'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_session')?.value
    if (!token) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { currentPassword, newPassword } = await request.json()
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Preencha todos os campos' }, { status: 400 })
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Nova senha deve ter no mínimo 6 caracteres' }, { status: 400 })
    }

    const admin = await db.admin.findUnique({ where: { username: payload.username } })
    if (!admin) return NextResponse.json({ error: 'Admin não encontrado' }, { status: 404 })

    const valid = await verifyPassword(currentPassword, admin.password)
    if (!valid) return NextResponse.json({ error: 'Senha atual incorreta' }, { status: 401 })

    const hashed = await hashPassword(newPassword)
    await db.admin.update({ where: { id: admin.id }, data: { password: hashed } })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}