import React from 'react';

/**
 * Footer component
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">
              About
            </h3>
            <p className="text-sm text-neutral-600">
              HCSN Theory: A pre-geometric framework for emergent physics based
              on discrete causal networks.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">
              Legal
            </h3>
            <p className="text-xs text-neutral-600">
              Exploratory, simulation-driven research. No assumed correspondence
              with established physical theories.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-6 flex justify-between items-center">
          <p className="text-xs text-neutral-600">
            © {currentYear} HCSN Research. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600">
            Built with{' '}
            <a
              href="https://nextjs.org"
              className="hover:text-neutral-900 transition-colors"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
