import { Checkbox } from '@squadness/ui/checkbox'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { TokenTable } from '@/components/docs/TokenTable'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',              level: 1 },
  { id: 'appearance',         label: 'Apariencia',            level: 1 },
  { id: 'state',              label: 'State',                 level: 2 },
  { id: 'with-label',         label: 'With label',            level: 2 },
  { id: 'error',              label: 'Error',                 level: 2 },
  { id: 'references',         label: 'Referencias',           level: 1 },
  { id: 'tokens',             label: 'Design Tokens',         level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido',    level: 1 },
]

const CHECKBOX_TOKENS = [
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
            Los Checkboxes permiten a los usuarios seleccionar una o más opciones de un conjunto de forma independiente.
            Admiten tres estados: sin seleccionar, seleccionado e indeterminado.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
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
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>El Checkbox tiene tres estados de selección y cuatro estados de interacción.</Desc>
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
            <SectionTitle id="references">Referencias</SectionTitle>
            <Desc>Explora cómo otros sistemas de diseño implementan este componente.</Desc>
          </div>
          <ReferenceLinks
            links={[
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/forms/checks-radios/' },
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/checkbox' },
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
          <TokenTable tokens={CHECKBOX_TOKENS} />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para escribir etiquetas de Checkbox y usar los estados correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Escribe las etiquetas como afirmaciones cortas y positivas (ej. "Enviarme actualizaciones")',
              'Usa el estado indeterminado solo cuando algunos — pero no todos — los ítems de un grupo están seleccionados',
              'Apila los Checkboxes verticalmente cuando hay más de dos opciones',
            ]}
            dont={[
              'Usar un Checkbox para una elección mutuamente exclusiva — usa un Radio Button en su lugar',
              'Usar el estado indeterminado como un estado neutro o de "no estoy seguro"',
              'Escribir etiquetas que empiecen con un verbo e impliquen la acción no seleccionada (ej. "No contactarme")',
            ]}
            note="El estado indeterminado no es un tercer valor lógico — solo indica una selección parcial dentro de un grupo. Siempre debe resolverse en seleccionado o no seleccionado cuando el usuario interactúa con él."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
