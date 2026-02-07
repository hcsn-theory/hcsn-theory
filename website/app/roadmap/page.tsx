import { Section, Card, Badge } from '@/components';
import { roadmapItems } from '@/config/site';

/**
 * Roadmap Page
 */
export default function Roadmap() {
  return (
    <>
      <Section title="Roadmap" subtitle="Progress to date and future directions">
        <div className="space-y-4">
          {roadmapItems.map((item, idx) => (
            <Card key={idx}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                      {item.phase}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <Badge
                  variant={
                    item.status === 'Completed'
                      ? 'stable'
                      : item.status === 'Current'
                        ? 'empirical'
                        : 'in-progress'
                  }
                >
                  {item.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Detailed milestones */}
      <Section title="Completed Milestones" className="bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              Phases 1–10: Foundation
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Discrete event axioms</li>
              <li>✓ Causal consistency preservation</li>
              <li>✓ Rewrite rule implementation</li>
              <li>✓ Ω order parameter definition</li>
              <li>✓ Initial defect observation</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              Phase 11: Phase Transitions
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Ω phase diagram discovery</li>
              <li>✓ Critical transition at Ω ≈ 1.1</li>
              <li>✓ Corrected Ω-carrier misconception</li>
              <li>✓ ξ transport capacity mapping</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              Phases 12–16: Particles & Dynamics
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Worldline definition & persistence</li>
              <li>✓ Particle criteria (empirical)</li>
              <li>✓ Momentum operationalization</li>
              <li>✓ Mass-lifetime relation</li>
              <li>✓ Rewrite competition mechanism</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              Documentation Consolidation
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ 4 canonical documents created</li>
              <li>✓ 15+ earlier drafts archived</li>
              <li>✓ Concepts deduplicated</li>
              <li>✓ Claims graded by empirical status</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Current focus */}
      <Section title="Current Focus (Phase 17+)">
        <Card>
          <h3 className="font-semibold text-foreground mb-4">
            Dimensional Selection & Large-Scale Scaling
          </h3>
          <p className="text-muted-foreground mb-4">
            The primary focus is understanding how:
          </p>
          <ul className="space-y-3 text-muted-foreground ml-4 list-disc">
            <li>
              <strong>Dimension emerges:</strong> Preliminary evidence suggests
              finite effective dimension (≈3–5), but the mechanism remains
              unexplained.
            </li>
            <li>
              <strong>Scaling limits:</strong> Can continuous effective field
              theories be derived from discrete rewrites?
            </li>
            <li>
              <strong>Universality:</strong> Are results robust across different
              rule sets?
            </li>
            <li>
              <strong>Long-time behavior:</strong> Beyond 10⁵ rewrites,
              computational cost rises sharply. Asymptotic analysis needed.
            </li>
          </ul>
        </Card>
      </Section>

      {/* Future directions */}
      <Section title="Future Directions" className="bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              Structural Classification
            </h3>
            <p className="text-muted-foreground text-sm">
              Are there discrete classes of defects? Can we identify conserved
              properties that classify worldlines into families?
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              Symmetry Emergence
            </h3>
            <p className="text-muted-foreground text-sm">
              Can rewrite redundancy classes yield nontrivial symmetry-group
              structures? Is gauge invariance emergent?
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              Continuum Limits
            </h3>
            <p className="text-muted-foreground text-sm">
              Can effective field theories be derived rigorously from
              coarse-grained Ω dynamics? What are the emergent Lagrangians?
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              Cosmology & Initial Conditions
            </h3>
            <p className="text-muted-foreground text-sm">
              How do we specify initial conditions on the hypergraph? What does
              "early universe" mean in a discrete causal framework?
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              Quantum Behavior
            </h3>
            <p className="text-muted-foreground text-sm">
              The theory is already probabilistic. Does this naturally give rise
              to quantum statistics without postulating Born rule?
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-foreground mb-3">
              External Correspondence
            </h3>
            <p className="text-muted-foreground text-sm">
              If large-scale limits emerge, do they resemble known physics? This
              remains deeply speculative.
            </p>
          </Card>
        </div>
      </Section>

      {/* Call to action */}
      <Section title="Contribute">
        <Card>
          <p className="text-muted-foreground mb-4">
            HCSN Theory is exploratory research. We welcome:
          </p>
          <ul className="space-y-2 text-muted-foreground ml-4 list-disc mb-6">
            <li>Feedback on theory and interpretation</li>
            <li>Simulation implementations in other languages</li>
            <li>Dimension measurement and scaling analysis</li>
            <li>Connections to other research areas</li>
          </ul>
          <a
            href="mailto:contact@hcsn-theory.research"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Get in touch →
          </a>
        </Card>
      </Section>
    </>
  );
}
