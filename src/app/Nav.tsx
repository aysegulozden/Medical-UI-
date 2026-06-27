import { cn } from "../lib/cn";
import { Container } from "../components/Layout";
import { ThemeToggle } from "../components/ThemeToggle";
import { Badge } from "../components/Badge";
import { CalendarIcon, PlusIcon } from "../components/Icon";
import { useAppointments } from "../store/appointments";

export interface NavItem {
  key: string;
  label: string;
}

const items: NavItem[] = [
  { key: "randevu", label: "Randevu Al" },
  { key: "randevularim", label: "Randevularım" },
  { key: "tasarim-sistemi", label: "Design System" },
];

export function Nav({
  route,
  onNavigate,
}: {
  route: string;
  onNavigate: (route: string) => void;
}) {
  const { upcoming } = useAppointments();

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-canvas/85 backdrop-blur-xl">
      <Container size="xl">
        <div className="flex h-16 items-center justify-between gap-4">
          <button
            onClick={() => onNavigate("randevu")}
            className="flex items-center gap-2.5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
              <PlusIcon size={20} />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-ink">
              Med<span className="text-primary">UI</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 p-1 md:flex">
            {items.map((item) => {
              const active = route === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-ink shadow-glow"
                      : "text-ink-soft hover:text-ink"
                  )}
                >
                  {item.label}
                  {item.key === "randevularim" && upcoming.length > 0 && (
                    <span
                      className={cn(
                        "absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full px-1 text-[0.65rem] font-bold",
                        active
                          ? "bg-white text-primary"
                          : "bg-primary text-primary-ink"
                      )}
                    >
                      {upcoming.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto pb-2 md:hidden">
          {items.map((item) => {
            const active = route === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-ink"
                    : "bg-surface text-ink-soft"
                )}
              >
                {item.key === "randevularim" && <CalendarIcon size={14} />}
                {item.label}
                {item.key === "randevularim" && upcoming.length > 0 && (
                  <Badge tone={active ? "neutral" : "primary"}>
                    {upcoming.length}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
