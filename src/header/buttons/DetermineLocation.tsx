import { memo, useCallback, useEffect, useRef } from 'react';

interface DetermineLocationProps {
    location: string;
    setLocation: (location: string) => void;
    prompt: (active: boolean) => void
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
            <span className={'font-semibold text-green-950 text-sm BFont'}>{newLocation}</span>
        </div>
    );
});

LocationOption.displayName = 'LocationOption';

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
        <div ref={ref} className={`absolute flex flex-col bg-green-smoke-200 border-1 shadow-2xl py-1 rounded z-100 w-fit text-sm font-semibold top-14`}>
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