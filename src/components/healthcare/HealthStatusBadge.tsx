import { cn } from "../../lib/cn";

export type HealthStatus = "stable" | "monitor" | "critical";

export interface HealthStatusBadgeProps {
  status: HealthStatus;
  pulse?: boolean;
  className?: string;
}

const config: Record<
  HealthStatus,
  { label: string; dot: string; wrap: string }
> = {
  stable: {
    label: "Stabil",
    dot: "bg-success",
    wrap: "bg-success-soft text-success",
  },
  monitor: {
    label: "Takip Gerekiyor",
    dot: "bg-warning",
    wrap: "bg-warning-soft text-warning",
  },
  critical: {
    label: "Kritik",
    dot: "bg-danger",
    wrap: "bg-danger-soft text-danger",
  },
};

export function HealthStatusBadge({
  status,
  pulse,
  className,
}: HealthStatusBadgeProps) {
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold leading-none",
        c.wrap,
        className
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          c.dot,
          pulse && "animate-pulse-ring"
        )}
      />
      {c.label}
    </span>
  );
}
