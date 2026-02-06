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
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="grid grid-cols-3 gap-1">
                <span className="h-3 w-3 bg-[var(--brand)]" />
                <span className="h-3 w-3 bg-[var(--brand)]" />
                <span className="h-3 w-3 bg-[var(--brand)]" />
              </div>
              <div className="leading-tight">
                <div className="font-black tracking-tight">UK HSE Newsroom</div>
                <div className="text-xs text-slate-600">Practical health & safety, UK-first</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-5 text-sm">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="text-slate-700 hover:text-slate-950 hover:underline"
                >
                  {i.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/subscribe"
                className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
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
