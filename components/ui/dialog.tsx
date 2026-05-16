import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './button'
export { DialogStyles } from './dialog.styles'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DialogProps {
  /** Whether the dialog is visible */
  open: boolean
  /** Dialog title */
  title: string
  /** Optional description — use for simple confirmation dialogs */
  description?: React.ReactNode
  /** Optional form content — use for form dialogs */
  children?: React.ReactNode
  /** Called when the overlay or close button is clicked */
  onClose?: () => void
  /** Left button label (default: "Cancelar") */
  cancelLabel?: string
  /** Right button label (default: "Confirmar") */
  confirmLabel?: string
  /** Called when confirm button is clicked */
  onConfirm?: () => void
  /**
   * Controls the confirm button style:
   * - "default" → primary (blue)
   * - "danger"  → danger (red)
   */
  variant?: 'default' | 'danger'
  className?: string
}

// ─── Close Icon ───────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M3.19973 9.32685L2.67285 8.79997L5.47285 5.99997L2.67285 3.19997L3.19973 2.6731L5.99973 5.4731L8.79973 2.6731L9.3266 3.19997L6.5266 5.99997L9.3266 8.79997L8.79973 9.32685L5.99973 6.52685L3.19973 9.32685Z"
      fill="currentColor"
    />
  </svg>
)

// ─── Dialog ───────────────────────────────────────────────────────────────────

/**
 * Modal dialog with two variants:
 * - Confirmation: title + description + secondary/danger buttons
 * - Form: title + form children + secondary/primary buttons
 *
 * @example
 * // Confirmation
 * <Dialog
 *   open={open}
 *   title="¿Eliminar filas?"
 *   description="Eliminar datos es permanente y no se puede deshacer."
 *   variant="danger"
 *   confirmLabel="Sí, eliminar"
 *   onClose={() => setOpen(false)}
 *   onConfirm={handleDelete}
 * />
 *
 * // Form
 * <Dialog
 *   open={open}
 *   title="Adicionar a los baños"
 *   confirmLabel="Agregar"
 *   onClose={() => setOpen(false)}
 *   onConfirm={handleSubmit}
 * >
 *   <Input label="No. Serie" placeholder="Placeholder" />
 *   <Select label="Estado*" options={options} />
 * </Dialog>
 */
function Dialog({
  open,
  title,
  description,
  children,
  onClose,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onConfirm,
  variant = 'default',
  className,
}: DialogProps) {
  if (!open) return null

  const confirmVariant = variant === 'danger' ? 'danger' : 'primary'

  return (
    <div
      className="sq-dialog-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sq-dialog-title"
    >
      <div className={cn('sq-dialog-panel', className)}>
        {/* Header */}
        <div className="sq-dialog-header">
          <div className="sq-dialog-title-row">
            <h2 id="sq-dialog-title" className="sq-dialog-title">
              {title}
            </h2>
            <button
              className="sq-dialog-close"
              onClick={onClose}
              aria-label="Cerrar"
              type="button"
            >
              <CloseIcon />
            </button>
          </div>
          {description && (
            <p className="sq-dialog-description">{description}</p>
          )}
        </div>

        {/* Body — form content */}
        {children && (
          <div className="sq-dialog-body">{children}</div>
        )}

        {/* Footer */}
        <div className="sq-dialog-footer">
          <Button variant="secondary" onClick={onClose} type="button">
            {cancelLabel}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} type="button">
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

Dialog.displayName = 'Dialog'

// ─── DeleteDialog ─────────────────────────────────────────────────────────────

export interface DeleteDialogProps {
  /** Number of currently selected rows */
  selectedCount: number
  /** Total rows available — shown in "Select all" button label */
  totalCount?: number
  /** Custom label for the "Select all" button (overrides auto-generated) */
  selectAllLabel?: string
  /** Called when "Select all" is clicked */
  onSelectAll?: () => void
  /** Label for the delete button (default: "Delete") */
  deleteLabel?: string
  /** Called when "Delete" is clicked */
  onDelete?: () => void
  className?: string
}

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M2.75 10.25V2.99999H2.25V2.24999H4.5V1.80774H7.5V2.24999H9.75V2.99999H9.25V10.25H2.75ZM3.5 9.49999H8.5V2.99999H3.5V9.49999ZM4.702 8.49999H5.45187V3.99999H4.702V8.49999ZM6.54812 8.49999H7.298V3.99999H6.54812V8.49999Z"
      fill="currentColor"
    />
  </svg>
)

/**
 * Compact selection action bar — appears when table rows are selected.
 * Shows the selected count, an optional "Select all" button, and a Delete button.
 *
 * @example
 * <DeleteDialog
 *   selectedCount={1}
 *   totalCount={32}
 *   onSelectAll={handleSelectAll}
 *   onDelete={handleDelete}
 * />
 */
function DeleteDialog({
  selectedCount,
  totalCount,
  selectAllLabel,
  onSelectAll,
  deleteLabel = 'Delete',
  onDelete,
  className,
}: DeleteDialogProps) {
  const rowLabel = selectedCount === 1 ? 'fila' : 'filas'
  const allLabel = selectAllLabel
    ?? (totalCount != null ? `Seleccionar los ${totalCount}` : 'Seleccionar todos')

  return (
    <div className={cn('sq-delete-dialog', className)} role="status">
      <div className="sq-delete-dialog-info">
        <p className="sq-delete-dialog-count">
          Se seleccionaron {selectedCount} {rowLabel}
        </p>
        {(onSelectAll || totalCount != null) && (
          <button
            className="sq-delete-dialog-select-all"
            onClick={onSelectAll}
            type="button"
          >
            {allLabel}
          </button>
        )}
      </div>

      <button
        className="sq-delete-dialog-delete"
        onClick={onDelete}
        type="button"
        aria-label={deleteLabel}
      >
        {deleteLabel}
        <DeleteIcon />
      </button>
    </div>
  )
}

DeleteDialog.displayName = 'DeleteDialog'

export { Dialog, DeleteDialog }
