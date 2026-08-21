import basaltFern from "@/assets/special-basalt-fern.jpg";
import ochreStudy from "@/assets/special-ochre-study.jpg";
import kraftBloom from "@/assets/special-kraft-bloom.jpg";

export type OrderStatus = "Scheduled" | "Preparing" | "In Transit" | "Delivered" | "Returned";

export interface Special {
  id: string;
  name: string;
  price: number;
  cadence: string;
  image: string;
  note: string;
}

export const specials: Special[] = [
  {
    id: "basalt-fern",
    name: "Basalt & Fern",
    price: 45,
    cadence: "Weekly Rental",
    image: basaltFern,
    note: "White roses, dried eucalyptus, stone bowl.",
  },
  {
    id: "ochre-study",
    name: "Ochre Study",
    price: 38,
    cadence: "Weekly Rental",
    image: ochreStudy,
    note: "Single tall stem in a glazed ceramic vessel.",
  },
  {
    id: "kraft-bloom",
    name: "Kraft Bloom",
    price: 52,
    cadence: "Fortnightly Rental",
    image: kraftBloom,
    note: "Ranunculus and dried grasses in dark clay.",
  },
];

export interface TrackingStep {
  label: string;
  time: string;
  done: boolean;
}

export interface Order {
  id: string;
  arrangement: string;
  status: OrderStatus;
  eta: string;
  address: string;
  start: string; // ISO date
  end: string; // ISO date
  total: number;
  steps: TrackingStep[];
}

export const orders: Order[] = [
  {
    id: "RNG-8829",
    arrangement: "Basalt & Fern",
    status: "In Transit",
    eta: "Arriving in 14 mins",
    address: "18 Rissik St, Studio 4",
    start: "2026-08-21",
    end: "2026-08-28",
    total: 45,
    steps: [
      { label: "Order confirmed", time: "07:12", done: true },
      { label: "Stems conditioned", time: "08:40", done: true },
      { label: "Out for delivery", time: "09:05", done: true },
      { label: "Delivered", time: "—", done: false },
      { label: "Collected for return", time: "—", done: false },
    ],
  },
  {
    id: "RNG-8814",
    arrangement: "Ochre Study",
    status: "Preparing",
    eta: "Dispatch tomorrow, 08:00",
    address: "Sandton Hub, Level 2",
    start: "2026-08-22",
    end: "2026-08-29",
    total: 38,
    steps: [
      { label: "Order confirmed", time: "Yesterday", done: true },
      { label: "Stems conditioned", time: "In progress", done: false },
      { label: "Out for delivery", time: "—", done: false },
      { label: "Delivered", time: "—", done: false },
      { label: "Collected for return", time: "—", done: false },
    ],
  },
  {
    id: "RNG-8790",
    arrangement: "Kraft Bloom",
    status: "Delivered",
    eta: "Return pickup on 26 Aug",
    address: "The Firelight Café",
    start: "2026-08-12",
    end: "2026-08-26",
    total: 52,
    steps: [
      { label: "Order confirmed", time: "12 Aug", done: true },
      { label: "Stems conditioned", time: "12 Aug", done: true },
      { label: "Out for delivery", time: "13 Aug", done: true },
      { label: "Delivered", time: "13 Aug", done: true },
      { label: "Collected for return", time: "—", done: false },
    ],
  },
];

export interface CalendarEvent {
  date: string; // ISO
  kind: "delivery" | "pickup";
  orderId: string;
  arrangement: string;
  time: string;
}

export const calendarEvents: CalendarEvent[] = [
  { date: "2026-08-21", kind: "delivery", orderId: "RNG-8829", arrangement: "Basalt & Fern", time: "09:30" },
  { date: "2026-08-22", kind: "delivery", orderId: "RNG-8814", arrangement: "Ochre Study", time: "08:00" },
  { date: "2026-08-26", kind: "pickup", orderId: "RNG-8790", arrangement: "Kraft Bloom", time: "16:00" },
  { date: "2026-08-28", kind: "pickup", orderId: "RNG-8829", arrangement: "Basalt & Fern", time: "11:00" },
  { date: "2026-08-29", kind: "pickup", orderId: "RNG-8814", arrangement: "Ochre Study", time: "10:15" },
  { date: "2026-09-02", kind: "delivery", orderId: "RNG-8841", arrangement: "Basalt & Fern", time: "09:00" },
];

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  tone: "delivery" | "special" | "pickup";
  unread: boolean;
}

export const notifications: AppNotification[] = [
  {
    id: "n1",
    title: "Order RNG-8829 is on the way",
    body: "Your courier is 14 minutes out from Studio 4.",
    time: "9 min ago",
    tone: "delivery",
    unread: true,
  },
  {
    id: "n2",
    title: "Spring special unlocked",
    body: "Kraft Bloom is 15% off for fortnightly rentals until 31 Aug.",
    time: "2 h ago",
    tone: "special",
    unread: true,
  },
  {
    id: "n3",
    title: "Pickup scheduled",
    body: "Kraft Bloom will be collected from The Firelight Café on 26 Aug, 16:00.",
    time: "Yesterday",
    tone: "pickup",
    unread: false,
  },
  {
    id: "n4",
    title: "Order RNG-8790 delivered",
    body: "Signed for at reception. Care card included.",
    time: "13 Aug",
    tone: "delivery",
    unread: false,
  },
];

export interface MonthStat {
  month: string;
  orders: number;
  revenue: number;
  retention: number;
}

export const sixMonthStats: MonthStat[] = [
  { month: "Mar", orders: 34, revenue: 1620, retention: 71 },
  { month: "Apr", orders: 41, revenue: 2015, retention: 74 },
  { month: "May", orders: 63, revenue: 3110, retention: 80 },
  { month: "Jun", orders: 49, revenue: 2380, retention: 76 },
  { month: "Jul", orders: 55, revenue: 2740, retention: 82 },
  { month: "Aug", orders: 68, revenue: 3339, retention: 86 },
];

export const currency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
