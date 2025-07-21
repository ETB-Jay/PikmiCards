// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactNode } from 'react';

import { cn } from '../../context/functions';
import { PopupProps } from '../../interfaces';

/**
 * PopupOption displays a selectable option in a dropdown menu.
 * @param label - The option label text
 * @param current - The currently selected value
 * @param onSelect - Function called when option is selected
 */
const PopupOption = memo(({ label, current, onSelect }: PopupProps): ReactNode => {
  const handleClick = () => label !== current && onSelect(label);

  return (
    <div
      role="button"
      className={cn('cursor-pointer rounded px-3 transition-colors hover:bg-black/10')}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className={cn('BFont text-sm font-semibold text-green-950')}>{label}</span>
    </div>
  );
});
PopupOption.displayName = 'PopupOption';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default PopupOption;
