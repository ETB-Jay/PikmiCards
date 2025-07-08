// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { Navigate } from 'react-router-dom';
import { useAuth } from './useContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || typeof user !== 'object' || !user.username) {
    return <Navigate to="/login" />;
  }
  return children;
};

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ProtectedRoute;
