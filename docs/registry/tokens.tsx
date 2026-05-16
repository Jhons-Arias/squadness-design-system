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

// Helpers

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

// Before/After comparison

function BeforeAfter() {
  const before = `.btn-primary {
  background-color: #005fdb;
  color: #f8fafc;
  border-radius: 8px;
  padding: 8px 16px;
}`

  const after = `.btn-primary {
  background-color: var(--sq-brand);
  color:            var(--sq-text-inverse);
  border-radius:    var(--sq-radius-sm);
  padding:          var(--sq-space-100) var(--sq-space-200);
}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{
          fontSize: 11, fontWeight: 600, color: '#6f040c',
          fontFamily: 'var(--sq-font-body)', textTransform: 'uppercase',
          letterSpacing: '0.06em', marginBottom: 8,
        }}>
          Sin tokens
        </p>
        <LightCodeBlock code={before} lang="css" />
      </div>
      <div>
        <p style={{
          fontSize: 11, fontWeight: 600, color: '#3c6300',
          fontFamily: 'var(--sq-font-body)', textTransform: 'uppercase',
          letterSpacing: '0.06em', marginBottom: 8,
        }}>
          Con tokens
        </p>
        <LightCodeBlock code={after} lang="css" />
      </div>
    </div>
  )
}

// Nomenclature table

const NAMING_ROWS = [
  { pattern: '--sq-brand',               example: '--sq-brand',             value: '#005fdb',              use: 'Color de accion principal' },
  { pattern: '--sq-text-[rol]',          example: '--sq-text-default',      value: '#020618',              use: 'Texto de alta jerarquia' },
  { pattern: '--sq-surface-[variante]',  example: '--sq-surface-default',   value: '#f8fafc',              use: 'Fondos de cards y paneles' },
  { pattern: '--sq-border-[variante]',   example: '--sq-border-subtle',     value: 'rgba(11,18,14,0.14)',  use: 'Bordes de separacion' },
  { pattern: '--sq-space-[escala]',      example: '--sq-space-300',         value: '24px',                 use: 'Padding, gap, margin' },
  { pattern: '--sq-font-[tipo]',         example: '--sq-font-body',         value: "'Inter'",              use: 'Familia tipografica' },
  { pattern: '--sq-radius-[tamano]',     example: '--sq-radius-sm',         value: '8px',                  use: 'Border-radius de componentes' },
]

function NamingTable() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--sq-font-body)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--sq-border-subtle)' }}>
            {['Patron', 'Ejemplo', 'Valor', 'Cuando usarlo'].map(h => (
              <th key={h} style={{
                padding: '8px 12px', textAlign: 'left',
                fontWeight: 600, color: 'var(--sq-text-default)',
                fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {NAMING_ROWS.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--sq-border-default)' }}>
              <td style={{ padding: '10px 12px' }}>
                <code style={{
                  fontFamily: 'var(--sq-font-mono)', fontSize: 12,
                  color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                  padding: '2px 6px', borderRadius: 4,
                }}>{row.pattern}</code>
              </td>
              <td style={{ padding: '10px 12px' }}>
                <code style={{
                  fontFamily: 'var(--sq-font-mono)', fontSize: 12,
                  color: 'var(--sq-text-default)', background: 'var(--sq-surface-default)',
                  padding: '2px 6px', borderRadius: 4,
                }}>{row.example}</code>
              </td>
              <td style={{ padding: '10px 12px' }}>
                <code style={{
                  fontFamily: 'var(--sq-font-mono)', fontSize: 12,
                  color: 'var(--sq-text-subtle)',
                }}>{row.value}</code>
              </td>
              <td style={{ padding: '10px 12px', color: 'var(--sq-text-subtle)', fontSize: 13 }}>
                {row.use}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Reference tables

interface TokenRow {
  name: string
  value: string
  preview?: React.ReactNode
  use: string
}

function TokenTable({ rows }: { rows: TokenRow[] }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--sq-font-body)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--sq-border-subtle)' }}>
            {['Token', 'Valor', 'Preview', 'Uso'].map(h => (
              <th key={h} style={{
                padding: '8px 12px', textAlign: 'left',
                fontWeight: 600, color: 'var(--sq-text-default)',
                fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--sq-border-default)' }}>
              <td style={{ padding: '10px 12px' }}>
                <code style={{
                  fontFamily: 'var(--sq-font-mono)', fontSize: 12,
                  color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                  padding: '2px 6px', borderRadius: 4,
                }}>{row.name}</code>
              </td>
              <td style={{ padding: '10px 12px' }}>
                <code style={{
                  fontFamily: 'var(--sq-font-mono)', fontSize: 12,
                  color: 'var(--sq-text-subtle)',
                }}>{row.value}</code>
              </td>
              <td style={{ padding: '10px 12px' }}>{row.preview}</td>
              <td style={{ padding: '10px 12px', color: 'var(--sq-text-subtle)', fontSize: 13 }}>
                {row.use}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Color swatch

function Swatch({ color, border }: { color: string; border?: boolean }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 6,
      background: color,
      border: border ? '1px solid var(--sq-border-subtle)' : undefined,
      flexShrink: 0,
    }} />
  )
}

// Token data

const COLOR_TOKENS: TokenRow[] = [
  { name: '--sq-brand',                     value: '#005fdb',              preview: <Swatch color="#005fdb" />,                     use: 'Accion primaria, links activos' },
  { name: '--sq-brand-hover',               value: '#0047a3',              preview: <Swatch color="#0047a3" />,                     use: 'Estado hover de brand' },
  { name: '--sq-brand-active',              value: '#0a74ff',              preview: <Swatch color="#0a74ff" />,                     use: 'Estado active / focus ring' },
  { name: '--sq-text-default',              value: '#020618',              preview: <Swatch color="#020618" />,                     use: 'Titulos, texto de alta jerarquia' },
  { name: '--sq-text-subtle',               value: '#314158',              preview: <Swatch color="#314158" />,                     use: 'Cuerpo de texto, descripciones' },
  { name: '--sq-text-subtlest',             value: '#62748e',              preview: <Swatch color="#62748e" />,                     use: 'Placeholders, labels secundarios' },
  { name: '--sq-text-inverse',              value: '#ffffff',              preview: <Swatch color="#ffffff" border />,              use: 'Texto sobre fondos de marca o oscuros' },
  { name: '--sq-text-success',              value: '#3c6300',              preview: <Swatch color="#3c6300" />,                     use: 'Texto de mensajes de exito' },
  { name: '--sq-text-warning',              value: '#9f2d00',              preview: <Swatch color="#9f2d00" />,                     use: 'Texto de mensajes de advertencia' },
  { name: '--sq-text-error',                value: '#6f040c',              preview: <Swatch color="#6f040c" />,                     use: 'Texto de mensajes de error' },
  { name: '--sq-surface-raised',            value: '#ffffff',              preview: <Swatch color="#ffffff" border />,              use: 'Fondo de pagina y modals' },
  { name: '--sq-surface-default',           value: '#f8fafc',              preview: <Swatch color="#f8fafc" border />,              use: 'Fondo de cards, paneles' },
  { name: '--sq-surface-neutral-subtlest',  value: '#f1f5f9',              preview: <Swatch color="#f1f5f9" border />,              use: 'Header de tabla, filas expandidas' },
  { name: '--sq-surface-neutral-subtler',   value: '#e2e8f0',              preview: <Swatch color="#e2e8f0" border />,              use: 'Hover de items de nav y botones' },
  { name: '--sq-surface-brand-subtlest',    value: '#e5f1ff',              preview: <Swatch color="#e5f1ff" border />,              use: 'Fondo de filas seleccionadas' },
  { name: '--sq-surface-brand-subtler',     value: '#cce2ff',              preview: <Swatch color="#cce2ff" border />,              use: 'Avatar, boton de accion primaria' },
  { name: '--sq-surface-success-subtlest',  value: '#ecfcca',              preview: <Swatch color="#ecfcca" border />,              use: 'Fondo badge success' },
  { name: '--sq-surface-warning-subtlest',  value: '#ffedd4',              preview: <Swatch color="#ffedd4" border />,              use: 'Fondo badge warning' },
  { name: '--sq-surface-error-subtlest',    value: '#feeded',              preview: <Swatch color="#feeded" border />,              use: 'Fondo badge error' },
  { name: '--sq-border-subtle',             value: 'rgba(11,18,14,0.14)', preview: <Swatch color="rgba(11,18,14,0.14)" border />, use: 'Bordes de separacion' },
  { name: '--sq-border-default',            value: 'rgba(5,21,36,0.06)',  preview: <Swatch color="rgba(5,21,36,0.06)" border />,  use: 'Bordes suaves, fondos hover' },
  { name: '--sq-border-bold',               value: 'rgba(5,21,36,0.12)',  preview: <Swatch color="rgba(5,21,36,0.12)" border />,  use: 'Bordes de mayor contraste' },
  { name: '--sq-border-success',            value: '#5ea500',              preview: <Swatch color="#5ea500" />,                     use: 'Borde badge / alerta de exito' },
  { name: '--sq-border-warning',            value: '#f54a00',              preview: <Swatch color="#f54a00" />,                     use: 'Borde badge / alerta de advertencia' },
  { name: '--sq-border-error',              value: '#cf121f',              preview: <Swatch color="#cf121f" />,                     use: 'Borde badge / alerta de error' },
]

// Code examples

const cssExample = `/* globals.css o cualquier archivo CSS */
.mi-componente {
  background-color: var(--sq-surface-default);
  color:            var(--sq-text-default);
  padding:          var(--sq-space-200) var(--sq-space-300);
  border-radius:    var(--sq-radius-sm);
  border:           1px solid var(--sq-border-subtle);
  font-family:      var(--sq-font-body);
}`

const reactExample = `// Estilos inline en React / TSX
function MiComponente() {
  return (
    <div style={{
      background:   'var(--sq-surface-default)',
      color:        'var(--sq-text-default)',
      padding:      'var(--sq-space-200) var(--sq-space-300)',
      borderRadius: 'var(--sq-radius-sm)',
      fontFamily:   'var(--sq-font-body)',
    }}>
      Contenido
    </div>
  )
}`

// Page

export function TokensPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Foundations</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Tokens</h1>
          <p className="docs-page-desc">
            Variables con nombre que abstraen valores de diseno. Cambiar un token actualiza automaticamente cada componente que lo usa.
          </p>
        </div>

        <Divider />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="que-es">Que es un token?</SectionTitle>
            <Desc>
              Un token es una variable CSS con nombre semantico que reemplaza un valor literal.
              En lugar de escribir <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 14, color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>#005fdb</code> directamente,
              usas <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 14, color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>var(--sq-brand)</code>.
              Si el color cambia en el futuro, basta con actualizar el token y todos los componentes se actualizan solos.
            </Desc>
          </div>
          <BeforeAfter />
        </div>

        <Divider />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="nomenclatura">Nomenclatura</SectionTitle>
            <Desc>
              Todos los tokens siguen el patron <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 14, color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>--sq-[categoria]-[variante]</code>.
              El prefijo <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 14, color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>--sq-</code> identifica
              el sistema Squadness y evita colisiones con otras librerias.
            </Desc>
          </div>
          <NamingTable />
        </div>

        <Divider />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="uso">Como usar los tokens</SectionTitle>
            <Desc>
              Los tokens estan disponibles como variables CSS globales. Puedes usarlos en cualquier archivo CSS o directamente en estilos inline de React.
            </Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="css">CSS</SubTitle>
            <Desc>Referencia los tokens con la funcion estandar <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 14, color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>var()</code> de CSS.</Desc>
            <LightCodeBlock code={cssExample} lang="css" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="react">React (inline)</SubTitle>
            <Desc>En props <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 14, color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>style</code> de React, pasa el token como string.</Desc>
            <LightCodeBlock code={reactExample} lang="tsx" />
          </div>
        </div>

        <Divider />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="referencia">Referencia rapida</SectionTitle>
            <Desc>
              Listado completo de tokens disponibles en el sistema.
            </Desc>
          </div>

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
