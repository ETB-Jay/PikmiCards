import React from 'react';
import hamburger from '/Hamburger.svg';

/**
 * Hamburger button component for opening/closing the sidebar.
 * Used in the header and sidebar for navigation.
 *
 * @module Hamburger
 */

/**
 * Hamburger displays a clickable hamburger icon for toggling the sidebar.
 * @param loadSidebar - Function to toggle the sidebar open/close state.
 * @returns {JSX.Element}
 */
const Hamburger = ({ loadSidebar }: { loadSidebar: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const handleClick = () => {
        loadSidebar(prev => !prev);
    };

    return (
        <div
            className='cursor-pointer hover:brightness-85 active:brightness-75 transition-all'
            onClick={handleClick}
        >
            <img src={hamburger} />
        </div>
    );
};

export default Hamburger;