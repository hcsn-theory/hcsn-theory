import fs from 'fs';
import path from 'path';

export interface DocumentFile {
  filename: string;
  title: string;
  content: string;
  slug: string;
}

/**
 * Read and parse markdown documentation files from the docs directory
 */
export async function getDocumentationFiles(): Promise<DocumentFile[]> {
  const docsDir = path.join(process.cwd(), '..', 'docs');
  
  // Check if docs directory exists
  if (!fs.existsSync(docsDir)) {
    console.warn('Docs directory not found:', docsDir);
    return [];
  }

  const files = fs.readdirSync(docsDir).filter((file) => file.endsWith('.md'));

  return files.map((filename) => {
    const filePath = path.join(docsDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract title from filename (e.g., "01_axioms_and_methodology.md" -> "Axioms and Methodology")
    const title = filename
      .replace(/^\d+_/, '') // Remove leading number
      .replace(/\.md$/, '') // Remove extension
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const slug = filename.replace(/\.md$/, '');

    return {
      filename,
      title,
      content,
      slug,
    };
  });
}

/**
 * Get a single documentation file by slug
 */
export async function getDocumentationFile(slug: string): Promise<DocumentFile | null> {
  const files = await getDocumentationFiles();
  return files.find((file) => file.slug === slug) || null;
}

/**
 * Convert markdown to HTML (basic implementation)
 * For production, consider using a library like 'marked' or 'remark'
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1 class="text-4xl font-bold mb-4">$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong class="font-semibold">$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

  // Code blocks
  html = html.replace(/```(.*?)```/gs, '<pre class="bg-md-surface border border-md-outline p-4 rounded overflow-x-auto"><code class="text-sm font-mono">$1</code></pre>');

  // Inline code
  html = html.replace(/`(.*?)`/g, '<code class="bg-md-surface px-2 py-1 rounded font-mono text-sm">$1</code>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-md-primary hover:underline">$1</a>');

  // Lists
  html = html.replace(/^\* (.*?)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(/(<li class="ml-4">.*?<\/li>)/gs, '<ul class="list-disc mb-4">$1</ul>');

  // Paragraphs
  html = html.split('\n\n').map((para) => {
    if (para.trim() && !para.match(/^<[h|u|p|pre]/)) {
      return `<p class="mb-4 leading-7">${para}</p>`;
    }
    return para;
  }).join('\n');

  return html;
}
