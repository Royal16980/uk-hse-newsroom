export const metadata = { title: "Request a quote" };

export default function RequestAQuote() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Request a quote
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Tell us what you need. We’ll reply with a practical plan and timeline.
          </p>

          <form className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-teal-700"
                placeholder="Name"
              />
              <input
                className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-teal-700"
                placeholder="Company"
              />
            </div>
            <input
              className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-teal-700"
              placeholder="Email"
              type="email"
            />
            <textarea
              className="min-h-32 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-teal-700"
              placeholder="What do you need help with? (e.g., RAMS for a job, an audit, policy pack)"
            />
            <button
              type="button"
              className="h-11 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Send
            </button>
            <p className="text-xs text-slate-500">
              (We’ll wire this to automation so submissions go to a queue + email.)
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
