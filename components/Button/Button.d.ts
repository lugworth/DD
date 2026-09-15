import type * as React from 'react';

export type Accent = 'magenta' | 'pink' | 'coral' | 'orange' | 'lime' | 'green' | 'cyan' | 'cobalt' | 'indigo' | 'violet';
export type Surface = 'black' | 'night' | 'cream';
export type Signal = 'live' | 'standby' | 'offline';
export type Geometry = 'sharp' | 'notched' | 'pill';
export type Glitch = 'off' | 'subtle' | 'heavy';
export type Texture = 'none' | 'stripe' | 'dot' | 'scan' | 'checker' | 'grid' | 'bar';
export type Animation = 'none' | 'marquee' | 'blink' | 'shift';

/** Deep, muted second family. Never seeded — plates and editorial only. */
export type SecondSet = 'blush' | 'oxblood' | 'botanical' | 'teal' | 'red' | 'electric';

export interface ButtonProps {
  children?: React.ReactNode;
  /** Label text. Also the hue seed when no `id` is given. */
  label?: string;
  /** Stable hue seed. Survives label renames. */
  id?: string;
  /** Pin the hue instead of deriving it from the seed. */
  accent?: Accent;
  variant?: 'solid' | 'ghost' | 'quiet' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  surface?: Surface;
  signal?: Signal;
  geometry?: Geometry;
  glitch?: Glitch;
  /** Flat hard-stop primitive filling the ground. Moves the label onto a panel. */
  texture?: Texture;
  /** Stepped, looping motion. Respects prefers-reduced-motion. */
  animation?: Animation;
  disabled?: boolean;
  /** Leading square pip. */
  pip?: boolean;
  /** Checkerboard seam down the leading edge. */
  checker?: boolean;
  /** Square icon-only button. */
  icon?: boolean;
  block?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Button(props: ButtonProps): React.ReactElement;

export interface ButtonRowProps {
  children?: React.ReactNode;
  gap?: number;
  wrap?: boolean;
  style?: React.CSSProperties;
}

export declare function ButtonRow(props: ButtonRowProps): React.ReactElement;
