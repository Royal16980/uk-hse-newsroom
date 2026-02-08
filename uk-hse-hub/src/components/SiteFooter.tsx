import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-sm font-semibold text-slate-900">UK HSE Hub</div>
          <p className="mt-2 max-w-prose text-sm leading-6 text-slate-600">
            Practical UK health &amp; safety guidance, templates and tools. Not legal
            advice.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Site
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-slate-700 hover:text-slate-900" href="/guides">
                Guides
              </Link>
            </li>
            <li>
              <Link className="text-slate-700 hover:text-slate-900" href="/templates">
                Templates
              </Link>
            </li>
            <li>
              <Link className="text-slate-700 hover:text-slate-900" href="/services">
                Services
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-700 hover:text-slate-900"
                href="/newsletter"
              >
                Newsletter
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Legal
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-slate-700 hover:text-slate-900" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="text-slate-700 hover:text-slate-900" href="/cookies">
                Cookies
              </Link>
            </li>
            <li>
              <Link className="text-slate-700 hover:text-slate-900" href="/affiliate-disclosure">
                Affiliate disclosure
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} UK HSE Hub</span>
          <span>Built for UK workplaces.</span>
        </div>
      </div>
    </footer>
  );
}
