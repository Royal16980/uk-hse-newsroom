import type { Metadata } from 'next';
import { Instrument_Sans, Source_Serif_4 } from 'next/font/google';
import './globals.css';

const ui = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SafetySignal UK',
  description:
    'A modern UK health & safety newsroom: enforcement, guidance, incident learnings, and practical actions for leaders.',
  metadataBase: new URL('https://uk-hse-newsroom.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ui.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))] antialiased [font-family:var(--font-ui)]">
        {children}
      </body>
    </html>
  );
}
