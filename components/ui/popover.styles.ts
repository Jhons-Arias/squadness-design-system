export const PopoverStyles = `
  /* ── Container ──────────────────────────────────────────────── */
  .sq-popover {
    background: var(--sq-surface-default);           /* surface/default */
    border: 1px solid var(--sq-border-default);
    border-radius: 8px;
    padding: 8px;
    width: 256px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-sizing: border-box;
    font-family: var(--sq-font-body);
    position: relative;
  }

  /* ── Title ──────────────────────────────────────────────────── */
  .sq-popover-title {
    font-size: 0.75rem;    /* 12px */
    font-weight: 500;
    line-height: 1rem;     /* 16px */
    color: var(--sq-text-subtle);        /* text/subtle */
    margin: 0;
    white-space: nowrap;
  }

  /* ── Fields list ────────────────────────────────────────────── */
  .sq-popover-fields {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  /* ── Row ────────────────────────────────────────────────────── */
  .sq-popover-row {
    display: flex;
    align-items: center;
    gap: 0;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--sq-border-default);
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .sq-popover-row-label {
    flex: 1;
    font-size: 0.75rem;   /* 12px */
    font-weight: 400;
    line-height: 1rem;    /* 16px */
    color: var(--sq-text-subtle);       /* text/subtle */
    min-width: 0;
    margin: 0;
  }

  /* ── Field wrapper (right side, 159px) ──────────────────────── */
  .sq-popover-field {
    width: 159px;
    height: 32px;
    flex-shrink: 0;
    box-sizing: border-box;
    position: relative;
  }

  /* ── Text input ─────────────────────────────────────────────── */
  .sq-popover-text-input {
    width: 100%;
    height: 100%;
    background: var(--sq-surface-raised);
    border: 1px solid var(--sq-neutral-500);
    border-radius: 8px;
    padding: 0 8px;
    font-size: 0.75rem;   /* 12px */
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-default);       /* text/default */
    box-sizing: border-box;
    outline: none;
    font-family: var(--sq-font-body);
    transition: border-color 120ms;
  }

  .sq-popover-text-input::placeholder {
    color: var(--sq-text-subtlest);       /* text/subtlest */
  }

  .sq-popover-text-input:focus {
    border-color: var(--sq-brand);
  }

  /* ── Select trigger ─────────────────────────────────────────── */
  .sq-popover-select-trigger {
    width: 100%;
    height: 100%;
    background: var(--sq-surface-raised);
    border: 1px solid var(--sq-neutral-500);
    border-radius: 8px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 120ms;
  }

  .sq-popover-select-trigger:hover {
    border-color: var(--sq-neutral-400);
  }

  .sq-popover-select-trigger[aria-expanded="true"] {
    border-color: var(--sq-brand);
  }

  .sq-popover-select-value {
    flex: 1;
    font-size: 0.75rem;   /* 12px */
    font-weight: 400;
    line-height: 1rem;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  .sq-popover-select-value--placeholder {
    color: var(--sq-text-subtlest);       /* text/subtlest */
  }

  .sq-popover-select-value--filled {
    color: var(--sq-text-default);       /* text/default */
  }

  .sq-popover-select-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--sq-text-subtle);
  }

  .sq-popover-select-icon svg {
    display: block;
  }

  /* ── Date trigger ───────────────────────────────────────────── */
  .sq-popover-date-trigger {
    width: 100%;
    height: 100%;
    background: var(--sq-surface-raised);
    border: 1px solid var(--sq-neutral-500);
    border-radius: 8px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 120ms;
  }

  .sq-popover-date-trigger:hover {
    border-color: var(--sq-neutral-400);
  }

  .sq-popover-date-value {
    flex: 1;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  .sq-popover-date-value--placeholder {
    color: var(--sq-text-subtlest);
  }

  .sq-popover-date-value--filled {
    color: var(--sq-text-default);
  }

  .sq-popover-date-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--sq-text-subtle);
  }

  .sq-popover-date-icon svg {
    display: block;
  }

  /* ── Dropdown menu ──────────────────────────────────────────── */
  .sq-popover-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 159px;
    background: var(--sq-surface-default);
    border: 1px solid var(--sq-border-default);
    border-radius: 8px;
    padding: 4px;
    box-shadow: 0px 4px 11.2px var(--sq-shadow-sm);
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    gap: 4px;
  }

  .sq-popover-menu-inner {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
  }

  /* ── Menu search ────────────────────────────────────────────── */
  .sq-popover-menu-search {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 32px;
    padding: 0 8px;
    background: var(--sq-surface-raised);
    border: 1px solid var(--sq-neutral-500);
    border-radius: 8px;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .sq-popover-menu-search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--sq-text-subtlest);
  }

  .sq-popover-menu-search-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-default);
    font-family: var(--sq-font-body);
    min-width: 0;
  }

  .sq-popover-menu-search-input::placeholder {
    color: var(--sq-text-subtlest);
  }

  /* ── Menu options ───────────────────────────────────────────── */
  .sq-popover-menu-options {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 160px;
    overflow-y: auto;
  }

  .sq-popover-menu-option {
    display: flex;
    align-items: center;
    padding: 4px 6px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--sq-text-subtle);
    transition: background 120ms;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .sq-popover-menu-option:hover {
    background: var(--sq-border-faint);
  }

  .sq-popover-menu-option--selected {
    background: var(--sq-brand);    /* surface/semantic/brand/subtler */
    color: var(--sq-surface-default);         /* text/inverse */
    font-weight: 500;
  }

  .sq-popover-menu-option--selected:hover {
    background: var(--sq-brand-pressed);
  }

  /* ── Calendar dropdown (date field) ────────────────────────── */
  .sq-popover-menu--calendar {
    width: auto;
    min-width: 252px;
    padding: 12px;
    left: auto;
    right: 0;
  }

  /* The MiniCalendar wrapper inside the popover needs full width */
  .sq-popover-menu--calendar .sq-dfd-calendar {
    width: 100%;
  }

  /* ── Apply button ───────────────────────────────────────────── */
  .sq-popover-apply {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 0 16px;
    background: var(--sq-brand);   /* button/primary/surface-default */
    color: var(--sq-surface-info-raised);        /* button/primary/content */
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;   /* 14px */
    font-weight: 600;
    line-height: 1.25rem;  /* 20px */
    font-family: var(--sq-font-body);
    cursor: pointer;
    transition: background 120ms;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .sq-popover-apply:hover {
    background: var(--sq-brand-pressed);
  }

  .sq-popover-apply:active {
    background: var(--sq-brand-bold);
  }
`;
