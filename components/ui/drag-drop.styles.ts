export const DragDropStyles = `
  /* ── Container ───────────────────────────────────────────── */
  .sq-drag-wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }

  .sq-drag-title {
    font-family: var(--sq-font-body);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: var(--sq-text-default);
    white-space: nowrap;
    margin: 0;
  }

  .sq-drag-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    background: var(--sq-surface-default);
    border: 1px solid var(--sq-border-subtle);
    border-radius: 8px;
    min-height: 120px;
    box-sizing: border-box;
    transition: border-color 0.12s, background-color 0.12s;
    overflow-y: auto;
  }

  /* Drop zone active state */
  .sq-drag-list--over {
    border-color: var(--sq-brand);
    background: var(--sq-surface-brand-subtlest);
  }

  /* Empty state */
  .sq-drag-empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 99px;
    padding: 8px;
  }

  .sq-drag-empty-text {
    font-family: var(--sq-font-body);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--sq-text-subtlest);
    text-align: center;
    margin: 0;
  }

  /* ── Item ────────────────────────────────────────────────── */
  .sq-drag-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    background: var(--sq-surface-neutral-subtlest);
    border: 1px solid var(--sq-border-default);
    border-radius: 4px;
    cursor: grab;
    user-select: none;
    transition: opacity 0.12s, box-shadow 0.12s, background-color 0.12s;
    width: 100%;
    box-sizing: border-box;
  }

  .sq-drag-item:active {
    cursor: grabbing;
  }

  /* Item being dragged */
  .sq-drag-item--dragging {
    opacity: 0.4;
  }

  /* Drop indicator: item that will be pushed down */
  .sq-drag-item--over {
    border-top: 2px solid var(--sq-brand);
  }

  .sq-drag-item-label {
    font-family: var(--sq-font-body);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: var(--sq-text-subtle);
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Drag handle icon ────────────────────────────────────── */
  .sq-drag-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    flex-shrink: 0;
    color: var(--sq-text-subtlest);
  }
`;
