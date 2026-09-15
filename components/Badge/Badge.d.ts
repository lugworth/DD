import type * as React from 'react';

export type Accent = 'magenta' | 'pink' | 'coral' | 'orange' | 'lime' | 'green' | 'cyan' | 'cobalt' | 'indigo' | 'violet';
export type Surface = 'black' | 'night' | 'cream';
export type Signal = 'live' | 'standby' | 'offline';
export type Geometry = 'sharp' | 'notched' | 'pill';
export type Glitch = 'off' | 'subtle' | 'heavy';

/** Fixed-meaning statuses. These override seeded hue — an operator reads
    colour as meaning, so status must not be a hue lottery. */
export type BadgeStatus = 'ok' | 'warn' | 'down' | 'idle';

export interface BadgeProps {
  children?: React.ReactNode;
  /** Label text. Also the hue seed when no `id` is given. */
  label?: string;
  id?: string;
  accent?: Accent;
  /** Sets both hue and meaning. Wins over `accent`. */
  status?: BadgeStatus;
  variant?: 'solid' | 'ghost' | 'quiet' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  surface?: Surface;
  signal?: Signal;
  geometry?: Geometry;
  glitch?: Glitch;
  /** Leading square pip in the current ink. */
  pip?: boolean;
  /** Leading round dot — softer than `pip`, for presence lists. */
  dot?: boolean;
  /** Checkerboard seam down the leading edge. */
  checker?: boolean;
  /** Trailing figure, dimmed. Tabular. */
  count?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Badge(props: BadgeProps): React.ReactElement;

export interface BadgeCountProps {
  value: number | string;
  id?: string;
  accent?: Accent;
  surface?: Surface;
  size?: 'sm' | 'md' | 'lg';
  geometry?: Geometry;
  style?: React.CSSProperties;
}

export declare function BadgeCount(props: BadgeCountProps): React.ReactElement;

export interface BadgeRowProps {
  children?: React.ReactNode;
  gap?: number;
  wrap?: boolean;
  style?: React.CSSProperties;
}

export declare function BadgeRow(props: BadgeRowProps): React.ReactElement;
