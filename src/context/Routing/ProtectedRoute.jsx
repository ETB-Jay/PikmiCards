import { Navigate } from 'react-router-dom';
import { useAuth } from '../useContext';

/**
 * ProtectedRoute component for route guarding in PikmiCards.
 * Redirects to login if user is not authenticated.
 *
 * @module ProtectedRoute
 */

/**
 * ProtectedRoute guards routes that require authentication.
 * @param children - The child components to render if authenticated.
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    console.log('ProtectedRoute user:', user);
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;