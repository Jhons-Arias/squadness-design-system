'use client'

import { useState } from 'react'
import { DateFilterDropdown, type DateRange } from '@squadness/ui/date-filter-dropdown'
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
        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12,
        color: 'var(--color-text-muted)', width: 80, flexShrink: 0, textAlign: 'right',
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
            Date range pickers let users select a start and end date from a calendar dropdown.
            Use when you need to filter records or define a time window.
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
            <Desc>Date range pickers have four visual states: default, selecting, complete, and disabled.</Desc>
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
            <Desc>Rules for labeling and using date range pickers in your UI.</Desc>
          </div>
          <DoDont
            do={[
              'Use a date range picker when users need to define a period — e.g. "Filtrar por rango de fechas"',
              'Use clear, descriptive placeholder text that tells users what the range represents',
              'Show the full range in the trigger once selected: "10 mar. 2025 – 20 mar. 2025"',
            ]}
            dont={[
              'Use a date range picker for a single date — use the Date Picker instead',
              'Use vague placeholders like "Select…" — give the field enough context to be understood at a glance',
              'Prevent users from clearing the range once selected — always offer a way to reset',
            ]}
            note="If the range has a natural maximum (e.g. 30 days), communicate this constraint clearly near the component — don't silently reject invalid ranges."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
