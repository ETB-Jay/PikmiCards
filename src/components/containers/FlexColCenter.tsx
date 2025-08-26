// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from "react";

import { cn } from "../../context/functions";
import { ChildrenAndClassProps } from "../../interfaces";

/**
 * FlexColCenter provides a flex column with centered alignment for its children.
 * @param children - The child components to render
 * @param className - Additional CSS classes
 */
const FlexColCenter = memo(
  ({ children, className }: ChildrenAndClassProps): ReactElement => (
    <div
      className={cn("relative flex h-full w-full flex-col items-center justify-center", className)}
    >
      {children}
    </div>
  )
);
FlexColCenter.displayName = "FlexColCenter";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default FlexColCenter;
