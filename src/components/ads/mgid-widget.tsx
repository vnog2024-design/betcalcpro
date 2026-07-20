/**
 * MgidWidget — componente para renderizar um widget MGID/Adskeeper.
 *
 * O SEGREDO do MGID: o script _mgc.load deve estar IMEDIATAMENTE APÓS
 * o div data-type="_mgwidget". Não pode ficar longe no HTML.
 *
 * Este componente NÃO é 'use client' — renderiza no HTML do servidor (SSR).
 * Funciona dentro de componentes client porque o React inclui o conteúdo
 * no HTML inicial.
 */
export function MgidWidget({
  widgetId,
  className = '',
  minH = 90,
}: {
  widgetId: string
  className?: string
  minH?: number
}) {
  return (
    <div className={`mgid-ad-container ${className}`} style={{ minHeight: minH }}>
      <div data-type="_mgwidget" data-widget-id={widgetId} />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`,
        }}
      />
    </div>
  )
}