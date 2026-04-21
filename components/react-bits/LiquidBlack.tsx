'use client';

import LiquidEther, {
  type LiquidEtherProps,
} from '@/components/react-bits/LiquidEther';

type Props = Omit<LiquidEtherProps, 'colors'> & {
  colors?: string[];
};

const liquidBlackPalette = ['#050505', '#141418', '#1e1e24', '#2a2a34'];

export default function LiquidBlack({
  colors = liquidBlackPalette,
  mouseForce = 12,
  cursorSize = 140,
  autoSpeed = 0.25,
  autoIntensity = 1.2,
  resolution = 0.28,
  iterationsPoisson = 12,
  iterationsViscous = 12,
  dt = 0.02,
  ...rest
}: Props) {
  return (
    <LiquidEther
      colors={colors}
      mouseForce={mouseForce}
      cursorSize={cursorSize}
      autoSpeed={autoSpeed}
      autoIntensity={autoIntensity}
      resolution={resolution}
      iterationsPoisson={iterationsPoisson}
      iterationsViscous={iterationsViscous}
      dt={dt}
      {...rest}
    />
  );
}
