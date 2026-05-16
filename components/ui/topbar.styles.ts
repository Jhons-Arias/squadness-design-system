export const TopBarStyles = `
  /* ── Shell ───────────────────────────────────────────────── */
  .sq-topbar {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 8px 16px;
    gap: 4px;
    background-color: var(--sq-surface-default);
    border-bottom: 1px solid var(--sq-border-default);
    font-family: var(--sq-font-body);
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
    color: var(--sq-text-subtle);
    flex-shrink: 0;
    box-sizing: border-box;
    transition: background-color 0.12s;
  }

  .sq-topbar-icon-btn:hover {
    background-color: var(--sq-surface-neutral-subtler);
  }

  .sq-topbar-icon-btn:focus-visible {
    outline: 2px solid var(--sq-brand);
    outline-offset: 1px;
  }

  .sq-topbar-icon-btn-outline {
    background-color: var(--sq-surface-default);
    border: 1px solid var(--sq-border-default);
  }

  .sq-topbar-icon-btn-outline:hover {
    background-color: var(--sq-surface-neutral-subtlest);
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
    color: var(--sq-text-subtle);
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
    background-color: var(--sq-surface-neutral-subtler);
    cursor: pointer;
    transition: background-color 0.15s;
    flex-shrink: 0;
    border: none;
    padding: 0;
  }

  .sq-topbar-switch[data-checked="true"] {
    background-color: var(--sq-brand);
  }

  .sq-topbar-switch-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--sq-surface-raised);
    transition: transform 0.15s;
    box-shadow: 0 1px 2px var(--sq-shadow-lg);
    pointer-events: none;
  }

  .sq-topbar-switch[data-checked="true"] .sq-topbar-switch-thumb {
    transform: translateX(16px);
  }

  /* ── Vertical separator ──────────────────────────────────── */
  .sq-topbar-separator {
    width: 1px;
    height: 24px;
    background-color: var(--sq-border-bold);
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
    font-family: var(--sq-font-body);
  }

  .sq-topbar-user:hover {
    background-color: var(--sq-surface-neutral-subtler);
  }

  .sq-topbar-user:focus-visible {
    outline: 2px solid var(--sq-brand);
    outline-offset: 1px;
  }

  /* ── Avatar ──────────────────────────────────────────────── */
  .sq-topbar-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: var(--sq-surface-brand-subtler);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--sq-brand);
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
    color: var(--sq-text-default);
    white-space: nowrap;
  }

  .sq-topbar-user-role {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-subtlest);
    white-space: nowrap;
  }

  /* ── Chevron ─────────────────────────────────────────────── */
  .sq-topbar-chevron {
    color: var(--sq-text-subtle);
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
`;
