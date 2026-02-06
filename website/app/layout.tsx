import type { Metadata, Viewport } from 'next';
import { Navbar, Footer } from '@/components';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'HCSN Theory — Discrete Causal Networks',
  description:
    'A pre-geometric framework where spacetime, particles, and dynamics emerge from local rewrite processes in discrete causal networks.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
