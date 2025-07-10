// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

import { Location } from '../../types';
import { PopupOption } from '../../components/formComponents';

interface DetermineLocationProps {
  location: Location;
  setLocation: (loc: Location) => void;
  prompt: (show: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

/**
 * DetermineLocation renders a dropdown for selecting a location.
 * @param location - The current location string.
 * @param setLocation - Function to update the location.
 * @param prompt - Function to toggle the prompt visibility.
 */
const DetermineLocation = ({
  location,
  setLocation,
  prompt,
  buttonRef,
}: DetermineLocationProps): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);

  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation as Location);
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
      className="bg-green-smoke-200 absolute top-10 z-100 flex w-fit flex-col rounded border-1 py-1 text-sm font-semibold shadow-2xl"
    >
      <PopupOption label="Oakville" current={location} onSelect={handleLocationSelect} />
      <PopupOption label="Newmarket" current={location} onSelect={handleLocationSelect} />
    </div>
  );
};

DetermineLocation.displayName = 'DetermineLocation';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default DetermineLocation;
