import Link from "next/link";
import { getGuides } from "@/lib/content";

export const metadata = { title: "Guides" };

export default function GuidesIndex() {
  const guides = getGuides();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Guides
      </h1>
      <p className="mt-2 max-w-prose text-sm leading-6 text-slate-600">
        Practical UK health &amp; safety explainers with checklists and templates.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              {g.topic.replace(/-/g, " ")}
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-900">
              {g.title}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{g.excerpt}</p>
            <div className="mt-4 text-xs text-slate-500">Updated {g.updated}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
