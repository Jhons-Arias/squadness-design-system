'use client'

import { useState } from 'react'
import { Table } from '@squadness/ui/table'
import { TableStyles } from '@squadness/ui/table.styles'
import { Badge } from '@squadness/ui/badge'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'default',            label: 'Default',            level: 2 },
  { id: 'selected',           label: 'Selected',           level: 2 },
  { id: 'expanded',           label: 'Expanded (View)',    level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]


// ── Sample data ───────────────────────────────────────────────────────────────

type SanitaryRow = {
  id: number
  code: string
  lat: string
  lng: string
  type: 'Renta' | 'Venta'
  zone: string
  phone: string
  mobile: string
  contact: string
}

const ROWS: SanitaryRow[] = [
  { id: 1, code: '0078', lat: '25.4995862', lng: '-100.955862', type: 'Renta',  zone: 'Centro',  phone: '8183781375', mobile: '8183781375', contact: 'Antonio Coronado' },
  { id: 2, code: '0082', lat: '25.5012340', lng: '-100.961234', type: 'Venta',  zone: 'Norte',   phone: '8181234567', mobile: '8181234567', contact: 'Laura Vega' },
  { id: 3, code: '0091', lat: '25.4878901', lng: '-100.948901', type: 'Renta',  zone: 'Sur',     phone: '8189876543', mobile: '8189876543', contact: 'Carlos Méndez' },
  { id: 4, code: '0105', lat: '25.5101234', lng: '-100.972345', type: 'Venta',  zone: 'Oriente', phone: '8182345678', mobile: '8182345678', contact: 'María Torres' },
]

// ── Column definitions ────────────────────────────────────────────────────────

const COLUMNS = [
  { key: 'id',   label: '#',       width: '60px' },
  { key: 'code', label: 'Código',  width: '100px' },
  { key: 'lat',  label: 'Latitud'  },
  { key: 'lng',  label: 'Longitud' },
  {
    key: 'type',
    label: 'Tipo',
    render: (val: unknown) => (
      <Badge
        label={String(val)}
        variant="neutral"
      />
    ),
  },
  { key: 'zone', label: 'Zona' },
]

// ── Expanded panel ────────────────────────────────────────────────────────────

function ExpandedPanel({ row }: { row: SanitaryRow }) {
  return (
    <div className="sq-table-expanded-panel">
      {/* Datos del cliente */}
      <div className="sq-table-expanded-section">
        <p className="sq-table-expanded-title">Datos del cliente</p>
        <div>
          <div className="sq-table-detail-row">
            <span className="sq-table-detail-label">Teléfono de contacto:</span>
            <span className="sq-table-detail-value">{row.phone}</span>
          </div>
          <div className="sq-table-detail-row">
            <span className="sq-table-detail-label">Célular de contacto:</span>
            <span className="sq-table-detail-value">{row.mobile}</span>
          </div>
          <div className="sq-table-detail-row">
            <span className="sq-table-detail-label">Contactar a:</span>
            <span className="sq-table-detail-value">{row.contact}</span>
          </div>
        </div>
      </div>

      <div className="sq-table-expanded-divider" />

      {/* Ubicación */}
      <div className="sq-table-expanded-section">
        <p className="sq-table-expanded-title">Ubicación</p>
        <div style={{
          background: '#f1f5f9',
          border: '1px solid rgba(5,21,36,0.06)',
          borderRadius: 4,
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#62748e',
          fontSize: '0.75rem',
        }}>
          {row.lat}, {row.lng}
        </div>
      </div>
    </div>
  )
}

// ── Code snippets ─────────────────────────────────────────────────────────────

const examplesCode = `import { Table } from '@squadness/ui/table'

const columns = [
  { key: 'id',   label: '#' },
  { key: 'code', label: 'Código' },
  { key: 'lat',  label: 'Latitud' },
  { key: 'lng',  label: 'Longitud' },
  { key: 'type', label: 'Tipo', render: (val) => <Badge label={val} variant="neutral" /> },
  { key: 'zone', label: 'Zona' },
]

const [selected, setSelected] = useState([])
const [expanded, setExpanded] = useState(null)

<Table
  columns={columns}
  data={rows}
  rowKey="id"
  selectable
  selectedIds={selected}
  onSelectionChange={setSelected}
  onEdit={(row) => console.log('edit', row)}
  onView={(row) => setExpanded(prev => prev === row.id ? null : row.id)}
  expandedId={expanded}
  renderExpanded={(row) => <ExpandedPanel row={row} />}
/>`

const defaultCode = `<Table
  columns={columns}
  data={rows}
  rowKey="id"
/>`

const selectedCode = `<Table
  columns={columns}
  data={rows}
  rowKey="id"
  selectable
  selectedIds={[2]}
  onSelectionChange={setSelected}
/>`

const expandedCode = `<Table
  columns={columns}
  data={rows}
  rowKey="id"
  selectable
  onView={(row) => setExpanded(row.id)}
  expandedId={3}
  renderExpanded={(row) => <ExpandedPanel row={row} />}
/>`

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

// ── Interactive demos ─────────────────────────────────────────────────────────

function ExampleDemo() {
  const [selected, setSelected] = useState<number[]>([])
  const [expanded, setExpanded] = useState<number | null>(null)

  const handleView = (row: SanitaryRow) => {
    setExpanded((prev) => (prev === row.id ? null : row.id))
  }

  return (
    <Table
      columns={COLUMNS}
      data={ROWS}
      rowKey="id"
      selectable
      selectedIds={selected}
      onSelectionChange={(ids) => setSelected(ids as number[])}
      onEdit={(row) => alert(`Editar #${row.id}`)}
      onView={handleView}
      expandedId={expanded}
      renderExpanded={(row) => <ExpandedPanel row={row} />}
    />
  )
}

function SelectedDemo() {
  const [selected, setSelected] = useState<number[]>([2])
  return (
    <Table
      columns={COLUMNS}
      data={ROWS}
      rowKey="id"
      selectable
      selectedIds={selected}
      onSelectionChange={(ids) => setSelected(ids as number[])}
      onEdit={(row) => alert(`Editar #${row.id}`)}
      onView={() => {}}
    />
  )
}

function ExpandedDemo() {
  const [expanded, setExpanded] = useState<number | null>(3)
  return (
    <Table
      columns={COLUMNS}
      data={ROWS}
      rowKey="id"
      selectable
      selectedIds={[]}
      onSelectionChange={() => {}}
      onEdit={(row) => alert(`Editar #${row.id}`)}
      onView={(row) => setExpanded((prev) => (prev === row.id ? null : row.id))}
      expandedId={expanded}
      renderExpanded={(row) => <ExpandedPanel row={row} />}
    />
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function TablePage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Table</h1>
          <Desc>
            La tabla muestra conjuntos de datos estructurados en filas y columnas. Soporta selección
            múltiple con checkboxes, botones de acción por fila y paneles expandibles con información
            adicional.
          </Desc>
        </div>

        {/* ── Ejemplos ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={200} styles={TableStyles}>
            <ExampleDemo />
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Apariencia ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>
              La tabla soporta cuatro estados visuales: Default, Hover (automático al pasar el cursor),
              Selected (fila activa con checkbox marcado) y Expanded (panel de detalles visible).
            </Desc>
          </div>

          {/* Default */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="default">Default</SubTitle>
            <Desc>
              Estado base: filas con fondo blanco, borde inferior sutil y botones de acción edit y view.
            </Desc>
            <ComponentPreview code={defaultCode} minHeight={200}>
              <Table
                columns={COLUMNS}
                data={ROWS}
                rowKey="id"
                selectable
                selectedIds={[]}
                onSelectionChange={() => {}}
                onEdit={() => {}}
                onView={() => {}}
              />
            </ComponentPreview>
          </div>

          {/* Selected */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="selected">Selected</SubTitle>
            <Desc>
              Al seleccionar una fila el fondo cambia a azul claro y el borde inferior se marca en azul.
              El checkbox muestra un estado marcado. Múltiples filas pueden seleccionarse simultáneamente.
            </Desc>
            <ComponentPreview code={selectedCode} minHeight={200}>
              <SelectedDemo />
            </ComponentPreview>
          </div>

          {/* Expanded */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="expanded">Expanded (View)</SubTitle>
            <Desc>
              Al hacer clic en el botón de vista, la fila entra al estado View: se marca con bordes azules
              superior e inferior y se despliega un panel con información adicional debajo de la fila.
            </Desc>
            <ComponentPreview code={expandedCode} minHeight={350}>
              <ExpandedDemo />
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
              { label: 'shadcn/ui — Data Table', href: 'https://ui.shadcn.com/docs/components/data-table' },
              { label: 'Bootstrap — Tables',     href: 'https://getbootstrap.com/docs/5.3/content/tables/' },
            ]}
          />
        </div>

        <Divider />

        <Divider />

        {/* ── Guías de contenido ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para configurar y usar la tabla correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Usa etiquetas de columna cortas y descriptivas — el usuario debe entender el contenido de un vistazo',
              'Combina la tabla con el componente Pagination cuando el dataset supera las 25 filas',
              'Usa renderExpanded para mostrar detalles adicionales sin abrir una nueva página',
              'Indica el número de filas seleccionadas en la interfaz cuando se usa selección múltiple',
            ]}
            dont={[
              'No incluyas más de 8 columnas visibles — fragmenta la información secundaria en el panel expandido',
              'No uses la tabla para mostrar menos de 3 registros — una lista simple es más legible',
              'No mezcles tipos de datos en una misma columna sin un render personalizado que los diferencie',
              'No omitas el rowKey — sin él la selección y expansión de filas no funcionará correctamente',
            ]}
            note="Para tablas con datos muy densos o muchas columnas, considera añadir scroll horizontal controlado con un ancho fijo por columna. Reserva las columnas de acción siempre al final de la fila para mantener la consistencia visual."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
