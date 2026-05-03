'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { MiniCalendar } from './date-filter-dropdown'
export { PopoverStyles } from './popover.styles'

// ─── Types ────────────────────────────────────────────────────────────────────

export type PopoverFieldType = 'text' | 'select' | 'date'

export interface PopoverOption {
  label: string
  value: string
}

export interface PopoverField {
  /** Unique key used in the values map */
  id: string
  /** Row label shown on the left */
  label: string
  /** Field rendering variant */
  type: PopoverFieldType
  /** Placeholder for text and date fields */
  placeholder?: string
  /** Options for select fields */
  options?: PopoverOption[]
  /** Whether the select dropdown includes a search box (default: true) */
  searchable?: boolean
}

export interface PopoverProps {
  /** Panel title (default: "Filtrar por") */
  title?: string
  /** Ordered list of filter fields */
  fields: PopoverField[]
  /** Controlled values map — keyed by field.id */
  values?: Record<string, string>
  /** Called on every field value change */
  onValuesChange?: (values: Record<string, string>) => void
  /** Apply button label (default: "Aplicar") */
  applyLabel?: string
  /** Called when the apply button is clicked, receives current values */
  onApply?: (values: Record<string, string>) => void
  className?: string
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M5.99973 7.52685L3.17285 4.69997L3.69973 4.1731L5.99973 6.4731L8.29973 4.1731L8.8266 4.69997L5.99973 7.52685Z"
      fill="currentColor"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M1.75 10.75V2.25001H3.34613V1.19238H4.11538V2.25001H7.90387V1.19238H8.65387V2.25001H10.25V10.75H1.75ZM2.5 10H9.5V5.15388H2.5V10Z"
      fill="currentColor"
    />
  </svg>
)

const SearchIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M10.5 10.5L7.5 7.5M8.5 5A3.5 3.5 0 1 1 1.5 5a3.5 3.5 0 0 1 7 0Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDateShort(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function parseDateString(s: string): Date | undefined {
  if (!s) return undefined
  const d = new Date(s)
  return isNaN(d.getTime()) ? undefined : d
}

// ─── TextField ────────────────────────────────────────────────────────────────

interface TextFieldProps {
  field: PopoverField
  value: string
  onChange: (value: string) => void
}

function TextField({ field, value, onChange }: TextFieldProps) {
  return (
    <div className="sq-popover-field">
      <input
        type="text"
        className="sq-popover-text-input"
        placeholder={field.placeholder ?? ''}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

// ─── DateField ────────────────────────────────────────────────────────────────

interface DateFieldProps {
  field: PopoverField
  value: string
  onChange: (value: string) => void
  rowRef: React.RefObject<HTMLDivElement>
}

function DateField({ field, value, onChange, rowRef }: DateFieldProps) {
  const [open, setOpen] = React.useState(false)
  const today = new Date()
  const selectedDate = parseDateString(value)
  const [viewYear, setViewYear] = React.useState(selectedDate?.getFullYear() ?? today.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(selectedDate?.getMonth() ?? today.getMonth())

  const displayValue = selectedDate
    ? formatDateShort(selectedDate)
    : (field.placeholder ?? 'YYYY-M-D')
  const hasValue = Boolean(selectedDate)

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => {
      if (rowRef.current && !rowRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open, rowRef])

  const handleDayClick = (date: Date) => {
    onChange(formatDateShort(date))
    setOpen(false)
  }

  return (
    <div className="sq-popover-field">
      <button
        type="button"
        className="sq-popover-date-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn(
          'sq-popover-date-value',
          hasValue ? 'sq-popover-date-value--filled' : 'sq-popover-date-value--placeholder'
        )}>
          {displayValue}
        </span>
        <span className="sq-popover-date-icon">
          <CalendarIcon />
        </span>
      </button>

      {open && (
        <div className="sq-popover-menu sq-popover-menu--calendar">
          <MiniCalendar
            viewYear={viewYear}
            viewMonth={viewMonth}
            onMonthChange={(y, m) => { setViewYear(y); setViewMonth(m) }}
            selectedDate={selectedDate}
            mode="single"
            onDayClick={handleDayClick}
            onDayHover={() => {}}
          />
        </div>
      )}
    </div>
  )
}

// ─── SelectField ──────────────────────────────────────────────────────────────

interface SelectFieldProps {
  field: PopoverField
  value: string
  onChange: (value: string) => void
  rowRef: React.RefObject<HTMLDivElement>
}

function SelectField({ field, value, onChange, rowRef }: SelectFieldProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const searchable = field.searchable !== false

  const options = field.options ?? []
  const filtered = search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options

  const selectedLabel = options.find((o) => o.value === value)?.label
  const hasValue = Boolean(selectedLabel)

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => {
      if (rowRef.current && !rowRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open, rowRef])

  const handleSelect = (optValue: string) => {
    onChange(optValue)
    setOpen(false)
    setSearch('')
  }

  return (
    <div className="sq-popover-field">
      <button
        type="button"
        className="sq-popover-select-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => {
          setOpen((v) => !v)
          setSearch('')
        }}
      >
        <span className={cn(
          'sq-popover-select-value',
          hasValue ? 'sq-popover-select-value--filled' : 'sq-popover-select-value--placeholder'
        )}>
          {selectedLabel ?? (field.placeholder ?? 'Seleccionar')}
        </span>
        <span className="sq-popover-select-icon">
          <ChevronDownIcon />
        </span>
      </button>

      {open && (
        <div className="sq-popover-menu" role="listbox">
          <div className="sq-popover-menu-inner">
            {searchable && (
              <div className="sq-popover-menu-search">
                <span className="sq-popover-menu-search-icon">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  className="sq-popover-menu-search-input"
                  placeholder="Buscar"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            <div className="sq-popover-menu-options">
              {filtered.map((opt) => (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  className={cn(
                    'sq-popover-menu-option',
                    opt.value === value && 'sq-popover-menu-option--selected'
                  )}
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.label}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="sq-popover-menu-option" style={{ color: '#62748e', cursor: 'default' }}>
                  Sin resultados
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Popover ──────────────────────────────────────────────────────────────────

/**
 * Advanced Filter Popover — compact panel with labelled filter rows.
 * Each row renders a text input, a searchable select, or a date picker
 * using the design system's MiniCalendar for visual consistency.
 *
 * @example
 * <Popover
 *   fields={[
 *     { id: 'fecha',     label: 'Fecha',     type: 'date' },
 *     { id: 'operador',  label: 'Operador',  type: 'select',
 *       options: [{ label: 'Norte', value: 'norte' }] },
 *     { id: 'consecutivo', label: 'Consecutivo', type: 'text' },
 *   ]}
 *   values={values}
 *   onValuesChange={setValues}
 *   onApply={(v) => console.log(v)}
 * />
 */
function Popover({
  title = 'Filtrar por',
  fields,
  values: controlledValues,
  onValuesChange,
  applyLabel = 'Aplicar',
  onApply,
  className,
}: PopoverProps) {
  const [internalValues, setInternalValues] = React.useState<Record<string, string>>({})
  const values = controlledValues ?? internalValues
  const rowRefs = React.useRef<Record<string, React.RefObject<HTMLDivElement>>>({})

  fields.forEach((f) => {
    if (!rowRefs.current[f.id]) {
      rowRefs.current[f.id] = React.createRef<HTMLDivElement>()
    }
  })

  const handleChange = (id: string, val: string) => {
    const next = { ...values, [id]: val }
    if (!controlledValues) setInternalValues(next)
    onValuesChange?.(next)
  }

  return (
    <div className={cn('sq-popover', className)}>
      {/* Title */}
      <p className="sq-popover-title">{title}</p>

      {/* Filter rows */}
      <div className="sq-popover-fields">
        {fields.map((field) => {
          const rowRef = rowRefs.current[field.id]
          return (
            <div key={field.id} ref={rowRef} className="sq-popover-row">
              <p className="sq-popover-row-label">{field.label}</p>

              {field.type === 'text' && (
                <TextField
                  field={field}
                  value={values[field.id] ?? ''}
                  onChange={(v) => handleChange(field.id, v)}
                />
              )}
              {field.type === 'date' && (
                <DateField
                  field={field}
                  value={values[field.id] ?? ''}
                  onChange={(v) => handleChange(field.id, v)}
                  rowRef={rowRef}
                />
              )}
              {field.type === 'select' && (
                <SelectField
                  field={field}
                  value={values[field.id] ?? ''}
                  onChange={(v) => handleChange(field.id, v)}
                  rowRef={rowRef}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Apply button */}
      <button
        type="button"
        className="sq-popover-apply"
        onClick={() => onApply?.(values)}
      >
        {applyLabel}
      </button>
    </div>
  )
}

Popover.displayName = 'Popover'

export { Popover }
