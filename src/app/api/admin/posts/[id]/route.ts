import { NextRequest, NextResponse } from 'next/server'
import { PostsStore } from '@/lib/store'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return false
  const payload = await verifyToken(token)
  return !!payload
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAuth()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const { id } = await params
    const post = await PostsStore.getById(id)
    if (!post) return NextResponse.json({ error: 'Postagem não encontrada' }, { status: 404 })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar postagem' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAuth()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const { id } = await params
    const data = await request.json()
    const post = await PostsStore.update(id, data)
    if (!post) return NextResponse.json({ error: 'Postagem não encontrada' }, { status: 404 })
    return NextResponse.json(post)
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao atualizar postagem'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAuth()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const { id } = await params
    const deleted = await PostsStore.delete(id)
    if (!deleted) return NextResponse.json({ error: 'Postagem não encontrada' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao deletar postagem' }, { status: 500 })
  }
}