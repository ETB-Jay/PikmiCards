import React, { useContext, useState, useCallback } from 'react';
import DetermineLocation from './DetermineLocation';
import { Button } from '../../components/modal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LocationContext } from '../../context/Context';

/**
 * LocationButton component for selecting the current location.
 * Displays the current location and opens the DetermineLocation dropdown.
 *
 * @module LocationButton
 */

/**
 * LocationButton displays a button for the current location and opens a dropdown to change it.
 */
const LocationButton = (): React.ReactElement => {
    const { location, setLocation } = useContext(LocationContext);
    const [locationPrompt, setLocationPrompt] = useState<boolean>(false);

    const handleLocationSelect = useCallback((newLocation: import('../../types').Location) => {
        setLocation(newLocation);
        setLocationPrompt(false);
    }, [setLocation]);

    return (
        <div className='relative'>
            <Button
                onClick={() => setLocationPrompt((prev) => !prev)}
                label={location}
                icon={<KeyboardArrowDownIcon />}
            />
            {locationPrompt && (
                <DetermineLocation
                    location={location}
                    setLocation={handleLocationSelect}
                    prompt={setLocationPrompt}
                />
            )}
        </div>
    );
};

LocationButton.displayName = 'LocationButton';

export default LocationButton;