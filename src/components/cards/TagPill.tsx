// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactNode, memo } from 'react';

import { cn } from '../../context/functions';
import { ChildrenAndClassProps } from '../../interfaces';

const BASE_TAG_PILL_CLASSES =
  'flex flex-nowrap items-center justify-center gap-1 rounded-2xl px-2 py-0.5 text-center text-xs font-semibold bg-green-900 text-white shadow-sm ring-1 ring-green-950 transition-all duration-200';

/**
 * TagPill renders a pill containing information about something.
 * @param children - The content to display inside the tag pill
 * @param className - Additional CSS classes
 */
const TagPill = memo(
  ({ children, className }: ChildrenAndClassProps): ReactNode => (
    <span className={cn(BASE_TAG_PILL_CLASSES, className)}>{children}</span>
  )
);
TagPill.displayName = 'TagPill';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default TagPill;
