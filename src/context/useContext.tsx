import { useContext } from 'react';
import { OrdersContext, FullscreenContext, OrderDisplayContext, ConfirmContext } from './Context';

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

export { useOrders, useFullscreen, useOrderDisplay, useConfirm };
