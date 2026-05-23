'use client'

import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Download, FileText, ImageIcon, ChevronDown } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ExportButtonProps {
  /** Array of row objects for CSV export */
  data: Record<string, string | number>[]
  /** Base filename without extension */
  filename: string
  /** Ref to the element to capture as image */
  targetRef?: React.RefObject<HTMLElement | null>
  /** Optional label for the button */
  label?: string
  /** Optional className */
  className?: string
  /** Optional size variant */
  size?: 'default' | 'sm' | 'lg' | 'icon'
  /** Optional variant */
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive' | 'link'
}

function exportCSV(data: Record<string, string | number>[], filename: string) {
  if (!data.length) return
  const headers = Object.keys(data[0])
  const csv = [
    headers.join(','),
    ...data.map((row) => headers.map((h) => `"${row[h]}"`).join(',')),
  ].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

async function copyElementAsImage(element: HTMLElement): Promise<boolean> {
  try {
    // Try using html2canvas if available (dynamically imported)
    const html2canvas = await import('html2canvas').then((m) => m.default).catch(() => null)

    if (html2canvas) {
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      )
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ])
        return true
      }
    }

    // Fallback: copy the text content of the element
    const text = element.innerText || element.textContent || ''
    if (text) {
      await navigator.clipboard.writeText(text)
      return true
    }

    return false
  } catch {
    // Final fallback: try to copy innerText
    try {
      const text = element.innerText || element.textContent || ''
      if (text) {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch {
      // Ignore
    }
    return false
  }
}

export function ExportButton({
  data,
  filename,
  targetRef,
  label = 'Exportar',
  className,
  size = 'sm',
  variant = 'outline',
}: ExportButtonProps) {
  const { toast } = useToast()
  const [exporting, setExporting] = useState(false)

  const handleExportCSV = useCallback(() => {
    if (!data.length) {
      toast({
        title: 'Sem dados',
        description: 'Não há dados para exportar.',
        variant: 'destructive',
      })
      return
    }
    exportCSV(data, filename)
    toast({
      title: 'CSV exportado!',
      description: `${filename}.csv baixado com sucesso.`,
    })
  }, [data, filename, toast])

  const handleCopyAsImage = useCallback(async () => {
    if (!targetRef?.current) {
      toast({
        title: 'Sem elemento',
        description: 'Não há elemento para capturar como imagem.',
        variant: 'destructive',
      })
      return
    }

    setExporting(true)
    try {
      const success = await copyElementAsImage(targetRef.current)
      if (success) {
        toast({
          title: 'Copiado!',
          description: 'Resultado copiado para a área de transferência.',
        })
      } else {
        toast({
          title: 'Erro ao copiar',
          description: 'Não foi possível copiar como imagem. Tente o formato CSV.',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Erro ao copiar',
        description: 'Ocorreu um erro inesperado. Tente o formato CSV.',
        variant: 'destructive',
      })
    } finally {
      setExporting(false)
    }
  }, [targetRef, toast])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`gap-1 border-border ${className || ''}`}
          disabled={exporting}
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{label}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportCSV} disabled={!data.length}>
          <FileText className="h-4 w-4 mr-2" />
          Exportar CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyAsImage} disabled={!targetRef?.current}>
          <ImageIcon className="h-4 w-4 mr-2" />
          Copiar como imagem
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
