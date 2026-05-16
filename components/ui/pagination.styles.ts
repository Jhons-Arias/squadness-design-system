export const PaginationStyles = `
  /* ── Container ───────────────────────────────────────────── */
  .sq-pagination {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    font-family: var(--sq-font-body);
  }

  /* ── Left: total count ───────────────────────────────────── */
  .sq-pagination-total {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-subtlest);
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
    color: var(--sq-text-subtle);
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
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-subtle);
    background: var(--sq-surface-raised);
    border: 1px solid var(--sq-border-default);
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    transition: border-color 0.12s, box-shadow 0.12s;
  }

  .sq-pagination-select:focus {
    border-color: var(--sq-brand);
    box-shadow: 0 0 0 3px var(--sq-glow-brand);
  }

  .sq-pagination-select-chevron {
    position: absolute;
    right: 6px;
    pointer-events: none;
    color: var(--sq-text-subtle);
    display: flex;
    align-items: center;
  }

  /* ── Page info text ──────────────────────────────────────── */
  .sq-pagination-page-info {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-subtle);
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
    border: 1px solid var(--sq-border-default);
    background-color: var(--sq-surface-default);
    color: var(--sq-text-subtle);
    cursor: pointer;
    flex-shrink: 0;
    box-sizing: border-box;
    transition: background-color 0.12s, border-color 0.12s;
  }

  .sq-pagination-arrow:hover:not(:disabled) {
    background-color: var(--sq-surface-neutral-subtlest);
    border-color: var(--sq-border-bold);
  }

  .sq-pagination-arrow:focus-visible {
    outline: 2px solid var(--sq-brand);
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
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-subtle);
    background-color: transparent;
    cursor: pointer;
    outline: none;
    transition: background-color 0.12s, border-color 0.12s, color 0.12s;
  }

  .sq-pagination-btn:hover:not(:disabled) {
    background-color: var(--sq-surface-neutral-subtler);
    color: var(--sq-text-default);
  }

  .sq-pagination-btn:focus-visible {
    outline: 2px solid var(--sq-brand);
    outline-offset: 1px;
  }

  .sq-pagination-btn-current {
    background-color: var(--sq-brand);
    border-color: var(--sq-brand);
    color: var(--sq-surface-default);
    font-weight: 500;
  }

  .sq-pagination-btn-current:hover {
    background-color: var(--sq-brand-hover) !important;
    border-color: var(--sq-brand-hover) !important;
    color: var(--sq-surface-default) !important;
  }

  .sq-pagination-dots {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    font-size: 0.75rem;
    color: var(--sq-text-subtlest);
    user-select: none;
  }
`;
