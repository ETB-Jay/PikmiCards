// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from "react";

import { cn } from "../../context/functions";
import { useFullscreen, useConfirm } from "../../context/useContext";
import { ChildrenAndClassProps } from "../../interfaces";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const MODAL_CONTAINER_ARIA_LABEL = "Close Modal";

/**
 * ModalContainer wraps its children in a modal overlay with close handlers.
 * @param children - The child components to render inside the modal
 * @param className - Additional CSS classes for styling
 */
const ModalContainer = memo(({ children, className = "" }: ChildrenAndClassProps): ReactElement => {
  const { closeFullscreen } = useFullscreen();
  const { closeConfirm } = useConfirm();

  const closeAll = () => {
    closeConfirm();
    closeFullscreen();
  };

  return (
    <div
      role="button"
      aria-label={MODAL_CONTAINER_ARIA_LABEL}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "cursor-pointer bg-black/50 backdrop-blur-sm select-none",
        className
      )}
      tabIndex={0}
      onKeyDown={(ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          closeAll();
        }
      }}
      onClick={() => {
        closeAll();
      }}
    >
      <div
        className={cn(
          "bg-green-smoke-600/30 prompt-animate relative z-60",
          "flex flex-col items-center justify-center gap-2",
          "max-h-[90vh] max-w-[80vw] cursor-default",
          "rounded-lg p-4 shadow-2xl",
          className
        )}
        onClick={(ev) => {
          ev.stopPropagation();
        }}
        tabIndex={0}
        role="button"
        onKeyDown={(ev) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.stopPropagation();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
});
ModalContainer.displayName = "Modal Container";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ModalContainer;
