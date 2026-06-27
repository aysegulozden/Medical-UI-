import { useState } from "react";
import { cn } from "../../lib/cn";
import { CalendarIcon } from "../Icon";

export interface CalendarDay {
  id: string;
  weekday: string; 
  day: number; 
  month: string; 
  disabled?: boolean;
}

export interface TimeSlot {
  time: string; 
  booked?: boolean;
}

export interface AppointmentCalendarProps {
  days: CalendarDay[];
  slotsByDay: Record<string, TimeSlot[]>;
  selectedDay?: string;
  selectedTime?: string;
  onSelectDay?: (dayId: string) => void;
  onSelectTime?: (time: string) => void;
  className?: string;
}

export function AppointmentCalendar({
  days,
  slotsByDay,
  selectedDay: controlledDay,
  selectedTime,
  onSelectDay,
  onSelectTime,
  className,
}: AppointmentCalendarProps) {
  const firstEnabled = days.find((d) => !d.disabled)?.id ?? days[0]?.id;
  const [internalDay, setInternalDay] = useState(firstEnabled);
  const activeDay = controlledDay ?? internalDay;
  const slots = activeDay ? slotsByDay[activeDay] ?? [] : [];

  const selectDay = (id: string) => {
    setInternalDay(id);
    onSelectDay?.(id);
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface p-5 shadow-card",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2 text-ink">
        <CalendarIcon size={18} className="text-primary" />
        <h3 className="font-display text-lg font-semibold">Randevu Takvimi</h3>
      </div>

      <div
        className="flex gap-2.5 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Gün seçimi"
      >
        {days.map((d) => {
          const active = d.id === activeDay;
          return (
            <button
              key={d.id}
              role="tab"
              aria-selected={active}
              disabled={d.disabled}
              onClick={() => selectDay(d.id)}
              className={cn(
                "flex min-w-[4.25rem] shrink-0 flex-col items-center gap-0.5 rounded-xl border px-3 py-2.5 transition-all",
                "disabled:cursor-not-allowed disabled:opacity-40",
                active
                  ? "border-primary bg-primary text-primary-ink shadow-glow"
                  : "border-line bg-surface text-ink hover:border-primary/50 hover:bg-primary-soft/40"
              )}
            >
              <span
                className={cn(
                  "text-xs font-medium uppercase tracking-wide",
                  active ? "text-primary-ink/80" : "text-ink-faint"
                )}
              >
                {d.weekday}
              </span>
              <span className="font-display text-xl font-semibold leading-none">
                {d.day}
              </span>
              <span
                className={cn(
                  "text-xs",
                  active ? "text-primary-ink/80" : "text-ink-faint"
                )}
              >
                {d.month}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <p className="mu-eyebrow mb-3 text-ink-faint">Uygun Saatler</p>
        {slots.length === 0 ? (
          <p className="rounded-xl bg-canvas/60 px-4 py-6 text-center text-sm text-ink-soft">
            Bu gün için uygun saat bulunmuyor.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
            {slots.map((slot) => {
              const active = selectedTime === slot.time;
              return (
                <button
                  key={slot.time}
                  disabled={slot.booked}
                  onClick={() => onSelectTime?.(slot.time)}
                  className={cn(
                    "rounded-xl border py-2.5 text-sm font-semibold tabular-nums transition-all",
                    slot.booked &&
                      "cursor-not-allowed border-dashed border-line bg-canvas/50 text-ink-faint line-through",
                    !slot.booked &&
                      !active &&
                      "border-line bg-surface text-ink hover:border-primary hover:bg-primary-soft/50 hover:text-primary",
                    active &&
                      "border-primary bg-primary text-primary-ink shadow-glow"
                  )}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-line bg-surface" />
          Boş
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Seçili
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-dashed border-ink-faint" />
          Dolu
        </span>
      </div>
    </div>
  );
}
