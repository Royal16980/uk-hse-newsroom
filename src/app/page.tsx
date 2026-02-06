import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { getFeed } from '@/lib/articles';

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
      {children}
    </span>
  );
}

export default async function HomePage() {
  const feed = await getFeed();
  const [lead, ...rest] = feed.articles;

  return (
    <Shell>
      <section className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6">
            <div className="flex flex-wrap gap-2">
              <Tag>UK</Tag>
              <Tag>Health & Safety</Tag>
              <Tag>Daily Brief</Tag>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              A BBC-style HSE briefing — built for leaders who need clarity, not noise.
            </h1>
            <p className="mt-3 max-w-prose text-slate-700">
              We watch enforcement, guidance updates, incident learnings and sector signals — then distill it into
              actions you can take this week.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/briefing"
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Read today’s briefing
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                What this is
              </Link>
            </div>
          </div>
        </div>

        <aside className="md:col-span-4">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="text-xs font-semibold text-slate-500">Latest feed</div>
            <div className="mt-2 text-sm text-slate-700">
              Updated: {feed.generatedAt ? new Date(feed.generatedAt).toUTCString() : '—'}
            </div>
            <div className="mt-5 space-y-4">
              {rest.slice(0, 5).map((a) => (
                <Link key={a.id} className="block group" href={`/story/${a.id}`}>
                  <div className="text-sm font-semibold group-hover:underline">{a.title}</div>
                  <div className="mt-1 text-xs text-slate-600">{a.source ?? 'Source'} · {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('en-GB') : ''}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {lead ? (
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-black tracking-tight">Top story</h2>
            <Link className="text-sm text-slate-700 hover:underline" href="/briefing">
              See all
            </Link>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 p-6">
            <div className="flex flex-wrap gap-2">
              {(lead.tags || []).slice(0, 4).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <h3 className="mt-3 text-2xl font-black tracking-tight">
              <Link href={`/story/${lead.id}`} className="hover:underline">
                {lead.title}
              </Link>
            </h3>
            {lead.deck ? <p className="mt-2 max-w-prose text-slate-700">{lead.deck}</p> : null}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
              <span>{lead.source ?? 'Source'}</span>
              <span>{lead.publishedAt ? new Date(lead.publishedAt).toLocaleString('en-GB') : ''}</span>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Enforcement watch',
            body: 'Track prosecutions, notices, and patterns — translated into simple prevention actions.',
            href: '/enforcement',
          },
          {
            title: 'Guidance distilled',
            body: 'What changed, what it means, and the one-page summary you can forward internally.',
            href: '/guidance',
          },
          {
            title: 'Leadership brief',
            body: 'Board-ready, consequence-led framing: risk, cost, reputational exposure, and controls.',
            href: '/briefing',
          },
        ].map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="rounded-2xl border border-slate-200 p-6 hover:bg-slate-50"
          >
            <div className="text-base font-black">{c.title}</div>
            <div className="mt-2 text-sm text-slate-700">{c.body}</div>
          </Link>
        ))}
      </section>
    </Shell>
  );
}
