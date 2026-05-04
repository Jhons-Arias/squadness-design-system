import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const TOC: TocItem[] = [
  { id: 'requisitos',  label: 'Requisitos',           level: 1 },
  { id: 'clonar',      label: 'Clonar el repositorio', level: 1 },
  { id: 'instalar',    label: 'Instalar dependencias', level: 1 },
  { id: 'tokens-css',  label: 'Tokens CSS',            level: 1 },
  { id: 'alias',       label: 'Alias de webpack',      level: 1 },
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

// ── Requisitos ────────────────────────────────────────────────────────────────

const PREREQS = [
  { item: 'Node.js',  version: '≥ 18.17',  note: 'LTS recomendado'           },
  { item: 'npm',      version: '≥ 9',       note: 'Viene con Node.js'         },
  { item: 'Git',      version: 'cualquier', note: 'Para clonar el repositorio' },
]

export function InstallationPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Getting Started</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Installation</h1>
          <Desc>
            Cómo obtener el repositorio, instalar dependencias y configurar tu entorno para trabajar con Squadness DS.
          </Desc>
        </div>

        <Divider />

        {/* ── Requisitos ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionTitle id="requisitos">Requisitos previos</SectionTitle>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--sq-font-body)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--sq-border-subtle)' }}>
                  {['Herramienta', 'Versión mínima', 'Notas'].map(h => (
                    <th key={h} style={{
                      padding: '8px 12px', textAlign: 'left',
                      fontSize: 11, fontWeight: 600,
                      color: 'var(--sq-text-subtlest)',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PREREQS.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--sq-border-default)' }}>
                    <td style={{ padding: '10px 12px' }}>
                      <code style={{
                        fontFamily: 'var(--sq-font-mono)', fontSize: 12,
                        color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)',
                        padding: '2px 6px', borderRadius: 4,
                      }}>{row.item}</code>
                    </td>
                    <td style={{ padding: '10px 12px', fontFamily: 'var(--sq-font-mono)', fontSize: 13, color: 'var(--sq-text-default)' }}>{row.version}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--sq-text-subtlest)' }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Divider />

        {/* ── Clonar ────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="clonar">Clonar el repositorio</SectionTitle>
            <Desc>El sistema de diseño vive en un único repositorio que contiene los componentes y el sitio de documentación.</Desc>
          </div>
          <LightCodeBlock code={`git clone https://github.com/tu-org/squadness-design-system.git\ncd squadness-design-system`} lang="bash" />
        </div>

        <Divider />

        {/* ── Instalar ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="instalar">Instalar dependencias</SectionTitle>
            <Desc>El sitio de documentación tiene sus propias dependencias dentro de la carpeta <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 14, color: 'var(--sq-brand)' }}>docs/</code>.</Desc>
          </div>
          <LightCodeBlock code={`cd docs\nnpm install`} lang="bash" />
          <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtlest)', lineHeight: 1.6 }}>
            Esto instala Next.js, React, TypeScript, Radix UI y todas las dependencias de la documentación. Los componentes de UI en <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 12, color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>../components/ui/</code> no requieren instalación separada.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, fontWeight: 600, color: 'var(--sq-text-default)', margin: 0 }}>Levantar el servidor de desarrollo</p>
            <LightCodeBlock code={`npm run dev\n# http://localhost:3001`} lang="bash" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, fontWeight: 600, color: 'var(--sq-text-default)', margin: 0 }}>Generar el build estático para GitHub Pages</p>
            <LightCodeBlock code={`npm run build\n# → docs/out/  (listo para desplegar)`} lang="bash" />
          </div>
        </div>

        <Divider />

        {/* ── Tokens CSS ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="tokens-css">Tokens CSS</SectionTitle>
            <Desc>Todos los tokens del sistema se declaran como CSS custom properties en el archivo global de estilos.</Desc>
          </div>
          <LightCodeBlock filename="docs/app/globals.css" lang="css" code={`:root {
  /* ── Tipografía ─────────────────────────── */
  --sq-font-body:    'Inter', sans-serif;
  --sq-font-heading: 'Inter', sans-serif;
  --sq-font-mono:    'Roboto Mono', monospace;

  /* ── Marca ──────────────────────────────── */
  --sq-brand:        #005fdb;   /* color/brand/default */
  --sq-brand-hover:  #0047a3;   /* color/brand/hover   */
  --sq-brand-active: #0a74ff;   /* color/brand/active  */

  /* ── Superficie ─────────────────────────── */
  --sq-surface-raised:           #ffffff;   /* surface/raised          */
  --sq-surface-default:          #f8fafc;   /* surface/default         */
  --sq-surface-neutral-subtlest: #f1f5f9;   /* surface/neutral/subtlest */
  --sq-surface-neutral-subtler:  #e2e8f0;   /* surface/neutral/subtler  */

  /* ── Texto ──────────────────────────────── */
  --sq-text-default:  #020618;   /* text/default  */
  --sq-text-subtle:   #314158;   /* text/subtle   */
  --sq-text-subtlest: #62748e;   /* text/subtlest */
  --sq-text-inverse:  #ffffff;   /* text/inverse  */
  --sq-text-success:  #3c6300;   /* text/semantic/success */
  --sq-text-warning:  #9f2d00;   /* text/semantic/warning */
  --sq-text-error:    #6f040c;   /* text/semantic/error   */

  /* ── Bordes ─────────────────────────────── */
  --sq-border-subtle:  rgba(11, 18, 14, 0.14);   /* border/subtle  */
  --sq-border-default: rgba(5, 21, 36, 0.06);    /* border/default */
  --sq-border-bold:    rgba(5, 21, 36, 0.12);    /* border/bold    */

  /* ── Espacio — escala 4px ───────────────── */
  --sq-space-050:  4px;
  --sq-space-100:  8px;
  --sq-space-200: 16px;
  --sq-space-300: 24px;
  --sq-space-400: 32px;
  /* … ver Foundations → Spacing */

  /* ── Radio ──────────────────────────────── */
  --sq-radius-sm:   8px;
  --sq-radius-md:  12px;
  --sq-radius-lg:  16px;
  --sq-radius-full: 9999px;
}`} />
          <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtlest)', lineHeight: 1.6 }}>
            Para usar los componentes fuera del sitio docs, copia estas variables en el archivo CSS global de tu proyecto. Consulta la sección <strong style={{ color: 'var(--sq-text-subtle)' }}>Foundations → Tokens</strong> para la lista completa.
          </p>
        </div>

        <Divider />

        {/* ── Alias webpack ─────────────────────────────────────────────────── */}
        <