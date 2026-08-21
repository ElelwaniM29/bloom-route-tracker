import { Link } from "@tanstack/react-router";
import { notifications } from "@/lib/rings-data";

export function PageHeader({ title, eyebrow }: { title: string; eyebrow?: string }) {
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 pt-8 pb-4">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[10px] uppercase tracking-[0.2em] text-moss/60">{eyebrow}</p>
        ) : null}
        <h1 className="truncate font-serif text-3xl leading-tight text-stem">{title}</h1>
      </div>
      <Link to="/notifications" className="relative shrink-0" aria-label="Notifications">
        {unread > 0 ? (
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-moss ring-2 ring-paper" />
        ) : null}
        <span className="flex size-9 items-center justify-center rounded-full bg-kraft/20 ring-1 ring-black/5">
          <svg
            className="size-4 shrink-0 text-stem"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </span>
      </Link>
    </header>
  );
}
