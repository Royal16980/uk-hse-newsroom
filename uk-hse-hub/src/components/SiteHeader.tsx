import Link from "next/link";

const nav = [
  { href: "/guides", label: "Guides" },
  { href: "/templates", label: "Templates" },
  { href: "/topics/risk-assessment", label: "Topics" },
  { href: "/news", label: "News" },
  { href: "/services", label: "Services" },
  { href: "/recommended", label: "Recommended" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-sm font-semibold text-white">
            UK
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            UK HSE Hub
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-sm text-slate-700 hover:text-slate-900"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 md:inline-flex"
          >
            Contact
          </Link>
          <Link
            href="/services/request-a-quote"
            className="inline-flex rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
