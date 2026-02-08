import Link from "next/link";
import { getGuides, getTemplates } from "@/lib/content";

export default function Home() {
  const guides = getGuides().slice(0, 3);
  const templates = getTemplates().slice(0, 6);

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              UK Health & Safety
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl md:leading-tight">
              Health &amp; Safety made practical for UK workplaces.
            </h1>
            <p className="mt-4 max-w-prose text-base leading-7 text-slate-600">
              Plain-English guidance, ready-to-use templates, and consultant support
              when you need it.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                className="inline-flex rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
                href="/services/request-a-quote"
              >
                Get a quote
              </Link>
              <Link
                className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                href="/templates"
              >
                Download free templates
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2 text-xs text-slate-600">
              {[
                "Serving UK SMEs",
                "Construction",
                "Facilities",
                "Care",
                "Hospitality",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">
              Popular templates
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Copy, customise, and get compliant faster.
            </p>
            <div className="mt-5 grid gap-3">
              {templates.map((t) => (
                <Link
                  key={t.slug}
                  href={`/templates/${t.slug}`}
                  className="group rounded-xl border border-slate-200 px-4 py-3 hover:border-slate-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-teal-800">
                        {t.title}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-600">
                        {t.format ?? "Template"} • Updated {t.updated}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-teal-700">
                      View
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/templates"
              className="mt-5 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              Browse all templates →
            </Link>
          </div>
        </div>

        <section className="mt-14 md:mt-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Start with the fundamentals
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Practical guides with checklists and UK context.
              </p>
            </div>
            <Link
              href="/guides"
              className="hidden text-sm font-semibold text-teal-700 hover:text-teal-800 md:inline-flex"
            >
              View all guides →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
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
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {g.excerpt}
                </p>
                <div className="mt-4 text-xs text-slate-500">
                  Updated {g.updated}
                  {g.readingMinutes ? ` • ${g.readingMinutes} min read` : ""}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:mt-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                One useful email per week.
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Short, practical compliance tips + free templates + updates when
                guidance changes.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="you@company.co.uk"
                className="h-11 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-teal-700"
              />
              <button
                type="button"
                className="h-11 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Join the newsletter
              </button>
            </form>
            <p className="text-xs text-slate-500 md:col-span-2">
              We’ll email practical updates. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
