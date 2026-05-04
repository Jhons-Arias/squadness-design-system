import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const TOC: TocItem[] = [
  { id: 'primitivos',  label: 'Paleta de colores',  level: 1 },
  { id: 'brand',       label: 'Brand',              level: 1 },
  { id: 'texto',       label: 'Texto',              level: 1 },
  { id: 'superficie',  label: 'Superficie y fondo', level: 1 },
  { id: 'estado',      label: 'Estado',             level: 1 },
  { id: 'uso',         label: 'Uso en código',      level: 1 },
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

// ── Primitive palette — valores exactos de Figma ──────────────────────────────

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const PALETTE_ROWS: { family: string; shades: Record<number, string> }[] = [
  {
    family: 'Red',
    shades: {
      50:  '#feeded', 100: '#fedede', 200: '#fdbcbd', 300: '#fc9799',
      400: '#fb6d71', 500: '#fb2c36', 600: '#cf121f', 700: '#9e0b15',
      800: '#6f040c', 900: '#430204', 950: '#2c0102',
    },
  },
  {
    family: 'Orange',
    shades: {
      50:  '#fff7ed', 100: '#ffedd4', 200: '#ffd6a7', 300: '#ffb86a',
      400: '#ff8904', 500: '#ff6900', 600: '#f54a00', 700: '#ca3500',
      800: '#9f2d00', 900: '#7e2a0c', 950: '#441306',
    },
  },
  {
    family: 'Yellow',
    shades: {
      50:  '#fefce8', 100: '#fef9c2', 200: '#fff085', 300: '#ffdf20',
      400: '#fdc700', 500: '#f0b100', 600: '#d08700', 700: '#a65f00',
      800: '#894b00', 900: '#733e0a', 950: '#432004',
    },
  },
  {
    family: 'Lime',
    shades: {
      50:  '#f7fee7', 100: '#ecfcca', 200: '#d8f999', 300: '#bbf451',
      400: '#9ae600', 500: '#7ccf00', 600: '#5ea500', 700: '#497d00',
      800: '#3c6300', 900: '#35530e', 950: '#192e03',
    },
  },
  {
    family: 'Sky',
    shades: {
      50:  '#e5f8ff', 100: '#ccf1ff', 200: '#99e3ff', 300: '#66d5ff',
      400: '#32c8ff', 500: '#00b9fe', 600: '#0095cc', 700: '#006f99',
      800: '#004a66', 900: '#002533', 950: '#00131a',
    },
  },
  {
    family: 'Blue',
    shades: {
      50:  '#f8ffff', 100: '#e5f1ff', 200: '#cce2ff', 300: '#9ec8ff',
      400: '#6babff', 500: '#3d91ff', 600: '#0a74ff', 700: '#005fdb',
      800: '#0047a3', 900: '#002e6b', 950: '#031054',
    },
  },
  {
    family: 'Indigo',
    shades: {
      50:  '#eef2ff', 100: '#e0e7ff', 200: '#c6d2ff', 300: '#a3b3ff',
      400: '#7c86ff', 500: '#615fff', 600: '#4f39f6', 700: '#432dd7',
      800: '#372aac', 900: '#312c85', 950: '#1e1a4d',
    },
  },
  {
    family: 'Neutral',
    shades: {
      50:  '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cad5e2',
      400: '#90a1b9', 500: '#62748e', 600: '#45556c', 700: '#314158',
      800: '#1d293d', 900: '#0f172b', 950: '#020618',
    },
  },
]

// ── Semantic tokens ───────────────────────────────────────────────────────────

const TEXT_TOKENS = [
  {
    token: '--sq-text-default',
    hex: '#020618',
    primitive: 'neutral/950',
    label: 'Default',
    use: 'Títulos, labels, texto de alta jerarquía.',
    example: 'Heading principal',
  },
  {
    token: '--sq-text-subtle',
    hex: '#314158',
    primitive: 'neutral/700',
    label: 'Subtle',
    use: 'Body text, descripciones, contenido secundario.',
    example: 'Texto de descripción',
  },
  {
    token: '--sq-text-subtlest',
    hex: '#62748e',
    primitive: 'neutral/500',
    label: 'Subtlest',
    use: 'Placeholders, metadatos, texto deshabilitado.',
    example: 'Placeholder o hint',
  },
  {
    token: '--sq-text-inverse',
    hex: '#ffffff',
    primitive: 'neutral/50',
    label: 'Inverse',
    use: 'Texto sobre fondos oscuros o de color (ej. botón brand).',
    example: 'Label sobre brand',
  },
]

const SURFACE_TOKENS = [
  {
    token: '--sq-surface-raised',
    hex: '#ffffff',
    primitive: 'neutral/0',
    label: 'Raised',
    use: 'Fondo de página, modals y elementos que flotan sobre la superficie por defecto.',
  },
  {
    token: '--sq-surface-default',
    hex: '#f8fafc',
    primitive: 'neutral/50',
    label: 'Default',
    use: 'Fondos de cards, paneles, sidebar y áreas diferenciadas del fondo principal.',
  },
  {
    token: '--sq-surface-neutral-subtlest',
    hex: '#f1f5f9',
    primitive: 'neutral/100',
    label: 'Neutral Subtlest',
    use: 'Header de tabla, filas expandidas, fondos de secciones internas.',
  },
]

const STATUS_GROUPS = [
  {
    label: 'Success',
    tokens: [
      { token: '--sq-text-success',   hex: '#3c6300', primitive: 'lime/800', role: 'Text'   },
      { token: '--sq-border-success', hex: '#5ea500', primitive: 'lime/600', role: 'Border' },
    ],
    bg: 'rgba(94,165,0,0.07)',
    previewText: 'Cambios guardados correctamente',
    previewBorder: '#5ea500',
    previewTextColor: '#3c6300',
    previewIcon: '✓',
  },
  {
    label: 'Error',
    tokens: [
      { token: '--sq-text-error',   hex: '#6f040c', primitive: 'red/800', role: 'Text'   },
      { token: '--sq-border-error', hex: '#cf121f', primitive: 'red/600', role: 'Border' },
    ],
    bg: 'rgba(207,18,31,0.06)',
    previewText: 'No se pudo completar la acción',
    previewBorder: '#cf121f',
    previewTextColor: '#6f040c',
    previewIcon: '✗',
  },
]

// ── Code example ──────────────────────────────────────────────────────────────

const codeExample = `/* Brand — blue/700 & blue/800 */
.button-primary       { background: var(--sq-brand); }
.button-primary:hover { background: var(--sq-brand-hover); }

/* Texto — neutral/950 · neutral/700 · neutral/500 */
h1, h2, h3    { color: var(--sq-text-default); }
p, li         { color: var(--sq-text-subtle); }
::placeholder { color: var(--sq-text-subtlest); }

/* Superficie — neutral/0 & neutral/50 */
body  { background: var(--sq-surface-raised); }
.card { background: var(--sq-surface-default); }

/* Estado — lime & red primitives */
.alert-success { color: var(--sq-text-success); border-color: var(--sq-border-success); }
.alert-error   { color: var(--sq-text-error);   border-color: var(--sq-border-error);   }`

// ── Page ──────────────────────────────────────────────────────────────────────

export function ColorsPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Foundations</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Colors</h1>
          <Desc>
            El sistema define una paleta de 8 familias cromáticas y tokens semánticos que abstraen los valores con una intención de uso. Usa siempre los tokens semánticos en código; los primitivos son solo referencia visual.
          </Desc>
        </div>

        <Divider />

        {/* ── Paleta primitiva ──────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="primitivos">Paleta de colores</SectionTitle>
            <Desc>Los valores base del sistema organizados por familia cromática. No los uses directamente en código — existen tokens semánticos que los referencian con una intención clara.</Desc>
          </div>

          {/* Color table */}
          <div style={{ overflowX: 'auto' }}>
            {/* Header row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px repeat(11, 1fr)',
              gap: 6,
              marginBottom: 8,
            }}>
              <div />
              {SHADES.map(s => (
                <div key={s} style={{
                  textAlign: 'center',
                  fontFamily: 'var(--sq-font-mono)',
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--sq-text-subtlest)',
                }}>
                  {s}
                </div>
              ))}
            </div>

            {/* Family rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PALETTE_ROWS.map(row => (
                <div key={row.family} style={{
                  display: 'grid',
                  gridTemplateColumns: '80px repeat(11, 1fr)',
                  gap: 6,
                  alignItems: 'center',
                }}>
                  {/* Family label */}
                  <span style={{
                    fontFamily: 'var(--sq-font-body)',
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--sq-text-subtle)',
                    paddingRight: 8,
                  }}>
                    {row.family}
                  </span>

                  {/* Swatches */}
                  {SHADES.map(shade => {
                    const hex = row.shades[shade]
                    return (
                      <div
                        key={shade}
                        title={`${row.family.toLowerCase()}/${shade} · ${hex}`}
                        style={{
                          aspectRatio: '1',
                          borderRadius: 8,
                          background: hex,
                          border: shade <= 100 ? '1px solid var(--sq-border-subtle)' : 'none',
                          minHeight: 36,
                        }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <div style={{
            display: 'flex', gap: 10, padding: '12px 16px',
            background: 'rgba(0,95,219,0.05)',
            border: '1px solid rgba(0,95,219,0.15)',
            borderRadius: 8, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 14, flexShrink: 0, color: 'var(--sq-brand)' }}>ℹ</span>
            <p style={{
              fontFamily: 'var(--sq-font-body)', fontSize: 13,
              color: 'var(--sq-text-subtle)', lineHeight: 1.6, margin: 0,
            }}>
              No uses estos valores directamente en código. Usa siempre los <strong>tokens semánticos</strong> que los referencian para garantizar coherencia y facilitar futuros cambios de tema.
            </p>
          </div>
        </div>

        <Divider />

        {/* ── Brand ─────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="brand">Brand</SectionTitle>
            <Desc>El color de acento principal del sistema. Define la identidad visual y se aplica en acciones primarias, estados de foco y elementos interactivos destacados.</Desc>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Brand', token: '--sq-brand', hex: '#005fdb', primitive: 'blue/700', desc: 'Botones primarios, links, indicadores activos, anillo de foco.' },
              { label: 'Brand Hover', token: '--sq-brand-hover', hex: '#0047a3', primitive: 'blue/800', desc: 'Estado :hover de cualquier elemento que use el color brand.' },
            ].map(item => (
              <div key={item.token} style={{ border: '1px solid var(--sq-border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ height: 80, background: item.hex }} />
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--sq-font-body)', fontWeight: 600, fontSize: 14, color: 'var(--sq-text-default)' }}>{item.label}</span>
                    <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 11, color: 'var(--sq-text-subtlest)' }}>{item.primitive}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <code style={{
                      fontFamily: 'var(--sq-font-mono)', fontSize: 12,
                      color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                      padding: '2px 8px', borderRadius: 4,
                    }}>{item.token}</code>
                    <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 12, color: 'var(--sq-text-subtlest)' }}>{item.hex}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtle)', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Texto ─────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="texto">Texto</SectionTitle>
            <Desc>Cuatro niveles de jerarquía para el color de texto, todos derivados de la familia Neutral. La escala va de mayor a menor énfasis visual.</Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '220px 1fr 1fr',
              gap: 16, padding: '6px 16px',
              borderBottom: '1px solid var(--sq-border-subtle)',
            }}>
              {['Token', 'Uso', 'Preview'].map(h => (
                <span key={h} style={{
                  fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.06em', color: 'var(--sq-text-subtlest)',
                  fontFamily: 'var(--sq-font-body)',
                }}>{h}</span>
              ))}
            </div>

            {TEXT_TOKENS.map(row => (
              <div key={row.token} style={{
                display: 'grid', gridTemplateColumns: '220px 1fr 1fr',
                gap: 16, padding: '14px 16px', borderRadius: 8,
                alignItems: 'center',
                borderBottom: '1px solid var(--sq-border-default)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                    background: row.hex,
                    border: row.hex === '#ffffff' ? '1px solid var(--sq-border-subtle)' : 'none',
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <code style={{
                      fontFamily: 'var(--sq-font-mono)', fontSize: 11,
                      color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                      padding: '1px 5px', borderRadius: 3,
                    }}>{row.token}</code>
                    <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 10, color: 'var(--sq-text-subtlest)' }}>
                      {row.hex} · {row.primitive}
                    </span>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtle)', lineHeight: 1.5, margin: 0 }}>
                  {row.use}
                </p>
                <span style={{
                  fontFamily: 'var(--sq-font-body)', fontSize: 14,
                  fontWeight: row.label === 'Default' ? 600 : 400,
                  color: row.hex,
                  background: row.label === 'Inverse' ? '#020618' : 'transparent',
                  padding: row.label === 'Inverse' ? '4px 10px' : 0,
                  borderRadius: row.label === 'Inverse' ? 6 : 0,
                  display: 'inline-block',
                }}>
                  {row.example}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Superficie y fondo ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="superficie">Superficie y fondo</SectionTitle>
            <Desc>Los tokens de fondo crean capas de profundidad en la interfaz. Todos derivan de la escala Neutral — blanco puro (neutral/0) para el fondo base y neutral/50 para áreas diferenciadas.</Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SURFACE_TOKENS.map(row => (
              <div key={row.token} style={{
                display: 'grid', gridTemplateColumns: '260px 1fr',
                gap: 24, padding: '20px 24px',
                border: '1px solid var(--sq-border-subtle)',
                borderRadius: 12, alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 10, flexShrink: 0,
                    background: row.hex,
                    border: '1px solid var(--sq-border-subtle)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontFamily: 'var(--sq-font-body)', fontWeight: 600, fontSize: 14, color: 'var(--sq-text-default)' }}>
                      {row.label}
                    </span>
                    <code style={{
                      fontFamily: 'var(--sq-font-mono)', fontSize: 11,
                      color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                      padding: '1px 6px', borderRadius: 3,
                    }}>{row.token}</code>
                    <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 10, color: 'var(--sq-text-subtlest)' }}>
                      {row.hex} · {row.primitive}
                    </span>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 14, color: 'var(--sq-text-subtle)', lineHeight: 1.6, margin: 0 }}>
                  {row.use}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Estado ────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="estado">Estado</SectionTitle>
            <Desc>Cada estado semántico tiene dos tokens: uno para texto y otro para borde. Se usan juntos para construir mensajes de alerta, badges y validaciones.</Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {STATUS_GROUPS.map(group => (
              <div key={group.label} style={{
                border: '1px solid var(--sq-border-subtle)',
                borderRadius: 12, overflow: 'hidden',
              }}>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--sq-border-subtle)' }}>
                  <span style={{ fontFamily: 'var(--sq-font-body)', fontWeight: 600, fontSize: 14, color: 'var(--sq-text-default)' }}>
                    {group.label}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {group.tokens.map(t => (
                      <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 6, flexShrink: 0, background: t.hex }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <code style={{
                            fontFamily: 'var(--sq-font-mono)', fontSize: 11,
                            color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                            padding: '1px 6px', borderRadius: 3,
                          }}>{t.token}</code>
                          <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 10, color: 'var(--sq-text-subtlest)' }}>
                            {t.hex} · {t.primitive} · {t.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    padding: '20px 24px',
                    background: 'var(--sq-surface-default)',
                    borderLeft: '1px solid var(--sq-border-subtle)',
                    display: 'flex', alignItems: 'center',
                  }}>
                    <div style={{
                      display: 'flex', gap: 10, padding: '12px 16px',
                      background: group.bg,
                      border: `1px solid ${group.previewBorder}`,
                      borderRadius: 8, width: '100%', alignItems: 'center',
                    }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: group.previewTextColor, flexShrink: 0 }}>
                        {group.previewIcon}
                      </span>
                      <p style={{
                        fontFamily: 'var(--sq-font-body)', fontSize: 13,
                        color: group.previewTextColor, lineHeight: 1.5, margin: 0,
                      }}>
                        {group.previewText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Uso en código ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="uso">Uso en código</SectionTitle>
            <Desc>Referencia de los tokens de color más frecuentes y sus casos de uso en CSS.</Desc>
          </div>
          <LightCodeBlock code={codeExample} lang="css" />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
