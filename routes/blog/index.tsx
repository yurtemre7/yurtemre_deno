import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { BlogPostList } from "../../components/BlogPost.tsx";
import { getPosts, type Post } from "../../utils/markdown.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const posts = await getPosts();
    return ctx.render({ posts });
  },
};

export default function BlogIndex({ data }: PageProps<{ posts: Post[] }>) {
  return (
    <>
      <Head>
        <title>Blog | My Website</title>
        <meta name="description" content="Read our latest blog posts" />
      </Head>
      <BlogPostList posts={data.posts} />
    </>
  );
}
