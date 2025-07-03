import DetermineLocation from './DetermineLocation';
import { Button } from '../../components/modal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { memo, useCallback, useState } from 'react';

/**
 * LocationButton component for selecting the current location.
 * Displays the current location and opens the DetermineLocation dropdown.
 *
 * @module LocationButton
 */

/**
 * Props for the LocationButton component.
 * @property location - The current location string.
 * @property setLocation - Function to update the location.
 */
interface LocationButtonProps {
    location: string;
    setLocation: (location: string) => void;
}

/**
 * LocationButton displays a button for the current location and opens a dropdown to change it.
 * @param location - The current location string.
 * @param setLocation - Function to update the location.
 * @returns {JSX.Element}
 */
const LocationButton = memo(({ location, setLocation }: LocationButtonProps) => {
    const [locationPrompt, setLocationPrompt] = useState<boolean>(false);

    const handleLocationSelect = useCallback((newLocation: string) => {
        setLocation(newLocation);
        setLocationPrompt(false);
    }, [setLocation]);

    return (
        <div className='relative'>
            <Button
                onClick={() => setLocationPrompt((prev) => !prev)}
                label={location}
                icon={<KeyboardArrowDownIcon />} />
            {locationPrompt && (
                <DetermineLocation
                    location={location}
                    setLocation={handleLocationSelect}
                    prompt={setLocationPrompt}
                />
            )}
        </div>
    );
});

LocationButton.displayName = 'LocationButton';

export default LocationButton;