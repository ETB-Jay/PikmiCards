import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EmployeeInput from './EmployeeInput';

interface SelectEmployeeProps {
  confirmedEmployee: string;
  setConfirmedEmployee: (employee: string) => void;
}

const SelectEmployee = ({ 
  confirmedEmployee, 
  setConfirmedEmployee 
}: SelectEmployeeProps): React.ReactElement => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newEmployee, setNewEmployee] = useState<string>('');

  const employees: string[] = JSON.parse(localStorage.employees || '[]');

  const handleAddEmployee = () => {
    const trimmedInput = newEmployee.trim();
    if (trimmedInput && !employees.includes(trimmedInput)) {
      const updatedEmployees = [...employees, trimmedInput];
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
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

  const addNewString = "Add New"

  const addNew = (
    <div
      key=""
      className="px-4 py-2.5 border-t cursor-pointer transition-colors hover:bg-green-smoke-600 border-green-smoke-600/20 last:rounded-b-lg text-green-smoke-100 font-medium"
      onClick={() => {
        setShowInput(true);
        setShowDropdown(false);
      }}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          setShowDropdown(false);
          setShowInput(true);
        }
      }}
      tabIndex={0}
      role="button"
    >
      {addNewString}
    </div>
  );

  return (
    <div className="relative w-full max-w-xs">
      {showInput ? (
        <EmployeeInput
          newEmployee={newEmployee}
          onEmployeeChange={setNewEmployee}
          onAdd={handleAddEmployee}
          onCancel={handleCancelAdd}
          className="w-full rounded-xl bg-green-smoke-700/70 hover:bg-green-smoke-700/90"
        />
      ) : (
        <button
          type="button"
          className="flex flex-row items-center justify-between w-full px-4 py-2.5 text-green-smoke-50 transition-all duration-200 bg-green-smoke-700/70 hover:bg-green-smoke-700/90 rounded-xl shadow-sm"
          onClick={() => setShowDropdown(prev => !prev)}
        >
          <span className="text-sm font-medium">
            {confirmedEmployee || 'Select Employee'}
          </span>
          <ArrowDropDownIcon 
            className={`transform transition-transform duration-200 text-green-smoke-50 ${
              showDropdown ? 'rotate-180' : ''
            }`} 
          />
        </button>
      )}
      {showDropdown && (
        <div className="absolute left-0 z-20 w-full mt-2 overflow-y-scroll border shadow-lg max-h-20 min-h0 rounded-xl top-full bg-green-smoke-700/95 backdrop-blur-sm border-green-smoke-600/20">
          {employees.map(employee => (
            <div
              key={employee}
              className="px-4 py-2.5 cursor-pointer transition-colors hover:bg-green-smoke-600 first:rounded-t-lg text-green-smoke-50"
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