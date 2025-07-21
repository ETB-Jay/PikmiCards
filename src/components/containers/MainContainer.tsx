// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from 'react';

import { cn } from '../../context/functions';
import { ChildrenAndClassProps } from '../../interfaces';
import Background from '../ui/Background';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const BASE_MAIN_CONTAINER_CLASSES =
  'relative flex h-full min-h-0 w-full flex-col items-center justify-center gap-3 px-5 select-none';

/**
 * MainContainer wraps the app content in a scrollable container with a background.
 * @param children - The child components to render
 * @param className - Additional CSS classes
 */
const MainContainer = memo(
  ({ children, className }: ChildrenAndClassProps): ReactElement => (
    <>
      <Background
        particleColors={['#ffffff']}
        particleCount={200}
        particleSpread={20}
        speed={0.01}
        particleBaseSize={100}
      />
      <div className={cn(BASE_MAIN_CONTAINER_CLASSES, className)}>{children}</div>
    </>
  )
);
MainContainer.displayName = 'MainContainer';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default MainContainer;
