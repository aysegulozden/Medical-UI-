import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Spinner } from "./Spinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const base =
  "relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl " +
  "transition-all duration-200 select-none whitespace-nowrap " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-ink shadow-glow hover:brightness-110 hover:-translate-y-0.5",
  secondary:
    "bg-primary-soft text-primary hover:bg-primary/15 dark:hover:bg-primary/25",
  danger:
    "bg-danger text-white shadow-[0_8px_24px_-10px_rgb(var(--mu-danger)/0.7)] hover:brightness-110 hover:-translate-y-0.5",
  outline:
    "border border-line bg-surface text-ink hover:border-primary hover:text-primary hover:bg-primary-soft/40",
  ghost: "text-ink-soft hover:bg-line/50 hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base [&]:h-[3.25rem]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Spinner size={size === "lg" ? 20 : 16} />}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);
