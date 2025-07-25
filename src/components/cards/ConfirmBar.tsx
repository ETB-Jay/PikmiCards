// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { ReactElement, memo } from "react";

import { cn } from "../../context/functions";
import { useOrderSelection } from "../../context/useContext";
import FlexRow from "../containers/FlexRow";
import Button from "../ui/Button";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const CONFIRM_BUTTON_TEXT = "Confirm";
const CLEAR_BUTTON_TEXT = "Clear Items";

/**
 * ConfirmBar displays a fixed confirmation bar at the bottom of the screen when items are selected.
 * The bar is only visible when at least one item is selected.
 */
const ConfirmBar = memo((): ReactElement | null => {
  const { handleConfirm, handleClear, selectedItems } = useOrderSelection();
  if (selectedItems.size === 0) { return null; }

  const ConfirmButtonClass = cn(
    "w-fit cursor-pointer rounded-full px-3 text-xs text-white",
    "font-medium shadow ring-2 transition-all duration-150"
  )

  return (
    <FlexRow
      className={cn(
        "z-30 justify-center gap-4 rounded-2xl rounded-b-none p-1",
        "shadow-2xl backdrop-blur-md bg-green-smoke-800/90",
        "fixed bottom-0 left-0 transition-all duration-200"
      )}
    >
      <Button
        icon={
          <div className="flex flex-row items-center justify-center gap-2 text-center">
            <CheckIcon fontSize="small" />
            {selectedItems.size}
          </div>
        }
        onAction={handleConfirm}
        className={cn(
          "bg-teal-600/50 ring-teal-900 hover:bg-teal-700/50 active:bg-teal-800/50",
          ConfirmButtonClass
        )}
        label={CONFIRM_BUTTON_TEXT}
      />
      <Button
        icon={<ClearIcon fontSize="small" />}
        onAction={handleClear}
        className={cn(
          "bg-red-500/50 ring-red-900 hover:bg-red-600/50 active:bg-red-700/50",
          ConfirmButtonClass
        )}
        label={CLEAR_BUTTON_TEXT}
      />
    </FlexRow >
  );
});
ConfirmBar.displayName = "ConfirmBar";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ConfirmBar;
