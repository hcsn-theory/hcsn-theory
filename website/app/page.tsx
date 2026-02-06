import { Section, Card, Badge } from '@/components';
import { siteConfig, coreIdeas, documentationItems, roadmapItems } from '@/config/site';
import Link from 'next/link';

/**
 * Home Page
 */
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
            HCSN Theory
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-600 mb-8 leading-relaxed">
            {siteConfig.description}
          </p>
          <p className="text-sm text-neutral-500 mb-8 italic border-l-4 border-neutral-300 pl-4">
            {siteConfig.disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs"
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              Read Documentation
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 border border-neutral-300 text-neutral-900 rounded-lg font-medium hover:border-neutral-400 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* About Project */}
      <Section
        title="About the Project"
        subtitle="Research-driven approach to fundamental theory"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              Simulation-First
            </h3>
            <p className="text-neutral-600">
              All claims are validated against simulations before promotion to
              theory. Empirical evidence guides every step.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              Minimal Axioms
            </h3>
            <p className="text-neutral-600">
              Start with discrete events and local causality. No spacetime,
              symmetries, or external fields assumed.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              Emergence Over Assumption
            </h3>
            <p className="text-neutral-600">
              Particles, geometry, momentum, and forces emerge from rewrite
              statistics, not postulated axioms.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              No External Claims
            </h3>
            <p className="text-neutral-600">
              This is exploratory theory. No correspondence with known physics
              is assumed or claimed.
            </p>
          </Card>
        </div>
      </Section>

      {/* Core Ideas */}
      <Section
        title="Core Ideas"
        subtitle="Key concepts of the framework"
        className="bg-neutral-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreIdeas.map((idea, idx) => (
            <Card key={idx}>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {idea.title}
              </h3>
              <p className="text-neutral-600 text-sm">{idea.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Documentation Overview */}
      <Section
        title="Documentation"
        subtitle="The four canonical documents"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentationItems.map((item) => (
            <Link href={item.link} key={item.id}>
              <Card className="cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <Badge variant={item.status.toLowerCase().replace(' ', '-') as any}>
                    {item.status}
                  </Badge>
                </div>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* Figures */}
      <Section
        title="Figures"
        subtitle="Visualizations and diagrams"
        className="bg-neutral-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Card key={num}>
              <div className="aspect-square bg-neutral-100 rounded-md mb-4 flex items-center justify-center">
                <span className="text-neutral-400">Figure {num}</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">
                Figure {num} Placeholder
              </h3>
              <p className="text-xs text-neutral-500">
                Source: Simulation / Conceptual
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/figures"
            className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
          >
            View all figures →
          </Link>
        </div>
      </Section>

      {/* Roadmap Preview */}
      <Section
        title="Roadmap"
        subtitle="Progress and future directions"
      >
        <div className="space-y-4">
          {roadmapItems.map((item, idx) => (
            <Card key={idx}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-neutral-500">
                      {item.phase}
                    </span>
                    <h4 className="text-lg font-semibold text-neutral-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-neutral-600 text-sm">{item.description}</p>
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
        <div className="mt-6 text-center">
          <Link
            href="/roadmap"
            className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
          >
            Full roadmap →
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get Involved
          </h2>
          <p className="text-lg text-neutral-300 mb-8">
            Questions, feedback, or collaboration inquiries welcome.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
