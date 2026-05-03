export const TopBarStyles = `
  /* ── Shell ───────────────────────────────────────────────── */
  .sq-topbar {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 8px 16px;
    gap: 4px;
    background-color: #f8fafc;
    border-bottom: 1px solid rgba(5, 21, 36, 0.06);
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
    width: 100%;
  }

  /* ── Spacer ──────────────────────────────────────────────── */
  .sq-topbar-spacer {
    flex: 1;
  }

  /* ── Right section ───────────────────────────────────────── */
  .sq-topbar-right {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  /* ── Icon buttons ────────────────────────────────────────── */
  .sq-topbar-icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #314158;
    flex-shrink: 0;
    box-sizing: border-box;
    transition: background-color 0.12s;
  }

  .sq-topbar-icon-btn:hover {
    background-color: #e2e8f0;
  }

  .sq-topbar-icon-btn:focus-visible {
    outline: 2px solid #005fdb;
    outline-offset: 1px;
  }

  .sq-topbar-icon-btn-outline {
    background-color: #f8fafc;
    border: 1px solid rgba(5, 21, 36, 0.06);
  }

  .sq-topbar-icon-btn-outline:hover {
    background-color: #f1f5f9;
  }

  /* ── Icon wrapper 16×16 ──────────────────────────────────── */
  .sq-topbar-icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ── Theme toggle ────────────────────────────────────────── */
  .sq-topbar-theme {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .sq-topbar-theme-label {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: #314158;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
  }

  /* ── Mini switch (theme toggle only) ────────────────────── */
  .sq-topbar-switch {
    position: relative;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    background-color: #e2e8f0;
    cursor: pointer;
    transition: background-color 0.15s;
    flex-shrink: 0;
    border: none;
    padding: 0;
  }

  .sq-topbar-switch[data-checked="true"] {
    background-color: #005fdb;
  }

  .sq-topbar-switch-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ffffff;
    transition: transform 0.15s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    pointer-events: none;
  }

  .sq-topbar-switch[data-checked="true"] .sq-topbar-switch-thumb {
    transform: translateX(16px);
  }

  /* ── Vertical separator ──────────────────────────────────── */
  .sq-topbar-separator {
    width: 1px;
    height: 24px;
    background-color: rgba(5, 21, 36, 0.12);
    flex-shrink: 0;
  }

  /* ── User info ───────────────────────────────────────────── */
  .sq-topbar-user {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px 4px 4px;
    border-radius: 8px;
    cursor: pointer;
    flex-shrink: 0;
    transition: background-color 0.12s;
    border: none;
    background: transparent;
    font-family: 'Inter', sans-serif;
  }

  .sq-topbar-user:hover {
    background-color: #e2e8f0;
  }

  .sq-topbar-user:focus-visible {
    outline: 2px solid #005fdb;
    outline-offset: 1px;
  }

  /* ── Avatar ──────────────────────────────────────────────── */
  .sq-topbar-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: #cce2ff;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-size: 0.75rem;
    font-weight: 600;
    color: #005fdb;
  }

  .sq-topbar-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ── User text ───────────────────────────────────────────── */
  .sq-topbar-user-info {
    display: flex;
    flex-direction: column;
    gap: 0;
    text-align: left;
  }

  .sq-topbar-user-name {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: #020618;
    white-space: nowrap;
  }

  .sq-topbar-user-role {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #62748e;
    white-space: nowrap;
  }

  /* ── Chevron ─────────────────────────────────────────────── */
  .sq-topbar-chevron {
    color: #314158;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
`;
