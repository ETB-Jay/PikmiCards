// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useRef, memo, ReactElement } from 'react';

import DetermineLocation from './DetermineLocation';
import { Button } from '../../components';
import { cn } from '../../context/functions';
import { useStoreLocation } from '../../context/useContext';

/** @description LocationButton displays a button for the current location and opens a dropdown to change it. */
const LocationButton = memo((): ReactElement => {
  const { storeLocation } = useStoreLocation();
  const [locationPrompt, setLocationPrompt] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={cn('relative')}>
      <Button
        ref={buttonRef}
        onAction={() => setLocationPrompt((prev) => !prev)}
        label={storeLocation}
        icon={<KeyboardArrowDownIcon fontSize="small" />}
      />
      {locationPrompt && <DetermineLocation prompt={setLocationPrompt} buttonRef={buttonRef} />}
    </div>
  );
});
LocationButton.displayName = 'LocationButton';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default LocationButton;
