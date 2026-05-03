export const LayoutStyles = `
  /* ── Root shell ──────────────────────────────────────────── */
  .sq-layout {
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    background: #ffffff;
    font-family: 'Inter', sans-serif;
  }

  /* ── Sidebar panel ───────────────────────────────────────── */
  .sq-layout-sidebar {
    flex-shrink: 0;
    height: 100%;
    overflow: hidden;
    transition: width 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .sq-layout-sidebar[data-collapsed="false"] { width: 240px; }
  .sq-layout-sidebar[data-collapsed="true"]  { width: 52px;  }

  /* ── Main column ─────────────────────────────────────────── */
  .sq-layout-main {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    min-width: 0;
    height: 100%;
  }

  /* ── Scrollable content area ──────────────────────────────── */
  .sq-layout-body {
    flex: 1 1 0%;
    overflow-y: auto;
    background: #f8fafc;
    padding: 16px;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  /* ── Inner white card ─────────────────────────────────────── */
  .sq-layout-card {
    flex: 1 1 0%;
    background: #ffffff;
    border: 1px solid rgba(5, 21, 36, 0.06);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .sq-layout-card-content {
    flex: 1 1 0%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  /* ── Page header ──────────────────────────────────────────── */
  .sq-page-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 16px;
    border-bottom: 1px solid rgba(5, 21, 36, 0.06);
    flex-shrink: 0;
  }

  .sq-page-header-text {
    flex: 1 1 0%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .sq-page-header-title {
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
    color: #020618;
    letter-spacing: -0.02em;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sq-page-header-description {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: #62748e;
    margin: 0;
  }

  .sq-page-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  /* ── Page body padding ────────────────────────────────────── */
  .sq-page-body {
    flex: 1 1 0%;
    padding: 16px;
    overflow-y: auto;
  }
`
