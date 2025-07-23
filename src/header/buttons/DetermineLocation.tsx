// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, RefObject, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import PopupOption from '../../components/ui/PopupOption';
import { cn } from '../../context/functions';
import { useStoreLocation } from '../../context/useContext';
import { StoreLocations } from '../../types';

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface DetermineLocationProps {
  prompt: (show: boolean) => void;
  buttonRef: RefObject<HTMLButtonElement>;
}

/**
 * DetermineLocation renders a dropdown for selecting a location.
 * @param prompt - Function to toggle the prompt visibility.
 */
const DetermineLocation = memo(({ prompt, buttonRef }: DetermineLocationProps): ReactElement => {
  const { storeLocation, setStoreLocation } = useStoreLocation();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLocationSelect = (newLocation: StoreLocations) => {
    setStoreLocation(newLocation);
    navigate(`/pick/${newLocation}`);
    prompt(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      prompt(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'bg-green-smoke-200 absolute z-100 mt-1 flex w-fit flex-col rounded border-1 py-1 text-sm font-semibold shadow-2xl'
      )}
    >
      <PopupOption label="Oakville" current={storeLocation} onSelect={handleLocationSelect} />
      <PopupOption label="Newmarket" current={storeLocation} onSelect={handleLocationSelect} />
    </div>
  );
});

DetermineLocation.displayName = 'DetermineLocation';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default DetermineLocation;
