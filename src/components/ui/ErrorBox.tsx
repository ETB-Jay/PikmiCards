// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import WarningIcon from "@mui/icons-material/Warning";
import { memo, useState } from "react";

import { cn } from "../../context/functions";

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface ErrorBoxProps {
  text: string;
  className?: string;
  small?: boolean;
}

// ─ Constants ──────────────────────────────────────────────────────────────────────────────────────
const Warning = memo(() => <WarningIcon fontSize="small" color="error" />);
Warning.displayName = "Warning";

const BASE_ERROR_BOX_CLASSES =
  "animate-shake rounded-lg bg-red-800/40 px-3 py-2 text-center text-xs font-semibold text-red-100 ring-2 ring-red-950 flex items-center gap-2";

/**
 * ErrorBox provides a styled box for error or info messages.
 * @param children - The error message content to display
 * @param className - Additional CSS classes
 * @param small - If true, only show the icon and display children in a tooltip on hover
 */
const ErrorBox = memo(({ text, className, small }: ErrorBoxProps) => {
  const [show, setShow] = useState(false);

  if (small) {
    return (
      <div
        className={cn("relative flex items-center justify-center", className)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        tabIndex={0}
        role="button"
        style={{ outline: "none" }}
      >
        <Warning />
        {show && (
          <div className="animate-fade-in absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 rounded border border-red-900 bg-red-800/90 px-2 py-1 text-xs whitespace-nowrap text-red-100 shadow-lg">
            {text}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(BASE_ERROR_BOX_CLASSES, className)}>
      <Warning />
      <span>{text}</span>
    </div>
  );
});
ErrorBox.displayName = "ErrorBox";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ErrorBox;
