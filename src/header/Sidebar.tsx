/**
 * Sidebar component for PikmiCards navigation.
 * Provides navigation links and logout functionality in a slide-out panel.
 *
 * @module Sidebar
 */
// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/useContext';
import { Button } from '../components/modal';

import Hamburger from './buttons/Hamburger';

// ─ Interfaces ─────────────────────────────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  onClick: () => void;
}

// ─ Constants ──────────────────────────────────────────────────────────────────────────────────────
const SIDEBAR_ALT = "Sidebar Image";
const SIDEBAR_ARIA_LABEL = "Sidebar Button";

/**
 * @description Props for the Sidebar component.
 * @param open - Whether the sidebar is open (visible).
 * @param closeSidebar - Function to close the sidebar.
 */
// ─ Components ─────────────────────────────────────────────────────────────────────────────────────
const Sidebar = ({ open, closeSidebar }: { open: boolean; closeSidebar: () => void }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { closeSidebar(); }
    };

    if (open) { document.addEventListener('keydown', handleKeyDown); }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeSidebar]);

  const Field = ({ label, onClick }: FieldProps) => (
    <div
      className='flex flex-col w-full text-white hover:bg-white/10 cursor-pointer text-start p-2'
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          onClick();
        }
      }}
    >
      {label}
    </div>
  );

  return (
    <div className={`fixed top-0 left-0 h-screen w-[30vw] min-w-40 max-w-60 bg-black/90 z-100 flex flex-col py-3 px-1.5 gap-7 shadow-lg transition-all duration-300 transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='flex flex-row items-center justify-between px-3'>
        <Button
          onClick={closeSidebar}
          aria-label={SIDEBAR_ARIA_LABEL}
          className="p-0 bg-transparent border-none shadow-none hover:bg-transparent focus:ring-0"
          label=""
          icon={<Hamburger loadSidebar={closeSidebar} />}
        />
        <img src='/pikmicard.png' alt={SIDEBAR_ALT} className='h-12 w-12' />
      </div>
      <div className='flex flex-col w-full gap-1 text-white text-start flex-1'>
        <Field label="Pick Orders" onClick={() => { navigate('/pick'); }} />
        <Field label="Guide" onClick={() => { navigate('/guide'); }} />
        <div className='mt-auto'>
          <Field label="Logout" onClick={() => { logout(); }} />
        </div>
      </div>
    </div>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Sidebar;