// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { memo, useState } from "react";

import ErrorBox from "./ErrorBox";
import { cn } from "../../context/functions";
import { InputProps } from "../../interfaces";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const BASE_INPUT_CONTAINER_CLASSES =
  "relative flex h-full w-full min-w-fit flex-col items-center justify-center";
const BASE_INPUT_CLASSES =
  "w-full rounded-lg border py-1.5 pr-5 pl-11 text-sm text-stone-800 shadow-sm transition-all" +
  "placeholder:text-stone-600 focus:ring-2 focus:outline-none sm:pl-10";
const ERROR_INPUT_CLASSES = "bg-rose-100/80 border-rose-700 focus:ring-rose-950";
const NORMAL_INPUT_CLASSES = "bg-white/80 border-green-smoke-200 focus:ring-green-smoke-400";

// ─ Styles ────────────────────────────────────────────────────────────────────────────────────────
/**
 * InputField renders a styled input with an icon and optional password visibility toggle.
 * @param icon - Icon element to display in the input
 * @param label - Label text for the input field
 * @param type - Input type (text, password, number, etc.)
 * @param value - Current input value
 * @param onChange - Change handler function
 * @param err - Error message to display
 * @param min - Minimum value for numeric inputs
 * @param max - Maximum value for numeric inputs
 */
const InputField = memo(
  ({
    icon,
    label,
    type,
    value,
    onChange,
    err,
    min,
    max,
  }: InputProps & { min?: number; max?: number }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = (type === "password");
    const inputType = isPassword && showPassword ? "text" : type;
    const passwordIcon = showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />;
    const passwordAriaLabel = showPassword ? "Hide password" : "Show password";

    return (
      <div className={cn(BASE_INPUT_CONTAINER_CLASSES)}>
        <span className={cn("absolute top-1/2 left-2.5 -translate-y-1/2 text-base")}>{icon}</span>
        <input
          id={label.replace(/\s+/g, "-").toLowerCase()}
          className={cn(BASE_INPUT_CLASSES, err ? ERROR_INPUT_CLASSES : NORMAL_INPUT_CLASSES)}
          placeholder={label}
          type={inputType}
          value={value}
          aria-label={label.replace(/\s+/g, "-").toLowerCase()}
          onChange={onChange}
          autoComplete="off"
          min={min}
          max={max}
        />
        <div className="absolute right-3 flex items-center justify-center gap-3">
          {isPassword && (
            <div
              className="cursor-pointer"
              onClick={() => setShowPassword((show) => !show)}
              tabIndex={0}
              role="button"
              aria-label={passwordAriaLabel}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  setShowPassword((show) => !show);
                }
              }}
            >
              {passwordIcon}
            </div>
          )}
          {err && <ErrorBox small className={cn("text-xs")} text={err} />}
        </div>
      </div>
    );
  }
);
InputField.displayName = "InputField";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default InputField;
