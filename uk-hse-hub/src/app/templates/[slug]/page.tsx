import { notFound } from "next/navigation";
import Link from "next/link";
import { findTemplate } from "@/lib/content";

export default function TemplatePage({ params }: { params: { slug: string } }) {
  const t = findTemplate(params.slug);
  if (!t) return notFound();

  return (
    <div className="bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Template • {t.topic.replace(/-/g, " ")}
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              {t.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">{t.excerpt}</p>
            <div className="mt-4 text-xs text-slate-500">
              {t.format ?? "Template"} • Updated {t.updated}
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">
                What it includes
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {(t.includes ?? []).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                className="inline-flex rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
                href="/services/request-a-quote"
              >
                Need it tailored?
              </Link>
              <Link
                className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                href="/guides"
              >
                Read the guides
              </Link>
            </div>
          </div>
        </div>

        <aside className="md:col-span-5">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">
                Get the download link
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {t.gate?.enabled
                  ? t.gate.consentText ??
                    "We’ll email the download link and occasional practical updates."
                  : "Free download."}
              </p>

              <form className="mt-4 space-y-3">
                <input
                  type="email"
                  placeholder="you@company.co.uk"
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-teal-700"
                />
                <button
                  type="button"
                  className="h-11 w-full rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800"
                >
                  Email me the download link
                </button>
              </form>

              <p className="mt-3 text-xs text-slate-500">
                (Email sending will be wired to automation next.)
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">
                Fast review service
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Send your draft RAMS/risk assessment — we’ll check for gaps and
                tighten it up.
              </p>
              <Link
                href="/services/request-a-quote"
                className="mt-4 inline-flex rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Request a review
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
