'use client'

import { Badge, BadgeStyles } from '@squadness/ui/badge'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { TokenTable } from '@/components/docs/TokenTable'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'variants',           label: 'Variantes',          level: 2 },
  { id: 'sizes',              label: 'Tamaños',            level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'tokens',             label: 'Design Tokens',      level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

const BADGE_TOKENS = [
  { token: 'surface/accent/neutral/subtler',   property: 'background-color', value: '#e2e8f0', primitive: 'neutral/200', description: 'Neutral — fondo' },
  { token: 'border/subtle',                    property: 'border-color',     value: 'rgba(11,18,14,0.14)', primitive: 'neutral/300a', description: 'Neutral — borde' },
  { token: 'text/accent/neutral',              property: 'color',            value: '#1d293d', primitive: 'neutral/800', description: 'Neutral — texto' },
  { token: 'surface/semantic/success/subtlest',property: 'background-color', value: '#ecfcca', primitive: 'lime/100',    description: 'Success — fondo' },
  { token: 'border/semantic/success',          property: 'border-color',     value: '#5ea500', primitive: 'lime/600',    description: 'Success — borde' },
  { token: 'text/semantic/success',            property: 'color',            value: '#3c6300', primitive: 'lime/800',    description: 'Success — texto' },
  { token: 'surface/semantic/warning/subtlest',property: 'background-color', value: '#ffedd4', primitive: 'orange/100',  description: 'Warning — fondo' },
  { token: 'border/semantic/warning',          property: 'border-color',     value: '#f54a00', primitive: 'orange/600',  description: 'Warning — borde' },
  { token: 'text/semantic/warning',            property: 'color',            value: '#9f2d00', primitive: 'orange/800',  description: 'Warning — texto' },
  { token: 'surface/semantic/error/subtlest',  property: 'background-color', value: '#fedede', primitive: 'red/100',     description: 'Error — fondo' },
  { token: 'border/semantic/error',            property: 'border-color',     value: '#cf121f', primitive: 'red/600',     description: 'Error — borde' },
  { token: 'text/semantic/error',              property: 'color',            value: '#6f040c', primitive: 'red/800',     description: 'Error — texto' },
  { token: 'surface/semantic/info/subtlest',   property: 'background-color', value: '#ccf1ff', primitive: 'sky/100',     description: 'Info — fondo' },
  { token: 'border/semantic/info',             property: 'border-color',     value: '#0095cc', primitive: 'sky/600',     description: 'Info — borde' },
  { token: 'text/semantic/info',               property: 'color',            value: '#004a66', primitive: 'sky/800',     description: 'Info — texto' },
  { token: 'surface/accent/blue/bolder',       property: 'background-color', value: '#005fdb', primitive: 'blue/700',    description: 'Brand — fondo' },
  { token: 'text/accent/blue',                 property: 'color',            value: '#0047a3', primitive: 'blue/800',    description: 'Brand — texto' },
]

// ── Code snippets ─────────────────────────────────────────────────────────────

const examplesCode = `import { Badge } from '@squadness/ui/badge'

<Badge variant="neutral">Neutral</Badge>
<Badge variant="success">Activo</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="indigo">Indigo</Badge>`

const sizesCode = `<Badge variant="success" size="sm">Activo</Badge>
<Badge variant="success" size="md">Activo</Badge>`

const dotCode = `<Badge variant="success" dot>Activo</Badge>
<Badge variant="error" dot>Error</Badge>
<Badge variant="warning" dot>Pendiente</Badge>`

const removableCode = `<Badge variant="neutral" removable onRemove={() => remove(id)}>Etiqueta</Badge>`

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

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {children}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function BadgePage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Badge</h1>
          <Desc>
            Etiqueta visual para indicar estado, categoría o prioridad. Disponible en 7 variantes
            semánticas y dos tamaños. Se utiliza también dentro de las filas de la tabla para
            representar el estado de cada ítem.
          </Desc>
        </div>

        {/* ── Ejemplos ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} styles={BadgeStyles}>
            <Row>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="success">Activo</Badge>
              <Badge variant="warning">Pendiente</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="brand">Brand</Badge>
              <Badge variant="indigo">Indigo</Badge>
            </Row>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Apariencia ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>
              Cada variante usa tokens de color semánticos del design system. El tamaño
              predeterminado es md (22px de alto); sm reduce la altura a 18px.
            </Desc>
          </div>

          {/* Variantes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="variants">Variantes</SubTitle>
            <Desc>Las 7 variantes cubren estados semánticos y etiquetas de categoría.</Desc>
            <ComponentPreview code={examplesCode}>
              <Row>
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="success">Activo</Badge>
                <Badge variant="warning">Pendiente</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="brand">Brand</Badge>
                <Badge variant="indigo">Indigo</Badge>
              </Row>
            </ComponentPreview>
          </div>

          {/* Tamaños */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="sizes">Tamaños</SubTitle>
            <Desc>sm (18px) para contextos densos como tablas; md (22px) para uso general.</Desc>
            <ComponentPreview code={sizesCode}>
              <Row>
                <Badge variant="success" size="sm">Activo sm</Badge>
                <Badge variant="success" size="md">Activo md</Badge>
              </Row>
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
              { label: 'shadcn/ui — Badge',    href: 'https://ui.shadcn.com/docs/components/badge' },
              { label: 'Bootstrap — Badge',    href: 'https://getbootstrap.com/docs/5.3/components/badge/' },
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
          <TokenTable tokens={BADGE_TOKENS} />
        </div>

        <Divider />

        {/* ── Guías de contenido ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para elegir y usar badges correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Usa la variante semántica correcta — success para estados positivos, error para fallos, warning para alertas',
              'Mantén el texto corto: 1-2 palabras máximo para que el badge sea legible a primera vista',
              'Usa size="sm" dentro de tablas y listas densas para no romper la alineación vertical',
              'Combina dot con la variante cuando el color solo no es suficiente para comunicar el estado',
            ]}
            dont={[
              'No uses badge como botón — no tiene estado hover ni focus para acciones interactivas',
              'No mezcles variantes semánticas de forma arbitraria — usa siempre el color que corresponde al significado',
              'No pongas frases largas en un badge — si el texto supera 3 palabras usa otro componente de texto',
              'No uses la variante neutral para estados con significado semántico — reserva neutral para etiquetas genéricas',
            ]}
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
