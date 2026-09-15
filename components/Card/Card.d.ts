import type * as React from 'react';

export type Accent = 'magenta' | 'pink' | 'coral' | 'orange' | 'lime' | 'green' | 'cyan' | 'cobalt' | 'indigo' | 'violet';
export type Surface = 'black' | 'night' | 'cream';
export type Signal = 'live' | 'standby' | 'offline';
export type Geometry = 'sharp' | 'notched' | 'pill';
export type Glitch = 'off' | 'subtle' | 'heavy';
export type Texture = 'none' | 'stripe' | 'dot' | 'scan' | 'checker' | 'grid' | 'bar';

export interface CardProps {
  children?: React.ReactNode;
  /** Display heading. Also the hue seed when no `id` is given. */
  title?: string;
  /** Small tracked eyebrow above the title. */
  label?: string;
  id?: string;
  accent?: Accent;
  surface?: Surface;
  /** `accent` fills the whole card with the seeded stop. */
  variant?: 'panel' | 'raised' | 'flat' | 'accent' | 'outline';
  signal?: Signal;
  geometry?: Geometry;
  glitch?: Glitch;
  /** Flat hard-stop ground. Keep copy off it — put text in a CardSection. */
  texture?: Texture;
  padding?: 'sm' | 'md' | 'lg' | number;
  /** Checkerboard trim across the top edge. Trim, not texture. */
  strip?: boolean;
  rule?: boolean;
  /** Renders as a button and takes a hue-coloured hover border. */
  interactive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Card(props: CardProps): React.ReactElement;

export interface CardSectionProps {
  children?: React.ReactNode;
  surface?: Surface;
  padding?: 'sm' | 'md' | 'lg' | number;
  divide?: boolean;
  style?: React.CSSProperties;
}

export declare function CardSection(props: CardSectionProps): React.ReactElement;

export interface CardGridProps {
  children?: React.ReactNode;
  /** Minimum column width in px. */
  min?: number;
  gap?: number;
  style?: React.CSSProperties;
}

export declare function CardGrid(props: CardGridProps): React.ReactElement;
