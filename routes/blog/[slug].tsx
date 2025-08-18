import { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { BlogPost } from "../../components/BlogPost.tsx";
import { getPost } from "../../utils/markdown.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const post = await getPost(slug);
    
    if (!post) {
      return ctx.renderNotFound();
    }
    
    return ctx.render({ post });
  },
};

import type { Post } from '../../utils/markdown.ts';

export default function BlogPostPage({ data }: PageProps<{ post: Post }>) {
  return (
    <>
      <Head>
        <title>{data.post.title} | My Blog</title>
        <meta name="description" content={data.post.excerpt} />
      </Head>
      <BlogPost post={data.post} />
    </>
  );
}

// Generate static paths for all posts
export const config: RouteConfig = {
  routeOverride: "/blog/:slug",
};
