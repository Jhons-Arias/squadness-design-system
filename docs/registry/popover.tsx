'use client'

import { useState } from 'react'
import { Popover } from '@squadness/ui/popover'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { TokenTable } from '@/components/docs/TokenTable'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'select-field',       label: 'Campo select',       level: 2 },
  { id: 'text-field',         label: 'Campo texto',        level: 2 },
  { id: 'date-field',         label: 'Campo fecha',        level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'tokens',             label: 'Design Tokens',      level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

const POPOVER_TOKENS = [
  { token: 'surface/default',            property: 'background-color', value: '#f8fafc',             primitive: 'neutral/50',   description: 'Fondo del panel' },
  { token: 'border/default',             property: 'border-color',     value: 'rgba(5,21,36,0.06)', primitive: 'neutral/200a', description: 'Borde del panel' },
  { token: 'text/subtle',                property: 'color',            value: '#314158',             primitive: 'neutral/700',  description: 'Texto de contenido' },
  { token: 'text/default',               property: 'color',            value: '#020618',             primitive: 'neutral/950',  description: 'Texto principal' },
  { token: 'text/subtlest',              property: 'color',            value: '#62748e',             primitive: 'neutral/500',  description: 'Texto secundario' },
  { token: 'surface/semantic/brand/subtler', property: 'border-color', value: '#005fdb',             primitive: 'blue/700',     description: 'Borde activo / focus' },
]

// ── Code snippets ─────────────────────────────────────────────────────────────

const fullCode = `import { Popover } from '@squadness/ui/popover'

const FIELDS = [
  { id: 'fecha',       label: 'Fecha',       type: 'date' },
  { id: 'operador',    label: 'Operador',    type: 'select',
    options: [{ label: 'Norte', value: 'norte' }, { label: 'Centro', value: 'centro' }] },
  { id: 'chapilla',    label: 'Chapilla',    type: 'select',
    options: [{ label: 'A-001', value: 'a001' }, { label: 'B-002', value: 'b002' }] },
  { id: 'consecutivo', label: 'Consecutivo', type: 'text' },
  { id: 'cliente',     label: 'Cliente',     type: 'select',
    options: [{ label: 'Cliente A', value: 'ca' }, { label: 'Cliente B', value: 'cb' }] },
  { id: 'ruta',        label: 'Ruta',        type: 'select',
    options: [
      { label: 'Norte',           value: 'norte' },
      { label: 'Centro',          value: 'centro' },
      { label: 'Sur',             value: 'sur' },
      { label: 'Oriente',         value: 'oriente' },
      { label: 'Fosas portátiles',value: 'fosas' },
    ] },
]

const [values, setValues] = useState({})

<Popover
  fields={FIELDS}
  values={values}
  onValuesChange={setValues}
  onApply={(v) => console.log(v)}
/>`

const selectCode = `<Popover
  fields={[
    { id: 'ruta', label: 'Ruta', type: 'select',
      options: [
        { label: 'Norte',           value: 'norte' },
        { label: 'Centro',          value: 'centro' },
        { label: 'Sur',             value: 'sur' },
        { label: 'Oriente',         value: 'oriente' },
        { label: 'Fosas portátiles',value: 'fosas' },
      ] },
  ]}
  onApply={(v) => console.log(v)}
/>`

const textCode = `<Popover
  fields={[
    { id: 'consecutivo', label: 'Consecutivo', type: 'text', placeholder: 'Ej. 00123' },
  ]}
  onApply={(v) => console.log(v)}
/>`

const dateCode = `<Popover
  fields={[
    { id: 'fecha', label: 'Fecha', type: 'date' },
  ]}
  onApply={(v) => console.log(v)}
/>`

// ── Field options ─────────────────────────────────────────────────────────────

const RUTA_OPTIONS = [
  { label: 'Norte',            value: 'norte' },
  { label: 'Centro',           value: 'centro' },
  { label: 'Sur',              value: 'sur' },
  { label: 'Oriente',          value: 'oriente' },
  { label: 'Fosas portátiles', value: 'fosas' },
]

const FULL_FIELDS = [
  { id: 'fecha',       label: 'Fecha',       type: 'date' as const },
  { id: 'operador',    label: 'Operador',    type: 'select' as const,
    options: [{ label: 'Norte', value: 'norte' }, { label: 'Centro', value: 'centro' }] },
  { id: 'chapilla',    label: 'Chapilla',    type: 'select' as const,
    options: [{ label: 'A-001', value: 'a001' }, { label: 'B-002', value: 'b002' }] },
  { id: 'consecutivo', label: 'Consecutivo', type: 'text' as const },
  { id: 'cliente',     label: 'Cliente',     type: 'select' as const,
    options: [{ label: 'Cliente A', value: 'ca' }, { label: 'Cliente B', value: 'cb' }] },
  { id: 'ruta',        label: 'Ruta',        type: 'select' as const, options: RUTA_OPTIONS },
]

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

// ── Demo ──────────────────────────────────────────────────────────────────────

function FullDemo() {
  const [values, setValues] = useState<Record<string, string>>({})
  return (
    <Popover
      fields={FULL_FIELDS}
      values={values}
      onValuesChange={setValues}
      onApply={(v) => console.log('Aplicar', v)}
    />
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function PopoverPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Popover</h1>
          <Desc>
            Panel flotante de filtrado avanzado. Agrupa múltiples campos de filtro — texto libre,
            selector con búsqueda y selector de fecha — en un contenedor compacto de 256 px. Se usa
            junto a la tabla para refinar resultados sin navegar a otra pantalla.
          </Desc>
        </div>

        {/* ── Ejemplos ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={fullCode}>
            <FullDemo />
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Apariencia ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>
              El panel tiene 256 px de ancho fijo, fondo <code>#f8fafc</code> y borde sutil.
              Cada fila muestra la etiqueta a la izquierda y el campo a la derecha (159 px).
              El botón "Aplicar" siempre aparece al final del panel.
            </Desc>
          </div>

          {/* Campo select */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="select-field">Campo select</SubTitle>
            <Desc>
              Usa <code>type="select"</code> para campos con un listado de opciones. El dropdown
              incluye un campo de búsqueda por defecto — se puede desactivar con{' '}
              <code>searchable={'{false}'}</code>.
            </Desc>
            <ComponentPreview code={selectCode}>
              <Popover
                fields={[
                  { id: 'ruta', label: 'Ruta', type: 'select', options: RUTA_OPTIONS },
                ]}
                onApply={() => {}}
              />
            </ComponentPreview>
          </div>

          {/* Campo texto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="text-field">Campo texto</SubTitle>
            <Desc>
              Usa <code>type="text"</code> para valores libres como un número de consecutivo o
              cualquier cadena. Acepta <code>placeholder</code> para dar contexto al usuario.
            </Desc>
            <ComponentPreview code={textCode}>
              <Popover
                fields={[
                  { id: 'consecutivo', label: 'Consecutivo', type: 'text', placeholder: 'Ej. 00123' },
                ]}
                onApply={() => {}}
              />
            </ComponentPreview>
          </div>

          {/* Campo fecha */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="date-field">Campo fecha</SubTitle>
            <Desc>
              Usa <code>type="date"</code> para seleccionar una fecha. El campo muestra el ícono
              de calendario y abre el selector nativo del navegador.
            </Desc>
            <ComponentPreview code={dateCode}>
              <Popover
                fields={[
                  { id: 'fecha', label: 'Fecha', type: 'date' },
                ]}
                onApply={() => {}}
              />
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
              { label: 'shadcn/ui — Popover',  href: 'https://ui.shadcn.com/docs/components/popover' },
              { label: 'Bootstrap — Popovers',  href: 'https://getbootstrap.com/docs/5.3/components/popovers/' },
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
          <TokenTable tokens={POPOVER_TOKENS} />
        </div>

        <Divider />

        {/* ── Guías de contenido ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para usar el Popover de filtrado correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Limita los campos a los filtros que el usuario usa con más frecuencia — mueve filtros adicionales a un panel dedicado si hay más de 6',
              'Usa type="select" con opciones predefinidas cuando los valores posibles son conocidos y finitos',
              'Usa type="text" solo para identificadores libres como números de serie o consecutivos',
              'Conecta el botón "Aplicar" a la consulta de datos real — nunca lo dejes sin efecto',
            ]}
            dont={[
              'No uses el Popover para acciones destructivas — usa el Dialog modal en su lugar',
              'No omitas el campo de búsqueda en selects con más de 5 opciones — el usuario necesita filtrar la lista',
              'No uses este componente como menú de navegación — es exclusivamente para filtrado de datos',
              'No cambies el ancho fijo de 256 px sin revisar cómo encaja con la tabla a la que está asociado',
            ]}
            note="El Popover define únicamente la apariencia y el comportamiento del panel de filtros. El posicionamiento relativo al botón que lo activa (trigger) y la lógica de apertura/cierre deben implementarse en la capa de aplicación."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
