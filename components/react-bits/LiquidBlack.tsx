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
  mouseForce = 14,
  cursorSize = 140,
  autoSpeed = 0.35,
  autoIntensity = 1.6,
  resolution = 0.5,
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
      {...rest}
    />
  );
}
