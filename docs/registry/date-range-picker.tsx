'use client'

import { useState } from 'react'
import { DateFilterDropdown, type DateRange } from '@squadness/ui/date-filter-dropdown'
import { DateFilterDropdownStyles } from '@squadness/ui/date-filter-dropdown.styles'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]


// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { DateFilterDropdown } from '@squadness/ui/date-filter-dropdown'
import { DateFilterDropdownStyles } from '@squadness/ui/date-filter-dropdown'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: DateFilterDropdownStyles }} />

// 2. Use the component:
const [range, setRange] = useState<{ from?: Date; to?: Date }>({})

<DateFilterDropdown
  mode="range"
  placeholder="Rango de fechas"
  range={range}
  onRangeChange={setRange}
/>`

const stateCode = `{/* Default */}
<DateFilterDropdown mode="range" placeholder="Rango de fechas" />

{/* Selecting (start picked, end pending) */}
<DateFilterDropdown
  mode="range"
  range={{ from: new Date(2025, 2, 10) }}
  onRangeChange={() => {}}
/>

{/* Complete */}
<DateFilterDropdown
  mode="range"
  range={{ from: new Date(2025, 2, 10), to: new Date(2025, 2, 20) }}
  onRangeChange={() => {}}
/>

{/* Disabled */}
<DateFilterDropdown mode="range" placeholder="Rango de fechas" disabled />`

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
  range,
  disabled,
}: {
  stateLabel: string
  range?: DateRange
  disabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{
        fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 12,
        color: 'var(--sq-text-subtlest)', width: 80, flexShrink: 0, textAlign: 'right',
      }}>
        {stateLabel}
      </span>
      <DateFilterDropdown
        mode="range"
        placeholder="Rango de fechas"
        range={range}
        disabled={disabled}
      />
    </div>
  )
}

// ── Interactive example ───────────────────────────────────────────────────────
function ExampleDemo() {
  const [range, setRange] = useState<DateRange>({})
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
      <DateFilterDropdown
        mode="range"
        placeholder="Rango de fechas"
        range={range}
        onRangeChange={setRange}
      />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function DateRangePickerPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Date Range Picker</h1>
          <Desc>
            Los Date Range Pickers permiten a los usuarios seleccionar una fecha de inicio y fin desde un calendario desplegable.
            Úsalos cuando necesites filtrar registros o definir una ventana de tiempo.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={60} overflowVisible styles={DateFilterDropdownStyles}>
            <ExampleDemo />
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>El Date Range Picker tiene cuatro estados visuales: default, selecting, complete y disabled.</Desc>
          </div>

          {/* State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="state">State</SubTitle>
            <ComponentPreview code={stateCode} minHeight={180} overflowVisible>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <StateRow stateLabel="Default" />
                <StateRow
                  stateLabel="Selecting"
                  range={{ from: new Date(2025, 2, 10) }}
                />
                <StateRow
                  stateLabel="Complete"
                  range={{ from: new Date(2025, 2, 10), to: new Date(2025, 2, 20) }}
                />
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

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para etiquetar y usar Date Range Pickers en tu interfaz.</Desc>
          </div>
          <DoDont
            do={[
              'Usa un Date Range Picker cuando los usuarios necesiten definir un período — ej. "Filtrar por rango de fechas"',
              'Usa un texto placeholder claro y descriptivo que indique qué representa el rango',
              'Muestra el rango completo en el trigger una vez seleccionado: "10 mar. 2025 – 20 mar. 2025"',
            ]}
            dont={[
              'Usar un Date Range Picker para una sola fecha — usa el Date Picker en su lugar',
              'Usar placeholders vagos como "Seleccionar…" — dale al campo suficiente contexto para entenderse de un vistazo',
              'Impedir que los usuarios limpien el rango una vez seleccionado — siempre ofrece una forma de reiniciarlo',
            ]}
            note="Si el rango tiene un máximo natural (ej. 30 días), comunica esta restricción claramente cerca del componente — no rechaces rangos inválidos en silencio."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
