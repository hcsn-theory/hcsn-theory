import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Navbar, Footer } from '@/components';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import '@/styles/globals.css';
import 'katex/dist/katex.min.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'HCSN Theory — Discrete Causal Networks',
  description:
    'A pre-geometric framework where spacetime, particles, and dynamics emerge from local rewrite processes in discrete causal networks.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
