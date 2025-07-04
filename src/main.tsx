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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Providers><Login /></Providers>
  },
  {
    path: '/pick',
    element: (
      <Providers>
          <Pick />
      </Providers>
    )
  },
  {
    path: '/guide',
    element: <Providers><Guide /></Providers>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
