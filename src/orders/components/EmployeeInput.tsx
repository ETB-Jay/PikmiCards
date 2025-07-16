import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

import { cn } from '../../context/functions';

interface EmployeeInputProps {
  newEmployee: string;
  onEmployeeChange: (value: string) => void;
  onAdd: () => void;
  onCancel: () => void;
  className?: string;
}

/**
 * @description EmployeeInput renders an input for adding or editing an employee name.
 */
const EmployeeInput = ({
  newEmployee,
  onEmployeeChange,
  onAdd,
  onCancel,
  className = ''
}: EmployeeInputProps): React.ReactElement => {
  const employeePlaceholder = "Employee name";

  return (
    <div className={cn("flex flex-row items-center gap-2 px-2 py-1.5", className)}>
      <div className={cn("flex-grow")}>
        <label htmlFor="employee-input">
          <span className={cn("sr-only")}>{employeePlaceholder}</span>
          <input
            id="employee-input"
            type="text"
            value={newEmployee}
            onChange={(event) => onEmployeeChange(event.target.value)}
            className={cn("w-full px-3 py-1.5 text-sm bg-green-smoke-800/40 text-green-smoke-50 rounded-lg border border-green-smoke-600/20 focus:outline-none focus:ring-2 focus:ring-green-smoke-500/50")}
            placeholder={employeePlaceholder}
            autoComplete="off"
            aria-label={employeePlaceholder}
          />
        </label>
      </div>
      <button
        type='submit'
        onClick={onAdd}
        disabled={!newEmployee.trim()}
        className={cn("p-1.5 text-green-smoke-50 bg-green-smoke-600/40 hover:bg-green-smoke-600/60 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer")}
      >
        <AddIcon className={cn("w-5 h-5")} />
      </button>
      <button
        type='reset'
        onClick={onCancel}
        className={cn("p-1.5 text-green-smoke-50 bg-green-smoke-800/40 hover:bg-green-smoke-800/60 rounded-lg cursor-pointer")}
      >
        <CancelIcon className={cn("w-5 h-5")} />
      </button>
    </div>
  );
};

export default EmployeeInput;