import Link from "next/link";
import { notFound } from "next/navigation";
import { findTopic, getGuides, getTemplates } from "@/lib/content";

export default function TopicHub({ params }: { params: { slug: string } }) {
  const topic = findTopic(params.slug);
  if (!topic) return notFound();

  const guides = getGuides().filter((g) => g.topic === topic.slug);
  const templates = getTemplates().filter((t) => t.topic === topic.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-teal-700">
          Topic hub
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          {topic.title}
        </h1>
        <p className="mt-3 max-w-prose text-sm leading-6 text-slate-600">
          {topic.intro}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/templates"
            className="inline-flex rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Download templates
          </Link>
          <Link
            href="/services/request-a-quote"
            className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Need help this week?
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Start here</h2>
          <div className="mt-4 space-y-3">
            {(topic.startHere ?? []).map((slug) => {
              const g = getGuides().find((x) => x.slug === slug);
              if (!g) return null;
              return (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
                >
                  <div className="text-sm font-semibold text-slate-900">
                    {g.title}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{g.excerpt}</div>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Templates</h2>
          <div className="mt-4 space-y-3">
            {templates.map((t) => (
              <Link
                key={t.slug}
                href={`/templates/${t.slug}`}
                className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
              >
                <div className="text-sm font-semibold text-slate-900">
                  {t.title}
                </div>
                <div className="mt-1 text-sm text-slate-600">{t.excerpt}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Latest guides</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300"
            >
              <div className="text-lg font-semibold text-slate-900">
                {g.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{g.excerpt}</p>
              <div className="mt-4 text-xs text-slate-500">Updated {g.updated}</div>
            </Link>
          ))}
        </div>
      </section>

      {topic.faq?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">FAQ</h2>
          <div className="mt-4 space-y-3">
            {topic.faq.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-sm font-semibold text-slate-900">{f.q}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{f.a}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
