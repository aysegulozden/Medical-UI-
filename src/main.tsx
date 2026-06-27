import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { App } from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";
import { ToastProvider } from "./components/Toast";
import { AppointmentsProvider } from "./store/appointments";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AppointmentsProvider>
          <App />
        </AppointmentsProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
