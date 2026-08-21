import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { orders, currency } from "@/lib/rings-data";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "Track Your Flower Rentals — Rings" },
      {
        name: "description",
        content: "Follow every Rings flower rental from conditioning to delivery and return pickup, with live status updates.",
      },
      { property: "og:title", content: "Track Your Flower Rentals — Rings" },
      { property: "og:description", content: "Follow every rental from conditioning to delivery and return pickup." },
    ],
  }),
  component: OrdersPage,
});

const tone: Record<string, string> = {
  "In Transit": "bg-moss/10 text-moss",
  Preparing: "bg-kraft/30 text-stem",
  Delivered: "bg-stem/10 text-stem",
  Scheduled: "bg-bud/40 text-stem",
  Returned: "bg-black/5 text-moss/70",
};

function OrdersPage() {
  return (
    <>
      <PageHeader title="Tracking" eyebrow="Your rentals" />

      <main className="space-y-3 px-6">
        {orders.map((o) => {
          const done = o.steps.filter((s) => s.done).length;
          return (
            <Link
              key={o.id}
              to="/orders/$orderId"
              params={{ orderId: o.id }}
              className="rise block rounded-2xl bg-card p-5 ring-1 ring-black/5"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-moss/50">{o.id}</p>
                  <h2 className="truncate font-serif text-xl text-stem">{o.arrangement}</h2>
                  <p className="truncate text-xs text-moss/60">{o.address}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${tone[o.status]}`}
                >
                  {o.status}
                </span>
              </div>

              <div className="mt-4 h-1 w-full rounded-full bg-black/5">
                <div
                  className="h-1 rounded-full bg-moss"
                  style={{ width: `${(done / o.steps.length) * 100}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-moss/60">
                <span className="truncate">{o.eta}</span>
                <span className="shrink-0 font-medium text-stem">{currency(o.total)}</span>
              </div>
            </Link>
          );
        })}
      </main>
    </>
  );
}
