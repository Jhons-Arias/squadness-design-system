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
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
    font-family: 'Inter', sans-serif;
  }

  /* ── Variants ────────────────────────────────────────────── */

  /* Default */
  .sq-toast--default {
    background: #f8fafc;
    border-color: rgba(5, 21, 36, 0.06);
    gap: 0;
  }

  /* Success */
  .sq-toast--success {
    background: #ecfcca;
    border-color: #5ea500;
  }

  /* Warning */
  .sq-toast--warning {
    background: #ffedd4;
    border-color: #f54a00;
  }

  /* Info */
  .sq-toast--info {
    background: #ccf1ff;
    border-color: #0095cc;
  }

  /* Error */
  .sq-toast--error {
    background: #fedede;
    border-color: #cf121f;
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
  .sq-toast--success  .sq-toast-icon { color: #3c6300; }
  .sq-toast--warning  .sq-toast-icon { color: #9f2d00; }
  .sq-toast--info     .sq-toast-icon { color: #004a66; }
  .sq-toast--error    .sq-toast-icon { color: #6f040c; }

  /* ── Message ──────────────────────────────────────────────── */
  .sq-toast-message {
    flex: 1;
    min-width: 0;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    margin: 0;
  }

  .sq-toast--default  .sq-toast-message { color: #020618; }
  .sq-toast--success  .sq-toast-message { color: #3c6300; }
  .sq-toast--warning  .sq-toast-message { color: #9f2d00; }
  .sq-toast--info     .sq-toast-message { color: #004a66; }
  .sq-toast--error    .sq-toast-message { color: #6f040c; }
`;
