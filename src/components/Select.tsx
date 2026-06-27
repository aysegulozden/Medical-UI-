import {
  forwardRef,
  useId,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { cn } from "../lib/cn";
import { ChevronDownIcon } from "./Icon";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: ReactNode;
  error?: string;
  helperText?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    error,
    helperText,
    options,
    placeholder,
    className,
    id,
    required,
    disabled,
    ...props
  },
  ref
) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          defaultValue={props.value === undefined ? "" : undefined}
          className={cn(
            "h-11 w-full appearance-none rounded-xl border bg-surface pl-3.5 pr-10 text-[0.95rem] text-ink",
            "transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary",
            "disabled:cursor-not-allowed disabled:bg-line/30 disabled:text-ink-faint",
            error
              ? "border-danger focus:border-danger focus:ring-danger/15"
              : "border-line hover:border-ink-faint/60"
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size={18}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
        />
      </div>
      {error ? (
        <p className="mt-1.5 text-sm font-medium text-danger">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-sm text-ink-soft">{helperText}</p>
      ) : null}
    </div>
  );
});
