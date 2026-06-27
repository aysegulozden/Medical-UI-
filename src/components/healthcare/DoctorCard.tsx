import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { MapPinIcon, StarIcon, StethoscopeIcon } from "../Icon";

export interface DoctorCardProps {
  name: string;
  specialty: string;
  rating?: number;
  reviewCount?: number;
  available?: boolean;
  nextSlot?: string;
  hospital?: string;
  avatarUrl?: string;
  onSelect?: () => void;
  selected?: boolean;
  className?: string;
  action?: ReactNode;
}

function initials(name: string) {
  return name
    .replace(/^(Dr\.?|Prof\.?|Doç\.?|Op\.?)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-warning" aria-label={`${rating} / 5 puan`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} size={14} filled={i < Math.round(rating)} />
      ))}
    </span>
  );
}

export function DoctorCard({
  name,
  specialty,
  rating,
  reviewCount,
  available = true,
  nextSlot,
  hospital,
  avatarUrl,
  onSelect,
  selected,
  className,
  action,
}: DoctorCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border bg-surface p-5 shadow-card transition-all duration-300",
        selected
          ? "border-primary ring-4 ring-primary/15"
          : "border-line hover:-translate-y-1 hover:border-primary/40 hover:shadow-raised",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="h-14 w-14 rounded-2xl object-cover ring-1 ring-line"
            />
          ) : (
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent font-display text-lg font-semibold text-white">
              {initials(name)}
            </span>
          )}
          <div className="space-y-1">
            <h3 className="font-display text-lg font-semibold leading-tight text-ink">
              {name}
            </h3>
            <p className="flex items-center gap-1.5 text-sm text-ink-soft">
              <StethoscopeIcon size={15} className="text-accent" />
              {specialty}
            </p>
          </div>
        </div>
        <Badge tone={available ? "success" : "neutral"} dot>
          {available ? "Müsait" : "Dolu"}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {rating != null && (
          <span className="flex items-center gap-1.5">
            <Stars rating={rating} />
            <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
            {reviewCount != null && (
              <span className="text-ink-faint">({reviewCount})</span>
            )}
          </span>
        )}
        {hospital && (
          <span className="flex items-center gap-1.5 text-ink-soft">
            <MapPinIcon size={15} className="text-ink-faint" />
            {hospital}
          </span>
        )}
      </div>

      {nextSlot && (
        <div className="rounded-xl bg-primary-soft/50 px-3.5 py-2.5 text-sm">
          <span className="text-ink-soft">En yakın randevu: </span>
          <span className="font-semibold text-primary">{nextSlot}</span>
        </div>
      )}

      <div className="mt-auto pt-1">
        {action ?? (
          <Button
            variant={selected ? "primary" : "outline"}
            fullWidth
            disabled={!available}
            onClick={onSelect}
          >
            {selected ? "Seçildi" : "Randevu Al"}
          </Button>
        )}
      </div>
    </article>
  );
}
