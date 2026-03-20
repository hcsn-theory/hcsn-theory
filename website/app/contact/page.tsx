"use client"

import * as React from 'react';
import { Section, Card } from '@/components';
import { RefreshCw } from 'lucide-react';

/**
 * Contact Page
 */
export default function Contact() {
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
  return (
    <>
      <Section title="Contact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Email Contacts
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground">Research</p>
                <p className="text-sm text-muted-foreground mb-1">For theory discoveries and research-related inquiries.</p>
                <a href="mailto:research@hcsn.tech" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">research@hcsn.tech</a>
              </div>
              <div>
                <p className="font-medium text-foreground">Technical Support</p>
                <p className="text-sm text-muted-foreground mb-1">For website issues, simulation crashes, and technical reports.</p>
                <a href="mailto:admin@hcsn.tech" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">admin@hcsn.tech</a>
              </div>
              <div>
                <p className="font-medium text-foreground">Personal</p>
                <p className="text-sm text-muted-foreground mb-1">For personal contact and direct inquiries.</p>
                <a href="mailto:saifmukhtar@hcsn.tech" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">saifmukhtar@hcsn.tech</a>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              GitHub Projects
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground">Organization Profile</p>
                <p className="text-sm text-muted-foreground mb-1">View our primary GitHub organization.</p>
                <a href="https://github.com/hcsn-theory" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">github.com/hcsn-theory</a>
              </div>
              <div>
                <p className="font-medium text-foreground">Theory Repository</p>
                <p className="text-sm text-muted-foreground mb-1">View the theory documents and academic contributions.</p>
                <a href="https://github.com/hcsn-theory/hcsn-theory" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">hcsn-theory/hcsn-theory</a>
              </div>
              <div>
                <p className="font-medium text-foreground">Simulation Code</p>
                <p className="text-sm text-muted-foreground mb-1">Open-source codebase for the causal network simulations.</p>
                <a href="https://github.com/hcsn-theory/hcsn-sim" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">hcsn-theory/hcsn-sim</a>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Discussion guidelines */}
      <Section title="How We Collaborate" className="bg-muted/30">
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              Research Discussion
            </h3>
            <p className="text-muted-foreground">
              We welcome rigorous discussion of theory, methodology, and
              simulation results. All comments should be grounded in:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4 list-disc mt-3">
              <li>Operational definitions</li>
              <li>Empirical evidence from simulation</li>
              <li>Logical reasoning from axioms</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              What We're Open To
            </h3>
            <ul className="space-y-2 text-muted-foreground ml-4 list-disc">
              <li>Alternative rewrite rule proposals</li>
              <li>Simulation implementations</li>
              <li>Mathematical refinements</li>
              <li>Critiques of current interpretations</li>
              <li>Connections to other frameworks (without assuming equivalence)</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              What We're Not Claiming
            </h3>
            <ul className="space-y-2 text-muted-foreground ml-4 list-disc">
              <li>Unification of physics ✗</li>
              <li>Correspondence with known theories ✗</li>
              <li>Final answers ✗</li>
              <li>Experimental predictions (yet) ✗</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-3">
              This is exploratory theory. All claims are graded by empirical
              support and remain open to revision.
            </p>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Frequently Asked Questions">
        <div className="space-y-4">
          {[
            {
              q: 'Is HCSN claiming to unify physics?',
              a: 'No. HCSN is exploratory research into discrete causal frameworks. Whether large-scale limits resemble known physics is an open question.',
            },
            {
              q: 'How does this relate to quantum mechanics?',
              a: 'The theory is probabilistic at the rewrite level but does not postulate quantum axioms. Quantum-like behavior may emerge, but is not assumed.',
            },
            {
              q: 'How does this relate to general relativity?',
              a: 'No correspondence is claimed. Geometry is emergent from Ω dynamics. Whether this resembles spacetime curvature is speculative.',
            },
            {
              q: 'Where is the simulation code?',
              a: 'Simulation code is maintained separately. Open-source release is planned pending documentation stabilization.',
            },
            {
              q: 'Can I reproduce the results?',
              a: 'Once code is released, anyone can run simulations and verify measurements. All results are designed to be reproducible.',
            },
            {
              q: 'What is the philosophical motivation?',
              a: 'The core question: if spacetime is emergent, what are the fundamentals? This work explores discrete causality as an alternative to manifolds.',
            },
          ].map((item, idx) => (
            <Card key={idx}>
              <h4 className="font-semibold text-foreground mb-2">
                {item.q}
              </h4>
              <p className="text-muted-foreground text-sm">{item.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Newsletter/Updates placeholder */}
      <Section title="Stay Updated" className="bg-muted/30">
        <Card>
          <h3 className="font-semibold text-foreground mb-4">
            Subscribe for Updates
          </h3>
          <p className="text-muted-foreground mb-6">
            Get notified when major theory updates, new documents, or simulation
            results are released.
          </p>
          <form onSubmit={handleSubmit} className="relative space-y-3">
            <input
              name="email"
              required
              disabled={status === 'loading' || status === 'success'}
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="flex justify-center items-center w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {status === 'loading' ? <RefreshCw className="h-5 w-5 animate-spin" /> : <span>Subscribe</span>}
            </button>
            {/* Success/Error Comment - Managed by React State */}
            {status === 'success' && (
              <div className="absolute -bottom-8 left-0 right-0 text-green-600 dark:text-green-400 text-sm font-medium text-center">
                Thanks for subscribing! We'll keep you posted. 🎉
              </div>
            )}
            {status === 'error' && (
              <div className="absolute -bottom-8 left-0 right-0 text-red-600 dark:text-red-400 text-sm font-medium text-center">
                Error. Please try again.
              </div>
            )}
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            We'll email you only for major updates. No spam.
          </p>
        </Card>
      </Section>
    </>
  );
}
