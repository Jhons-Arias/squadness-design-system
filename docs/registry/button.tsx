import { Button, ButtonStyles } from '@squadness/ui/button'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',              level: 1 },
  { id: 'appearance',         label: 'Apariencia',            level: 1 },
  { id: 'variant',            label: 'Variant',               level: 2 },
  { id: 'state',              label: 'State',                 level: 2 },
  { id: 'size',               label: 'Size',                  level: 2 },
  { id: 'uso',                label: 'Uso en código',         level: 1 },
  { id: 'references',         label: 'Referencias',           level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido',    level: 1 },
]

const usageCode = `import { Button, ButtonStyles } from '@squadness/ui/button'
import { ButtonStyles } from '@squadness/ui/button'

// 1. Inyectar CSS una vez en tu root layout
<style dangerouslySetInnerHTML={{ __html: ButtonStyles }} />

// 2. Usar el componente
<Button variant="primary" onClick={() => save()}>
  Guardar cambios
</Button>

<Button variant="secondary" disabled>
  Cancelar
</Button>

<Button variant="danger" loading>
  Eliminando…
</Button>`

const installCode = `// Variantes disponibles
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

// Props del componente
interface ButtonProps {
  variant?:  ButtonVariant        // default: 'primary'
  size?:     'sm' | 'md' | 'lg'  // default: 'md'
  disabled?: boolean
  loading?:  boolean
  onClick?:  () => void
  children:  React.ReactNode
}`


const VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const
type V = typeof VARIANTS[number]

const label = (v: V) => v.charAt(0).toUpperCase() + v.slice(1)

// Hover colors per variant (from Button/* tokens in Figma)
const HOVER_STYLE: Record<V, React.CSSProperties> = {
  primary:   { backgroundColor: '#0047a3', borderColor: '#0047a3' },
  secondary: { backgroundColor: '#cad5e2', borderColor: '#cad5e2' },
  outline:   { backgroundColor: '#f1f5f9' },
  ghost:     { backgroundColor: '#f8fafc' },
  danger:    { backgroundColor: '#6f040c', borderColor: '#6f040c' },
}

// Active colors per variant
const ACTIVE_STYLE: Record<V, React.CSSProperties> = {
  primary:   { backgroundColor: '#003580', borderColor: '#003580' },
  secondary: { backgroundColor: '#90a1b9', borderColor: '#90a1b9' },
  outline:   { backgroundColor: '#e2e8f0' },
  ghost:     { backgroundColor: '#f1f5f9' },
  danger:    { backgroundColor: '#430204', borderColor: '#430204' },
}

// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { Button } from '@squadness/ui'
import { ButtonStyles } from '@squadness/ui'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: ButtonStyles }} />

// 2. Use the component:
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`

const stateCode = `{/* Default */}
<Button variant="primary">Primary</Button>

{/* Hover — triggered by CSS :hover automatically */}
{/* Active — triggered by CSS :active automatically */}

{/* Disabled */}
<Button variant="primary" disabled>Primary</Button>`

const sizeCode = `{/* Large */}
<Button variant="primary" size="lg">Label</Button>

{/* Medium */}
<Button variant="primary" size="md">Label</Button>`

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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {VARIANTS.map((v) => (
          <Button
            key={v}
            variant={v}
            disabled={disabled}
            style={styleOverride?.[v]}
          >
            {label(v)}
          </Button>
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function ButtonPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Button</h1>
          <Desc>
            Los botones permiten a los usuarios ejecutar acciones con un solo clic.
            Elige la variante que mejor comunique la importancia e intención de la acción.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} styles={ButtonStyles} minHeight={120}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
              {VARIANTS.map((v) => <Button key={v} variant={v}>{label(v)}</Button>)}
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>El Button viene en cinco variantes, cuatro estados y dos tamaños.</Desc>
          </div>

          {/* Variant */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="variant">Variant</SubTitle>
            <ComponentPreview code={`<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="danger">Danger</Button>`} minHeight={140}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', justifyContent: 'center' }}>
                {VARIANTS.map((v) => (
                  <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <Button variant={v}>{label(v)}</Button>
                    <span style={{ fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 12, color: 'var(--sq-text-subtlest)' }}>
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
            <ComponentPreview code={stateCode} minHeight={220}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <StateRow stateLabel="Default" />
                <StateRow stateLabel="Hover"   styleOverride={HOVER_STYLE} />
                <StateRow stateLabel="Active"  styleOverride={ACTIVE_STYLE} />
                <StateRow stateLabel="Disabled" disabled />
              </div>
            </ComponentPreview>
          </div>

          {/* Size — Large and Medium only */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="size">Size</SubTitle>
            <ComponentPreview code={sizeCode} minHeight={160}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {([
                  { stateLabel: 'Large',  size: 'lg' },
                  { stateLabel: 'Medium', size: 'md' },
                ] as const).map(({ stateLabel, size }) => (
                  <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <span style={{
                      fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 12,
                      color: 'var(--sq-text-subtlest)', width: 56, flexShrink: 0, textAlign: 'right',
                    }}>
                      {stateLabel}
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                      {VARIANTS.map((v) => <Button key={v} variant={v} size={size}>{label(v)}</Button>)}
                    </div>
                  </div>
                ))}
              </div>
            </ComponentPreview>
          </div>
        </div>

        <Divider />

        {/* ── Uso en código ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="uso">Uso en código</SectionTitle>
            <Desc>Importa el componente y sus estilos, luego úsalo directamente en tu JSX.</Desc>
          </div>
          <LightCodeBlock
            code={usageCode}
            lang="jsx"
            filename="components/MyPage.tsx"
          />
          <LightCodeBlock
            code={installCode}
            lang="jsx"
            filename="types — referencia"
          />
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

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para escribir etiquetas de botones que mantengan la interfaz clara y consistente.</Desc>
          </div>
          <DoDont
            do={['Save', 'Edit', 'Add tags', 'Delete']}
            dont={['Save product', 'Edit collection details', 'Add tag(s)', 'Click here to delete']}
            note="Escribe siempre el texto del botón en sentence case — primera palabra en mayúscula, el resto en minúsculas, salvo que el término sea un nombre propio. Usa verbos de acción cortos que describan exactamente lo que ocurre al presionar el botón."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
