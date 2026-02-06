import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { StoryCard } from '@/components/StoryCard';
import { StoryMini } from '@/components/StoryMini';
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
              UK health & safety, with signal over noise.
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
                <StoryMini key={a.id} article={a} />
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
          <div className="mt-4">
            <StoryCard article={lead} variant="lead" />
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-black tracking-tight">More stories</h2>
          <Link className="text-sm text-slate-700 hover:underline" href="/briefing">
            Browse
          </Link>
        </div>
        <div className="mt-4 grid gap-4">
          {rest.slice(0, 6).map((a) => (
            <StoryCard key={a.id} article={a} />
          ))}
        </div>
      </section>

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
