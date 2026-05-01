import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputState =
  | "empty"
  | "filled"
  | "focus"
  | "success"
  | "error"
  | "disabled"
  | "readonly";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Semantic validation state. Controls border/icon color. */
  state?: "default" | "success" | "error";
  /** Label rendered above the input. */
  label?: string;
  /** Required indicator appended to the label. */
  required?: boolean;
  /** Helper / hint text below the input. */
  helperText?: string;
  /** Error message — shown in red when state="error". */
  errorMessage?: string;
  /** Success message — shown in green when state="success". */
  successMessage?: string;
  /** Icon rendered at the start (left) of the input. */
  startIcon?: React.ReactNode;
  /** Icon rendered at the end (right) of the input. */
  endIcon?: React.ReactNode;
  /** Visual size variant. */
  inputSize?: "sm" | "md" | "lg";
}

// ─── Input ────────────────────────────────────────────────────────────────────

/**
 * Text input with full state support:
 * Empty · Filled · Active/Focus · Success · Error · Disabled · Read-only
 *
 * @example
 * // Empty (with placeholder)
 * <Input placeholder="Enter email…" label="Email" />
 *
 * // Error
 * <Input state="error" errorMessage="Invalid email format" value="bad@" />
 *
 * // Success
 * <Input state="success" successMessage="Email is available" value="john@example.com" />
 *
 * // Disabled
 * <Input disabled value="locked@example.com" label="Email" />
 *
 * // Read-only
 * <Input readOnly value="readonly@example.com" label="Email" />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      state = "default",
      label,
      required,
      helperText,
      errorMessage,
      successMessage,
      startIcon,
      endIcon,
      inputSize = "md",
      disabled,
      readOnly,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;

    const feedbackMessage =
      state === "error"
        ? errorMessage
        : state === "success"
        ? successMessage
        : helperText;

    const hasEndIcon = !!endIcon || state === "success" || state === "error";

    return (
      <div className="sq-input-root">
        {/* ── Label ─────────────────────────────────────────────────────── */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "sq-input-label",
              disabled && "sq-input-label-disabled"
            )}
          >
            {label}
            {required && (
              <span className="sq-input-required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* ── Input wrapper ─────────────────────────────────────────────── */}
        <div className="sq-input-wrapper">
          {/* Start icon */}
          {startIcon && (
            <span className="sq-input-icon sq-input-icon-start">
              {startIcon}
            </span>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            readOnly={readOnly}
            aria-describedby={feedbackMessage ? helperId : undefined}
            aria-invalid={state === "error"}
            aria-readonly={readOnly}
            className={cn(
              "sq-input",
              "form-control",
              // Size
              inputSize === "sm" && "sq-input-sm",
              inputSize === "lg" && "sq-input-lg",
              // State modifiers
              state === "success" && "sq-input-success",
              state === "error" && "sq-input-error",
              // Padding adjustments for icons
              startIcon && "sq-input-pl-icon",
              hasEndIcon && "sq-input-pr-icon",
              // Disabled / readonly
              disabled && "sq-input-disabled",
              readOnly && "sq-input-readonly",
              className
            )}
            {...props}
          />

          {/* End icon — prefer explicit endIcon, then state icons */}
          {endIcon ? (
            <span className="sq-input-icon sq-input-icon-end">{endIcon}</span>
          ) : state === "success" ? (
            <span className="sq-input-icon sq-input-icon-end sq-input-icon-success">
              <SuccessIcon />
            </span>
          ) : state === "error" ? (
            <span className="sq-input-icon sq-input-icon-end sq-input-icon-error">
              <ErrorIcon />
            </span>
          ) : null}
        </div>

        {/* ── Feedback text ─────────────────────────────────────────────── */}
        {feedbackMessage && (
          <span
            id={helperId}
            className={cn(
              "sq-input-helper",
              state === "error" && "sq-input-helper-error",
              state === "success" && "sq-input-helper-success"
            )}
          >
            {feedbackMessage}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="#5ea500" strokeWidth="1.5" />
    <path d="M5 8l2 2 4-4" stroke="#5ea500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="#cf121f" strokeWidth="1.5" />
    <path d="M8 5v3.5M8 11h.01" stroke="#cf121f" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── CSS ──────────────────────────────────────────────────────────────────────

export const InputStyles = `
  /* ── Root wrapper ───────────────────────────────────────── */
  .sq-input-root {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  /* ── Base input ─────────────────────────────────────────── */
  .sq-input {
    width: 100%;
    height: 36px;
    padding: 0 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #020618;
    background-color: #ffffff;
    border: 1px solid rgba(11, 18, 14, 0.14);
    border-radius: 8px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  /* Override Bootstrap form-control defaults */
  .sq-input.form-control {
    box-shadow: none;
  }

  /* Placeholder */
  .sq-input::placeholder {
    color: #62748e;
  }

  /* Focus */
  .sq-input:focus,
  .sq-input:focus-visible {
    border-color: #005fdb;
    box-shadow: 0 0 0 3px rgba(0, 95, 219, 0.2);
  }

  /* Size variants */
  .sq-input-sm { height: 30px; font-size: 0.8125rem; }
  .sq-input-lg { height: 44px; font-size: 1rem; }

  /* Success */
  .sq-input-success {
    border-color: #5ea500;
  }
  .sq-input-success:focus {
    border-color: #5ea500;
    box-shadow: 0 0 0 3px rgba(94, 165, 0, 0.2);
  }

  /* Error */
  .sq-input-error {
    border-color: #cf121f;
  }
  .sq-input-error:focus {
    border-color: #cf121f;
    box-shadow: 0 0 0 3px rgba(207, 18, 31, 0.2);
  }

  /* Disabled */
  .sq-input-disabled,
  .sq-input:disabled {
    background-color: #f8fafc;
    border-color: rgba(5, 21, 36, 0.06);
    color: #62748e;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Read-only */
  .sq-input-readonly,
  .sq-input:read-only {
    background-color: #f8fafc;
    border-color: rgba(5, 21, 36, 0.06);
    color: #314158;
    cursor: default;
  }

  /* Padding adjustments for icons */
  .sq-input-pl-icon { padding-left: 36px; }
  .sq-input-pr-icon { padding-right: 36px; }

  /* ── Icon positioning ───────────────────────────────────── */
  .sq-input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .sq-input-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    pointer-events: none;
    color: #62748e;
  }

  .sq-input-icon-start { left: 10px; }
  .sq-input-icon-end   { right: 10px; }

  .sq-input-icon-success { color: #5ea500; }
  .sq-input-icon-error   { color: #cf121f; }

  /* ── Label ──────────────────────────────────────────────── */
  .sq-input-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: #314158;
  }

  .sq-input-label-disabled { color: #62748e; }

  .sq-input-required {
    color: #cf121f;
    margin-left: 2px;
  }

  /* ── Helper / feedback ──────────────────────────────────── */
  .sq-input-helper {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: #62748e;
  }

  .sq-input-helper-error   { color: #6f040c; }
  .sq-input-helper-success { color: #3c6300; }
`;

export { Input };
