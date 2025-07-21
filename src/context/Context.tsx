// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { createContext } from 'react';

import type {
  OrdersContextType,
  OrderDisplayContextType,
  FullscreenContextType,
  ConfirmContextType,
  LogoutContextType,
  StoreLocationContextType,
  AuthContextType,
} from './ContextInterfaces';

/** OrdersContextType stores the fetched order data from Shopify */
const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  setOrders: () => {},
  fetchOrders: async () => {},
  fromOrderDataToOrder: () => [],
});
OrdersContext.displayName = 'OrdersContext';

/** OrderDisplayContextType manages the displayed orders */
const OrderDisplayContext = createContext<OrderDisplayContextType>({
  orderDisplay: [],
  setOrderDisplay: () => {},
  selectedItems: new Set(),
  setSelectedItems: () => {},
  handleSelect: () => {},
  handleConfirm: () => {},
  handleClear: () => {},
});
OrderDisplayContext.displayName = 'OrderDisplayContext';

/** FullscreenContextType manages the fullscreen mdoal state */
const FullscreenContext = createContext<FullscreenContextType>({
  openFullscreen: () => {},
  closeFullscreen: () => {},
});
FullscreenContext.displayName = 'FullscreenContext';

/** ConfirmContextType manages the confirm modal state */
const ConfirmContext = createContext<ConfirmContextType>({
  confirm: null,
  openConfirm: () => {},
  closeConfirm: () => {},
  onConfirm: () => {},
});
ConfirmContext.displayName = 'ConfirmContext';

/** LogoutContextType manages the logout modal state */
const LogoutContext = createContext<LogoutContextType>({
  logout: false,
  setLogout: () => {},
});
LogoutContext.displayName = 'LogoutContext';

/** LocationContextType manages the location state */
const StoreLocationContext = createContext<StoreLocationContextType>({
  /** The current location being picked from */
  storeLocation: 'Oakville',
  /** Function to set location */
  setStoreLocation: () => {},
});
StoreLocationContext.displayName = 'StoreLocationContext';

/** AuthContextType manages the authentication process */
const AuthContext = createContext<AuthContextType>({
  handleLogin: async () => {},
});
AuthContext.displayName = 'AuthContext';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export {
  OrdersContext,
  OrderDisplayContext,
  FullscreenContext,
  ConfirmContext,
  LogoutContext,
  StoreLocationContext,
  AuthContext,
};
