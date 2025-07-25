// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from "react";

import { cn } from "../../context/functions";
import { ChildrenAndClassProps } from "../../interfaces";

/**
 * ScrollContainer wraps its children in a scrollable container.
 * @param children - The child components to render
 * @param className - Additional CSS classes
 */
const ScrollContainer = memo(
  ({ children, className }: ChildrenAndClassProps): ReactElement => (
    <div
      className={cn(
        "flex h-full w-full flex-col gap-2 overflow-auto rounded-lg",
        className)}
    >
      {children}
    </div>
  )
);
ScrollContainer.displayName = "ScrollContainer";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ScrollContainer;
