"use client"

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Twitter, Mail, RefreshCw } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch("https://send.pageclip.co/fhkaBJep2xriqtVYbDbUkFWLRtfS6xeD/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/vnd.pageclip.v1+json"
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setStatus('success');
      } else {
        console.error("Pageclip Error:", await response.text());
        setStatus('error');
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setStatus('error');
    }
  };

  if (pathname === '/simulation') return null;

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">HC</span>
              </div>
              <span className="text-lg font-bold">HCSN Theory</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A pre-geometric framework for emergent physics, exploring how spacetime and matter arise from discrete causal structures.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Contact</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-foreground hover:underline">Documentation</Link>
              </li>
              <li>
                <Link href="/figures" className="hover:text-foreground hover:underline">Figures & Data</Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-foreground hover:underline">Research Roadmap</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Project</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground hover:underline">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground hover:underline">Collaboration</Link>
              </li>
              <li>
                <Link href="/manifesto" className="hover:text-foreground hover:underline">Manifesto</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Stay Updated</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to get updates on new simulation results and papers.
            </p>
            {/* Placeholder for newsletter form */}
            <form onSubmit={handleSubmit} className="relative flex space-x-2">
              <input
                name="email"
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex h-9 w-full rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your email"
                type="email"
              />
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="inline-flex h-9 min-w-[100px] items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 transition-transform active:scale-95"
              >
                {status === 'loading' ? <RefreshCw className="h-4 w-4 animate-spin" /> : <span>Subscribe</span>}
              </button>
              
              {/* Success Comment - Managed by React State */}
              {status === 'success' && (
                <div className="absolute -bottom-8 left-0 right-0 text-green-500 text-sm font-medium">
                  Awesome! You are now subscribed. 🎉
                </div>
              )}
              {status === 'error' && (
                <div className="absolute -bottom-8 left-0 right-0 text-red-500 text-sm font-medium">
                  Error subscribing. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} HCSN Research. Open Science License.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
