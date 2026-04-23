'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => (
    <div className='flex h-full items-center justify-center text-sm text-neutral-500'>
      Loading 3D view…
    </div>
  ),
});

const Grainient = dynamic(() => import('@/components/react-bits/Grainient'), {
  ssr: false,
});

type Team = {
  id: string;
  name: string;
  logo: string;
  color: string;
  link?: string;
  source?: string;
  instagram?: string;
  linkedin?: string;
};

type Beat = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  link?: string;
  source?: string;
  instagram?: string;
  linkedin?: string;
  teams?: Team[];
};

const BEATS: Beat[] = [
  {
    id: 'intro',
    eyebrow: 'Chapter 01',
    title: 'Joining FTC.',
    body: "High school junior me thought I'd give robotics a try for the first time. I joined team 8569 RoboKnights, and learned basic control theory.",
  },
  {
    id: 'expand',
    eyebrow: 'Chapter 02',
    title: 'Expanding my horizons.',
    body: 'Looking to learn more, I dove deeper in programming and learning CAD. I developed novel control systems, helping me with awards at international competitions. I also worked to model parts online and contributing to the mechanical bot.',
  },
  {
    id: 'lead',
    eyebrow: 'Chapter 03',
    title: 'From member to leader.',
    body: 'At the beginning of my senior year, I was named captain of my team. I excelled at developing strategies to train and integrate new members, and motivated my team to build more competative robots than we had ever built before.',
  },
  {
    id: 'opportunity',
    eyebrow: 'Chapter 04',
    title: 'A new opportunity.',
    body: 'I started working more with team 22377 SigmaCorns to dive deeper into robotics programming. The focus shifted from not just building a competative robot, but to fully optimizing every bit of it we could.',
  },
  {
    id: 'robotics',
    eyebrow: 'Chapter 05',
    title: 'RoboKnights & SigmaCorns',
    body: 'Computer vision, PID controllers, LQR controllers, full-robot physics simulations, model predictive control, command-based systems, optimized loop times, and much more',
    teams: [
      {
        id: 'roboknights',
        name: 'RoboKnights 8569',
        logo: '/icons/roboknights.png',
        color: 'rgb(221, 28, 138)',
        link: 'https://roboknights.net',
        source: 'https://github.com/ftc8569/',
        instagram: 'https://www.instagram.com/roboknights8569/',
        linkedin: 'https://www.linkedin.com/company/ftc8569/',
      },
      {
        id: 'sigmacorns',
        name: 'SigmaCorns 22377',
        logo: '/icons/sigmacorns.png',
        color: 'rgb(204, 164, 222)',
        link: 'https://sigmacorns.org',
        source: 'https://github.com/FTC-SigmaCorns-22377',
        instagram: 'https://www.instagram.com/ftc22377/',
        linkedin: 'https://www.linkedin.com/company/sigmacorns/',
      },
    ],
  },
];

const BEAT_SPAN = 0.8;
const SECTION_EXTRA_SCROLL = 1;
const HOLD_FRACTION = 0.5;

const DEG = Math.PI / 180;
const ROTATION_START_DEG = -45;
const ROTATION_STEPS_DEG = [0, 45, 135, 180, 270];

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

function rotationForIndex(idx: number): number {
  const steps = ROTATION_STEPS_DEG;
  const last = steps.length - 1;
  const clamped = Math.max(0, Math.min(last, idx));
  const i = Math.floor(clamped);
  const next = Math.min(last, i + 1);
  const t = clamped - i;
  const deg = lerp(steps[i], steps[next], smoothstep(t));
  return (ROTATION_START_DEG + deg) * DEG;
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

  const [rotY, setRotY] = useState(rotationForIndex(0));
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

        const idxFloat = displaced * Math.max(1, totalBeats - 1);
        setIndexFloat(idxFloat);
        setRotY(rotationForIndex(idxFloat));
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

        <div className='absolute inset-x-0 top-1/2 bottom-0 md:inset-0'>
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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

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

  const hasTeams = !!(beat.teams && beat.teams.length);
  const hasLinks =
    hasTeams ||
    !!(beat.link || beat.source || beat.instagram || beat.linkedin);
  const interactive = hasLinks && opacity > 0.9;

  const mobileX = x * 0.25;
  const transform = isMobile
    ? `translateX(${mobileX}px)`
    : `translateY(-50%) translateX(${x}px)`;

  return (
    <div
      style={{
        opacity,
        transform,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      className={
        'absolute top-20 right-4 left-4 z-10 mx-auto flex max-w-md flex-col gap-3 px-6 text-center ' +
        'md:top-1/2 md:mx-0 md:max-w-md ' +
        (isLeft
          ? 'md:right-auto md:left-4 md:text-left md:[text-align:left] lg:md:left-16'
          : 'md:right-4 md:left-auto md:text-right md:[text-align:right] lg:md:right-16')
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
      {hasTeams && (
        <div
          className={
            'mt-2 flex flex-col gap-2 items-center ' +
            (isLeft ? 'md:items-start' : 'md:items-end')
          }
        >
          {beat.teams!.map((team) => (
            <TeamPill key={team.id} team={team} />
          ))}
        </div>
      )}
      {!hasTeams && hasLinks && (
        <div
          className={
            'mt-2 flex items-center gap-3 justify-center ' +
            (isLeft ? 'md:justify-start' : 'md:justify-end')
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
          {beat.instagram && (
            <a
              href={beat.instagram}
              target='_blank'
              rel='noreferrer'
              aria-label='Instagram'
              className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] transition-colors hover:border-[color:var(--accent)]'
            >
              <Image
                src='/icons/instagram.svg'
                alt=''
                width={22}
                height={22}
              />
            </a>
          )}
          {beat.linkedin && (
            <a
              href={beat.linkedin}
              target='_blank'
              rel='noreferrer'
              aria-label='LinkedIn'
              className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] transition-colors hover:border-[color:var(--accent)]'
            >
              <Image
                src='/icons/linkedin.svg'
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

function TeamPill({ team }: { team: Team }) {
  const links: { href?: string; src: string; label: string }[] = [
    { href: team.link, src: '/icons/rocket.svg', label: 'Visit site' },
    { href: team.source, src: '/icons/github.svg', label: 'View source' },
    { href: team.instagram, src: '/icons/instagram.svg', label: 'Instagram' },
    { href: team.linkedin, src: '/icons/linkedin.svg', label: 'LinkedIn' },
  ];
  return (
    <div
      className='inline-flex items-center gap-2 rounded-full border bg-[color:var(--surface-2)] py-1.5 pr-2 pl-2'
      style={{ borderColor: team.color }}
    >
      <span
        className='inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/10'
        aria-label={team.name}
        title={team.name}
      >
        <Image
          src={team.logo}
          alt={team.name}
          width={28}
          height={28}
          className='h-7 w-7 object-contain'
        />
      </span>
      {links.map(
        (l) =>
          l.href && (
            <a
              key={l.label}
              href={l.href}
              target='_blank'
              rel='noreferrer'
              aria-label={`${team.name} ${l.label}`}
              className='inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10'
            >
              <Image src={l.src} alt='' width={18} height={18} />
            </a>
          )
      )}
    </div>
  );
}
