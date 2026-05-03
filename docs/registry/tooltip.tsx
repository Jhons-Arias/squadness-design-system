'use client'

import { Tooltip, TooltipImageMap } from '@squadness/ui/tooltip'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { TokenTable } from '@/components/docs/TokenTable'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'full',               label: 'Completo',           level: 2 },
  { id: 'partial',            label: 'Parcial',            level: 2 },
  { id: 'image-map',          label: 'Mapa de imagen',     level: 2 },
  { id: 'image-map-single',   label: 'Una imagen',         level: 3 },
  { id: 'image-map-double',   label: 'Dos imágenes',       level: 3 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'tokens',             label: 'Design Tokens',      level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

const TOOLTIP_TOKENS = [
  { token: 'surface/accent/neutral/subtlest',  property: 'background-color', value: '#f1f5f9',             primitive: 'neutral/100',  description: 'Fondo del tooltip' },
  { token: 'border/default',                   property: 'border-color',     value: 'rgba(5,21,36,0.06)', primitive: 'neutral/200a', description: 'Borde' },
  { token: 'text/subtle',                      property: 'color',            value: '#314158',             primitive: 'neutral/700',  description: 'Texto de descripción' },
  { token: 'text/default',                     property: 'color',            value: '#020618',             primitive: 'neutral/950',  description: 'Texto principal / título' },
  { token: 'text/subtlest',                    property: 'color',            value: '#62748e',             primitive: 'neutral/500',  description: 'Texto secundario' },
]

// ── Placeholder image ─────────────────────────────────────────────────────────

// Gray gradient placeholder that simulates a map/photo thumbnail
const PLACEHOLDER_IMG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="170" height="211"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%25" stop-color="%23cbd5e1"/><stop offset="100%25" stop-color="%2394a3b8"/></linearGradient></defs><rect width="170" height="211" fill="url(%23g)"/></svg>'

// ── Code snippets ─────────────────────────────────────────────────────────────

const examplesCode = `import { Tooltip } from '@squadness/ui/tooltip'

<Tooltip
  name="Marianne Licea"
  date="Junio 12, 2026 - 10:07am"
  signedByLabel="Firmado por."
  signedByValue="Admin"
/>`

const partialCode = `// Solo nombre y fecha, sin footer
<Tooltip
  name="Carlos Méndez"
  date="Mayo 30, 2026 - 8:45am"
/>`

const imageMapSingleCode = `import { TooltipImageMap } from '@squadness/ui/tooltip'

<TooltipImageMap
  images={['/map-preview.jpg']}
  onClose={() => setOpen(false)}
/>`

const imageMapDoubleCode = `import { TooltipImageMap } from '@squadness/ui/tooltip'

// Dos imágenes side-by-side
<TooltipImageMap
  images={['/photo-front.jpg', '/photo-side.jpg']}
  onClose={() => setOpen(false)}
/>`

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

function SubSubTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h4 id={id} className="docs-subsection-title" style={{ fontSize: '0.875rem' }}>{children}</h4>
}

function Desc({ children }: { children: React.ReactNode }) {
  return <p className="docs-page-desc">{children}</p>
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function TooltipPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Tooltip</h1>
          <Desc>
            Tarjeta flotante con información contextual. Existen dos variantes: la de metadatos
            (nombre, fecha y firma) usada en el componente Card, y la de mapa de imagen que muestra
            una o dos miniaturas fotográficas con botón de cierre.
          </Desc>
        </div>

        {/* ── Ejemplos ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode}>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <Tooltip
                name="Marianne Licea"
                date="Junio 12, 2026 - 10:07am"
                signedByLabel="Firmado por."
                signedByValue="Admin"
              />
              <TooltipImageMap
                images={[PLACEHOLDER_IMG]}
                onClose={() => {}}
              />
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Apariencia ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>
              Ambas variantes comparten fondo <code>#f1f5f9</code> y borde sutil. Todas las
              secciones del tooltip de metadatos son opcionales. El tooltip de imagen admite
              una o dos fotos; el botón de cierre siempre se muestra en la esquina superior derecha.
            </Desc>
          </div>

          {/* Completo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="full">Completo</SubTitle>
            <Desc>Con nombre, fecha y sección "Firmado por." en el pie.</Desc>
            <ComponentPreview code={examplesCode}>
              <Tooltip
                name="Marianne Licea"
                date="Junio 12, 2026 - 10:07am"
                signedByLabel="Firmado por."
                signedByValue="Admin"
              />
            </ComponentPreview>
          </div>

          {/* Parcial */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="partial">Parcial</SubTitle>
            <Desc>Solo nombre y fecha cuando no hay información de firma disponible.</Desc>
            <ComponentPreview code={partialCode}>
              <Tooltip
                name="Carlos Méndez"
                date="Mayo 30, 2026 - 8:45am"
              />
            </ComponentPreview>
          </div>

          {/* Mapa de imagen */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <SubTitle id="image-map">Mapa de imagen</SubTitle>
              <Desc>
                Variante visual que muestra miniaturas de imagen con un botón de cierre y una
                flecha indicadora en la parte inferior. Útil para previsualizar fotos o capturas
                de mapa al hacer hover sobre un elemento.
              </Desc>
            </div>

            {/* Una imagen */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SubSubTitle id="image-map-single">Una imagen</SubSubTitle>
              <Desc>Una sola miniatura de 170×210 px.</Desc>
              <ComponentPreview code={imageMapSingleCode}>
                <TooltipImageMap
                  images={[PLACEHOLDER_IMG]}
                  onClose={() => {}}
                />
              </ComponentPreview>
            </div>

            {/* Dos imágenes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SubSubTitle id="image-map-double">Dos imágenes</SubSubTitle>
              <Desc>Dos miniaturas en paralelo de 170×211 px cada una.</Desc>
              <ComponentPreview code={imageMapDoubleCode}>
                <TooltipImageMap
                  images={[PLACEHOLDER_IMG, PLACEHOLDER_IMG]}
                  onClose={() => {}}
                />
              </ComponentPreview>
            </div>
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
              { label: 'shadcn/ui — Tooltip',  href: 'https://ui.shadcn.com/docs/components/tooltip' },
              { label: 'Bootstrap — Tooltip',  href: 'https://getbootstrap.com/docs/5.3/components/tooltips/' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Design Tokens ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="tokens">Design Tokens</SectionTitle>
            <Desc>Variables de Figma que controlan la apariencia visual de este componente.</Desc>
          </div>
          <TokenTable tokens={TOOLTIP_TOKENS} />
        </div>

        <Divider />

        {/* ── Guías de contenido ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para posicionar y usar el tooltip correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Usa el tooltip de metadatos en el componente Card para mostrar quién creó el ítem, cuándo y quién lo firmó',
              'Usa el tooltip de imagen cuando el elemento tenga una o dos fotos asociadas que el usuario quiera previsualizar',
              'Posiciónalo con z-index elevado (z-20 o superior) para que siempre aparezca sobre el contenido',
              'Omite la prop signedByValue si no hay información de firma — el footer desaparece automáticamente',
            ]}
            dont={[
              'No uses el tooltip de metadatos para acciones — no tiene botones ni estado interactivo',
              'No lo posiciones dentro de contenedores con overflow:hidden sin ajustar el z-index',
              'No trunces el nombre del responsable — el campo name debe mostrarse completo',
              'No uses el tooltip de imagen con más de 2 fotos — usa una galería o lightbox para colecciones mayores',
            ]}
            note="Este componente define únicamente la apariencia visual del tooltip. La lógica de posicionamiento (detectar colisiones con los bordes de pantalla, calcular offset) debe implementarse en la capa de aplicación usando Floating UI o Radix UI Tooltip."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
