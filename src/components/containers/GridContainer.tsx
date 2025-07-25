// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from "react";

import { cn } from "../../context/functions";
import { ChildrenAndClassProps } from "../../interfaces";

/** GridContainer wraps content in a styled flex column with optional className. */
const GridContainer = memo(({ children, className }: ChildrenAndClassProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center rounded-2xl bg-white/20 p-1 w-full h-full",
      className)}
  >
    {children}
  </div>
));
GridContainer.displayName = "BasicContainer";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default GridContainer;
