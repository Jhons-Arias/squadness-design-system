export const PopoverStyles = `
  /* ── Container ──────────────────────────────────────────────── */
  .sq-popover {
    background: #f8fafc;           /* surface/default */
    border: 1px solid rgba(5, 21, 36, 0.06);
    border-radius: 8px;
    padding: 8px;
    width: 256px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    position: relative;
  }

  /* ── Title ──────────────────────────────────────────────────── */
  .sq-popover-title {
    font-size: 0.75rem;    /* 12px */
    font-weight: 500;
    line-height: 1rem;     /* 16px */
    color: #314158;        /* text/subtle */
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
    border-bottom: 1px solid rgba(5, 21, 36, 0.06);
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .sq-popover-row-label {
    flex: 1;
    font-size: 0.75rem;   /* 12px */
    font-weight: 400;
    line-height: 1rem;    /* 16px */
    color: #314158;       /* text/subtle */
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
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 8px;
    padding: 0 8px;
    font-size: 0.75rem;   /* 12px */
    font-weight: 400;
    line-height: 1rem;
    color: #020618;       /* text/default */
    box-sizing: border-box;
    outline: none;
    font-family: 'Inter', sans-serif;
    transition: border-color 120ms;
  }

  .sq-popover-text-input::placeholder {
    color: #62748e;       /* text/subtlest */
  }

  .sq-popover-text-input:focus {
    border-color: #005fdb;
  }

  /* ── Select trigger ─────────────────────────────────────────── */
  .sq-popover-select-trigger {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border: 1px solid #dddddd;
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
    border-color: #b0bec5;
  }

  .sq-popover-select-trigger[aria-expanded="true"] {
    border-color: #005fdb;
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
    color: #62748e;       /* text/subtlest */
  }

  .sq-popover-select-value--filled {
    color: #020618;       /* text/default */
  }

  .sq-popover-select-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: #314158;
  }

  .sq-popover-select-icon svg {
    display: block;
  }

  /* ── Date trigger ───────────────────────────────────────────── */
  .sq-popover-date-trigger {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border: 1px solid #dddddd;
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
    border-color: #b0bec5;
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
    color: #62748e;
  }

  .sq-popover-date-value--filled {
    color: #020618;
  }

  .sq-popover-date-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: #314158;
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
    background: #f8fafc;
    border: 1px solid rgba(5, 21, 36, 0.06);
    border-radius: 8px;
    padding: 4px;
    box-shadow: 0px 4px 11.2px rgba(0, 0, 0, 0.08);
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
    background: #ffffff;
    border: 1px solid #dddddd;
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
    color: #62748e;
  }

  .sq-popover-menu-search-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #020618;
    font-family: 'Inter', sans-serif;
    min-width: 0;
  }

  .sq-popover-menu-search-input::placeholder {
    color: #62748e;
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
    color: #314158;
    transition: background 120ms;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .sq-popover-menu-option:hover {
    background: rgba(5, 21, 36, 0.04);
  }

  .sq-popover-menu-option--selected {
    background: #005fdb;    /* surface/semantic/brand/subtler */
    color: #f8fafc;         /* text/inverse */
    font-weight: 500;
  }

  .sq-popover-menu-option--selected:hover {
    background: #004ec4;
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
    background: #005fdb;   /* button/primary/surface-default */
    color: #f8ffff;        /* button/primary/content */
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;   /* 14px */
    font-weight: 600;
    line-height: 1.25rem;  /* 20px */
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: background 120ms;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .sq-popover-apply:hover {
    background: #004ec4;
  }

  .sq-popover-apply:active {
    background: #003fa0;
  }
`;
