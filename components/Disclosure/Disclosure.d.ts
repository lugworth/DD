import type * as React from 'react';

export type Surface = 'black' | 'night' | 'cream';

export interface AccordionItem {
  id: string;
  title: string;
  badge?: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
}

export interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accent?: string;
}

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: string;
}

export interface TreeViewProps {
  data: TreeNode[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: number | string;
}
