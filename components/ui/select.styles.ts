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
    background-color: var(--sq-surface-default);
    border: 1px solid var(--sq-border-default);
    border-radius: 12px;
    font-family: var(--sq-font-body);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--sq-text-default);
    cursor: pointer;
    outline: none;
    text-align: left;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .sq-select-trigger:hover:not(:disabled) {
    border-color: var(--sq-border-bold);
  }

  .sq-select-trigger-open,
  .sq-select-trigger:focus-visible {
    border-color: var(--sq-brand);
    box-shadow: 0 0 0 3px var(--sq-glow-brand);
  }

  .sq-select-trigger-error {
    border-color: var(--sq-border-error) !important;
  }

  .sq-select-trigger-error.sq-select-trigger-open,
  .sq-select-trigger-error:focus-visible {
    box-shadow: 0 0 0 3px var(--sq-glow-error) !important;
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

  .sq-select-placeholder { color: var(--sq-text-subtlest); }

  /* ── Chevron icon ───────────────────────────────────────── */
  .sq-select-icon {
    display: flex;
    align-items: center;
    color: var(--sq-text-subtlest);
    flex-shrink: 0;
  }

  /* ── Dropdown panel ─────────────────────────────────────── */
  .sq-select-content {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 6px;
    background-color: var(--sq-surface-default);
    border: 1px solid var(--sq-border-default);
    border-radius: 8px;
    box-shadow: 0 4px 6px var(--sq-shadow-sm);
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
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: var(--sq-text-default);
    cursor: pointer;
    user-select: none;
    transition: background-color 0.1s;
  }

  .sq-select-item-focused {
    background-color: var(--sq-border-faint);
  }

  .sq-select-item-selected {
    background-color: var(--sq-surface-brand-subtler);
  }

  .sq-select-item-selected.sq-select-item-focused {
    background-color: var(--sq-surface-brand-subtle-alt);
  }

  .sq-select-item-disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* ── Checkmark ──────────────────────────────────────────── */
  .sq-select-item-indicator {
    display: flex;
    align-items: center;
    color: var(--sq-brand);
    flex-shrink: 0;
  }

  /* ── Label ──────────────────────────────────────────────── */
  .sq-select-label {
    font-family: var(--sq-font-body);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--sq-text-subtle);
    margin: 0;
  }

  .sq-select-label-disabled { color: var(--sq-text-subtlest); }

  .sq-select-required {
    color: var(--sq-border-error);
    margin-left: 2px;
  }

  /* ── Helper / feedback ──────────────────────────────────── */
  .sq-select-helper {
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    color: var(--sq-text-subtlest);
  }

  .sq-select-helper-error { color: var(--sq-text-error); }
`;
