import { useMemo, useState } from "react";
import {
  Alert,
  AppointmentCalendar,
  Badge,
  Button,
  Card,
  DoctorCard,
  Grid,
  Input,
  Modal,
  useToast,
} from "../components";
import {
  CheckIcon,
  StethoscopeIcon,
  UserIcon,
} from "../components/Icon";
import { cn } from "../lib/cn";
import {
  calendarDays,
  doctors,
  slotsByDay,
  specialties,
} from "../demo/data";
import { useAppointments } from "../store/appointments";

const steps = ["Branş", "Doktor", "Tarih & Saat", "Onay"];

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors",
                done && "bg-success text-white",
                active && "bg-primary text-primary-ink shadow-glow",
                !done && !active && "bg-surface text-ink-faint border border-line"
              )}
            >
              {done ? <CheckIcon size={16} /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden text-sm font-medium sm:block",
                active ? "text-ink" : "text-ink-soft"
              )}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1",
                  done ? "bg-success" : "bg-line"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <span className="text-ink-soft">{label}</span>
      <span className={cn("font-medium", value ? "text-ink" : "text-ink-faint")}>
        {value || "—"}
      </span>
    </div>
  );
}

export function BookingPage({
  onNavigate,
}: {
  onNavigate: (route: string) => void;
}) {
  const { toast } = useToast();
  const { add } = useAppointments();

  const [specialty, setSpecialty] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [day, setDay] = useState(calendarDays[0].id);
  const [time, setTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filteredDoctors = useMemo(
    () =>
      specialty
        ? doctors.filter((d) => d.specialtyValue === specialty)
        : doctors,
    [specialty]
  );
  const doctor = useMemo(
    () => doctors.find((d) => d.id === doctorId),
    [doctorId]
  );
  const dayLabel = useMemo(() => {
    const d = calendarDays.find((x) => x.id === day);
    return d ? `${d.day} ${d.month} 2026` : "";
  }, [day]);

  const currentStep = !specialty
    ? 0
    : !doctorId
      ? 1
      : !time
        ? 2
        : 3;

  const canConfirm = Boolean(doctor && time && patientName.trim());

  const reset = () => {
    setSpecialty("");
    setDoctorId("");
    setTime("");
    setPatientName("");
  };

  const confirm = () => {
    if (!doctor) return;
    add({
      doctorName: doctor.name,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      patientName: patientName.trim(),
      date: dayLabel,
      time,
    });
    setConfirmOpen(false);
    toast({
      tone: "success",
      title: "Randevunuz oluşturuldu",
      description: `${doctor.name} · ${dayLabel} ${time}`,
    });
    reset();
    onNavigate("randevularim");
  };

  return (
    <div className="mu-backdrop min-h-screen">
      <div className="border-b border-line/70">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
          <Badge tone="primary" dot className="mb-3">
            Online Randevu
          </Badge>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Birkaç adımda randevunuzu alın
          </h1>
          <p className="mt-2 max-w-xl text-ink-soft">
            Branş ve doktorunuzu seçin, size uygun saati belirleyin. Randevunuz
            anında onaylanır.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
        <div className="mb-8">
          <Stepper current={currentStep} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-8">
            <section>
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-ink">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-ink">
                  1
                </span>
                Branş seçin
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {specialties.map((s) => {
                  const active = specialty === s.value;
                  return (
                    <button
                      key={s.value}
                      onClick={() => {
                        setSpecialty(s.value);
                        setDoctorId("");
                        setTime("");
                      }}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                        active
                          ? "border-primary bg-primary text-primary-ink shadow-glow"
                          : "border-line bg-surface text-ink hover:border-primary/50 hover:bg-primary-soft/40"
                      )}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-ink">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-ink">
                  2
                </span>
                Doktor seçin
                {specialty && (
                  <Badge tone="neutral" className="ml-1">
                    {filteredDoctors.length} doktor
                  </Badge>
                )}
              </h2>
              {!specialty ? (
                <Card className="border-dashed">
                  <p className="flex items-center gap-2 text-sm text-ink-soft">
                    <StethoscopeIcon size={18} className="text-ink-faint" />
                    Doktorları görmek için önce bir branş seçin.
                  </p>
                </Card>
              ) : (
                <Grid minColWidth="17rem" gap={4}>
                  {filteredDoctors.map((doc) => (
                    <DoctorCard
                      key={doc.id}
                      {...doc}
                      selected={doctorId === doc.id}
                      onSelect={() => {
                        setDoctorId(doc.id);
                        setTime("");
                      }}
                    />
                  ))}
                </Grid>
              )}
            </section>

            {doctorId && (
              <section className="animate-fade-in">
                <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-ink">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-ink">
                    3
                  </span>
                  Tarih & saat seçin
                </h2>
                <AppointmentCalendar
                  days={calendarDays}
                  slotsByDay={slotsByDay}
                  selectedDay={day}
                  selectedTime={time}
                  onSelectDay={(d) => {
                    setDay(d);
                    setTime("");
                  }}
                  onSelectTime={setTime}
                />
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card>
              <h3 className="font-display text-lg font-semibold text-ink">
                Randevu Özeti
              </h3>
              <div className="mt-2 divide-y divide-line/70">
                <SummaryRow
                  label="Branş"
                  value={
                    specialties.find((s) => s.value === specialty)?.label
                  }
                />
                <SummaryRow label="Doktor" value={doctor?.name} />
                <SummaryRow
                  label="Hastane"
                  value={doctor?.hospital}
                />
                <SummaryRow label="Tarih" value={time ? dayLabel : undefined} />
                <SummaryRow label="Saat" value={time || undefined} />
              </div>

              <div className="mt-4">
                <Input
                  label="Hasta adı"
                  required
                  placeholder="Ad Soyad"
                  value={patientName}
                  leftIcon={<UserIcon size={18} />}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              {!canConfirm && (
                <Alert tone="info" className="mt-4" title="Devam etmek için">
                  Branş, doktor, saat ve hasta adı alanlarını tamamlayın.
                </Alert>
              )}

              <Button
                fullWidth
                size="lg"
                className="mt-4"
                disabled={!canConfirm}
                onClick={() => setConfirmOpen(true)}
              >
                Randevuyu Onayla
              </Button>
            </Card>
          </aside>
        </div>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Randevuyu onaylıyor musunuz?"
        description="Bilgileri kontrol edip onaylayın."
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Vazgeç
            </Button>
            <Button onClick={confirm}>Onayla</Button>
          </>
        }
      >
        <div className="space-y-1 rounded-xl bg-primary-soft/50 p-4">
          <SummaryRow label="Doktor" value={doctor?.name} />
          <SummaryRow label="Hasta" value={patientName} />
          <SummaryRow label="Tarih & Saat" value={`${dayLabel} · ${time}`} />
        </div>
      </Modal>
    </div>
  );
}
