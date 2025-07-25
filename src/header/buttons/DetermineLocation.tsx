// ─ Imports ───────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import PopupOption from "../../components/ui/PopupOption";
import { cn } from "../../context/functions";
import { useStoreLocation } from "../../context/useContext";
import { StoreLocations } from "../../types";

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface DetermineLocationProps {
  prompt: (show: boolean) => void;
  buttonRef: RefObject<HTMLButtonElement>;
}

/**
 * DetermineLocation renders a dropdown for selecting a location.
 * @param prompt - Function to toggle the prompt visibility.
 */
const DetermineLocation = memo(({ prompt, buttonRef }: DetermineLocationProps): ReactElement => {
  const [locationList, setLocationList] = useState<string[]>([]);
  const { storeLocation, setStoreLocation } = useStoreLocation();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem("locations") || "[]");

    // Initialize with default locations if localStorage is empty
    if (storedLocations.length === 0) {
      const defaultLocations = ["ETB Oakville", "ETB Newmarket"];
      localStorage.setItem("locations", JSON.stringify(defaultLocations));
      setLocationList(defaultLocations);
    } else {
      setLocationList(storedLocations);
    }
  }, []);

  const handleLocationSelect = (newLocation: StoreLocations) => {
    setStoreLocation(newLocation);
    navigate(`/pick/${newLocation}`);
    prompt(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      prompt(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const createNewLocation = () => {
    // eslint-disable-next-line no-alert
    const newLocation = window.prompt("Enter new location name:");
    if (newLocation && newLocation.trim()) {
      const trimmedLocation = newLocation.trim();
      const currentLocations = JSON.parse(localStorage.getItem("locations") || "[]");

      // Check if location already exists
      if (currentLocations.includes(trimmedLocation)) {
        // eslint-disable-next-line no-alert
        alert("Location already exists!");
      } else {
        const updatedLocations = [...currentLocations, trimmedLocation];
        localStorage.setItem("locations", JSON.stringify(updatedLocations));
        setLocationList(updatedLocations);

        // Automatically select the new location
        handleLocationSelect(trimmedLocation);
      }
    }
    prompt(false);
  };

  const deleteLocation = (locationToDelete: string) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to delete "${locationToDelete}"?`)) {
      const currentLocations = JSON.parse(localStorage.getItem("locations") || "[]");
      const updatedLocations = currentLocations.filter((loc: string) => loc !== locationToDelete);

      // Ensure we always have at least one location
      if (updatedLocations.length === 0) {
        // eslint-disable-next-line no-alert
        alert("Cannot delete the last location!");
        return;
      }

      localStorage.setItem("locations", JSON.stringify(updatedLocations));
      setLocationList(updatedLocations);

      // If the deleted location was the current one, switch to the first available
      if (storeLocation === locationToDelete) {
        handleLocationSelect(updatedLocations[0]);
      }
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "bg-green-smoke-200 absolute z-10 mt-1 flex w-fit flex-col rounded border-1",
        "py-1 text-sm font-semibold shadow-2xl"
      )}
    >
      {locationList.map((location) => (
        <PopupOption
          key={location}
          label={location}
          current={storeLocation}
          onSelect={handleLocationSelect}
          deletable
          onDelete={deleteLocation}
        />
      ))}
      <PopupOption label="Add Location" current={storeLocation} onSelect={createNewLocation} />
    </div>
  );
});

DetermineLocation.displayName = "DetermineLocation";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default DetermineLocation;
