import type * as React from 'react';

export type Surface = 'black' | 'night' | 'cream';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
}

export interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  selectedId?: string;
  keyField?: string;
}

export interface MetricTileProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  deltaType?: 'pos' | 'neg' | 'neutral';
  accent?: string;
  sparkline?: number[];
}

export interface KeyValueListProps {
  items: Array<{ key: string; value: string | number; badge?: string }>;
}

export interface AvatarProps {
  initials: string;
  status?: 'online' | 'busy' | 'offline';
  size?: 'sm' | 'md' | 'lg';
  accent?: string;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: string;
}
