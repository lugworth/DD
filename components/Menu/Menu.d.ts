import type * as React from 'react';

export type Surface = 'black' | 'night' | 'cream';

export interface MenuItem {
  id: string;
  label: string;
  shortcut?: string;
  icon?: string;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: Array<MenuItem | { header: string } | { divider: true }>;
  align?: 'left' | 'right';
}

export interface PopoverProps {
  trigger: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ComboboxProps {
  options: Array<{ id: string; label: string; tag?: string }>;
  value?: string;
  onChange: (id: string) => void;
  placeholder?: string;
}

export interface TagsInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}
