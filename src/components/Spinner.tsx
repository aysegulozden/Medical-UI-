import { cn } from "../lib/cn";

export interface SpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

export function Spinner({ size = 20, className, label = "Yükleniyor" }: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label={label}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("animate-[spin_0.7s_linear_infinite]", className)}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.2"
      />
      <path
        d="M12 3a9 9 0 0 1 9 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
