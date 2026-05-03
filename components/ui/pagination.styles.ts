export const PaginationStyles = `
  /* ── Container ───────────────────────────────────────────── */
  .sq-pagination {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    font-family: 'Inter', sans-serif;
  }

  /* ── Left: total count ───────────────────────────────────── */
  .sq-pagination-total {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #62748e;
    white-space: nowrap;
  }

  /* ── Right cluster ───────────────────────────────────────── */
  .sq-pagination-right {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;
    flex-wrap: wrap;
  }

  /* ── Rows per page ───────────────────────────────────────── */
  .sq-pagination-rows {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sq-pagination-label {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #314158;
    white-space: nowrap;
  }

  .sq-pagination-select-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .sq-pagination-select {
    appearance: none;
    -webkit-appearance: none;
    padding: 4px 28px 4px 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #314158;
    background: #ffffff;
    border: 1px solid rgba(5, 21, 36, 0.06);
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    transition: border-color 0.12s, box-shadow 0.12s;
  }

  .sq-pagination-select:focus {
    border-color: #005fdb;
    box-shadow: 0 0 0 3px rgba(0, 95, 219, 0.2);
  }

  .sq-pagination-select-chevron {
    position: absolute;
    right: 6px;
    pointer-events: none;
    color: #314158;
    display: flex;
    align-items: center;
  }

  /* ── Page info text ──────────────────────────────────────── */
  .sq-pagination-page-info {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #314158;
    white-space: nowrap;
  }

  /* ── Prev / Next icon buttons ────────────────────────────── */
  .sq-pagination-arrows {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sq-pagination-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid rgba(5, 21, 36, 0.06);
    background-color: #f8fafc;
    color: #314158;
    cursor: pointer;
    flex-shrink: 0;
    box-sizing: border-box;
    transition: background-color 0.12s, border-color 0.12s;
  }

  .sq-pagination-arrow:hover:not(:disabled) {
    background-color: #f1f5f9;
    border-color: rgba(5, 21, 36, 0.12);
  }

  .sq-pagination-arrow:focus-visible {
    outline: 2px solid #005fdb;
    outline-offset: 1px;
  }

  .sq-pagination-arrow:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  /* ── Page number buttons (optional) ─────────────────────── */
  .sq-pagination-pages {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

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
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #314158;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    transition: background-color 0.12s, border-color 0.12s, color 0.12s;
  }

  .sq-pagination-btn:hover:not(:disabled) {
    background-color: #e2e8f0;
    color: #020618;
  }

  .sq-pagination-btn:focus-visible {
    outline: 2px solid #005fdb;
    outline-offset: 1px;
  }

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

  .sq-pagination-dots {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    font-size: 0.75rem;
    color: #62748e;
    user-select: none;
  }
`;
