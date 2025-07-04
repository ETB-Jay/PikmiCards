/**
 * Guide page for PikmiCards.
 * Provides user instructions for picking orders, using the sidebar, and logging out.
 *
 * @module Guide
 */
// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';

import { MainContainer } from '../components/containers';
import Hamburger from '../header/buttons/Hamburger';
import Sidebar from '../header/Sidebar';

// ─ Constants ─────────────────────────────────────────────────────────────────────────────────────────
const GUIDE_TITLE = "Guide";
const GUIDE_SECTION_1 = "Section 1";
const GUIDE_SECTION_2 = "Section 2";
const GUIDE_SECTION_3 = "Logging Out";
const GUIDE_LIST_ITEM_1 = "First item";
const GUIDE_LIST_ITEM_2 = "Second item";
const GUIDE_LIST_ITEM_3 = "Third item";
const GUIDE_LIST_ITEM_4 = "Fourth item";
const GUIDE_LIST_ITEM_5 = "Fifth item";
const GUIDE_LIST_ITEM_6 = "Sixth item";
const GUIDE_LIST_ITEM_7 = "Seventh item";
const GUIDE_LIST_ITEM_8 = "Eighth item";
const GUIDE_LIST_ITEM_9 = "Ninth item";
const GUIDE_LIST_ITEM_10 = "Tenth item";
const GUIDE_SPAN_1 = "Span 1";
const GUIDE_SPAN_2 = "Span 2";
const GUIDE_SPAN_3 = "Span 3";
const GUIDE_SPAN_4 = "Span 4";

// ─ Guide Page ────────────────────────────────────────────────────────────────────────────────────────
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
        <h1 className="text-3xl font-bold mb-6 text-center">{GUIDE_TITLE}</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{GUIDE_SECTION_1}</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>{GUIDE_LIST_ITEM_1} <span>{GUIDE_SPAN_1}</span></li>
            <li>{GUIDE_LIST_ITEM_2} <span>{GUIDE_SPAN_2}</span></li>
            <li>{GUIDE_LIST_ITEM_3} <span>{GUIDE_SPAN_3}</span></li>
            <li>{GUIDE_LIST_ITEM_4} <span>{GUIDE_SPAN_4}</span></li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{GUIDE_SECTION_2}</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>{GUIDE_LIST_ITEM_5} <span>{GUIDE_SPAN_1}</span></li>
            <li>{GUIDE_LIST_ITEM_6} <span>{GUIDE_SPAN_2}</span></li>
            <li>{GUIDE_LIST_ITEM_7} <span>{GUIDE_SPAN_3}</span></li>
            <li>{GUIDE_LIST_ITEM_8} <span>{GUIDE_SPAN_4}</span></li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">{GUIDE_SECTION_3}</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>{GUIDE_LIST_ITEM_9} <span>{GUIDE_SPAN_1}</span></li>
            <li>{GUIDE_LIST_ITEM_10} <span>{GUIDE_SPAN_2}</span></li>
          </ul>
        </section>
      </div>
    </MainContainer>
  );
}

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default Guide;