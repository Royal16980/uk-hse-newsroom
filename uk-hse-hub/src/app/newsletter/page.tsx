import Link from "next/link";

export const metadata = { title: "Newsletter" };

export default function Newsletter() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            One useful email per week.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Practical UK compliance tips, free templates, and updates when guidance
            changes.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-900">What you’ll get</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Short, practical actions you can copy/paste</li>
              <li>Template drops (RAMS, RAs, COSHH, checklists)</li>
              <li>UK-relevant updates (HSE guidance changes, lessons from incidents)</li>
            </ul>
          </div>

          <form className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="you@company.co.uk"
              className="h-11 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-teal-700"
            />
            <button
              type="button"
              className="h-11 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Join
            </button>
          </form>

          <p className="mt-3 text-xs text-slate-500">
            We’ll email practical updates. Unsubscribe anytime.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Browse templates
            </Link>
            <Link
              href="/services/request-a-quote"
              className="inline-flex rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Get help this week
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
