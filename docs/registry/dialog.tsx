'use client'

import { useState } from 'react'
import { Dialog, DeleteDialog } from '@squadness/ui/dialog'
import { DialogStyles } from '@squadness/ui/dialog.styles'
import { Button } from '@squadness/ui/button'
import { Input } from '@squadness/ui/input'
import { Select } from '@squadness/ui/select'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'confirmation',       label: 'Confirmación',       level: 2 },
  { id: 'form',               label: 'Formulario',         level: 2 },
  { id: 'delete-dialog',      label: 'Barra de selección', level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

// ── Code snippets ─────────────────────────────────────────────────────────────

const confirmCode = `import { Dialog } from '@squadness/ui/dialog'

const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Eliminar filas</Button>

<Dialog
  open={open}
  title="¿Eliminar filas?"
  description="Eliminar datos es permanente y no se puede deshacer."
  variant="danger"
  cancelLabel="Cancelar"
  confirmLabel="Sí, eliminar"
  onClose={() => setOpen(false)}
  onConfirm={() => setOpen(false)}
/>`

const formCode = `import { Dialog } from '@squadness/ui/dialog'
import { Input } from '@squadness/ui/input'
import { Select } from '@squadness/ui/select'

const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Adicionar</Button>

<Dialog
  open={open}
  title="Adicionar a los baños"
  cancelLabel="Cancelar"
  confirmLabel="Agregar"
  onClose={() => setOpen(false)}
  onConfirm={() => setOpen(false)}
>
  <Input label="No. Serie" placeholder="Placeholder" />
  <Input label="Económico*" placeholder="Placeholder" />
  <Input label="Ruta*" placeholder="Placeholder" />
  <Select
    label="Estado*"
    placeholder="Seleccionar"
    options={[
      { label: 'Dañado', value: 'danado' },
      { label: 'Disponible', value: 'disponible' },
      { label: 'Servicios de almacén', value: 'almacen' },
      { label: 'Recolección', value: 'recoleccion' },
      { label: 'Suspendido', value: 'suspendido' },
      { label: 'Renta', value: 'renta' },
    ]}
  />
</Dialog>`

const deleteDialogCode = `import { DeleteDialog } from '@squadness/ui/dialog'

// Aparece al seleccionar filas en la tabla
<DeleteDialog
  selectedCount={1}
  totalCount={32}
  onSelectAll={handleSelectAll}
  onDelete={handleDelete}
/>`

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { label: 'Dañado',                value: 'danado' },
  { label: 'Disponible',            value: 'disponible' },
  { label: 'Servicios de almacén',  value: 'almacen' },
  { label: 'Recolección',           value: 'recoleccion' },
  { label: 'Suspendido',            value: 'suspendido' },
  { label: 'Renta',                 value: 'renta' },
]

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

// ── Demos ─────────────────────────────────────────────────────────────────────

function ConfirmDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Eliminar filas
      </Button>
      <Dialog
        open={open}
        title="¿Eliminar filas?"
        description="Eliminar datos es permanente y no se puede deshacer."
        variant="danger"
        cancelLabel="Cancelar"
        confirmLabel="Sí, eliminar"
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </>
  )
}

function FormDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Adicionar
      </Button>
      <Dialog
        open={open}
        title="Adicionar a los baños"
        cancelLabel="Cancelar"
        confirmLabel="Agregar"
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        <Input label="No. Serie" placeholder="Placeholder" />
        <Input label="Económico*" placeholder="Placeholder" />
        <Input label="Ruta*" placeholder="Placeholder" />
        <Select
          label="Estado*"
          placeholder="Seleccionar"
          options={STATUS_OPTIONS}
        />
      </Dialog>
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function DialogPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Dialog</h1>
          <Desc>
            Familia de componentes modales y de acción contextual. Incluye el Dialog modal
            (confirmación y formulario) y el DeleteDialog — barra compacta horizontal que aparece
            al seleccionar filas en una tabla para ejecutar acciones en bulk.
          </Desc>
        </div>

        {/* ── Ejemplos ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={confirmCode} styles={DialogStyles}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <ConfirmDemo />
              <FormDemo />
              <DeleteDialog
                selectedCount={1}
                totalCount={32}
                onSelectAll={() => {}}
                onDelete={() => {}}
              />
            </div>
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Apariencia ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>
              El panel modal tiene 448px de ancho, esquinas de 16px y overlay semitransparente.
              La barra de selección es horizontal e inline, sin overlay.
            </Desc>
          </div>

          {/* Confirmación */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="confirmation">Confirmación</SubTitle>
            <Desc>
              Para acciones destructivas o irreversibles. Usa <code>variant="danger"</code> en el
              botón de confirmación y una descripción corta que explique las consecuencias.
            </Desc>
            <ComponentPreview code={confirmCode}>
              <ConfirmDemo />
            </ComponentPreview>
          </div>

          {/* Formulario */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="form">Formulario</SubTitle>
            <Desc>
              Para capturar datos del usuario. Pasa los campos como <code>children</code> del
              Dialog — admite cualquier combinación de Input, Select u otros componentes del sistema.
            </Desc>
            <ComponentPreview code={formCode}>
              <FormDemo />
            </ComponentPreview>
          </div>

          {/* Barra de selección */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="delete-dialog">Barra de selección</SubTitle>
            <Desc>
              Barra compacta que aparece cuando el usuario selecciona una o más filas en la tabla.
              Muestra el conteo de filas seleccionadas, un botón para seleccionar todas y el botón
              Delete con ícono. Se posiciona generalmente en la parte inferior de la tabla.
            </Desc>
            <ComponentPreview code={deleteDialogCode}>
              <DeleteDialog
                selectedCount={1}
                totalCount={32}
                onSelectAll={() => {}}
                onDelete={() => {}}
              />
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
              { label: 'shadcn/ui — Dialog',  href: 'https://ui.shadcn.com/docs/components/dialog' },
              { label: 'Bootstrap — Modal',   href: 'https://getbootstrap.com/docs/5.3/components/modal/' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Guías de contenido ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para usar el Dialog y el DeleteDialog correctamente.</Desc>
          </div>
          <DoDont
            do={[
              'Usa variant="danger" con una descripción clara cuando la acción es destructiva o irreversible',
              'Limita el formulario a los campos estrictamente necesarios — mueve formularios extensos a una página dedicada',
              'Usa DeleteDialog en la tabla para acciones en bulk — siempre muestra el conteo de filas seleccionadas',
              'Conecta el botón Cancelar y el clic sobre el overlay al mismo handler onClose para un comportamiento consistente',
            ]}
            dont={[
              'No apiles dialogs modales — abre un segundo Dialog solo si es imprescindible',
              'No uses el Dialog modal para mensajes de error inline — usa Toast o mensajes de validación en el campo',
              'No omitas el botón de cierre (×) del modal — siempre debe haber una forma clara de cancelar',
              'No uses DeleteDialog fuera del contexto de tabla con filas seleccionadas — para otras acciones destructivas usa el Dialog modal',
            ]}
            note="El Dialog modal cierra al hacer clic en el overlay. La gestión del foco (focus trap) y el bloqueo del scroll deben implementarse en la capa de aplicación para cumplir con accesibilidad."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
