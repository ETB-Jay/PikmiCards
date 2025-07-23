// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────────
import { ReactNode, Ref, ChangeEvent, MouseEvent } from 'react';

/** ChildrenAndClassProps are props for components with children and optional classes. */
interface ChildrenAndClassProps {
  children: ReactNode;
  className?: string;
}

/** InputProps are props for input components. */
interface InputProps {
  icon: ReactNode;
  label: string;
  type: string;
  value: string | number;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  err: string;
  autoComplete: string;
}

/** ButtonProps are props for button components. */
interface ButtonProps {
  icon: ReactNode;
  label: string;
  onAction: (ev?: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/** PopupProps are props for popup components. */
interface PopupProps {
  label: string;
  current: string;
  onSelect: (val: string) => void;
  deletable?: boolean;
  onDelete?: (val: string) => void;
  deleteTitle?: string;
}

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────
export type { ChildrenAndClassProps, InputProps, ButtonProps, PopupProps };
