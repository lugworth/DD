import type * as React from 'react';

export type Accent = 'magenta' | 'pink' | 'coral' | 'orange' | 'lime' | 'green' | 'cyan' | 'cobalt' | 'indigo' | 'violet';
export type Surface = 'black' | 'night' | 'cream';
export type Geometry = 'sharp' | 'notched' | 'pill';

export interface ProgressProps {
  /** 0..1 */
  value?: number;
  /** Tracked label above the track. Also the hue seed when no `id` is given. */
  label?: string;
  /** Right-aligned figure. Overrides `showValue`. */
  note?: string;
  id?: string;
  accent?: Accent;
  surface?: Surface;
  size?: 'sm' | 'md' | 'lg' | number;
  geometry?: Geometry;
  /** Stepped sweep instead of a measured fill. */
  indeterminate?: boolean;
  showValue?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Progress(props: ProgressProps): React.ReactElement;

export interface ProgressSegmentsProps {
  /** Count of filled segments, not a fraction. */
  value?: number;
  total?: number;
  label?: string;
  id?: string;
  accent?: Accent;
  surface?: Surface;
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
  style?: React.CSSProperties;
}

export declare function ProgressSegments(props: ProgressSegmentsProps): React.ReactElement;

export interface ProgressStackProps {
  /** [name, count, accent?] — accent optional; omitted means seeded from name. */
  parts?: Array<[string, number, Accent?]>;
  label?: string;
  surface?: Surface;
  size?: 'sm' | 'md' | 'lg' | number;
  legend?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function ProgressStack(props: ProgressStackProps): React.ReactElement;

export interface ProgressAsciiProps {
  /** 0..1 */
  value?: number;
  /** Character count of the meter. */
  width?: number;
  label?: string;
  id?: string;
  accent?: Accent;
  surface?: Surface;
  showValue?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function ProgressAscii(props: ProgressAsciiProps): React.ReactElement;

export interface SpinnerProps {
  surface?: Surface;
  accent?: Accent;
  id?: string;
  /** Font size of the glyph in px. */
  size?: number;
  label?: string;
  /** Block-density frames instead of quadrant frames. */
  pulse?: boolean;
  style?: React.CSSProperties;
}

export declare function Spinner(props: SpinnerProps): React.ReactElement;
