import * as React from 'react'
import { cn } from '@/lib/utils'
export { PaginationStyles } from './pagination.styles'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationProps {
  /** Current active page (1-based). */
  currentPage: number
  /** Total number of pages. */
  totalPages: number
  /** Called when a page is selected. */
  onPageChange: (page: number) => void
  /** Siblings shown on each side of the current page before collapsing to "…". */
  siblingCount?: number
  /** Show the "Rows per page" selector. */
  showRowsPerPage?: boolean
  /** Current rows-per-page value. */
  rowsPerPage?: number
  /** Available rows-per-page options. */
  rowsPerPageOptions?: number[]
  /** Called when rows-per-page selection changes. */
  onRowsPerPageChange?: (rows: number) => void
  /** Total item count — enables "X–Y de Z" range label. */
  totalItems?: number
  /** Show page-number buttons between prev/next arrows. */
  showPageNumbers?: boolean
  className?: string
}

// ─── Icons (paths from /docs/public/icons) ───────────────────────────────────

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6.99973 8.82685L4.17285 5.99997L6.99973 3.1731L7.5266 3.69997L5.2266 5.99997L7.5266 8.29997L6.99973 8.82685Z" fill="currentColor" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6.47285 5.99997L4.17285 3.69997L4.69973 3.1731L7.5266 5.99997L4.69973 8.82685L4.17285 8.29997L6.47285 5.99997Z" fill="currentColor" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M5.99973 7.52685L3.17285 4.69997L3.69973 4.1731L5.99973 6.4731L8.29973 4.1731L8.8266 4.69997L5.99973 7.52685Z" fill="currentColor" />
  </svg>
)

// ─── usePaginationRange ───────────────────────────────────────────────────────

function usePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'dots')[] {
  return React.useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSiblingIndex  = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)
    const showLeftDots      = leftSiblingIndex > 2
    const showRightDots     = rightSiblingIndex < totalPages - 1

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
      return [...leftRange, 'dots', totalPages]
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      )
      return [1, 'dots', ...rightRange]
    }

    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    )
    return [1, 'dots', ...middleRange, 'dots', totalPages]
  }, [currentPage, totalPages, siblingCount])
}

// ─── Pagination ───────────────────────────────────────────────────────────────

/**
 * Pagination with rows-per-page selector, page info, and prev/next arrows.
 * Optionally shows page-number buttons between the arrows.
 *
 * @example
 * <Pagination
 *   currentPage={1}
 *   totalPages={7}
 *   totalItems={70}
 *   onPageChange={setPage}
 *   showRowsPerPage
 *   rowsPerPage={10}
 *   onRowsPerPageChange={setRowsPerPage}
 * />
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showRowsPerPage = false,
  rowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 50, 100],
  onRowsPerPageChange,
  totalItems,
  showPageNumbers = false,
  className,
}) => {
  const range = usePaginationRange(currentPage, totalPages, siblingCount)
  const isFirst = currentPage <= 1
  const isLast  = currentPage >= totalPages

  const rangeStart = (currentPage - 1) * rowsPerPage + 1
  const rangeEnd   = Math.min(currentPage * rowsPerPage, totalItems ?? totalPages * rowsPerPage)

  return (
    <nav aria-label="Pagination" className={cn('sq-pagination', className)}>

      {/* ── Total count ───────────────────────────────────────── */}
      {totalItems !== undefined && !showRowsPerPage && (
        <span className="sq-pagination-total">
          {totalItems} resultados
        </span>
      )}

      {/* ── Right cluster ─────────────────────────────────────── */}
      <div className="sq-pagination-right">

        {/* Rows per page */}
        {showRowsPerPage && (
          <div className="sq-pagination-rows">
            <span className="sq-pagination-label">Row per page</span>
            <div className="sq-pagination-select-wrap">
              <select
                value={rowsPerPage}
                onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
                className="sq-pagination-select"
                aria-label="Rows per page"
              >
                {rowsPerPageOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <span className="sq-pagination-select-chevron" aria-hidden="true">
                <ChevronDownIcon />
              </span>
            </div>
          </div>
        )}

        {/* Page info */}
        <span className="sq-pagination-page-info">
          {totalItems !== undefined
            ? `${rangeStart}–${rangeEnd} de ${totalItems}`
            : `Page ${currentPage} of ${totalPages}`}
        </span>

        {/* Page number buttons */}
        {showPageNumbers && (
          <ol className="sq-pagination-pages">
            {range.map((item, idx) =>
              item === 'dots' ? (
                <li key={`dots-${idx}`} aria-hidden="true">
                  <span className="sq-pagination-dots">…</span>
                </li>
              ) : (
                <li key={item}>
                  <button
                    className={cn(
                      'sq-pagination-btn',
                      currentPage === item && 'sq-pagination-btn-current'
                    )}
                    onClick={() => onPageChange(item)}
                    aria-label={`Page ${item}`}
                    aria-current={currentPage === item ? 'page' : undefined}
                  >
                    {item}
                  </button>
                </li>
              )
            )}
          </ol>
        )}

        {/* Prev / Next */}
        <div className="sq-pagination-arrows">
          <button
            className="sq-pagination-arrow"
            onClick={() => !isFirst && onPageChange(currentPage - 1)}
            disabled={isFirst}
            aria-label="Previous page"
            type="button"
          >
            <ChevronLeftIcon />
          </button>
          <button
            className="sq-pagination-arrow"
            onClick={() => !isLast && onPageChange(currentPage + 1)}
            disabled={isLast}
            aria-label="Next page"
            type="button"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </nav>
  )
}

Pagination.displayName = 'Pagination'

export { Pagination }
