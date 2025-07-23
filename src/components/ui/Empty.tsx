// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from 'react';

import { cn } from '../../context/functions';
import OpenBoxIcon from '../icons/OpenBoxIcon';

/**
 * Empty renders a styled visual for when something is empty.
 * @param text - The text to display in the empty state
 */
const Empty = memo(
  ({ text }: { text: string }): ReactElement => (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center rounded-2xl bg-green-50/10 p-5 text-center text-lg'
      )}
    >
      <OpenBoxIcon className="mx-auto mb-2 h-8 w-8 text-white" />
      <span className="BFont text-white">{text}</span>
    </div>
  )
);
Empty.displayName = 'Empty';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Empty;
