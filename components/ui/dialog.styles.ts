export const DialogStyles = `
  /* ── Overlay ────────────────────────────────────────────────── */
  .sq-dialog-overlay {
    position: fixed;
    inset: 0;
    background: var(--sq-overlay-dark); /* surface/overlay */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 50;
    box-sizing: border-box;
  }

  /* ── Panel ──────────────────────────────────────────────────── */
  .sq-dialog-panel {
    background: var(--sq-surface-raised); /* surface/raised */
    border-radius: 16px;
    padding: 16px;
    width: 448px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-sizing: border-box;
    font-family: var(--sq-font-body);
  }

  /* ── Header block (title-row + optional description) ─────────── */
  .sq-dialog-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .sq-dialog-title-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
  }

  .sq-dialog-title {
    flex: 1;
    font-family: 'Pangram', sans-serif;
    font-size: 1.75rem;    /* 28px — heading/xlarge */
    font-weight: 700;
    line-height: 2rem;     /* 32px */
    color: var(--sq-text-default);        /* text/default */
    margin: 0;
    min-width: 0;
  }

  /* ── Close button ───────────────────────────────────────────── */
  .sq-dialog-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid var(--sq-border-default);
    background: var(--sq-surface-default);
    cursor: pointer;
    padding: 0;
    box-sizing: border-box;
    color: var(--sq-text-subtle);
    transition: background 120ms;
  }

  .sq-dialog-close:hover {
    background: var(--sq-surface-neutral-subtlest);
  }

  .sq-dialog-close svg {
    width: 16px;
    height: 16px;
    display: block;
  }

  /* ── Description (confirmation dialogs) ─────────────────────── */
  .sq-dialog-description {
    font-size: 1rem;       /* 16px — body/medium */
    font-weight: 400;
    line-height: 1.5rem;   /* 24px */
    color: var(--sq-text-subtle);        /* text/subtle */
    margin: 0;
  }

  /* ── Body (form dialogs) ─────────────────────────────────────── */
  .sq-dialog-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  /* ── Footer ─────────────────────────────────────────────────── */
  .sq-dialog-footer {
    display: flex;
    gap: 16px;
    width: 100%;
  }

  .sq-dialog-footer .sq-btn {
    flex: 1;
    min-width: 0;
  }

  /* ── DeleteDialog (selection action bar) ────────────────────── */
  .sq-delete-dialog {
    display: inline-flex;
    align-items: center;
    gap: 24px;
    padding: 8px;
    background: var(--sq-surface-default);          /* surface/default */
    border: 1px solid var(--sq-border-default);
    border-radius: 8px;
    box-shadow: 0px 4px 11.2px var(--sq-shadow-sm);
    box-sizing: border-box;
    font-family: var(--sq-font-body);
  }

  /* Left section: count + select-all button */
  .sq-delete-dialog-info {
    display: flex;
    align-items: center;
    gap: 24px;
    padding-left: 8px;
  }

  .sq-delete-dialog-count {
    font-size: 0.75rem;   /* 12px — body/xsmall */
    font-weight: 500;
    line-height: 1rem;    /* 16px */
    color: var(--sq-text-default);       /* text/default */
    white-space: nowrap;
    margin: 0;
  }

  /* "Select all" outline button */
  .sq-delete-dialog-select-all {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid var(--sq-border-default);
    background: var(--sq-surface-default);
    cursor: pointer;
    font-size: 0.75rem;   /* 12px */
    font-weight: 600;
    line-height: 1rem;
    color: var(--sq-text-subtle);       /* button/outline/content */
    white-space: nowrap;
    box-sizing: border-box;
    transition: background 120ms;
  }

  .sq-delete-dialog-select-all:hover {
    background: var(--sq-surface-neutral-subtlest);
  }

  /* Delete danger button */
  .sq-delete-dialog-delete {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 32px;
    padding: 0 12px;
    border-radius: 8px;
    border: none;
    background: var(--sq-text-error-bolder);  /* button/danger/surface-default */
    cursor: pointer;
    font-size: 0.75rem;   /* 12px */
    font-weight: 600;
    line-height: 1rem;
    color: var(--sq-surface-error-subtlest);       /* button/danger/content */
    white-space: nowrap;
    box-sizing: border-box;
    flex-shrink: 0;
    transition: background 120ms;
  }

  .sq-delete-dialog-delete:hover {
    background: var(--sq-text-error-bold);
  }

  .sq-delete-dialog-delete svg {
    width: 16px;
    height: 16px;
    display: block;
    flex-shrink: 0;
  }
`;
