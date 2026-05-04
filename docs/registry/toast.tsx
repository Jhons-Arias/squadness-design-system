'use client'

import { Toast } from '@squadness/ui/toast'
import { ToastStyles } from '@squadness/ui/toast.styles'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'default',            label: 'Default',            level: 2 },
  { id: 'success',            label: 'Success',            level: 2 },
  { id: 'warning',            label: 'Warning',            level: 2 },
  { id: 'info',               label: 'Info',               level: 2 },
  { id: 'error',              label: 'Error',              level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]


// ── Code snippets ─────────────────────────────────────────────────────────────

const examplesCode = `import { Toast } from '@squadness/ui/toast'

<Toast type="default">Operación completada.</Toast>
<Toast type="success">Los cambios fueron guardados correctamente.</Toast>
<Toast type="warning">El proceso tardará más de lo esperado.</Toast>
<Toast type="info">Hay una actualización disponible.</Toast>
<Toast type="error">No se pudo conectar con el servidor.</Toast>`

const defaultCode  = `<Toast type="default">Operación completada.</Toast>`
const successCode  = `<Toast type="success">Los cambios fueron guardados correctamente.</Toast>`
const warningCode  = `<Toast type="warning">El proceso tardará más de lo esperado.</Toast>`
const infoCode     = `<Toast type="info">Hay una actualización disponible.</Toast>`
const errorCode    = `<Toast type="error">No se pudo conectar con el servidor.</Toast>`

// ── Helpers ───────────────────────────────────────────────────────────────────

function Divider() {
  return <hr className="docs-divider" />
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="docs-section-title">{children}</h2>
}

function SubTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h3 id={id} className="docs-subsection-title">{children}</h3>
}

function Desc({ children }: { children: React.ReactNode }) {
  return <p className="docs-page-desc">{children}</p>
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function ToastPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Toast</h1>
          <Desc>
            Notificación temporal que informa al usuario sobre el resultado de una acción. Disponible
            en 5 variantes semánticas con icono correspondiente al tipo de mensaje.
          </Desc>
        </div>

        {/* ── Ejemplos ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={300} styles={ToastStyles}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Toast type="default">Operación completada.</Toast>
              <Toast type="success">Los cambios fueron guardados correctamente.</Toast>
              <Toast type="warning">El proceso tardará más de lo esperado.</Toast>
              <Toast type="info">Hay una actualización disponible.</Toast>
              <Toast type="error">No se pudo conectar con el servidor.</Toast>
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Apariencia ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>
              Cada variante usa tokens de color semánticos y un icono que refuerza visualmente el
              mensaje. El tipo default no lleva icono.
            </Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="default">Default</SubTitle>
            <Desc>Sin color semántico ni icono. Para mensajes informativos neutros.</Desc>
            <ComponentPreview code={defaultCode}>
              <Toast type="default">Operación completada.</Toast>
            </ComponentPreview>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="success">Success</SubTitle>
            <Desc>Confirma que una acción se completó satisfactoriamente.</Desc>
            <ComponentPreview code={successCode}>
              <Toast type="success">Los cambios fueron guardados correctamente.</Toast>
            </ComponentPreview>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="warning">Warning</SubTitle>
            <Desc>Alerta sobre una situación que requiere atención pero no es un error.</Desc>
            <ComponentPreview code={warningCode}>
              <Toast type="warning">El proceso tardará más de lo esperado.</Toast>
            </ComponentPreview>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="info">Info</SubTitle>
            <Desc>Comunica información útil sin implicar éxito ni fallo.</Desc>
            <ComponentPreview code={infoCode}>
              <Toast type="info">Hay una actualización disponible.</Toast>
            </ComponentPreview>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="error">Error</SubTitle>
            <Desc>Indica que una acción falló y requiere intervención del usuario.</Desc>
            <ComponentPreview code={errorCode}>
              <Toast type="error">No se pudo conectar con el servidor.</Toast>
            </ComponentPreview>
          </div>
        </div>

        <Divider />

        {/* ── Referencias ───────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="references">Referencias</SectionTitle>
            <Desc>Explora cómo otros sistemas de diseño implementan este componente.</Desc>
          </div>
          <ReferenceLinks
            links={[
              { label: 'shadcn/ui — Toast',  href: 'https://ui.shadcn.com/docs/components/toast' },
              { label: 'Bootstrap — Toast',  href: 'https://getbootstrap.com/docs/5.3/components/toasts/' },
            ]}
          />
        </div>

        <Divider />

        <Divider />

        {/* ── Guías de contenido ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para redactar y mostrar toasts correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Usa mensajes cortos y directos — el usuario debe entender el resultado en menos de 3 segundos',
              'Selecciona la variante que corresponde al resultado real: success solo cuando la acción tuvo éxito',
              'Auto-cierra el toast después de 3-5 segundos para mensajes informativos no críticos',
              'Posiciona los toasts en una esquina consistente (bottom-right o top-right) en toda la aplicación',
            ]}
            dont={[
              'No uses toast para acciones que requieren confirmación — usa un Dialog en su lugar',
              'No apiles más de 3 toasts simultáneos — satura visualmente al usuario',
              'No uses type="error" para advertencias — error implica que algo falló, no que el usuario debe tener cuidado',
              'No uses texto genérico como "Éxito" o "Error" — describe qué pasó específicamente',
            ]}
            note="Este componente define la apariencia visual del toast. La lógica de aparición, duración y animación debe implementarse en la capa de aplicación (por ejemplo con un hook useToast y un portal de React)."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
