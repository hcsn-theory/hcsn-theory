import { Section, Card } from '@/components';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface DocFile {
  filename: string;
  title: string;
  slug: string;
}

// Get list of documentation files at build time
function getDocFiles(): DocFile[] {
  try {
    const docsDir = join(process.cwd(), '..', 'docs');
    const files = readdirSync(docsDir)
      .filter((f) => f.endsWith('.md'))
      .map((filename) => {
        const title = filename
          .replace(/^\d+_/, '')
          .replace(/\.md$/, '')
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return {
          filename,
          title,
          slug: filename.replace(/\.md$/, ''),
        };
      });

    return files.sort((a, b) => a.filename.localeCompare(b.filename));
  } catch (error) {
    console.error('Failed to read docs directory:', error);
    return [];
  }
}

// Render markdown with basic formatting
function renderMarkdown(content: string): React.ReactNode[] {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('# ')) {
      return (
        <h1 key={i} className="text-4xl font-bold mt-8 mb-6">
          {line.replace(/^#+ /, '')}
        </h1>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <h2 key={i} className="text-2xl font-bold mt-6 mb-4">
          {line.replace(/^#+ /, '')}
        </h2>
      );
    }
    if (line.startsWith('### ')) {
      return (
        <h3 key={i} className="text-xl font-semibold mt-5 mb-3">
          {line.replace(/^#+ /, '')}
        </h3>
      );
    }
    if (line.trim() === '') {
      return <div key={i} className="h-3" />;
    }
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="ml-6 list-disc">
          {line.replace(/^- /, '')}
        </li>
      );
    }
    if (line.startsWith('*') && !line.startsWith('* ')) {
      return (
        <p key={i} className="font-semibold mt-4 mb-2">
          {line}
        </p>
      );
    }
    return (
      line && (
        <p key={i} className="mb-4 leading-7">
          {line}
        </p>
      )
    );
  });
}

export default function DocsPage() {
  const docs = getDocFiles();
  const firstDoc = docs.length > 0 ? docs[0] : null;
  let content = '';

  if (firstDoc) {
    try {
      const docsDir = join(process.cwd(), '..', 'docs');
      const filePath = join(docsDir, firstDoc.filename);
      content = readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error('Failed to read doc file:', error);
    }
  }

  return (
    <div className="min-h-screen bg-md-surface">
      <Section title="Documentation" subtitle="HCSN Theory Reference">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-2">
              {docs.length > 0 ? (
                docs.map((doc) => (
                  <div
                    key={doc.slug}
                    className="bg-white text-md-on-surface border border-md-outline rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-md-primary">{doc.title}</h3>
                    <p className="text-xs text-md-outline mt-1">{doc.filename}</p>
                    <p className="text-sm text-md-on-surface mt-2 leading-relaxed">
                      Available in repository
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-md-error">No documentation found</p>
              )}
            </div>
          </div>

          {/* Content Area - Display first document */}
          <div className="lg:col-span-3">
            <Card className="p-8 bg-white">
              {content ? (
                <div className="text-md-on-surface">{renderMarkdown(content)}</div>
              ) : (
                <p className="text-md-outline">No documentation available</p>
              )}
            </Card>

            {/* Links to other docs */}
            {docs.length > 1 && (
              <div className="mt-8 space-y-2">
                <h3 className="text-lg font-semibold text-md-on-surface mb-4">
                  Other Documentation Files
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {docs.slice(1).map((doc) => (
                    <Card key={doc.slug} className="p-4 bg-white">
                      <h4 className="font-semibold text-md-primary text-lg">
                        {doc.title}
                      </h4>
                      <p className="text-sm text-md-outline mt-1">{doc.filename}</p>
                      <p className="text-xs text-md-outline mt-2 italic">
                        Available in repository at{' '}
                        <code className="bg-neutral-100 px-1 rounded">docs/{doc.filename}</code>
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Glossary Section */}
      <Section title="Glossary" subtitle="Key Concepts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {glossaryTerms.map((term) => (
            <Card key={term.term} className="p-4 bg-white">
              <h3 className="font-semibold text-md-on-surface">{term.term}</h3>
              <p className="text-sm text-md-outline mt-1">{term.definition}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

const glossaryTerms = [
  {
    term: 'Defect',
    definition: 'Discrete Ω discontinuity representing local rule violation or boundary.',
  },
  {
    term: 'Worldline',
    definition: 'Persistent sequence of correlated defects forming identity over time.',
  },
  {
    term: 'Particle',
    definition: 'Long-lived worldline satisfying operational criteria (stability, repeatability).',
  },
  {
    term: 'Momentum',
    definition: 'Statistical persistence of rewrite imbalance; measurable via ξ decay rate.',
  },
  {
    term: 'Mass',
    definition: 'Inverse variance of momentum; proportional to worldline lifetime.',
  },
  {
    term: 'Interaction',
    definition: 'Correlated rewrite reorganization between worldlines; asymmetric and environment-mediated.',
  },
  {
    term: 'Ω (Omega)',
    definition: 'Order parameter characterizing causal substrate state; discrete and local.',
  },
  {
    term: 'ξ (Xi)',
    definition: 'Diagnostic variable for measuring defect/rewrite dynamics; non-conserved.',
  },
];
