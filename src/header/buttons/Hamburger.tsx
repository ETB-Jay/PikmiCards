import React from 'react';
import hamburger from '/Hamburger.svg';

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