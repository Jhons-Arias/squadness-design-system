export const SidebarStyles = `
  /* ── Shell ──────────────────────────────────────────────── */
  .sq-sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--sq-surface-default);
    border-right: 1px solid var(--sq-border-default);
    transition: width 0.2s ease;
    overflow: hidden;
    font-family: var(--sq-font-body);
  }

  .sq-sidebar-expanded  { width: 240px; }
  .sq-sidebar-collapsed { width: 52px; }

  /* ── Header ─────────────────────────────────────────────── */
  .sq-sidebar-header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    min-height: 56px;
    border-bottom: 1px solid var(--sq-border-default);
    flex-shrink: 0;
  }

  .sq-sidebar-logo {
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .sq-sidebar-header-collapsed {
    justify-content: center;
    padding: 12px;
  }

  /* ── Nav area ───────────────────────────────────────────── */
  .sq-sidebar-nav {
    flex: 1;
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .sq-sidebar-nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .sq-sidebar-item-wrap {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* ── Item — Figma: px-6px py-4px, gap-8px, 12px font, 16px line-height */
  .sq-sidebar-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 4px 6px;
    border: none;
    border-radius: 8px;
    font-family: var(--sq-font-body);
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-subtle);
    background-color: transparent;
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    text-align: left;
    transition: background-color 0.12s, color 0.12s;
    box-sizing: border-box;
  }

  /* Hover — only when NOT active */
  .sq-sidebar-item:not(.sq-sidebar-item-active):hover {
    background-color: var(--sq-surface-neutral-subtler);
    color: var(--sq-text-subtle);
  }

  .sq-sidebar-item:focus-visible {
    outline: 2px solid var(--sq-brand);
    outline-offset: 1px;
  }

  /* Active — surface/semantic/brand/subtler = var(--sq-brand) solid */
  .sq-sidebar-item-active {
    background-color: var(--sq-brand);
    color: var(--sq-surface-default);
    font-weight: 500;
    cursor: default;
  }

  .sq-sidebar-item-active .sq-sidebar-icon {
    color: var(--sq-surface-default);
  }

  /* Child item (nested) */
  .sq-sidebar-item-child {
    font-weight: 400;
  }

  /* Collapsed — center icon */
  .sq-sidebar-item-collapsed {
    justify-content: center;
    padding: 4px 6px;
  }

  /* ── Icon — 16×16 from Figma */
  .sq-sidebar-icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sq-text-subtle);
    flex-shrink: 0;
  }

  /* ── Label ──────────────────────────────────────────────── */
  .sq-sidebar-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.75rem;
    line-height: 1rem;
  }

  /* ── Badge ──────────────────────────────────────────────── */
  .sq-sidebar-badge {
    font-size: 0.625rem;
    font-weight: 700;
    padding: 1px 5px;
    border-radius: 9999px;
    background-color: var(--sq-brand);
    color: var(--sq-surface-raised);
    flex-shrink: 0;
    line-height: 1.4;
  }

  .sq-sidebar-item-active .sq-sidebar-badge {
    background-color: var(--sq-surface-raised);
    color: var(--sq-brand);
  }

  /* ── Chevron ────────────────────────────────────────────── */
  .sq-sidebar-chevron {
    color: var(--sq-text-subtle);
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-left: auto;
  }

  .sq-sidebar-item-active .sq-sidebar-chevron {
    color: var(--sq-surface-default);
  }

  /* ── Sub-menu — vertical line aligned with parent icon center */
  .sq-sidebar-children {
    list-style: none;
    margin: 2px 0 0 0;
    padding: 2px 0 2px 10px;
    /* 14px = parent padding-left(6px) + icon half-width(8px) — aligns line to icon center */
    margin-left: 14px;
    border-left: 1px solid var(--sq-border-bold);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  /* ── Footer ─────────────────────────────────────────────── */
  .sq-sidebar-footer {
    padding: 8px;
    border-top: 1px solid var(--sq-border-default);
    flex-shrink: 0;
  }
`;
