import { Section, Card } from '@/components';

/**
 * Contact Page
 */
export default function Contact() {
  return (
    <>
      <Section title="Contact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Email
            </h3>
            <p className="text-muted-foreground mb-4">
              Questions, feedback, or collaboration inquiries:
            </p>
            <a
              href="mailto:hcsntheory@hcsn.tech"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              hcsntheory@hcsn.tech
            </a>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              GitHub
            </h3>
            <p className="text-muted-foreground mb-4">
              View the theory documents and contribute:
            </p>
            <a
              href="https://github.com/hcsn-theory"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              github.com/hcsn-theory
            </a>
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
          <form className="space-y-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            We'll email you only for major updates. No spam.
          </p>
        </Card>
      </Section>
    </>
  );
}
