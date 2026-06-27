import { cn } from "../../lib/cn";
import { CalendarIcon, ClockIcon, UserIcon } from "../Icon";
import {
  HealthStatusBadge,
  type HealthStatus,
} from "./HealthStatusBadge";

export interface PatientVisit {
  date: string;
  reason: string;
}

export interface PatientCardProps {
  name: string;
  mrn?: string;
  age?: number;
  gender?: "Kadın" | "Erkek" | string;
  bloodType?: string;
  status: HealthStatus;
  lastVisit?: string;
  nextAppointment?: string;
  history?: PatientVisit[];
  className?: string;
  onClick?: () => void;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-canvas/60 px-3 py-2">
      <p className="mu-eyebrow text-ink-faint">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}

export function PatientCard({
  name,
  mrn,
  age,
  gender,
  bloodType,
  status,
  lastVisit,
  nextAppointment,
  history,
  className,
  onClick,
}: PatientCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card",
        onClick && "cursor-pointer transition-all hover:-translate-y-1 hover:shadow-raised hover:border-primary/40",
        className
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
            <UserIcon size={22} />
          </span>
          <div className="space-y-0.5">
            <h3 className="font-display text-lg font-semibold leading-tight text-ink">
              {name}
            </h3>
            {mrn && (
              <p className="font-mono text-xs text-ink-faint">#{mrn}</p>
            )}
          </div>
        </div>
        <HealthStatusBadge status={status} pulse={status === "critical"} />
      </header>

      <div className="grid grid-cols-3 gap-2.5">
        {age != null && <Stat label="Yaş" value={String(age)} />}
        {gender && <Stat label="Cinsiyet" value={gender} />}
        {bloodType && <Stat label="Kan Grubu" value={bloodType} />}
      </div>

      {(lastVisit || nextAppointment) && (
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
          {lastVisit && (
            <span className="flex items-center gap-1.5 text-ink-soft">
              <ClockIcon size={15} className="text-ink-faint" />
              Son: <span className="font-medium text-ink">{lastVisit}</span>
            </span>
          )}
          {nextAppointment && (
            <span className="flex items-center gap-1.5 text-ink-soft">
              <CalendarIcon size={15} className="text-accent" />
              Sonraki:{" "}
              <span className="font-medium text-ink">{nextAppointment}</span>
            </span>
          )}
        </div>
      )}

      {history && history.length > 0 && (
        <div className="border-t border-line pt-3">
          <p className="mu-eyebrow mb-2 text-ink-faint">Randevu Geçmişi</p>
          <ul className="space-y-1.5">
            {history.slice(0, 3).map((v, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="text-ink">{v.reason}</span>
                <span className="shrink-0 font-mono text-xs text-ink-faint">
                  {v.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
