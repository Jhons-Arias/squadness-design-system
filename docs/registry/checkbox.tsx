import { Checkbox } from '@squadness/ui/checkbox'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Examples',           level: 1 },
  { id: 'appearance',         label: 'Appearance',         level: 1 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'with-label',         label: 'With label',         level: 2 },
  { id: 'error',              label: 'Error',              level: 2 },
  { id: 'references',         label: 'References',         level: 1 },
  { id: 'content-guidelines', label: 'Content guidelines', level: 1 },
]

// ── Check states shown in each row ────────────────────────────────────────────
type CheckVal = boolean | 'indeterminate'
const CHECK_STATES: { label: string; checked: CheckVal }[] = [
  { label: 'Unselected',    checked: false           },
  { label: 'Selected',      checked: true            },
  { label: 'Indeterminate', checked: 'indeterminate' },
]

// Hover style overrides per check value
const HOVER_STYLE: Record<string, React.CSSProperties> = {
  false:         { borderColor: '#62748e', backgroundColor: '#f8fafc' },
  true:          { backgroundColor: '#0047a3', borderColor: '#0047a3' },
  indeterminate: { backgroundColor: '#0047a3', borderColor: '#0047a3' },
}

// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { Checkbox } from '@squadness/ui'
import { CheckboxStyles } from '@squadness/ui'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: CheckboxStyles }} />

// 2. Use the component:
<Checkbox checked={false} />
<Checkbox checked={true} />
<Checkbox checked="indeterminate" />`

const stateCode = `{/* Default */}
<Checkbox checked={false} />
<Checkbox checked={true} />
<Checkbox checked="indeterminate" />

{/* Hover — triggered by CSS :hover automatically */}

{/* Disabled */}
<Checkbox checked={false} disabled />
<Checkbox checked={true} disabled />
<Checkbox checked="indeterminate" disabled />`

const withLabelCode = `{/* With label */}
<Checkbox checked={true} label="Accept terms and conditions" />

{/* With label + helper text */}
<Checkbox
  checked={false}
  label="Subscribe to newsletter"
  helperText="We'll send you updates once a week."
/>`

const errorCode = `{/* Error — invalid selection */}
<Checkbox
  checked={false}
  hasError
  label="I agree to the terms"
  helperText="You must agree before continuing."
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

// ── StateRow ─────────────────────────────────────────────────────────────────
function StateRow({
  stateLabel,
  useHoverStyle,
  disabled,
}: {
  stateLabel: string
  useHoverStyle?: boolean
  disabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12,
        color: 'var(--color-text-muted)', width: 72, flexShrink: 0, textAlign: 'right',
      }}>
        {stateLabel}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
        {CHECK_STATES.map(({ label, checked }) => (
          <div
            key={label}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
          >
            <Checkbox
              checked={checked}
              disabled={disabled}
              style={useHoverStyle ? HOVER_STYLE[String(checked)] : undefined}
            />
            <span style={{
              fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12,
              color: 'var(--color-text-muted)',
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function CheckboxPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Checkbox</h1>
          <Desc>
            Checkboxes let users select one or more options from a set independently.
            They support three states: unselected, selected, and indeterminate.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Examples</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={80}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
              {CHECK_STATES.filter(s => s.checked !== false).map(({ label, checked }) => (
                <Checkbox key={label} checked={checked} />
              ))}
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Appearance</SectionTitle>
            <Desc>Checkboxes have three check states and four interaction states.</Desc>
          </div>

          {/* State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="state">State</SubTitle>
            <ComponentPreview code={stateCode} minHeight={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <StateRow stateLabel="Default" />
                <StateRow stateLabel="Hover"    useHoverStyle />
                <StateRow stateLabel="Disabled" disabled />
              </div>
            </ComponentPreview>
          </div>

          {/* With label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="with-label">With label</SubTitle>
            <ComponentPreview code={withLabelCode} minHeight={140}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
                <Checkbox
                  checked={true}
                  label="Accept terms and conditions"
                />
                <Checkbox
                  checked={false}
                  label="Subscribe to newsletter"
                  helperText="We'll send you updates once a week."
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Error */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="error">Error</SubTitle>
            <ComponentPreview code={errorCode} minHeight={100}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Checkbox
                  checked={false}
                  hasError
                  label="I agree to the terms"
                  helperText="You must agree before continuing."
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
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/forms/checks-radios/' },
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/checkbox' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Content guidelines</SectionTitle>
            <Desc>Rules for writing checkbox labels and using states correctly.</Desc>
          </div>
          <DoDont
            do={[
              'Write labels as short, positive statements (e.g. "Send me updates")',
              'Use indeterminate only when some — but not all — items in a group are selected',
              'Stack checkboxes vertically when there are more than two options',
            ]}
            dont={[
              'Use a checkbox for a mutually exclusive choice — use a radio button instead',
              'Use indeterminate as a neutral or "not sure" state',
              'Write labels that start with a verb and imply the unchecked action (e.g. "Do not contact me")',
            ]}
            note="The indeterminate state is not a third logical value — it only signals partial selection within a group. It must always resolve to either checked or unchecked when the user interacts with it."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
