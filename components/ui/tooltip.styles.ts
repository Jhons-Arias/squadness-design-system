export const TooltipStyles = `
  /* ── Tooltip container ───────────────────────────────────── */
  .sq-tooltip {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background: var(--sq-surface-neutral-subtlest); /* surface/accent/neutral/subtlest */
    border: 1px solid var(--sq-border-default);
    border-radius: 4px;
    width: 245px;
    box-sizing: border-box;
    font-family: var(--sq-font-body);
    box-shadow: 0 2px 8px var(--sq-border-medium);
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
    color: var(--sq-text-subtle); /* text/subtle */
    margin: 0;
    width: 100%;
  }

  .sq-tooltip-date {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--sq-text-default); /* text/default */
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
    color: var(--sq-text-subtlest); /* text/muted */
    flex-shrink: 0;
  }

  .sq-tooltip-footer-value {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: var(--sq-text-subtle); /* text/subtle */
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
    background: var(--sq-surface-neutral-subtlest); /* surface/accent/neutral/subtlest */
    border: 1px solid var(--sq-border-default);
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px var(--sq-border-medium);
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
    background: var(--sq-neutral-200); /* fallback when no src */
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
    background: var(--sq-border-subtle); /* color/neutral/300a */
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
    border-top: 9px solid var(--sq-border-default); /* border color */
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
    border-top: 8px solid var(--sq-surface-neutral-subtlest); /* matches bg */
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
    border: 1px solid var(--sq-border-default);
    background: var(--sq-surface-default);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
    color: var(--sq-text-subtle);
    z-index: 1;
    transition: background 120ms;
  }

  .sq-tooltip-image-map-close:hover {
    background: var(--sq-surface-neutral-subtlest);
  }

  .sq-tooltip-image-map-close svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;
