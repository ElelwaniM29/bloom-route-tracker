import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { sixMonthStats, specials, currency } from "@/lib/rings-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Six-Month Rental Analytics — Rings" },
      {
        name: "description",
        content: "Six months of Rings flower rental performance: revenue, order volume, retention and top-performing arrangements.",
      },
      { property: "og:title", content: "Six-Month Rental Analytics — Rings" },
      { property: "og:description", content: "Revenue, order volume, retention and top arrangements over six months." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const revenue = sixMonthStats.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = sixMonthStats.reduce((s, m) => s + m.orders, 0);
  const peakRevenue = Math.max(...sixMonthStats.map((m) => m.revenue));
  const first = sixMonthStats[0];
  const last = sixMonthStats[sixMonthStats.length - 1];
  const growth = ((last.orders - first.orders) / first.orders) * 100;
  const avgOrder = revenue / totalOrders;

  const mix = [
    { name: specials[0].name, share: 44 },
    { name: specials[1].name, share: 33 },
    { name: specials[2].name, share: 23 },
  ];

  return (
    <>
      <PageHeader title="Insight" eyebrow="Last six months" />

      <main className="space-y-6 px-6">
        <section className="rise grid grid-cols-2 gap-3">
          {[
            { label: "Revenue", value: currency(revenue) },
            { label: "Rentals", value: String(totalOrders) },
            { label: "Volume growth", value: `+${growth.toFixed(1)}%` },
            { label: "Avg. rental", value: currency(avgOrder) },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl bg-card p-4 ring-1 ring-black/5">
              <p className="text-[10px] uppercase tracking-widest text-moss/60">{k.label}</p>
              <p className="mt-1 font-serif text-2xl text-stem">{k.value}</p>
            </div>
          ))}
        </section>

        <section className="rise rounded-2xl bg-kraft/10 p-5 ring-1 ring-black/5">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-base font-medium text-stem">Revenue by month</h2>
            <span className="text-xs text-moss/60">Mar — Aug</span>
          </div>
          <div className="flex h-32 items-end gap-2">
            {sixMonthStats.map((m, i) => (
              <div key={m.month} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <span className="text-[10px] text-moss/60">{(m.revenue / 1000).toFixed(1)}k</span>
                <div
                  className={`w-full rounded-t-sm ${i === sixMonthStats.length - 1 ? "bg-moss" : "bg-moss/20"}`}
                  style={{ height: `${(m.revenue / peakRevenue) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-6 text-center text-[10px] uppercase tracking-widest text-moss/50">
            {sixMonthStats.map((m) => (
              <span key={m.month}>{m.month}</span>
            ))}
          </div>
        </section>

        <section className="rise rounded-2xl bg-stem p-6 text-paper ring-1 ring-black/5">
          <h2 className="mb-5 text-base font-medium">Rental volume & retention</h2>
          <div className="space-y-4">
            {sixMonthStats.map((m) => (
              <div key={m.month} className="grid grid-cols-[2.5rem_minmax(0,1fr)_3rem] items-center gap-3">
                <span className="text-xs text-paper/50">{m.month}</span>
                <span className="h-1.5 rounded-full bg-paper/10">
                  <span
                    className="block h-1.5 rounded-full bg-kraft"
                    style={{ width: `${(m.orders / Math.max(...sixMonthStats.map((x) => x.orders))) * 100}%` }}
                  />
                </span>
                <span className="text-right text-xs text-paper/70">{m.retention}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rise rounded-2xl bg-card p-6 ring-1 ring-black/5">
          <h2 className="mb-5 text-base font-medium text-stem">Arrangement mix</h2>
          <div className="space-y-4">
            {mix.map((m) => (
              <div key={m.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="truncate text-sm text-stem">{m.name}</span>
                  <span className="shrink-0 text-xs text-moss/60">{m.share}%</span>
                </div>
                <span className="block h-1.5 rounded-full bg-black/5">
                  <span className="block h-1.5 rounded-full bg-moss" style={{ width: `${m.share}%` }} />
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
