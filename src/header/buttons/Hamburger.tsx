// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React from 'react';

/**
 * Hamburger button component for opening/closing the sidebar.
 * Used in the header and sidebar for navigation.
 *
 * @module Hamburger
 */

// ─ Constants ─────────────────────────────────────────────────────────────────────────────────────────
const HAMBURGER_ALT = "Hamburger Icon";

/**
 * Hamburger displays a clickable hamburger icon for toggling the sidebar.
 * @param loadSidebar - Function to toggle the sidebar open/close state.
 */
const Hamburger = ({ 
  loadSidebar 
}: { 
  loadSidebar: React.Dispatch<React.SetStateAction<boolean>> 
}) => {
    const handleClick = () => {
        loadSidebar(prev => !prev);
    };


    return (
        <div
          className='cursor-pointer hover:brightness-85 active:brightness-75 transition-all'
          onClick={handleClick}
          tabIndex={0}
          role="button"
          onKeyDown={event => {
              if (event.key === 'Tab' || event.key === ' ') {
                  handleClick();
              }
          }}
        >
            <img src='./Hamburger.svg' alt={HAMBURGER_ALT} />
        </div>
    );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Hamburger;
