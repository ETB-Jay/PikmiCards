// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React, { useContext, useState, useCallback, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Button } from '../../components/modal';
import { LocationContext } from '../../context/Context';

import DetermineLocation from './DetermineLocation';

/**
 * LocationButton displays a button for the current location and opens a dropdown to change it.
 */
const LocationButton = (): React.ReactElement => {
  const { location, setLocation } = useContext(LocationContext);
  const [locationPrompt, setLocationPrompt] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLocationSelect = useCallback(
    (newLocation: import('../../types').Location) => {
      setLocation(newLocation);
      setLocationPrompt(false);
    },
    [setLocation]
  );

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        onClick={() => setLocationPrompt(prev => !prev)}
        label={location}
        icon={<KeyboardArrowDownIcon />}
      />
      {locationPrompt && (
        <DetermineLocation
          location={location}
          setLocation={handleLocationSelect}
          prompt={setLocationPrompt}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
};

LocationButton.displayName = 'LocationButton';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default LocationButton;
