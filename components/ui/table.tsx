import * as React from 'react'
import { cn } from '@/lib/utils'
export { TableStyles } from './table.styles'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableColumn<T = Record<string, unknown>> {
  /** Column identifier — maps to a key in the data row */
  key: string
  /** Column header label */
  label: string
  /** Optional fixed width (e.g. '120px') */
  width?: string
  /** Custom cell renderer */
  render?: (value: unknown, row: T) => React.ReactNode
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Column definitions */
  columns: TableColumn<T>[]
  /** Row data */
  data: T[]
  /** Key in each row used as the unique identifier */
  rowKey?: keyof T
  /** Show checkboxes and enable row selection */
  selectable?: boolean
  /** Currently selected row ids */
  selectedIds?: (string | number)[]
  /** Called when selection changes */
  onSelectionChange?: (ids: (string | number)[]) => void
  /** Called when the edit action button is clicked */
  onEdit?: (row: T) => void
  /** Called when the view/expand action button is clicked */
  onView?: (row: T) => void
  /** Id of the currently expanded row (View state) */
  expandedId?: string | number | null
  /** Content rendered inside the expanded panel */
  renderExpanded?: (row: T) => React.ReactNode
  /** Empty state message */
  emptyMessage?: string
  className?: string
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 9.49998H3.13075L8.249 4.38173L7.61825 3.75098L2.5 8.86923V9.49998ZM1.75 10.25V8.55773L8.875 1.43848L10.5539 3.1481L3.44225 10.25H1.75ZM7.92812 4.07185L7.61825 3.75098L8.249 4.38173L7.92812 4.07185Z" fill="currentColor" />
  </svg>
)

const VisibilityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M7.44454 7.19362C7.84038 6.79704 8.03829 6.31546 8.03829 5.74888C8.03829 5.18229 7.84 4.70108 7.44342 4.30525C7.04684 3.90942 6.56525 3.7115 5.99867 3.7115C5.43208 3.7115 4.95088 3.90979 4.55504 4.30638C4.15921 4.70296 3.96129 5.18454 3.96129 5.75113C3.96129 6.31771 4.15958 6.79892 4.55617 7.19475C4.95275 7.59058 5.43433 7.7885 6.00092 7.7885C6.5675 7.7885 7.04871 7.59021 7.44454 7.19362ZM5.04354 6.70625C4.78104 6.44375 4.64979 6.125 4.64979 5.75C4.64979 5.375 4.78104 5.05625 5.04354 4.79375C5.30604 4.53125 5.62479 4.4 5.99979 4.4C6.37479 4.4 6.69354 4.53125 6.95604 4.79375C7.21854 5.05625 7.34979 5.375 7.34979 5.75C7.34979 6.125 7.21854 6.44375 6.95604 6.70625C6.69354 6.96875 6.37479 7.1 5.99979 7.1C5.62479 7.1 5.30604 6.96875 5.04354 6.70625ZM2.85754 8.2985C1.91204 7.66425 1.21588 6.81475 0.769043 5.75C1.21588 4.68525 1.91179 3.83575 2.85679 3.2015C3.80188 2.56717 4.84933 2.25 5.99917 2.25C7.14892 2.25 8.19654 2.56717 9.14204 3.2015C10.0875 3.83575 10.7837 4.68525 11.2305 5.75C10.7837 6.81475 10.0878 7.66425 9.14279 8.2985C8.19771 8.93283 7.15025 9.25 6.00042 9.25C4.85067 9.25 3.80304 8.93283 2.85754 8.2985Z" fill="currentColor" />
  </svg>
)

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3.19973 9.32685L2.67285 8.79997L5.47285 5.99997L2.67285 3.19997L3.19973 2.6731L5.99973 5.4731L8.79973 2.6731L9.3266 3.19997L6.5266 5.99997L9.3266 8.79997L8.79973 9.32685L5.99973 6.52685L3.19973 9.32685Z" fill="currentColor" />
  </svg>
)

// ─── Table ────────────────────────────────────────────────────────────────────

/**
 * Data table with checkboxes, sortable columns, action buttons, and
 * expandable row panels. Supports Default, Hover, Active (selected),
 * and View (expanded) states from the Squadness design.
 *
 * @example
 * <Table
 *   columns={[{ key: 'name', label: 'Nombre' }, { key: 'status', label: 'Estado' }]}
 *   data={rows}
 *   rowKey="id"
 *   selectable
 *   onEdit={(row) => handleEdit(row)}
 *   onView={(row) => setExpanded(String(row.id))}
 *   expandedId={expanded}
 *   renderExpanded={(row) => <div>Details for {String(row.name)}</div>}
 * />
 */
function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = 'id' as keyof T,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onEdit,
  onView,
  expandedId = null,
  renderExpanded,
  emptyMessage = 'Sin resultados',
  className,
}: TableProps<T>) {
  const getId = (row: T): string | number => {
    const val = row[rowKey]
    return (val as string | number) ?? ''
  }

  const allIds = data.map(getId)
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.includes(id))
  const someSelected = allIds.some((id) => selectedIds.includes(id)) && !allSelected

  const handleSelectAll = () => {
    if (!onSelectionChange) return
    onSelectionChange(allSelected ? [] : allIds)
  }

  const handleSelectRow = (id: string | number) => {
    if (!onSelectionChange) return
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((s) => s !== id))
    } else {
      onSelectionChange([...selectedIds, id])
    }
  }

  const showActions = !!(onEdit || onView)
  const totalCols = columns.length + (selectable ? 1 : 0) + (showActions ? 1 : 0)

  return (
    <div className={cn('sq-table-wrap', className)}>
      <table className="sq-table">

        {/* ── Header ──────────────────────────────────────────── */}
        <thead className="sq-table-head">
          <tr>
            {selectable && (
              <th className="sq-table-th sq-table-th-check">
                <input
                  type="checkbox"
                  className="sq-table-checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected }}
                  onChange={handleSelectAll}
                  aria-label="Seleccionar todas las filas"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className="sq-table-th"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
            {showActions && (
              <th className="sq-table-th sq-table-th-actions">ACCIONES</th>
            )}
          </tr>
        </thead>

        {/* ── Body ────────────────────────────────────────────── */}
        <tbody>
          {data.length === 0 && (
            <tr>
              <td className="sq-table-empty" colSpan={totalCols}>
                {emptyMessage}
              </td>
            </tr>
          )}

          {data.map((row) => {
            const id = getId(row)
            const isSelected = selectedIds.includes(id)
            const isExpanded = expandedId !== null && expandedId === id

            return (
              <React.Fragment key={String(id)}>
                <tr
                  className={cn(
                    'sq-table-row',
                    isSelected && !isExpanded && 'sq-table-row--selected',
                    isExpanded && !isSelected && 'sq-table-row--expanded',
                    isExpanded && isSelected && 'sq-table-row--selected-expanded',
                  )}
                  aria-selected={isSelected}
                >
                  {/* Checkbox */}
                  {selectable && (
                    <td className="sq-table-td sq-table-td-check">
                      <input
                        type="checkbox"
                        className="sq-table-checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(id)}
                        aria-label={`Seleccionar fila ${String(id)}`}
                      />
                    </td>
                  )}

                  {/* Data cells */}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="sq-table-td"
                      style={col.width ? { width: col.width } : undefined}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? '')}
                    </td>
                  ))}

                  {/* Action buttons */}
                  {showActions && (
                    <td className="sq-table-td sq-table-td-actions">
                      <div className="sq-table-actions">
                        {onEdit && (
                          <button
                            className="sq-table-action-btn sq-table-action-btn--outline"
                            onClick={() => onEdit(row)}
                            aria-label="Editar"
                            type="button"
                          >
                            <EditIcon />
                          </button>
                        )}
                        {onView && (
                          <button
                            className={cn(
                              'sq-table-action-btn',
                              isExpanded
                                ? 'sq-table-action-btn--primary-active'
                                : 'sq-table-action-btn--primary',
                            )}
                            onClick={() => onView(row)}
                            aria-label={isExpanded ? 'Cerrar detalle' : 'Ver detalle'}
                            type="button"
                          >
                            {isExpanded ? <CloseIcon /> : <VisibilityIcon />}
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>

                {/* Expanded panel */}
                {isExpanded && renderExpanded && (
                  <tr className={cn('sq-table-expanded-row', isSelected && 'sq-table-expanded-row--selected')}>
                    <td className="sq-table-expanded-cell" colSpan={totalCols}>
                      {renderExpanded(row)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Table.displayName = 'Table'

export { Table }
