// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React from 'react';

import { Location } from '../../types';

/**
 * DetermineLocation dropdown component for selecting a location.
 * Used in the header for location selection.
 *
 * @module DetermineLocation
 */

/**
 * Props for the DetermineLocation component.
 * @property location - The current location string.
 * @property setLocation - Function to update the location.
 * @property prompt - Function to toggle the prompt visibility.
 */
interface DetermineLocationProps {
    location: Location;
    setLocation: (location: Location) => void;
    prompt: (active: boolean) => void
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
    onSelect 
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
          className="hover:bg-black/10 rounded px-3 transition-colors cursor-pointer"
          onClick={handleClick}
          tabIndex={0}
          role="button"
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleClick();
            }
          }}
        >
            <span className="font-semibold text-green-950 text-sm BFont">
                {newLocation}
            </span>
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
    prompt 
}: DetermineLocationProps): React.ReactElement => {

    const ref = React.useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            prompt(false);
        };
    };

    const handleLocationSelect = (newLocation: Location) => {
        setLocation(newLocation);
    };

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={ref} className="absolute flex flex-col bg-green-smoke-200 border-1 shadow-2xl py-1 rounded z-100 w-fit text-sm font-semibold top-10">
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
