import type * as React from 'react';

export type Surface = 'black' | 'night' | 'cream';
export type ToastStatus = 'ok' | 'warn' | 'err' | 'info';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: { label: string; onClick: () => void; variant?: 'primary' | 'danger' };
  secondaryAction?: { label: string; onClick: () => void };
  accentColor?: string;
}

export interface ToastProps {
  id: string;
  status: ToastStatus;
  title: string;
  message?: string;
  onDismiss?: (id: string) => void;
}

export interface TooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement;
  accent?: string;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: Array<{ id: string; category: string; label: string; shortcut?: string; onSelect: () => void }>;
}
