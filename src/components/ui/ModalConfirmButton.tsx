// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, ReactNode, memo } from "react";

import Button from "./Button";
import { cn } from "../../context/functions";

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface ModalConfirmButtonProps {
  onAction: () => void;
  icon: ReactNode;
  label: string;
  color: "green" | "gray";
  disabled?: boolean;
}

/** ModalConfirmButton displays a button for modal confirmations with disabled state support. */
const ModalConfirmButton = memo(
  ({ onAction, icon, label, color, disabled }: ModalConfirmButtonProps): ReactElement => (
    <Button
      className={cn(
        "flex min-w-25 items-center gap-2 rounded px-4 py-2 font-semibold transition",
        disabled
          ? "cursor-not-allowed bg-gray-500 text-gray-300 opacity-50"
          : color === "green"
            ? "bg-green-700 text-white shadow hover:bg-green-800"
            : "bg-gray-300 text-gray-800 shadow hover:bg-gray-400"
      )}
      onAction={onAction}
      type="button"
      icon={icon}
      label={label}
      disabled={disabled}
    />
  )
);

ModalConfirmButton.displayName = "ModalConfirmButton";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ModalConfirmButton;
