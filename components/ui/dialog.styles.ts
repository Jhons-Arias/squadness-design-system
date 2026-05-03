export const DialogStyles = `
  /* ── Overlay ────────────────────────────────────────────────── */
  .sq-dialog-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5, 12, 31, 0.66); /* surface/overlay */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 50;
    box-sizing: border-box;
  }

  /* ── Panel ──────────────────────────────────────────────────── */
  .sq-dialog-panel {
    background: #ffffff; /* surface/raised */
    border-radius: 16px;
    padding: 16px;
    width: 448px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
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
    color: #020618;        /* text/default */
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
    border: 1px solid rgba(5, 21, 36, 0.06);
    background: #f8fafc;
    cursor: pointer;
    padding: 0;
    box-sizing: border-box;
    color: #314158;
    transition: background 120ms;
  }

  .sq-dialog-close:hover {
    background: #f1f5f9;
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
    color: #314158;        /* text/subtle */
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
    background: #f8fafc;          /* surface/default */
    border: 1px solid rgba(5, 21, 36, 0.06);
    border-radius: 8px;
    box-shadow: 0px 4px 11.2px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
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
    color: #020618;       /* text/default */
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
    border: 1px solid rgba(5, 21, 36, 0.06);
    background: #f8fafc;
    cursor: pointer;
    font-size: 0.75rem;   /* 12px */
    font-weight: 600;
    line-height: 1rem;
    color: #314158;       /* button/outline/content */
    white-space: nowrap;
    box-sizing: border-box;
    transition: background 120ms;
  }

  .sq-delete-dialog-select-all:hover {
    background: #f1f5f9;
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
    background: #9e0b15;  /* button/danger/surface-default */
    cursor: pointer;
    font-size: 0.75rem;   /* 12px */
    font-weight: 600;
    line-height: 1rem;
    color: #feeded;       /* button/danger/content */
    white-space: nowrap;
    box-sizing: border-box;
    flex-shrink: 0;
    transition: background 120ms;
  }

  .sq-delete-dialog-delete:hover {
    background: #7f0910;
  }

  .sq-delete-dialog-delete svg {
    width: 16px;
    height: 16px;
    display: block;
    flex-shrink: 0;
  }
`;
