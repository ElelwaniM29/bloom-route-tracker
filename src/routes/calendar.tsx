import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { calendarEvents } from "@/lib/rings-data";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Delivery & Pickup Calendar — Rings" },
      {
        name: "description",
        content: "See every Rings flower rental delivery and return pickup on a month calendar, and tap a day for details.",
      },
      { property: "og:title", content: "Delivery & Pickup Calendar — Rings" },
      { property: "og:description", content: "Every flower rental delivery and return pickup on one month view." },
    ],
  }),
  component: CalendarPage,
});

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

function CalendarPage() {
  const [cursor, setCursor] = useState({ year: 2026, month: 7 });
  const [selected, setSelected] = useState<string>("2026-08-21");

  const grid = useMemo(() => {
    const { year, month } = cursor;
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();

    const cells: { day: number; date: string | null }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevDays - i, date: null });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, date: iso(year, month, d) });
    while (cells.length % 7 !== 0) cells.push({ day: cells.length % 7, date: null });
    return cells;
  }, [cursor]);

  const move = (delta: number) => {
    setCursor((c) => {
      const m = c.month + delta;
      if (m < 0) return { year: c.year - 1, month: 11 };
      if (m > 11) return { year: c.year + 1, month: 0 };
      return { year: c.year, month: m };
    });
  };

  const dayEvents = calendarEvents.filter((e) => e.date === selected);

  return (
    <>
      <PageHeader title="Calendar" eyebrow="Deliveries & pickups" />

      <main className="space-y-6 px-6">
        <section className="rise rounded-2xl bg-card p-6 ring-1 ring-black/5">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-medium text-stem">
              {MONTHS[cursor.month]} {cursor.year}
            </h2>
            <div className="flex gap-4">
              <button onClick={() => move(-1)} aria-label="Previous month" className="text-moss/40 hover:text-moss">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 19l-7-7 7-7" strokeWidth="2" />
                </svg>
              </button>
              <button onClick={() => move(1)} aria-label="Next month" className="text-moss/40 hover:text-moss">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-3 grid grid-cols-7 text-center text-[10px] font-medium text-moss/40">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
            {grid.map((cell, i) => {
              if (!cell.date) {
                return (
                  <span key={i} className="py-2 text-moss/20">
                    {cell.day}
                  </span>
                );
              }
              const events = calendarEvents.filter((e) => e.date === cell.date);
              const isSelected = cell.date === selected;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(cell.date!)}
                  className="relative py-2 text-stem"
                >
                  <span
                    className={`mx-auto grid size-8 place-items-center rounded-full ${
                      isSelected ? "bg-moss text-paper" : ""
                    }`}
                  >
                    {cell.day}
                  </span>
                  {events.length > 0 && !isSelected ? (
                    <span className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                      {events.slice(0, 2).map((e, k) => (
                        <span
                          key={k}
                          className={`size-1 rounded-full ${e.kind === "delivery" ? "bg-moss" : "bg-bud"}`}
                        />
                      ))}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex gap-5 border-t border-black/5 pt-4 text-[10px] uppercase tracking-widest text-moss/60">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-moss" /> Delivery
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-bud" /> Pickup
            </span>
          </div>
        </section>

        <section className="rise">
          <h2 className="mb-4 text-base font-medium text-stem">{selected}</h2>
          {dayEvents.length === 0 ? (
            <p className="rounded-2xl bg-kraft/10 p-5 text-sm text-moss/60 ring-1 ring-black/5">
              Nothing scheduled on this day.
            </p>
          ) : (
            <div className="space-y-3">
              {dayEvents.map((e, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-xl bg-card p-4 ring-1 ring-black/5"
                >
                  <span
                    className={`size-2.5 shrink-0 rounded-full ${e.kind === "delivery" ? "bg-moss" : "bg-bud"}`}
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-stem">{e.arrangement}</span>
                    <span className="block truncate text-xs uppercase tracking-wider text-moss/60">
                      {e.kind} · {e.orderId}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm text-stem">{e.time}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
