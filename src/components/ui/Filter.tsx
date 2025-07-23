// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import CheckIcon from '@mui/icons-material/Check';
import FilterListIcon from '@mui/icons-material/FilterList';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import { FormEvent, memo, useCallback, useState } from "react";

import Button from "./Button";
import InputField from "./InputField";
import BasicContainer from "../containers/BasicContainer";
import ClosedBoxIcon from "../icons/ClosedBoxIcon";

import type { Filters } from '../../types';

const Filter = memo(({ onChange }: { onChange: (e: Filters) => void; }) => {
  const [temp, setTemp] = useState<Filters>({
    box: 0,
    game: "",
    set: ""
  });
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleShowDropdown = useCallback(() => {
    setShowDropdown(prev => !prev);
  }, []);

  const handleChange = useCallback(
    (field: keyof Filters, fieldValue: string) => {
      const updatedValue: Filters = {
        ...temp,
        [field]: field === "box" ? parseInt(fieldValue, 10) || 0 : fieldValue,
      };
      if (field === "box" && updatedValue.box > 24) {
        updatedValue.box = 24;
      }
      setTemp(updatedValue);
    },
    [temp]
  );

  const handleSubmit = useCallback((ev: FormEvent) => {
    ev.preventDefault();
    onChange(temp);
    setShowDropdown(false);
  }, [onChange, temp]);

  return (
    <div className="sticky z-10 top-0 left-0 w-full">
      <BasicContainer className="absolute w-fit py-0 bg-green-smoke-200" clickable onClick={handleShowDropdown}>
        <FilterListIcon fontSize="small" color="inherit" />
      </BasicContainer>
      {showDropdown && (
        <BasicContainer className="absolute top-6 left-0 bg-amber-100 p-2 ring-amber-400/40 text-xs z-10 w-fit">
          <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <InputField
              icon={<ClosedBoxIcon width={20} height={20} stroke="black" />}
              label="Box Number..."
              type="number"
              value={temp.box}
              onChange={ev => handleChange("box", ev.target.value)}
              autoComplete=""
              err=""
              max={24}
              min={1}
            />
            <InputField
              icon={<SportsEsportsOutlinedIcon />}
              label="Game"
              type="text"
              value={temp.game}
              onChange={ev => handleChange("game", ev.target.value)}
              autoComplete=""
              err=""
            />
            <InputField
              icon={<AutoAwesomeMotionIcon />}
              label="Set"
              type="text"
              value={temp.set}
              onChange={ev => handleChange("set", ev.target.value)}
              autoComplete=""
              err=""
            />
            <Button
              icon={<CheckIcon />}
              label='Submit'
              type='submit'
              onAction={handleSubmit as any}
            />
          </form>
        </BasicContainer>
      )}
    </div>
  );
});
Filter.displayName = "Filter";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Filter;
