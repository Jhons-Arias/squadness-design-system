import * as React from 'react'
import { cn } from '@/lib/utils'
export { TooltipStyles } from './tooltip.styles'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TooltipProps {
  /** Person name shown in the top row */
  name?: string
  /** Date/time string shown below the name */
  date?: string
  /** Label for the footer row (e.g. "Firmado por.") */
  signedByLabel?: string
  /** Value for the footer row */
  signedByValue?: string
  className?: string
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

/**
 * Structured tooltip card showing a name, date/time, and a labelled footer
 * (e.g. "Firmado por."). Used as an overlay in components like Card.
 *
 * @example
 * <Tooltip
 *   name="Marianne Licea"
 *   date="Junio 12, 2026 - 10:07am"
 *   signedByLabel="Firmado por."
 *   signedByValue="Admin"
 * />
 */
function Tooltip({
  name,
  date,
  signedByLabel = 'Firmado por.',
  signedByValue,
  className,
}: TooltipProps) {
  return (
    <div className={cn('sq-tooltip', className)} role="tooltip">
      {(name || date) && (
        <div className="sq-tooltip-header">
          {name && <p className="sq-tooltip-name">{name}</p>}
          {date && <p className="sq-tooltip-date">{date}</p>}
        </div>
      )}
      {signedByValue && (
        <div className="sq-tooltip-footer">
          <span className="sq-tooltip-footer-label">{signedByLabel}</span>
          <span className="sq-tooltip-footer-value">{signedByValue}</span>
        </div>
      )}
    </div>
  )
}

Tooltip.displayName = 'Tooltip'

// ─── TooltipImageMap ──────────────────────────────────────────────────────────

export interface TooltipImageMapProps {
  /**
   * Image URL(s) to display.
   * - 1 URL → single image (170×210 px)
   * - 2 URLs → double image side-by-side (170×211 px each)
   */
  images: [string] | [string, string]
  /** Called when the close (×) button is clicked */
  onClose?: () => void
  className?: string
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M3.19973 9.32685L2.67285 8.79997L5.47285 5.99997L2.67285 3.19997L3.19973 2.6731L5.99973 5.4731L8.79973 2.6731L9.3266 3.19997L6.5266 5.99997L9.3266 8.79997L8.79973 9.32685L5.99973 6.52685L3.19973 9.32685Z"
      fill="currentColor"
    />
  </svg>
)

/**
 * Image-map tooltip — shows one or two image previews with a close button
 * and a downward arrow indicator. Used to preview map/photo thumbnails on hover.
 *
 * @example
 * // Single image
 * <TooltipImageMap images={['/map-preview.jpg']} onClose={() => {}} />
 *
 * // Double image
 * <TooltipImageMap images={['/photo-a.jpg', '/photo-b.jpg']} onClose={() => {}} />
 */
function TooltipImageMap({ images, onClose, className }: TooltipImageMapProps) {
  const isDouble = images.length === 2

  return (
    <div
      className={cn(
        'sq-tooltip-image-map',
        isDouble && 'sq-tooltip-image-map--double',
        className,
      )}
      role="tooltip"
    >
      {images.map((src, i) => (
        <div key={i} className="sq-tooltip-image-map-img">
          <img src={src} alt="" />
        </div>
      ))}

      <button
        className="sq-tooltip-image-map-close"
        onClick={onClose}
        aria-label="Cerrar"
        type="button"
      >
        <CloseIcon />
      </button>
    </div>
  )
}

TooltipImageMap.displayName = 'TooltipImageMap'

export { Tooltip, TooltipImageMap }
