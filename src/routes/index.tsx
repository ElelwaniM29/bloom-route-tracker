import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { specials, orders, sixMonthStats, currency } from "@/lib/rings-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rings — Flower Rental Orders, Tracking & Specials" },
      {
        name: "description",
        content:
          "Rings is a flower rental workspace: place rentals, track deliveries, view the pickup calendar, get alerts and see six-month performance.",
      },
      { property: "og:title", content: "Rings — Flower Rental Orders, Tracking & Specials" },
      {
        property: "og:description",
        content: "Place flower rentals, track deliveries and pickups, and watch six months of performance.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const active = orders.filter((o) => o.status !== "Returned").slice(0, 2);
  const last = sixMonthStats[sixMonthStats.length - 1]!;
  const first = sixMonthStats[0]!;
  const growth = ((last.orders - first.orders) / first.orders) * 100;
  const revenue = sixMonthStats.reduce((sum, m) => sum + m.revenue, 0);
  const peak = Math.max(...sixMonthStats.map((m) => m.revenue));

  return (
    <>
      <PageHeader title="Rings" eyebrow="Flower rental ops" />

      <main className="space-y-10">
        <section className="rise pl-6">
          <div className="mb-4 flex items-baseline justify-between pr-6">
            <h2 className="text-base font-medium text-stem">Seasonal Specials</h2>
            <Link to="/order" className="text-xs uppercase tracking-widest text-moss/60">
              View All
            </Link>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pr-6 pb-2">
            {specials.map((s) => (
              <Link key={s.id} to="/order" search={{ item: s.id }} className="w-64 shrink-0">
                <img
                  src={s.image}
                  alt={`${s.name} flower rental arrangement`}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="aspect-4/5 w-full rounded-xl object-cover outline-1 -outline-offset-1 outline-black/5"
                />
                <div className="mt-3">
                  <p className="font-medium text-stem">{s.name}</p>
                  <p className="text-sm text-moss/70">
                    {s.cadence} — {currency(s.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rise px-6">
          <div className="rounded-2xl bg-stem p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="mb-2 font-serif text-2xl text-paper">New Arrangement</h3>
            <p className="mb-6 max-w-[56ch] text-pretty text-base text-paper/70">
              Schedule a fresh rental for your studio or workspace.
            </p>
            <Link
              to="/order"
              className="flex w-full items-center justify-center rounded-xl bg-paper py-3 font-medium text-stem ring-1 ring-paper transition-transform active:scale-95"
            >
              <svg className="mr-2 size-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create Order
            </Link>
          </div>
        </section>

        <section className="rise px-6">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-base font-medium text-stem">Active Deliveries</h2>
            <Link to="/orders" className="text-xs uppercase tracking-widest text-moss/60">
              Track
            </Link>
          </div>
          <div className="space-y-3">
            {active.map((o) => (
              <Link
                key={o.id}
                to="/orders/$orderId"
                params={{ orderId: o.id }}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-black/5"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-bud/30 outline-1 -outline-offset-1 outline-black/5">
                    <svg className="size-4 text-stem" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H18m-1.5 8.25V6.75a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6.75v7.5"
                      />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <p className="truncate font-medium text-stem">Order #{o.id.replace("RNG-", "")}</p>
                    <p className="truncate text-xs uppercase tracking-wider text-moss/60">{o.eta}</p>
                  </span>
                </div>
                <span className="shrink-0 rounded-full bg-moss/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-moss">
                  {o.status}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rise px-6 pb-4">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-base font-medium text-stem">Operational Insight</h2>
            <Link to="/analytics" className="text-xs text-moss/60">
              Last 6 Months
            </Link>
          </div>
          <div className="rounded-2xl bg-kraft/10 p-5 ring-1 ring-black/5">
            <div className="mb-4 flex h-24 items-end gap-2">
              {sixMonthStats.map((m, i) => (
                <div
                  key={m.month}
                  className={`flex-1 rounded-t-sm ${i === sixMonthStats.length - 1 ? "bg-moss" : "bg-moss/20"}`}
                  style={{ height: `${(m.revenue / peak) * 100}%` }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-moss/60">Volume Growth</p>
                <p className="text-lg font-medium text-stem">+{growth.toFixed(1)}%</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-moss/60">Revenue</p>
                <p className="text-lg font-medium text-stem">{currency(revenue)}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
