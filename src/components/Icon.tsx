import type { SVGProps } from "react";


type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const StarIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? "currentColor" : "none"}>
    <path d="M12 17.3 6.16 20.5l1.12-6.53L2.5 9.35l6.56-.95L12 2.5l2.94 5.9 6.56.95-4.78 4.62 1.12 6.53z" />
  </svg>
);

export const StethoscopeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4.5 3v5a4 4 0 0 0 8 0V3" />
    <path d="M8.5 16a5.5 5.5 0 0 0 11 0v-2" />
    <circle cx="19.5" cy="11.5" r="2" />
  </svg>
);

export const HeartPulseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l1.7 1.7" />
    <path d="M3 13h3l2 4 3-8 2 4h8" />
  </svg>
);

export const CalendarIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
    <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const InfoIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

export const AlertTriangleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M10.3 4 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 4a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const SunIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
  </svg>
);

export const MapPinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 10.5c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10.5" r="2.5" />
  </svg>
);
