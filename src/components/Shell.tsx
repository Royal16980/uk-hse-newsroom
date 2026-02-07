import Link from 'next/link';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/briefing', label: 'Briefing' },
  { href: '/guidance', label: 'Guidance' },
  { href: '/enforcement', label: 'Enforcement' },
  { href: '/about', label: 'About' },
];

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.78)] backdrop-blur sticky top-0 z-50 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="grid grid-cols-3 gap-1">
                <span className="h-3 w-3 bg-[var(--brand)]" />
                <span className="h-3 w-3 bg-[var(--brand)]" />
                <span className="h-3 w-3 bg-[var(--brand)]" />
              </div>
              <div className="leading-tight">
                <div className="font-black tracking-tight">SafetySignal UK</div>
                <div className="text-xs text-slate-600">UK-first health & safety — distilled</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-5 text-sm">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:underline"
                >
                  {i.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/subscribe"
                className="inline-flex items-center rounded-full bg-[rgb(var(--text))] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Get the daily brief
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} UK HSE Newsroom. Not affiliated with the Health and Safety Executive.
            </p>
            <p>
              Built to be automated: updates powered by n8n + GitHub + Vercel.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
