'use client';

import { motion } from 'framer-motion';
import { createElement, useEffect, useState } from 'react';

type Props = {
  text: string;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  immediate?: boolean;
};

export default function TextReveal({
  text,
  as = 'span',
  className,
  delay = 0,
  stagger = 0.035,
  once = true,
  immediate = false,
}: Props) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node || immediate) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, once, immediate]);

  const shouldShow = immediate || inView;

  const words = text.split(' ');

  const children = words.map((word, wi) => {
    const transition = {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: delay + wi * stagger,
    };

    const isLast = wi === words.length - 1;
    return (
      <span key={`${word}-${wi}`}>
        <span className='inline-block overflow-hidden pb-[0.15em] align-bottom'>
          <motion.span
            className='inline-block'
            initial={{ y: '110%' }}
            animate={shouldShow ? { y: '0%' } : { y: '110%' }}
            transition={transition}
          >
            {word}
          </motion.span>
        </span>
        {isLast ? '' : ' '}
      </span>
    );
  });

  return createElement(
    as,
    { ref: setNode, className, 'aria-label': text },
    ...children
  );
}
