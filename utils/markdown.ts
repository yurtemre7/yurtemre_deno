// Import removed as it's not being used
import { marked } from 'https://esm.sh/marked@9.1.6';
import { gfmHeadingId } from 'https://esm.sh/marked-gfm-heading-id@3.1.0';
import { mangle } from 'https://esm.sh/marked-mangle@1.1.11';
import hljs from 'https://esm.sh/highlight.js@11.9.0';

// Configure marked with TypeScript types
type MarkedExtension = Parameters<typeof marked.use>[0];

// Apply extensions
marked.use(gfmHeadingId() as MarkedExtension);
marked.use(mangle() as MarkedExtension);

// Type-safe highlight function
const highlight = (code: string, lang: string): string => {
  if (lang && hljs.getLanguage(lang)) {
    return hljs.highlight(code, { language: lang }).value;
  }
  return hljs.highlightAuto(code).value;
};

// Configure marked with our options
marked.setOptions({
  // @ts-ignore - The highlight function is valid but the types are not properly exposed
  highlight,
  gfm: true,
  breaks: true,
  xhtml: true,
} as const);

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  html: string;
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const text = await Deno.readTextFile(`./content/posts/${slug}.md`);
    const { content, frontmatter } = parseMarkdown(text);
    const html = marked.parse(content);
    
    return {
      slug,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || new Date().toISOString(),
      excerpt: frontmatter.excerpt || '',
      content,
      html,
    };
  } catch (err) {
    console.error(`Error reading post ${slug}:`, err);
    return null;
  }
}

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  
  try {
    for await (const entry of Deno.readDir('./content/posts')) {
      if (entry.isFile && entry.name.endsWith('.md')) {
        const slug = entry.name.replace(/\.md$/, '');
        const post = await getPost(slug);
        if (post) posts.push(post);
      }
    }
  } catch (err) {
    console.error('Error reading posts directory:', err);
  }
  
  // Sort posts by date, newest first
  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

interface Frontmatter {
  title?: string;
  date?: string;
  excerpt?: string;
  [key: string]: string | undefined;
}

function parseMarkdown(markdown: string): { content: string; frontmatter: Frontmatter } {
  const frontmatter: Record<string, string> = {};
  let content = markdown;
  
  // Simple YAML frontmatter parser
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  
  if (frontmatterMatch) {
    content = markdown.slice(frontmatterMatch[0].length);
    const frontmatterText = frontmatterMatch[1];
    
    frontmatterText.split('\n').forEach(line => {
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        frontmatter[key] = value;
      }
    });
  }
  
  return { content, frontmatter };
}
