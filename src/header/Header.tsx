// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';

import { Button } from '../components/formComponents';
import { cn } from '../context/functions';
import { useLogout, useLocation } from '../context/useContext';

import LocationButton from './buttons/LocationButton';
import RefreshButton from './buttons/RefreshButton';

/** @description Header displays the top navigation bar with sidebar, location, and refresh controls */
const Header = memo(({ pick = false }: { pick: boolean }) => {
  const navigate = useNavigate();
  const { location } = useLocation();
  const { setLogout } = useLogout();
  const pickOrdersLabel = 'Orders';
  const guideLabel = 'Guide';
  const logoutLabel = 'Logout';
  
  return (
    <div className={cn("relative flex h-[5vh] w-full flex-row items-center gap-2 px-4")}>
      <img
        src="/pikmicard.png"
        alt=""
        className={cn("w-10 h-10 mr-5 shadow rounded-xl bg-amber-50/15")}
      />
      {pick && <LocationButton />}
      <RefreshButton />
      <div className={cn("flex gap-2 ml-auto")}>
        <Button
          label={pickOrdersLabel}
          onClick={() => { navigate(`/pick/${location}`); }}
          icon={<img src="/cards.svg" alt={pickOrdersLabel} className={cn("w-5 h-5 align-middle")} />}
        />
        <Button
          label={guideLabel}
          onClick={() => { navigate('/guide'); }}
          icon={<BookIcon />}
        />
        <Button
          label={logoutLabel}
          onClick={() => { setLogout(true); }}
          icon={<PersonIcon />}
        />
      </div>
    </div>
  );
});

Header.displayName = 'Header';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Header;
