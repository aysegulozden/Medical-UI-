import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import {
  AlertTriangleIcon,
  CheckIcon,
  CloseIcon,
  InfoIcon,
} from "./Icon";

export type AlertTone = "info" | "success" | "warning" | "danger";

export interface AlertProps {
  tone?: AlertTone;
  title?: ReactNode;
  children?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const config: Record<
  AlertTone,
  { wrap: string; icon: ReactNode; iconWrap: string }
> = {
  info: {
    wrap: "bg-primary-soft/60 border-primary/30",
    iconWrap: "bg-primary text-primary-ink",
    icon: <InfoIcon size={16} />,
  },
  success: {
    wrap: "bg-success-soft/70 border-success/30",
    iconWrap: "bg-success text-white",
    icon: <CheckIcon size={16} />,
  },
  warning: {
    wrap: "bg-warning-soft/70 border-warning/30",
    iconWrap: "bg-warning text-white",
    icon: <AlertTriangleIcon size={16} />,
  },
  danger: {
    wrap: "bg-danger-soft/70 border-danger/30",
    iconWrap: "bg-danger text-white",
    icon: <AlertTriangleIcon size={16} />,
  },
};

export function Alert({
  tone = "info",
  title,
  children,
  onDismiss,
  className,
}: AlertProps) {
  const c = config[tone];
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4",
        c.wrap,
        className
      )}
    >
      <span
        className={cn(
          "grid h-7 w-7 shrink-0 place-items-center rounded-lg",
          c.iconWrap
        )}
      >
        {c.icon}
      </span>
      <div className="flex-1 space-y-0.5 pt-0.5">
        {title && <p className="font-semibold leading-tight text-ink">{title}</p>}
        {children && <div className="text-sm text-ink-soft">{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Kapat"
          className="rounded-lg p-1 text-ink-faint transition-colors hover:bg-line/60 hover:text-ink"
        >
          <CloseIcon size={16} />
        </button>
      )}
    </div>
  );
}
