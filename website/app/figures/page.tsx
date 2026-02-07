import { Section, Card } from '@/components';

/**
 * Figures Page
 */
export default function Figures() {
  // Placeholder figures
  const figures = [
    {
      id: 'phase-diagram',
      title: 'Phase Diagram of Ω',
      caption:
        'Hierarchical closure exhibits distinct phase regimes: subcritical (no transport), critical (transition), supercritical (stable structures).',
      source: 'Simulation' as const,
    },
    {
      id: 'defect-lifetimes',
      title: 'Defect Lifetime Distribution',
      caption:
        'Exponential decay with phase-dependent timescales. Long-lived worldlines exhibit particle-like behavior.',
      source: 'Simulation' as const,
    },
    {
      id: 'rewrite-imbalance',
      title: 'Rewrite Imbalance vs Momentum',
      caption:
        'Statistical persistence of directional rewrite bias. Basis for operational momentum definition.',
      source: 'Simulation' as const,
    },
    {
      id: 'interaction-scattering',
      title: 'Particle Scattering via Rewrite Competition',
      caption:
        'Two clusters interact by competing for rewrite opportunities. Interaction strength scales with rewrite flux imbalance.',
      source: 'Simulation' as const,
    },
    {
      id: 'hypergraph-snapshot',
      title: 'Hypergraph Evolution Snapshot',
      caption:
        'Discrete events and causal relations at a single rewrite step. Shows emerging local structure.',
      source: 'Simulation' as const,
    },
    {
      id: 'dimensional-growth',
      title: 'Dimensional Scaling Analysis',
      caption:
        'Preliminary evidence for finite effective dimension. Measurements expensive; full characterization incomplete.',
      source: 'Simulation' as const,
    },
  ];

  return (
    <>
      <Section title="Figures" subtitle="Simulations, visualizations, and diagrams">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {figures.map((fig) => (
            <Card key={fig.id}>
              {/* Placeholder image area */}
              <div className="w-full aspect-square bg-muted/50 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-neutral-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-muted-foreground text-sm">
                    {fig.id}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <h3 className="font-semibold text-foreground mb-2">
                {fig.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{fig.caption}</p>

              {/* Source badge */}
              <div className="text-xs text-muted-foreground">
                Source: <span className="font-mono">{fig.source}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Additional Info */}
      <Section title="About These Figures" className="bg-muted/30">
        <Card>
          <h3 className="font-semibold text-foreground mb-4">
            Simulation Evidence
          </h3>
          <p className="text-muted-foreground mb-4">
            All figures shown here are generated from simulations of the HCSN
            framework. Each figure represents empirical measurement from one or
            more simulation runs under controlled conditions.
          </p>
          <p className="text-muted-foreground mb-4">
            Currently, figures are placeholders pending open-source simulation
            code release. Descriptions reflect actual measurements from
            simulation but images are schematic.
          </p>
          <h4 className="font-semibold text-foreground mb-2 mt-6">
            Future Expansion
          </h4>
          <p className="text-muted-foreground">
            As the project develops, this gallery will grow to include:
          </p>
          <ul className="space-y-1 text-muted-foreground ml-4 list-disc mt-2">
            <li>Phase transition dynamics</li>
            <li>Particle spectrum and decay modes</li>
            <li>Dimensional emergence plots</li>
            <li>Interaction cross-sections</li>
            <li>Large-scale structure formation</li>
          </ul>
        </Card>
      </Section>
    </>
  );
}
