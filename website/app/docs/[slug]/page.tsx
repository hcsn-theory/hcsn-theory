import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { getDocBySlug, getAllDocs } from '@/lib/docs';
import { Badge } from '@/components';


interface DocPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const docs = getAllDocs();
    return docs.map((doc) => ({
        slug: doc.slug,
    }));
}

export default async function DocPage(props: DocPageProps) {
    const params = await props.params;
    const doc = getDocBySlug(params.slug);

    if (!doc) {
        notFound();
    }

    return (
        <article className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="mb-8 not-prose">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                    {doc.title}
                </h1>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">
                        Documentation
                    </Badge>
                    <span className="text-sm text-muted-foreground">{doc.slug}.md</span>
                </div>
            </div>

            <div className="bg-card rounded-xl border p-8 shadow-sm">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 border-b pb-2" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />,
                        li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                        blockquote: ({ node, ...props }) => {
                            // Check if it's a callout/alert
                            // Note: remark-gfm supports alerts but they might just render as blockquotes with specific text
                            // Simple heuristic for now or relying on standard blockquote styling which we make look like a callout
                            return (
                                <blockquote className="border-l-4 border-primary/50 bg-muted/30 pl-4 py-2 pr-2 italic text-muted-foreground my-6 rounded-r-lg" {...props} />
                            );
                        },
                        code: ({ node, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '')
                            const isInline = !match && !String(children).includes('\n')
                            return isInline ? (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary" {...props}>
                                    {children}
                                </code>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        },
                        pre: ({ node, ...props }) => (
                            <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto my-6 border" {...props} />
                        ),
                        table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-8 border rounded-lg">
                                <table className="w-full text-sm text-left" {...props} />
                            </div>
                        ),
                        th: ({ node, ...props }) => (
                            <th className="px-6 py-3 bg-muted font-semibold text-foreground border-b" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                            <td className="px-6 py-4 border-b last:border-0" {...props} />
                        ),
                    }}
                >
                    {doc.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}
