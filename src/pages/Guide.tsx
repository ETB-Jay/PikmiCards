/**
 * Guide page for PikmiCards.
 * Provides user instructions for picking orders, using the sidebar, and logging out.
 *
 * @module Guide
 */
import React, { useState } from 'react';
import { MainContainer } from '../components/containers';
import Hamburger from '../header/buttons/Hamburger';
import Sidebar from '../header/Sidebar';

/**
 * Guide page component with user instructions.
 */
function Guide(): React.ReactElement {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    // Open sidebar
    const openSidebar = () => {
        setSidebarVisible(true);
        setTimeout(() => setSidebarOpen(true), 10);
    };
    // Close sidebar
    const closeSidebar = () => {
        setSidebarOpen(false);
        setTimeout(() => setSidebarVisible(false), 300);
    };

    return (
        <MainContainer>
            {sidebarVisible && (
                <Sidebar open={sidebarOpen} closeSidebar={closeSidebar} />
            )}
            <div className="absolute top-4 left-4 z-10">
                <Hamburger loadSidebar={openSidebar} />
            </div>
            <div className="max-w-2xl mx-auto p-6 text-white">
                <h1 className="text-3xl font-bold mb-6 text-center">User Guide</h1>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">How to Pick Orders</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Navigate to the <span className="font-semibold">Pick Orders</span> page using the sidebar.</li>
                        <li>Browse the list of available orders.</li>
                        <li>Click on an order to view its details and items to pick.</li>
                        <li>Use the checkboxes or selection tools to mark items as picked.</li>
                        <li>Click <span className="font-semibold">Confirm</span> when you have finished picking items for an order.</li>
                    </ul>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Using the Sidebar</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Open the sidebar by clicking the <span className="font-semibold">Hamburger</span> menu in the top left.</li>
                        <li>Navigate between <span className="font-semibold">Welcome</span>, <span className="font-semibold">Guide</span>, and <span className="font-semibold">Logout</span> using the sidebar options.</li>
                        <li>The sidebar can be closed by clicking the hamburger icon again or clicking outside the sidebar.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">Logging Out</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Click <span className="font-semibold">Logout</span> in the sidebar to securely log out of your account.</li>
                        <li>You will be redirected to the login page.</li>
                    </ul>
                </section>
            </div>
        </MainContainer>
    );
}

export default Guide;