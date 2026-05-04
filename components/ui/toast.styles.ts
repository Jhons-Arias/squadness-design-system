export const ToastStyles = `
  /* ── Base ────────────────────────────────────────────────── */
  .sq-toast {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid transparent;
    width: 317px;
    box-sizing: border-box;
    box-shadow: 0px 4px 8px var(--sq-shadow-md);
    font-family: var(--sq-font-body);
  }

  /* ── Variants ────────────────────────────────────────────── */

  /* Default */
  .sq-toast--default {
    background: var(--sq-surface-default);
    border-color: var(--sq-border-default);
    gap: 0;
  }

  /* Success */
  .sq-toast--success {
    background: var(--sq-surface-success-subtlest);
    border-color: var(--sq-border-success);
  }

  /* Warning */
  .sq-toast--warning {
    background: var(--sq-surface-warning-subtlest);
    border-color: var(--sq-border-warning);
  }

  /* Info */
  .sq-toast--info {
    background: var(--sq-surface-info-subtlest);
    border-color: var(--sq-info);
  }

  /* Error */
  .sq-toast--error {
    background: var(--sq-surface-error-subtler);
    border-color: var(--sq-border-error);
  }

  /* ── Icon wrapper — inherits color from variant ──────────── */
  .sq-toast-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  .sq-toast-icon svg {
    width: 16px;
    height: 16px;
  }

  /* Icon color matches text color per variant */
  .sq-toast--success  .sq-toast-icon { color: var(--sq-text-success); }
  .sq-toast--warning  .sq-toast-icon { color: var(--sq-text-warning); }
  .sq-toast--info     .sq-toast-icon { color: var(--sq-text-info); }
  .sq-toast--error    .sq-toast-icon { color: var(--sq-text-error); }

  /* ── Message ──────────────────────────────────────────────── */
  .sq-toast-message {
    flex: 1;
    min-width: 0;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    margin: 0;
  }

  .sq-toast--default  .sq-toast-message { color: var(--sq-text-default); }
  .sq-toast--success  .sq-toast-message { color: var(--sq-text-success); }
  .sq-toast--warning  .sq-toast-message { color: var(--sq-text-warning); }
  .sq-toast--info     .sq-toast-message { color: var(--sq-text-info); }
  .sq-toast--error    .sq-toast-message { color: var(--sq-text-error); }
`;
