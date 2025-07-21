// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components';
import { cn } from '../context/functions';
import { useLogout, useStoreLocation } from '../context/useContext';
import LocationButton from './buttons/LocationButton';
import RefreshButton from './buttons/RefreshButton';
import CardsIcon from '../components/icons/CardsIcon';
import PikmicardIcon from '../components/icons/PikmicardIcon';

/**
 * Header displays the top navigation bar with sidebar, location, and refresh controls.
 * @param pick - Whether to show picking-related controls (location and refresh buttons)
 */
const Header = memo(({ pick = false }: { pick: boolean }) => {
  const navigate = useNavigate();
  const { storeLocation } = useStoreLocation();
  const { setLogout } = useLogout();
  const pickOrdersLabel = 'Orders';
  const guideLabel = 'Guide';
  const logoutLabel = 'Logout';

  return (
    <div
      className={cn(
        'sticky top-0 left-0 z-50 flex h-fit w-full flex-row items-center justify-between gap-4 px-6 pt-3 pb-1 shadow backdrop-blur'
      )}
    >
      <div className={cn('flex flex-row items-center gap-4')}>
        <PikmicardIcon
          width={40}
          height={40}
          className={cn('h-10 w-10 shrink-0 rounded-xl bg-amber-50/15 shadow')}
          style={{ display: 'block' }}
        />
        {pick && <LocationButton />}
        <RefreshButton />
      </div>
      <div className={cn('flex items-center gap-2')}>
        <Button
          label={pickOrdersLabel}
          onAction={() => {
            navigate(`/pick/${storeLocation}`);
          }}
          icon={
            <CardsIcon
              width={20}
              height={20}
              className={cn('h-5 w-5 shrink-0 align-middle')}
              style={{ display: 'inline-block' }}
            />
          }
        />
        <Button
          label={guideLabel}
          onAction={() => {
            navigate('/guide');
          }}
          icon={<BookIcon fontSize="small" />}
        />
        <Button
          label={logoutLabel}
          onAction={() => {
            setLogout(true);
          }}
          icon={<PersonIcon fontSize="small" />}
        />
      </div>
    </div>
  );
});

Header.displayName = 'Header';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Header;
