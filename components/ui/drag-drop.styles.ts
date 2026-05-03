export const DragDropStyles = `
  /* ── Container ───────────────────────────────────────────── */
  .sq-drag-wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }

  .sq-drag-title {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: #020618;
    white-space: nowrap;
    margin: 0;
  }

  .sq-drag-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    background: #f8fafc;
    border: 1px solid rgba(11, 18, 14, 0.14);
    border-radius: 8px;
    min-height: 120px;
    box-sizing: border-box;
    transition: border-color 0.12s, background-color 0.12s;
    overflow-y: auto;
  }

  /* Drop zone active state */
  .sq-drag-list--over {
    border-color: #005fdb;
    background: #e5f1ff;
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
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: #62748e;
    text-align: center;
    margin: 0;
  }

  /* ── Item ────────────────────────────────────────────────── */
  .sq-drag-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    background: #f1f5f9;
    border: 1px solid rgba(5, 21, 36, 0.06);
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
    border-top: 2px solid #005fdb;
  }

  .sq-drag-item-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: #314158;
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
    color: #62748e;
  }
`;
