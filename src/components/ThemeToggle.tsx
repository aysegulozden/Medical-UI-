import { cn } from "../lib/cn";
import { useTheme } from "../theme/ThemeProvider";
import { MoonIcon, SunIcon } from "./Icon";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Aydınlık temaya geç" : "Karanlık temaya geç"}
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-10 w-[4.5rem] items-center rounded-full border border-line bg-surface p-1 transition-colors hover:border-primary/50",
        className
      )}
    >
      <span
        className={cn(
          "grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-ink shadow-md transition-transform duration-300",
          isDark ? "translate-x-[2rem]" : "translate-x-0"
        )}
      >
        {isDark ? <MoonIcon size={16} /> : <SunIcon size={16} />}
      </span>
    </button>
  );
}
