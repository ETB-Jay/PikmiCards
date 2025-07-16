// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { Navigate } from 'react-router-dom';
import { useAuth } from './useContext';

/**
 * @description ProtectedRoute restricts access to authenticated users only.
 * @param {{ children: React.ReactNode }} props - The children to render if authenticated.
 * @returns {React.ReactElement} The protected route or redirect to login.
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || typeof user !== 'object' || !user.username) {
    return <Navigate to="/login" />;
  }
  return children;
};

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ProtectedRoute;
