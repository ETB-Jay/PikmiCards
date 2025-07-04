import { useState } from 'react';
import Hamburger from './buttons/Hamburger';
import LocationButton from './buttons/LocationButton';
import RefreshButton from './buttons/RefreshButton';
import Sidebar from './Sidebar';

/**
 * Header displays the top navigation bar with sidebar, location, and refresh controls.
 */
const Header = () => {
    // const { location, setLocation } = useContext(LocationContext); // No longer needed
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

    // Open sidebar
    const openSidebar = () => {
        setSidebarVisible(true);
        setTimeout(() => setSidebarOpen(true), 10); // allow mount before animating in
    };
    // Close sidebar
    const closeSidebar = () => {
        setSidebarOpen(false);
        setTimeout(() => setSidebarVisible(false), 300); // match animation duration
    };

    return (
        <>
        {sidebarVisible && (
            <Sidebar open={sidebarOpen} closeSidebar={closeSidebar} />
        )}
        <div className="relative flex flex-row items-center w-full gap-5 h-[5vh]">
            <Hamburger loadSidebar={openSidebar}/>
            <LocationButton />
            <RefreshButton />
        </div>
        </>
    );
};

Header.displayName = 'Header';

export default Header;
