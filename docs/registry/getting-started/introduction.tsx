import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const TOC: TocItem[] = [
  { id: 'que-es',      label: '¿Qué es Squadness?', level: 1 },
  { id: 'principios',  label: 'Principios',          level: 1 },
  { id: 'stack',       label: 'Stack técnico',        level: 1 },
  { id: 'estructura',  label: 'Estructura',           level: 1 },
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

// ── Principios ────────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1.5" fill="var(--color-brand)" opacity="0.9"/>
        <rect x="11" y="2" width="7" height="7" rx="1.5" fill="var(--color-brand)" opacity="0.55"/>
        <rect x="2" y="11" width="7" height="7" rx="1.5" fill="var(--color-brand)" opacity="0.55"/>
        <rect x="11" y="11" width="7" height="7" rx="1.5" fill="var(--color-brand)" opacity="0.25"/>
      </svg>
    ),
    title: 'Consistencia',
    desc: 'Cada componente sigue las mismas reglas de espaciado, color y tipografía definidas en los tokens del sistema.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="var(--color-brand)" strokeWidth="1.5" fill="none"/>
        <path d="M7 10l2 2 4-4" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Accesibilidad',
    desc: 'Los componentes interactivos están construidos sobre primitivos de Radix UI, garantizando soporte para teclado y lectores de pantalla.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10h14M10 3v14" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="3" fill="var(--color-brand)" opacity="0.2" stroke="var(--color-brand)" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Escalabilidad',
    desc: 'Tokens semánticos en CSS custom properties permiten aplicar cambios de tema globales sin tocar ningún componente.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 7l-3 3 3 3M15 7l3 3-3 3" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 4l-4 12" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    title: 'Single source of truth',
    desc: 'Variables de Figma y CSS custom properties comparten la misma nomenclatura, eliminando fricciones entre diseño y desarrollo.',
  },
]

// ── Stack ─────────────────────────────────────────────────────────────────────

const STACK = [
  { name: 'React 18',            role: 'UI rendering',          note: 'Server + Client Components' },
  { name: 'Next.js 14',          role: 'Framework docs',         note: 'Static export → GitHub Pages' },
  { name: 'TypeScript',          role: 'Tipado estático',        note: 'Strict mode' },
  { name: 'Radix UI Primitives', role: 'Accesibilidad',          note: 'Checkbox, Radio, Switch…' },
  { name: 'CSS Custom Properties',role: 'Design tokens',         note: 'Paleta, spacing, radius…' },
  { name: 'Figma Variables',     role: 'Source of design tokens', note: 'primitives + theme collections' },
]

// ── Estructura del proyecto ───────────────────────────────────────────────────

const TREE = `Squadness - Design System/
├── components/
│   └── ui/                  ← Componentes React (fuente de verdad)
│       ├── button.tsx
│       ├── button.styles.ts ← CSS-in-JS tokens por componente
│       ├── input.tsx
│       └── …
└── docs/                    ← Sitio de documentación (Next.js)
    ├── app/                 ← Rutas Next.js App Router
    ├── components/          ← Componentes del sitio docs
    ├── lib/                 ← nav.ts, utils.ts
    └── registry/            ← Páginas de cada componente/fundación`

// ── Page ──────────────────────────────────────────────────────────────────────

export function IntroductionPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Getting Started</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Introduction</h1>
          <Desc>
            Squadness Design System es la biblioteca de componentes y tokens de diseño que da coherencia visual a los productos Squadness.
          </Desc>
        </div>

        <Divider />

        {/* ── ¿Qué es? ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionTitle id="que-es">¿Qué es Squadness DS?</SectionTitle>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--color-text-subtle)' }}>
            Es un sistema de diseño construido en React que combina <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>componentes de UI</strong>, <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>tokens de diseño</strong> y <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>documentación viva</strong> en un único repositorio.
            Los tokens se definen en Figma como variables y se mapean 1:1 a CSS custom properties, de modo que diseño y código comparten el mismo lenguaje.
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
          }}>
            {[
              { num: '6', label: 'Foundations', sub: 'Tokens, Colors, Typography, Spacing, Border, Radius' },
              { num: '22+', label: 'Componentes', sub: 'Button, Input, Table, Badge y más' },
              { num: '100%', label: 'Design tokens', sub: 'Sincronizados con Figma Variables' },
            ].map(({ num, label, sub }) => (
              <div key={label} style={{
                padding: '20px 20px',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 28, fontWeight: 700, color: 'var(--color-brand)', letterSpacing: '-0.03em' }}>{num}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Principios ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionTitle id="principios">Principios de diseño</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {PRINCIPLES.map(({ icon, title, desc }) => (
              <div key={title} style={{
                display: 'flex', flexDirection: 'column', gap: 10,
                padding: '20px 20px',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div style={{
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,95,219,0.07)', borderRadius: 8,
                }}>
                  {icon}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>{title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6, color: 'var(--color-text-subtle)', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Stack ─────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="stack">Stack técnico</SectionTitle>
            <Desc>Tecnologías que componen el sistema.</Desc>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-body)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  {['Tecnología', 'Rol', 'Notas'].map(h => (
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
                {STACK.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                    <td style={{ padding: '10px 12px' }}>
                      <code style={{
                        fontFamily: 'var(--font-mono)', fontSize: 12,
                        color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)',
                        padding: '2px 6px', borderRadius: 4,
                      }}>{row.name}</code>
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--color-text-primary)', fontWeight: 500 }}>{row.role}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--color-text-muted)' }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Divider />

        {/* ── Estructura ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="estructura">Estructura del repositorio</SectionTitle>
            <Desc>El repositorio tiene dos carpetas principales: los componentes y el sitio de documentación.</Desc>
          </div>
          <LightCodeBlock code={TREE} lang="plain" />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Los componentes en <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>components/ui/</code> son importados por el sitio docs mediante el alias de webpack <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>@squadness/ui</code>, sin necesidad de publicarlos en npm.
          </p>
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
