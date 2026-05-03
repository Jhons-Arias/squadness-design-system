export const TableStyles = `
  /* ── Wrapper ─────────────────────────────────────────────── */
  .sq-table-wrap {
    width: 100%;
    overflow-x: auto;
    font-family: 'Inter', sans-serif;
  }

  .sq-table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
  }

  /* ── Header ──────────────────────────────────────────────── */
  .sq-table-head {
    background: #f1f5f9;
    border-bottom: 1px solid rgba(5, 21, 36, 0.06);
  }

  .sq-table-th {
    padding: 12px 16px;
    min-height: 46px;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: #020618;
    text-align: left;
    white-space: nowrap;
    background: #f1f5f9;
    text-transform: uppercase;
  }

  .sq-table-th-check {
    width: 48px;
    padding: 12px 16px;
  }

  .sq-table-th-actions {
    width: 115px;
    padding: 12px 16px;
  }

  /* Header checkbox — bolder border per design */
  .sq-table-head .sq-table-checkbox {
    border-color: #62748e;
  }

  .sq-table-head .sq-table-checkbox:checked {
    border-color: #005fdb;
  }

  /* ── Body rows ───────────────────────────────────────────── */
  .sq-table-row {
    height: 44px;
    background: #ffffff;
    transition: background-color 0.1s;
  }

  /* Alternating stripes: odd = surface/raised (#fff), even = surface/default (#f8fafc) */
  .sq-table-row:nth-child(even) {
    background: #f8fafc;
  }

  .sq-table-row:hover:not(.sq-table-row--expanded):not(.sq-table-row--selected) {
    background: #e5f1ff; /* surface/accent/blue/subtlest */
  }

  .sq-table-row--selected,
  .sq-table-row--selected:nth-child(even),
  .sq-table-row--selected:nth-child(odd),
  .sq-table-row--selected:hover {
    background: #e5f1ff;
    border-bottom: 1px solid #0a74ff;
  }

  /* Selected + expanded: no bottom border so the row flows into the panel */
  .sq-table-row--selected-expanded,
  .sq-table-row--selected-expanded:nth-child(even),
  .sq-table-row--selected-expanded:nth-child(odd),
  .sq-table-row--selected-expanded:hover {
    background: #e5f1ff;
    border-bottom: none;
  }

  .sq-table-row--expanded,
  .sq-table-row--expanded:nth-child(even),
  .sq-table-row--expanded:nth-child(odd),
  .sq-table-row--expanded:hover {
    background: #f1f5f9;
    border-top: 1px solid #005fdb;
    border-bottom: none;
  }

  /* ── Cells ───────────────────────────────────────────────── */
  .sq-table-td {
    padding: 8px 16px;
    height: 44px;
    max-height: 44px;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: #314158;
    white-space: nowrap;
    vertical-align: middle;
  }

  .sq-table-td-check {
    width: 48px;
    padding: 8px 16px;
    vertical-align: middle;
  }

  .sq-table-td-actions {
    width: 115px;
    padding: 8px 16px;
    vertical-align: middle;
  }

  /* ── Checkbox ────────────────────────────────────────────── */
  .sq-table-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1.5px solid rgba(11, 18, 14, 0.14);
    background: #ffffff;
    cursor: pointer;
    display: block;
    flex-shrink: 0;
    position: relative;
    transition: background-color 0.1s, border-color 0.1s;
  }

  .sq-table-checkbox:checked {
    background-color: #005fdb;
    border-color: #005fdb;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3.5L3.5 6.5L9 1' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }

  .sq-table-checkbox:focus-visible {
    outline: 2px solid #005fdb;
    outline-offset: 1px;
  }

  /* ── Actions cell ────────────────────────────────────────── */
  .sq-table-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sq-table-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 12px;
    cursor: pointer;
    flex-shrink: 0;
    box-sizing: border-box;
    transition: background-color 0.12s, border-color 0.12s;
  }

  .sq-table-action-btn--outline {
    background: #f8fafc;
    border: 1px solid rgba(5, 21, 36, 0.06);
    color: #314158;
  }

  .sq-table-action-btn--outline:hover {
    background: #e2e8f0;
    border-color: rgba(5, 21, 36, 0.12);
  }

  .sq-table-action-btn--primary {
    background: #cce2ff;
    border: none;
    color: #005fdb;
  }

  .sq-table-action-btn--primary:hover {
    background: #b3d4ff;
  }

  .sq-table-action-btn--primary-active,
  .sq-table-action-btn--primary-active:hover {
    background: #e5f1ff;
    border: none;
    color: #005fdb;
  }

  .sq-table-action-btn:focus-visible {
    outline: 2px solid #005fdb;
    outline-offset: 1px;
  }

  /* ── Expanded panel row ──────────────────────────────────── */
  .sq-table-expanded-row {
    background: #f1f5f9;
    border-bottom: 1px solid #005fdb;
  }

  /* Expanded panel row when the parent row is also selected */
  .sq-table-expanded-row--selected {
    background: #e5f1ff;
    border-bottom: 1px solid #0a74ff;
  }

  .sq-table-expanded-cell {
    padding: 0;
  }

  .sq-table-expanded-panel {
    padding: 16px;
    display: flex;
    gap: 24px;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
  }

  .sq-table-expanded-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
  }

  .sq-table-expanded-title {
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.5rem;
    color: #020618;
    margin: 0;
    white-space: nowrap;
  }

  .sq-table-expanded-divider {
    width: 1px;
    align-self: stretch;
    background: rgba(5, 21, 36, 0.06);
    flex-shrink: 0;
  }

  /* Detail rows inside expanded panel */
  .sq-table-detail-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px solid rgba(5, 21, 36, 0.06);
    gap: 16px;
  }

  .sq-table-detail-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: #314158;
    white-space: nowrap;
  }

  .sq-table-detail-value {
    font-family: 'Roboto Mono', 'Courier New', monospace;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem;
    color: #020618;
    white-space: nowrap;
  }

  /* ── Empty state ─────────────────────────────────────────── */
  .sq-table-empty {
    text-align: center;
    padding: 40px 16px;
    font-size: 0.875rem;
    color: #62748e;
  }
`;
