'use client'

import { useState } from 'react'
import { Card } from '@squadness/ui/card'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'default',            label: 'Default',            level: 2 },
  { id: 'hover',              label: 'Hover',              level: 2 },
  { id: 'selected',           label: 'Selected',           level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

// ── Sample data ───────────────────────────────────────────────────────────────

const SAMPLE_TOOLTIP = {
  name: 'Marianne Licea',
  date: 'Junio 12, 2026 - 10:07am',
  signedBy: 'Admin',
}

const CARDS = [
  { lat: '25.4995862', lng: '-100.955862', seal: '01d9-42e7-9451-a07b' },
  { lat: '25.5012340', lng: '-100.961234', seal: 'f3a1-88bc-4e02-c19d' },
  { lat: '25.4878901', lng: '-100.948901', seal: '7b4c-11e3-9d7a-2f80' },
]

// ── Code snippets ─────────────────────────────────────────────────────────────

const examplesCode = `import { Card } from '@squadness/ui/card'

const [selected, setSelected] = useState(false)

<Card
  lat="25.4995862"
  lng="-100.955862"
  seal="01d9-42e7-9451-a07b"
  selected={selected}
  onSelect={() => setSelected(s => !s)}
  tooltip={{
    name: 'Marianne Licea',
    date: 'Junio 12, 2026 - 10:07am',
    signedBy: 'Admin',
  }}
/>`

const defaultCode = `<Card
  lat="25.4995862"
  lng="-100.955862"
  seal="01d9-42e7-9451-a07b"
/>`

const hoverCode = `// El tooltip aparece automáticamente al pasar el cursor
<Card
  lat="25.4995862"
  lng="-100.955862"
  seal="01d9-42e7-9451-a07b"
  tooltip={{
    name: 'Marianne Licea',
    date: 'Junio 12, 2026 - 10:07am',
    signedBy: 'Admin',
  }}
/>`

const selectedCode = `<Card
  lat="25.4995862"
  lng="-100.955862"
  seal="01d9-42e7-9451-a07b"
  selected
  onSelect={() => setSelected(s => !s)}
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

function Desc({ children }: { children: React.ReactNode }) {
  return <p className="docs-page-desc">{children}</p>
}

function CardRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {children}
    </div>
  )
}

// ── Interactive demos ─────────────────────────────────────────────────────────

function ExampleDemo() {
  const [selected, setSelected] = useState(false)

  return (
    <CardRow>
      <Card
        lat={CARDS[0].lat}
        lng={CARDS[0].lng}
        seal={CARDS[0].seal}
        selected={selected}
        onSelect={() => setSelected(s => !s)}
        tooltip={SAMPLE_TOOLTIP}
      />
    </CardRow>
  )
}

function DefaultDemo() {
  return (
    <CardRow>
      <Card
        lat="25.4995862"
        lng="-100.955862"
        seal="01d9-42e7-9451-a07b"
      />
    </CardRow>
  )
}

function HoverDemo() {
  return (
    <CardRow>
      <Card
        lat="25.4995862"
        lng="-100.955862"
        seal="01d9-42e7-9451-a07b"
        tooltip={SAMPLE_TOOLTIP}
      />
    </CardRow>
  )
}

function SelectedDemo() {
  const [selected, setSelected] = useState(true)
  return (
    <CardRow>
      <Card
        lat="25.4995862"
        lng="-100.955862"
        seal="01d9-42e7-9451-a07b"
        selected={selected}
        onSelect={() => setSelected(s => !s)}
      />
    </CardRow>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function CardPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Card</h1>
          <Desc>
            La card muestra una unidad de contenido visual con imagen, datos de coordenadas y sello.
            Soporta selección con checkbox, estado hover con tooltip informativo, y estado activo
            con fondo y borde azul.
          </Desc>
        </div>

        {/* ── Ejemplos ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={360}>
            <ExampleDemo />
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Apariencia ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>
              La card tiene tres estados visuales: Default (fondo neutro), Hover (fondo más oscuro con
              tooltip) y Selected/Active (fondo y borde azul con checkbox marcado).
            </Desc>
          </div>

          {/* Default */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="default">Default</SubTitle>
            <Desc>
              Estado base con fondo surface/neutral/subtlest, borde sutil y checkbox sin marcar.
            </Desc>
            <ComponentPreview code={defaultCode} minHeight={360}>
              <DefaultDemo />
            </ComponentPreview>
          </div>

          {/* Hover */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="hover">Hover</SubTitle>
            <Desc>
              Al pasar el cursor el fondo se oscurece y aparece un tooltip con el nombre del responsable,
              fecha y firma. Pasa el cursor sobre la card para verlo.
            </Desc>
            <ComponentPreview code={hoverCode} minHeight={360}>
              <HoverDemo />
            </ComponentPreview>
          </div>

          {/* Selected */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="selected">Selected</SubTitle>
            <Desc>
              Al seleccionar la card el fondo cambia a surface/accent/blue/subtlest y el borde toma
              el color border/accent/blue. El checkbox aparece marcado.
            </Desc>
            <ComponentPreview code={selectedCode} minHeight={360}>
              <SelectedDemo />
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
              { label: 'shadcn/ui — Card',      href: 'https://ui.shadcn.com/docs/components/card' },
              { label: 'Material UI — Card',     href: 'https://mui.com/material-ui/react-card/' },
              { label: 'Ant Design — Card',      href: 'https://ant.design/components/card' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Guías de contenido ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para configurar y usar la card correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Usa la card en contextos de selección múltiple — combínala con un contador de seleccionados en la interfaz',
              'Proporciona siempre los tres datos (Latitud, Longitud, Sello) para mantener la consistencia visual',
              'Usa el tooltip para datos secundarios como el responsable y la fecha — evita sobrecargar la card',
              'Agrupa las cards en un grid con gap uniforme para facilitar el escaneo visual',
            ]}
            dont={[
              'No uses la card como un elemento de navegación — está diseñada para selección y visualización',
              'No omitas la prop onSelect si usas selected — sin ella el checkbox no responderá a clics',
              'No muestres más de 12 cards sin paginación — usa el componente Pagination para datasets mayores',
              'No modifiques el ancho fijo de 214px — el layout de imagen y datos está calibrado para esa dimensión',
            ]}
            note="El tooltip es opcional. Si no se pasa la prop tooltip, el hover solo cambia el color de fondo sin mostrar información adicional. Úsalo cuando haya metadatos relevantes como autor o fecha de última modificación."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
