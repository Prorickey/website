'use client';

import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
});

type Beat = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
};

const BEATS: Beat[] = [
  {
    id: 'intro',
    eyebrow: 'Chapter 01',
    title: 'It started with FRC.',
    body: 'Grade-school me watched 120-pound robots launch foam rings across a field and decided I had to build one. That first season taught me more than any class.',
  },
  {
    id: 'cad',
    eyebrow: 'Chapter 02',
    title: 'Then came CAD.',
    body: 'OnShape became a second IDE. Part studios, mate connectors, feature scripts — modeling a mechanism before it ever touched aluminum saved weeks.',
  },
  {
    id: 'iterate',
    eyebrow: 'Chapter 03',
    title: 'Iterate. Break. Iterate.',
    body: 'Every subsystem got three revisions minimum. Intake arms, climbing linkages, swerve modules — the rule: fail fast on paper, ship what survives.',
  },
  {
    id: 'lead',
    eyebrow: 'Chapter 04',
    title: 'Now I lead the build.',
    body: 'Captaining FTC 8569 RoboKnights and mentoring 22377 SigmaCorns means the learning loop goes both ways — and the robots only get better.',
  },
];

const DARK_BG: [number, number, number] = [14, 14, 14];
const LIGHT_BG: [number, number, number] = [250, 250, 250];
const DARK_TEXT: [number, number, number] = [231, 231, 231];
const LIGHT_TEXT: [number, number, number] = [14, 14, 14];
const DARK_MUTED: [number, number, number] = [138, 138, 138];
const LIGHT_MUTED: [number, number, number] = [90, 90, 90];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function lerpRgb(
  a: [number, number, number],
  b: [number, number, number],
  t: number
) {
  return `rgb(${Math.round(lerp(a[0], b[0], t))}, ${Math.round(lerp(a[1], b[1], t))}, ${Math.round(lerp(a[2], b[2], t))})`;
}

export function CADShowcase() {
  const ref = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });

  const rotationY = useTransform(
    smoothProgress,
    [0, 1],
    [-0.3, Math.PI * 0.6]
  );
  const tilt = useTransform(smoothProgress, [0, 0.5, 1], [0.08, -0.05, 0.1]);
  const [rotY, setRotY] = useState(-0.6);
  const [t, setT] = useState(0.1);

  useEffect(() => {
    const unsub1 = rotationY.on('change', setRotY);
    const unsub2 = tilt.on('change', setT);
    return () => {
      unsub1();
      unsub2();
    };
  }, [rotationY, tilt]);

  useMotionValueEvent(smoothProgress, 'change', (p) => {
    const clamped = Math.max(0, Math.min(1, p));
    let mix = 0;
    if (clamped < 0.1) mix = 0;
    else if (clamped < 0.55) mix = (clamped - 0.1) / 0.45;
    else mix = 1;

    const stage = stageRef.current;
    if (!stage) return;
    stage.style.backgroundColor = lerpRgb(DARK_BG, LIGHT_BG, mix);
    stage.style.setProperty(
      '--cad-text-primary',
      lerpRgb(DARK_TEXT, LIGHT_TEXT, mix)
    );
    stage.style.setProperty(
      '--cad-text-muted',
      lerpRgb(DARK_MUTED, LIGHT_MUTED, mix)
    );
  });

  const beats = BEATS;
  const totalBeats = beats.length;

  return (
    <section
      id='cad'
      ref={ref}
      className='relative'
      style={{ height: `${(totalBeats + 1) * 100}vh` }}
    >
      <div
        ref={stageRef}
        style={
          {
            backgroundColor: 'rgb(14, 14, 14)',
            ['--cad-text-primary' as string]: 'rgb(231, 231, 231)',
            ['--cad-text-muted' as string]: 'rgb(138, 138, 138)',
            color: 'var(--cad-text-primary)',
          } as CSSProperties
        }
        className='sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden'
      >
        <div className='absolute inset-0'>
          <Scene rotationY={rotY} tilt={t} />
        </div>

        <div className='pointer-events-none absolute top-8 left-1/2 z-10 -translate-x-1/2 text-center'>
          <span
            className='text-xs tracking-[0.4em] uppercase'
            style={{ color: 'var(--cad-text-muted)' }}
          >
            A Robotics Story
          </span>
        </div>

        {beats.map((beat, i) => (
          <BeatText
            key={beat.id}
            beat={beat}
            index={i}
            total={beats.length}
            progress={scrollYProgress}
          />
        ))}

        <div
          className='pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[0.3em] uppercase'
          style={{ color: 'var(--cad-text-muted)' }}
        >
          Scroll
        </div>
      </div>
    </section>
  );
}

function BeatText({
  beat,
  index,
  total,
  progress,
}: {
  beat: Beat;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const isLeft = index % 2 === 0;
  const slice = 1 / Math.max(total, 1);
  const start = slice * index;
  const end = slice * (index + 1);
  const fadeIn = Math.max(slice * 0.25, 0.01);

  const inputs = [
    Math.max(0, start - fadeIn),
    start + fadeIn,
    end - fadeIn,
    Math.min(1, end + fadeIn),
  ];

  const opacity = useTransform(progress, inputs, [0, 1, 1, 0]);
  const enterFrom = isLeft ? -120 : 120;
  const exitTo = isLeft ? 120 : -120;
  const x = useTransform(progress, inputs, [enterFrom, 0, 0, exitTo]);

  const elRef = useRef<HTMLDivElement | null>(null);

  useMotionValueEvent(opacity, 'change', (v) => {
    if (elRef.current) elRef.current.style.opacity = String(v);
  });
  useMotionValueEvent(x, 'change', (v) => {
    if (elRef.current) elRef.current.style.transform = `translateX(${v}px)`;
  });

  return (
    <div
      ref={elRef}
      style={{ opacity: 0 }}
      className={
        'pointer-events-none absolute top-1/2 z-10 flex max-w-md -translate-y-1/2 flex-col gap-3 px-6 ' +
        (isLeft
          ? 'left-4 md:left-10 lg:left-16 text-left'
          : 'right-4 md:right-10 lg:right-16 text-right')
      }
    >
      <span className='text-xs tracking-[0.4em] text-[color:var(--accent)] uppercase'>
        {beat.eyebrow}
      </span>
      <h3
        className='text-3xl leading-tight font-semibold lg:text-5xl'
        style={{ color: 'var(--cad-text-primary)' }}
      >
        {beat.title}
      </h3>
      <p className='lg:text-lg' style={{ color: 'var(--cad-text-muted)' }}>
        {beat.body}
      </p>
    </div>
  );
}
