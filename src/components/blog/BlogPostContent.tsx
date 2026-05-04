import blogList from '@/blogs';

export default function BlogPostContent({ name }: { name: string }) {
  const blog = blogList[name as keyof typeof blogList];
  if (!blog) return <p>Blog post not found.</p>;
  return <>{blog.component}</>;
}
