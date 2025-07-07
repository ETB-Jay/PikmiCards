// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Pick from './pages/Pick';
import Login from './pages/Login';
import Providers from './context/Providers';
import Guide from './pages/Guide';
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
    element: <Login />,
  },
  {
    path: '/pick',
    element: (
      <ProtectedRoute>
        <Pick />
      </ProtectedRoute>
    ),
  },
  {
    path: '/guide',
    element: (
      <ProtectedRoute>
        <Guide />
      </ProtectedRoute>
    ),
  },
]);

// ─ Render ───────────────────────────────────────────────────────────────────────────────────────
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
