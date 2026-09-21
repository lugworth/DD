import * as React from 'react';

export interface WaterfallSpectrogramProps {
  width?: number;
  height?: number;
  bins?: number;
  speed?: number;
  gain?: number;
  freeze?: boolean;
  preset?: 'pulsar' | 'carrier_sweep' | 'harmonic' | 'cosmic';
  accent?: string;
  title?: string;
  subtitle?: string;
  surface?: 'black' | 'night' | 'cream';
}

export declare const WaterfallSpectrogram: React.FC<WaterfallSpectrogramProps>;

export interface CosmoRadarMetric {
  key: string;
  label: string;
  value: number;
  hex?: string;
}

export interface CosmoRadarProps {
  size?: number;
  metrics?: CosmoRadarMetric[];
  secondaryMetrics?: CosmoRadarMetric[] | null;
  accent?: string;
  secondaryAccent?: string;
  title?: string;
  showTrajectory?: boolean;
  surface?: 'black' | 'night' | 'cream';
}

export declare const CosmoRadar: React.FC<CosmoRadarProps>;

export interface BraidedHorizonProps {
  width?: number;
  height?: number;
  pointsCount?: number;
  accentA?: string;
  accentB?: string;
  threshold?: number;
  title?: string;
  glitchActive?: boolean;
  surface?: 'black' | 'night' | 'cream';
}

export declare const BraidedHorizon: React.FC<BraidedHorizonProps>;

export interface SectorPartition {
  code: string;
  label: string;
  bytes: string;
  value: number;
  accent: string;
  texture?: 'none' | 'stripe' | 'dot' | 'scan' | 'checker';
}

export interface SectorTreemapProps {
  width?: number;
  height?: number;
  sectors?: SectorPartition[];
  onSectorSelect?: (sector: SectorPartition) => void;
  title?: string;
  surface?: 'black' | 'night' | 'cream';
}

export declare const SectorTreemap: React.FC<SectorTreemapProps>;

export interface FluxNode {
  id: string;
  label: string;
  color: string;
}

export interface FluxLink {
  source: string;
  target: string;
  bandwidth: number;
  status: 'ok' | 'warn' | 'err';
}

export interface SignalFluxChordProps {
  size?: number;
  nodes?: FluxNode[];
  links?: FluxLink[];
  title?: string;
  surface?: 'black' | 'night' | 'cream';
}

export declare const SignalFluxChord: React.FC<SignalFluxChordProps>;

export interface AsciiSparklineProps {
  values?: number[];
  mode?: 'blocks' | 'braille';
  accent?: string;
  label?: string | null;
  showMinMax?: boolean;
}

export declare const AsciiSparkline: React.FC<AsciiSparklineProps>;

export interface RadialTachometerProps {
  value?: number;
  max?: number;
  size?: number;
  unit?: string;
  label?: string;
  accent?: string;
  dangerThreshold?: number;
  surface?: 'black' | 'night' | 'cream';
}

export declare const RadialTachometer: React.FC<RadialTachometerProps>;
