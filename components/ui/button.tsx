import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Replaces content with a spinner and blocks interaction. */
  loading?: boolean;
  /** Render an icon before the label. */
  startIcon?: React.ReactNode;
  /** Render an icon after the label. */
  endIcon?: React.ReactNode;
  /** Stretch to full container width. */
  fullWidth?: boolean;
}

// ─── Icon-only Button ─────────────────────────────────────────────────────────

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Accessible label — required for icon-only buttons. */
  "aria-label": string;
  icon: React.ReactNode;
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

const ButtonSpinner: React.FC<{ size?: ButtonSize }> = ({ size = "md" }) => {
  const dim = size === "xs" || size === "sm" ? 12 : size === "lg" ? 18 : 14;
  return (
    <svg
      className="sq-btn-spinner"
      width={dim}
      height={dim}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="30"
        strokeDashoffset="12"
        opacity="0.85"
      />
    </svg>
  );
};

// ─── Button ───────────────────────────────────────────────────────────────────

/**
 * Multi-variant button with full state support:
 * Default · Hover · Active/Pressed · Focus · Loading · Disabled
 *
 * Variants: primary · secondary · outline · ghost · danger
 * Sizes: xs · sm · md (default) · lg
 *
 * @example
 * <Button variant="primary" startIcon={<PlusIcon />}>Add item</Button>
 * <Button variant="outline" loading>Saving…</Button>
 * <Button variant="danger" disabled>Delete</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      startIcon,
      endIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          "sq-btn",
          `sq-btn-${variant}`,
          `sq-btn-${size}`,
          loading && "sq-btn-loading",
          fullWidth && "w-100",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <ButtonSpinner size={size} />
            <span className="sq-btn-loading-label">{children}</span>
          </>
        ) : (
          <>
            {startIcon && (
              <span className="sq-btn-icon sq-btn-icon-start" aria-hidden="true">
                {startIcon}
              </span>
            )}
            {children}
            {endIcon && (
              <span className="sq-btn-icon sq-btn-icon-end" aria-hidden="true">
                {endIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

// ─── IconButton ───────────────────────────────────────────────────────────────

/**
 * Square icon-only button — same states as Button.
 * Requires `aria-label` for accessibility.
 *
 * @example
 * <IconButton aria-label="Add item" icon={<PlusIcon />} />
 * <IconButton aria-label="Delete" variant="danger" icon={<TrashIcon />} />
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "ghost",
      size = "md",
      loading = false,
      icon,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          "sq-btn sq-icon-btn",
          `sq-btn-${variant}`,
          `sq-btn-${size}`,
          loading && "sq-btn-loading",
          className
        )}
        {...props}
      >
        {loading ? <ButtonSpinner size={size} /> : icon}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

// ─── CSS ──────────────────────────────────────────────────────────────────────

export const ButtonStyles = `
  /* ── Base ───────────────────────────────────────────────── */
  .sq-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    outline: none;
    text-decoration: none;
    transition: background-color 0.12s, border-color 0.12s, color 0.12s, opacity 0.12s, box-shadow 0.12s;
    white-space: nowrap;
    user-select: none;
  }

  /* ── Sizes ──────────────────────────────────────────────── */
  .sq-btn-xs { height: 24px; padding: 0 8px;  font-size: 0.75rem;  }
  .sq-btn-sm { height: 30px; padding: 0 12px; font-size: 0.75rem;  }
  .sq-btn-md { height: 32px; padding: 0 12px; font-size: 0.75rem;  }
  .sq-btn-lg { height: 36px; padding: 0 16px; font-size: 0.875rem; }

  /* Icon button — square */
  .sq-icon-btn.sq-btn-xs { width: 24px; padding: 0; }
  .sq-icon-btn.sq-btn-sm { width: 30px; padding: 0; }
  .sq-icon-btn.sq-btn-md { width: 32px; padding: 0; }
  .sq-icon-btn.sq-btn-lg { width: 36px; padding: 0; }

  /* ── Variants ───────────────────────────────────────────── */

  /* Primary — #005fdb (brand blue from design system) */
  .sq-btn-primary {
    background-color: #005fdb;
    border-color: #005fdb;
    color: #f8ffff;
  }
  .sq-btn-primary:hover:not(:disabled) {
    background-color: #0047a3;
    border-color: #0047a3;
  }
  .sq-btn-primary:active:not(:disabled) {
    background-color: #0047a3;
    border-color: #0047a3;
  }

  /* Secondary — #e2e8f0 surface */
  .sq-btn-secondary {
    background-color: #e2e8f0;
    border-color: #e2e8f0;
    color: #0f172b;
  }
  .sq-btn-secondary:hover:not(:disabled) {
    background-color: #cad5e2;
    border-color: #cad5e2;
  }
  .sq-btn-secondary:active:not(:disabled) {
    background-color: #90a1b9;
    border-color: #90a1b9;
  }

  /* Outline — subtle border */
  .sq-btn-outline {
    background-color: #f8fafc;
    border-color: rgba(5, 21, 36, 0.06);
    color: #314158;
  }
  .sq-btn-outline:hover:not(:disabled) {
    background-color: #f1f5f9;
    border-color: rgba(5, 21, 36, 0.06);
  }
  .sq-btn-outline:active:not(:disabled) {
    background-color: #e2e8f0;
    border-color: rgba(5, 21, 36, 0.06);
  }

  /* Tertiary — subtle brand tint, icon buttons only */
  .sq-btn-tertiary {
    background-color: #eff6ff;
    border-color: transparent;
    color: #005fdb;
  }
  .sq-btn-tertiary:hover:not(:disabled) {
    background-color: #dbeafe;
  }
  .sq-btn-tertiary:active:not(:disabled) {
    background-color: #bfdbfe;
  }

  /* Ghost — no bg */
  .sq-btn-ghost {
    background-color: transparent;
    border-color: transparent;
    color: #0f172b;
  }
  .sq-btn-ghost:hover:not(:disabled) {
    background-color: #f8fafc;
  }
  .sq-btn-ghost:active:not(:disabled) {
    background-color: #f1f5f9;
  }

  /* Danger — #9e0b15 */
  .sq-btn-danger {
    background-color: #9e0b15;
    border-color: #9e0b15;
    color: #feeded;
  }
  .sq-btn-danger:hover:not(:disabled) {
    background-color: #6f040c;
    border-color: #6f040c;
  }
  .sq-btn-danger:active:not(:disabled) {
    background-color: #430204;
    border-color: #430204;
  }

  /* ── Focus ring ─────────────────────────────────────────── */
  .sq-btn:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 95, 219, 0.3);
  }
  .sq-btn-danger:focus-visible {
    box-shadow: 0 0 0 3px rgba(158, 11, 21, 0.3);
  }

  /* ── Disabled ───────────────────────────────────────────── */
  .sq-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ── Loading ────────────────────────────────────────────── */
  .sq-btn-loading {
    cursor: wait;
    pointer-events: none;
  }

  .sq-btn-loading-label {
    opacity: 0.6;
  }

  /* ── Spinner ────────────────────────────────────────────── */
  .sq-btn-spinner {
    animation: sq-spin 0.65s linear infinite;
    flex-shrink: 0;
  }

  @keyframes sq-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* ── Icons ──────────────────────────────────────────────── */
  .sq-btn-icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }
`;

export { Button, IconButton };
