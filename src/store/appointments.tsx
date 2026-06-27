import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  patientName: string;
  hospital?: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

export interface NewAppointment {
  doctorName: string;
  specialty: string;
  patientName: string;
  hospital?: string;
  date: string;
  time: string;
}

interface AppointmentsContextValue {
  appointments: Appointment[];
  upcoming: Appointment[];
  past: Appointment[];
  add: (appt: NewAppointment) => Appointment;
  cancel: (id: string) => void;
}

const AppointmentsContext = createContext<AppointmentsContextValue | undefined>(
  undefined
);

const seed: Appointment[] = [
  {
    id: "seed-1",
    doctorName: "Prof. Dr. Cem Demir",
    specialty: "Ortopedi",
    patientName: "Ayşe Demir",
    hospital: "Üniversite Hastanesi",
    date: "29 Haz 2026",
    time: "11:00",
    status: "upcoming",
  },
  {
    id: "seed-2",
    doctorName: "Dr. Selin Kaya",
    specialty: "Dermatoloji",
    patientName: "Ayşe Demir",
    hospital: "Şehir Hastanesi",
    date: "12 Haz 2026",
    time: "15:30",
    status: "completed",
  },
];

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(seed);
  const counter = useRef(0);

  const add = useCallback((appt: NewAppointment) => {
    const created: Appointment = {
      ...appt,
      id: `appt-${++counter.current}`,
      status: "upcoming",
    };
    setAppointments((list) => [created, ...list]);
    return created;
  }, []);

  const cancel = useCallback((id: string) => {
    setAppointments((list) =>
      list.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
  }, []);

  const value = useMemo<AppointmentsContextValue>(() => {
    const upcoming = appointments.filter((a) => a.status === "upcoming");
    const past = appointments.filter((a) => a.status !== "upcoming");
    return { appointments, upcoming, past, add, cancel };
  }, [appointments, add, cancel]);

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments(): AppointmentsContextValue {
  const ctx = useContext(AppointmentsContext);
  if (!ctx)
    throw new Error(
      "useAppointments must be used within an <AppointmentsProvider>"
    );
  return ctx;
}
