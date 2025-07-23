// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import ClearIcon from '@mui/icons-material/Clear';
import { memo, ReactNode } from 'react';

import { cn } from '../../context/functions';
import { PopupProps } from '../../interfaces';

/**
 * PopupOption displays a selectable option in a dropdown menu.
 * @param label - The option label text
 * @param current - The currently selected value
 * @param onSelect - Function called when option is selected
 * @param deletable - Whether the option can be deleted
 * @param onDelete - Function called when option is deleted
 * @param deleteTitle - Custom title for the delete button
 */
const PopupOption = memo(({ label, current, onSelect, deletable = false, onDelete, deleteTitle }: PopupProps): ReactNode => {
  const handleClick = () => label !== current && onSelect(label);

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete?.(label);
  };

  return (
    <div
      role="button"
      className={cn('cursor-pointer rounded px-2 py-0.5 transition-colors hover:bg-black/10 min-w-fit w-full flex flex-row items-center justify-center group relative gap-1')}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className={cn('BFont text-xs text-nowrap font-semibold text-green-950 w-full min-w-fit')}>{label}</span>
      {deletable && onDelete && (
        <button
          type="button"
          className={cn('top-1/2 BFont text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity text-xs rounded cursor-pointer')}
          onClick={handleDelete}
          title={deleteTitle}
          aria-label={deleteTitle}
        >
          <ClearIcon fontSize='small' />
        </button>
      )}
    </div>
  );
});
PopupOption.displayName = 'PopupOption';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default PopupOption;
