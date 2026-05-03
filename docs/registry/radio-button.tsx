import { RadioGroup, RadioButton } from '@squadness/ui/radio-button'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'with-label',         label: 'With label',         level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

// ── State rows ────────────────────────────────────────────────────────────────
type RadioVal = 'a' | 'b' | 'c'

// Hover style overrides per selection state
const hoverStyleUnselected: React.CSSProperties = {
  borderColor: '#62748e',
  backgroundColor: '#f8fafc',
}
const hoverStyleSelected: React.CSSProperties = {
  backgroundColor: '#0047a3',
  borderColor: '#0047a3',
}

// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { RadioGroup, RadioButton } from '@squadness/ui'
import { RadioButtonStyles } from '@squadness/ui'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: RadioButtonStyles }} />

// 2. Use the component:
<RadioGroup value={value} onValueChange={setValue}>
  <RadioButton value="a" label="Option A" />
  <RadioButton value="b" label="Option B" />
  <RadioButton value="c" label="Option C" />
</RadioGroup>`

const stateCode = `{/* Default */}
<RadioGroup value="b">
  <RadioButton value="a" label="Unselected" />
  <RadioButton value="b" label="Selected" />
</RadioGroup>

{/* Hover — triggered by CSS :hover automatically */}

{/* Disabled */}
<RadioGroup value="b">
  <RadioButton value="a" label="Unselected" disabled />
  <RadioButton value="b" label="Selected" disabled />
</RadioGroup>`

const withLabelCode = `{/* With label */}
<RadioGroup value="monthly" onValueChange={setValue}>
  <RadioButton value="monthly" label="Monthly billing" />
  <RadioButton value="annual"  label="Annual billing" />
</RadioGroup>

{/* With label + helper text */}
<RadioGroup value="standard" onValueChange={setValue}>
  <RadioButton
    value="standard"
    label="Standard"
    helperText="Delivered in 5–7 business days."
  />
  <RadioButton
    value="express"
    label="Express"
    helperText="Delivered in 1–2 business days."
  />
</RadioGroup>`

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
}: {
  stateLabel: string
  useHoverStyle?: boolean
  disabled?: boolean
}) {
  const items: { label: string; value: RadioVal; selected: boolean }[] = [
    { label: 'Unselected', value: 'a', selected: false },
    { label: 'Selected',   value: 'b', selected: true  },
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
        {items.map(({ label, value, selected }) => (
          <div
            key={label}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
          >
            {/* Wrap in a group so Radix state renders correctly */}
            <RadioGroup value={selected ? value : '__none__'}>
              <RadioButton
                value={value}
                disabled={disabled}
                style={useHoverStyle
                  ? (selected ? hoverStyleSelected : hoverStyleUnselected)
                  : undefined}
              />
            </RadioGroup>
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
export function RadioButtonPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Radio Button</h1>
          <Desc>
            Los Radio Buttons permiten a los usuarios seleccionar exactamente una opción de un conjunto.
            A diferencia de los Checkboxes, seleccionar uno desactiva automáticamente los demás.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={120}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RadioGroup value="b">
                <RadioButton value="a" label="Option A" />
                <RadioButton value="b" label="Option B" />
                <RadioButton value="c" label="Option C" />
              </RadioGroup>
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>El Radio Button tiene dos estados de selección y cuatro estados de interacción.</Desc>
          </div>

          {/* State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="state">State</SubTitle>
            <ComponentPreview code={stateCode} minHeight={160}>
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
            <ComponentPreview code={withLabelCode} minHeight={200}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start', justifyContent: 'center' }}>
                <RadioGroup value="monthly">
                  <RadioButton value="monthly" label="Monthly billing" />
                  <RadioButton value="annual"  label="Annual billing" />
                </RadioGroup>

                <RadioGroup value="standard">
                  <RadioButton
                    value="standard"
                    label="Standard"
                    helperText="Delivered in 5–7 business days."
                  />
                  <RadioButton
                    value="express"
                    label="Express"
                    helperText="Delivered in 1–2 business days."
                  />
                </RadioGroup>
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
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/forms/checks-radios/#radios' },
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/radio-group' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para escribir etiquetas de Radio Button y agrupar las opciones correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Escribe las etiquetas como opciones cortas basadas en sustantivos (ej. "Mensual", "Anual")',
              'Agrupa siempre los Radio Buttons dentro de un RadioGroup con una etiqueta o leyenda compartida',
              'Lista las opciones en un orden lógico — las más comunes primero, o en orden alfabético',
            ]}
            dont={[
              'Usar Radio Buttons cuando se deben permitir selecciones múltiples — usa Checkboxes en su lugar',
              'Usar Radio Buttons para decisiones binarias de sí/no — un toggle o Switch es más claro',
              'Dejar un grupo sin selección predeterminada si una opción es claramente preferida',
            ]}
            note="Un grupo de Radio Buttons siempre debe tener una opción preseleccionada, a menos que se le pida explícitamente al usuario hacer una elección nueva. La preselección evita errores de envío y reduce la carga cognitiva."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
