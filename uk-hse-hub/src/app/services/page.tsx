import Link from "next/link";

export const metadata = { title: "Services" };

const services = [
  {
    title: "Risk Assessments & RAMS",
    desc: "Fast turnaround. Practical controls. Built for how the work actually happens.",
  },
  {
    title: "Audits & compliance support",
    desc: "Gap analysis, action plans, and ongoing support for UK SMEs.",
  },
  {
    title: "Templates & policy packs",
    desc: "Customised packs you can roll out immediately (with staff-friendly wording).",
  },
];

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Services
      </h1>
      <p className="mt-2 max-w-prose text-sm leading-6 text-slate-600">
        Prefer us to handle it? We help UK workplaces get compliant without the
        drama.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="text-lg font-semibold text-slate-900">{s.title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-xl font-semibold text-slate-900">Need this sorted this week?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Tell us what you need and your timeline. We’ll reply with a practical plan.
        </p>
        <Link
          href="/services/request-a-quote"
          className="mt-5 inline-flex rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Request a quote
        </Link>
      </div>
    </div>
  );
}
