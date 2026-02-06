import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UK HSE Newsroom',
  description:
    'BBC-style health & safety briefing for the UK: enforcement, guidance, incident learnings, and practical leadership actions.',
  metadataBase: new URL('https://uk-hse-newsroom.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
