import Link from "next/link";
import { getNews } from "@/lib/content";

export const metadata = { title: "News" };

export default function NewsPage() {
  const items = getNews();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        News & updates
      </h1>
      <p className="mt-2 max-w-prose text-sm leading-6 text-slate-600">
        A curated feed (automation-backed). Each item is distilled into: what
        happened, what it means, and what to do Monday morning.
      </p>

      <div className="mt-8 space-y-4">
        {items.map((n) => (
          <div
            key={n.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-slate-900">
                  {n.title}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {n.source} • {n.published}
                </div>
              </div>
              <Link
                href={n.url}
                className="text-sm font-semibold text-teal-700 hover:text-teal-800"
              >
                Source →
              </Link>
            </div>

            {n.summary ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">{n.summary}</p>
            ) : null}

            {n.actions?.length ? (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">
                  What to do Monday morning
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {n.actions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
