import type * as React from 'react';

export type Surface = 'black' | 'night' | 'cream';
export type Accent = 'magenta' | 'pink' | 'coral' | 'orange' | 'lime' | 'green' | 'cyan' | 'cobalt' | 'indigo' | 'violet';

export interface TopBarProps {
  brand?: React.ReactNode;
  children?: React.ReactNode;
  statusText?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  surface?: Surface;
  style?: React.CSSProperties;
}

export interface NavItemProps {
  label: string;
  code?: string;
  active?: boolean;
  onClick?: () => void;
  glitch?: boolean;
}

export interface TabsProps {
  items: Array<{ id: string; label: string; count?: number | string }>;
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'pill' | 'underline' | 'bracket';
  accent?: Accent;
}

export interface BreadcrumbProps {
  items: Array<{ id: string; label: string; href?: string }>;
  separator?: '/' | '▶' | '::';
  onSelect?: (id: string) => void;
}

export interface StepperProps {
  steps: Array<{ id: string; label: string; desc?: string }>;
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
}
