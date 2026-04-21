'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
});

const Grainient = dynamic(() => import('@/components/react-bits/Grainient'), {
  ssr: false,
});

type Beat = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  link?: string;
  source?: string;
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
  {
    id: 'roboknights',
    eyebrow: 'Chapter 05',
    title: 'Team 8569 RoboKnights.',
    body: 'Swerve drivetrain software, PID controllers, on-board vision, autonomous game-piece pickup. INTO THE DEEP season, shipping now.',
    link: 'https://roboknights.net',
    source: 'https://github.com/ftc8569/2024-IntoTheDeep',
  },
];

const BEAT_SPAN = 0.7;
const SECTION_EXTRA_SCROLL = 1.5;
const HOLD_FRACTION = 0.5;

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

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function displacedProgress(
  p: number,
  n: number,
  holdFraction = HOLD_FRACTION
): number {
  if (n <= 1) return 0;
  const holdPer = holdFraction / n;
  const transPer = (1 - holdFraction) / (n - 1);
  const step = 1 / (n - 1);

  let input = 0;
  for (let i = 0; i < n; i++) {
    const holdEnd = input + holdPer;
    if (p < holdEnd) return i * step;
    input = holdEnd;

    if (i === n - 1) return 1;

    const transEnd = input + transPer;
    if (p < transEnd) {
      const t = (p - input) / transPer;
      return i * step + smoothstep(t) * step;
    }
    input = transEnd;
  }
  return 1;
}

function mixForProgress(p: number) {
  const clamped = Math.max(0, Math.min(1, p));
  if (clamped < 0.2) return 0;
  if (clamped < 0.35) return (clamped - 0.2) / 0.15;
  return 1;
}

export function CADShowcase() {
  const ref = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const beats = BEATS;
  const totalBeats = beats.length;

  const [rotY, setRotY] = useState(-0.3);
  const [tilt, setTilt] = useState(0.08);
  const [indexFloat, setIndexFloat] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;

        const beatP = Math.min(1, p / BEAT_SPAN);
        const displaced = displacedProgress(beatP, totalBeats);

        setIndexFloat(displaced * Math.max(1, totalBeats - 1));
        setRotY(lerp(-0.3, Math.PI * 0.6, displaced));
        setTilt(
          displaced < 0.5
            ? lerp(0.08, -0.05, displaced / 0.5)
            : lerp(-0.05, 0.1, (displaced - 0.5) / 0.5)
        );

        const mix = mixForProgress(p);
        const overlay = overlayRef.current;
        if (overlay) overlay.style.opacity = String(1 - mix);

        const bar = progressBarRef.current;
        if (bar) bar.style.transform = `scaleX(${Math.min(1, p / BEAT_SPAN)})`;

        const stage = stageRef.current;
        if (stage) {
          stage.style.setProperty(
            '--cad-text-primary',
            lerpRgb(DARK_TEXT, LIGHT_TEXT, mix)
          );
          stage.style.setProperty(
            '--cad-text-muted',
            lerpRgb(DARK_MUTED, LIGHT_MUTED, mix)
          );
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [totalBeats]);

  return (
    <section
      id='cad'
      ref={ref}
      className='relative'
      style={{ height: `${(totalBeats + SECTION_EXTRA_SCROLL) * 100}vh` }}
    >
      <div
        ref={stageRef}
        style={
          {
            ['--cad-text-primary' as string]: 'rgb(231, 231, 231)',
            ['--cad-text-muted' as string]: 'rgb(138, 138, 138)',
            color: 'var(--cad-text-primary)',
          } as CSSProperties
        }
        className='sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[rgb(14,14,14)]'
      >
        <div className='absolute inset-0'>
          <Grainient
            color1='#ffffff'
            color2='#ff6b7a'
            color3='#6aa1ff'
            contrast={1.0}
            saturation={0.85}
            blendSoftness={0.25}
            warpStrength={0.8}
            warpAmplitude={70}
            grainAmount={0.08}
            timeSpeed={0.15}
            rotationAmount={120}
          />
        </div>

        <div
          ref={overlayRef}
          aria-hidden
          className='absolute inset-0 bg-[rgb(14,14,14)]'
          style={{ opacity: 1 }}
        />

        <div className='absolute inset-0'>
          <Scene rotationY={rotY} tilt={tilt} />
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
            indexFloat={indexFloat}
          />
        ))}

        <div
          className='pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[0.3em] uppercase'
          style={{ color: 'var(--cad-text-muted)' }}
        >
          Scroll
        </div>

        <div className='absolute bottom-0 left-0 z-10 h-[2px] w-full'>
          <div
            ref={progressBarRef}
            className='h-full origin-left bg-[color:var(--accent)]'
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  );
}

function BeatText({
  beat,
  index,
  total,
  indexFloat,
}: {
  beat: Beat;
  index: number;
  total: number;
  indexFloat: number;
}) {
  const isLeft = index % 2 === 0;
  const isLast = index === total - 1;

  const d = indexFloat - index;
  const absD = Math.min(1, Math.abs(d));
  const entrySign = isLeft ? -1 : 1;
  const exitSign = isLeft ? 1 : -1;

  let opacity: number;
  let x: number;

  if (isLast && d >= 0) {
    opacity = 1;
    x = 0;
  } else if (absD >= 1) {
    opacity = 0;
    x = d < 0 ? entrySign * 120 : exitSign * 120;
  } else {
    opacity = 1 - absD;
    x = d < 0 ? entrySign * absD * 120 : exitSign * absD * 120;
  }

  const hasLinks = !!(beat.link || beat.source);
  const interactive = hasLinks && opacity > 0.9;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(-50%) translateX(${x}px)`,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      className={
        'absolute top-1/2 z-10 flex max-w-md flex-col gap-3 px-6 ' +
        (isLeft
          ? 'left-4 text-left md:left-10 lg:left-16'
          : 'right-4 text-right md:right-10 lg:right-16')
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
      {hasLinks && (
        <div
          className={
            'mt-2 flex items-center gap-3 ' +
            (isLeft ? 'justify-start' : 'justify-end')
          }
        >
          {beat.link && (
            <a
              href={beat.link}
              target='_blank'
              rel='noreferrer'
              aria-label='Visit project'
              className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] transition-colors hover:border-[color:var(--accent)]'
            >
              <Image
                src='/icons/rocket.svg'
                alt=''
                width={22}
                height={22}
              />
            </a>
          )}
          {beat.source && (
            <a
              href={beat.source}
              target='_blank'
              rel='noreferrer'
              aria-label='View source'
              className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] transition-colors hover:border-[color:var(--accent)]'
            >
              <Image
                src='/icons/github.svg'
                alt=''
                width={22}
                height={22}
              />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
