import { Input } from '@squadness/ui/input'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'sizes',              label: 'Sizes',              level: 2 },
  { id: 'with-label',         label: 'With label',         level: 2 },
  { id: 'with-icons',         label: 'With icons',         level: 2 },
  { id: 'validation',         label: 'Validation',         level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

// ── Inline icon used in the "With icons" examples ─────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { Input } from '@squadness/ui'
import { InputStyles } from '@squadness/ui'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: InputStyles }} />

// 2. Use the component:
<Input placeholder="Enter your email…" label="Email" />
<Input
  placeholder="Enter your email…"
  label="Email"
  helperText="We'll never share your email."
/>`

const stateCode = `{/* Default (empty) */}
<Input placeholder="Placeholder" />

{/* Filled */}
<Input value="john@example.com" readOnly />

{/* Focus — triggered by CSS :focus automatically */}

{/* Disabled */}
<Input placeholder="Placeholder" disabled />

{/* Read-only */}
<Input value="readonly@example.com" readOnly />`

const sizesCode = `<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium (default)" />
<Input inputSize="lg" placeholder="Large" />`

const withLabelCode = `{/* Label only */}
<Input label="Email" placeholder="Enter email…" />

{/* Label + required */}
<Input label="Email" required placeholder="Enter email…" />

{/* Label + helper text */}
<Input
  label="Password"
  helperText="At least 8 characters, one uppercase and one number."
  placeholder="Enter password…"
  type="password"
/>`

const withIconsCode = `{/* Start icon */}
<Input startIcon={<SearchIcon />} placeholder="Search…" />

{/* End icon */}
<Input endIcon={<CalendarIcon />} placeholder="Pick a date…" />

{/* Both */}
<Input
  startIcon={<SearchIcon />}
  endIcon={<CalendarIcon />}
  placeholder="Search with date…"
/>`

const validationCode = `{/* Success */}
<Input
  state="success"
  value="john@example.com"
  label="Email"
  successMessage="This email is available."
/>

{/* Error */}
<Input
  state="error"
  value="not-an-email"
  label="Email"
  errorMessage="Please enter a valid email address."
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
  label,
  value,
  placeholder,
  disabled,
  readOnly,
  focusStyle,
}: {
  label: string
  value?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  focusStyle?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12,
        color: 'var(--color-text-muted)', width: 80, flexShrink: 0, textAlign: 'right',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, maxWidth: 280 }}>
        <Input
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          style={focusStyle ? {
            borderColor: '#005fdb',
            boxShadow: '0 0 0 3px rgba(0, 95, 219, 0.2)',
            outline: 'none',
          } : undefined}
        />
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function InputPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Input</h1>
          <Desc>
            Los Inputs permiten a los usuarios ingresar y editar texto de una sola línea. Admiten etiquetas,
            texto de ayuda, íconos, tres tamaños y estados completos de validación.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={120}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 360, margin: '0 auto' }}>
              <Input placeholder="Enter your email…" label="Email" />
              <Input
                placeholder="Enter your email…"
                label="Email"
                helperText="We'll never share your email."
              />
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>El Input soporta siete estados, tres tamaños, íconos opcionales y retroalimentación de validación.</Desc>
          </div>

          {/* State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="state">State</SubTitle>
            <ComponentPreview code={stateCode} minHeight={280}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <StateRow label="Default"   placeholder="Placeholder" />
                <StateRow label="Filled"    value="john@example.com" readOnly />
                <StateRow label="Focus"     placeholder="Placeholder" focusStyle />
                <StateRow label="Disabled"  placeholder="Placeholder" disabled />
                <StateRow label="Read-only" value="readonly@example.com" readOnly
                  focusStyle={false}
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Sizes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="sizes">Sizes</SubTitle>
            <ComponentPreview code={sizesCode} minHeight={140}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320, margin: '0 auto' }}>
                {(
                  [
                    { size: 'sm', label: 'Small' },
                    { size: 'md', label: 'Medium (default)' },
                    { size: 'lg', label: 'Large' },
                  ] as const
                ).map(({ size, label }) => (
                  <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11,
                      color: 'var(--color-text-muted)', width: 56, flexShrink: 0, textAlign: 'right',
                    }}>
                      {label}
                    </span>
                    <div style={{ flex: 1 }}>
                      <Input inputSize={size} placeholder={label} />
                    </div>
                  </div>
                ))}
              </div>
            </ComponentPreview>
          </div>

          {/* With label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="with-label">With label</SubTitle>
            <ComponentPreview code={withLabelCode} minHeight={220}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 360, margin: '0 auto' }}>
                <Input label="Email" placeholder="Enter email…" />
                <Input label="Email" required placeholder="Enter email…" />
                <Input
                  label="Password"
                  helperText="At least 8 characters, one uppercase and one number."
                  placeholder="Enter password…"
                  type="password"
                />
              </div>
            </ComponentPreview>
          </div>

          {/* With icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="with-icons">With icons</SubTitle>
            <ComponentPreview code={withIconsCode} minHeight={180}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 360, margin: '0 auto' }}>
                <Input startIcon={<SearchIcon />} placeholder="Search…" />
                <Input endIcon={<CalendarIcon />} placeholder="Pick a date…" />
                <Input
                  startIcon={<SearchIcon />}
                  endIcon={<CalendarIcon />}
                  placeholder="Search with date…"
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Validation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="validation">Validation</SubTitle>
            <ComponentPreview code={validationCode} minHeight={180}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 360, margin: '0 auto' }}>
                <Input
                  state="success"
                  value="john@example.com"
                  label="Email"
                  successMessage="This email is available."
                  readOnly
                />
                <Input
                  state="error"
                  value="not-an-email"
                  label="Email"
                  errorMessage="Please enter a valid email address."
                  readOnly
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
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/forms/form-control/' },
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/input' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para escribir etiquetas, placeholders y mensajes de retroalimentación en Inputs.</Desc>
          </div>
          <DoDont
            do={[
              'Escribe las etiquetas como sustantivos o frases nominales cortas (ej. "Correo electrónico", "Nombre completo")',
              'Usa el texto placeholder solo como indicación de formato — nunca como sustituto de una etiqueta',
              'Escribe mensajes de error que expliquen qué salió mal y cómo corregirlo (ej. "Ingresa un correo electrónico válido")',
            ]}
            dont={[
              'Usar el texto placeholder como única etiqueta — desaparece cuando el usuario comienza a escribir',
              'Escribir mensajes de error vagos como "Entrada no válida" sin explicar el formato esperado',
              'Marcar todos los campos como requeridos — cuando la mayoría lo son, marca solo los opcionales',
            ]}
            note="Siempre acompaña un estado de error con un mensaje específico en la prop errorMessage. Un borde rojo solo no es suficiente retroalimentación para usuarios que dependen de lectores de pantalla o tienen daltonismo."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
