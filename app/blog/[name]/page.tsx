'use client';

import * as BlogData from '@/blogs';
import Navbar from '@/components/Navbar';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function IndividualBlogPage() {
  const params = useParams();
  const name = params.name as string;

  const currentBlog = (
    BlogData.default as Record<
      string,
      (typeof BlogData.default)[keyof typeof BlogData.default]
    >
  )[name];

  const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <main>
      <Navbar />
      <article className='mx-auto w-1/2 max-w-4xl rounded-2xl bg-stone-950 px-6 py-8'>
        <header className='mb-8'>
          <h1 className='mb-4 text-4xl font-bold text-gray-200'>
            {currentBlog.title}
          </h1>
          <div className='mb-6 flex items-center text-gray-300'>
            <span>
              Published:{' '}
              {new Intl.DateTimeFormat('en-US', formatOptions).format(
                currentBlog.publishedAt
              )}{' '}
              {currentBlog.updatedAt != null
                ? '• Updated: ' +
                  new Intl.DateTimeFormat('en-US', formatOptions).format(
                    currentBlog.updatedAt
                  )
                : ''}
            </span>
            <span className='mx-2'>•</span>
            <span>{currentBlog.readTime} read</span>
          </div>
          <Image
            src='/images/blogs/nctsa.png'
            alt='North Carolina TSA App'
            width={800}
            height={256}
            className='h-96 w-full rounded-lg object-cover shadow-lg'
          />
        </header>
        {currentBlog.component}
      </article>
    </main>
  );
}
