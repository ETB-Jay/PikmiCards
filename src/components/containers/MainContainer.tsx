// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, Suspense, lazy } from 'react';

import { cn } from '../../context/functions';
import Header from '../../header/Header';
import { ChildrenAndClassProps } from '../../interfaces';

// Lazy-load the animated background
const LazyBackground = lazy(() => import('../ui/Background'));

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const BASE_MAIN_CONTAINER_CLASSES =
  'relative flex h-full min-h-0 w-full flex-col items-center justify-center gap-3 select-none';

//
interface MainContainerProps extends ChildrenAndClassProps {
  header: boolean;
}

/**
 * MainContainer wraps the app content in a scrollable container with a background.
 * @param children - The child components to render
 * @param className - Additional CSS classes
 */
const MainContainer = memo(
  ({ children, className, header }: MainContainerProps): ReactElement => (
    <>
      <Suspense fallback={<div className="bg-east-bay-950 fixed inset-0 h-full w-full overflow-hidden" style={{ pointerEvents: 'none', zIndex: -1 }} />}>
        <LazyBackground
          particleColors={['#ffffff']}
          particleCount={400}
          particleSpread={20}
          speed={0.01}
          particleBaseSize={100}
        />
      </Suspense>
      <div className={cn(BASE_MAIN_CONTAINER_CLASSES, className)}>
        {header && <Header />}
        {children}
      </div>
    </>
  )
);
MainContainer.displayName = 'MainContainer';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default MainContainer;
