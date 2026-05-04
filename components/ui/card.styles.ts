export const CardStyles = `
  /* ── Card wrapper ────────────────────────────────────────── */
  .sq-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 214px;
    padding: 4px 4px 8px 4px;
    border-radius: 4px;
    border: 1px solid var(--sq-border-default);
    background: var(--sq-surface-neutral-subtlest); /* surface/accent/neutral/subtlest */
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.12s, border-color 0.12s;
    font-family: var(--sq-font-body);
  }

  .sq-card:hover {
    background: var(--sq-surface-neutral-subtler); /* surface/accent/neutral/subtlest-hovered */
  }

  .sq-card--selected,
  .sq-card--selected:hover {
    background: var(--sq-surface-brand-subtlest); /* surface/accent/blue/subtlest */
    border-color: var(--sq-brand-active); /* border/accent/blue */
  }

  /* ── Image area ──────────────────────────────────────────── */
  .sq-card-image {
    width: 100%;
    height: 246px;
    border-radius: 2px;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
    background: var(--sq-neutral-200); /* placeholder bg */
  }

  .sq-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2px;
    display: block;
  }

  /* Checkerboard placeholder when no image is provided */
  .sq-card-image-placeholder {
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(45deg, var(--sq-neutral-300) 25%, transparent 25%),
      linear-gradient(-45deg, var(--sq-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sq-neutral-300) 75%),
      linear-gradient(-45deg, transparent 75%, var(--sq-neutral-300) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    background-color: var(--sq-neutral-100);
  }

  .sq-card-image-overlay {
    position: absolute;
    inset: 0;
    background: var(--sq-border-subtle);
    border-radius: 2px;
    pointer-events: none;
  }

  /* ── Info container ──────────────────────────────────────── */
  .sq-card-info {
    display: flex;
    flex-direction: column;
    padding: 0 4px;
    width: 100%;
    box-sizing: border-box;
  }

  /* ── Key-value rows ──────────────────────────────────────── */
  .sq-card-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 4px;
    padding: 4px 0;
    border-bottom: 1px solid var(--sq-border-default);
  }

  .sq-card-row:last-child {
    border-bottom: none;
  }

  .sq-card-label {
    flex: 1;
    min-width: 0;
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-subtle); /* text/subtle */
    white-space: nowrap;
  }

  .sq-card-value {
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-default); /* text/default */
    white-space: nowrap;
    flex-shrink: 0;
    text-align: right;
  }

  .sq-card-value--mono {
    font-family: var(--sq-font-mono);
  }

  /* ── Checkbox (absolute top-right) ──────────────────────── */
  .sq-card-checkbox-wrap {
    position: absolute;
    top: -1px;
    right: -1px;
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 12px 16px;
  }

  .sq-card-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1.5px solid var(--sq-border-subtle);
    background: var(--sq-surface-raised);
    cursor: pointer;
    display: block;
    flex-shrink: 0;
    position: relative;
    transition: background-color 0.1s, border-color 0.1s;
  }

  .sq-card-checkbox:checked {
    background-color: var(--sq-brand);
    border-color: var(--sq-brand);
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3.5L3.5 6.5L9 1' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }

  .sq-card-checkbox:focus-visible {
    outline: 2px solid var(--sq-brand);
    outline-offset: 1px;
  }

  /* ── Tooltip (shown on hover via React state) ────────────── */
  .sq-card-tooltip {
    position: absolute;
    left: 28px;
    top: 110px;
    width: 245px;
    background: var(--sq-surface-neutral-subtlest); /* surface/accent/neutral/subtlest */
    border: 1px solid var(--sq-border-default);
    border-radius: 4px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 20;
    pointer-events: none;
    box-sizing: border-box;
    box-shadow: 0 2px 8px var(--sq-border-medium);
  }

  .sq-card-tooltip-header {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .sq-card-tooltip-name {
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: var(--sq-text-subtle); /* text/subtle */
    margin: 0;
  }

  .sq-card-tooltip-date {
    font-family: var(--sq-font-body);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--sq-text-default); /* text/default */
    margin: 0;
  }

  .sq-card-tooltip-footer {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    white-space: nowrap;
    overflow: hidden;
  }

  .sq-card-tooltip-footer-label {
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: var(--sq-text-subtlest); /* text/muted */
    flex-shrink: 0;
  }

  .sq-card-tooltip-footer-value {
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: var(--sq-text-subtle); /* text/subtle */
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
`;
