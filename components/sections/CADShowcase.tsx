'use client';

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

const BEAT_SPAN = 0.7;
const SECTION_EXTRA_SCROLL = 1.5;

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

function mixForProgress(p: number) {
  const clamped = Math.max(0, Math.min(1, p));
  if (clamped < 0.1) return 0;
  if (clamped < 0.55) return (clamped - 0.1) / 0.45;
  return 1;
}

export function CADShowcase() {
  const ref = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const beats = BEATS;
  const totalBeats = beats.length;

  const [rotY, setRotY] = useState(-0.3);
  const [tilt, setTilt] = useState(0.08);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;

        setProgress(p);
        setRotY(lerp(-0.3, Math.PI * 0.6, p));
        setTilt(
          p < 0.5
            ? lerp(0.08, -0.05, p / 0.5)
            : lerp(-0.05, 0.1, (p - 0.5) / 0.5)
        );

        const mix = mixForProgress(p);
        const stage = stageRef.current;
        if (stage) {
          stage.style.backgroundColor = lerpRgb(DARK_BG, LIGHT_BG, mix);
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
  }, []);

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
            backgroundColor: 'rgb(14, 14, 14)',
            ['--cad-text-primary' as string]: 'rgb(231, 231, 231)',
            ['--cad-text-muted' as string]: 'rgb(138, 138, 138)',
            color: 'var(--cad-text-primary)',
          } as CSSProperties
        }
        className='sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden'
      >
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
            progress={progress}
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
  progress: number;
}) {
  const isLeft = index % 2 === 0;
  const isLast = index === total - 1;
  const slice = BEAT_SPAN / Math.max(total, 1);
  const start = slice * index;
  const end = slice * (index + 1);
  const fadeIn = Math.max(slice * 0.25, 0.01);

  let opacity = 0;
  let x = isLeft ? -120 : 120;

  const p0 = Math.max(0, start - fadeIn);
  const p1 = start + fadeIn;
  const p2 = end - fadeIn;
  const p3 = Math.min(1, end + fadeIn);

  if (progress <= p0) {
    opacity = 0;
    x = isLeft ? -120 : 120;
  } else if (progress < p1) {
    const t = (progress - p0) / (p1 - p0);
    opacity = t;
    x = (isLeft ? -120 : 120) * (1 - t);
  } else if (isLast || progress < p2) {
    opacity = 1;
    x = 0;
  } else if (progress < p3) {
    const t = (progress - p2) / (p3 - p2);
    opacity = 1 - t;
    x = (isLeft ? 120 : -120) * t;
  } else {
    opacity = 0;
    x = isLeft ? 120 : -120;
  }

  return (
    <div
      style={{
        opacity,
        transform: `translateY(-50%) translateX(${x}px)`,
      }}
      className={
        'pointer-events-none absolute top-1/2 z-10 flex max-w-md flex-col gap-3 px-6 ' +
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
    </div>
  );
}
