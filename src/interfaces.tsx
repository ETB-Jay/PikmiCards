// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────────
import { MouseEventHandler, Ref } from 'react';

/**
 * @description ChildrenAndClassProps are props for components with children and optional classes.
 */
interface ChildrenAndClassProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * @description InputProps are props for input components.
 */
interface InputProps {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  err: string;
}

/**
 * @description ButtonProps are props for button components.
 */
interface ButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: MouseEventHandler;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * @description PopupProps are props for popup components.
 */
interface PopupProps {
  label: string;
  current: string;
  onSelect: (val: string) => void;
}

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────
export type { ChildrenAndClassProps, InputProps, ButtonProps, PopupProps };
