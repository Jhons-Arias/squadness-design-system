export const TooltipStyles = `
  /* ── Tooltip container ───────────────────────────────────── */
  .sq-tooltip {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background: #f1f5f9; /* surface/accent/neutral/subtlest */
    border: 1px solid rgba(5, 21, 36, 0.06);
    border-radius: 4px;
    width: 245px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 2px 8px rgba(5, 21, 36, 0.08);
  }

  /* ── Header: name + date ─────────────────────────────────── */
  .sq-tooltip-header {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .sq-tooltip-name {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #314158; /* text/subtle */
    margin: 0;
    width: 100%;
  }

  .sq-tooltip-date {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: #020618; /* text/default */
    margin: 0;
    width: 100%;
  }

  /* ── Footer: signed by ───────────────────────────────────── */
  .sq-tooltip-footer {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    white-space: nowrap;
    overflow: hidden;
  }

  .sq-tooltip-footer-label {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #62748e; /* text/muted */
    flex-shrink: 0;
  }

  .sq-tooltip-footer-value {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #314158; /* text/subtle */
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  /* ── TooltipImageMap ─────────────────────────────────────────── */
  .sq-tooltip-image-map {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    padding: 8px;
    background: #f1f5f9; /* surface/accent/neutral/subtlest */
    border: 1px solid rgba(5, 21, 36, 0.06);
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(5, 21, 36, 0.08);
  }

  /* Double variant: two images side by side */
  .sq-tooltip-image-map--double {
    flex-direction: row;
    align-items: center;
  }

  /* Image slot */
  .sq-tooltip-image-map-img {
    position: relative;
    width: 170px;
    height: 210px;
    border-radius: 2px;
    overflow: hidden;
    flex-shrink: 0;
    background: #cbd5e1; /* fallback when no src */
  }

  .sq-tooltip-image-map--double .sq-tooltip-image-map-img {
    height: 211px;
  }

  .sq-tooltip-image-map-img img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Dark overlay on top of the image */
  .sq-tooltip-image-map-img::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(11, 18, 14, 0.14); /* color/neutral/300a */
    border-radius: 2px;
    pointer-events: none;
  }

  /* Bottom arrow (pointing down) */
  .sq-tooltip-image-map::before {
    content: '';
    position: absolute;
    bottom: -9px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 9px solid rgba(5, 21, 36, 0.06); /* border color */
    pointer-events: none;
  }

  .sq-tooltip-image-map::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6.5px solid transparent;
    border-right: 6.5px solid transparent;
    border-top: 8px solid #f1f5f9; /* matches bg */
    pointer-events: none;
  }

  /* Close button */
  .sq-tooltip-image-map-close {
    position: absolute;
    top: 11px;
    right: 11px;
    width: 32px;
    height: 32px;
    border-radius: 12px;
    border: 1px solid rgba(5, 21, 36, 0.06);
    background: #f8fafc;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
    color: #314158;
    z-index: 1;
    transition: background 120ms;
  }

  .sq-tooltip-image-map-close:hover {
    background: #f1f5f9;
  }

  .sq-tooltip-image-map-close svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;
