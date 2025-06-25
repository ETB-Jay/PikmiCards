import Hamburger from './buttons/Hamburger';

const Sidebar = ({ open, closeSidebar }: { open: boolean; closeSidebar: () => void }) => {
    return (
        <div className={`fixed top-0 left-0 h-screen w-[30vw] min-w-40 max-w-60 bg-black/90 z-100 flex flex-col py-3 px-4.5 gap-7 shadow-lg transition-all duration-300 transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='flex flex-row items-center justify-between'>
                <button onClick={closeSidebar} aria-label='Close sidebar'>
                    <Hamburger loadSidebar={closeSidebar} />
                </button>
                <img src='/pikmicard.png' alt='Pikmi Card' className='h-12 w-12' />
            </div>
            <div className='flex flex-col w-full gap-4 text-white text-start flex-1'>
                <div>
                    Pick Orders
                </div>
                <div>
                    Guide
                </div>
                <div className='flex flex-row mt-auto'>
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Sidebar;