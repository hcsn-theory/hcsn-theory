import { getAllDocs } from '@/lib/docs';
import { DocsSidebar } from '@/components/docs-sidebar';

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const docs = getAllDocs().map((doc) => ({
        slug: doc.slug,
        title: doc.title,
    }));

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <h4 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">
                                Documents
                            </h4>
                            <DocsSidebar items={docs} />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
