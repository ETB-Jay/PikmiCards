// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React, { useEffect } from 'react';

import { Location } from '../../types';

/**
 * Props for the DetermineLocation component.
 * @property location - The current location string.
 * @property setLocation - Function to update the location.
 * @property prompt - Function to toggle the prompt visibility.
 */
interface DetermineLocationProps {
  location: Location;
  setLocation: (location: Location) => void;
  prompt: (active: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

/**
 * LocationOption displays a selectable location option in the dropdown.
 * @param newLocation - The location string for this option.
 * @param currentLocation - The currently selected location.
 * @param onSelect - Function to select this location.
 */
const LocationOption = ({
  newLocation,
  currentLocation,
  onSelect,
}: {
  newLocation: Location;
  currentLocation: Location;
  onSelect: (location: Location) => void;
}) => {
  const handleClick = () => {
    if (currentLocation !== newLocation) {
      onSelect(newLocation);
    }
  };

  return (
    <div
      className="cursor-pointer rounded px-3 transition-colors hover:bg-black/10"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className="BFont text-sm font-semibold text-green-950">{newLocation}</span>
    </div>
  );
};

LocationOption.displayName = 'LocationOption';

/**
 * DetermineLocation renders a dropdown for selecting a location.
 * @param location - The current location string.
 * @param setLocation - Function to update the location.
 * @param prompt - Function to toggle the prompt visibility.
 */
const DetermineLocation = ({
  location,
  setLocation,
  prompt,
  buttonRef,
}: DetermineLocationProps): React.ReactElement => {
  const ref = React.useRef<HTMLDivElement>(null);
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

  const handleLocationSelect = (newLocation: Location) => {
    setLocation(newLocation);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="bg-green-smoke-200 absolute top-10 z-100 flex w-fit flex-col rounded border-1 py-1 text-sm font-semibold shadow-2xl"
    >
      <LocationOption
        newLocation="Oakville"
        currentLocation={location}
        onSelect={handleLocationSelect}
      />
      <LocationOption
        newLocation="Newmarket"
        currentLocation={location}
        onSelect={handleLocationSelect}
      />
    </div>
  );
};

DetermineLocation.displayName = 'DetermineLocation';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default DetermineLocation;
