import LocationButton from "./buttons/LocationButton";
import RefreshButton from "./buttons/RefreshButton";
import icon from "../assets/pikmicard.png";
import { memo, useMemo } from "react";

interface HeaderProps {
    location: string;
    setLocation: (location: string) => void;
}

const Header = memo(({ location, setLocation }: HeaderProps) => {

    const content = useMemo(() => (
        <div className="flex flex-row justify-between items-center w-full h-8">
            <div className="flex flex-row gap-5">
                <LocationButton 
                    location={location}
                    setLocation={setLocation}
                />
                
                <RefreshButton location={location} />
            </div>
            <img className="relative h-14 w-auto" src={icon} alt="pikmicard" />
        </div>
    ), [location, setLocation]);

    return content;
});

Header.displayName = "Header";

export default Header;
