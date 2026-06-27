import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const containerSizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container({
  size = "lg",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-8", containerSizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  gap?: Gap;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  as?: ElementType;
}

const gapMap: Record<Gap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export function Stack({
  direction = "col",
  gap = 4,
  align,
  justify,
  wrap,
  as,
  className,
  children,
  ...props
}: StackProps) {
  const Comp = (as ?? "div") as ElementType;
  return (
    <Comp
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  minColWidth?: string;
  cols?: 1 | 2 | 3 | 4;
  gap?: Gap;
}

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function Grid({
  minColWidth,
  cols = 3,
  gap = 6,
  className,
  style,
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={cn("grid", !minColWidth && colsMap[cols], gapMap[gap], className)}
      style={
        minColWidth
          ? {
              gridTemplateColumns: `repeat(auto-fit, minmax(min(${minColWidth}, 100%), 1fr))`,
              ...style,
            }
          : style
      }
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="mb-6 space-y-2">
      {eyebrow && <p className="mu-eyebrow text-primary">{eyebrow}</p>}
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-ink-soft">{description}</p>
      )}
    </div>
  );
}
