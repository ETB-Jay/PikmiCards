// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';

import { cn } from '../context/functions';

import EmployeeInput from './EmployeeInput';

// ─ Constants ──────────────────────────────────────────────────────────────────────────────────────
const NEW_STRING = "Add New Customer"

interface SelectEmployeeProps {
  confirmedEmployee: string;
  setConfirmedEmployee: (employee: string) => void;
}

/**
 * @description SelectEmployee renders a dropdown and input for selecting or adding an employee.
 */
const SelectEmployee = ({ confirmedEmployee, setConfirmedEmployee }: SelectEmployeeProps): React.ReactElement => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newEmployee, setNewEmployee] = useState<string>('');

  const employees: string[] = JSON.parse(localStorage.employees || '[]');

  const AddNewCustomer = () => {
    setShowInput(true);
    setShowDropdown(false);
  };

  const handleAddEmployee = () => {
    const trimmedInput = newEmployee.trim();
    if (trimmedInput) {
      const currentEmployees = Array.isArray(employees) ? employees : [];
      if (!currentEmployees.includes(trimmedInput)) {
        const updatedEmployees = [...currentEmployees, trimmedInput];
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        setNewEmployee('');
        setShowInput(false);
        setShowDropdown(false);
      }
    }
  };

  const handleCancelAdd = () => {
    setNewEmployee('');
    setShowInput(false);
    setShowDropdown(false);
  };

  const confirmEmployee = (employee: string) => {
    setConfirmedEmployee(employee);
    setShowDropdown(false);
  };

  const addNew = (
    <div
      className={cn("px-4 py-1 text-sm transition-colors border-t cursor-pointer hover:bg-green-smoke-600 border-green-smoke-600/20 last:rounded-b-lg text-green-smoke-100")}
      onClick={() => AddNewCustomer()}
      onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { AddNewCustomer() } }}
      tabIndex={0}
      role="button"
    >
      {NEW_STRING}
    </div >
  );

  const inputField = (showInput ? (
    <EmployeeInput
      newEmployee={newEmployee}
      onEmployeeChange={setNewEmployee}
      onAdd={handleAddEmployee}
      onCancel={handleCancelAdd}
      className={cn("w-full rounded-xl bg-green-smoke-700/70 hover:bg-green-smoke-700/90")}
    />
  ) : (
    <button
      type="button"
      className={cn("flex flex-row items-center justify-between w-full px-4 py-2.5 text-green-smoke-50 transition-all duration-200 bg-green-smoke-700/70 hover:bg-green-smoke-700/90 rounded-xl shadow-sm")}
      onClick={() => setShowDropdown(prev => !prev)}
    >
      <span className={cn("text-sm")}>{confirmedEmployee || 'Select Employee'}</span>
      <ArrowDropDownIcon
        className={cn("transform transition-transform duration-200 text-green-smoke-50", showDropdown && "rotate-180")}
      />
    </button>
  ));

  const removeEmployee = (idx: number) => {
    const currentEmployees = JSON.parse(localStorage.getItem('employees') || '[]')
    currentEmployees.splice(idx, 1);
    localStorage.setItem('employees', JSON.stringify(currentEmployees));
    setConfirmedEmployee("");
    setNewEmployee("");
  }

  return (
    <div className={cn("relative w-full max-w-xs")}>
      {inputField}
      {showDropdown && (
        <div
          className={cn("absolute left-0 z-20 w-full overflow-y-scroll border shadow-lg max-h-20 min-h-0 rounded-xl bg-green-smoke-900/90 border-green-smoke-600/20")}
        >
          {employees.map((employee, idx) => (
            <div
              key={employee}
              className={cn("relative px-4 py-1 text-sm transition-colors cursor-pointer hover:bg-green-smoke-600 first:rounded-t-lg text-green-smoke-50")}
              onClick={() => { confirmEmployee(employee) }}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') { confirmEmployee(employee) }
              }}
              tabIndex={0}
              role="button"
            >
              {employee}
              <div
                className={cn("absolute -translate-y-1/2 cursor-pointer top-1/2 right-2 hover:brightness-75")}
                onClick={() => { removeEmployee(idx) }}
                onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { removeEmployee(idx); } }}
              >
                <DeleteIcon fontSize="small" />
              </div>
            </div>
          ))}
          {addNew}
        </div>
      )}
    </div >
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default SelectEmployee;