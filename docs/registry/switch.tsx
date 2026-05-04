import { Switch } from '@squadness/ui/switch'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { TokenTable } from '@/components/docs/TokenTable'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'label-position',     label: 'Label position',     level: 2 },
  { id: 'loading',            label: 'Loading',            level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'tokens',             label: 'Design Tokens',      level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

const SWITCH_TOKENS = [
  { token: 'border/subtle',              property: 'border-color',     value: 'rgba(11,18,14,0.14)', primitive: 'neutral/300a', description: 'Borde en reposo (unchecked)' },
  { token: 'border/accent/neutral',      property: 'border-color',     value: '#45556c',             primitive: 'neutral/600',  description: 'Borde en hover' },
  { token: 'surface/semantic/brand/subtler',  property: 'background-color', value: '#005fdb',        primitive: 'blue/700',     description: 'Fondo checked / ON' },
  { token: 'surface/semantic/brand/subtler-hovered', property: 'background-color', value: '#0047a3', primitive: 'blue/800',     description: 'Fondo checked hover / ON hover' },
  { token: 'surface/raised',             property: 'background-color', value: '#ffffff',             primitive: 'neutral/0',    description: 'Thumb del switch / check mark color' },
  { token: 'surface/default',            property: 'background-color', value: '#f8fafc',             primitive: 'neutral/50',   description: 'Surface unchecked hover' },
  { token: 'text/default',               property: 'color',            value: '#020618',             primitive: 'neutral/950',  description: 'Label texto principal' },
  { token: 'text/subtle',                property: 'color',            value: '#314158',             primitive: 'neutral/700',  description: 'Label texto descripción' },
  { token: 'text/subtlest',              property: 'color',            value: '#62748e',             primitive: 'neutral/500',  description: 'Hint / helper text' },
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
        fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 12,
        color: 'var(--sq-text-subtlest)', width: 72, flexShrink: 0, textAlign: 'right',
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
              fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 12,
              color: 'var(--sq-text-subtlest)',
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
            Los Switches activan o desactivan una configuración individual. El cambio se aplica de inmediato,
            sin necesidad de enviar un formulario. Úsalos cuando el cambio sea instantáneo y reversible.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
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
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>El Switch tiene dos estados de activación y cuatro estados de interacción.</Desc>
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
            <SectionTitle id="references">Referencias</SectionTitle>
            <Desc>Explora cómo otros sistemas de diseño implementan este componente.</Desc>
          </div>
          <ReferenceLinks
            links={[
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/forms/checks-radios/#switches' },
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/switch' },
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
          <TokenTable tokens={SWITCH_TOKENS} />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para escribir etiquetas de Switch y elegir cuándo usarlo.</Desc>
          </div>
          <DoDont
            do={[
              'Escribe las etiquetas como sustantivos o frases nominales cortas (ej. "Modo oscuro", "Notificaciones")',
              'Usa un Switch para configuraciones que se aplican de inmediato sin necesidad de guardar',
              'Usa el estado de carga cuando el toggle requiere confirmación del servidor antes de ejecutarse',
            ]}
            dont={[
              'Usar un Switch dentro de un formulario que requiere envío — usa un Checkbox en su lugar',
              'Escribir etiquetas que solo tengan sentido en una dirección (ej. "Desactivar alertas")',
              'Apilar múltiples Switches sin agrupación visual clara o encabezados de sección',
            ]}
            note="Los Switches implican acción inmediata. Si el cambio no es instantáneo — por ejemplo, se aplica después de guardar un formulario — usa un Checkbox para evitar confundir a los usuarios sobre cuándo se aplica el cambio."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
