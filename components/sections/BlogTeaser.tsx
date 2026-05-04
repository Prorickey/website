import { motion } from 'framer-motion';
import BlogData from '@/blogs';
import TextReveal from '@/components/ui/TextReveal';

export function BlogTeaser() {
  const posts = Object.values(BlogData)
    .slice()
    .sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0))
    .slice(0, 2);

  if (posts.length === 0) return null;

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <section id='writing' className='relative py-28'>
      <div className='mx-auto max-w-6xl px-6 lg:px-10'>
        <div className='flex flex-col gap-3'>
          <span className='text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'>
            05 — Writing
          </span>
          <TextReveal
            as='h2'
            text='Notes from the build log.'
            className='block pb-[0.12em] text-4xl leading-[1.2] font-semibold text-balance lg:text-6xl'
            stagger={0.05}
          />
        </div>

        <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-2'>
          {posts.map((post, i) => (
            <motion.article
              key={post.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
            >
              <a
                href={`/blog/${post.name}`}
                className='group block overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] transition-colors hover:border-[color:var(--accent)]'
              >
                <div className='relative aspect-video w-full overflow-hidden'>
                  <img
                    src={post.image}
                    alt={post.title}
                    className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                    loading='lazy'
                  />
                </div>
                <div className='p-6'>
                  <p className='text-xs tracking-[0.25em] text-[color:var(--text-muted)] uppercase'>
                    {new Intl.DateTimeFormat('en-US', formatOptions).format(
                      post.publishedAt
                    )}
                    {post.readTime ? ` · ${post.readTime}` : ''}
                  </p>
                  <h3 className='mt-3 text-2xl font-semibold'>{post.title}</h3>
                  <p className='mt-3 text-[color:var(--text-muted)]'>
                    {post.description}
                  </p>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        <div className='mt-10'>
          <a
            href='/blog'
            className='inline-flex items-center gap-2 text-sm tracking-[0.3em] text-[color:var(--text-muted)] uppercase transition-colors hover:text-[color:var(--accent)]'
          >
            All writing →
          </a>
        </div>
      </div>
    </section>
  );
}
