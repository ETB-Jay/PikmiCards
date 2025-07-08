// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';

import LocationButton from './buttons/LocationButton';
import RefreshButton from './buttons/RefreshButton';

/**
 * @description Header displays the top navigation bar with sidebar, location, and refresh controls.
 */
const Header = ({ pick = false }) => {
  return (
    <div className="relative flex h-[5vh] w-full flex-row items-center gap-5 px-4">
      <img
        src="/pikmicard.png"
        alt={logoAlt}
        className="mr-2 h-10 w-10 rounded-xl bg-amber-50/15 shadow"
      />
      {pick &&
        <>
          <LocationButton />
          <RefreshButton />
        </>
      }
      <div className="ml-auto flex gap-2">
        <HeaderRedirectButton
          label={pickOrdersLabel}
          navigateTo="/pick"
          icon={<img src="/cards.svg" alt={pickOrdersLabel} className="h-5 w-5 align-middle" />}
        />
        <HeaderRedirectButton label={guideLabel} navigateTo="/guide" icon={<BookIcon />} />
        <HeaderRedirectButton label={logoutLabel} navigateTo="/login" icon={<PersonIcon />} />
      </div>
    </div>
  );
};

Header.displayName = 'Header';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Header;
