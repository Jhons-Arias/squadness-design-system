'use client'

import { useState } from 'react'
import { DateFilterDropdown } from '@squadness/ui/date-filter-dropdown'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { TokenTable } from '@/components/docs/TokenTable'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'tokens',             label: 'Design Tokens',      level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

const DATE_PICKER_TOKENS = [
  { token: 'surface/raised',             property: 'background-color', value: '#ffffff',             primitive: 'neutral/0',    description: 'Fondo del panel' },
  { token: 'border/default',             property: 'border-color',     value: 'rgba(5,21,36,0.06)', primitive: 'neutral/200a', description: 'Borde del panel' },
  { token: 'text/default',               property: 'color',            value: '#020618',             primitive: 'neutral/950',  description: 'Días del calendario' },
  { token: 'text/subtlest',              property: 'color',            value: '#62748e',             primitive: 'neutral/500',  description: 'Días fuera del mes' },
  { token: 'surface/semantic/brand/subtler',   property: 'background-color', value: '#005fdb',       primitive: 'blue/700',     description: 'Día seleccionado — fondo' },
  { token: 'text/inverse',               property: 'color',            value: '#f8fafc',             primitive: 'neutral/50',   description: 'Día seleccionado — texto' },
  { token: 'surface/accent/blue/subtlest',     property: 'background-color', value: '#e5f1ff',       primitive: 'blue/100',     description: 'Rango seleccionado' },
  { token: 'surface/accent/neutral/subtlest',  property: 'background-color', value: '#f1f5f9',       primitive: 'neutral/100',  description: 'Hover de días' },
  { token: 'Input/Surface/Default',      property: 'background-color', value: '#f8fafc',             primitive: 'neutral/50',   description: 'Fondo del input de fecha' },
  { token: 'Input/Border/Default',       property: 'border-color',     value: 'rgba(5,21,36,0.06)', primitive: 'neutral/200a', description: 'Borde del input' },
  { token: 'Input/Border/Focus',         property: 'border-color',     value: '#45556c',             primitive: 'neutral/600',  description: 'Borde del input con foco' },
]

// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { DateFilterDropdown } from '@squadness/ui/date-filter-dropdown'
import { DateFilterDropdownStyles } from '@squadness/ui/date-filter-dropdown'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: DateFilterDropdownStyles }} />

// 2. Use the component:
const [date, setDate] = useState<Date | undefined>()

<DateFilterDropdown
  placeholder="Seleccionar fecha"
  value={date}
  onValueChange={setDate}
/>`

const stateCode = `{/* Default */}
<DateFilterDropdown placeholder="Seleccionar fecha" />

{/* Filled */}
<DateFilterDropdown
  value={new Date(2025, 2, 15)}
  onValueChange={() => {}}
/>

{/* Disabled */}
<DateFilterDropdown placeholder="Seleccionar fecha" disabled />`

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

// ── StateRow ──────────────────────────────────────────────────────────────────
function StateRow({
  stateLabel,
  value,
  disabled,
}: {
  stateLabel: string
  value?: Date
  disabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{
        fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 12,
        color: 'var(--sq-text-subtlest)', width: 72, flexShrink: 0, textAlign: 'right',
      }}>
        {stateLabel}
      </span>
      <DateFilterDropdown
        placeholder="Seleccionar fecha"
        value={value}
        disabled={disabled}
      />
    </div>
  )
}

// ── Interactive example ───────────────────────────────────────────────────────
function ExampleDemo() {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
      <DateFilterDropdown
        placeholder="Seleccionar fecha"
        value={date}
        onValueChange={setDate}
      />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function DatePickerPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Date Picker</h1>
          <Desc>
            Los Date Pickers permiten a los usuarios seleccionar una fecha específica desde un calendario desplegable.
            Úsalos cuando necesites capturar o filtrar por una fecha concreta.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={60} overflowVisible>
            <ExampleDemo />
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>El Date Picker tiene tres estados visuales: default, filled y disabled.</Desc>
          </div>

          {/* State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="state">State</SubTitle>
            <ComponentPreview code={stateCode} minHeight={140} overflowVisible>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <StateRow stateLabel="Default" />
                <StateRow stateLabel="Filled"   value={new Date(2025, 2, 15)} />
                <StateRow stateLabel="Disabled" disabled />
              </div>
            </ComponentPreview>
          </div>
        </div>

        <Divider />

        {/* ── References ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="references">Referencias</SectionTitle>
            <Desc>Explora cómo otros sistemas de diseño implementan este componente.</Desc>
          </div>
          <ReferenceLinks
            links={[
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/date-picker' },
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
          <TokenTable tokens={DATE_PICKER_TOKENS} />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para etiquetar y usar Date Pickers en tu interfaz.</Desc>
          </div>
          <DoDont
            do={[
              'Usa un Date Picker cuando el usuario necesita seleccionar una fecha de calendario específica — no un tiempo relativo como "ayer"',
              'Escribe placeholders que describan qué representa la fecha, ej. "Fecha de inicio" o "Fecha de entrega"',
              'Muestra la fecha seleccionada en un formato consistente e inequívoco (día-mes-año)',
            ]}
            dont={[
              'Usar un Date Picker para seleccionar hora — combínalo con un input de tiempo separado si ambos son necesarios',
              'Usar un Date Picker cuando un input de texto con validación de fecha es más simple y suficiente',
              'Dejar el placeholder como un genérico "Seleccionar…" — dale contexto específico al campo',
            ]}
            note="Para seleccionar un período o ventana de tiempo, usa el Date Range Picker en su lugar."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
