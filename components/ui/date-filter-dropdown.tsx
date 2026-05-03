'use client'

import * as React from "react";
import { cn } from "@/lib/utils";
export { DateFilterDropdownStyles } from "./date-filter-dropdown.styles";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DateFilterMode = "single" | "range";

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DateFilterDropdownProps {
  /** Single date or range selection. */
  mode?: DateFilterMode;
  /** Selected single date value. */
  value?: Date;
  /** Selected range (mode="range"). */
  range?: DateRange;
  /** Callback for single date change. */
  onValueChange?: (date: Date | undefined) => void;
  /** Callback for range change. */
  onRangeChange?: (range: DateRange) => void;
  /** Placeholder shown when nothing is selected. */
  placeholder?: string;
  /** Disabled state — blocks opening the dropdown. */
  disabled?: boolean;
  /** Additional class. */
  className?: string;
  /** Locale string for date formatting (default: "es-CO"). */
  locale?: string;
}

// ─── Icons (paths from /docs/public/icons — fill set to currentColor) ─────────

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1.75 10.75V2.25001H3.34613V1.19238H4.11538V2.25001H7.90387V1.19238H8.65387V2.25001H10.25V10.75H1.75ZM2.5 10H9.5V5.15388H2.5V10Z" fill="currentColor" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M5.99973 7.52685L3.17285 4.69997L3.69973 4.1731L5.99973 6.4731L8.29973 4.1731L8.8266 4.69997L5.99973 7.52685Z" fill="currentColor" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6.99973 8.82685L4.17285 5.99997L6.99973 3.1731L7.5266 3.69997L5.2266 5.99997L7.5266 8.29997L6.99973 8.82685Z" fill="currentColor" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6.47285 5.99997L4.17285 3.69997L4.69973 3.1731L7.5266 5.99997L4.69973 8.82685L4.17285 8.29997L6.47285 5.99997Z" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3.19973 9.32685L2.67285 8.79997L5.47285 5.99997L2.67285 3.19997L3.19973 2.6731L5.99973 5.4731L8.79973 2.6731L9.3266 3.19997L6.5266 5.99997L9.3266 8.79997L8.79973 9.32685L5.99973 6.52685L3.19973 9.32685Z" fill="currentColor" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date: Date, from?: Date, to?: Date): boolean {
  if (!from || !to) return false;
  return date >= from && date <= to;
}

function formatDate(date: Date, locale = "es-CO"): string {
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  return cells;
}

// ─── MiniCalendar ─────────────────────────────────────────────────────────────

interface MiniCalendarProps {
  viewYear: number;
  viewMonth: number;
  onMonthChange: (year: number, month: number) => void;
  selectedDate?: Date;
  rangeFrom?: Date;
  rangeTo?: Date;
  hoverDate?: Date;
  mode: DateFilterMode;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date | undefined) => void;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  viewYear,
  viewMonth,
  onMonthChange,
  selectedDate,
  rangeFrom,
  rangeTo,
  hoverDate,
  mode,
  onDayClick,
  onDayHover,
}) => {
  const days = buildCalendarDays(viewYear, viewMonth);
  const today = new Date();

  const goPrev = () => {
    const d = new Date(viewYear, viewMonth - 1, 1);
    onMonthChange(d.getFullYear(), d.getMonth());
  };

  const goNext = () => {
    const d = new Date(viewYear, viewMonth + 1, 1);
    onMonthChange(d.getFullYear(), d.getMonth());
  };

  return (
    <div className="sq-dfd-calendar">
      {/* Month header */}
      <div className="sq-dfd-cal-header">
        <button className="sq-dfd-cal-nav" onClick={goPrev} aria-label="Previous month">
          <ChevronLeftIcon />
        </button>
        <span className="sq-dfd-cal-title">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button className="sq-dfd-cal-nav" onClick={goNext} aria-label="Next month">
          <ChevronRightIcon />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="sq-dfd-cal-grid">
        {DAYS.map((d) => (
          <span key={d} className="sq-dfd-cal-dow">{d}</span>
        ))}

        {/* Day cells */}
        {days.map((date, idx) => {
          if (!date) return <span key={`empty-${idx}`} />;

          const isToday = isSameDay(date, today);
          const isSelected =
            mode === "single"
              ? selectedDate && isSameDay(date, selectedDate)
              : (rangeFrom && isSameDay(date, rangeFrom)) ||
                (rangeTo && isSameDay(date, rangeTo));
          const isRangeStart = mode === "range" && rangeFrom && isSameDay(date, rangeFrom);
          const isRangeEnd = mode === "range" && rangeTo && isSameDay(date, rangeTo);

          // Highlight range (committed or preview)
          const effectiveTo = rangeTo ?? hoverDate;
          const inRange =
            mode === "range" && isInRange(date, rangeFrom, effectiveTo);

          return (
            <button
              key={date.toISOString()}
              className={cn(
                "sq-dfd-cal-day",
                isToday && !isSelected && "sq-dfd-cal-day-today",
                isSelected && "sq-dfd-cal-day-selected",
                inRange && !isSelected && "sq-dfd-cal-day-in-range",
                isRangeStart && "sq-dfd-cal-day-range-start",
                isRangeEnd && "sq-dfd-cal-day-range-end"
              )}
              onClick={() => onDayClick(date)}
              onMouseEnter={() => onDayHover(date)}
              onMouseLeave={() => onDayHover(undefined)}
              aria-label={formatDate(date)}
              aria-pressed={!!isSelected}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── DateFilterDropdown ───────────────────────────────────────────────────────

/**
 * Date filter dropdown with full state support:
 * Closed · Open · Date Selected · Range Selection · Hover · Focus · Disabled
 *
 * Matches the "Date Filter Controls" section in the Figma design.
 * Clicking the trigger opens an inline calendar panel.
 *
 * @example
 * // Single date
 * <DateFilterDropdown
 *   placeholder="Seleccionar fecha"
 *   value={date}
 *   onValueChange={setDate}
 * />
 *
 * // Date range
 * <DateFilterDropdown
 *   mode="range"
 *   range={range}
 *   onRangeChange={setRange}
 *   placeholder="Rango de fechas"
 * />
 */
const DateFilterDropdown: React.FC<DateFilterDropdownProps> = ({
  mode = "single",
  value,
  range,
  onValueChange,
  onRangeChange,
  placeholder = "Seleccionar fecha",
  disabled = false,
  className,
  locale = "es-CO",
}) => {
  const [open, setOpen] = React.useState(false);
  const [hoverDate, setHoverDate] = React.useState<Date | undefined>();

  const today = new Date();
  const [viewYear, setViewYear] = React.useState(
    (mode === "range" ? range?.from?.getFullYear() : value?.getFullYear()) ??
      today.getFullYear()
  );
  const [viewMonth, setViewMonth] = React.useState(
    (mode === "range" ? range?.from?.getMonth() : value?.getMonth()) ??
      today.getMonth()
  );

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click
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

  const handleDayClick = (date: Date) => {
    if (mode === "single") {
      onValueChange?.(date);
      setOpen(false);
    } else {
      const from = range?.from;
      const to = range?.to;
      if (!from || (from && to)) {
        // Start new range
        onRangeChange?.({ from: date, to: undefined });
      } else {
        // Complete range
        if (date < from) {
          onRangeChange?.({ from: date, to: from });
        } else {
          onRangeChange?.({ from, to: date });
        }
        setOpen(false);
      }
    }
  };

  const clearValue = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === "single") {
      onValueChange?.(undefined);
    } else {
      onRangeChange?.({});
    }
  };

  // Trigger label
  const hasValue =
    mode === "single" ? !!value : !!(range?.from || range?.to);

  const triggerLabel = (() => {
    if (!hasValue) return null;
    if (mode === "single" && value) return formatDate(value, locale);
    if (mode === "range") {
      const from = range?.from ? formatDate(range.from, locale) : "…";
      const to = range?.to ? formatDate(range.to, locale) : "…";
      return `${from} – ${to}`;
    }
    return null;
  })();

  return (
    <div
      ref={containerRef}
      className={cn("sq-dfd-root", className)}
    >
      {/* ── Trigger ────────────────────────────────────────────────── */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "sq-dfd-trigger",
          open && "sq-dfd-trigger-open",
          hasValue && "sq-dfd-trigger-filled",
          disabled && "sq-dfd-trigger-disabled"
        )}
      >
        <span className="sq-dfd-trigger-icon">
          <CalendarIcon />
        </span>

        <span className={cn("sq-dfd-trigger-label", !hasValue && "sq-dfd-trigger-placeholder")}>
          {hasValue ? triggerLabel : placeholder}
        </span>

        {hasValue ? (
          <button
            type="button"
            className="sq-dfd-clear"
            onClick={clearValue}
            aria-label="Clear date"
          >
            <CloseIcon />
          </button>
        ) : (
          <span className="sq-dfd-chevron">
            <ChevronDownIcon />
          </span>
        )}
      </button>

      {/* ── Dropdown panel ─────────────────────────────────────────── */}
      {open && (
        <div
          className="sq-dfd-panel"
          role="dialog"
          aria-label="Date picker"
        >
          <MiniCalendar
            viewYear={viewYear}
            viewMonth={viewMonth}
            onMonthChange={(y, m) => { setViewYear(y); setViewMonth(m); }}
            selectedDate={mode === "single" ? value : undefined}
            rangeFrom={range?.from}
            rangeTo={range?.to}
            hoverDate={hoverDate}
            mode={mode}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />
        </div>
      )}
    </div>
  );
};

export { DateFilterDropdown };
export type { MiniCalendarProps };
