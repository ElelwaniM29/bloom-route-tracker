import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { orders, currency } from "@/lib/rings-data";

export const Route = createFileRoute("/orders/$orderId")({
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.orderId} — Rings Rental Tracking` },
      {
        name: "description",
        content: `Live status timeline for Rings flower rental order ${params.orderId}, including delivery and return pickup.`,
      },
      { property: "og:title", content: `Order ${params.orderId} — Rings Rental Tracking` },
      { property: "og:description", content: "Live status timeline for this flower rental order." },
    ],
  }),
  loader: ({ params }) => {
    const order = orders.find((o) => o.id === params.orderId);
    if (!order) throw notFound();
    return { order };
  },
  component: OrderDetail,
});

function OrderDetail() {
  const { order } = Route.useLoaderData();

  return (
    <>
      <PageHeader title={order.arrangement} eyebrow={order.id} />

      <main className="space-y-6 px-6">
        <section className="rise rounded-2xl bg-stem p-6 text-paper ring-1 ring-black/5">
          <p className="text-[10px] uppercase tracking-widest text-paper/50">Status</p>
          <p className="font-serif text-3xl">{order.status}</p>
          <p className="mt-2 text-sm text-paper/70">{order.eta}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-paper/10 pt-4 text-sm">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-paper/50">Rental period</p>
              <p className="truncate">
                {order.start} → {order.end}
              </p>
            </div>
            <div className="min-w-0 text-right">
              <p className="text-[10px] uppercase tracking-widest text-paper/50">Total</p>
              <p>{currency(order.total)}</p>
            </div>
          </div>
        </section>

        <section className="rise rounded-2xl bg-card p-6 ring-1 ring-black/5">
          <h2 className="mb-5 text-base font-medium text-stem">Timeline</h2>
          <ol className="space-y-5">
            {order.steps.map((step, i) => (
              <li key={step.label} className="flex gap-4">
                <div className="flex shrink-0 flex-col items-center">
                  <span
                    className={`mt-1 size-2.5 rounded-full ${step.done ? "bg-moss" : "border-2 border-moss/30 bg-paper"}`}
                  />
                  {i < order.steps.length - 1 ? <span className="mt-1 w-px flex-1 bg-black/10" /> : null}
                </div>
                <div className="min-w-0 pb-1">
                  <p className={`text-sm font-medium ${step.done ? "text-stem" : "text-moss/50"}`}>{step.label}</p>
                  <p className="text-xs text-moss/50">{step.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rise rounded-2xl bg-kraft/10 p-5 ring-1 ring-black/5">
          <p className="text-[10px] uppercase tracking-widest text-moss/60">Delivery address</p>
          <p className="text-sm text-stem">{order.address}</p>
          <Link
            to="/calendar"
            className="mt-4 block rounded-xl bg-stem py-3 text-center font-medium text-paper transition-transform active:scale-95"
          >
            View in calendar
          </Link>
        </section>
      </main>
    </>
  );
}
