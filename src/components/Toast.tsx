import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";
import {
  AlertTriangleIcon,
  CheckIcon,
  CloseIcon,
  InfoIcon,
} from "./Icon";

export type ToastTone = "info" | "success" | "warning" | "danger";

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
}

interface ToastItem extends Required<Omit<ToastOptions, "duration">> {
  id: number;
  duration: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const toneConfig: Record<ToastTone, { icon: ReactNode; bar: string }> = {
  info: { icon: <InfoIcon size={16} />, bar: "bg-primary" },
  success: { icon: <CheckIcon size={16} />, bar: "bg-success" },
  warning: { icon: <AlertTriangleIcon size={16} />, bar: "bg-warning" },
  danger: { icon: <AlertTriangleIcon size={16} />, bar: "bg-danger" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const id = ++counter.current;
    setToasts((list) => [
      ...list,
      {
        id,
        title: options.title,
        description: options.description ?? "",
        tone: options.tone ?? "info",
        duration: options.duration ?? 4000,
      },
    ]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed bottom-0 right-0 z-[60] flex w-full max-w-sm flex-col gap-3 p-4">
          {toasts.map((t) => (
            <ToastCard key={t.id} toast={t} onClose={() => remove(t.id)} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

function ToastCard({
  toast,
  onClose,
}: {
  toast: ToastItem;
  onClose: () => void;
}) {
  useEffect(() => {
    if (toast.duration <= 0) return;
    const timer = setTimeout(onClose, toast.duration);
    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  const c = toneConfig[toast.tone];

  return (
    <div
      role="status"
      className="pointer-events-auto flex items-start gap-3 overflow-hidden rounded-2xl border border-line bg-surface-raised p-4 pl-3 shadow-raised animate-slide-in"
    >
      <span className={cn("mt-0.5 h-9 w-1 shrink-0 rounded-full", c.bar)} />
      <span
        className={cn(
          "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white",
          c.bar
        )}
      >
        {c.icon}
      </span>
      <div className="flex-1 space-y-0.5">
        <p className="font-semibold leading-tight text-ink">{toast.title}</p>
        {toast.description && (
          <p className="text-sm text-ink-soft">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Bildirimi kapat"
        className="rounded-lg p-1 text-ink-faint transition-colors hover:bg-line/60 hover:text-ink"
      >
        <CloseIcon size={16} />
      </button>
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
}
