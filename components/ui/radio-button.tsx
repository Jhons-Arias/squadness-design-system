import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadioState = "unselected" | "selected" | "hover" | "focus" | "disabled";

// ─── RadioGroup ───────────────────────────────────────────────────────────────

/**
 * Wrapper for a group of RadioButton items. Manages the shared `value` state.
 *
 * @example
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioButton value="a" label="Option A" />
 *   <RadioButton value="b" label="Option B" />
 *   <RadioButton value="c" label="Option C" disabled />
 * </RadioGroup>
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("sq-radio-group", className)}
    {...props}
  />
));
RadioGroup.displayName = "RadioGroup";

// ─── RadioButton ──────────────────────────────────────────────────────────────

export interface RadioButtonProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Label rendered beside the radio. */
  label?: string;
  /** Helper / description text rendered below the label. */
  helperText?: string;
}

/**
 * Single radio button. Must be a child of <RadioGroup>.
 *
 * States: Unselected · Selected · Hover · Focus · Disabled
 *
 * @example
 * <RadioButton value="option1" label="Option 1" />
 * <RadioButton value="option2" label="Option 2 (disabled)" disabled />
 */
const RadioButton = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioButtonProps
>(({ className, label, helperText, disabled, id, value, ...props }, ref) => {
  const generatedId = React.useId();
  const radioId = id ?? generatedId;

  return (
    <div className="sq-radio-root">
      <div className="sq-radio-row">
        {/* ── Radio control ─────────────────────────────────────────────── */}
        <RadioGroupPrimitive.Item
          ref={ref}
          id={radioId}
          value={value}
          disabled={disabled}
          className={cn(
            "squadness-radio",
            "sq-radio-size",
            disabled && "sq-radio-disabled",
            className
          )}
          {...props}
        >
          {/* ── Indicator dot ────────────────────────────────────────────── */}
          <RadioGroupPrimitive.Indicator className="sq-radio-dot" />
        </RadioGroupPrimitive.Item>

        {/* ── Label ───────────────────────────────────────────────────────── */}
        {label && (
          <label
            htmlFor={radioId}
            className={cn(
              "sq-radio-label",
              disabled && "sq-radio-label-disabled"
            )}
          >
            {label}
          </label>
        )}
      </div>

      {/* ── Helper text ───────────────────────────────────────────────────── */}
      {helperText && (
        <span className="sq-radio-helper">{helperText}</span>
      )}
    </div>
  );
});
RadioButton.displayName = "RadioButton";

// ─── CSS ──────────────────────────────────────────────────────────────────────

export const RadioButtonStyles = `
  /* ── RadioGroup ─────────────────────────────────────────── */
  .sq-radio-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* ── Wrapper layout ─────────────────────────────────────── */
  .sq-radio-root {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
  }

  .sq-radio-row {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  /* ── RadioButton base ──────────────────────────────────── */
  .squadness-radio {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    outline: none;
    background-color: #ffffff;
    border-color: rgba(11, 18, 14, 0.14);
    position: relative;
    transition: background-color 0.12s, border-color 0.12s;
  }

  .sq-radio-size {
    width: 16px;
    height: 16px;
    min-width: 16px;
  }

  /* Hover (unselected) */
  .squadness-radio:hover:not([disabled]) {
    border-color: #62748e;
    background-color: #f8fafc;
  }

  /* Selected (via [data-state="checked"]) */
  .squadness-radio[data-state="checked"] {
    background-color: #005fdb;
    border-color: #005fdb;
  }

  .squadness-radio[data-state="checked"]:hover:not([disabled]) {
    background-color: #0047a3;
    border-color: #0047a3;
  }

  /* Focus ring */
  .squadness-radio:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 95, 219, 0.3);
    border-color: #005fdb;
  }

  /* Indicator dot */
  .sq-radio-dot {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #ffffff;
  }

  /* Disabled */
  .sq-radio-disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Label */
  .sq-radio-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #314158;
    cursor: pointer;
    margin: 0;
    user-select: none;
  }

  .sq-radio-label-disabled {
    color: #62748e;
    cursor: not-allowed;
  }

  /* Helper text */
  .sq-radio-helper {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #62748e;
    padding-left: 24px;
  }
`;

export { RadioGroup, RadioButton };
