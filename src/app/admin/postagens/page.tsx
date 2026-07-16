'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminShell } from '@/components/admin/admin-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  Eye,
  EyeOff,
  Save,
  X,
} from 'lucide-react'

interface Post {
  id: string
  slug: string
  title: string
  description: string
  content: string
  category: string
  readTime: string
  iconName: string
  published: boolean
  createdAt: string
  updatedAt: string
}

const emptyPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'> = {
  slug: '',
  title: '',
  description: '',
  content: '',
  category: 'Geral',
  readTime: '5 min',
  iconName: 'BookOpen',
  published: false,
}

export default function AdminPostagensPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editPost, setEditPost] = useState<(Omit<Post, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/posts')
      if (res.ok) setPosts(await res.json())
    } catch { /* ignore */ } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadPosts() }, [loadPosts])

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  )

  const openNew = () => {
    setError('')
    setEditPost({ ...emptyPost })
  }

  const openEdit = (post: Post) => {
    setError('')
    setEditPost({
      id: post.id,
      slug: post.slug,
      title: post.title,
      description: post.description,
      content: post.content,
      category: post.category,
      readTime: post.readTime,
      iconName: post.iconName,
      published: post.published,
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleSave = async () => {
    if (!editPost || !editPost.title || !editPost.slug) {
      setError('Titulo e slug sao obrigatorios')
      return
    }
    setSaving(true)
    setError('')
    try {
      const isEdit = !!editPost.id
      const url = isEdit ? `/api/admin/posts/${editPost.id}` : '/api/admin/posts'
      const method = isEdit ? 'PUT' : 'POST'
      const { id, ...data } = editPost
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setEditPost(null)
        loadPosts()
      } else {
        const d = await res.json()
        setError(d.error || 'Erro ao salvar')
      }
    } catch {
      setError('Erro de conexao')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/admin/posts/${deleteId}`, { method: 'DELETE' })
      setDeleteId(null)
      loadPosts()
    } catch { /* ignore */ }
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Postagens</h1>
            <p className="text-gray-400 mt-1">Gerencie os artigos e postagens do site</p>
          </div>
          <Button onClick={openNew} className="bg-green-600 hover:bg-green-500 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nova Postagem
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Buscar por titulo, slug ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-4">
                  <div className="animate-pulse space-y-2">
                    <div className="h-5 w-48 bg-gray-800 rounded" />
                    <div className="h-3 w-72 bg-gray-800 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="p-8 text-center text-gray-500">
              {search ? 'Nenhuma postagem encontrada.' : 'Nenhuma postagem criada ainda.'}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((post) => (
              <Card key={post.id} className="border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-colors">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white truncate">{post.title}</h3>
                        <Badge
                          variant={post.published ? 'default' : 'secondary'}
                          className={post.published ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-800 text-gray-400'}
                        >
                          {post.published ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span>/{post.slug}</span>
                        <span>{post.category}</span>
                        <span>{post.readTime}</span>
                        <span>{new Date(post.updatedAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8" onClick={() => openEdit(post)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 h-8 w-8" onClick={() => setDeleteId(post.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!editPost} onOpenChange={(open) => !open && setEditPost(null)}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editPost?.id ? 'Editar Postagem' : 'Nova Postagem'}</DialogTitle>
          </DialogHeader>
          {error && (
            <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
          )}
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Titulo *</Label>
                <Input
                  value={editPost?.title || ''}
                  onChange={(e) => {
                    if (!editPost?.id) {
                      setEditPost({ ...editPost!, title: e.target.value, slug: generateSlug(e.target.value) })
                    } else {
                      setEditPost({ ...editPost!, title: e.target.value })
                    }
                  }}
                  placeholder="Titulo do artigo"
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Slug *</Label>
                <Input
                  value={editPost?.slug || ''}
                  onChange={(e) => setEditPost({ ...editPost!, slug: e.target.value })}
                  placeholder="url-do-artigo"
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Categoria</Label>
                <Input value={editPost?.category || ''} onChange={(e) => setEditPost({ ...editPost!, category: e.target.value })} placeholder="Geral" className="bg-gray-800/50 border-gray-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Tempo de Leitura</Label>
                <Input value={editPost?.readTime || ''} onChange={(e) => setEditPost({ ...editPost!, readTime: e.target.value })} placeholder="5 min" className="bg-gray-800/50 border-gray-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Icone (lucide)</Label>
                <Input value={editPost?.iconName || ''} onChange={(e) => setEditPost({ ...editPost!, iconName: e.target.value })} placeholder="BookOpen" className="bg-gray-800/50 border-gray-700 text-white" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">Descricao</Label>
              <Textarea value={editPost?.description || ''} onChange={(e) => setEditPost({ ...editPost!, description: e.target.value })} placeholder="Breve descricao do artigo..." rows={2} className="bg-gray-800/50 border-gray-700 text-white resize-none" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">Conteudo (HTML suportado)</Label>
              <Textarea value={editPost?.content || ''} onChange={(e) => setEditPost({ ...editPost!, content: e.target.value })} placeholder="Escreva o conteudo do artigo aqui. HTML e suportado." rows={14} className="bg-gray-800/50 border-gray-700 text-white resize-y font-mono text-sm" />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={editPost?.published || false} onCheckedChange={(checked) => setEditPost({ ...editPost!, published: checked })} />
              <Label className="text-gray-300 text-sm flex items-center gap-2">
                {editPost?.published ? (<><Eye className="w-4 h-4 text-green-400" /> Publicado</>) : (<><EyeOff className="w-4 h-4 text-gray-500" /> Rascunho</>)}
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditPost(null)} className="text-gray-400"><X className="w-4 h-4 mr-1" /> Cancelar</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-green-600 hover:bg-green-500 text-white">
              {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
              {editPost?.id ? 'Salvar Alteracoes' : 'Criar Postagem'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusao</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">Tem certeza que deseja excluir esta postagem? Esta acao nao pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-gray-400">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white">Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  )
}