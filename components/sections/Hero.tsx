'use client';

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Dot } from '@/components/animation.worker';
import TextReveal from '@/components/ui/TextReveal';
import Magnetic from '@/components/ui/Magnetic';

const roles = [
  'a programmer.',
  'a designer.',
  'an engineer.',
  'a creative thinker.',
  'a student.',
  'an architect.',
  'a leader.',
];

const TYPE_TICK_MS = 120;
const HOLD_TICKS = 7;

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [holdTicks, setHoldTicks] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const { scrollY } = useScroll();
  const scrollHintOpacity = useTransform(scrollY, [0, 120], [1, 0]);
  const mountHintOpacity = useMotionValue(0);
  const hintOpacity = useTransform(
    [scrollHintOpacity, mountHintOpacity],
    ([s, m]: number[]) => s * m
  );
  const canvasY = useTransform(scrollY, [0, 600], [0, 120]);
  const hintRef = useRef<HTMLDivElement | null>(null);

  useMotionValueEvent(hintOpacity, 'change', (v) => {
    if (hintRef.current) hintRef.current.style.opacity = String(v);
  });
  useMotionValueEvent(canvasY, 'change', (v) => {
    if (canvasRef.current)
      canvasRef.current.style.transform = `translateY(${v}px)`;
  });

  useEffect(() => {
    const target = roles[roleIndex];
    const id = setTimeout(() => {
      if (!deleting) {
        if (typedRole.length === target.length) {
          if (holdTicks === HOLD_TICKS) {
            setHoldTicks(0);
            setDeleting(true);
          } else {
            setHoldTicks((h) => h + 1);
          }
        } else {
          setTypedRole(target.substring(0, typedRole.length + 1));
        }
      } else {
        if (typedRole.length === 0) {
          setRoleIndex((i) => (i + 1) % roles.length);
          setDeleting(false);
        } else {
          setTypedRole(target.substring(0, typedRole.length - 1));
        }
      }
    }, TYPE_TICK_MS);
    return () => clearTimeout(id);
  }, [typedRole, roleIndex, holdTicks, deleting]);

  useEffect(() => {
    const controls = animate(mountHintOpacity, 1, {
      delay: 2,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [mountHintOpacity]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const worker = new Worker(
      new URL('@/components/animation.worker.ts', import.meta.url)
    );

    const resize = () => {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
      worker.postMessage({
        type: 'resize',
        width: canvas.width,
        height: canvas.height,
      });
    };

    resize();

    worker.postMessage({
      type: 'init',
      width: canvas.width,
      height: canvas.height,
      numDots: 60,
    });

    worker.onmessage = (e) => {
      const { dots } = e.data as { dots: Dot[] };
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.closePath();
      });
    };

    const animate = () => {
      worker.postMessage({ type: 'animate' });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      worker.terminate();
    };
  }, []);

  return (
    <section
      id='introduction'
      ref={sectionRef}
      className='relative flex min-h-screen w-full flex-1 flex-col overflow-hidden bg-linear-to-b from-[color:var(--accent-soft)] to-[color:var(--background)] to-45% px-[10%] pt-24 pb-4 lg:pt-48'
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className='absolute top-0 left-0 z-0 h-full w-full'
      />

      <div className='relative z-20 mb-16 flex flex-1 flex-col items-center justify-center gap-x-4 gap-y-10 lg:flex-row'>
        <motion.div
          className='mx-auto w-3/4 lg:w-1/4'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src='/trevor.png'
            priority
            height={250}
            width={250}
            sizes='(max-width: 768px) 250px, 250px'
            alt='Portrait'
            className='aspect-square w-full rounded-full border-2 border-[color:var(--accent)]'
          />
          <div className='flex flex-row items-center justify-center gap-2 p-3'>
            <Magnetic>
              <a
                href='https://github.com/Prorickey'
                target='_blank'
                rel='noreferrer'
                aria-label='GitHub'
              >
                <Image
                  src='/icons/github.svg'
                  alt='GitHub'
                  width={35}
                  height={35}
                />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href='https://www.linkedin.com/in/trevor-bedson/'
                target='_blank'
                rel='noreferrer'
                aria-label='LinkedIn'
              >
                <Image
                  src='/icons/linkedin.svg'
                  alt='LinkedIn'
                  width={50}
                  height={50}
                />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href='mailto:trevor@bedson.tech'
                aria-label='Email'
                className='group relative flex'
              >
                <Image
                  src='/icons/mail.svg'
                  alt='Email'
                  width={50}
                  height={50}
                />
                <span className='pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 rounded bg-white px-2 py-1 text-sm text-stone-900 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                  trevor@bedson.tech
                </span>
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <div>
          <TextReveal
            as='h1'
            text='Trevor Bedson'
            className='block text-center text-6xl font-semibold lg:pl-0 lg:text-8xl xl:text-nowrap'
            stagger={0.06}
            immediate
          />
          <h2 className='mt-2 flex flex-wrap items-baseline justify-center gap-x-3 text-center text-3xl lg:text-6xl'>
            <span>i am</span>
            <span className='relative inline-block min-w-[10ch] text-left text-[color:var(--accent)]'>
              {typedRole}
            </span>
          </h2>
        </div>
      </div>

      <div
        ref={hintRef}
        aria-hidden
        style={{ opacity: 0 }}
        className='relative z-20 mt-auto flex flex-col items-center justify-center gap-2 pb-4 text-xs tracking-[0.3em] text-[color:var(--text-muted)] uppercase'
      >
        <span>Scroll</span>
        <span className='block h-10 w-px bg-[color:var(--text-muted)]/60' />
      </div>
    </section>
  );
}
