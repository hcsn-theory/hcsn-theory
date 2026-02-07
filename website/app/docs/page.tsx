import { redirect } from 'next/navigation';
import { getAllDocs } from '@/lib/docs';

export default function DocsIndex() {
  const docs = getAllDocs();

  if (docs.length > 0) {
    redirect(`/docs/${docs[0].slug}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
      <h2 className="text-2xl font-bold mb-2">No Documentation Found</h2>
      <p className="text-muted-foreground">Please add markdown files to the docs directory.</p>
    </div>
  );
}
