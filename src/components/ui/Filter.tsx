// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
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
    boxMin: null,
    boxMax: null,
    game: "",
    set: "",
    rarity: new Set<string>(),
  });
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const gameOptions = useMemo(
    () => [
      { value: "", label: "All Games" },
      { value: "Magic", label: "MTG" },
      { value: "Pokemon", label: "Pokemon" },
      { value: "One Piece", label: "One Piece" },
      { value: "Flesh And Blood", label: "FaB" },
      { value: "YuGiOh", label: "Yugioh" },
      { value: "Lorcana", label: "Lorcana" },
      { value: "Sorcery: Contested Realm", label: "Sorcery" },
      { value: "Gundam", label: "Gundam" },
    ],
    []
  );

  const rarityOptions = useMemo(
    () => [
      { value: "Common", label: "Common" },
      { value: "Uncommon", label: "Uncommon" },
      { value: "Rare", label: "Rare" },
      { value: "Mythic", label: "Mythic" },
    ],
    []
  );

  const hasActiveFilters = useMemo(() => {
    return (
      temp.boxMin !== null ||
      temp.boxMax !== null ||
      temp.game !== "" ||
      temp.set !== "" ||
      temp.rarity.size > 0
    );
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

  const handleRarityChange = useCallback((rarity: string) => {
    setTemp((prev) => {
      const newRaritySet = new Set(prev.rarity);
      if (newRaritySet.has(rarity)) {
        newRaritySet.delete(rarity);
      } else {
        newRaritySet.add(rarity);
      }
      return { ...prev, rarity: newRaritySet };
    });
  }, []);

  const handleBoxMinChange = useCallback((value: string) => {
    const numValue = value === "" ? null : parseInt(value, 10);
    setTemp((prev) => ({
      ...prev,
      boxMin: numValue,
    }));
  }, []);

  const handleBoxMaxChange = useCallback((value: string) => {
    const numValue = value === "" ? null : parseInt(value, 10);
    setTemp((prev) => ({
      ...prev,
      boxMax: numValue,
    }));
  }, []);

  const handleSubmit = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      onChange(temp);
      setShowDropdown(false);
    },
    [onChange, temp]
  );

  const handleClear = useCallback(() => {
    const clearedFilters: Filters = {
      boxMin: null,
      boxMax: null,
      game: "",
      set: "",
      rarity: new Set<string>(),
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
        className={`absolute w-fit py-0 ${
          hasActiveFilters ? "bg-blue-200 ring-blue-400/40" : "bg-green-smoke-200"
        }`}
        clickable
        onClick={handleShowDropdown}
      >
        <div className="flex items-center gap-1">
          <FilterListIcon fontSize="small" color="inherit" />
          {hasActiveFilters && (
            <span className="text-xs font-medium">
              {
                [
                  (temp.boxMin !== null || temp.boxMax !== null) && "boxes",
                  temp.game,
                  temp.set,
                  temp.rarity.size > 0 && `${temp.rarity.size} rarities`,
                ].filter(Boolean).length
              }
            </span>
          )}
        </div>
      </BasicContainer>
      {showDropdown && (
        <BasicContainer className="absolute top-6 left-0 z-10 w-96 bg-amber-100 p-3 text-xs ring-amber-400/40">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-xs font-medium">
                <ClosedBoxIcon width={16} height={16} stroke="black" />
                Box Range
              </div>
              <div className="flex items-center gap-2">
                <InputField
                  icon={<ClosedBoxIcon width={16} height={16} stroke="black" />}
                  label="Min Box"
                  type="number"
                  value={temp.boxMin?.toString() || ""}
                  onChange={(ev) => handleBoxMinChange(ev.target.value)}
                  autoComplete=""
                  err=""
                  min={1}
                  max={24}
                />
                <span className="text-xs text-gray-500">to</span>
                <InputField
                  icon={<ClosedBoxIcon width={16} height={16} stroke="black" />}
                  label="Max Box"
                  type="number"
                  value={temp.boxMax?.toString() || ""}
                  onChange={(ev) => handleBoxMaxChange(ev.target.value)}
                  autoComplete=""
                  err=""
                  min={1}
                  max={24}
                />
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

            <div className="space-y-2">
              <div className="flex items-center gap-1 text-xs font-medium">
                <AutoAwesomeIcon fontSize="small" />
                Rarity
              </div>
              <div className="grid grid-cols-2 gap-2">
                {rarityOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2"
                    htmlFor={`rarity-${option.value}`}
                  >
                    <input
                      id={`rarity-${option.value}`}
                      type="checkbox"
                      checked={temp.rarity.has(option.value)}
                      onChange={() => handleRarityChange(option.value)}
                      className="rounded"
                      aria-label={option.label}
                    />
                    <span className="text-xs">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

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
