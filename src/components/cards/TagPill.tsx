// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactNode, memo } from "react";

import { cn } from "../../context/functions";
import { ChildrenAndClassProps } from "../../interfaces";

/**
 * TagPill renders a pill containing information about something.
 * @param children - The content to display inside the tag pill
 * @param className - Additional CSS classes
 */
const TagPill = memo(
  ({ children, className }: ChildrenAndClassProps): ReactNode => (
    <span
      className={cn(
        `flex flex-nowrap gap-1 rounded-2xl bg-green-900 px-2 py-0.5 text-xs font-semibold text-white shadow-sm ring-2 ring-green-950 duration-200`,
        className
      )}
    >
      {children}
    </span>
  )
);
TagPill.displayName = "TagPill";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default TagPill;
