import { memo, ReactNode, ChangeEvent } from "react";

import { cn } from "../../context/functions";

interface Option {
  value: string | number;
  label: string;
};

interface SelectFieldProps {
  id?: string;
  name?: string;
  icon?: ReactNode;
  options: Option[];
  value: string | number;
  onChange: (ev: ChangeEvent<HTMLSelectElement>) => void;
  [key: string]: any;
};

const SelectField = memo(
  ({
    id,
    name,
    icon,
    options,
    value,
    onChange
  }: SelectFieldProps) => (
    <div className="relative flex h-full w-full min-w-fit flex-col items-center justify-center">
      <span className={cn("absolute top-1/2 left-2.5 -translate-y-1/2 text-base")}>{icon}</span>
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full rounded-lg border py-1.5 pr-5 pl-10 text-sm text-stone-800 shadow-sm",
          "transition-all placeholder:text-stone-600 focus:ring-2 focus:outline-none sm:pl-10",
          "bg-white/80 border-green-smoke-200 focus:ring-green-smoke-400 cursor-pointer"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
);

SelectField.displayName = "SelectField";

export default SelectField;