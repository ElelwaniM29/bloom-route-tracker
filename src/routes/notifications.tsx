import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { notifications as seed } from "@/lib/rings-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Rental Alerts & Notifications — Rings" },
      {
        name: "description",
        content: "Dispatch updates, pickup reminders and seasonal specials for your Rings flower rentals, in one feed.",
      },
      { property: "og:title", content: "Rental Alerts & Notifications — Rings" },
      { property: "og:description", content: "Dispatch updates, pickup reminders and seasonal specials in one feed." },
    ],
  }),
  component: NotificationsPage,
});

const dot: Record<string, string> = {
  delivery: "bg-moss",
  pickup: "bg-bud",
  special: "bg-kraft",
};

function NotificationsPage() {
  const [items, setItems] = useState(seed);
  const unread = items.filter((n) => n.unread).length;

  return (
    <>
      <PageHeader title="Alerts" eyebrow={`${unread} unread`} />

      <main className="space-y-3 px-6">
        <button
          onClick={() => setItems((list) => list.map((n) => ({ ...n, unread: false })))}
          className="mb-1 text-xs uppercase tracking-widest text-moss/60"
        >
          Mark all read
        </button>

        {items.map((n) => (
          <button
            key={n.id}
            onClick={() => setItems((list) => list.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
            className={`grid w-full grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-xl p-4 text-left ring-1 ring-black/5 ${
              n.unread ? "bg-card" : "bg-transparent"
            }`}
          >
            <span className={`mt-1.5 size-2 shrink-0 rounded-full ${n.unread ? dot[n.tone] : "bg-black/10"}`} />
            <span className="min-w-0">
              <span className="flex items-baseline justify-between gap-3">
                <span className="truncate text-sm font-medium text-stem">{n.title}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-wider text-moss/50">{n.time}</span>
              </span>
              <span className="mt-1 block text-pretty text-xs text-moss/70">{n.body}</span>
            </span>
          </button>
        ))}
      </main>
    </>
  );
}
