// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactNode, memo } from "react";

import { cn } from "../../context/functions";
import { ButtonProps } from "../../interfaces";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const BASE_BUTTON_CLASSES = "focus:ring-green-smoke-800 BFont flex items-center " +
  "justify-center rounded-xl px-2 py-1 font-semibold text-white shadow-md transition-all" +
  "focus:ring-2 focus:ring-offset-2 focus:outline-none duration-200";
const DISABLED_BUTTON_CLASSES = "cursor-not-allowed bg-gray-400";
const ENABLED_BUTTON_CLASSES =
  "bg-green-smoke-600 hover:bg-green-smoke-700 active:bg-green-smoke-800 cursor-pointer";

/**
 * Button renders a styled button with icon and label support.
 * @param icon - Optional icon element to display
 * @param label - Button label text
 * @param onClick - Click handler function
 * @param className - Additional CSS classes
 * @param disabled - Whether the button is disabled
 * @param ref - Button reference
 * @param type - Button type (button, submit, reset)
 */
const Button = memo(
  ({
    icon,
    label,
    onAction,
    className = "",
    disabled,
    ref,
    type = "button",
  }: ButtonProps): ReactNode => {
    return (
      <button
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={cn(
          disabled ? DISABLED_BUTTON_CLASSES : ENABLED_BUTTON_CLASSES,
          BASE_BUTTON_CLASSES,
          className
        )}
        onClick={onAction}
        disabled={disabled}
        onKeyDown={(ev) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            onAction();
          }
        }}
        aria-label={label}
      >
        <span className="flex flex-row justify-center items-center gap-2 px-1 sm:p-0">
          {icon && icon}
          {label && <span className="hidden text-xs font-semibold sm:block">{label}</span>}
        </span>
      </button>
    );
  }
);
Button.displayName = "Button";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Button;
