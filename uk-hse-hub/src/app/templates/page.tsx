import Link from "next/link";
import { getTemplates } from "@/lib/content";

export const metadata = { title: "Templates" };

export default function TemplatesIndex() {
  const templates = getTemplates();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Templates
      </h1>
      <p className="mt-2 max-w-prose text-sm leading-6 text-slate-600">
        Downloadable templates for UK workplaces. Clear guidance included.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {templates.map((t) => (
          <Link
            key={t.slug}
            href={`/templates/${t.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              {t.topic.replace(/-/g, " ")}
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-900">
              {t.title}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{t.excerpt}</p>
            <div className="mt-4 text-xs text-slate-500">
              {t.format ?? "Template"} • Updated {t.updated}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
