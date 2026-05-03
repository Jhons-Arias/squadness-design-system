'use client'

import { useState } from 'react'
import { DragDrop, type DragDropItem } from '@squadness/ui/drag-drop'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'active',             label: 'Con ítems',          level: 2 },
  { id: 'empty',              label: 'Vacío',              level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

// ── Sample data ───────────────────────────────────────────────────────────────

const INITIAL_LEFT: DragDropItem[] = [
  { id: 1,  label: 'Equipo Norte' },
  { id: 2,  label: 'Equipo Sur' },
  { id: 3,  label: 'Ruta Centro' },
  { id: 4,  label: 'Equipo Oriente' },
  { id: 5,  label: 'Ruta Express A' },
  { id: 6,  label: 'Equipo Poniente' },
  { id: 7,  label: 'Ruta Periférica' },
  { id: 8,  label: 'Equipo Especial' },
]

// ── Code snippets ─────────────────────────────────────────────────────────────

const examplesCode = `import { DragDrop } from '@squadness/ui/drag-drop'

const [available, setAvailable] = useState(items)
const [selected, setSelected] = useState([])

const transfer = (item, from, setFrom, setTo) => {
  setFrom(prev => prev.filter(i => i.id !== item.id))
  setTo(prev => [...prev, item])
}

<div style={{ display: 'flex', gap: 16 }}>
  <DragDrop
    listId="available"
    title="Disponibles"
    items={available}
    onReorder={setAvailable}
    onExternalDrop={(item) => transfer(item, 'selected', setSelected, setAvailable)}
  />
  <DragDrop
    listId="selected"
    title="Seleccionados"
    items={selected}
    onReorder={setSelected}
    onExternalDrop={(item) => transfer(item, 'available', setAvailable, setSelected)}
    emptyMessage="Arrastra ítems aquí para seleccionarlos"
  />
</div>`

const activeCode = `<DragDrop
  listId="list-a"
  title="Disponibles"
  items={items}
  onReorder={setItems}
/>`

const emptyCode = `<DragDrop
  listId="list-b"
  title="Seleccionados"
  items={[]}
  onReorder={() => {}}
  emptyMessage="Arrastra ítems aquí para seleccionarlos"
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

function PanelRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', width: '100%' }}>
      {children}
    </div>
  )
}

// ── Interactive demos ─────────────────────────────────────────────────────────

function ExampleDemo() {
  const [available, setAvailable] = useState<DragDropItem[]>(INITIAL_LEFT)
  const [selected, setSelected]   = useState<DragDropItem[]>([])

  const moveToSelected = (item: DragDropItem, _fromId: string, atIndex?: number) => {
    setAvailable(prev => prev.filter(i => i.id !== item.id))
    setSelected(prev => {
      const next = prev.filter(i => i.id !== item.id)
      if (atIndex !== undefined) next.splice(atIndex, 0, item)
      else next.push(item)
      return next
    })
  }

  const moveToAvailable = (item: DragDropItem, _fromId: string, atIndex?: number) => {
    setSelected(prev => prev.filter(i => i.id !== item.id))
    setAvailable(prev => {
      const next = prev.filter(i => i.id !== item.id)
      if (atIndex !== undefined) next.splice(atIndex, 0, item)
      else next.push(item)
      return next
    })
  }

  return (
    <PanelRow>
      <DragDrop
        listId="available"
        title="Disponibles"
        items={available}
        onReorder={setAvailable}
        onExternalDrop={moveToAvailable}
        emptyMessage="Todos los ítems fueron seleccionados"
      />
      <DragDrop
        listId="selected"
        title="Seleccionados"
        items={selected}
        onReorder={setSelected}
        onExternalDrop={moveToSelected}
        emptyMessage="Arrastra ítems aquí para seleccionarlos"
      />
    </PanelRow>
  )
}

function ActiveDemo() {
  const [items, setItems] = useState<DragDropItem[]>([
    { id: 'a', label: 'Equipo Norte' },
    { id: 'b', label: 'Ruta Centro' },
    { id: 'c', label: 'Equipo Sur' },
    { id: 'd', label: 'Ruta Express A' },
    { id: 'e', label: 'Equipo Oriente' },
  ])
  return (
    <div style={{ width: 280 }}>
      <DragDrop
        listId="active-demo"
        title="Disponibles"
        items={items}
        onReorder={setItems}
      />
    </div>
  )
}

function EmptyDemo() {
  return (
    <div style={{ width: 280 }}>
      <DragDrop
        listId="empty-demo"
        title="Seleccionados"
        items={[]}
        onReorder={() => {}}
        emptyMessage="Arrastra ítems aquí para seleccionarlos"
      />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function DragDropPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Drag & Drop</h1>
          <Desc>
            Lista de ítems ordenables con soporte para arrastrar y soltar dentro del mismo panel y
            entre dos paneles. Ideal para asignar equipos, rutas o cualquier conjunto de opciones
            entre una lista de disponibles y una de seleccionados.
          </Desc>
        </div>

        {/* ── Ejemplos ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={300}>
            <ExampleDemo />
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Apariencia ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>
              El panel tiene dos variantes visuales: con ítems visibles y estado vacío con mensaje
              de guía. Al arrastrar sobre un panel el borde se torna azul para indicar la zona de
              destino activa.
            </Desc>
          </div>

          {/* Con ítems */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="active">Con ítems</SubTitle>
            <Desc>
              Cada ítem muestra un indicador de arrastre (⠿) a la izquierda. Arrastra para reordenar
              la lista.
            </Desc>
            <ComponentPreview code={activeCode} minHeight={260}>
              <ActiveDemo />
            </ComponentPreview>
          </div>

          {/* Vacío */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="empty">Vacío</SubTitle>
            <Desc>
              Cuando no hay ítems el panel muestra un mensaje de guía centrado en el área de drop.
            </Desc>
            <ComponentPreview code={emptyCode} minHeight={200}>
              <EmptyDemo />
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
              { label: 'MDN — HTML Drag and Drop API', href: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API' },
              { label: 'Ant Design — Transfer',        href: 'https://ant.design/components/transfer' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Guías de contenido ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para configurar y usar el Drag & Drop correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Usa siempre la prop listId única por instancia — es clave para que el drag entre paneles funcione correctamente',
              'Mantén las etiquetas de ítem cortas y descriptivas — el texto se trunca con ellipsis si excede el ancho del panel',
              'Usa dos paneles (disponibles / seleccionados) para flujos de asignación — un solo panel para flujos de ordenamiento',
              'Muestra el conteo de ítems seleccionados en la interfaz cuando sea relevante para el usuario',
            ]}
            dont={[
              'No uses el Drag & Drop para listas de más de 50 ítems sin virtualización — el rendimiento puede degradarse',
              'No omitas el emptyMessage — sin él el panel vacío no da contexto al usuario sobre qué hacer',
              'No uses IDs duplicados entre ítems — causará comportamiento inesperado al reordenar o transferir',
              'No anides paneles de Drag & Drop — la interacción de arrastre se vuelve ambigua para el usuario',
            ]}
            note="El componente utiliza la API nativa de HTML5 Drag and Drop sin dependencias externas. Para casos con datasets muy grandes o requerimientos avanzados (touch, animaciones fluidas), considera integrar una librería como dnd-kit."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
