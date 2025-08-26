// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from "react";

import { cn } from "../../context/functions";
import { ChildrenAndClassProps } from "../../interfaces";

/**
 * FlexRow provides a flex row with full width and optional classes.
 * @param children - The child components to render
 * @param className - Additional CSS classes
 */
const FlexRow = memo(
  ({ children, className }: ChildrenAndClassProps): ReactElement => (
    <div className={cn("flex w-full flex-row flex-wrap items-center gap-2", className)}>
      {children}
    </div>
  )
);
FlexRow.displayName = "FlexRow";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default FlexRow;
