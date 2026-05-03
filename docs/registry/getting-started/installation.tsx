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
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-body)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  {['Herramienta', 'Versión mínima', 'Notas'].map(h => (
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
                {PREREQS.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                    <td style={{ padding: '10px 12px' }}>
                      <code style={{
                        fontFamily: 'var(--font-mono)', fontSize: 12,
                        color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)',
                        padding: '2px 6px', borderRadius: 4,
                      }}>{row.item}</code>
                    </td>
                    <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text-primary)' }}>{row.version}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--color-text-muted)' }}>{row.note}</td>
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
            <Desc>El sitio de documentación tiene sus propias dependencias dentro de la carpeta <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)' }}>docs/</code>.</Desc>
          </div>
          <LightCodeBlock code={`cd docs\nnpm install`} lang="bash" />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Esto instala Next.js, React, TypeScript, Radix UI y todas las dependencias de la documentación. Los componentes de UI en <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>../components/ui/</code> no requieren instalación separada.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>Levantar el servidor de desarrollo</p>
            <LightCodeBlock code={`npm run dev\n# http://localhost:3001`} lang="bash" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>Generar el build estático para GitHub Pages</p>
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
  /* Tipografía */
  --font-body:    'Inter', sans-serif;
  --font-heading: 'Inter', sans-serif;
  --font-mono:    'Roboto Mono', monospace;

  /* Colores de marca */
  --color-brand:       #005fdb;
  --color-brand-hover: #0047a3;

  /* Superficie */
  --color-bg:            #ffffff;
  --color-surface:       #f8fafc;
  --color-surface-white: #ffffff;

  /* Texto */
  --color-text-primary: #020618;
  --color-text-subtle:  #314158;
  --color-text-muted:   #62748e;
  --color-text-inverse: #ffffff;

  /* Espacio — escala 4px */
  --space-050:  4px;
  --space-100:  8px;
  --space-200: 16px;
  --space-300: 24px;
  --space-400: 32px;
  /* … ver Foundations → Spacing */

  /* Radio */
  --radius-sm: 8px;
  --radius-lg: 16px;
}`} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Para usar los componentes fuera del sitio docs, copia estas variables en el archivo CSS global de tu proyecto. Consulta la sección <strong style={{ color: 'var(--color-text-subtle)' }}>Foundations → Tokens</strong> para la lista completa.
          </p>
        </div>

        <Divider />

        {/* ── Alias webpack ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="alias">Alias de webpack</SectionTitle>
            <Desc>
              Los componentes no están publicados en npm — se importan mediante el alias <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-brand)' }}>@squadness/ui</code> configurado en Next.js.
            </Desc>
          </div>
          <LightCodeBlock filename="docs/next.config.mjs" lang="jsx" code={`webpack: (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    // Apunta al directorio de componentes fuera de /docs
    '@squadness/ui': path.resolve(__dirname, '../components/ui'),
  }
  return config
}`} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Si integras los componentes en otro proyecto Next.js, agrega el mismo alias en su <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>next.config.mjs</code> apuntando a la ruta correcta de <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)', padding: '1px 5px', borderRadius: 4 }}>components/ui</code>.
          </p>
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
