import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Pick from './pages/Pick';
import Login from './pages/Login';
import Providers from './context/Providers';
import './root.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Guide from './pages/Guide';
import ProtectedRoute from './context/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/pick',
    element: (
      <ProtectedRoute>
        <Pick />
      </ProtectedRoute>
    )
  },
  {
    path: '/guide',
    element: (
      <ProtectedRoute>
        <Guide />
      </ProtectedRoute>
    )
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
