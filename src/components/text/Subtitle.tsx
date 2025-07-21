// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo } from 'react';

import { cn } from '../../context/functions';

/**
 * @description Subtitle renders a medium, bold subheading.
 * @param text - The subtitle text to display
 */
const Subtitle = memo(
  ({ text }: { text: string }): ReactElement => (
    <h2 className={cn('mb-1 text-center text-2xl font-bold text-green-200')}>{text}</h2>
  )
);
Subtitle.displayName = 'Subtitle';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Subtitle;
