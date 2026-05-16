import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const TOC: TocItem[] = [
  { id: 'escala',      label: 'Escala',            level: 1 },
  { id: 'cuando',     label: 'Cuándo usar',        level: 1 },
  { id: 'uso',        label: 'Uso en código',      level: 1 },
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

// ── Radius scale ──────────────────────────────────────────────────────────────

const SCALE = [
  {
    token: '--sq-radius-sm',
    value: '8px',
    label: 'Small',
    components: ['Button', 'Input', 'Textarea', 'Badge', 'Dropdown', 'Checkbox', 'Switch', 'Nav item'],
    description: 'Radio estándar para la mayoría de elementos interactivos y controles de formulario.',
  },
  {
    token: '--sq-radius-lg',
    value: '16px',
    label: 'Large',
    components: ['Card', 'Modal', 'Dialog', 'Popover', 'Toast', 'Panel', 'Preview box'],
    description: 'Radio mayor para contenedores y superficies flotantes que necesitan mayor suavidad.',
  },
]

// ── Usage rules ───────────────────────────────────────────────────────────────

const RULES = [
  {
    icon: '✓',
    color: 'var(--sq-text-success)',
    bg: 'rgba(94,165,0,0.07)',
    border: 'var(--sq-border-success)',
    text: 'Usa siempre uno de los dos tokens del sistema. Nunca escribas valores literales como border-radius: 6px o border-radius: 12px.',
  },
  {
    icon: '✓',
    color: 'var(--sq-text-success)',
    bg: 'rgba(94,165,0,0.07)',
    border: 'var(--sq-border-success)',
    text: 'Aplica --sq-radius-sm a controles interactivos pequeños (botones, inputs, chips) y --sq-radius-lg a superficies que contienen otros elementos.',
  },
  {
    icon: '✗',
    color: 'var(--sq-text-error)',
    bg: 'rgba(207,18,31,0.06)',
    border: 'var(--sq-border-error)',
    text: 'No mezcles radios distintos dentro del mismo componente compuesto. Un card con --sq-radius-lg no debe tener acciones internas con border-radius diferente.',
  },
]

// ── Code example ──────────────────────────────────────────────────────────────

const codeExample = `/* Controles interactivos → sq-radius-sm */
.button        { border-radius: var(--sq-radius-sm); } /* 8px */
.input         { border-radius: var(--sq-radius-sm); }
.badge         { border-radius: var(--sq-radius-sm); }
.dropdown-menu { border-radius: var(--sq-radius-sm); }

/* Contenedores y superficies → sq-radius-lg */
.card    { border-radius: var(--sq-radius-lg); } /* 16px */
.dialog  { border-radius: var(--sq-radius-lg); }
.popover { border-radius: var(--sq-radius-lg); }
.toast   { border-radius: var(--sq-radius-lg); }`

// ── Page ──────────────────────────────────────────────────────────────────────

export function RadiusPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Foundations</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Radius</h1>
          <Desc>
            El sistema define dos niveles de radio. Esta escala mínima asegura coherencia visual entre todos los componentes sin dejar espacio a variaciones arbitrarias.
          </Desc>
        </div>

        <Divider />

        {/* ── Escala ────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionTitle id="escala">Escala</SectionTitle>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {SCALE.map(item => (
              <div key={item.token} style={{
                border: '1px solid var(--sq-border-subtle)',
                borderRadius: 12,
                overflow: 'hidden',
              }}>
                {/* Visual preview */}
                <div style={{
                  padding: '32px 24px',
                  background: 'var(--sq-surface-default)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 80, height: 80,
                    borderRadius: item.value,
                    background: 'var(--sq-brand)',
                    opacity: 0.8,
                  }} />
                </div>

                {/* Info */}
                <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--sq-font-body)', fontWeight: 700, fontSize: 16, color: 'var(--sq-text-default)' }}>
                      {item.label}
                    </span>
                    <code style={{
                      fontFamily: 'var(--sq-font-mono)', fontSize: 12,
                      color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                      padding: '2px 6px', borderRadius: 4,
                    }}>{item.token}</code>
                    <span style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 13, color: 'var(--sq-text-subtlest)', marginLeft: 'auto' }}>
                      {item.value}
                    </span>
                  </div>

                  <p style={{
                    fontFamily: 'var(--sq-font-body)', fontSize: 13,
                    color: 'var(--sq-text-subtle)', lineHeight: 1.55, margin: 0,
                  }}>{item.description}</p>

                  {/* Component chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {item.components.map(c => (
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
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Cuándo usar ───────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="cuando">Cuándo usar cada uno</SectionTitle>
            <Desc>Tres reglas para mantener el uso del radio consistente en toda la interfaz.</Desc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {RULES.map((rule, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, padding: '14px 18px',
                background: rule.bg,
                border: `1px solid ${rule.border}`,
                borderRadius: 10, alignItems: 'flex-start',
              }}>
                <span style={{
                  fontFamily: 'var(--sq-font-body)', fontWeight: 700,
                  fontSize: 15, color: rule.color, flexShrink: 0, lineHeight: 1.5,
                }}>{rule.icon}</span>
                <p style={{
                  fontFamily: 'var(--sq-font-body)', fontSize: 14,
                  color: 'var(--sq-text-subtle)', lineHeight: 1.6, margin: 0,
                }}>{rule.text}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Uso en código ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="uso">Uso en código</SectionTitle>
            <Desc>Referencia de qué token corresponde a cada tipo de componente.</Desc>
          </div>
          <LightCodeBlock code={codeExample} lang="css" />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
