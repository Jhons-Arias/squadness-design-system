import * as React from 'react'
import { cn } from '@/lib/utils'
export { DragDropStyles } from './drag-drop.styles'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DragDropItem {
  id: string | number
  label: string
}

/** Payload carried by dataTransfer between drag events */
interface DragPayload {
  item: DragDropItem
  fromListId: string
}

export interface DragDropProps {
  /** Title shown above the list */
  title: string
  /** Unique identifier for this list — required for cross-list drag */
  listId: string
  /** Items to render */
  items: DragDropItem[]
  /** Called when items are reordered within this list */
  onReorder: (items: DragDropItem[]) => void
  /** Called when an item is dropped from a different list */
  onExternalDrop?: (item: DragDropItem, fromListId: string, atIndex?: number) => void
  /** Placeholder when the list is empty */
  emptyMessage?: string
  className?: string
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const DragIndicatorIcon = () => (
  <svg
    className="sq-drag-handle"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="4" cy="2"  r="1" fill="currentColor" />
    <circle cx="8" cy="2"  r="1" fill="currentColor" />
    <circle cx="4" cy="6"  r="1" fill="currentColor" />
    <circle cx="8" cy="6"  r="1" fill="currentColor" />
    <circle cx="4" cy="10" r="1" fill="currentColor" />
    <circle cx="8" cy="10" r="1" fill="currentColor" />
  </svg>
)

// ─── DragDrop ─────────────────────────────────────────────────────────────────

const TRANSFER_KEY = 'application/sq-drag-drop'

/**
 * Sortable drag-and-drop list. Supports reordering within the list and
 * transferring items between two DragDrop instances.
 *
 * @example
 * // Two-panel setup managed by the parent
 * const [left, setLeft] = useState(sourceItems)
 * const [right, setRight] = useState([])
 *
 * <DragDrop
 *   listId="source"
 *   title="Disponibles"
 *   items={left}
 *   onReorder={setLeft}
 *   onExternalDrop={(item) => {
 *     setLeft(prev => [...prev, item])
 *     setRight(prev => prev.filter(i => i.id !== item.id))
 *   }}
 * />
 * <DragDrop
 *   listId="target"
 *   title="Seleccionados"
 *   items={right}
 *   onReorder={setRight}
 *   onExternalDrop={(item) => {
 *     setRight(prev => [...prev, item])
 *     setLeft(prev => prev.filter(i => i.id !== item.id))
 *   }}
 * />
 */
function DragDrop({
  title,
  listId,
  items,
  onReorder,
  onExternalDrop,
  emptyMessage = 'Selecciona un equipo o ruta para comenzar',
  className,
}: DragDropProps) {
  const [draggingId, setDraggingId] = React.useState<string | number | null>(null)
  const [overIndex, setOverIndex]   = React.useState<number | null>(null)
  const [listOver, setListOver]     = React.useState(false)

  // ── Drag source handlers ──────────────────────────────────────────────────

  const handleDragStart = (e: React.DragEvent, item: DragDropItem) => {
    const payload: DragPayload = { item, fromListId: listId }
    e.dataTransfer.setData(TRANSFER_KEY, JSON.stringify(payload))
    e.dataTransfer.effectAllowed = 'move'
    setDraggingId(item.id)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setOverIndex(null)
    setListOver(false)
  }

  // ── Drop target handlers (on individual items) ────────────────────────────

  const handleItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverIndex(index)
    setListOver(false)
  }

  const handleItemDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    e.stopPropagation()
    const raw = e.dataTransfer.getData(TRANSFER_KEY)
    if (!raw) return
    const payload: DragPayload = JSON.parse(raw)

    if (payload.fromListId === listId) {
      // ── Reorder within list ────────────────────────────────────────────────
      const oldIndex = items.findIndex(i => i.id === payload.item.id)
      if (oldIndex === -1 || oldIndex === targetIndex) return
      const next = [...items]
      next.splice(oldIndex, 1)
      next.splice(targetIndex, 0, payload.item)
      onReorder(next)
    } else {
      // ── Cross-list: insert at position ────────────────────────────────────
      onExternalDrop?.(payload.item, payload.fromListId, targetIndex)
    }
    setOverIndex(null)
    setListOver(false)
  }

  // ── Drop target handlers (on the list itself — append at end) ────────────

  const handleListDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setListOver(true)
    setOverIndex(null)
  }

  const handleListDragLeave = (e: React.DragEvent) => {
    // Only clear if leaving the list container entirely
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
      setListOver(false)
      setOverIndex(null)
    }
  }

  const handleListDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const raw = e.dataTransfer.getData(TRANSFER_KEY)
    if (!raw) return
    const payload: DragPayload = JSON.parse(raw)

    if (payload.fromListId === listId) {
      // Move to end of same list
      const oldIndex = items.findIndex(i => i.id === payload.item.id)
      if (oldIndex === -1) return
      const next = [...items]
      next.splice(oldIndex, 1)
      next.push(payload.item)
      onReorder(next)
    } else {
      // Append to end from another list
      onExternalDrop?.(payload.item, payload.fromListId)
    }
    setListOver(false)
    setOverIndex(null)
  }

  return (
    <div className={cn('sq-drag-wrap', className)}>
      <p className="sq-drag-title">{title}</p>

      <div
        className={cn('sq-drag-list', listOver && 'sq-drag-list--over')}
        onDragOver={handleListDragOver}
        onDragLeave={handleListDragLeave}
        onDrop={handleListDrop}
      >
        {items.length === 0 ? (
          <div className="sq-drag-empty">
            <p className="sq-drag-empty-text">{emptyMessage}</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'sq-drag-item',
                draggingId === item.id && 'sq-drag-item--dragging',
                overIndex === index && 'sq-drag-item--over',
              )}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleItemDragOver(e, index)}
              onDrop={(e) => handleItemDrop(e, index)}
            >
              <DragIndicatorIcon />
              <span className="sq-drag-item-label">{item.label}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

DragDrop.displayName = 'DragDrop'

export { DragDrop }
