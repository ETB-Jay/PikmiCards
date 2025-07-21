// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, MouseEvent, ReactElement, KeyboardEvent, useEffect } from 'react';

import EmployeeInput from './EmployeeInput';
import { cn } from '../../context/functions';
import FlexRow from '../containers/FlexRow';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const NEW_STRING = 'Add New Customer';

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface SelectEmployeeProps {
  confirmedEmployee: string;
  setConfirmedEmployee: (employee: string) => void;
}

// ─ Utility Functions ────────────────────────────────────────────────────────────────────────────
/**
 * Gets the list of employees from LocalStorage.
 * @returns Array of employee names from localStorage, empty array if none found
 */
const getEmployees = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem('employees') || '[]');
  } catch {
    return [];
  }
};

/**
 * SelectEmployee renders a dropdown and input for selecting or adding an employee.
 * @param confirmedEmployee - Currently selected employee name
 * @param setConfirmedEmployee - Function to update the selected employee
 */
const SelectEmployee = ({
  confirmedEmployee,
  setConfirmedEmployee,
}: SelectEmployeeProps): ReactElement => {
  const [employeeList, setEmployeeList] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newEmployee, setNewEmployee] = useState('');

  const updateEmployeeList = () => {
    const listofEmployees = getEmployees();
    setEmployeeList(listofEmployees);
  };

  useEffect(() => {
    updateEmployeeList();
  }, []);

  const handleAddNewClick = () => {
    setShowInput(true);
    setShowDropdown(false);
  };

  const handleAddEmployee = () => {
    const trimmed = newEmployee.trim();
    if (trimmed && !employeeList.includes(trimmed)) {
      const updated = [...employeeList, trimmed];
      localStorage.setItem('employees', JSON.stringify(updated));
      updateEmployeeList();
      setNewEmployee('');
      setShowInput(false);
      setShowDropdown(false);
    }
  };

  const handleCancelAdd = () => {
    setNewEmployee('');
    setShowInput(false);
    setShowDropdown(false);
  };

  const handleConfirmEmployee = (employee: string) => {
    setConfirmedEmployee(employee);
    setShowDropdown(false);
  };

  const handleRemoveEmployee = (
    ev: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>,
    idx: number
  ) => {
    ev.stopPropagation();
    const updated = [...employeeList];
    updated.splice(idx, 1);
    localStorage.setItem('employees', JSON.stringify(updated));
    updateEmployeeList();
    setConfirmedEmployee('');
    setNewEmployee('');
  };

  const employeeInputOrButton = showInput ? (
    <EmployeeInput
      newEmployee={newEmployee}
      onEmployeeChange={setNewEmployee}
      onAdd={handleAddEmployee}
      onCancel={handleCancelAdd}
      className="bg-green-smoke-700/70 hover:bg-green-smoke-700/90 relative w-full rounded-xl"
    />
  ) : (
    <button
      type="button"
      className="text-green-smoke-50 bg-green-smoke-700/70 hover:bg-green-smoke-700/90 flex w-full flex-row items-center justify-between rounded-xl px-3 py-1 shadow-sm transition-all duration-200"
      onClick={() => setShowDropdown((prev) => !prev)}
    >
      <span className="text-sm">{confirmedEmployee || 'Select Employee'}</span>
      <ArrowDropDownIcon
        className={cn(
          'text-green-smoke-50 transform transition-transform duration-200',
          showDropdown && 'rotate-180'
        )}
      />
    </button>
  );

  const Dropdown = (
    <div className="bg-green-smoke-900/90 border-green-smoke-600/20 absolute top-full left-0 z-20 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border shadow-lg">
      {employeeList.map((employee: string, idx: number) => (
        <div
          key={employee}
          className="hover:bg-green-smoke-600 text-green-smoke-50 relative flex cursor-pointer items-center justify-between px-4 py-1 text-sm transition-colors first:rounded-t-lg"
          onClick={() => handleConfirmEmployee(employee)}
          tabIndex={0}
          role="button"
          onKeyDown={(ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              handleConfirmEmployee(employee);
            }
          }}
        >
          <span>{employee}</span>
          <span
            className="absolute top-1/2 right-2 ml-2 -translate-y-1/2 cursor-pointer hover:brightness-75"
            onClick={(ev) => {
              handleRemoveEmployee(ev, idx);
            }}
            tabIndex={0}
            role="button"
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                handleRemoveEmployee(ev, idx);
              }
            }}
          >
            <DeleteIcon fontSize="small" />
          </span>
        </div>
      ))}
      <div
        className="hover:bg-green-smoke-600 border-green-smoke-600/20 text-green-smoke-100 cursor-pointer border-t px-4 py-1 text-sm transition-colors last:rounded-b-lg"
        onClick={handleAddNewClick}
        tabIndex={0}
        role="button"
        onKeyDown={(ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            handleAddNewClick();
          }
        }}
      >
        {NEW_STRING}
      </div>
    </div>
  );

  return (
    <FlexRow className="relative !flex-nowrap gap-2">
      {employeeInputOrButton}
      {showDropdown && Dropdown}
    </FlexRow>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default SelectEmployee;
