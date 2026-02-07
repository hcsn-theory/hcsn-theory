import { Section, Card } from '@/components';

/**
 * About Page
 */
export default function About() {
  return (
    <>
      <Section title="About HCSN Theory">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Motivation
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Hierarchical Causal Structure Networks (HCSN) represents an attempt
              to ground physics in discrete, causally-ordered structures rather
              than continuous spacetime manifolds. The motivation is
              epistemological: if spacetime is emergent, what are the
              fundamentals?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This work explores how objects we recognize as "particles,"
              "forces," "geometry," and "fields" might arise naturally from
              local, discrete rewrite processes that preserve causal
              consistency—with no background spacetime required.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Core Philosophy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h4 className="font-semibold text-foreground mb-2">
                  Minimal Assumptions
                </h4>
                <p className="text-sm text-muted-foreground">
                  Start only with discrete events, causal relations, and local
                  rewrite rules. Everything else must be derived.
                </p>
              </Card>
              <Card>
                <h4 className="font-semibold text-foreground mb-2">
                  Simulation-Driven
                </h4>
                <p className="text-sm text-muted-foreground">
                  All theory claims are validated computationally before being
                  elevated to formal results.
                </p>
              </Card>
              <Card>
                <h4 className="font-semibold text-foreground mb-2">
                  Operational Definitions
                </h4>
                <p className="text-sm text-muted-foreground">
                  Every physical quantity is defined operationally—what can be
                  measured and computed from rewrite histories.
                </p>
              </Card>
              <Card>
                <h4 className="font-semibold text-foreground mb-2">
                  Emergence Over Assumption
                </h4>
                <p className="text-sm text-muted-foreground">
                  Particles, forces, geometry, and quantum behavior emerge from
                  rewrite statistics, not from external axioms.
                </p>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Why This Work Exists
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Physics is stuck at the intersection of quantum mechanics and
              general relativity. HCSN does not claim to "solve" this. Rather, it
              asks: what if we rebuilt from scratch, starting with causality
              instead of symmetry or probability?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is exploratory research. There is no claim of correspondence
              with known physics. The goal is to understand whether a
              causal-rewrite framework can naturally produce the structures we
              observe.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              How Simulations Guide Theory
            </h3>
            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="font-semibold text-foreground min-w-fit">
                    1. Axioms
                  </span>
                  <span className="text-muted-foreground">
                    Define minimal rewrite rules that preserve causal consistency.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="font-semibold text-foreground min-w-fit">
                    2. Simulation
                  </span>
                  <span className="text-muted-foreground">
                    Run the system and measure observables (Ω order parameter, ξ
                    transport, defect persistence).
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="font-semibold text-foreground min-w-fit">
                    3. Observation
                  </span>
                  <span className="text-muted-foreground">
                    Identify robust patterns (phase transitions, particle-like
                    objects, interaction laws).
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="font-semibold text-foreground min-w-fit">
                    4. Theory
                  </span>
                  <span className="text-muted-foreground">
                    Formalize what was observed into operational definitions and
                    derived results.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="font-semibold text-foreground min-w-fit">
                    5. Refinement
                  </span>
                  <span className="text-muted-foreground">
                    Test new predictions. Correct misinterpretations. Iterate.
                  </span>
                </li>
              </ol>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Current Status
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              HCSN has validated:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li>✓ A minimal axiomatic foundation (discrete events, rewrites, causal consistency)</li>
              <li>✓ Phase structure in hierarchical closure (Ω)</li>
              <li>✓ Emergent particle-like objects (defect worldlines)</li>
              <li>✓ Operational definitions of momentum and mass</li>
              <li>✓ Rewrite-mediated interaction mechanism</li>
              <li>✓ Partial evidence for finite-dimensional emergence</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              What remains: dimensional selection mechanism, gauge structure,
              continuum limits, and any connection to known physics (speculative).
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
