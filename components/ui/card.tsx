import * as React from 'react'
import { cn } from '@/lib/utils'
export { CardStyles } from './card.styles'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CardTooltip {
  /** Person name shown in the tooltip */
  name: string
  /** Date/time string */
  date: string
  /** "Firmado por" value */
  signedBy: string
}

export interface CardProps {
  /** Image URL — shows a checkerboard placeholder when omitted */
  image?: string
  /** Latitude value */
  lat?: string
  /** Longitude value */
  lng?: string
  /** Seal / Sello value */
  seal?: string
  /** Active / selected state */
  selected?: boolean
  /** Called when the checkbox is toggled */
  onSelect?: () => void
  /** Tooltip data shown on hover */
  tooltip?: CardTooltip
  className?: string
}

// ─── Card ─────────────────────────────────────────────────────────────────────

/**
 * Image card with key-value data rows, a selection checkbox, and an
 * optional tooltip revealed on hover. Supports Default, Hover, and
 * Active (selected) states from the Squadness design.
 *
 * @example
 * <Card
 *   image="/photos/unit-01.jpg"
 *   lat="25.4995862"
 *   lng="-100.955862"
 *   seal="01d9-42e7-9451-a07b"
 *   selected={selected}
 *   onSelect={() => setSelected(s => !s)}
 *   tooltip={{ name: 'Marianne Licea', date: 'Junio 12, 2026 - 10:07am', signedBy: 'Admin' }}
 * />
 */
function Card({
  image,
  lat,
  lng,
  seal,
  selected = false,
  onSelect,
  tooltip,
  className,
}: CardProps) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      className={cn('sq-card', selected && 'sq-card--selected', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ──────────────────────────────────────────── */}
      <div className="sq-card-image">
        {image ? (
          <img src={image} alt="" />
        ) : (
          <div className="sq-card-image-placeholder" />
        )}
        <div className="sq-card-image-overlay" />
      </div>

      {/* ── Info rows ──────────────────────────────────────── */}
      <div className="sq-card-info">
        <div className="sq-card-row">
          <span className="sq-card-label">Latitud:</span>
          <span className="sq-card-value sq-card-value--mono">{lat ?? '—'}</span>
        </div>
        <div className="sq-card-row">
          <span className="sq-card-label">Longitud:</span>
          <span className="sq-card-value sq-card-value--mono">{lng ?? '—'}</span>
        </div>
        <div className="sq-card-row">
          <span className="sq-card-label">Sello:</span>
          <span className="sq-card-value">{seal ?? '—'}</span>
        </div>
      </div>

      {/* ── Checkbox ───────────────────────────────────────── */}
      <div className="sq-card-checkbox-wrap">
        <input
          type="checkbox"
          className="sq-card-checkbox"
          checked={selected}
          onChange={() => onSelect?.()}
          aria-label="Seleccionar card"
        />
      </div>

      {/* ── Tooltip ────────────────────────────────────────── */}
      {tooltip && hovered && (
        <div className="sq-card-tooltip" role="tooltip">
          <div className="sq-card-tooltip-header">
            <p className="sq-card-tooltip-name">{tooltip.name}</p>
            <p className="sq-card-tooltip-date">{tooltip.date}</p>
          </div>
          <div className="sq-card-tooltip-footer">
            <span className="sq-card-tooltip-footer-label">Firmado por.</span>
            <span className="sq-card-tooltip-footer-value">{tooltip.signedBy}</span>
          </div>
        </div>
      )}
    </div>
  )
}

Card.displayName = 'Card'

export { Card }
