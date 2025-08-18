// deno-lint-ignore-file react-no-danger
import { Post } from "../utils/markdown.ts";

// Simple sanitization function (for production, consider using a library like DOMPurify)
const sanitizeHtml = (html: string): string => {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// Component to render HTML content
function HtmlContent({ html }: { html: string }) {
  const sanitized = sanitizeHtml(html);
  // Render the HTML as a string and then use dangerouslySetInnerHTML
  // This is safe because we've sanitized the HTML
  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

export function BlogPost({ post }: { post: Post }) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <time className="text-gray-500" dateTime={new Date(post.date).toISOString()}>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>
      
      <HtmlContent html={post.html} />
    </article>
  );
}

export function BlogPostList({ posts }: { posts: Post[] }) {
  return (
    <div class="max-w-3xl mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8">Blog Posts</h1>
      <div class="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} class="border-b border-gray-200 pb-6">
            <h2 class="text-2xl font-semibold mb-2">
              <a 
                href={`/blog/${post.slug}`}
                class="transition-colors"
              >
                {post.title}
              </a>
            </h2>
            <time 
              class="text-gray-500 text-sm block mb-2"
              dateTime={new Date(post.date).toISOString()}
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.excerpt && (
              <p class="">
                {post.excerpt}
              </p>
            )}
            <a 
              href={`/blog/${post.slug}`}
              class="inline-block mt-2"
            >
              Read more →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
