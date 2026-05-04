export const DateFilterDropdownStyles = `
  /* ── Root wrapper ───────────────────────────────────────── */
  .sq-dfd-root {
    position: relative;
    display: inline-block;
  }

  /* ── Trigger ────────────────────────────────────────────── */
  .sq-dfd-trigger {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 32px;
    padding: 0 10px;
    font-family: var(--sq-font-body);
    font-size: 0.8125rem;
    font-weight: 500;
    background-color: var(--sq-surface-default);
    border: 1px solid var(--sq-border-default);
    color: var(--sq-text-default);
    border-radius: 8px;
    cursor: pointer;
    outline: none;
    white-space: nowrap;
    transition: border-color 0.15s, box-shadow 0.15s;
    min-width: 140px;
  }

  .sq-dfd-trigger:hover:not(:disabled) {
    border-color: var(--sq-border-bold);
  }

  .sq-dfd-trigger:focus-visible,
  .sq-dfd-trigger-open {
    border-color: var(--sq-brand);
    box-shadow: 0 0 0 3px var(--sq-glow-brand);
  }

  .sq-dfd-trigger-filled {
    border-color: var(--sq-border-medium);
  }

  .sq-dfd-trigger-disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  .sq-dfd-trigger-icon {
    color: var(--sq-text-subtlest);
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .sq-dfd-trigger-label {
    flex: 1;
    text-align: left;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--sq-text-default);
  }

  .sq-dfd-trigger-placeholder { color: var(--sq-text-subtlest); }

  .sq-dfd-chevron {
    color: var(--sq-text-subtlest);
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  /* ── Clear button ───────────────────────────────────────── */
  .sq-dfd-clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: none;
    background: transparent;
    color: var(--sq-text-subtlest);
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    flex-shrink: 0;
    transition: color 0.12s, background-color 0.12s;
  }

  .sq-dfd-clear:hover {
    color: var(--sq-text-default);
    background-color: var(--sq-border-default);
  }

  /* ── Panel ──────────────────────────────────────────────── */
  .sq-dfd-panel {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 999;
    background-color: var(--sq-surface-default);
    border: 1px solid var(--sq-border-default);
    border-radius: 10px;
    box-shadow: 0 4px 16px var(--sq-overlay-subtle);
    padding: 12px;
    min-width: 252px;
  }

  /* ── Calendar header ────────────────────────────────────── */
  .sq-dfd-cal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .sq-dfd-cal-title {
    font-family: var(--sq-font-body);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--sq-text-default);
  }

  .sq-dfd-cal-nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: 6px;
    color: var(--sq-text-subtlest);
    cursor: pointer;
    padding: 0;
    transition: background-color 0.12s, color 0.12s;
  }

  .sq-dfd-cal-nav:hover {
    background-color: var(--sq-border-default);
    color: var(--sq-text-default);
  }

  /* ── Calendar grid ──────────────────────────────────────── */
  .sq-dfd-cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .sq-dfd-cal-dow {
    text-align: center;
    font-family: var(--sq-font-body);
    font-size: 0.625rem;
    font-weight: 600;
    color: var(--sq-text-subtlest);
    padding: 4px 0;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* ── Day cells ──────────────────────────────────────────── */
  .sq-dfd-cal-day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1;
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--sq-text-default);
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.1s, color 0.1s;
    padding: 0;
  }

  .sq-dfd-cal-day:hover {
    background-color: var(--sq-border-default);
  }

  .sq-dfd-cal-day:focus-visible {
    outline: 2px solid var(--sq-brand);
    outline-offset: 1px;
  }

  /* Today */
  .sq-dfd-cal-day-today {
    font-weight: 700;
    color: var(--sq-brand);
  }

  /* Selected / range endpoints */
  .sq-dfd-cal-day-selected,
  .sq-dfd-cal-day-range-start,
  .sq-dfd-cal-day-range-end {
    background-color: var(--sq-brand) !important;
    color: var(--sq-surface-raised) !important;
    border-radius: 6px;
    font-weight: 600;
  }

  /* In-range highlight */
  .sq-dfd-cal-day-in-range {
    background-color: var(--sq-surface-brand-subtler);
    border-radius: 0;
    color: var(--sq-text-default);
  }

  .sq-dfd-cal-day-range-start { border-radius: 6px 0 0 6px; }
  .sq-dfd-cal-day-range-end   { border-radius: 0 6px 6px 0; }
`;
