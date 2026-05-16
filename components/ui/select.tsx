'use client'

import * as React from "react";
import { cn } from "@/lib/utils";
export { SelectStyles } from "./select.styles";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Options to display in the dropdown. */
  options: SelectOption[];
  /** Controlled value. */
  value?: string;
  /** Callback when the selected value changes. */
  onValueChange?: (value: string) => void;
  /** Placeholder shown when nothing is selected. */
  placeholder?: string;
  /** Label rendered above the trigger. */
  label?: string;
  /** Required indicator appended to the label. */
  required?: boolean;
  /** Helper / hint text rendered below the trigger. */
  helperText?: string;
  /** Error message — shown when state="error". */
  errorMessage?: string;
  /** Semantic validation state. */
  state?: "default" | "error";
  /** Disables the select. */
  disabled?: boolean;
  /** Additional class for the root wrapper. */
  className?: string;
  /** ID for the trigger (auto-generated if omitted). */
  id?: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 12.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Select ───────────────────────────────────────────────────────────────────

/**
 * Dropdown select with full state support:
 * Default · Open · Filled · Disabled · Error
 *
 * Fully accessible: keyboard navigation (↑ ↓ Enter Escape), ARIA roles.
 *
 * @example
 * // Basic
 * <Select
 *   placeholder="Select an option"
 *   options={[{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }]}
 *   value={value}
 *   onValueChange={setValue}
 * />
 *
 * // With label + validation
 * <Select
 *   label="Status"
 *   required
 *   state="error"
 *   errorMessage="Please select a status."
 *   options={options}
 * />
 */
const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select…",
      label,
      required,
      helperText,
      errorMessage,
      state = "default",
      disabled,
      className,
      id,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const listboxId = `${selectId}-listbox`;
    const helperId = `${selectId}-helper`;

    const [open, setOpen] = React.useState(false);
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    const selectedOption = options.find((o) => o.value === value);
    const feedbackMessage = state === "error" ? errorMessage : helperText;

    // ── Close on outside click ─────────────────────────────────────────────
    React.useEffect(() => {
      if (!open) return;
      const handle = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handle);
      return () => document.removeEventListener("mousedown", handle);
    }, [open]);

    // ── Reset focused index when closing ──────────────────────────────────
    React.useEffect(() => {
      if (!open) setFocusedIndex(-1);
    }, [open]);

    // ── Keyboard navigation ────────────────────────────────────────────────
    const handleKeyDown = (e: React.KeyboardEvent) => {
      const enabledOptions = options.filter((o) => !o.disabled);

      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true);
          setFocusedIndex(0);
        }
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, enabledOptions.length - 1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
        return;
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (focusedIndex >= 0 && enabledOptions[focusedIndex]) {
          onValueChange?.(enabledOptions[focusedIndex].value);
          setOpen(false);
          triggerRef.current?.focus();
        }
        return;
      }
    };

    const handleOptionClick = (optValue: string) => {
      onValueChange?.(optValue);
      setOpen(false);
      triggerRef.current?.focus();
    };

    // Merge external ref with internal
    const setRef = (el: HTMLButtonElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
    };

    return (
      <div ref={containerRef} className={cn("sq-select-root", className)}>
        {/* ── Label ─────────────────────────────────────────────────────── */}
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "sq-select-label",
              disabled && "sq-select-label-disabled"
            )}
          >
            {label}
            {required && (
              <span className="sq-select-required" aria-hidden="true">*</span>
            )}
          </label>
        )}

        {/* ── Trigger ───────────────────────────────────────────────────── */}
        <button
          ref={setRef}
          id={selectId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-describedby={feedbackMessage ? helperId : undefined}
          aria-invalid={state === "error"}
          disabled={disabled}
          onClick={() => !disabled && setOpen((v) => !v)}
          onKeyDown={handleKeyDown}
          className={cn(
            "sq-select-trigger",
            open && "sq-select-trigger-open",
            state === "error" && "sq-select-trigger-error",
            disabled && "sq-select-trigger-disabled"
          )}
        >
          <span className={cn("sq-select-value", !selectedOption && "sq-select-placeholder")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="sq-select-icon" aria-hidden="true">
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </span>
        </button>

        {/* ── Dropdown panel ────────────────────────────────────────────── */}
        {open && (
          <div
            id={listboxId}
            role="listbox"
            aria-label={label ?? placeholder}
            className="sq-select-content"
            onKeyDown={handleKeyDown}
          >
            {options.map((opt, idx) => {
              const isSelected = opt.value === value;
              const enabledOptions = options.filter((o) => !o.disabled);
              const enabledIdx = enabledOptions.findIndex((o) => o.value === opt.value);
              const isFocused = enabledIdx !== -1 && enabledIdx === focusedIndex;

              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  tabIndex={-1}
                  onClick={() => !opt.disabled && handleOptionClick(opt.value)}
                  onMouseEnter={() => {
                    const enabledIdx = enabledOptions.findIndex((o) => o.value === opt.value);
                    if (enabledIdx !== -1) setFocusedIndex(enabledIdx);
                  }}
                  className={cn(
                    "sq-select-item",
                    isSelected && "sq-select-item-selected",
                    isFocused && "sq-select-item-focused",
                    opt.disabled && "sq-select-item-disabled"
                  )}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <span className="sq-select-item-indicator">
                      <CheckIcon />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Feedback text ─────────────────────────────────────────────── */}
        {feedbackMessage && (
          <span
            id={helperId}
            className={cn(
              "sq-select-helper",
              state === "error" && "sq-select-helper-error"
            )}
          >
            {feedbackMessage}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
