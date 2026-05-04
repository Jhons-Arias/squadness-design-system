import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const TOC: TocItem[] = [
  { id: 'familias',  label: 'Familias tipográficas', level: 1 },
  { id: 'headings',  label: 'Headings',              level: 1 },
  { id: 'body',      label: 'Body',                  level: 1 },
  { id: 'code',      label: 'Code',                  level: 1 },
  { id: 'uso',       label: 'Uso en código',         level: 1 },
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

// ── Typefaces ─────────────────────────────────────────────────────────────────

const TYPEFACES = [
  {
    token: 'font/family/heading',
    name: 'Pangram',
    variable: '--sq-font-heading',
    role: 'Headings',
    weights: ['Bold'],
    description: 'Exclusiva para todos los niveles de heading. Personalidad de marca, nunca usarla en body text.',
    sample: 'The quick brown fox jumps over the lazy dog',
    fontFamily: 'var(--sq-font-heading)',
    fontWeight: 700,
  },
  {
    token: 'font/family/body',
    name: 'Inter',
    variable: '--sq-font-body',
    role: 'Body & UI',
    weights: ['Regular', 'Medium', 'SemiBold', 'Bold'],
    description: 'Fuente principal para todo el contenido de interfaz: labels, body text, navegación y componentes.',
    sample: 'The quick brown fox jumps over the lazy dog',
    fontFamily: 'var(--sq-font-body)',
    fontWeight: 400,
  },
  {
    token: 'font/family/code',
    name: 'Roboto Mono',
    variable: '--sq-font-mono',
    role: 'Code & Tokens',
    weights: ['Regular'],
    description: 'Reservada para bloques de código, valores de tokens, snippets y cualquier texto técnico monoespaciado.',
    sample: 'const color = var(--sq-brand)',
    fontFamily: 'var(--sq-font-mono)',
    fontWeight: 400,
  },
]

// ── Heading scale — from Figma text styles ────────────────────────────────────

const HEADINGS = [
  { style: 'heading/xxlarge', size: 32, lineHeight: 38, weight: 700, label: 'XX Large' },
  { style: 'heading/xlarge',  size: 28, lineHeight: 32, weight: 700, label: 'X Large'  },
  { style: 'heading/large',   size: 24, lineHeight: 28, weight: 700, label: 'Large'    },
  { style: 'heading/medium',  size: 20, lineHeight: 24, weight: 700, label: 'Medium'   },
  { style: 'heading/small',   size: 16, lineHeight: 20, weight: 700, label: 'Small'    },
  { style: 'heading/xsmall',  size: 14, lineHeight: 20, weight: 700, label: 'X Small'  },
  { style: 'heading/xxsmall', size: 12, lineHeight: 16, weight: 700, label: 'XX Small' },
]

// ── Body scale — from Figma text styles ──────────────────────────────────────

const BODY_SIZES = [
  { label: 'Large',  size: 18, lineHeight: 24, key: 'large'  },
  { label: 'Medium', size: 16, lineHeight: 24, key: 'medium' },
  { label: 'Small',  size: 14, lineHeight: 20, key: 'small'  },
  { label: 'XSmall', size: 12, lineHeight: 16, key: 'xsmall' },
]

const BODY_WEIGHTS = [
  { label: 'Regular',  style: 'regular',   weight: 400 },
  { label: 'Medium',   style: 'medium',    weight: 500 },
  { label: 'SemiBold', style: 'semibold',  weight: 600 },
  { label: 'Bold',     style: 'bold',      weight: 700 },
]

// ── Code scale — from Figma text styles ──────────────────────────────────────

const CODE_SIZES = [
  { style: 'code/large',  size: 20, lineHeight: 24, label: 'Large'  },
  { style: 'code/medium', size: 16, lineHeight: 24, label: 'Medium' },
  { style: 'code/small',  size: 14, lineHeight: 20, label: 'Small'  },
  { style: 'code/xsmall', size: 12, lineHeight: 16, label: 'XSmall' },
]

// ── Code example ──────────────────────────────────────────────────────────────

const codeExample = `/* Familias */
font-family: var(--sq-font-heading); /* Pangram — solo headings  */
font-family: var(--sq-font-body);    /* Inter   — UI y body text */
font-family: var(--sq-font-mono);    /* Roboto Mono — código     */

/* Heading xxlarge */
h1 {
  font-family: var(--sq-font-heading);
  font-size: 32px;
  font-weight: 700;
  line-height: 38px;
}

/* Body large regular */
p {
  font-family: var(--sq-font-body);
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}

/* Body small semibold — labels, badges */
.label {
  font-family: var(--sq-font-body);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

/* Code medium */
code {
  font-family: var(--sq-font-mono);
  font-size: 16px;
  line-height: 24px;
}`

// ── Chip helper ───────────────────────────────────────────────────────────────

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: 11, fontFamily: 'var(--sq-font-body)',
      color: 'var(--sq-text-subtlest)',
      background: 'var(--sq-surface-default)',
      padding: '2px 8px', borderRadius: 20,
      border: '1px solid var(--sq-border-default)',
    }}>{children}</span>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function TypographyPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Foundations</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Typography</h1>
          <Desc>
            El sistema usa tres familias tipográficas con roles definidos: Pangram para headings, Inter para toda la UI y body text, y Roboto Mono para código y tokens.
          </Desc>
        </div>

        <Divider />

        {/* ── Familias tipográficas ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionTitle id="familias">Familias tipográficas</SectionTitle>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {TYPEFACES.map(tf => (
              <div key={tf.name} style={{
                border: '1px solid var(--sq-border-subtle)',
                borderRadius: 12, overflow: 'hidden',
              }}>
                {/* Preview */}
                <div style={{
                  padding: '28px 32px',
                  background: 'var(--sq-surface-default)',
                  borderBottom: '1px solid var(--sq-border-subtle)',
                }}>
                  <p style={{
                    fontFamily: tf.fontFamily,
                    fontWeight: tf.fontWeight,
                    fontSize: 28,
                    color: 'var(--sq-text-default)',
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: tf.name === 'Pangram' ? '-0.01em' : 0,
                  }}>
                    {tf.sample}
                  </p>
                </div>

                {/* Info */}
                <div style={{
                  padding: '18px 24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 20,
                  alignItems: 'start',
                }}>
                  {/* Name + token */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--sq-font-body)', fontWeight: 700, fontSize: 16, color: 'var(--sq-text-default)' }}>
                      {tf.name}
                    </span>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <code style={{
                        fontFamily: 'var(--sq-font-mono)', fontSize: 11,
                        color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                        padding: '1px 6px', borderRadius: 3,
                      }}>{tf.variable}</code>
                      <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 11, color: 'var(--sq-text-subtlest)' }}>
                        {tf.token}
                      </span>
                    </div>
                  </div>

                  {/* Role + weights */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--sq-font-body)', fontSize: 12, fontWeight: 600, color: 'var(--sq-text-subtlest)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Rol · Pesos
                    </span>
                    <span style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtle)' }}>{tf.role}</span>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {tf.weights.map(w => <Chip key={w}>{w}</Chip>)}
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtle)', lineHeight: 1.6, margin: 0 }}>
                    {tf.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Headings ─────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="headings">Headings</SectionTitle>
            <Desc>Siete niveles de encabezado, todos en Pangram Bold. Usados para títulos de página, secciones y jerarquías de contenido.</Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '140px 56px 72px 64px 1fr',
              gap: 16, padding: '6px 16px',
              borderBottom: '1px solid var(--sq-border-subtle)',
            }}>
              {['Estilo', 'Size', 'Line-h', 'Weight', 'Preview'].map(h => (
                <span key={h} style={{
                  fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.06em', color: 'var(--sq-text-subtlest)',
                  fontFamily: 'var(--sq-font-body)',
                }}>{h}</span>
              ))}
            </div>

            {HEADINGS.map(h => (
              <div key={h.style} style={{
                display: 'grid', gridTemplateColumns: '140px 56px 72px 64px 1fr',
                gap: 16, padding: '14px 16px',
                borderBottom: '1px solid var(--sq-border-default)',
                alignItems: 'center',
              }}>
                <code style={{
                  fontFamily: 'var(--sq-font-mono)', fontSize: 11,
                  color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                  padding: '2px 6px', borderRadius: 3,
                }}>{h.style}</code>
                <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 13, color: 'var(--sq-text-default)' }}>
                  {h.size}px
                </span>
                <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 13, color: 'var(--sq-text-subtlest)' }}>
                  {h.lineHeight}px
                </span>
                <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 13, color: 'var(--sq-text-subtlest)' }}>
                  {h.weight}
                </span>
                <span style={{
                  fontFamily: 'var(--sq-font-heading)',
                  fontWeight: h.weight,
                  fontSize: h.size,
                  lineHeight: `${h.lineHeight}px`,
                  color: 'var(--sq-text-default)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  Squadness Design System
                </span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="body">Body</SectionTitle>
            <Desc>Cuatro tamaños × cuatro pesos en Inter. Combinan tamaño y peso para cubrir todos los casos de UI: body text, labels, captions y elementos de alta densidad.</Desc>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--sq-font-body)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--sq-border-subtle)' }}>
                  <th style={{ padding: '6px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--sq-text-subtlest)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tamaño</th>
                  <th style={{ padding: '6px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--sq-text-subtlest)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>px / lh</th>
                  {BODY_WEIGHTS.map(w => (
                    <th key={w.label} style={{ padding: '6px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--sq-text-subtlest)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {w.label} · {w.weight}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BODY_SIZES.map(size => (
                  <tr key={size.key} style={{ borderBottom: '1px solid var(--sq-border-default)' }}>
                    <td style={{ padding: '14px 12px', verticalAlign: 'middle' }}>
                      <code style={{
                        fontFamily: 'var(--sq-font-mono)', fontSize: 11,
                        color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                        padding: '2px 6px', borderRadius: 3,
                      }}>body/{size.key}</code>
                    </td>
                    <td style={{ padding: '14px 12px', verticalAlign: 'middle' }}>
                      <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 12, color: 'var(--sq-text-subtlest)' }}>
                        {size.size}px / {size.lineHeight}px
                      </span>
                    </td>
                    {BODY_WEIGHTS.map(w => (
                      <td key={w.label} style={{ padding: '14px 12px', verticalAlign: 'middle' }}>
                        <span style={{
                          fontFamily: 'var(--sq-font-body)',
                          fontSize: size.size,
                          fontWeight: w.weight,
                          lineHeight: `${size.lineHeight}px`,
                          color: 'var(--sq-text-default)',
                          display: 'block',
                        }}>
                          Texto de ejemplo
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Divider />

        {/* ── Code ─────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="code">Code</SectionTitle>
            <Desc>Cuatro tamaños en Roboto Mono Regular. Usados en bloques de código, valores de tokens, nombres de variables y cualquier texto técnico que requiera alineación monoespaciada.</Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '140px 56px 72px 1fr',
              gap: 16, padding: '6px 16px',
              borderBottom: '1px solid var(--sq-border-subtle)',
            }}>
              {['Estilo', 'Size', 'Line-h', 'Preview'].map(h => (
                <span key={h} style={{
                  fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.06em', color: 'var(--sq-text-subtlest)',
                  fontFamily: 'var(--sq-font-body)',
                }}>{h}</span>
              ))}
            </div>

            {CODE_SIZES.map(c => (
              <div key={c.style} style={{
                display: 'grid', gridTemplateColumns: '140px 56px 72px 1fr',
                gap: 16, padding: '14px 16px',
                borderBottom: '1px solid var(--sq-border-default)',
                alignItems: 'center',
              }}>
                <code style={{
                  fontFamily: 'var(--sq-font-mono)', fontSize: 11,
                  color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                  padding: '2px 6px', borderRadius: 3,
                }}>{c.style}</code>
                <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 13, color: 'var(--sq-text-default)' }}>
                  {c.size}px
                </span>
                <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 13, color: 'var(--sq-text-subtlest)' }}>
                  {c.lineHeight}px
                </span>
                <span style={{
                  fontFamily: 'var(--sq-font-mono)',
                  fontSize: c.size,
                  lineHeight: `${c.lineHeight}px`,
                  color: 'var(--sq-text-subtle)',
                }}>
                  const color = var(--sq-brand)
                </span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Uso en código ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="uso">Uso en código</SectionTitle>
            <Desc>Los estilos tipográficos se aplican combinando la variable de familia con los valores de tamaño, peso y line-height correspondientes al estilo de Figma.</Desc>
          </div>
          <LightCodeBlock code={codeExample} lang="css" />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
