// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { memo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocation } from '../../context/useContext';
import { PopupOption } from '../../components/formComponents';
import { Location } from '../../types';
import { cn } from '../../context/functions';


interface DetermineLocationProps {
  prompt: (show: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

/**
 * DetermineLocation renders a dropdown for selecting a location.
 * @param prompt - Function to toggle the prompt visibility.
 */
const DetermineLocation = memo(({
  prompt,
  buttonRef,
}: DetermineLocationProps): React.ReactElement => {
  const { location, setLocation } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation as Location);
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
      className={cn("absolute flex flex-col py-1 text-sm font-semibold rounded shadow-2xl bg-green-smoke-200 top-10 mt-1 z-100 w-fit border-1")}
    >
      <PopupOption label="Oakville" current={location} onSelect={handleLocationSelect} />
      <PopupOption label="Newmarket" current={location} onSelect={handleLocationSelect} />
    </div>
  );
});

DetermineLocation.displayName = 'DetermineLocation';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default DetermineLocation;
