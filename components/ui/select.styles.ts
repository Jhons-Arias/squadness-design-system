export const SelectStyles = `
  /* ── Root wrapper ───────────────────────────────────────── */
  .sq-select-root {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    position: relative;
  }

  /* ── Trigger ────────────────────────────────────────────── */
  .sq-select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    height: 36px;
    padding: 0 12px;
    background-color: #f8fafc;
    border: 1px solid rgba(5, 21, 36, 0.06);
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: #020618;
    cursor: pointer;
    outline: none;
    text-align: left;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .sq-select-trigger:hover:not(:disabled) {
    border-color: rgba(5, 21, 36, 0.14);
  }

  .sq-select-trigger-open,
  .sq-select-trigger:focus-visible {
    border-color: #005fdb;
    box-shadow: 0 0 0 3px rgba(0, 95, 219, 0.2);
  }

  .sq-select-trigger-error {
    border-color: #cf121f !important;
  }

  .sq-select-trigger-error.sq-select-trigger-open,
  .sq-select-trigger-error:focus-visible {
    box-shadow: 0 0 0 3px rgba(207, 18, 31, 0.2) !important;
  }

  .sq-select-trigger:disabled,
  .sq-select-trigger-disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ── Value / placeholder ────────────────────────────────── */
  .sq-select-value {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sq-select-placeholder { color: #62748e; }

  /* ── Chevron icon ───────────────────────────────────────── */
  .sq-select-icon {
    display: flex;
    align-items: center;
    color: #62748e;
    flex-shrink: 0;
  }

  /* ── Dropdown panel ─────────────────────────────────────── */
  .sq-select-content {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 6px;
    background-color: #f8fafc;
    border: 1px solid rgba(5, 21, 36, 0.06);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
    padding: 4px;
    z-index: 50;
    max-height: 240px;
    overflow-y: auto;
  }

  /* ── Option item ────────────────────────────────────────── */
  .sq-select-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 4px 6px;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #020618;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.1s;
  }

  .sq-select-item-focused {
    background-color: rgba(5, 21, 36, 0.04);
  }

  .sq-select-item-selected {
    background-color: #cce2ff;
  }

  .sq-select-item-selected.sq-select-item-focused {
    background-color: #b8d6ff;
  }

  .sq-select-item-disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* ── Checkmark ──────────────────────────────────────────── */
  .sq-select-item-indicator {
    display: flex;
    align-items: center;
    color: #005fdb;
    flex-shrink: 0;
  }

  /* ── Label ──────────────────────────────────────────────── */
  .sq-select-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: #314158;
    margin: 0;
  }

  .sq-select-label-disabled { color: #62748e; }

  .sq-select-required {
    color: #cf121f;
    margin-left: 2px;
  }

  /* ── Helper / feedback ──────────────────────────────────── */
  .sq-select-helper {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: #62748e;
  }

  .sq-select-helper-error { color: #6f040c; }
`;
