// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { ReactElement, memo } from 'react';

import { cn } from '../../context/functions';
import { useOrderSelection } from '../../context/useContext';
import Button from '../ui/Button';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const CONFIRM_BUTTON_TEXT = 'Confirm';
const CLEAR_BUTTON_TEXT = 'Clear Items';

/**
 * ConfirmBar displays a fixed confirmation bar at the bottom of the screen when items are selected.
 * It provides Confirm and Clear buttons, showing the number of selected items and allowing the user
 * to confirm their selection or clear it. The bar is only visible when at least one item is selected.
 *
 * @returns The confirmation bar React element, or null if nothing is selected
 */
const ConfirmBar = memo((): ReactElement | null => {
  const { handleConfirm, handleClear, selectedItems } = useOrderSelection();
  if (selectedItems.size === 0) {
    return null;
  }
  return (
    <div
      className={cn(
        'z-30 flex w-screen flex-row justify-center gap-4 rounded-2xl rounded-b-none p-1 shadow-2xl backdrop-blur-md',
        'bg-green-smoke-800/90 border-black-olive-900 border-t',
        'pointer-events-auto fixed bottom-0 left-0 md:bottom-0 md:rounded-b-2xl',
        'transition-all duration-200'
      )}
      style={{ boxShadow: '0 -4px 24px 0 rgba(0,0,0,0.15)' }}
    >
      <div className="flex flex-row items-center gap-4">
        <Button
          icon={
            <div className="flex flex-row items-center justify-center gap-2 text-center">
              <CheckIcon fontSize="small" />
              {selectedItems.size}
            </div>
          }
          onAction={handleConfirm}
          className={cn(
            'w-fit cursor-pointer rounded-full bg-teal-600/50 px-3 text-xs font-medium text-white shadow ring-2 ring-teal-900 transition-all duration-150 hover:bg-teal-700/50 active:bg-teal-800/50'
          )}
          label={CONFIRM_BUTTON_TEXT}
        />
        <Button
          icon={<ClearIcon fontSize="small" />}
          onAction={handleClear}
          className={cn(
            'w-fit cursor-pointer rounded-full bg-red-500/50 px-3 text-xs font-medium text-white shadow ring-2 ring-red-900 transition-all duration-150 hover:bg-red-600/50 active:bg-red-700/50'
          )}
          label={CLEAR_BUTTON_TEXT}
        />
      </div>
    </div>
  );
});
ConfirmBar.displayName = 'ConfirmBar';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ConfirmBar;
