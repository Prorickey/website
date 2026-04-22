'use client';

import Image from 'next/image';

type Props = {
  langs: string[];
  langlinks: Record<string, string>;
  columns?: number;
  iconSize?: number;
  stopPropagation?: boolean;
  className?: string;
};

export function LanguageIcons({
  langs,
  langlinks,
  columns = 8,
  iconSize = 40,
  stopPropagation = false,
  className,
}: Props) {
  const gridColsClass = gridColsFor(columns);

  return (
    <div
      className={
        `grid ${gridColsClass} content-start justify-start gap-x-1 gap-y-4 ` +
        (className ?? '')
      }
    >
      {langs.map((lang) => {
        const icon = lang === 'onshape' ? 'onshape.png' : `${lang}.svg`;
        const href = langlinks?.[lang];

        const img = (
          <Image
            src={`/knows/${icon}`}
            alt={lang}
            height={iconSize}
            width={iconSize}
          />
        );

        if (!href) return <span key={lang}>{img}</span>;

        return (
          <button
            key={lang}
            onClick={(e) => {
              if (stopPropagation) e.stopPropagation();
              window.open(href, '_blank');
            }}
          >
            {img}
          </button>
        );
      })}
    </div>
  );
}

function gridColsFor(columns: number) {
  switch (columns) {
    case 4:
      return 'grid-cols-4';
    case 5:
      return 'grid-cols-5';
    case 6:
      return 'grid-cols-6';
    case 7:
      return 'grid-cols-7';
    case 8:
      return 'grid-cols-8';
    case 9:
      return 'grid-cols-9';
    case 10:
      return 'grid-cols-10';
    default:
      return 'grid-cols-8';
  }
}
