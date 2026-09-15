import type * as React from 'react';

export type Accent = 'magenta' | 'pink' | 'coral' | 'orange' | 'lime' | 'green' | 'cyan' | 'cobalt' | 'indigo' | 'violet';
export type Surface = 'black' | 'night' | 'cream';
export type Geometry = 'sharp' | 'notched' | 'pill';

export interface FieldProps {
  /** Tracked label above the control. Also the hue seed when no `id` is given. */
  label?: string;
  /** Right-aligned counterpart to the label, e.g. "optional" or "0/240". */
  hint?: string;
  /** Help text below the control. */
  help?: string;
  /** Replaces `help` and turns the ring and message red. */
  error?: string;
  children?: React.ReactNode;
  id?: string;
  accent?: Accent;
  surface?: Surface;
  geometry?: Geometry;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Field(props: FieldProps): React.ReactElement;

export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  /** Renders a textarea instead of an input. */
  multiline?: boolean;
  rows?: number;
  id?: string;
  accent?: Accent;
  surface?: Surface;
  geometry?: Geometry;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Input(props: InputProps): React.ReactElement;

export interface SelectProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: Array<string | { value: string; label: string }>;
  id?: string;
  accent?: Accent;
  surface?: Surface;
  geometry?: Geometry;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Select(props: SelectProps): React.ReactElement;

export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  accent?: Accent;
  surface?: Surface;
  disabled?: boolean;
  /** Round mark and dot glyph instead of a square and cross. */
  radio?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Checkbox(props: CheckboxProps): React.ReactElement;
