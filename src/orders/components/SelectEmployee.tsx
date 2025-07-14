import { useState } from "react";
import BadgeIcon from '@mui/icons-material/Badge';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

import { Button, InputField } from "../../components/formComponents";

const SelectEmployee = (): React.ReactElement => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newEmployee, setNewEmployee] = useState<string>('');
  const [confirmedEmployee, setConfirmedEmployee] = useState<string>('');

  const addNewString = "add new employee";
  const employees: string[] = JSON.parse(localStorage.employees || '[]')

  const addNew = (
    showInput ?
      <div className="flex flex-row items-center gap-2 px-3 py-2 border-t border-green-smoke-600 bg-green-smoke-600/40">
        <InputField
          icon={<BadgeIcon />}
          label="Employee Name"
          type="text"
          value={newEmployee}
          onChange={(val) => setNewEmployee(val.target.value)}
          err=""
        />
        <Button
          icon={<AddIcon />}
          label=""
          onClick={() => {
            const trimmedInput = newEmployee.trim();
            if (trimmedInput && !employees.includes(trimmedInput)) {
              const updatedEmployees = [...employees, trimmedInput];
              localStorage.setItem('employees', JSON.stringify(updatedEmployees));
              setNewEmployee('');
              setShowInput(false);
            }
          }}
        />
        <Button
          icon={<CancelIcon />}
          label=""
          onClick={() => {
            setNewEmployee('');
            setShowInput(false);
          }}
        />
      </div>
      :
      <div
        key=''
        className="px-4 py-2 hover:bg-green-smoke-600 cursor-pointer border-t border-green-smoke-600 last:rounded-b-lg"
        onClick={() => {
          setShowInput(true);
        }}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            setShowInput(true);
          }
        }}
        tabIndex={0}
        role="button"
      >
        {addNewString}
      </div>
  )

  return (
    <div className="relative flex flex-row text-white bg-green-smoke-700/70 hover:bg-green-smoke-700/90 cursor-pointer py-1 px-3 rounded-2xl min-w-1/2 w-full max-w-xs">
      <button
        type="button"
        className="flex flex-row justify-between w-full items-center"
        onClick={() => setShowDropdown(prev => !prev)}
      >
        <span>{confirmedEmployee || 'select'}</span>
        <ArrowDropDownIcon />
      </button>
      {showDropdown && (
        <div className="absolute left-0 top-full mt-1 w-full bg-green-smoke-700 rounded-lg shadow-lg z-20 min-w-full">
          {employees.map(employee => (
            <div
              key={employee}
              className="py-1 px-3 hover:bg-green-smoke-600 cursor-pointer first:rounded-t-lg"
              onClick={() => {
                setConfirmedEmployee(employee);
                setShowDropdown(false);
              }}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                  setConfirmedEmployee(employee);
                  setShowDropdown(false);
                }
              }}
              tabIndex={0}
              role="button"
            >
              {employee}
            </div>
          ))}
          {addNew}
        </div>
      )}
    </div>

  );
};

export default SelectEmployee;