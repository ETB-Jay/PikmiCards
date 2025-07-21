// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { HTMLAttributes, PropsWithChildren, memo } from 'react';

import { cn } from '../../context/functions';

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface BasicContainerProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  clickable?: boolean;
}
// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const BASE_CONTAINER_CLASSES =
  'flex flex-col gap-6 p-5 w-full h-fit rounded-xl transition-all relative bg-green-smoke-500/40 ring-2 ring-green-smoke-900 object-contain';

/** @description GridContainer wraps content in a styled flex column with optional className. */
const BasicContainer = memo(
  ({ children, className, clickable = false, ...rest }: BasicContainerProps) => {
    return (
      <div
        className={cn(
          BASE_CONTAINER_CLASSES,
          clickable &&
            'hover:bg-green-smoke-600/40 active:bg-green-smoke-700/60 cursor-pointer ring-2 ring-green-950 hover:scale-101',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
BasicContainer.displayName = 'BasicContainer';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default BasicContainer;
