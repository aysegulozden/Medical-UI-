import type {
  CalendarDay,
  TimeSlot,
} from "../components/healthcare/AppointmentCalendar";
import type { HealthStatus } from "../components/healthcare/HealthStatusBadge";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialtyValue: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  nextSlot?: string;
  hospital: string;
}

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Elif Yıldız",
    specialty: "Kardiyoloji",
    specialtyValue: "kardiyoloji",
    rating: 4.9,
    reviewCount: 218,
    available: true,
    nextSlot: "Bugün 14:30",
    hospital: "Merkez Hastanesi",
  },
  {
    id: "d2",
    name: "Doç. Dr. Mert Aydın",
    specialty: "Nöroloji",
    specialtyValue: "noroloji",
    rating: 4.7,
    reviewCount: 156,
    available: true,
    nextSlot: "Yarın 09:15",
    hospital: "Anadolu Tıp Merkezi",
  },
  {
    id: "d3",
    name: "Dr. Selin Kaya",
    specialty: "Dermatoloji",
    specialtyValue: "dermatoloji",
    rating: 4.6,
    reviewCount: 98,
    available: false,
    hospital: "Şehir Hastanesi",
  },
  {
    id: "d4",
    name: "Prof. Dr. Cem Demir",
    specialty: "Ortopedi",
    specialtyValue: "ortopedi",
    rating: 4.8,
    reviewCount: 312,
    available: true,
    nextSlot: "27 Haz 11:00",
    hospital: "Üniversite Hastanesi",
  },
  {
    id: "d5",
    name: "Dr. Hakan Yılmaz",
    specialty: "Kardiyoloji",
    specialtyValue: "kardiyoloji",
    rating: 4.5,
    reviewCount: 142,
    available: true,
    nextSlot: "Yarın 13:00",
    hospital: "Şehir Hastanesi",
  },
  {
    id: "d6",
    name: "Dr. Deniz Korkmaz",
    specialty: "Dahiliye",
    specialtyValue: "dahiliye",
    rating: 4.8,
    reviewCount: 187,
    available: true,
    nextSlot: "Bugün 16:00",
    hospital: "Merkez Hastanesi",
  },
  {
    id: "d7",
    name: "Doç. Dr. Aslı Toprak",
    specialty: "Nöroloji",
    specialtyValue: "noroloji",
    rating: 4.9,
    reviewCount: 264,
    available: false,
    hospital: "Üniversite Hastanesi",
  },
];

export interface PatientRow {
  id: string;
  name: string;
  mrn: string;
  age: number;
  gender: string;
  bloodType: string;
  status: HealthStatus;
  lastVisit: string;
  nextAppointment?: string;
  history: { date: string; reason: string }[];
}

export const patients: PatientRow[] = [
  {
    id: "p1",
    name: "Ahmet Şahin",
    mrn: "MRN-10293",
    age: 64,
    gender: "Erkek",
    bloodType: "A Rh+",
    status: "critical",
    lastVisit: "24 Haz 2026",
    nextAppointment: "26 Haz 14:30",
    history: [
      { date: "24 Haz", reason: "Göğüs ağrısı" },
      { date: "11 Haz", reason: "EKG kontrol" },
      { date: "02 May", reason: "Tansiyon takibi" },
    ],
  },
  {
    id: "p2",
    name: "Zeynep Arslan",
    mrn: "MRN-10417",
    age: 39,
    gender: "Kadın",
    bloodType: "0 Rh−",
    status: "monitor",
    lastVisit: "20 Haz 2026",
    nextAppointment: "28 Haz 10:00",
    history: [
      { date: "20 Haz", reason: "Migren değerlendirme" },
      { date: "05 Haz", reason: "MR sonuç görüşme" },
    ],
  },
  {
    id: "p3",
    name: "Burak Çelik",
    mrn: "MRN-10550",
    age: 28,
    gender: "Erkek",
    bloodType: "B Rh+",
    status: "stable",
    lastVisit: "18 Haz 2026",
    history: [{ date: "18 Haz", reason: "Genel kontrol" }],
  },
];

export const calendarDays: CalendarDay[] = [
  { id: "2026-06-26", weekday: "Cum", day: 26, month: "Haz" },
  { id: "2026-06-27", weekday: "Cmt", day: 27, month: "Haz" },
  { id: "2026-06-28", weekday: "Paz", day: 28, month: "Haz", disabled: true },
  { id: "2026-06-29", weekday: "Pzt", day: 29, month: "Haz" },
  { id: "2026-06-30", weekday: "Sal", day: 30, month: "Haz" },
  { id: "2026-07-01", weekday: "Çar", day: 1, month: "Tem" },
];

export const slotsByDay: Record<string, TimeSlot[]> = {
  "2026-06-26": [
    { time: "09:00", booked: true },
    { time: "09:30" },
    { time: "10:00" },
    { time: "11:30", booked: true },
    { time: "14:00" },
    { time: "14:30" },
    { time: "15:30" },
    { time: "16:00", booked: true },
  ],
  "2026-06-27": [
    { time: "10:00" },
    { time: "10:30" },
    { time: "11:00", booked: true },
    { time: "13:30" },
  ],
  "2026-06-29": [
    { time: "08:30" },
    { time: "09:00", booked: true },
    { time: "09:30" },
    { time: "10:30" },
    { time: "15:00" },
    { time: "15:30" },
  ],
  "2026-06-30": [
    { time: "11:00" },
    { time: "11:30" },
    { time: "16:30" },
  ],
  "2026-07-01": [
    { time: "09:00" },
    { time: "09:30", booked: true },
    { time: "10:00" },
    { time: "14:30" },
    { time: "17:00" },
  ],
};

export const specialties = [
  { value: "kardiyoloji", label: "Kardiyoloji" },
  { value: "noroloji", label: "Nöroloji" },
  { value: "dermatoloji", label: "Dermatoloji" },
  { value: "ortopedi", label: "Ortopedi" },
  { value: "dahiliye", label: "Dahiliye" },
];
