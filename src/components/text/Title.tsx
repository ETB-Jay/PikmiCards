// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo } from 'react';

import { cn } from '../../context/functions';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const BASE_TITLE_CLASSES =
  'text-center text-3xl font-bold tracking-wider text-purple-100 drop-shadow-md';

/**
 * Title renders a large, bold heading.
 * @param text - The title text to display
 */
const Title = memo(
  ({ text }: { text: string }): ReactElement => <h1 className={cn(BASE_TITLE_CLASSES)}>{text}</h1>
);
Title.displayName = 'Title';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Title;
