import { memo, useCallback } from "react";
import { ModalContainer } from "../components";

interface DetermineLocationProps {
    location: string;
    setLocation: (location: string) => void;
}

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
            <span>{newLocation}</span>
        </div>
    );
});

LocationOption.displayName = "LocationOption";

const DetermineLocation = memo(({ location, setLocation }: DetermineLocationProps) => {
    const handleLocationSelect = useCallback((newLocation: string) => {
        setLocation(newLocation);
    }, [setLocation]);

    return (
        <ModalContainer position="mt-1 w-fit text-sm font-semibold p-0">
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
        </ModalContainer>
    );
});

DetermineLocation.displayName = "DetermineLocation";

export default DetermineLocation;
