import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const TOC: TocItem[] = [
  { id: 'importar',   label: 'Importar componentes', level: 1 },
  { id: 'tokens',     label: 'Usar tokens',           level: 1 },
  { id: 'variantes',  label: 'Variantes y props',     level: 1 },
  { id: 'estilos',    label: 'Personalización CSS',   level: 1 },
  { id: 'convenciones', label: 'Convenciones',        level: 1 },
]

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="docs-section-title">{children}</h2>
}

function Desc({ children }: { children: React.ReactNode }) {
  return <p className="docs-page-desc">{children}</p>
}

function Divider() {
  return <hr className="docs-divider" />
}

// ── Convenciones data ─────────────────────────────────────────────────────────

const CONVENTIONS = [
  {
    rule: 'Nombre de archivos',
    detail: 'kebab-case — button.tsx, icon-button.tsx, date-picker.tsx',
  },
  {
    rule: 'Nombre de clases CSS',
    detail: 'Prefijo sq-  seguido del componente — sq-btn, sq-input, sq-badge…',
  },
  {
    rule: 'Nombre de tokens CSS',
    detail: '--color-*, --space-*, --radius-*, --font-* (sin prefijo sq-)',
  },
  {
    rule: 'Estilos del componente',
    detail: 'Cada componente tiene un archivo *.styles.ts con las reglas CSS inyectadas via <style>',
  },
  {
    rule: 'Client Components',
    detail: 'Solo usan "use client" cuando tienen estado o event handlers; el resto son Server Components',
  },
]

export function UsagePage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Getting Started</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Usage</h1>
          <Desc>
            Cómo importar componentes, aplicar tokens de diseño y personalizar estilos dentro de Squadness DS.
          </Desc>
        </div>

        <Divider />

        {/* ── Importar ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="importar">Importar componentes</SectionTitle>
            <Desc>Cada componente se importa desde su propio archivo mediante el alias <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)' }}>@squadness/ui</code>.</Desc>
          </div>
          <LightCodeBlock lang="jsx" code={`import { Button }   from '@squadness/ui/button'
import { Input }    from '@squadness/ui/input'
import { Badge }    from '@squadness/ui/badge'
import { Checkbox } from '@squadness/ui/checkbox'

export default function MyPage() {
  return (
    <div>
      <Input placeholder="Buscar…" />
      <Button variant="primary">Guardar</Button>
      <Badge variant="success">Activo</Badge>
    </div>
  )
}`} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Importa desde la ruta exacta del componente, no desde un barrel <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>index.ts</code> — esto evita bundlear componentes no usados.
          </p>
        </div>

        <Divider />

        {/* ── Tokens ────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="tokens">Usar tokens de diseño</SectionTitle>
            <Desc>Usa siempre CSS custom properties en lugar de valores literales. Los tokens garantizan consistencia y facilitan cambios de tema globales.</Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>En CSS / estilos de componentes</p>
            <LightCodeBlock lang="css" code={`/* ✅ Correcto — usa el token */
.my-card {
  padding: var(--space-300);          /* 24px */
  border-radius: var(--radius-lg);    /* 16px */
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  color: var(--color-text-primary);
}

/* ❌ Incorrecto — valor literal */
.my-card {
  padding: 24px;
  border-radius: 16px;
  background: #f8fafc;
}`} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>En inline styles (JSX)</p>
            <LightCodeBlock lang="jsx" code={`<div style={{
  display: 'flex',
  gap: 'var(--space-200)',       /* 16px */
  padding: 'var(--space-300)',   /* 24px */
  color: 'var(--color-text-subtle)',
}}>
  contenido
</div>`} />
          </div>
        </div>

        <Divider />

        {/* ── Variantes ─────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="variantes">Variantes y props</SectionTitle>
            <Desc>Los componentes exponen sus variantes mediante la prop <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)' }}>variant</code> y el estado mediante <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)' }}>disabled</code>, <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)' }}>loading</code>, etc.</Desc>
          </div>
          <LightCodeBlock lang="jsx" code={`{/* Button — 5 variantes */}
<Button variant="primary">Primario</Button>
<Button variant="secondary">Secundario</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

{/* Con estados */}
<Button variant="primary" loading>Guardando…</Button>
<Button variant="primary" disabled>No disponible</Button>

{/* Con íconos */}
<Button variant="primary" leadingIcon={<PlusIcon />}>Crear</Button>
<Button variant="primary" trailingIcon={<ArrowRight />}>Siguiente</Button>

{/* Badge — variantes de semántica */}
<Badge variant="default">Draft</Badge>
<Badge variant="success">Activo</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="brand">Nuevo</Badge>`} />
        </div>

        <Divider />

        {/* ── Personalización CSS ───────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="estilos">Personalización CSS</SectionTitle>
            <Desc>Cada componente inyecta sus estilos vía un archivo <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)' }}>*.styles.ts</code>. Puedes sobrescribir clases en tu CSS global.</Desc>
          </div>
          <LightCodeBlock lang="css" filename="components/ui/button.styles.ts" code={`/* components/ui/button.styles.ts — estructura del archivo de estilos */
export const ButtonStyles = \`
  .sq-btn { … }
  .sq-btn--primary { background: var(--color-brand); … }
  .sq-btn:hover { background: var(--color-brand-hover); … }
\`

/* Para sobrescribir en tu proyecto — mayor especificidad */
.sq-btn--primary {
  background: var(--color-brand);    /* cambia el token en :root */
  border-radius: var(--radius-sm);   /* o ajusta el radio */
}`} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            La forma recomendada de personalizar es modificar los valores de los tokens en <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>:root</code> — todos los componentes reflejan el cambio automáticamente.
          </p>
        </div>

        <Divider />

        {/* ── Convenciones ──────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="convenciones">Convenciones del proyecto</SectionTitle>
            <Desc>Reglas que siguen todos los archivos del sistema de diseño.</Desc>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {CONVENTIONS.map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16,
                padding: '12px 0',
                borderBottom: i < CONVENTIONS.length - 1 ? '1px solid var(--color-border-default)' : 'none',
                alignItems: 'start',
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{row.rule}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-subtle)', lineHeight: 1.6 }}>{row.detail}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
