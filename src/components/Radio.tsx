import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function RadioGroup({
  name,
  value,
  onChange,
  label,
  className,
  children,
}: RadioGroupProps) {
  const autoName = useId();
  return (
    <RadioGroupContext.Provider
      value={{ name: name ?? autoName, value, onChange }}
    >
      <div role="radiogroup" aria-label={typeof label === "string" ? label : undefined} className={className}>
        {label && (
          <p className="mb-2 text-sm font-semibold text-ink">{label}</p>
        )}
        <div className="space-y-2.5">{children}</div>
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value: string;
  label?: ReactNode;
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, description, className, id, disabled, ...props },
  ref
) {
  const group = useContext(RadioGroupContext);
  const autoId = useId();
  const inputId = id ?? autoId;
  const checked = group?.value != null ? group.value === value : undefined;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-surface p-3 transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary-soft/40",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <span className="relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          name={group?.name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => group?.onChange?.(value)}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-line bg-surface transition-all checked:border-[5px] checked:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          {...props}
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
});
