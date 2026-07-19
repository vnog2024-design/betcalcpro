/**
 * ServerHeaderCode — Server Component
 * 
 * Lê o `header_code` do store (KV/Neon/file) e injeta diretamente no <head>,
 * sem depender de fetch client-side. Isso garante que scripts de preload
 * (Adskeeper, pixels, etc.) carreguem o mais cedo possível.
 */
import { AdsStore } from '@/lib/store'

export async function ServerHeaderCode() {
  let headerCode = ''
  try {
    const ads = await AdsStore.getEnabled()
    headerCode = ads.header_code || ''
  } catch {
    // Silently fail — sem header code é o default seguro
  }

  if (!headerCode) return null

  return (
    <>
      {/* Renderiza scripts do header_code diretamente no <head> */}
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: headerCode }}
      />
    </>
  )
}