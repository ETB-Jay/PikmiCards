/**
 * @description Main entry point for the PikmiCards React application. Sets up routing and providers.
 */
// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Pick from './orders/Orders';
import Login from './login/Login';
import Providers from './context/Providers';
import Guide from './guide/Guide';
import ProtectedRoute from './context/ProtectedRoute';

import './root.css';

// ─ Router ───────────────────────────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <Providers>
        <Login />
      </Providers>
    ),
  },
  {
    path: '/pick',
    element: (
      <Providers>
        <ProtectedRoute>
          <Pick />
        </ProtectedRoute>
      </Providers>
    ),
  },
  {
    path: '/guide',
    element: (
      <Providers>
        <ProtectedRoute>
          <Guide />
        </ProtectedRoute>
      </Providers>
    ),
  },
]);

// ─ Render ───────────────────────────────────────────────────────────────────────────────────────
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
