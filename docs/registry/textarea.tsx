'use client'

import * as React from 'react'
import { Textarea, TextareaStyles } from '@squadness/ui/textarea'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'state',              label: 'State',              level: 2 },
  { id: 'with-label',         label: 'With label',         level: 2 },
  { id: 'character-count',    label: 'Character count',    level: 2 },
  { id: 'resize',             label: 'Resize',             level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]


// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { Textarea } from '@squadness/ui'
import { TextareaStyles } from '@squadness/ui'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: TextareaStyles }} />

// 2. Use the component:
<Textarea placeholder="Write your message…" label="Message" />
<Textarea
  placeholder="Write your message…"
  label="Message"
  helperText="Be as detailed as possible."
/>`

const stateCode = `{/* Default */}
<Textarea placeholder="Placeholder" />

{/* Success */}
<Textarea state="success" value="Great message!" successMessage="Looks good." />

{/* Error */}
<Textarea state="error" errorMessage="Message is required." />

{/* Disabled */}
<Textarea placeholder="Placeholder" disabled />

{/* Read-only */}
<Textarea value="This content cannot be changed." readOnly />`

const withLabelCode = `{/* Label only */}
<Textarea label="Message" placeholder="Write your message…" />

{/* Label + required */}
<Textarea label="Message" required placeholder="Write your message…" />

{/* Label + helper text */}
<Textarea
  label="Bio"
  helperText="Tell us a little about yourself."
  placeholder="Write your bio…"
/>`

const charCountCode = `{/* Interactive character count */}
<Textarea
  label="Bio"
  placeholder="Write your bio…"
  maxLength={200}
  showCount
/>`

const resizeCode = `{/* No resize */}
<Textarea resize="none" placeholder="Fixed size" />

{/* Vertical only (default) */}
<Textarea resize="vertical" placeholder="Resizable vertically" />

{/* Both axes */}
<Textarea resize="both" placeholder="Fully resizable" />`

// ── Helpers ───────────────────────────────────────────────────────────────────
function Divider() {
  return <hr className="docs-divider" />
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="docs-section-title">{children}</h2>
}

function SubTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h3 id={id} className="docs-subsection-title">{children}</h3>
}

function Desc({ children }: { children: React.ReactNode }) {
  return <p className="docs-page-desc">{children}</p>
}

// ── Interactive character count demo ──────────────────────────────────────────
function CharCountDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Textarea
      label="Bio"
      placeholder="Write your bio…"
      maxLength={200}
      showCount
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function TextareaPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Textarea</h1>
          <Desc>
            Los Textareas permiten a los usuarios ingresar y editar texto de múltiples líneas. Admiten etiquetas,
            texto de ayuda, conteo de caracteres, control de redimensionamiento y estados completos de validación.
          </Desc>
        </div>

        {/* ── Examples ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={160} styles={TextareaStyles}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 400, margin: '0 auto' }}>
              <Textarea placeholder="Write your message…" label="Message" />
              <Textarea
                placeholder="Write your message…"
                label="Message"
                helperText="Be as detailed as possible."
              />
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>El Textarea soporta cinco estados, etiquetas opcionales, conteo de caracteres y control de redimensionamiento.</Desc>
          </div>

          {/* State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="state">State</SubTitle>
            <ComponentPreview code={stateCode} minHeight={400}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 400, margin: '0 auto' }}>
                <div>
                  <span style={{
                    fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 11,
                    color: 'var(--sq-text-subtlest)', display: 'block', marginBottom: 6,
                  }}>Default</span>
                  <Textarea placeholder="Placeholder" />
                </div>
                <div>
                  <span style={{
                    fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 11,
                    color: 'var(--sq-text-subtlest)', display: 'block', marginBottom: 6,
                  }}>Success</span>
                  <Textarea
                    state="success"
                    defaultValue="Great message, thank you!"
                    successMessage="Looks good."
                    readOnly
                  />
                </div>
                <div>
                  <span style={{
                    fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 11,
                    color: 'var(--sq-text-subtlest)', display: 'block', marginBottom: 6,
                  }}>Error</span>
                  <Textarea
                    state="error"
                    placeholder="Placeholder"
                    errorMessage="This field is required."
                  />
                </div>
                <div>
                  <span style={{
                    fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 11,
                    color: 'var(--sq-text-subtlest)', display: 'block', marginBottom: 6,
                  }}>Disabled</span>
                  <Textarea placeholder="Placeholder" disabled />
                </div>
                <div>
                  <span style={{
                    fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 11,
                    color: 'var(--sq-text-subtlest)', display: 'block', marginBottom: 6,
                  }}>Read-only</span>
                  <Textarea defaultValue="This content cannot be changed." readOnly />
                </div>
              </div>
            </ComponentPreview>
          </div>

          {/* With label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="with-label">With label</SubTitle>
            <ComponentPreview code={withLabelCode} minHeight={260}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 400, margin: '0 auto' }}>
                <Textarea label="Message" placeholder="Write your message…" />
                <Textarea label="Message" required placeholder="Write your message…" />
                <Textarea
                  label="Bio"
                  helperText="Tell us a little about yourself."
                  placeholder="Write your bio…"
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Character count */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="character-count">Character count</SubTitle>
            <ComponentPreview code={charCountCode} minHeight={120}>
              <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
                <CharCountDemo />
              </div>
            </ComponentPreview>
          </div>

          {/* Resize */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="resize">Resize</SubTitle>
            <ComponentPreview code={resizeCode} minHeight={280}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 400, margin: '0 auto' }}>
                {(
                  [
                    { resize: 'none',     label: 'none'     },
                    { resize: 'vertical', label: 'vertical' },
                    { resize: 'both',     label: 'both'     },
                  ] as const
                ).map(({ resize, label }) => (
                  <div key={resize}>
                    <span style={{
                      fontFamily: 'var(--sq-font-mono)', fontWeight: 700, fontSize: 11,
                      color: 'var(--sq-text-subtlest)', display: 'block', marginBottom: 6,
                    }}>
                      {label}
                    </span>
                    <Textarea resize={resize} placeholder={`resize="${label}"`} />
                  </div>
                ))}
              </div>
            </ComponentPreview>
          </div>
        </div>

        <Divider />

        {/* ── References ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="references">Referencias</SectionTitle>
            <Desc>Explora cómo otros sistemas de diseño implementan este componente.</Desc>
          </div>
          <ReferenceLinks
            links={[
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/forms/floating-labels/#textareas' },
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/textarea' },
            ]}
          />
        </div>

        <Divider />

        <Divider />

        {/* ── Content guidelines ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para escribir etiquetas, placeholders y conteos en Textareas.</Desc>
          </div>
          <DoDont
            do={[
              'Establece maxLength y showCount cuando el texto se almacenará con un límite de caracteres (ej. una bio o descripción)',
              'Usa helperText para dar orientación de formato antes de que el usuario comience a escribir',
              'Establece resize="none" cuando el layout está restringido y el tamaño del Textarea debe mantenerse fijo',
            ]}
            dont={[
              'Usar un Textarea cuando el usuario solo necesita ingresar un valor corto — usa un Input en su lugar',
              'Usar el texto placeholder como sustituto de una etiqueta — los placeholders desaparecen al enfocar',
              'Establecer resize="horizontal" en la mayoría de los casos — rompe los layouts de columna de forma inesperada',
            ]}
            note="Al usar showCount, establece siempre maxLength también — showCount lo requiere para calcular el contador. El contador se pone en rojo automáticamente cuando se alcanza el límite."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
