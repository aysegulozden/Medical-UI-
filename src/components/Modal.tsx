import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";
import { CloseIcon } from "./Icon";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  dismissible?: boolean;
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  dismissible = true,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissible) onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, dismissible, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === "string" ? title : "Diyalog"}
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in"
        onClick={() => dismissible && onClose()}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative w-full rounded-3xl border border-line bg-surface-raised p-6 shadow-raised outline-none animate-scale-in",
          sizes[size]
        )}
      >
        {(title || dismissible) && (
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="space-y-1">
              {title && (
                <h2 className="font-display text-xl font-semibold leading-tight text-ink">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-ink-soft">{description}</p>
              )}
            </div>
            {dismissible && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="-mr-1 -mt-1 rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-line/60 hover:text-ink"
              >
                <CloseIcon size={20} />
              </button>
            )}
          </div>
        )}

        {children && <div className="text-[0.95rem] text-ink-soft">{children}</div>}

        {footer && (
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
