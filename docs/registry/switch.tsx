import { Switch } from '@squadness/ui/switch'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Examples',           level: 1 },
  { id: 'appearance',         label: 'Appearance',         level: 1 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'label-position',     label: 'Label position',     level: 2 },
  { id: 'loading',            label: 'Loading',            level: 2 },
  { id: 'references',         label: 'References',         level: 1 },
  { id: 'content-guidelines', label: 'Content guidelines', level: 1 },
]

// ── Hover style overrides ─────────────────────────────────────────────────────
const hoverStyleOff: React.CSSProperties  = { backgroundColor: '#cad5e2' }
const hoverStyleOn: React.CSSProperties   = { backgroundColor: '#0047a3' }

// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { Switch } from '@squadness/ui'
import { SwitchStyles } from '@squadness/ui'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: SwitchStyles }} />

// 2. Use the component:
<Switch checked={false} label="Dark mode" onCheckedChange={setEnabled} />
<Switch checked={true}  label="Dark mode" onCheckedChange={setEnabled} />`

const stateCode = `{/* Default */}
<Switch checked={false} />
<Switch checked={true} />

{/* Hover — triggered by CSS :hover automatically */}

{/* Disabled */}
<Switch checked={false} disabled />
<Switch checked={true}  disabled />

{/* Loading */}
<Switch checked={false} loading />
<Switch checked={true}  loading />`

const labelPositionCode = `{/* Label on the right (default) */}
<Switch checked={true} label="Notifications" labelPosition="right" />

{/* Label on the left */}
<Switch checked={true} label="Notifications" labelPosition="left" />`

const loadingCode = `{/* Loading — disables interaction, shows spinner in thumb */}
<Switch checked={false} loading label="Syncing…" />
<Switch checked={true}  loading label="Saving…" />`

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
  useHoverStyle,
  disabled,
  loading,
}: {
  stateLabel: string
  useHoverStyle?: boolean
  disabled?: boolean
  loading?: boolean
}) {
  const switchItems = [
    { label: 'Off', checked: false },
    { label: 'On',  checked: true  },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12,
        color: 'var(--color-text-muted)', width: 72, flexShrink: 0, textAlign: 'right',
      }}>
        {stateLabel}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
        {switchItems.map(({ label, checked }) => (
          <div
            key={label}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
          >
            <Switch
              checked={checked}
              disabled={disabled}
              loading={loading}
              style={useHoverStyle
                ? (checked ? hoverStyleOn : hoverStyleOff)
                : undefined}
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
export function SwitchPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Switch</h1>
          <Desc>
            Switches toggle a single setting on or off. They take effect immediately —
            no form submission required. Use a switch when the change is instant and reversible.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Examples</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={80}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Switch checked={false} label="Dark mode" />
              <Switch checked={true}  label="Dark mode" />
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Appearance</SectionTitle>
            <Desc>Switches have two toggle states and four interaction states.</Desc>
          </div>

          {/* State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="state">State</SubTitle>
            <ComponentPreview code={stateCode} minHeight={220}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <StateRow stateLabel="Default" />
                <StateRow stateLabel="Hover"    useHoverStyle />
                <StateRow stateLabel="Disabled" disabled />
                <StateRow stateLabel="Loading"  loading />
              </div>
            </ComponentPreview>
          </div>

          {/* Label position */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="label-position">Label position</SubTitle>
            <ComponentPreview code={labelPositionCode} minHeight={100}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                <Switch checked={true} label="Notifications" labelPosition="right" />
                <Switch checked={true} label="Notifications" labelPosition="left"  />
              </div>
            </ComponentPreview>
          </div>

          {/* Loading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="loading">Loading</SubTitle>
            <ComponentPreview code={loadingCode} minHeight={100}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                <Switch checked={false} loading label="Syncing…" />
                <Switch checked={true}  loading label="Saving…" />
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
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/forms/checks-radios/#switches' },
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/switch' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Content guidelines</SectionTitle>
            <Desc>Rules for writing switch labels and choosing when to use a switch.</Desc>
          </div>
          <DoDont
            do={[
              'Write labels as short, active nouns or noun phrases (e.g. "Dark mode", "Notifications")',
              'Use a switch for settings that take effect immediately without a save action',
              'Use the loading state when the toggle requires server confirmation before committing',
            ]}
            dont={[
              'Use a switch inside a form that requires submitting — use a checkbox instead',
              'Write labels that only make sense in one direction (e.g. "Turn off alerts")',
              'Stack multiple switches without clear visual grouping or section headers',
            ]}
            note="Switches imply immediate action. If the change is not instant — for example, it takes effect after saving a form — use a checkbox instead to avoid confusing users about when the change applies."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
