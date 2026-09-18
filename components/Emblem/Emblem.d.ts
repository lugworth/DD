import type * as React from 'react';

export type EmblemMotif =
  | '0x01'
  | '0x02'
  | '0x03'
  | '0x04'
  | '0x05'
  | '0x06'
  | '0x07'
  | '0x08'
  | '0x09'
  | '0x0A'
  | '0x0B'
  | '0x0C'
  | string;

export type EmblemSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | number;

export type ColorwayKey =
  | 'cyber'
  | 'toxic'
  | 'solar'
  | 'abyss'
  | 'orchid'
  | 'oxblood'
  | 'botanical'
  | 'infrared';

export interface EmblemColors {
  base?: string;
  accent?: string;
  contrast?: string;
  aperture?: string;
}

export interface EmblemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The graphic motif identifier (default: '0x01') */
  motif?: EmblemMotif;
  /** Size token or pixel dimension (default: 'md') */
  size?: EmblemSize;
  /** Monospace code marker e.g. '0x01' */
  code?: string;
  /** Whether to render monospace code badge beneath (default: false) */
  showCode?: boolean;
  /** Backwards compatibility alias for showCode */
  showLabel?: boolean;
  /** Whether to render radial code on outer rim arc (2C) */
  showRimCode?: boolean;
  /** Position layout for code identifier: 'rim' | 'pill' | 'both' | 'none' */
  codeLayout?: 'rim' | 'pill' | 'both' | 'none';
  /** Direction/perimeter position for radial rim stencil (3C: default 'top') */
  rimPosition?: 'top' | 'bottom';
  /** Enables stepped hover rotation and elevation (default: false) */
  interactive?: boolean;
  /** Digidelic technical print registration marks and coordinate ticks (default: true) */
  registrationMarks?: boolean;
  /** Surface color scheme (default: 'black') */
  surface?: 'black' | 'night' | 'cream';
  /** Preset spectral colorway */
  colorway?: ColorwayKey;
  /** Custom color overrides */
  colors?: EmblemColors;
  /** 1A: Enables psychedelic SVG fluid turbulence melt on hover/active (default: false) */
  melt?: boolean;
  /** Alias for melt */
  fluid?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Emblem(props: EmblemProps): React.ReactElement;
export declare const EmblemBadge: typeof Emblem;

export interface EmblemClusterProps {
  /** Array of motifs to render in the cascading stack */
  motifs?: EmblemMotif[];
  /** Layout arrangement: 'fan' (3D overlapping fan array) | 'cascade' | 'orbit' (default: 'fan') */
  layout?: 'fan' | 'cascade' | 'orbit';
  /** Size in pixels of the base/largest emblem */
  size?: number;
  /** Distance between stacked items in pixels */
  spread?: number;
  /** Whether items respond to hover */
  interactive?: boolean;
  /** Digidelic technical print registration marks (default: true) */
  registrationMarks?: boolean;
  /** Code display mode */
  codeLayout?: 'rim' | 'pill' | 'both' | 'none';
  /** Direction/perimeter position for radial rim stencil (default 'top') */
  rimPosition?: 'top' | 'bottom';
  /** Enables fluid turbulence melt */
  melt?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function EmblemCluster(props: EmblemClusterProps): React.ReactElement;

export interface EmblemGridProps {
  motifs?: EmblemMotif[];
  size?: EmblemSize;
  showCodes?: boolean;
  showLabels?: boolean;
  codeLayout?: 'rim' | 'pill' | 'both' | 'none';
  interactive?: boolean;
  registrationMarks?: boolean;
  melt?: boolean;
  onSelect?: (motif: EmblemMotif) => void;
  className?: string;
  style?: React.CSSProperties;
}

export declare function EmblemGrid(props: EmblemGridProps): React.ReactElement;

export interface EmblemMetadata {
  id: string;
  code: string;
  glyph: string;
  base: string;
  accent: string;
  contrast: string;
  aperture: string;
  desc: string;
}

export declare const CANONICAL_CODES: string[];
export declare const EMBLEM_MOTIFS: Record<string, EmblemMetadata>;
export declare const SIZES: Record<string, number>;
export declare const COLORWAYS: Record<string, { name: string; base: string; accent: string; contrast: string; aperture: string }>;
export declare const RAMP_STOPS: Array<{ name: string; hex: string }>;

export declare function renderEmblemSvgString(
  motif?: EmblemMotif,
  options?: {
    size?: number;
    colors?: EmblemColors;
    colorway?: string;
    registrationMarks?: boolean;
    codeLayout?: 'rim' | 'pill' | 'both' | 'none';
    rimPosition?: 'top' | 'bottom';
    code?: string;
    melt?: boolean;
  }
): string;
