import type * as React from 'react';

export type Accent = 'magenta' | 'pink' | 'coral' | 'orange' | 'lime' | 'green' | 'cyan' | 'cobalt' | 'indigo' | 'violet';
export type Surface = 'black' | 'night' | 'cream';
export type Signal = 'live' | 'standby' | 'offline';
export type Geometry = 'sharp' | 'notched' | 'pill';
export type Glitch = 'off' | 'subtle' | 'heavy';

/** Fixed-meaning statuses. Colour here is meaning, so it is never seeded. */
export type NodeStatus = 'nominal' | 'running' | 'scanning' | 'warning' | 'critical' | 'offline';

export interface NodeCardProps {
  /** Node designation, e.g. "NODE-047". Also the hue seed when no `id` is given. */
  name: string;
  /** Monospace code shown top-right, e.g. "[0x2F]". */
  code?: string;
  /** Key/value pairs, rendered as tabular rows. */
  rows?: Array<[string, React.ReactNode]>;
  status?: NodeStatus;
  /** 0..1 — draws a load bar in the status hue below the rows. */
  load?: number;
  id?: string;
  accent?: Accent;
  surface?: Surface;
  signal?: Signal;
  geometry?: Geometry;
  glitch?: Glitch;
  /** Checkerboard trim across the top edge. */
  strip?: boolean;
  interactive?: boolean;
  width?: number | string;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export declare function NodeCard(props: NodeCardProps): React.ReactElement;

export interface SectorCardProps {
  /** Sector designation, e.g. "B3". Also the hue seed. */
  name: string;
  id?: string;
  accent?: Accent;
  /** [status, count] pairs — drives both the bar and the chips. */
  breakdown?: Array<[NodeStatus, number]>;
  surface?: Surface;
  geometry?: Geometry;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export declare function SectorCard(props: SectorCardProps): React.ReactElement;

export interface StatCardProps {
  value: React.ReactNode;
  label: string;
  /** Short line under the label, in the figure's hue. */
  note?: string;
  id?: string;
  accent?: Accent;
  /** Overrides seeded hue with a fixed status colour. */
  status?: NodeStatus;
  surface?: Surface;
  geometry?: Geometry;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export declare function StatCard(props: StatCardProps): React.ReactElement;

export interface NodeMeterProps {
  /** 0..1 */
  value?: number;
  /** Character count of the meter. */
  width?: number;
  surface?: Surface;
  accent?: Accent;
  id?: string;
  style?: React.CSSProperties;
}

export declare function NodeMeter(props: NodeMeterProps): React.ReactElement;
