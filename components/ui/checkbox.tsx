import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CheckboxState =
  | "unselected"
  | "selected"
  | "indeterminate"
  | "hover"
  | "focus"
  | "disabled";

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "checked" | "onCheckedChange"
  > {
  /** Controlled checked value. Accepts boolean or "indeterminate". */
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  /** Label rendered beside the checkbox. */
  label?: string;
  /** Helper / error message rendered below the label. */
  helperText?: string;
  /** Forces an error appearance (red border). */
  hasError?: boolean;
}

// ─── CheckIcon ────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1 4L3.5 6.5L9 1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── IndeterminateIcon ────────────────────────────────────────────────────────

const IndeterminateIcon = () => (
  <svg
    width="10"
    height="2"
    viewBox="0 0 10 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1 1H9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Checkbox ─────────────────────────────────────────────────────────────────

/**
 * Checkbox component with full state support:
 * Unselected · Selected · Indeterminate · Hover · Focus · Disabled
 *
 * Built on Radix UI CheckboxPrimitive — fully accessible (WAI-ARIA 1.2).
 *
 * @example
 * // Unselected
 * <Checkbox label="Accept terms" />
 *
 * // Selected
 * <Checkbox checked={true} label="Accept terms" />
 *
 * // Indeterminate (partial group selection)
 * <Checkbox checked="indeterminate" label="Select all" />
 *
 * // Disabled
 * <Checkbox disabled label="Not available" />
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      checked,
      onCheckedChange,
      label,
      helperText,
      hasError,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;

    const isIndeterminate = checked === "indeterminate";
    const isChecked = checked === true;

    return (
      <div className="sq-checkbox-root">
        <div className="sq-checkbox-row">
          {/* ── Root ───────────────────────────────────────────────────── */}
          <CheckboxPrimitive.Root
            ref={ref}
            id={checkboxId}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            aria-checked={isIndeterminate ? "mixed" : isChecked}
            className={cn(
              "squadness-checkbox",
              "sq-checkbox-size",
              // Color states
              isChecked || isIndeterminate
                ? "sq-checkbox-checked"
                : "sq-checkbox-unchecked",
              // Error
              hasError && "sq-checkbox-error",
              // Disabled
              disabled && "sq-checkbox-disabled",
              className
            )}
            {...props}
          >
            {/* ── Indicator ──────────────────────────────────────────── */}
            <CheckboxPrimitive.Indicator
              className="sq-checkbox-indicator"
              forceMount
            >
              {isIndeterminate ? <IndeterminateIcon /> : <CheckIcon />}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          {/* ── Label ──────────────────────────────────────────────────── */}
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "sq-checkbox-label",
                disabled && "sq-checkbox-label-disabled"
              )}
            >
              {label}
            </label>
          )}
        </div>

        {/* ── Helper / Error text ──────────────────────────────────────── */}
        {helperText && (
          <span
            className={cn(
              "sq-checkbox-helper",
              hasError ? "sq-checkbox-helper-error" : "sq-checkbox-helper-default"
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

// ─── CSS (injected via <style> for portability) ───────────────────────────────
// In a real project move these into your global CSS / Tailwind config.

export const CheckboxStyles = `
  /* ── Wrapper layout ─────────────────────────────────────── */
  .sq-checkbox-root {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
  }

  .sq-checkbox-row {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  /* ── Checkbox control ───────────────────────────────────── */
  .squadness-checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    position: relative;
    transition: background-color 0.12s, border-color 0.12s;
  }

  .sq-checkbox-size {
    width: 16px;
    height: 16px;
    min-width: 16px;
  }

  /* ── Indicator (check / dash icon) ─────────────────────── */
  .sq-checkbox-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    line-height: 0;
  }

  /* Unchecked — hide the icon */
  .sq-checkbox-unchecked .sq-checkbox-indicator {
    visibility: hidden;
  }

  /* Unchecked (default / unselected) */
  .sq-checkbox-unchecked {
    background-color: #ffffff;
    border-color: rgba(11, 18, 14, 0.14);
  }

  /* Hover on unchecked */
  .sq-checkbox-unchecked:hover:not([disabled]) {
    border-color: #62748e;
    background-color: #f8fafc;
  }

  /* Checked / indeterminate */
  .sq-checkbox-checked {
    background-color: #005fdb;
    border-color: #005fdb;
  }

  .sq-checkbox-checked:hover:not([disabled]) {
    background-color: #0047a3;
    border-color: #0047a3;
  }

  /* Focus ring (keyboard navigation) */
  .squadness-checkbox:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 95, 219, 0.3);
    border-color: #005fdb;
  }

  /* Error */
  .sq-checkbox-error {
    border-color: #cf121f !important;
  }

  /* Disabled */
  .sq-checkbox-disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ── Label ──────────────────────────────────────────────── */
  .sq-checkbox-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #314158;
    cursor: pointer;
    margin: 0;
    user-select: none;
  }

  .sq-checkbox-label-disabled {
    color: #62748e;
    cursor: not-allowed;
  }

  /* ── Helper text ────────────────────────────────────────── */
  .sq-checkbox-helper {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    line-height: 1rem;
    padding-left: 24px;
  }

  .sq-checkbox-helper-default {
    color: #62748e;
  }

  .sq-checkbox-helper-error {
    color: #6f040c;
  }
`;

export { Checkbox };
