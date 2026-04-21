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
  const words = text.split(' ');

  const children = words.map((word, wi) => {
    const transition = {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: delay + wi * stagger,
    };

    const motionProps = immediate
      ? { initial: { y: '110%' }, animate: { y: '0%' }, transition }
      : {
          initial: { y: '110%' },
          whileInView: { y: '0%' },
          viewport: { once, amount: 0.1, margin: '0px 0px -10% 0px' },
          transition,
        };

    const isLast = wi === words.length - 1;
    return (
      <span key={`${word}-${wi}`}>
        <span className='inline-block overflow-hidden align-bottom'>
          <motion.span className='inline-block' {...motionProps}>
            {word}
          </motion.span>
        </span>
        {isLast ? '' : ' '}
      </span>
    );
  });

  return createElement(as, { className, 'aria-label': text }, ...children);
}
