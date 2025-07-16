// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { useState, useRef, memo } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Button } from '../../components/formComponents';
import { useLocation } from '../../context/useContext';
import { cn } from '../../context/functions';

import DetermineLocation from './DetermineLocation';

/** @description LocationButton displays a button for the current location and opens a dropdown to change it. */
const LocationButton = memo((): React.ReactElement => {
  const { location } = useLocation();
  const [locationPrompt, setLocationPrompt] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={cn("relative")}>
      <Button
        ref={buttonRef}
        onClick={() => setLocationPrompt((prev) => !prev)}
        label={location}
        icon={<KeyboardArrowDownIcon />}
      />
      {locationPrompt && (
        <DetermineLocation
          prompt={setLocationPrompt}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
});
LocationButton.displayName = 'LocationButton';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default LocationButton;
