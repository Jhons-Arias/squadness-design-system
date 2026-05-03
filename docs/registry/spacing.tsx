import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const TOC: TocItem[] = [
  { id: 'escala',   label: 'Escala',           level: 1 },
  { id: 'guia',     label: 'Cuándo usar',      level: 1 },
  { id: 'uso',      label: 'Uso en código',    level: 1 },
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

// ── Scale data ────────────────────────────────────────────────────────────────

const SCALE = [
  { token: '--space-025', px: 2,  rem: '0.125rem' },
  { token: '--space-050', px: 4,  rem: '0.25rem'  },
  { token: '--space-075', px: 6,  rem: '0.375rem' },
  { token: '--space-100', px: 8,  rem: '0.5rem'   },
  { token: '--space-150', px: 12, rem: '0.75rem'  },
  { token: '--space-200', px: 16, rem: '1rem'      },
  { token: '--space-250', px: 20, rem: '1.25rem'  },
  { token: '--space-300', px: 24, rem: '1.5rem'   },
  { token: '--space-400', px: 32, rem: '2rem'      },
  { token: '--space-500', px: 40, rem: '2.5rem'   },
  { token: '--space-600', px: 48, rem: '3rem'      },
  { token: '--space-800', px: 64, rem: '4rem'      },
]

const MAX_BAR = 240

// ── Usage guide data ──────────────────────────────────────────────────────────

const GUIDE = [
  { context: 'Gap entre ícono y su label',               token: '--space-050', px: 4  },
  { context: 'Padding interno de un badge o chip',       token: '--space-075', px: 6  },
  { context: 'Padding de botón (vertical)',              token: '--space-100', px: 8  },
  { context: 'Padding de botón (horizontal)',            token: '--space-150', px: 12 },
  { context: 'Gap entre elementos de un formulario',     token: '--space-200', px: 16 },
  { context: 'Padding horizontal del contenido',         token: '--space-300', px: 24 },
  { context: 'Separación entre secciones de una página', token: '--space-400', px: 32 },
  { context: 'Padding vertical de bloques grandes',      token: '--space-500', px: 40 },
]

// ── Code example ──────────────────────────────────────────────────────────────

const codeExample = `/* Padding */
.card {
  padding: var(--space-300) var(--space-400); /* 24px 32px */
}

/* Gap en flex/grid */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-200); /* 16px */
}

/* Margin */
.section + .section {
  margin-top: var(--space-500); /* 40px */
}`

// ── Page ──────────────────────────────────────────────────────────────────────

export function SpacingPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Foundations</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Spacing</h1>
          <Desc>
            Escala de espaciado basada en múltiplos de 4px. Usar siempre tokens en lugar de valores literales garantiza consistencia visual en todos los componentes.
          </Desc>
        </div>

        <Divider />

        {/* ── Escala ────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionTitle id="escala">Escala</SectionTitle>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '160px 56px 72px 1fr',
              gap: 12,
              padding: '6px 12px',
              borderBottom: '1px solid var(--color-border-subtle)',
            }}>
              {['Token', 'px', 'rem', 'Visual'].map(h => (
                <span key={h} style={{
                  fontSize: 11, fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-body)',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {SCALE.map(({ token, px, rem }) => {
              const barWidth = Math.round((px / 64) * MAX_BAR)
              return (
                <div
                  key={token}
                  className="docs-scale-row"
                >
                  <code style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    color: 'var(--color-brand)',
                    background: 'rgba(0,95,219,0.06)',
                    padding: '2px 6px', borderRadius: 4,
                  }}>{token}</code>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text-primary)' }}>
                    {px}px
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text-muted)' }}>
                    {rem}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      height: 10,
                      width: Math.max(barWidth, 3),
                      borderRadius: 2,
                      background: 'var(--color-brand)',
                      opacity: 0.65,
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <Divider />

        {/* ── Cuándo usar ───────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="guia">Cuándo usar cada valor</SectionTitle>
            <Desc>Referencia de los contextos más frecuentes en UI y el token recomendado para cada uno.</Desc>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-body)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  {['Contexto', 'Token', 'Valor'].map(h => (
                    <th key={h} style={{
                      padding: '8px 12px', textAlign: 'left',
                      fontSize: 11, fontWeight: 600,
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GUIDE.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                    <td style={{ padding: '10px 12px', color: 'var(--color-text-subtle)' }}>{row.context}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <code style={{
                        fontFamily: 'var(--font-mono)', fontSize: 12,
                        color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)',
                        padding: '2px 6px', borderRadius: 4,
                      }}>{row.token}</code>
                    </td>
                    <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text-muted)' }}>
                      {row.px}px
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Divider />

        {/* ── Uso en código ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="uso">Uso en código</SectionTitle>
            <Desc>Los tokens de espacio funcionan en cualquier propiedad CSS que acepte una longitud.</Desc>
          </div>
          <LightCodeBlock code={codeExample} lang="css" />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
