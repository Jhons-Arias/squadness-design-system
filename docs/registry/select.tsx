import { Select } from '@squadness/ui/select'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Examples',           level: 1 },
  { id: 'appearance',         label: 'Appearance',         level: 1 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'with-label',         label: 'With label',         level: 2 },
  { id: 'validation',         label: 'Validation',         level: 2 },
  { id: 'references',         label: 'References',         level: 1 },
  { id: 'content-guidelines', label: 'Content guidelines', level: 1 },
]

// ── Shared option sets ────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  { label: 'Dañado',               value: 'damaged'   },
  { label: 'Disponible',           value: 'available' },
  { label: 'Servicios de almacén', value: 'warehouse' },
  { label: 'Recolección',          value: 'pickup'    },
  { label: 'Suspendido',           value: 'suspended' },
  { label: 'Renta',                value: 'rental'    },
]

const ROLE_OPTIONS = [
  { label: 'Admin',    value: 'admin'    },
  { label: 'Editor',   value: 'editor'   },
  { label: 'Viewer',   value: 'viewer'   },
  { label: 'Guest',    value: 'guest', disabled: true },
]

// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { Select } from '@squadness/ui'
import { SelectStyles } from '@squadness/ui'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: SelectStyles }} />

// 2. Use the component:
<Select
  placeholder="Select a status"
  options={[
    { label: 'Available',  value: 'available' },
    { label: 'Damaged',    value: 'damaged'   },
    { label: 'Suspended',  value: 'suspended' },
  ]}
  value={value}
  onValueChange={setValue}
/>`

const stateCode = `{/* Default (empty) */}
<Select placeholder="Select…" options={options} />

{/* Filled */}
<Select value="available" options={options} />

{/* Disabled */}
<Select placeholder="Select…" options={options} disabled />`

const withLabelCode = `{/* Label only */}
<Select label="Status" placeholder="Select a status" options={options} />

{/* Label + required */}
<Select label="Status" required placeholder="Select a status" options={options} />

{/* Label + helper text */}
<Select
  label="Role"
  helperText="Controls what this user can see and edit."
  placeholder="Select a role"
  options={options}
/>`

const validationCode = `<Select
  label="Status"
  required
  state="error"
  errorMessage="Please select a status before continuing."
  placeholder="Select a status"
  options={options}
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

// ── StateRow ──────────────────────────────────────────────────────────────────
function StateRow({
  stateLabel,
  value,
  disabled,
}: {
  stateLabel: string
  value?: string
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
      <div style={{ flex: 1, maxWidth: 320 }}>
        <Select
          placeholder="Select a status"
          options={STATUS_OPTIONS}
          value={value}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function SelectPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Select</h1>
          <Desc>
            Selects let users choose one option from a collapsible list.
            Use a select when there are five or more options and space is limited.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Examples</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={80} overflowVisible>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', alignItems: 'flex-start' }}>
              <div style={{ width: 240 }}>
                <Select
                  placeholder="Select a status"
                  options={STATUS_OPTIONS}
                />
              </div>
              <div style={{ width: 240 }}>
                <Select
                  value="available"
                  options={STATUS_OPTIONS}
                />
              </div>
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Appearance</SectionTitle>
            <Desc>Selects have three visual states and support labels, helper text, and validation.</Desc>
          </div>

          {/* State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="state">State</SubTitle>
            <ComponentPreview code={stateCode} minHeight={180} overflowVisible>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <StateRow stateLabel="Default"  />
                <StateRow stateLabel="Filled"   value="available" />
                <StateRow stateLabel="Disabled" disabled />
              </div>
            </ComponentPreview>
          </div>

          {/* With label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="with-label">With label</SubTitle>
            <ComponentPreview code={withLabelCode} minHeight={240} overflowVisible>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 320, margin: '0 auto' }}>
                <Select
                  label="Status"
                  placeholder="Select a status"
                  options={STATUS_OPTIONS}
                />
                <Select
                  label="Status"
                  required
                  placeholder="Select a status"
                  options={STATUS_OPTIONS}
                />
                <Select
                  label="Role"
                  helperText="Controls what this user can see and edit."
                  placeholder="Select a role"
                  options={ROLE_OPTIONS}
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Validation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="validation">Validation</SubTitle>
            <ComponentPreview code={validationCode} minHeight={100} overflowVisible>
              <div style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}>
                <Select
                  label="Status"
                  required
                  state="error"
                  errorMessage="Please select a status before continuing."
                  placeholder="Select a status"
                  options={STATUS_OPTIONS}
                />
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
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/forms/select/' },
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/select' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Content guidelines</SectionTitle>
            <Desc>Rules for writing option labels and choosing when to use a select.</Desc>
          </div>
          <DoDont
            do={[
              'Use a select when there are 5 or more options — fewer options are better served by radio buttons',
              'Write option labels as short, parallel noun phrases at the same level of specificity',
              'Include a placeholder that describes what the user is choosing (e.g. "Select a status")',
            ]}
            dont={[
              'Use a select for binary yes/no decisions — a toggle or checkbox is clearer',
              'Use a select when all options should always be visible — use radio buttons instead',
              'Write option labels that begin with articles ("a", "the") or vary in grammatical structure',
            ]}
            note="If the list of options can grow dynamically or requires search, consider a combobox or autocomplete input instead of a select."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
