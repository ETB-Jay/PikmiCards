// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, Suspense, lazy } from "react";

import { cn } from "../../context/functions";
import Header from "../../header/Header";
import { ChildrenAndClassProps } from "../../interfaces";

// Lazy-load the animated background
const LazyBackground = lazy(() => import("../ui/Background"));

// ─ Interfaces ────────────────────────────────────────────────────────────────────────────────────
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
      <Suspense fallback={<div className="bg-east-bay-950 fixed inset-0 -z-1" />}>
        <LazyBackground
          particleColors={["#ffffff"]}
          particleCount={400}
          particleSpread={20}
          speed={0.01}
          particleBaseSize={100}
        />
      </Suspense>
      <div
        className={cn(
          "relative flex h-full w-full flex-col items-center justify-center gap-3 select-none",
          className
        )}
      >
        {header && <Header />}
        {children}
      </div>
    </>
  )
);
MainContainer.displayName = "MainContainer";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default MainContainer;
