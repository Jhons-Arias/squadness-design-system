import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const TOC: TocItem[] = [
  { id: 'que-es',       label: '¿Qué es un token?',   level: 1 },
  { id: 'nomenclatura', label: 'Nomenclatura',         level: 1 },
  { id: 'uso',          label: 'Cómo usar los tokens', level: 1 },
  { id: 'css',          label: 'CSS',                  level: 2 },
  { id: 'react',        label: 'React (inline)',        level: 2 },
  { id: 'referencia',   label: 'Referencia rápida',    level: 1 },
  { id: 'color',        label: 'Color',                level: 2 },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="docs-section-title">{children}</h2>
}

function SubTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h3 id={id} className="docs-subsection-title">{children}</h3>
}

function Desc({ children }: { children: React.ReactNode }) {
  return <p className="docs-page-desc">{children}</p>
}

function Divider() {
  return <hr className="docs-divider" />
}

// ── Before/After comparison ───────────────────────────────────────────────────

function BeforeAfter() {
  const before = `.btn-primary {
  background-color: #005fdb;  /* ❌ valor literal */
  color: #f8fafc;
  border-radius: 8px;
  padding: 8px 16px;
}`

  const after = `.btn-primary {
  background-color: var(--color-brand);    /* ✅ token */
  color: var(--color-text-inverse);
  border-radius: var(--radius-sm);
  padding: var(--space-100) var(--space-200);
}`

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <p style={{
          fontSize: 11, fontWeight: 600, color: '#6f040c',
          fontFamily: 'var(--font-body)', textTransform: 'uppercase',
          letterSpacing: '0.06em', marginBottom: 8,
        }}>
          Sin tokens
        </p>
        <LightCodeBlock code={before} lang="css" />
      </div>
      <div>
        <p style={{
          fontSize: 11, fontWeight: 600, color: '#3c6300',
          fontFamily: 'var(--font-body)', textTransform: 'uppercase',
          letterSpacing: '0.06em', marginBottom: 8,
        }}>
          Con tokens
        </p>
        <LightCodeBlock code={after} lang="css" />
      </div>
    </div>
  )
}

// ── Nomenclature table ────────────────────────────────────────────────────────

const NAMING_ROWS = [
  { pattern: '--color-[rol]',   example: '--color-brand',     value: '#005fdb',          use: 'Color de acción principal' },
  { pattern: '--color-[rol]',   example: '--color-text-primary', value: '#020618',       use: 'Texto de títulos' },
  { pattern: '--space-[escala]',example: '--space-300',       value: '24px',             use: 'Padding, gap, margin' },
  { pattern: '--font-[tipo]',   example: '--font-body',       value: "'Inter'",          use: 'Familia tipográfica' },
  { pattern: '--radius-[tamaño]',example: '--radius-sm',      value: '8px',              use: 'Border-radius de componentes' },
]

function NamingTable() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-body)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
            {['Patrón', 'Ejemplo', 'Valor', 'Cuándo usarlo'].map(h => (
              <th key={h} style={{
                padding: '8px 12px', textAlign: 'left',
                fontWeight: 600, color: 'var(--color-text-primary)',
                fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {NAMING_ROWS.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
              <td style={{ padding: '10px 12px' }}>
                <code style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)',
                  padding: '2px 6px', borderRadius: 4,
                }}>{row.pattern}</code>
              </td>
              <td style={{ padding: '10px 12px' }}>
                <code style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  color: 'var(--color-text-primary)', background: 'var(--color-surface)',
                  padding: '2px 6px', borderRadius: 4,
                }}>{row.example}</code>
              </td>
              <td style={{ padding: '10px 12px' }}>
                <code style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  color: 'var(--color-text-subtle)',
                }}>{row.value}</code>
              </td>
              <td style={{ padding: '10px 12px', color: 'var(--color-text-subtle)', fontSize: 13 }}>
                {row.use}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Reference tables ──────────────────────────────────────────────────────────

interface TokenRow {
  name: string
  value: string
  preview?: React.ReactNode
  use: string
}

function TokenTable({ rows }: { rows: TokenRow[] }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-body)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
            {['Token', 'Valor', 'Preview', 'Uso'].map(h => (
              <th key={h} style={{
                padding: '8px 12px', textAlign: 'left',
                fontWeight: 600, color: 'var(--color-text-primary)',
                fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
              <td style={{ padding: '10px 12px' }}>
                <code style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)',
                  padding: '2px 6px', borderRadius: 4,
                }}>{row.name}</code>
              </td>
              <td style={{ padding: '10px 12px' }}>
                <code style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  color: 'var(--color-text-subtle)',
                }}>{row.value}</code>
              </td>
              <td style={{ padding: '10px 12px' }}>{row.preview}</td>
              <td style={{ padding: '10px 12px', color: 'var(--color-text-subtle)', fontSize: 13 }}>
                {row.use}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Color swatch ──────────────────────────────────────────────────────────────

function Swatch({ color, border }: { color: string; border?: boolean }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 6,
      background: color,
      border: border ? '1px solid var(--color-border-subtle)' : undefined,
      flexShrink: 0,
    }} />
  )
}

// ── Token data ────────────────────────────────────────────────────────────────

const COLOR_TOKENS: TokenRow[] = [
  { name: '--color-brand',         value: '#005fdb', preview: <Swatch color="#005fdb" />,                    use: 'Acción primaria, links activos' },
  { name: '--color-brand-hover',   value: '#0047a3', preview: <Swatch color="#0047a3" />,                    use: 'Estado hover de brand' },
  { name: '--color-text-primary',  value: '#020618', preview: <Swatch color="#020618" />,                    use: 'Títulos, texto de alta jerarquía' },
  { name: '--color-text-subtle',   value: '#314158', preview: <Swatch color="#314158" />,                    use: 'Cuerpo de texto, descripciones' },
  { name: '--color-text-muted',    value: '#62748e', preview: <Swatch color="#62748e" />,                    use: 'Placeholders, labels secundarios' },
  { name: '--color-text-inverse',  value: '#f8fafc', preview: <Swatch color="#f8fafc" border />,             use: 'Texto sobre fondos oscuros' },
  { name: '--color-surface',       value: '#f8fafc', preview: <Swatch color="#f8fafc" border />,             use: 'Fondo de cards, paneles' },
  { name: '--color-surface-white', value: '#ffffff', preview: <Swatch color="#ffffff" border />,             use: 'Fondo de página principal' },
  { name: '--color-border-subtle', value: 'rgba(11,18,14,0.14)', preview: <Swatch color="rgba(11,18,14,0.14)" border />, use: 'Bordes de separación' },
  { name: '--color-border-default',value: 'rgba(5,21,36,0.06)', preview: <Swatch color="rgba(5,21,36,0.06)" border />,  use: 'Bordes suaves, fondos hover' },
  { name: '--color-success-border',value: '#5ea500', preview: <Swatch color="#5ea500" />,                    use: 'Borde de mensajes de éxito' },
  { name: '--color-success-text',  value: '#3c6300', preview: <Swatch color="#3c6300" />,                    use: 'Texto de mensajes de éxito' },
  { name: '--color-error-border',  value: '#cf121f', preview: <Swatch color="#cf121f" />,                    use: 'Borde de mensajes de error' },
  { name: '--color-error-text',    value: '#6f040c', preview: <Swatch color="#6f040c" />,                    use: 'Texto de mensajes de error' },
]


// ── Code examples ─────────────────────────────────────────────────────────────

const cssExample = `/* globals.css o cualquier archivo CSS */
.mi-componente {
  background-color: var(--color-surface);
  color:            var(--color-text-primary);
  padding:          var(--space-200) var(--space-300);
  border-radius:    var(--radius-sm);
  border:           1px solid var(--color-border-subtle);
  font-family:      var(--font-body);
}`

const reactExample = `// Estilos inline en React / TSX
function MiComponente() {
  return (
    <div style={{
      background:   'var(--color-surface)',
      color:        'var(--color-text-primary)',
      padding:      'var(--space-200) var(--space-300)',
      borderRadius: 'var(--radius-sm)',
      fontFamily:   'var(--font-body)',
    }}>
      Contenido
    </div>
  )
}`

// ── Page ──────────────────────────────────────────────────────────────────────

export function TokensPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Foundations</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Tokens</h1>
          <p className="docs-page-desc">
            Variables con nombre que abstraen valores de diseño. Cambiar un token actualiza automáticamente cada componente que lo usa.
          </p>
        </div>

        <Divider />

        {/* ── ¿Qué es un token? ─────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="que-es">¿Qué es un token?</SectionTitle>
            <Desc>
              Un token es una variable CSS con nombre semántico que reemplaza un valor literal. En lugar de escribir <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>#005fdb</code> directamente, usas <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>var(--color-brand)</code>. Si el color cambia en el futuro, basta con actualizar el token — todos los componentes se actualizan solos.
            </Desc>
          </div>
          <BeforeAfter />
        </div>

        <Divider />

        {/* ── Nomenclatura ──────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="nomenclatura">Nomenclatura</SectionTitle>
            <Desc>
              Todos los tokens siguen el patrón <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>--[categoría]-[variante]</code>. Conocer el patrón te permite predecir el nombre exacto del token sin consultar la documentación.
            </Desc>
          </div>
          <NamingTable />
        </div>

        <Divider />

        {/* ── Cómo usar ─────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="uso">Cómo usar los tokens</SectionTitle>
            <Desc>
              Los tokens están declarados como custom properties CSS en <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>:root</code> y están disponibles en cualquier parte de la aplicación una vez que incluyes el archivo <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>globals.css</code>.
            </Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="css">CSS</SubTitle>
            <LightCodeBlock code={cssExample} lang="css" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="react">React (inline styles)</SubTitle>
            <LightCodeBlock code={reactExample} lang="jsx" />
          </div>
        </div>

        <Divider />

        {/* ── Referencia rápida ─────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="referencia">Referencia rápida</SectionTitle>
            <Desc>
              Todos los tokens del sistema en un solo lugar. Para ver los valores en contexto visual, consulta las páginas individuales de cada categoría en Foundations.
            </Desc>
          </div>

          {/* Color */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="color">Color</SubTitle>
            <TokenTable rows={COLOR_TOKENS} />
          </div>

        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
