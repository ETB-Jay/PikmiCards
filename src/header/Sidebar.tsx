/**
 * Sidebar component for PikmiCards navigation.
 * Provides navigation links and logout functionality in a slide-out panel.
 *
 * @module Sidebar
 */
import React from 'react';
import Hamburger from './buttons/Hamburger';
import { useNavigate } from 'react-router-dom';

interface FieldProps {
    label: string;
    onClick: () => void;
}

/**
 * Props for the Sidebar component.
 * @property open - Whether the sidebar is open (visible).
 * @property closeSidebar - Function to close the sidebar.
 */
const Sidebar = ({ open, closeSidebar }: { open: boolean; closeSidebar: () => void }) => {
    const navigate = useNavigate();
    const Field: React.FC<FieldProps> = ({ label, onClick }) => (
        <div className='flex flex-col w-full text-white hover:bg-white/10 cursor-pointer text-start p-2' onClick={onClick}>
            {label}
        </div>
    );

    return (
        <div className={`fixed top-0 left-0 h-screen w-[30vw] min-w-40 max-w-60 bg-black/90 z-100 flex flex-col py-3 px-1.5 gap-7 shadow-lg transition-all duration-300 transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='flex flex-row items-center justify-between px-3'>
                <button onClick={closeSidebar} aria-label='Close sidebar'>
                    <Hamburger loadSidebar={closeSidebar} />
                </button>
                <img src='/pikmicard.png' alt='Pikmi Card' className='h-12 w-12' />
            </div>
            <div className='flex flex-col w-full gap-1 text-white text-start flex-1'>
                <Field label="Welcome" onClick={() => navigate('/pick')} />
                <Field label="Guide" onClick={() => navigate('/guide')} />
                <div className='mt-auto'>
                    <Field label="Logout" onClick={() => navigate('/')} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;