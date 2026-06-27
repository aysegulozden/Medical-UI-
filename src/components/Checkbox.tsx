import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { CheckIcon } from "./Icon";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, description, className, id, disabled, ...props }, ref) {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "group flex cursor-pointer items-start gap-3",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <span className="relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-line bg-surface transition-all checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed"
            {...props}
          />
          <CheckIcon
            size={14}
            className="pointer-events-none absolute scale-0 text-primary-ink opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100"
          />
        </span>
        {(label || description) && (
          <span className="space-y-0.5 leading-tight">
            {label && (
              <span className="block text-sm font-medium text-ink">{label}</span>
            )}
            {description && (
              <span className="block text-sm text-ink-soft">{description}</span>
            )}
          </span>
        )}
      </label>
    );
  }
);
