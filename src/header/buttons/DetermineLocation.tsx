import { memo, useCallback, useEffect, useRef } from 'react';

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
    location: string;
    setLocation: (location: string) => void;
    prompt: (active: boolean) => void
}

/**
 * LocationOption displays a selectable location option in the dropdown.
 * @param newLocation - The location string for this option.
 * @param currentLocation - The currently selected location.
 * @param onSelect - Function to select this location.
 */
const LocationOption = memo(({ newLocation, currentLocation, onSelect }: {
    newLocation: string;
    currentLocation: string;
    onSelect: (location: string) => void;
}) => {
    const handleClick = useCallback(() => {
        if (currentLocation !== newLocation) {
            onSelect(newLocation);
        }
    }, [currentLocation, newLocation, onSelect]);

    return (
        <div
            className="hover:bg-black/10 rounded px-3 transition-colors cursor-pointer"
            onClick={handleClick}
        >
            <span className={'font-semibold text-green-950 text-sm BFont'}>{newLocation}</span>
        </div>
    );
});

LocationOption.displayName = 'LocationOption';

/**
 * DetermineLocation renders a dropdown for selecting a location.
 * @param location - The current location string.
 * @param setLocation - Function to update the location.
 * @param prompt - Function to toggle the prompt visibility.
 * @returns {JSX.Element}
 */
const DetermineLocation = memo(({ location, setLocation, prompt }: DetermineLocationProps) => {

    const ref = useRef<HTMLDivElement>(null);
    const handleClickOutside = (e: Event) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            prompt(false);
        };
    };

    const handleLocationSelect = useCallback((newLocation: string) => {
        setLocation(newLocation);
    }, [setLocation]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={ref} className={`absolute flex flex-col bg-green-smoke-200 border-1 shadow-2xl py-1 rounded z-100 w-fit text-sm font-semibold top-10`}>
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
});

DetermineLocation.displayName = 'DetermineLocation';

export default DetermineLocation;