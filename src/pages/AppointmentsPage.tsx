import {
  Badge,
  Button,
  Card,
  Container,
  SectionTitle,
  useToast,
} from "../components";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  StethoscopeIcon,
  UserIcon,
} from "../components/Icon";
import { cn } from "../lib/cn";
import {
  useAppointments,
  type Appointment,
} from "../store/appointments";

function statusBadge(status: Appointment["status"]) {
  switch (status) {
    case "upcoming":
      return <Badge tone="success" dot>Yaklaşan</Badge>;
    case "completed":
      return <Badge tone="neutral" dot>Tamamlandı</Badge>;
    case "cancelled":
      return <Badge tone="danger" dot>İptal edildi</Badge>;
  }
}

function AppointmentRow({
  appt,
  onCancel,
}: {
  appt: Appointment;
  onCancel?: () => void;
}) {
  const cancelled = appt.status === "cancelled";
  return (
    <Card
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        cancelled && "opacity-60"
      )}
    >
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
          <StethoscopeIcon size={22} />
        </span>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold leading-tight text-ink">
              {appt.doctorName}
            </h3>
            {statusBadge(appt.status)}
          </div>
          <p className="text-sm text-ink-soft">{appt.specialty}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-sm text-ink-soft">
            <span className="flex items-center gap-1.5">
              <CalendarIcon size={15} className="text-accent" />
              {appt.date}
            </span>
            <span className="flex items-center gap-1.5">
              <ClockIcon size={15} className="text-ink-faint" />
              {appt.time}
            </span>
            {appt.hospital && (
              <span className="flex items-center gap-1.5">
                <MapPinIcon size={15} className="text-ink-faint" />
                {appt.hospital}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <UserIcon size={15} className="text-ink-faint" />
              {appt.patientName}
            </span>
          </div>
        </div>
      </div>

      {appt.status === "upcoming" && onCancel && (
        <Button variant="outline" size="sm" onClick={onCancel}>
          İptal Et
        </Button>
      )}
    </Card>
  );
}

export function AppointmentsPage({
  onNavigate,
}: {
  onNavigate: (route: string) => void;
}) {
  const { upcoming, past, cancel } = useAppointments();
  const { toast } = useToast();

  const handleCancel = (appt: Appointment) => {
    cancel(appt.id);
    toast({
      tone: "warning",
      title: "Randevu iptal edildi",
      description: `${appt.doctorName} · ${appt.date} ${appt.time}`,
    });
  };

  const isEmpty = upcoming.length === 0 && past.length === 0;

  return (
    <div className="min-h-screen py-10">
      <Container size="lg">
        <SectionTitle
          eyebrow="Randevularım"
          title="Randevularınız"
          description="Yaklaşan ve geçmiş randevularınızı buradan yönetin."
        />

        {isEmpty ? (
          <Card className="flex flex-col items-center gap-4 py-16 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-3xl bg-primary-soft text-primary">
              <CalendarIcon size={30} />
            </span>
            <div className="space-y-1">
              <h3 className="font-display text-xl font-semibold text-ink">
                Henüz randevunuz yok
              </h3>
              <p className="text-ink-soft">
                İlk randevunuzu birkaç adımda oluşturabilirsiniz.
              </p>
            </div>
            <Button size="lg" onClick={() => onNavigate("randevu")}>
              Randevu Al
            </Button>
          </Card>
        ) : (
          <div className="space-y-8">
            <section>
              <div className="mb-3 flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold text-ink">
                  Yaklaşan
                </h2>
                <Badge tone="primary">{upcoming.length}</Badge>
              </div>
              {upcoming.length === 0 ? (
                <Card className="border-dashed">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-ink-soft">
                      Yaklaşan randevunuz bulunmuyor.
                    </p>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onNavigate("randevu")}
                    >
                      Yeni Randevu
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((a) => (
                    <AppointmentRow
                      key={a.id}
                      appt={a}
                      onCancel={() => handleCancel(a)}
                    />
                  ))}
                </div>
              )}
            </section>

            {past.length > 0 && (
              <section>
                <h2 className="mb-3 font-display text-lg font-semibold text-ink">
                  Geçmiş
                </h2>
                <div className="space-y-3">
                  {past.map((a) => (
                    <AppointmentRow key={a.id} appt={a} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
