'use client'

import { useState } from 'react'
import { Pagination } from '@squadness/ui/pagination'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'default',            label: 'Default',            level: 2 },
  { id: 'with-rows',          label: 'With rows per page', level: 2 },
  { id: 'with-page-numbers',  label: 'With page numbers',  level: 2 },
  { id: 'first-last',         label: 'First / Last page',  level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

// ── Code snippets ─────────────────────────────────────────────────────────────

const examplesCode = `import { Pagination } from '@squadness/ui/pagination'
import { PaginationStyles } from '@squadness/ui/pagination.styles'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: PaginationStyles }} />

// 2. Use the component:
const [page, setPage] = useState(1)
const [rowsPerPage, setRowsPerPage] = useState(10)

<Pagination
  currentPage={page}
  totalPages={7}
  totalItems={70}
  rowsPerPage={rowsPerPage}
  onPageChange={setPage}
  showRowsPerPage
  onRowsPerPageChange={setRowsPerPage}
/>`

const withRowsCode = `<Pagination
  currentPage={page}
  totalPages={7}
  totalItems={70}
  rowsPerPage={10}
  onPageChange={setPage}
  showRowsPerPage
  onRowsPerPageChange={setRowsPerPage}
/>`

const withPageNumbersCode = `<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
  showPageNumbers
/>`

const firstLastCode = `{/* First page — prev arrow disabled */}
<Pagination currentPage={1} totalPages={7} onPageChange={() => {}} />

{/* Last page — next arrow disabled */}
<Pagination currentPage={7} totalPages={7} onPageChange={() => {}} />`

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

// ── Interactive examples ──────────────────────────────────────────────────────

function ExampleDemo() {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const totalItems = 70
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      rowsPerPage={rowsPerPage}
      onPageChange={setPage}
      showRowsPerPage
      onRowsPerPageChange={(r) => { setRowsPerPage(r); setPage(1) }}
    />
  )
}

function WithPageNumbersDemo() {
  const [page, setPage] = useState(3)
  return (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
      showPageNumbers
    />
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function PaginationPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Pagination</h1>
          <Desc>
            La paginación divide grandes conjuntos de datos en páginas manejables. Muestra el selector
            de filas por página, el rango actual y los controles de navegación anterior y siguiente.
          </Desc>
        </div>

        {/* ── Ejemplos ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={80}>
            <ExampleDemo />
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Apariencia ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>
              La paginación soporta selector de filas, números de página opcionales y
              estados deshabilitados automáticos en la primera y última página.
            </Desc>
          </div>

          {/* Default */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="default">Default</SubTitle>
            <Desc>Vista mínima: info de página y controles de navegación.</Desc>
            <ComponentPreview code={`<Pagination currentPage={1} totalPages={7} onPageChange={setPage} />`} minHeight={72}>
              <Pagination currentPage={1} totalPages={7} onPageChange={() => {}} />
            </ComponentPreview>
          </div>

          {/* With rows per page */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="with-rows">With rows per page</SubTitle>
            <Desc>
              Activa <code>showRowsPerPage</code> para mostrar el selector de filas junto
              al rango de ítems visibles.
            </Desc>
            <ComponentPreview code={withRowsCode} minHeight={72}>
              <Pagination
                currentPage={1}
                totalPages={7}
                totalItems={70}
                rowsPerPage={10}
                onPageChange={() => {}}
                showRowsPerPage
              />
            </ComponentPreview>
          </div>

          {/* With page numbers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="with-page-numbers">With page numbers</SubTitle>
            <Desc>
              Activa <code>showPageNumbers</code> para mostrar botones de página entre los controles
              de navegación. Los puntos ("…") aparecen automáticamente cuando hay muchas páginas.
            </Desc>
            <ComponentPreview code={withPageNumbersCode} minHeight={72}>
              <WithPageNumbersDemo />
            </ComponentPreview>
          </div>

          {/* First / Last page */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="first-last">First / Last page</SubTitle>
            <Desc>
              Los botones de navegación se deshabilitan automáticamente en la primera
              y última página.
            </Desc>
            <ComponentPreview code={firstLastCode} minHeight={160}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, color: 'var(--color-text-muted)', width: 48, flexShrink: 0, textAlign: 'right' }}>First</span>
                  <div style={{ flex: 1 }}>
                    <Pagination currentPage={1} totalPages={7} onPageChange={() => {}} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, color: 'var(--color-text-muted)', width: 48, flexShrink: 0, textAlign: 'right' }}>Last</span>
                  <div style={{ flex: 1 }}>
                    <Pagination currentPage={7} totalPages={7} onPageChange={() => {}} />
                  </div>
                </div>
              </div>
            </ComponentPreview>
          </div>
        </div>

        <Divider />

        {/* ── Referencias ───────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="references">Referencias</SectionTitle>
            <Desc>Explora cómo otros sistemas de diseño implementan este componente.</Desc>
          </div>
          <ReferenceLinks
            links={[
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/pagination' },
              { label: 'Bootstrap', href: 'https://getbootstrap.com/docs/5.3/components/pagination/' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Guías de contenido ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para configurar y usar la paginación correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Muestra siempre el total de ítems o el rango visible para dar contexto al usuario',
              'Usa showRowsPerPage cuando la tabla tiene densidad variable y el usuario necesita controlarla',
              'Activa showPageNumbers solo cuando el usuario necesita saltar a páginas específicas',
              'Reinicia a la página 1 cuando el usuario cambia las filas por página',
            ]}
            dont={[
              'Usar paginación para listas cortas de menos de 10 ítems — muéstralos todos directamente',
              'Ocultar la paginación cuando solo hay una página — deshabilita los controles en su lugar',
              'Usar números de página sin indicar cuántas páginas hay en total',
              'Cambiar el número de filas sin resetear la página actual — puede mostrar una página vacía',
            ]}
            note="Si el conjunto de datos es muy grande y la paginación tradicional resulta lenta, considera un scroll infinito o una carga por demanda como alternativa. La paginación es ideal cuando el usuario necesita navegar a páginas específicas o comparar resultados entre páginas."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
