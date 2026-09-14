import { notFound } from 'next/navigation';

// The blog is disabled while it's being reworked. Delete this file to re-enable /blog.
export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  notFound();
  return children;
}
