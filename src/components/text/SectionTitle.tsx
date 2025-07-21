// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, ReactNode, memo } from 'react';

import { cn } from '../../context/functions';

/**
 * @description SectionTitle renders a visually distinct section heading.
 * @param children - The content to display in the section title
 * @param className - Additional CSS classes
 */
const SectionTitle = memo(
  ({ children }: { children: ReactNode }): ReactElement => (
    <h2 className={cn('text-sm font-semibold text-white')}>{children}</h2>
  )
);
SectionTitle.displayName = 'SectionTitle';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default SectionTitle;
