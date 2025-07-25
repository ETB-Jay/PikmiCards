// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import { ReactElement } from "react";

import { cn } from "../../context/functions";

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface EmployeeInputProps {
  newEmployee: string;
  onEmployeeChange: (value: string) => void;
  onAdd: () => void;
  onCancel: () => void;
  className?: string;
}

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const BASE_EMPLOYEE_INPUT_CONTAINER_CLASSES = "flex relative flex-row items-center gap-2 px-3 py-1";
const BASE_EMPLOYEE_INPUT_FIELD_CLASSES =
  "bg-green-smoke-800/40 text-green-smoke-50 border-green-smoke-600/20 focus:ring-green-smoke-500/50 w-full rounded-lg border px-3 py-1 text-sm focus:ring-2 focus:outline-none";
const BASE_EMPLOYEE_BUTTON_CLASSES = "text-green-smoke-50 rounded-lg p-0.5 cursor-pointer";
const ADD_BUTTON_CLASSES =
  "bg-green-smoke-600/40 hover:bg-green-smoke-600/60 disabled:cursor-not-allowed disabled:opacity-50";
const CANCEL_BUTTON_CLASSES = "bg-green-smoke-800/40 hover:bg-green-smoke-800/60";

/**
 * EmployeeInput renders an input for adding or editing an employee name.
 * @param newEmployee - Current employee name value
 * @param onEmployeeChange - Function called when employee name changes
 * @param onAdd - Function called when add button is clicked
 * @param onCancel - Function called when cancel button is clicked
 * @param className - Additional CSS classes
 */
const EmployeeInput = ({
  newEmployee,
  onEmployeeChange,
  onAdd,
  onCancel,
  className = "",
}: EmployeeInputProps): ReactElement => {
  const employeePlaceholder = "Employee name";

  return (
    <div className={cn(BASE_EMPLOYEE_INPUT_CONTAINER_CLASSES, className)}>
      <div className={cn("flex-grow")}>
        <label htmlFor="employee-input">
          <span className={cn("sr-only")}>{employeePlaceholder}</span>
          <input
            id="employee-input"
            type="text"
            value={newEmployee}
            onChange={(event) => onEmployeeChange(event.target.value)}
            className={cn(BASE_EMPLOYEE_INPUT_FIELD_CLASSES)}
            placeholder={employeePlaceholder}
            autoComplete="off"
            aria-label={employeePlaceholder}
          />
        </label>
      </div>
      <button
        type="submit"
        onClick={onAdd}
        disabled={!newEmployee.trim()}
        className={cn(BASE_EMPLOYEE_BUTTON_CLASSES, ADD_BUTTON_CLASSES)}
      >
        <AddIcon className={cn("h-5 w-5")} />
      </button>
      <button
        type="reset"
        onClick={onCancel}
        className={cn(BASE_EMPLOYEE_BUTTON_CLASSES, CANCEL_BUTTON_CLASSES)}
      >
        <CancelIcon className={cn("h-5 w-5")} />
      </button>
    </div>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default EmployeeInput;
