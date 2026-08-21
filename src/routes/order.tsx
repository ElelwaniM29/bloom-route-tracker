import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { specials, currency } from "@/lib/rings-data";

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>): { item?: string } =>
    typeof search["item"] === "string" ? { item: search["item"] } : {},
  head: () => ({
    meta: [
      { title: "Place a Flower Rental Order — Rings" },
      {
        name: "description",
        content: "Choose an arrangement, set your rental dates and delivery address, and confirm your Rings flower rental.",
      },
      { property: "og:title", content: "Place a Flower Rental Order — Rings" },
      { property: "og:description", content: "Choose an arrangement, set rental dates and confirm your flower rental." },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { item } = Route.useSearch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(item ?? specials[0]!.id);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [placed, setPlaced] = useState<string | null>(null);

  const active = specials.find((s) => s.id === selected) ?? specials[0]!;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(`RNG-${Math.floor(8850 + Math.random() * 140)}`);
  };

  if (placed) {
    return (
      <>
        <PageHeader title="Order placed" eyebrow="Confirmation" />
        <main className="px-6">
          <div className="rise rounded-2xl bg-stem p-6 text-paper ring-1 ring-black/5">
            <p className="text-[10px] uppercase tracking-widest text-paper/60">Reference</p>
            <p className="font-serif text-3xl">{placed}</p>
            <p className="mt-4 max-w-[56ch] text-pretty text-sm text-paper/70">
              {active.name} is booked{start ? ` from ${start}` : ""}
              {end ? ` to ${end}` : ""}. You will get a notification when the courier is dispatched.
            </p>
            <button
              onClick={() => navigate({ to: "/orders" })}
              className="mt-6 w-full rounded-xl bg-paper py-3 font-medium text-stem transition-transform active:scale-95"
            >
              Track my orders
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <PageHeader title="New order" eyebrow="Flower rental" />

      <form onSubmit={submit} className="space-y-8 px-6">
        <section className="rise">
          <h2 className="mb-4 text-base font-medium text-stem">Choose an arrangement</h2>
          <div className="space-y-3">
            {specials.map((s) => {
              const on = s.id === selected;
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-xl p-3 text-left ring-1 transition-colors ${
                    on ? "bg-stem/5 ring-stem/30" : "bg-card ring-black/5"
                  }`}
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="size-14 shrink-0 rounded-lg object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-stem">{s.name}</span>
                    <span className="block truncate text-xs text-moss/60">{s.note}</span>
                  </span>
                  <span className="shrink-0 text-sm font-medium text-stem">{currency(s.price)}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rise space-y-4">
          <h2 className="text-base font-medium text-stem">Rental period</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-[10px] uppercase tracking-widest text-moss/60">Start</span>
              <input
                type="date"
                required
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full rounded-xl bg-card px-3 py-3 text-sm text-stem ring-1 ring-black/5 outline-none focus:ring-moss/40"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] uppercase tracking-widest text-moss/60">Return</span>
              <input
                type="date"
                required
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full rounded-xl bg-card px-3 py-3 text-sm text-stem ring-1 ring-black/5 outline-none focus:ring-moss/40"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-[10px] uppercase tracking-widest text-moss/60">Delivery address</span>
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Studio, street, city"
              className="w-full rounded-xl bg-card px-3 py-3 text-sm text-stem ring-1 ring-black/5 outline-none placeholder:text-moss/40 focus:ring-moss/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[10px] uppercase tracking-widest text-moss/60">Notes for the florist</span>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Vase height, palette, access instructions"
              className="w-full resize-none rounded-xl bg-card px-3 py-3 text-sm text-stem ring-1 ring-black/5 outline-none placeholder:text-moss/40 focus:ring-moss/40"
            />
          </label>
        </section>

        <div className="rise rounded-2xl bg-kraft/10 p-5 ring-1 ring-black/5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-moss/70">{active.name}</span>
            <span className="font-medium text-stem">{currency(active.price)}</span>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-stem py-3 font-medium text-paper transition-transform active:scale-95"
          >
            Confirm rental
          </button>
        </div>
      </form>
    </>
  );
}
