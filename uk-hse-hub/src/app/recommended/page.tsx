export const metadata = { title: "Recommended" };

export default function Recommended() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Recommended tools
      </h1>
      <p className="mt-2 max-w-prose text-sm leading-6 text-slate-600">
        We may earn a commission from some links (at no extra cost to you). We only
        recommend products we genuinely rate.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-slate-900">Coming next</div>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>PPE basics: gloves, eye protection, hearing protection</li>
          <li>Signage &amp; labelling</li>
          <li>Inspection &amp; incident reporting software</li>
          <li>Training providers (UK-focused)</li>
        </ul>
      </div>
    </div>
  );
}
