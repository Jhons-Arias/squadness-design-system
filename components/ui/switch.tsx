import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SwitchProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    "checked" | "onCheckedChange"
  > {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Label rendered beside the switch. */
  label?: string;
  /** Position of the label relative to the switch. */
  labelPosition?: "left" | "right";
  /** Shows a spinner inside the thumb — use when waiting for server confirmation. */
  loading?: boolean;
  /** Helper text rendered below. */
  helperText?: string;
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = () => (
  <svg
    className="sq-switch-spinner"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="6"
      cy="6"
      r="5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="25"
      strokeDashoffset="10"
    />
  </svg>
);

// ─── Switch ───────────────────────────────────────────────────────────────────

/**
 * Toggle switch with full state support:
 * Off · On · Hover · Focus · Disabled · Loading
 *
 * The Loading state disables interaction and renders a spinner in the thumb,
 * useful when the toggle requires server-side validation before committing.
 *
 * @example
 * // Basic on/off
 * <Switch checked={enabled} onCheckedChange={setEnabled} label="Dark mode" />
 *
 * // Loading (waiting for server)
 * <Switch checked={enabled} loading label="Notifications" />
 *
 * // Disabled
 * <Switch disabled label="Feature locked" />
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      checked,
      onCheckedChange,
      label,
      labelPosition = "right",
      loading = false,
      helperText,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = id ?? generatedId;

    const isDisabled = disabled || loading;

    const labelEl = label && (
      <label
        htmlFor={switchId}
        className={cn(
          "sq-switch-label mb-0 user-select-none",
          isDisabled && "sq-switch-label-disabled"
        )}
      >
        {label}
      </label>
    );

    return (
      <div className="sq-switch-root">
        <div className="sq-switch-row">
          {/* Left label */}
          {labelPosition === "left" && labelEl}

          {/* ── Root track ────────────────────────────────────────────── */}
          <SwitchPrimitive.Root
            ref={ref}
            id={switchId}
            checked={checked}
            onCheckedChange={loading ? undefined : onCheckedChange}
            disabled={isDisabled}
            aria-busy={loading}
            className={cn(
              "squadness-switch",
              "sq-switch-track",
              loading && "sq-switch-loading",
              isDisabled && "sq-switch-disabled",
              className
            )}
            {...props}
          >
            {/* ── Thumb ─────────────────────────────────────────────── */}
            <SwitchPrimitive.Thumb
              className={cn(
                "sq-switch-thumb",
                loading && "sq-switch-thumb-loading"
              )}
            >
              {loading && <Spinner />}
            </SwitchPrimitive.Thumb>
          </SwitchPrimitive.Root>

          {/* Right label (default) */}
          {labelPosition === "right" && labelEl}
        </div>

        {/* Helper text */}
        {helperText && (
          <span className="sq-switch-helper">{helperText}</span>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

// ─── CSS ──────────────────────────────────────────────────────────────────────

export const SwitchStyles = `
  /* ── Wrapper layout ─────────────────────────────────────── */
  .sq-switch-root {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
  }

  .sq-switch-row {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  /* ── Switch track ───────────────────────────────────────── */
  .sq-switch-track {
    display: inline-flex;
    align-items: center;
    width: 36px;
    height: 20px;
    border-radius: 9999px;
    background-color: #e2e8f0;
    cursor: pointer;
    outline: none;
    position: relative;
    flex-shrink: 0;
  }

  /* Off → hover */
  .squadness-switch:hover:not([disabled]) {
    background-color: #cad5e2;
  }

  /* On */
  .squadness-switch[data-state="checked"] {
    background-color: #005fdb;
  }

  /* On → hover */
  .squadness-switch[data-state="checked"]:hover:not([disabled]) {
    background-color: #0047a3;
  }

  /* Focus ring */
  .squadness-switch:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 95, 219, 0.3);
  }

  /* Loading */
  .sq-switch-loading {
    opacity: 0.7;
    cursor: wait;
  }

  /* Disabled */
  .sq-switch-disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ── Thumb ──────────────────────────────────────────────── */
  .sq-switch-thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    min-width: 14px;
    background-color: #ffffff;
    transform: translateX(3px);
    /* Radix sets data-state on root; we drive translate via it */
  }

  /* Radix moves thumb via translateX on the root element, but we do it via CSS */
  [data-state="checked"] .sq-switch-thumb {
    transform: translateX(19px);
  }

  .sq-switch-thumb-loading {
    background-color: #f8fafc;
  }

  /* ── Spinner ────────────────────────────────────────────── */
  .sq-switch-spinner {
    width: 9px;
    height: 9px;
    animation: sq-spin 0.75s linear infinite;
    color: #62748e;
  }

  @keyframes sq-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* ── Label ──────────────────────────────────────────────── */
  .sq-switch-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #314158;
    cursor: pointer;
    margin: 0;
    user-select: none;
  }

  .sq-switch-label-disabled {
    color: #62748e;
    cursor: not-allowed;
  }

  /* ── Helper ─────────────────────────────────────────────── */
  .sq-switch-helper {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #62748e;
    padding-left: 44px;
  }
`;

export { Switch };
