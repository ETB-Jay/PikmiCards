/**
 * @description Main entry point for the PikmiCards React application. Sets up routing and providers.
 */
// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './context/Providers';

import './root.css';

// ─ Render ───────────────────────────────────────────────────────────────────────────────────────
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
