'use client';

import { motion } from 'framer-motion';
import { createElement } from 'react';

type Props = {
  text: string;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export default function TextReveal({
  text,
  as = 'span',
  className,
  delay = 0,
  stagger = 0.035,
  once = true,
}: Props) {
  const words = text.split(' ');

  const children = words.map((word, wi) => (
    <span
      key={`${word}-${wi}`}
      className='inline-block overflow-hidden align-bottom'
    >
      <motion.span
        className='inline-block'
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once, amount: 0.6 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
          delay: delay + wi * stagger,
        }}
      >
        {word}
        {wi < words.length - 1 ? ' ' : ''}
      </motion.span>
    </span>
  ));

  return createElement(as, { className, 'aria-label': text }, ...children);
}
