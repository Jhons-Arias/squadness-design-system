'use client'

import { useState } from 'react'
import { DateFilterDropdown } from '@squadness/ui/date-filter-dropdown'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Examples',           level: 1 },
  { id: 'appearance',         label: 'Appearance',         level: 1 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'references',         label: 'References',         level: 1 },
  { id: 'content-guidelines', label: 'Content guidelines', level: 1 },
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
        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12,
        color: 'var(--color-text-muted)', width: 72, flexShrink: 0, textAlign: 'right',
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
            Date pickers let users select a single date from a calendar dropdown.
            Use when you need to capture or filter by a specific date.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Examples</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={60} overflowVisible>
            <ExampleDemo />
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Appearance</SectionTitle>
            <Desc>Date pickers have three visual states: default, filled, and disabled.</Desc>
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
            <SectionTitle id="references">References</SectionTitle>
            <Desc>Explore how other design systems implement this component.</Desc>
          </div>
          <ReferenceLinks
            links={[
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/date-picker' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Content guidelines</SectionTitle>
            <Desc>Rules for labeling and using date pickers in your UI.</Desc>
          </div>
          <DoDont
            do={[
              'Use a date picker when the user needs to select a specific calendar date — not a relative time like "yesterday"',
              'Write placeholders that describe what the date represents, e.g. "Fecha de inicio" or "Fecha de entrega"',
              'Show the selected date in a consistent, unambiguous format (day-month-year)',
            ]}
            dont={[
              'Use a date picker for time selection — pair it with a separate time input if both are needed',
              'Use a date picker when a text input with date validation is simpler and sufficient',
              'Leave the placeholder as a generic "Select…" — give it context specific to the field',
            ]}
            note="For selecting a period or window of time, use the Date Range Picker instead."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
