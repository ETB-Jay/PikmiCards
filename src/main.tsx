// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';

import { MainContainer } from './components';
import AppProviders from './context/Providers';
import ProtectedRoute from './context/providers/ProtectedRoute';
import Guide from './guide/Guide';
import Login from './login/Login';
import Orders from './orders/Orders';

import './root.css';

// ─ Router Configuration ─────────────────────────────────────────────────────────────────────────
/** Application router configuration with protected and public routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppProviders>
        <Outlet />
      </AppProviders>
    ),
    children: [
      { path: '', element: <Navigate to="/login" replace /> },
      {
        path: 'login',
        element: (
          <MainContainer>
            <Login />
          </MainContainer>
        ),
      },
      {
        path: 'pick/:location',
        element: (
          <ProtectedRoute>
            <MainContainer>
              <Orders />
            </MainContainer>
          </ProtectedRoute>
        ),
      },
      {
        path: 'guide',
        element: (
          <ProtectedRoute>
            <MainContainer>
              <Guide />
            </MainContainer>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// ─ Application Render ───────────────────────────────────────────────────────────────────────────
/** Root element for the React application */
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
