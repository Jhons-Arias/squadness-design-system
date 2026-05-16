import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "brand"
  | "indigo";

export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Renders an × button — fires onRemove when clicked. */
  removable?: boolean;
  onRemove?: () => void;
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  /** Show a colored dot instead of / in addition to an icon. */
  dot?: boolean;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const XIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Badge ────────────────────────────────────────────────────────────────────

/**
 * Status / label badge — semantic variants + optional removable state.
 *
 * Variants: neutral · success · warning · error · info
 *
 * @example
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" dot>Critical</Badge>
 * <Badge variant="warning" removable onRemove={() => removeTag(id)}>Pending</Badge>
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "neutral",
      size = "md",
      removable = false,
      onRemove,
      icon,
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "sq-badge",
          `sq-badge-${variant}`,
          `sq-badge-${size}`,
          removable && "sq-badge-removable",
          className
        )}
        {...props}
      >
        {/* Status dot */}
        {dot && <span className="sq-badge-dot" aria-hidden="true" />}

        {/* Optional icon */}
        {icon && (
          <span className="sq-badge-icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Label */}
        <span className="sq-badge-label">{children}</span>

        {/* Remove button */}
        {removable && (
          <button
            type="button"
            className="sq-badge-remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            aria-label="Remove"
          >
            <XIcon />
          </button>
        )}
      </span>
    );
  }
);
Badge.displayName = "Badge";

// ─── CSS ──────────────────────────────────────────────────────────────────────

export const BadgeStyles = `
  /* ── Base ───────────────────────────────────────────────── */
  .sq-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
    border-radius: 9999px;
    white-space: nowrap;
    border: 1px solid transparent;
    line-height: 1;
  }

  /* ── Sizes ──────────────────────────────────────────────── */
  .sq-badge-sm {
    height: 18px;
    padding: 0 6px;
    font-size: 0.6875rem;
  }

  .sq-badge-md {
    height: 22px;
    padding: 0 8px;
    font-size: 0.75rem;
  }

  /* ── Variants ───────────────────────────────────────────── */

  /* Neutral — surface/accent/neutral/subtler */
  .sq-badge-neutral {
    background-color: #e2e8f0;
    border-color: rgba(11, 18, 14, 0.14);
    color: #1d293d;
  }

  /* Success — surface/semantic/success/subtlest */
  .sq-badge-success {
    background-color: #ecfcca;
    border-color: #5ea500;
    color: #3c6300;
  }

  /* Warning — surface/semantic/warning/subtlest */
  .sq-badge-warning {
    background-color: #ffedd4;
    border-color: #f54a00;
    color: #9f2d00;
  }

  /* Error — surface/semantic/error/subtlest */
  .sq-badge-error {
    background-color: #fedede;
    border-color: #cf121f;
    color: #6f040c;
  }

  /* Info — surface/semantic/info/subtlest */
  .sq-badge-info {
    background-color: #ccf1ff;
    border-color: #0095cc;
    color: #004a66;
  }

  /* Brand — surface/semantic/brand/subtlest */
  .sq-badge-brand {
    background-color: #cce2ff;
    border-color: #005fdb;
    color: #0047a3;
  }

  /* Indigo — surface/accent/indigo/subtlest */
  .sq-badge-indigo {
    background-color: #e0e7ff;
    border-color: #4f39f6;
    color: #372aac;
  }

  /* ── Dot ────────────────────────────────────────────────── */
  .sq-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: currentColor;
  }

  /* ── Icon ───────────────────────────────────────────────── */
  .sq-badge-icon {
    display: inline-flex;
    align-items: center;
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }

  /* ── Label ──────────────────────────────────────────────── */
  .sq-badge-label {
    line-height: 1;
  }

  /* ── Remove button ──────────────────────────────────────── */
  .sq-badge-remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: inherit;
    opacity: 0.6;
    cursor: pointer;
    transition: opacity 0.12s, background-color 0.12s;
    flex-shrink: 0;
  }

  .sq-badge-remove:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.08);
  }

  .sq-badge-remove:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 1px;
  }
`;

export { Badge };
