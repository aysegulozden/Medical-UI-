import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export type BadgeTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
  icon?: ReactNode;
}

const tones: Record<BadgeTone, string> = {
  neutral: "bg-line/60 text-ink-soft",
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

const dotTones: Record<BadgeTone, string> = {
  neutral: "bg-ink-faint",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export function Badge({
  tone = "neutral",
  dot,
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", dotTones[tone])} />
      )}
      {icon}
      {children}
    </span>
  );
}
