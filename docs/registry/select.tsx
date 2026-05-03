import { Select } from '@squadness/ui/select'
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
  { id: 'validation',         label: 'Validation',            level: 2 },
  { id: 'references',         label: 'Referencias',           level: 1 },
  { id: 'tokens',             label: 'Design Tokens',         level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido',    level: 1 },
]

const SELECT_TOKENS = [
  { token: 'Input/Surface/Default',      property: 'background-color', value: '#f8fafc',             primitive: 'neutral/50',   description: 'Fondo en reposo' },
  { token: 'Input/Surface/Hover',        property: 'background-color', value: '#f1f5f9',             primitive: 'neutral/100',  description: 'Fondo en hover' },
  { token: 'Input/Surface/Active',       property: 'background-color', value: '#ffffff',             primitive: 'neutral/0',    description: 'Fondo con foco' },
  { token: 'Input/Content/Default',      property: 'color',            value: '#1d293d',             primitive: 'neutral/800',  description: 'Texto ingresado' },
  { token: 'Input/Content/Placeholder',  property: 'color',            value: '#90a1b9',             primitive: 'neutral/400',  description: 'Placeholder text' },
  { token: 'Input/Content/Disabled',     property: 'color',            value: '#62748e',             primitive: 'neutral/500',  description: 'Texto deshabilitado' },
  { token: 'Input/Border/Default',       property: 'border-color',     value: 'rgba(5,21,36,0.06)', primitive: 'neutral/200a', description: 'Borde en reposo' },
  { token: 'Input/Border/Focus',         property: 'border-color',     value: '#45556c',             primitive: 'neutral/600',  description: 'Borde con foco' },
  { token: 'Input/Border/Error',         property: 'border-color',     value: '#cf121f',             primitive: 'red/600',      description: 'Borde estado error' },
  { token: 'Input/Border/Success',       property: 'border-color',     value: '#497d00',             primitive: 'lime/700',     description: 'Borde estado éxito' },
  { token: 'Input/Border/Disabled',      property: 'border-color',     value: 'rgba(23,23,23,0.03)', primitive: 'neutral/100a', description: 'Borde deshabilitado' },
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
            Los Selects permiten a los usuarios elegir una opción de una lista desplegable.
            Úsalos cuando haya cinco o más opciones y el espacio sea limitado.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
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
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>El Select tiene tres estados visuales y soporta etiquetas, texto de ayuda y validación.</Desc>
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
            <SectionTitle id="references">Referencias</SectionTitle>
            <Desc>Explora cómo otros sistemas de diseño implementan este componente.</Desc>
          </div>
          <ReferenceLinks
            links={[
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/forms/select/' },
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/select' },
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
          <TokenTable tokens={SELECT_TOKENS} />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para escribir etiquetas de opciones y elegir cuándo usar un Select.</Desc>
          </div>
          <DoDont
            do={[
              'Usa un Select cuando haya 5 o más opciones — con menos opciones, los Radio Buttons son más adecuados',
              'Escribe las etiquetas de opciones como frases nominales cortas y paralelas al mismo nivel de especificidad',
              'Incluye un placeholder que describa qué está eligiendo el usuario (ej. "Seleccionar un estado")',
            ]}
            dont={[
              'Usar un Select para decisiones binarias de sí/no — un toggle o Checkbox es más claro',
              'Usar un Select cuando todas las opciones deberían ser siempre visibles — usa Radio Buttons en su lugar',
              'Escribir etiquetas de opciones que empiecen con artículos ("un", "el") o varíen en estructura gramatical',
            ]}
            note="Si la lista de opciones puede crecer dinámicamente o requiere búsqueda, considera un combobox o input con autocompletado en lugar de un Select."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
