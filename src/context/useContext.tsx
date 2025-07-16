// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useContext } from 'react';

import {
  OrdersContext,
  FullscreenContext,
  OrderDisplayContext,
  ConfirmContext,
  AuthContext,
  LocationContext,
  LogoutContext
} from './Context';

// ─ Custom Hooks ────────────────────────────────────────────────────────────────────────────────────
/**
 * @description useOrders returns the OrdersContext value.
 * @throws Error if used outside OrdersProvider.
 */
const useOrders = () => {
  const context = useContext(OrdersContext);
  return context;
};

/**
 * @description useOrderDisplay returns the OrderDisplayContext value.
 * @throws Error if used outside OrderDisplayProvider.
 */
const useOrderDisplay = () => {
  const context = useContext(OrderDisplayContext);
  return context;
};

/**
 * @description useFullscreen returns the FullscreenContext value.
 * @throws Error if used outside FullscreenProvider.
 */
const useFullscreen = () => {
  const context = useContext(FullscreenContext);
  return context;
};

/**
 * @description useConfirm returns the ConfirmContext value.
 * @throws Error if used outside ConfirmProvider.
 */
const useConfirm = () => {
  const context = useContext(ConfirmContext);
  return context;
};

/**
 * @description useLocation returns the LocationContext value.
 * @throws Error if used outside LocationProvider.
 */
const useLocation = () => {
  const context = useContext(LocationContext)
  return context;
}

/**
 * @description useAuth returns the AuthContext value.
 * @throws Error if used outside AuthProvider.
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

/**
 * @description useLogout returns the LogoutContext value
 * @throws Error if used outside AuthProvider
 */
const useLogout = () => {
  const context = useContext(LogoutContext);
  return context;
}

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export { useOrders, useFullscreen, useOrderDisplay, useConfirm, useLocation, useAuth, useLogout };
