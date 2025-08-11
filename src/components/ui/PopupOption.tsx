// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import ClearIcon from "@mui/icons-material/Clear";
import { memo, ReactNode, MouseEvent } from "react";

import { cn } from "../../context/functions";
import { PopupProps } from "../../interfaces";

/**
 * PopupOption displays a selectable option in a dropdown menu.
 * @param label - The option label text
 * @param current - The currently selected value
 * @param onSelect - Function called when option is selected
 * @param deletable - Whether the option can be deleted
 * @param onDelete - Function called when option is deleted
 * @param deleteTitle - Custom title for the delete button
 */
const PopupOption = memo(
  ({
    label,
    current,
    onSelect,
    deletable = false,
    onDelete,
    deleteTitle,
  }: PopupProps): ReactNode => {
    const handleClick = () => label !== current && onSelect(label);

    const handleDelete = (ev: MouseEvent) => {
      ev.stopPropagation();
      onDelete?.(label);
    };

    return (
      <div
        role="button"
        className={cn(
          "group relative flex w-full min-w-fit cursor-pointer flex-row items-center",
          "justify-center gap-1 rounded px-2 py-0.5 transition-colors text-xs hover:bg-black/10"
        )}
        onClick={handleClick}
        tabIndex={0}
        onKeyDown={(ev) => {
          if (ev.key === "Enter" || ev.key === " ") {
            handleClick();
          }
        }}
      >
        <span className={cn("BFont w-full min-w-fit font-semibold text-nowrap text-green-950")}>
          {label}
        </span>
        {deletable && onDelete && (
          <button
            type="button"
            className={cn(
              "BFont top-1/2 cursor-pointer rounded text-red-600 opacity-0",
              "transition-opacity group-hover:opacity-100 hover:text-red-800"
            )}
            onClick={handleDelete}
            title={deleteTitle}
            aria-label={deleteTitle}
          >
            <ClearIcon fontSize="small" />
          </button>
        )}
      </div>
    );
  }
);
PopupOption.displayName = "PopupOption";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default PopupOption;
