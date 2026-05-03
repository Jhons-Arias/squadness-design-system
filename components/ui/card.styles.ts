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
    border: 1px solid rgba(5, 21, 36, 0.06);
    background: #f1f5f9; /* surface/accent/neutral/subtlest */
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.12s, border-color 0.12s;
    font-family: 'Inter', sans-serif;
  }

  .sq-card:hover {
    background: #e2e8f0; /* surface/accent/neutral/subtlest-hovered */
  }

  .sq-card--selected,
  .sq-card--selected:hover {
    background: #e5f1ff; /* surface/accent/blue/subtlest */
    border-color: #0a74ff; /* border/accent/blue */
  }

  /* ── Image area ──────────────────────────────────────────── */
  .sq-card-image {
    width: 100%;
    height: 246px;
    border-radius: 2px;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
    background: #cbd5e1; /* placeholder bg */
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
      linear-gradient(45deg, #c8d4e0 25%, transparent 25%),
      linear-gradient(-45deg, #c8d4e0 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #c8d4e0 75%),
      linear-gradient(-45deg, transparent 75%, #c8d4e0 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    background-color: #dde6ef;
  }

  .sq-card-image-overlay {
    position: absolute;
    inset: 0;
    background: rgba(11, 18, 14, 0.14);
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
    border-bottom: 1px solid rgba(5, 21, 36, 0.06);
  }

  .sq-card-row:last-child {
    border-bottom: none;
  }

  .sq-card-label {
    flex: 1;
    min-width: 0;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #314158; /* text/subtle */
    white-space: nowrap;
  }

  .sq-card-value {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #020618; /* text/default */
    white-space: nowrap;
    flex-shrink: 0;
    text-align: right;
  }

  .sq-card-value--mono {
    font-family: 'Roboto Mono', 'Courier New', monospace;
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
    border: 1.5px solid rgba(11, 18, 14, 0.14);
    background: #ffffff;
    cursor: pointer;
    display: block;
    flex-shrink: 0;
    position: relative;
    transition: background-color 0.1s, border-color 0.1s;
  }

  .sq-card-checkbox:checked {
    background-color: #005fdb;
    border-color: #005fdb;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3.5L3.5 6.5L9 1' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }

  .sq-card-checkbox:focus-visible {
    outline: 2px solid #005fdb;
    outline-offset: 1px;
  }

  /* ── Tooltip (shown on hover via React state) ────────────── */
  .sq-card-tooltip {
    position: absolute;
    left: 28px;
    top: 110px;
    width: 245px;
    background: #f1f5f9; /* surface/accent/neutral/subtlest */
    border: 1px solid rgba(5, 21, 36, 0.06);
    border-radius: 4px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 20;
    pointer-events: none;
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(5, 21, 36, 0.08);
  }

  .sq-card-tooltip-header {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .sq-card-tooltip-name {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #314158; /* text/subtle */
    margin: 0;
  }

  .sq-card-tooltip-date {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: #020618; /* text/default */
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
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #62748e; /* text/muted */
    flex-shrink: 0;
  }

  .sq-card-tooltip-footer-value {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #314158; /* text/subtle */
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
`;
