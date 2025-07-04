// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { Navigate } from 'react-router-dom';
import { useAuth } from './useContext';

// ─ ProtectedRoute Component ──────────────────────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    console.log('ProtectedRoute user:', user);
    console.log('ProtectedRoute user.username:', user && user.username);
    if (!user || typeof user !== 'object' || !user.username) return <Navigate to="/login" />;
    return children;
};

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ProtectedRoute;