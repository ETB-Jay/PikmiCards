import { useContext } from 'react';
import { OrdersContext, FullscreenContext, OrderDisplayContext, BoxOrdersContext, ConfirmContext, QueuePileContext, AuthContext } from './Context';

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
    if (!context) {
        throw new Error('useOrders must be used in the OrdersProvider');
    }
    return context;
};

/**
 * useOrderDisplay returns the OrderDisplayContext value.
 * @throws Error if used outside OrderDisplayProvider.
 */
const useOrderDisplay = () => {
    const context = useContext(OrderDisplayContext);
    if (!context) {
        throw new Error('useOrderDisplay must be used in the OrderDisplayProvider');
    }
    return context;
};

/**
 * useFullscreen returns the FullscreenContext value.
 * @throws Error if used outside FullscreenProvider.
 */
const useFullscreen = () => {
    const context = useContext(FullscreenContext);
    if (!context) {
        throw new Error('useFullscreen must be used within a FullscreenProvider');
    }
    return context;
};

/**
 * useBoxOrders returns the BoxOrdersContext value.
 * @throws Error if used outside BoxOrdersProvider.
 */
const useBoxOrders = () => {
    const context = useContext(BoxOrdersContext);
    if (!context) {
        throw new Error('useBoxOrders must be used in the BoxOrdersProvider');
    }
    return context;
};

/**
 * useConfirm returns the ConfirmContext value.
 * @throws Error if used outside ConfirmProvider.
 */
const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used in the ConfirmProvider');
    }
    return context;
};

/**
 * useQueuePile returns the QueuePileContext value.
 * @throws Error if used outside QueuePileProvider.
 */
const useQueuePile = () => {
    const context = useContext(QueuePileContext);
    if (!context) {
        throw new Error('useQueuePile must be used in the QueuePileProvider');
    }
    return context;
};

/**
 * useAuth returns the AuthContext value.
 * @throws Error if used outside AuthProvider.
 */
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useQueuePile must be used in the Authentication Provider');
    }
    return context;
};

export { useOrders, useFullscreen, useOrderDisplay, useBoxOrders, useConfirm, useQueuePile, useAuth };
