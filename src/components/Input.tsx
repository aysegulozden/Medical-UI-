import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  error?: string;
  helperText?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className,
    id,
    required,
    disabled,
    ...props
  },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error
    ? `${inputId}-error`
    : helperText
      ? `${inputId}-helper`
      : undefined;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-11 w-full rounded-xl border bg-surface text-ink placeholder:text-ink-faint",
            "text-[0.95rem] transition-all duration-200",
            "focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary",
            "disabled:cursor-not-allowed disabled:bg-line/30 disabled:text-ink-faint",
            leftIcon ? "pl-11" : "pl-3.5",
            rightIcon ? "pr-11" : "pr-3.5",
            error
              ? "border-danger focus:border-danger focus:ring-danger/15"
              : "border-line hover:border-ink-faint/60"
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint">
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-ink-soft">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
