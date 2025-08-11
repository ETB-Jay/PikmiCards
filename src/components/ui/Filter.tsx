// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import "@mui/icons-material/Star";
import { FormEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import Button from "./Button";
import InputField from "./InputField";
import SelectField from "./SelectField";
import BasicContainer from "../containers/BasicContainer";
import ClosedBoxIcon from "../icons/ClosedBoxIcon";

import type { Filters } from "../../types";

const Filter = memo(({ onChange }: { onChange: (e: Filters) => void }) => {
  const [temp, setTemp] = useState<Filters>({
    boxes: [],
    game: "",
    set: "",
  });
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const gameOptions = useMemo(() => [
    { value: "", label: "All Games" },
    { value: "Magic", label: "MTG" },
    { value: "Pokemon", label: "Pokemon" },
    { value: "One Piece", label: "One Piece" },
    { value: "Flesh And Blood", label: "FaB" },
    { value: "YuGiOh", label: "Yugioh" },
    { value: "Lorcana", label: "Lorcana" },
    { value: "Sorcery: Contested Realm", label: "Sorcery" },
    { value: "Gundam", label: "Gundam" },
  ], []);

  const boxNumbers = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => i + 1), []
  );

  const hasActiveFilters = useMemo(() => {
    return temp.boxes.length > 0 || temp.game !== "" || temp.set !== "";
  }, [temp]);

  const handleShowDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  const handleChange = useCallback(
    (field: keyof Filters, fieldValue: string) => {
      const updatedValue: Filters = {
        ...temp,
        [field]: fieldValue,
      };
      setTemp(updatedValue);
    },
    [temp]
  );

  const handleBoxToggle = useCallback((boxNumber: number) => {
    setTemp(prev => ({
      ...prev,
      boxes: prev.boxes.includes(boxNumber)
        ? prev.boxes.filter(b => b !== boxNumber)
        : [...prev.boxes, boxNumber].sort((a, b) => a - b)
    }));
  }, []);

  const handleSelectAllBoxes = useCallback(() => {
    setTemp(prev => ({
      ...prev,
      boxes: prev.boxes.length === 24 ? [] : boxNumbers
    }));
  }, [boxNumbers]);

  const handleSubmit = useCallback((ev: FormEvent) => {
    ev.preventDefault();
    onChange(temp);
    setShowDropdown(false);
  }, [onChange, temp]);

  const handleClear = useCallback(() => {
    const clearedFilters: Filters = {
      boxes: [],
      game: "",
      set: "",
    };
    setTemp(clearedFilters);
    onChange(clearedFilters);
  }, [onChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div ref={filterRef} className="sticky top-0 left-0 z-10 w-full">
      <BasicContainer
        className={`absolute w-fit py-0 ${hasActiveFilters
          ? "bg-blue-200 ring-blue-400/40"
          : "bg-green-smoke-200"
          }`}
        clickable
        onClick={handleShowDropdown}
      >
        <div className="flex items-center gap-1">
          <FilterListIcon fontSize="small" color="inherit" />
          {hasActiveFilters && (
            <span className="text-xs font-medium">
              {[
                temp.boxes.length > 0 && `${temp.boxes.length} box${temp.boxes.length > 1 ? "es" : ""}`,
                temp.game,
                temp.set
              ].filter(Boolean).length}
            </span>
          )}
        </div>
      </BasicContainer>
      {showDropdown && (
        <BasicContainer
          className="absolute top-6 left-0 z-10 w-96 bg-amber-100 p-3 text-xs ring-amber-400/40"
        >

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium flex items-center gap-1">
                  <ClosedBoxIcon width={16} height={16} stroke="black" />
                  Boxes ({temp.boxes.length} selected)
                </label>
                <button
                  type="button"
                  onClick={handleSelectAllBoxes}
                  className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  {temp.boxes.length === 24 ? "Clear All" : "Select All"}
                </button>
              </div>
              <div className="grid grid-cols-6 gap-1 max-h-32 overflow-y-auto p-1 border border-gray-200 rounded">
                {boxNumbers.map(boxNum => (
                  <button
                    key={boxNum}
                    type="button"
                    onClick={() => handleBoxToggle(boxNum)}
                    className={`p-1 text-xs rounded border transition-colors cursor-pointer ${temp.boxes.includes(boxNum)
                      ? "bg-blue-500 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {boxNum}
                  </button>
                ))}
              </div>
            </div>

            <SelectField
              icon={<SportsEsportsOutlinedIcon fontSize="small" />}
              label="Game"
              type="text"
              value={temp.game}
              onChange={(ev) => handleChange("game", ev.target.value)}
              options={gameOptions}
            />

            <InputField
              icon={<AutoAwesomeMotionIcon fontSize="small" />}
              label="Set Name..."
              type="text"
              value={temp.set}
              onChange={(ev) => handleChange("set", ev.target.value)}
              autoComplete=""
              err=""
            />

            <div className="flex gap-2 pt-2">
              <Button
                icon={<CheckIcon fontSize="small" />}
                label="Apply Filters"
                type="submit"
                onAction={handleSubmit as any}
                className="flex-1"
              />
              <Button
                icon={<ClearIcon fontSize="small" />}
                label="Clear"
                type="button"
                onAction={handleClear}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              />
            </div>
          </form>
        </BasicContainer>
      )}
    </div>
  );
});
Filter.displayName = "Filter";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Filter;
