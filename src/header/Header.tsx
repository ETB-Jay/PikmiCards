// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';

import LocationButton from './buttons/LocationButton';
import RefreshButton from './buttons/RefreshButton';

const logoAlt = 'PikmiCards Logo';
const pickOrdersLabel = 'Pick Orders';
const guideLabel = 'Guide';
const logoutLabel = 'Logout';

/**
 * HeaderRedirectButton renders a styled header navigation button.
 * - If `navigateTo` is provided, clicking navigates to that route.
 * - If `onClick` is provided, it is called on click instead.
 *
 * @param label - The button text.
 * @param navigateTo - (Optional) Route to navigate to on click.
 * @param onClick - (Optional) Custom click handler.
 * @param icon - (Optional) Icon to display before the label.
 * @param iconAlt - (Optional) Alternative text for the icon.
 */
interface HeaderRedirectButtonProps {
  label: string;
  navigateTo?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const HeaderRedirectButton = memo(
  ({ label, navigateTo, onClick, icon }: HeaderRedirectButtonProps) => {
    const navigate = useNavigate();
    const handleClick = onClick
      ? onClick
      : () => {
        if (navigateTo) {
          navigate(navigateTo);
        }
      };
    return (
      <button
        type="button"
        className="focus:ring-green-smoke-400 bg-green-smoke-400/50 hover:bg-green-smoke-200/60 hover:text-green-smoke-900 hover:border-green-smoke-400 focus:bg-green-smoke-100/80 focus:text-green-smoke-900 focus:border-green-smoke-600 mx-1 flex cursor-pointer flex-row items-center justify-center gap-2 rounded-lg border border-green-300/40 p-2 font-mono text-xs font-bold tracking-wider text-green-100 shadow-[0_2px_8px_0_rgba(166,170,98,0.15)] transition-all duration-150 focus:ring-2 focus:outline-none"
        onClick={handleClick}
      >
        {icon}
        <span className="hidden md:inline">{label}</span>
      </button>
    );
  }
);
HeaderRedirectButton.displayName = 'HeaderRedirectButton';

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
