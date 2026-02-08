import Link from "next/link";
import { notFound } from "next/navigation";
import { findGuide, findTemplate } from "@/lib/content";

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = findGuide(params.slug);
  if (!guide) return notFound();

  const relatedTemplate = findTemplate("risk-assessment-template");

  return (
    <div className="bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-12">
        <article className="md:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              {guide.topic.replace(/-/g, " ")}
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              {guide.title}
            </h1>
            <div className="mt-2 text-sm text-slate-500">
              Updated {guide.updated}
              {guide.readingMinutes ? ` • ${guide.readingMinutes} min read` : ""}
            </div>

            <div className="prose prose-slate mt-6 max-w-none">
              {guide.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {guide.checklist?.length ? (
              <div className="mt-8 rounded-xl border border-slate-200 bg-teal-50 p-5">
                <div className="text-sm font-semibold text-slate-900">
                  Quick checklist
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {guide.checklist.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                className="inline-flex rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
                href="/services/request-a-quote"
              >
                Speak to a consultant
              </Link>
              <Link
                className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                href="/templates"
              >
                Browse templates
              </Link>
            </div>
          </div>
        </article>

        <aside className="md:col-span-4">
          <div className="sticky top-24 space-y-4">
            {relatedTemplate ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">
                  Related template
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {relatedTemplate.title}
                </p>
                <Link
                  href={`/templates/${relatedTemplate.slug}`}
                  className="mt-4 inline-flex rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                >
                  View & download
                </Link>
                <p className="mt-3 text-xs text-slate-500">
                  {relatedTemplate.gate?.enabled
                    ? "Email required for download"
                    : "Free download"}
                </p>
              </div>
            ) : null}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">
                Newsletter
              </div>
              <p className="mt-2 text-sm text-slate-600">
                One useful email per week: tips, templates, and UK updates.
              </p>
              <Link
                href="/newsletter"
                className="mt-4 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800"
              >
                Join →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
