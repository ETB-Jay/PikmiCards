// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useRef } from 'react';

import { Location } from '../../types';


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
  const ref = useRef<HTMLDivElement>(null);

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
