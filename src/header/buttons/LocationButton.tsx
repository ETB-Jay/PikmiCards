import DetermineLocation from './DetermineLocation';
import { Button } from '../../components/modal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { memo, useCallback, useState } from 'react';

interface LocationButtonProps {
    location: string;
    setLocation: (location: string) => void;
}

const LocationButton = memo(({ location, setLocation }: LocationButtonProps) => {
    const [locationPrompt, setLocationPrompt] = useState<boolean>(false);

    const handleLocationSelect = useCallback((newLocation: string) => {
        setLocation(newLocation);
        setLocationPrompt(false);
    }, [setLocation]);

    return (
        <>
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
        </>
    );
});

LocationButton.displayName = 'LocationButton';

export default LocationButton;