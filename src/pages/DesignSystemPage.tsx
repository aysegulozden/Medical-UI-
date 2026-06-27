import { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  HealthStatusBadge,
  Input,
  PatientCard,
  Radio,
  RadioGroup,
  SectionTitle,
  Select,
  Spinner,
  Table,
  useToast,
  type Column,
} from "../components";
import { UserIcon } from "../components/Icon";
import { patients, specialties, type PatientRow } from "../demo/data";

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <p className="mu-eyebrow mb-4 text-ink-faint">{title}</p>
      {children}
    </Card>
  );
}

function ComponentGallery() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const runLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1600);
  };

  return (
    <Grid minColWidth="22rem" gap={6}>
      <Block title="Button · variants">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
          <Button loading={loading} onClick={runLoading}>
            {loading ? "Yükleniyor" : "Loading dene"}
          </Button>
        </div>
      </Block>

      <Block title="Badge & HealthStatusBadge">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge tone="primary">Primary</Badge>
          <Badge tone="success" dot>
            Aktif
          </Badge>
          <Badge tone="warning" dot>
            Beklemede
          </Badge>
          <Badge tone="danger">Acil</Badge>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <HealthStatusBadge status="stable" />
          <HealthStatusBadge status="monitor" />
          <HealthStatusBadge status="critical" pulse />
        </div>
      </Block>

      <Block title="Input · states">
        <div className="space-y-4">
          <Input
            label="Ad Soyad"
            placeholder="Örn. Ayşe Demir"
            leftIcon={<UserIcon size={18} />}
          />
          <Input
            label="E-posta"
            type="email"
            placeholder="ornek@hastane.com"
            helperText="Onay e-postası buraya gönderilir."
          />
          <Input
            label="T.C. Kimlik No"
            defaultValue="123"
            error="Kimlik numarası 11 haneli olmalıdır."
          />
        </div>
      </Block>

      <Block title="Checkbox · Radio · Select">
        <div className="space-y-5">
          <Select label="Branş" placeholder="Branş seçin" options={specialties} />
          <div className="space-y-2.5">
            <Checkbox
              defaultChecked
              label="SMS ile hatırlatma"
              description="Randevudan 1 gün önce bilgilendirilirsiniz."
            />
            <Checkbox label="KVKK metnini okudum, onaylıyorum." />
          </div>
          <RadioGroup label="Randevu tipi" defaultValue="ilk">
            <Radio value="ilk" label="İlk muayene" />
            <Radio value="kontrol" label="Kontrol" />
          </RadioGroup>
        </div>
      </Block>

      <Block title="Alert · feedback">
        <div className="space-y-3">
          <Alert tone="success" title="Randevu onaylandı">
            26 Haziran 14:30 için randevunuz oluşturuldu.
          </Alert>
          <Alert tone="warning" title="Eksik bilgi">
            Lütfen iletişim numaranızı doğrulayın.
          </Alert>
          <Alert tone="danger" title="Kritik değer" onDismiss={() => {}}>
            Hastanın tansiyonu eşik değerin üzerinde.
          </Alert>
        </div>
      </Block>

      <Block title="Toast & Spinner">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              toast({
                tone: "success",
                title: "Kaydedildi",
                description: "Hasta bilgileri güncellendi.",
              })
            }
          >
            Success toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast({
                tone: "danger",
                title: "Hata oluştu",
                description: "Sunucuya ulaşılamadı.",
              })
            }
          >
            Error toast
          </Button>
          <span className="flex items-center gap-2 text-ink-soft">
            <Spinner size={22} className="text-primary" /> Spinner
          </span>
        </div>
      </Block>
    </Grid>
  );
}

function PatientTable() {
  const columns: Column<PatientRow>[] = [
    {
      key: "name",
      header: "Hasta",
      render: (p) => (
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
            <UserIcon size={18} />
          </span>
          <div>
            <p className="font-semibold text-ink">{p.name}</p>
            <p className="font-mono text-xs text-ink-faint">#{p.mrn}</p>
          </div>
        </div>
      ),
    },
    { key: "age", header: "Yaş", render: (p) => p.age, align: "center" },
    {
      key: "blood",
      header: "Kan",
      render: (p) => <span className="font-mono">{p.bloodType}</span>,
      align: "center",
    },
    {
      key: "status",
      header: "Durum",
      render: (p) => <HealthStatusBadge status={p.status} />,
    },
    {
      key: "next",
      header: "Sonraki Randevu",
      render: (p) =>
        p.nextAppointment ? (
          <span className="text-ink">{p.nextAppointment}</span>
        ) : (
          <span className="text-ink-faint">—</span>
        ),
      align: "right",
    },
  ];

  return (
    <Card flush className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">
            Hasta Listesi
          </h3>
          <p className="text-sm text-ink-soft">Data Display · Table bileşeni</p>
        </div>
        <Badge tone="neutral">{patients.length} kayıt</Badge>
      </div>
      <Table columns={columns} data={patients} rowKey={(p) => p.id} />
    </Card>
  );
}

export function DesignSystemPage() {
  return (
    <div className="min-h-screen">
      <div className="mu-backdrop border-b border-line/70">
        <Container size="xl">
          <div className="py-12">
            <Badge tone="primary" dot className="mb-3">
              MedUI Design System
            </Badge>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Bileşen kütüphanesi
            </h1>
            <p className="mt-2 max-w-2xl text-ink-soft">
              Randevu uygulamasının tamamı, aşağıdaki yeniden kullanılabilir,
              erişilebilir ve temalı bileşenlerle kuruldu. Her biri karanlık ve
              aydınlık temada tutarlı çalışır.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl">
        <div className="space-y-12 py-12">
          <section>
            <SectionTitle
              eyebrow="Core Components"
              title="Temel bileşenler"
              description="Klavye ile gezilebilir, aria etiketli, temaya duyarlı yapı taşları."
            />
            <ComponentGallery />
          </section>

          <section>
            <SectionTitle
              eyebrow="Healthcare Components"
              title="Sağlığa özel bileşenler"
              description="Hasta kartları ve veri tablosu gibi alana özgü hazır bileşenler."
            />
            <Grid minColWidth="20rem" gap={6} className="mb-6">
              {patients.map((p) => (
                <PatientCard key={p.id} {...p} />
              ))}
            </Grid>
            <PatientTable />
          </section>
        </div>
      </Container>
    </div>
  );
}
