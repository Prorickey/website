'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TextReveal from '@/components/ui/TextReveal';

type Item = {
  id: string;
  name: string;
  icon: string;
  docs: string;
};

type Category = {
  label: string;
  items: Item[];
};

type Toolkit = { categories: Category[] };

export function Toolkit() {
  const [data, setData] = useState<Toolkit | null>(null);

  useEffect(() => {
    fetch('/toolkit.json')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ categories: [] }));
  }, []);

  return (
    <section id='toolkit' className='relative py-28'>
      <div className='mx-auto max-w-6xl px-6 lg:px-10'>
        <span className='text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'>
          02 — Toolkit
        </span>
        <TextReveal
          as='h2'
          text='Tools I reach for.'
          className='mt-4 block text-balance text-4xl font-semibold lg:text-6xl'
          stagger={0.05}
        />
        <p className='mt-4 max-w-2xl text-[color:var(--text-muted)] lg:text-lg'>
          A snapshot of the stack I build with day-to-day — from language of
          choice to the infrastructure that keeps things alive.
        </p>

        <div className='mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4'>
          {data?.categories.map((cat, ci) => (
            <div key={cat.label} className='flex flex-col gap-6'>
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className='text-sm tracking-[0.3em] text-[color:var(--accent)] uppercase'
              >
                {cat.label}
              </motion.h3>
              <div className='grid grid-cols-3 gap-4'>
                {cat.items.map((item, ii) => (
                  <ToolTile
                    key={item.id}
                    item={item}
                    delay={ci * 0.05 + ii * 0.04}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolTile({ item, delay }: { item: Item; delay: number }) {
  return (
    <motion.a
      href={item.docs}
      target='_blank'
      rel='noreferrer'
      aria-label={item.name}
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -4 }}
      className='group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] p-4 transition-colors hover:border-[color:var(--accent)]'
    >
      <Image
        src={item.icon}
        alt={item.name}
        width={40}
        height={40}
        className='h-10 w-10 object-contain transition-transform group-hover:scale-110'
      />
      <span className='text-center text-xs text-[color:var(--text-muted)] group-hover:text-[color:var(--text-primary)]'>
        {item.name}
      </span>
    </motion.a>
  );
}
