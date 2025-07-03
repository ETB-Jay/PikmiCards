import Hamburger from './buttons/Hamburger';
import LocationButton from './buttons/LocationButton';
import RefreshButton from './buttons/RefreshButton';
import { memo, useState } from 'react';
import Sidebar from './Sidebar';

/**
 * Props for the Header component.
 * @property location - The current location string.
 * @property setLocation - Function to update the location.
 */
interface HeaderProps {
    location: string;
    setLocation: (location: string) => void;
}

/**
 * Header displays the top navigation bar with sidebar, location, and refresh controls.
 * @param location - The current location string.
 * @param setLocation - Function to update the location.
 * @returns {JSX.Element}
 */
const Header = memo(({ location, setLocation }: HeaderProps) => {

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
            <LocationButton
                location={location}
                setLocation={setLocation}
            />
            <RefreshButton />
        </div>
        </>
    );
});

Header.displayName = 'Header';

export default Header;
