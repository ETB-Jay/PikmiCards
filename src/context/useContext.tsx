// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useContext } from 'react';

import { 
    OrdersContext, 
    FullscreenContext, 
    OrderDisplayContext, 
    ConfirmContext, 
    AuthContext 
} from './Context';

// ─ Custom Hooks ────────────────────────────────────────────────────────────────────────────────────
/**
 * Custom React hooks for accessing PikmiCards context values.
 * Provides hooks for orders, display, box orders, queue pile, fullscreen, confirmation, and authentication.
 *
 * @module useContext
 */

/**
 * useOrders returns the OrdersContext value.
 * @throws Error if used outside OrdersProvider.
 */
const useOrders = () => {
    const context = useContext(OrdersContext);
    return context;
};

/**
 * useOrderDisplay returns the OrderDisplayContext value.
 * @throws Error if used outside OrderDisplayProvider.
 */
const useOrderDisplay = () => {
    const context = useContext(OrderDisplayContext);
    return context;
};

/**
 * useFullscreen returns the FullscreenContext value.
 * @throws Error if used outside FullscreenProvider.
 */
const useFullscreen = () => {
    const context = useContext(FullscreenContext);
    return context;
};

/**
 * useConfirm returns the ConfirmContext value.
 * @throws Error if used outside ConfirmProvider.
 */
const useConfirm = () => {
    const context = useContext(ConfirmContext);
    return context;
};

/**
 * useAuth returns the AuthContext value.
 * @throws Error if used otuside AuthProvider
 */
const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export { 
    useOrders, 
    useFullscreen, 
    useOrderDisplay, 
    useConfirm, 
    useAuth 
};
