import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), '..', 'docs');

export interface Doc {
  slug: string;
  title: string;
  content: string;
  order: number;
}

export function getAllDocs(): Doc[] {
  // Check if directory exists
  if (!fs.existsSync(docsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(docsDirectory);
  const allDocsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      // Clean up the 01_ prefix for the slug if desired, or keep it to maintain order
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(docsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { content } = matter(fileContents);

      // Extract title from filename (e.g. "01_axioms_and_methodology.md" -> "Axioms And Methodology")
      const title = fileName
        .replace(/\.md$/, '')
        .replace(/^\d+_/, '') // Remove leading numbers
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const orderMatch = fileName.match(/^(\d+)_/);
      const order = orderMatch ? parseInt(orderMatch[1], 10) : 999;

      return {
        slug,
        title,
        content,
        order,
      };
    });

  // Sort docs by order
  return allDocsData.sort((a, b) => a.order - b.order);
}

export function getDocBySlug(slug: string): Doc | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(docsDirectory, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);
    
    const title = realSlug
      .replace(/^\d+_/, '')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const orderMatch = realSlug.match(/^(\d+)_/);
    const order = orderMatch ? parseInt(orderMatch[1], 10) : 999;

    return {
      slug: realSlug,
      title,
      content,
      order,
    };
  } catch (error) {
    return null;
  }
}
