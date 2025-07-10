// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────────
import { MouseEventHandler, Ref } from 'react';

/**
 * @description Props for components with children and optional classes
 * @param children - The content to render inside the column
 * @param className - Optional CSS classes
 */
interface ChildrenAndClassProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * @description Props for input components
 * @param icon
 * @param label
 * @param type
 * @param value
 * @param onChange
 * @param err
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
 * @description Button Props
 * @param icon
 * @param label
 * @param onClick
 * @param className
 * @param ref
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
 * @description PopupProps
 * @param label - The new value
 * @param current - The currently active value
 * @param onSelect - Function to Select
 */
interface PopupProps {
  label: string;
  current: string;
  onSelect: (val: string) => void;
}

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────
export type { ChildrenAndClassProps, InputProps, ButtonProps, PopupProps };
