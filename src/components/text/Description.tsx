// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo } from 'react';

import { cn } from '../../context/functions';

/**
 * Description renders a styled description text.
 * @param text - The description text to display
 */
const Description = memo(
  ({ text }: { text: string }): ReactElement => (
    <h2 className={cn('text-md mb-2 font-medium text-gray-300 italic')}>{text}</h2>
  )
);
Description.displayName = 'Description';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Description;
