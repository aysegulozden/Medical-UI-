import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  flush?: boolean;
}

export function Card({
  interactive,
  flush,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface shadow-card",
        !flush && "p-6",
        interactive &&
          "cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-raised hover:border-primary/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="space-y-1">
        <h3 className="font-display text-lg font-semibold leading-tight text-ink">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-ink-soft">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
