import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const TOC: TocItem[] = [
  { id: 'colores',      label: 'Colores de borde',   level: 1 },
  { id: 'grosor',       label: 'Grosor',             level: 1 },
  { id: 'combinaciones',label: 'Patrones comunes',   level: 1 },
  { id: 'uso',          label: 'Uso en código',      level: 1 },
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

// ── Border color data ─────────────────────────────────────────────────────────

const BORDER_COLORS = [
  {
    token: '--sq-border-subtle',
    value: 'rgba(11, 18, 14, 0.14)',
    color: 'rgba(11,18,14,0.14)',
    use: 'Separadores de sección, divisores entre items de lista, bordes de sidebar.',
    components: ['Sidebar', 'TopBar', 'Divider'],
  },
  {
    token: '--sq-border-default',
    value: 'rgba(5, 21, 36, 0.06)',
    color: 'rgba(5,21,36,0.06)',
    use: 'Fondos de estados hover, bordes suaves de cards y paneles.',
    components: ['Card', 'Dropdown', 'Nav hover'],
  },
]

// ── Pattern data ──────────────────────────────────────────────────────────────

const PATTERNS = [
  {
    name: 'Card',
    description: 'Borde sutil para separar la card del fondo sin peso visual.',
    preview: (
      <div style={{
        width: '100%', padding: '16px 20px',
        border: '1px solid rgba(11,18,14,0.14)',
        borderRadius: 8,
        background: '#fff',
        fontFamily: 'var(--sq-font-body)', fontSize: 13,
        color: 'var(--sq-text-subtle)',
      }}>
        Contenido de la card
      </div>
    ),
    code: `border: 1px solid var(--sq-border-subtle);
border-radius: var(--sq-radius-sm);`,
  },
  {
    name: 'Input',
    description: 'Borde sutil en reposo que cambia a brand en foco.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
        <input
          readOnly
          placeholder="Estado reposo"
          style={{
            width: '100%', padding: '8px 12px',
            border: '1px solid rgba(11,18,14,0.14)',
            borderRadius: 8, outline: 'none',
            fontFamily: 'var(--sq-font-body)', fontSize: 13,
            color: 'var(--sq-text-subtlest)',
            background: '#fff',
          }}
        />
        <input
          readOnly
          placeholder="Estado foco"
          style={{
            width: '100%', padding: '8px 12px',
            border: '1px solid #005fdb',
            borderRadius: 8,
            outline: '3px solid rgba(0,95,219,0.15)',
            outlineOffset: 0,
            fontFamily: 'var(--sq-font-body)', fontSize: 13,
            color: 'var(--sq-text-default)',
            background: '#fff',
          }}
        />
      </div>
    ),
    code: `/* Reposo */
border: 1px solid var(--sq-border-subtle);

/* Foco (accesibilidad) */
border-color: var(--sq-brand);
outline: 3px solid rgba(0, 95, 219, 0.15);`,
  },
  {
    name: 'Divider',
    description: 'Línea horizontal para separar secciones de contenido.',
    preview: (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtle)' }}>Sección A</span>
        <hr style={{ border: 'none', borderTop: '1px solid rgba(11,18,14,0.14)', width: '100%' }} />
        <span style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtle)' }}>Sección B</span>
      </div>
    ),
    code: `border: none;
border-top: 1px solid var(--sq-border-subtle);`,
  },
]

// ── Code example ──────────────────────────────────────────────────────────────

const codeExample = `/* Separador de sección */
.divider {
  border-top: 1px solid var(--sq-border-subtle);
}

/* Card */
.card {
  border: 1px solid var(--sq-border-subtle);
  border-radius: var(--sq-radius-sm);
}

/* Input — reposo y foco */
.input {
  border: 1px solid var(--sq-border-subtle);
}
.input:focus {
  border-color: var(--sq-brand);
  outline: 3px solid rgba(0, 95, 219, 0.15);
}

/* Hover con fondo */
.nav-item:hover {
  background: var(--sq-border-default);
}`

// ── Page ──────────────────────────────────────────────────────────────────────

export function BorderPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Foundations</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Border</h1>
          <Desc>
            El sistema usa dos colores de borde semánticos y un único grosor de 1px en todos los componentes. Esta consistencia mantiene la UI limpia y con bajo peso visual.
          </Desc>
        </div>

        <Divider />

        {/* ── Colores de borde ──────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="colores">Colores de borde</SectionTitle>
            <Desc>Ambos tokens son colores con canal alpha, lo que les permite adaptarse a fondos de cualquier color sin perder su sutil presencia.</Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {BORDER_COLORS.map(row => (
              <div key={row.token} style={{
                display: 'grid', gridTemplateColumns: '260px 1fr',
                gap: 24, padding: '20px 24px',
                border: '1px solid var(--sq-border-subtle)',
                borderRadius: 12, alignItems: 'start',
              }}>
                {/* Left: token info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                      border: `3px solid ${row.color}`,
                      background: '#fff',
                    }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <code style={{
                        fontFamily: 'var(--sq-font-mono)', fontSize: 12,
                        color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                        padding: '2px 6px', borderRadius: 4,
                      }}>{row.token}</code>
                      <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 11, color: 'var(--sq-text-subtlest)' }}>
                        {row.value}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {row.components.map(c => (
                      <span key={c} style={{
                        fontSize: 11, fontFamily: 'var(--sq-font-body)',
                        color: 'var(--sq-text-subtlest)',
                        background: 'var(--sq-surface-default)',
                        padding: '2px 8px', borderRadius: 20,
                        border: '1px solid var(--sq-border-default)',
                      }}>{c}</span>
                    ))}
                  </div>
                </div>

                {/* Right: description */}
                <p style={{
                  fontFamily: 'var(--sq-font-body)', fontSize: 14,
                  color: 'var(--sq-text-subtle)', lineHeight: 1.6,
                  margin: 0,
                }}>{row.use}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Grosor ────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="grosor">Grosor</SectionTitle>
            <Desc>
              El sistema usa exclusivamente <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 15, color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 6px', borderRadius: 4 }}>1px</code> en todos los bordes. Para el anillo de foco (accesibilidad) se usa <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 15, color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 6px', borderRadius: 4 }}>outline: 3px</code> en lugar de border para no alterar el layout.
            </Desc>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* border 1px */}
            <div style={{
              padding: '20px 24px', borderRadius: 12,
              border: '1px solid var(--sq-border-subtle)',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, border: '1px solid rgba(11,18,14,0.14)', background: '#fff' }} />
                <div>
                  <p style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 12, color: 'var(--sq-brand)', margin: 0 }}>border: 1px</p>
                  <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 12, color: 'var(--sq-text-subtlest)', margin: '2px 0 0' }}>Separación y contenedores</p>
                </div>
              </div>
            </div>
            {/* outline 3px */}
            <div style={{
              padding: '20px 24px', borderRadius: 12,
              border: '1px solid var(--sq-border-subtle)',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, border: '1px solid #005fdb', outline: '3px solid rgba(0,95,219,0.2)', background: '#fff' }} />
                <div>
                  <p style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 12, color: 'var(--sq-brand)', margin: 0 }}>outline: 3px</p>
                  <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 12, color: 'var(--sq-text-subtlest)', margin: '2px 0 0' }}>Foco — accesibilidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* ── Patrones comunes ──────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="combinaciones">Patrones comunes</SectionTitle>
            <Desc>Los tres patrones de borde más frecuentes en los componentes del sistema.</Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PATTERNS.map(p => (
              <div key={p.name} style={{
                border: '1px solid var(--sq-border-subtle)',
                borderRadius: 12, overflow: 'hidden',
              }}>
                {/* Header */}
                <div style={{
                  padding: '12px 20px',
                  borderBottom: '1px solid var(--sq-border-subtle)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontFamily: 'var(--sq-font-body)', fontWeight: 600, fontSize: 14, color: 'var(--sq-text-default)' }}>{p.name}</span>
                  <span style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtlest)' }}>{p.description}</span>
                </div>
                {/* Preview */}
                <div style={{ padding: '24px 20px', background: 'var(--sq-surface-default)' }}>
                  {p.preview}
                </div>
                {/* Code */}
                <LightCodeBlock code={p.code} lang="css" embedded />
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Uso en código ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="uso">Uso en código</SectionTitle>
            <Desc>Referencia completa de los patrones de borde del sistema.</Desc>
          </div>
          <LightCodeBlock code={codeExample} lang="css" />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
