import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationProps {
  /** Current active page (1-based). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Callback fired when a page is selected. */
  onPageChange: (page: number) => void;
  /** Max page buttons shown before collapsing to "…". */
  siblingCount?: number;
  /** Show "Rows per page" selector. */
  showRowsPerPage?: boolean;
  /** Current rows-per-page value. */
  rowsPerPage?: number;
  /** Available rows-per-page options. */
  rowsPerPageOptions?: number[];
  /** Callback for rows-per-page change. */
  onRowsPerPageChange?: (rows: number) => void;
  /** Total item count — used for "X–Y of Z" label. */
  totalItems?: number;
  className?: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── usePaginationRange ───────────────────────────────────────────────────────

function usePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "dots")[] {
  return React.useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 dots

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "dots", totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, "dots", ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
  }, [currentPage, totalPages, siblingCount]);
}

// ─── Pagination ───────────────────────────────────────────────────────────────

/**
 * Pagination component with full state support:
 * Current Page · Default Page · First/Last Disabled · Hover · Focus
 *
 * Matches the footer design from the Figma "Baños Portátiles" screen:
 * rows-per-page selector + page info + prev/next arrows.
 *
 * @example
 * <Pagination
 *   currentPage={3}
 *   totalPages={10}
 *   totalItems={97}
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
  className,
}) => {
  const range = usePaginationRange(currentPage, totalPages, siblingCount);

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  // "X–Y of Z" calculation
  const rangeStart = (currentPage - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(currentPage * rowsPerPage, totalItems ?? totalPages * rowsPerPage);

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "sq-pagination",
        "d-flex align-items-center justify-content-between flex-wrap gap-2",
        className
      )}
    >
      {/* ── Left: total count ──────────────────────────────────────── */}
      {totalItems !== undefined && (
        <span className="sq-pagination-total">
          {totalItems} resultados
        </span>
      )}

      {/* ── Right cluster ──────────────────────────────────────────── */}
      <div className="d-flex align-items-center gap-3 ms-auto">

        {/* Rows per page */}
        {showRowsPerPage && (
          <div className="d-flex align-items-center gap-2">
            <span className="sq-pagination-label">Filas por página</span>
            <div className="sq-pagination-rows-select position-relative d-flex align-items-center">
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
        {totalItems !== undefined && (
          <span className="sq-pagination-label">
            {rangeStart}–{rangeEnd} de {totalItems}
          </span>
        )}

        {/* Page buttons */}
        <ol className="sq-pagination-list list-unstyled d-flex align-items-center gap-1 m-0 p-0">
          {/* ← Prev */}
          <li>
            <button
              className={cn(
                "sq-pagination-btn sq-pagination-btn-arrow",
                isFirst && "sq-pagination-btn-disabled"
              )}
              onClick={() => !isFirst && onPageChange(currentPage - 1)}
              disabled={isFirst}
              aria-label="Previous page"
            >
              <ChevronLeftIcon />
            </button>
          </li>

          {/* Page numbers */}
          {range.map((item, idx) =>
            item === "dots" ? (
              <li key={`dots-${idx}`} aria-hidden="true">
                <span className="sq-pagination-dots">…</span>
              </li>
            ) : (
              <li key={item}>
                <button
                  className={cn(
                    "sq-pagination-btn sq-pagination-btn-page",
                    currentPage === item && "sq-pagination-btn-current"
                  )}
                  onClick={() => onPageChange(item)}
                  aria-label={`Page ${item}`}
                  aria-current={currentPage === item ? "page" : undefined}
                >
                  {item}
                </button>
              </li>
            )
          )}

          {/* → Next */}
          <li>
            <button
              className={cn(
                "sq-pagination-btn sq-pagination-btn-arrow",
                isLast && "sq-pagination-btn-disabled"
              )}
              onClick={() => !isLast && onPageChange(currentPage + 1)}
              disabled={isLast}
              aria-label="Next page"
            >
              <ChevronRightIcon />
            </button>
          </li>
        </ol>
      </div>
    </nav>
  );
};

// ─── CSS ──────────────────────────────────────────────────────────────────────

export const PaginationStyles = `
  /* ── Container ──────────────────────────────────────────── */
  .sq-pagination {
    padding: 12px 16px;
    border-top: 1px solid rgba(11, 18, 14, 0.14);
    background-color: #ffffff;
  }

  .sq-pagination-total,
  .sq-pagination-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.8125rem;
    color: #62748e;
    white-space: nowrap;
  }

  /* ── Rows-per-page select ───────────────────────────────── */
  .sq-pagination-select {
    appearance: none;
    -webkit-appearance: none;
    padding: 2px 24px 2px 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.8125rem;
    color: #314158;
    background: #ffffff;
    border: 1px solid rgba(11, 18, 14, 0.14);
    border-radius: 8px;
    cursor: pointer;
    outline: none;
  }

  .sq-pagination-select:focus {
    border-color: #005fdb;
    box-shadow: 0 0 0 3px rgba(0, 95, 219, 0.2);
  }

  .sq-pagination-select-chevron {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #62748e;
    display: flex;
  }

  /* ── Buttons ────────────────────────────────────────────── */
  .sq-pagination-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    padding: 0 4px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.8125rem;
    color: #314158;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    transition: background-color 0.12s, border-color 0.12s, color 0.12s;
  }

  .sq-pagination-btn:hover:not(:disabled) {
    background-color: #f8fafc;
    border-color: rgba(11, 18, 14, 0.14);
    color: #020618;
  }

  .sq-pagination-btn:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 95, 219, 0.3);
    border-color: #005fdb;
  }

  /* Current page */
  .sq-pagination-btn-current {
    background-color: #005fdb;
    border-color: #005fdb;
    color: #f8fafc;
    font-weight: 500;
  }

  .sq-pagination-btn-current:hover {
    background-color: #0047a3 !important;
    border-color: #0047a3 !important;
    color: #f8fafc !important;
  }

  /* Arrow buttons */
  .sq-pagination-btn-arrow {
    color: #62748e;
  }

  /* Disabled (first/last arrows) */
  .sq-pagination-btn-disabled,
  .sq-pagination-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Dots */
  .sq-pagination-dots {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    font-size: 0.875rem;
    color: #62748e;
    user-select: none;
  }
`;

export { Pagination };
