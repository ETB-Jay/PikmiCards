// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from 'react';

import { cn } from '../../context/functions';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const BASE_TEXT_CLASSES = 'mb-2 text-green-100';

/**
 * Text renders a styled paragraph.
 * @param text - The paragraph text to display
 */
const Text = memo(
  ({ text }: { text: string }): ReactElement => <p className={cn(BASE_TEXT_CLASSES)}>{text}</p>
);
Text.displayName = 'Text';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Text;
