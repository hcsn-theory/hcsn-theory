import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Badge } from '@/components';
import { notFound } from 'next/navigation';

async function getManifestoContent() {
    try {
        const filePath = path.join(process.cwd(), '..', 'MANIFESTO.md');
        if (!fs.existsSync(filePath)) {
            return null;
        }
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        return null;
    }
}

export default async function ManifestoPage() {
    const content = await getManifestoContent();

    if (!content) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                    The HCSN Manifesto
                </h1>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">
                        Philosophy
                    </Badge>
                    <span className="text-sm text-muted-foreground">Core Principles</span>
                </div>
            </div>

            <div className="bg-card rounded-xl border p-8 shadow-sm">
                <article className="prose prose-neutral dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 border-b pb-2 hidden" {...props} />, // Hide H1 as we render it manually above
                            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />,
                            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                            blockquote: ({ node, ...props }) => (
                                <blockquote className="border-l-4 border-primary/50 bg-muted/30 pl-4 py-2 pr-2 italic text-muted-foreground my-6 rounded-r-lg" {...props} />
                            ),
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
                            hr: ({ node, ...props }) => <hr className="my-8 border-border" {...props} />,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </article>
            </div>
        </div>
    );
}
