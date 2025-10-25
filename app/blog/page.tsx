'use client';

import Navbar from '@/components/Navbar';
import * as BlogData from '@/blogs';
import Image from 'next/image';

const featuredBlog = BlogData.default.NCTSAApp;

export default function BlogPage() {
  const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <main>
      <Navbar />
      <p className='mx-10 mb-4 text-3xl font-semibold'>Featured Blog</p>
      <div className='mx-10 flex flex-row'>
        <div
          className='content-background w-full cursor-pointer rounded-2xl pb-4'
          onClick={() => (window.location.href = `/blog/${featuredBlog.name}`)}
        >
          <Image
            src={featuredBlog.image}
            alt={featuredBlog.title}
            className='w-full rounded-t-2xl object-cover'
            width={600}
            height={400}
          />

          <div className='h-[2px] bg-[#db4c4c]'></div>

          <p className='mx-4 mt-2 text-3xl font-semibold'>
            {featuredBlog.title}
          </p>
          <p className='mx-4 mt-2 text-stone-300'>{featuredBlog.description}</p>
          <p className='mx-4 mt-4 text-sm text-stone-400'>
            Published:{' '}
            {new Intl.DateTimeFormat('en-US', formatOptions).format(
              featuredBlog.publishedAt
            )}{' '}
            {featuredBlog.updatedAt != null
              ? '• Updated: ' +
                new Intl.DateTimeFormat('en-US', formatOptions).format(
                  featuredBlog.updatedAt
                )
              : ''}
          </p>
        </div>
        <div className='w-full'></div>
        <div className='w-full'></div>
      </div>
    </main>
  );
}
