import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Semantic validation state. */
  state?: "default" | "success" | "error";
  /** Label rendered above the textarea. */
  label?: string;
  /** Required indicator. */
  required?: boolean;
  /** Helper / hint text. */
  helperText?: string;
  /** Error message — shown when state="error". */
  errorMessage?: string;
  /** Success message — shown when state="success". */
  successMessage?: string;
  /** Show character count badge (requires maxLength prop). */
  showCount?: boolean;
  /** Allow / prevent manual resizing. */
  resize?: "none" | "vertical" | "horizontal" | "both";
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

/**
 * Multiline text input with full state support:
 * Empty · Filled · Active/Focus · Success · Error · Disabled · Read-only
 *
 * @example
 * // Empty
 * <Textarea placeholder="Write your message…" label="Message" />
 *
 * // With character count
 * <Textarea maxLength={200} showCount label="Bio" />
 *
 * // Error
 * <Textarea state="error" errorMessage="Message is required." label="Message" />
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      state = "default",
      label,
      required,
      helperText,
      errorMessage,
      successMessage,
      showCount = false,
      resize = "vertical",
      disabled,
      readOnly,
      maxLength,
      value,
      defaultValue,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const helperId = `${textareaId}-helper`;

    // Character count (controlled + uncontrolled)
    const [charCount, setCharCount] = React.useState(
      () =>
        (typeof value === "string" ? value.length : 0) ||
        (typeof defaultValue === "string" ? defaultValue.length : 0)
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    const feedbackMessage =
      state === "error"
        ? errorMessage
        : state === "success"
        ? successMessage
        : helperText;

    return (
      <div className="sq-textarea-root">
        {/* ── Label row ─────────────────────────────────────────────────── */}
        <div className="sq-textarea-label-row">
          {label && (
            <label
              htmlFor={textareaId}
              className={cn(
                "sq-textarea-label",
                disabled && "sq-textarea-label-disabled"
              )}
            >
              {label}
              {required && (
                <span className="sq-textarea-required" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}

          {/* Character count */}
          {showCount && maxLength && (
            <span
              className={cn(
                "sq-textarea-count",
                charCount >= maxLength && "sq-textarea-count-max"
              )}
              aria-live="polite"
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>

        {/* ── Textarea ──────────────────────────────────────────────────── */}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-describedby={feedbackMessage ? helperId : undefined}
          aria-invalid={state === "error"}
          aria-readonly={readOnly}
          className={cn(
            "sq-textarea",
            "form-control",
            state === "success" && "sq-textarea-success",
            state === "error" && "sq-textarea-error",
            disabled && "sq-textarea-disabled",
            readOnly && "sq-textarea-readonly",
            `sq-textarea-resize-${resize}`,
            className
          )}
          {...props}
        />

        {/* ── Feedback ──────────────────────────────────────────────────── */}
        {feedbackMessage && (
          <span
            id={helperId}
            className={cn(
              "sq-textarea-helper",
              state === "error" && "sq-textarea-helper-error",
              state === "success" && "sq-textarea-helper-success"
            )}
          >
            {feedbackMessage}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// ─── CSS ──────────────────────────────────────────────────────────────────────

export const TextareaStyles = `
  /* ── Root wrapper ───────────────────────────────────────── */
  .sq-textarea-root {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  /* ── Label row ──────────────────────────────────────────── */
  .sq-textarea-label-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  /* ── Base ───────────────────────────────────────────────── */
  .sq-textarea {
    width: 100%;
    min-height: 80px;
    padding: 8px 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #020618;
    background-color: #ffffff;
    border: 1px solid rgba(11, 18, 14, 0.14);
    border-radius: 8px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .sq-textarea.form-control { box-shadow: none; }

  .sq-textarea::placeholder { color: #62748e; }

  /* Focus */
  .sq-textarea:focus,
  .sq-textarea:focus-visible {
    border-color: #005fdb;
    box-shadow: 0 0 0 3px rgba(0, 95, 219, 0.2);
  }

  /* Resize variants */
  .sq-textarea-resize-none       { resize: none; }
  .sq-textarea-resize-vertical   { resize: vertical; }
  .sq-textarea-resize-horizontal { resize: horizontal; }
  .sq-textarea-resize-both       { resize: both; }

  /* Success */
  .sq-textarea-success { border-color: #5ea500; }
  .sq-textarea-success:focus {
    border-color: #5ea500;
    box-shadow: 0 0 0 3px rgba(94, 165, 0, 0.2);
  }

  /* Error */
  .sq-textarea-error { border-color: #cf121f; }
  .sq-textarea-error:focus {
    border-color: #cf121f;
    box-shadow: 0 0 0 3px rgba(207, 18, 31, 0.2);
  }

  /* Disabled */
  .sq-textarea-disabled,
  .sq-textarea:disabled {
    background-color: #f8fafc;
    border-color: rgba(5, 21, 36, 0.06);
    color: #62748e;
    cursor: not-allowed;
    resize: none;
  }

  /* Read-only */
  .sq-textarea-readonly,
  .sq-textarea:read-only {
    background-color: #f8fafc;
    border-color: rgba(5, 21, 36, 0.06);
    color: #314158;
    cursor: default;
    resize: none;
  }

  /* ── Label ──────────────────────────────────────────────── */
  .sq-textarea-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: #314158;
  }

  .sq-textarea-label-disabled { color: #62748e; }

  .sq-textarea-required {
    color: #cf121f;
    margin-left: 2px;
  }

  /* ── Char count ─────────────────────────────────────────── */
  .sq-textarea-count {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: #62748e;
  }

  .sq-textarea-count-max { color: #cf121f; }

  /* ── Helper ─────────────────────────────────────────────── */
  .sq-textarea-helper         { font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #62748e; }
  .sq-textarea-helper-error   { color: #6f040c; }
  .sq-textarea-helper-success { color: #3c6300; }
`;

export { Textarea };
