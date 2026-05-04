import { IconButton, ButtonStyles } from '@squadness/ui/button'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { TokenTable } from '@/components/docs/TokenTable'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'variant',            label: 'Variant',            level: 2 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'tokens',             label: 'Design Tokens',      level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

const ICON_BUTTON_TOKENS = [
  { token: 'Button/Primary/Surface Default', property: 'background-color', value: '#005fdb', primitive: 'blue/700', description: 'Primary — default' },
  { token: 'Button/Primary/Surface Hover',   property: 'background-color', value: '#0047a3', primitive: 'blue/800', description: 'Primary — hover & active' },
  { token: 'Button/Primary/Content',         property: 'color',            value: '#f8ffff', primitive: 'blue/50',  description: 'Primary — label & icon' },
  { token: 'Button/Secondary/Surface Default', property: 'background-color', value: '#e2e8f0', primitive: 'neutral/200', description: 'Secondary — default' },
  { token: 'Button/Secondary/Surface Hover',   property: 'background-color', value: '#cad5e2', primitive: 'neutral/300', description: 'Secondary — hover' },
  { token: 'Button/Secondary/Surface Active',  property: 'background-color', value: '#90a1b9', primitive: 'neutral/400', description: 'Secondary — active' },
  { token: 'Button/Secondary/Content',         property: 'color',            value: '#0f172b', primitive: 'neutral/900', description: 'Secondary — label & icon' },
  { token: 'Button/Outline/Surface Default',   property: 'background-color', value: '#f8fafc', primitive: 'neutral/50',  description: 'Outline — default' },
  { token: 'Button/Outline/Border',            property: 'border-color',     value: 'rgba(5,21,36,0.06)', primitive: 'neutral/200a', description: 'Outline — border' },
  { token: 'Button/Outline/Content',           property: 'color',            value: '#314158', primitive: 'neutral/700', description: 'Outline — label & icon' },
  { token: 'Button/Ghost/Surface Hover',       property: 'background-color', value: '#f8fafc', primitive: 'neutral/50',  description: 'Ghost — hover surface' },
  { token: 'Button/Ghost/Content',             property: 'color',            value: '#0f172b', primitive: 'neutral/900', description: 'Ghost — label & icon' },
  { token: 'Button/Danger/Surface Default',    property: 'background-color', value: '#9e0b15', primitive: 'red/700',    description: 'Danger — default' },
  { token: 'Button/Danger/Surface Hover',      property: 'background-color', value: '#6f040c', primitive: 'red/800',    description: 'Danger — hover' },
  { token: 'Button/Danger/Surface Active',     property: 'background-color', value: '#430204', primitive: 'red/900',    description: 'Danger — active' },
  { token: 'Button/Danger/Content',            property: 'color',            value: '#feeded', primitive: 'red/50',     description: 'Danger — label & icon' },
  { token: 'Button icon/Tertiary/Surface Default', property: 'background-color', value: '#cce2ff', primitive: 'blue/200', description: 'Tertiary — default' },
  { token: 'Button icon/Tertiary/Surface Hover',   property: 'background-color', value: '#e5f1ff', primitive: 'blue/100', description: 'Tertiary — hover' },
  { token: 'Button icon/Tertiary/Content',         property: 'color',            value: '#0047a3', primitive: 'blue/800', description: 'Tertiary — icon color' },
]

const VARIANTS = ['primary', 'secondary', 'tertiary', 'outline', 'ghost', 'danger'] as const
type V = typeof VARIANTS[number]

const label = (v: V) => v.charAt(0).toUpperCase() + v.slice(1)

// Hover colors per variant
const HOVER_STYLE: Record<V, React.CSSProperties> = {
  primary:   { backgroundColor: '#0047a3', borderColor: '#0047a3' },
  secondary: { backgroundColor: '#cad5e2', borderColor: '#cad5e2' },
  tertiary:  { backgroundColor: '#dbeafe' },
  outline:   { backgroundColor: '#f1f5f9' },
  ghost:     { backgroundColor: '#f8fafc' },
  danger:    { backgroundColor: '#6f040c', borderColor: '#6f040c' },
}

// Active colors per variant
const ACTIVE_STYLE: Record<V, React.CSSProperties> = {
  primary:   { backgroundColor: '#003580', borderColor: '#003580' },
  secondary: { backgroundColor: '#90a1b9', borderColor: '#90a1b9' },
  tertiary:  { backgroundColor: '#bfdbfe' },
  outline:   { backgroundColor: '#e2e8f0' },
  ghost:     { backgroundColor: '#f1f5f9' },
  danger:    { backgroundColor: '#430204', borderColor: '#430204' },
}

// ── Simple icon SVGs ──────────────────────────────────────────────────────────
const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
)

// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { IconButton } from '@squadness/ui'
import { ButtonStyles } from '@squadness/ui'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: ButtonStyles }} />

// 2. Use the component — aria-label is required:
<IconButton variant="primary"   aria-label="Add item"    icon={<AddIcon />} />
<IconButton variant="secondary" aria-label="Settings"    icon={<SettingsIcon />} />
<IconButton variant="tertiary"  aria-label="Filter"      icon={<FilterIcon />} />
<IconButton variant="outline"   aria-label="Edit"        icon={<EditIcon />} />
<IconButton variant="ghost"     aria-label="More options" icon={<MoreIcon />} />
<IconButton variant="danger"    aria-label="Delete"      icon={<TrashIcon />} />`

const stateCode = `{/* Default */}
<IconButton variant="primary" aria-label="Add" icon={<AddIcon />} />

{/* Hover — triggered by CSS :hover automatically */}
{/* Active — triggered by CSS :active automatically */}

{/* Disabled */}
<IconButton variant="primary" aria-label="Add" icon={<AddIcon />} disabled />`

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

function StateRow({
  stateLabel,
  styleOverride,
  disabled,
}: {
  stateLabel: string
  styleOverride?: Record<V, React.CSSProperties>
  disabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <span style={{
        fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 12,
        color: 'var(--sq-text-subtlest)', width: 56, flexShrink: 0, textAlign: 'right',
      }}>
        {stateLabel}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        {VARIANTS.map((v) => (
          <IconButton
            key={v}
            variant={v}
            aria-label={label(v)}
            icon={<AddIcon />}
            disabled={disabled}
            style={styleOverride?.[v]}
          />
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function IconButtonPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Icon Button</h1>
          <Desc>
            Los Icon Buttons ejecutan acciones usando únicamente un ícono, sin etiqueta de texto.
            Úsalos cuando la acción se entiende por sí sola con el ícono y el espacio es limitado.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={100} styles={ButtonStyles}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
              {VARIANTS.map((v) => (
                <IconButton key={v} variant={v} aria-label={label(v)} icon={<AddIcon />} />
              ))}
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>El Icon Button viene en seis variantes y cuatro estados de interacción.</Desc>
          </div>

          {/* Variant */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="variant">Variant</SubTitle>
            <ComponentPreview
              code={VARIANTS.map(v =>
                `<IconButton variant="${v}" aria-label="${label(v)}" icon={<Icon />} />`
              ).join('\n')}
              minHeight={140}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', justifyContent: 'center' }}>
                {VARIANTS.map((v) => (
                  <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <IconButton variant={v} aria-label={label(v)} icon={<AddIcon />} />
                    <span style={{
                      fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 12,
                      color: 'var(--sq-text-subtlest)',
                    }}>
                      {label(v)}
                    </span>
                  </div>
                ))}
              </div>
            </ComponentPreview>
          </div>

          {/* State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="state">State</SubTitle>
            <ComponentPreview code={stateCode} minHeight={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <StateRow stateLabel="Default" />
                <StateRow stateLabel="Hover"   styleOverride={HOVER_STYLE} />
                <StateRow stateLabel="Active"  styleOverride={ACTIVE_STYLE} />
                <StateRow stateLabel="Disabled" disabled />
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
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/components/buttons/' },
              { label: 'shadcn/ui',  href: 'https://ui.shadcn.com/docs/components/button' },
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
          <TokenTable tokens={ICON_BUTTON_TOKENS} />
        </div>

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para usar Icon Buttons de forma accesible y en el contexto correcto.</Desc>
          </div>
          <DoDont
            do={[
              'Siempre proporciona un aria-label descriptivo',
              'Úsalo para acciones que el ícono comunica por sí solo (agregar, eliminar, cerrar)',
              'Complementa con un tooltip para reforzar la acción al hacer hover',
            ]}
            dont={[
              'Usar sin un aria-label — los lectores de pantalla no tendrán nada que anunciar',
              'Usar para acciones primarias o complejas donde una etiqueta de texto aporta claridad',
              'Usar el mismo ícono para acciones diferentes en la misma vista',
            ]}
            note="Los Icon Buttons requieren el atributo aria-label — es obligatorio, no opcional. La etiqueta debe describir la acción, no el ícono: usa 'Eliminar ítem' en lugar de 'Ícono de papelera'."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
