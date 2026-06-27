import { Container } from "./components/Layout";
import { PlusIcon } from "./components/Icon";
import { useHashRoute } from "./lib/useHashRoute";
import { Nav } from "./app/Nav";
import { BookingPage } from "./pages/BookingPage";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { DesignSystemPage } from "./pages/DesignSystemPage";

function Footer({ onNavigate }: { onNavigate: (route: string) => void }) {
  return (
    <footer className="border-t border-line/70 bg-surface/50">
      <Container size="xl">
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <button
            onClick={() => onNavigate("randevu")}
            className="flex items-center gap-2.5"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-white">
              <PlusIcon size={18} />
            </span>
            <span className="font-display font-semibold text-ink">
              MedUI · Sağlık Randevu
            </span>
          </button>
          <p className="text-sm text-ink-soft">
            React · TypeScript · TailwindCSS · Erişilebilir tasarım sistemi
          </p>
        </div>
      </Container>
    </footer>
  );
}

export function App() {
  const [route, navigate] = useHashRoute();

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <Nav route={route} onNavigate={navigate} />
      <main className="flex-1">
        {route === "randevularim" ? (
          <AppointmentsPage onNavigate={navigate} />
        ) : route === "tasarim-sistemi" ? (
          <DesignSystemPage />
        ) : (
          <BookingPage onNavigate={navigate} />
        )}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
