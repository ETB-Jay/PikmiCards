// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { createContext } from "react";

import type {
  OrdersContextType,
  FullscreenContextType,
  ConfirmContextType,
  LogoutContextType,
  ConfirmAllContextType,
  StoreLocationContextType,
  AuthContextType,
} from "./ContextInterfaces";
import type { Order } from "../types";
import type { Dispatch, SetStateAction } from "react";

/** OrdersContextType stores the fetched order data from Shopify */
const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  setOrders: () => {},
  fetchOrders: () => Promise.resolve([]),
  fromOrderDataToOrder: () => [],
});
OrdersContext.displayName = "OrdersContext";

/** OrderDisplayContext: only for orderDisplay and setOrderDisplay */
interface OrderDisplayContextType {
  orderDisplay: Order[];
  setOrderDisplay: Dispatch<SetStateAction<Order[]>>;
  numberOfBoxes: number;
  setNumberOfBoxes: Dispatch<SetStateAction<number>>;
}
const OrderDisplayContext = createContext<OrderDisplayContextType>({
  orderDisplay: [],
  setOrderDisplay: () => {},
  numberOfBoxes: 24,
  setNumberOfBoxes: () => {},
});
OrderDisplayContext.displayName = "OrderDisplayContext";

/** OrderSelectionContext: for selection state and handlers */
interface OrderSelectionContextType {
  selectedItems: Set<string>;
  setSelectedItems: Dispatch<SetStateAction<Set<string>>>;
  handleSelect: (itemID: string) => void;
  handleClear: () => void;
  handleConfirm: () => void;
}
const OrderSelectionContext = createContext<OrderSelectionContextType>({
  selectedItems: new Set(),
  setSelectedItems: () => {},
  handleSelect: () => {},
  handleClear: () => {},
  handleConfirm: () => {},
});
OrderSelectionContext.displayName = "OrderSelectionContext";

/** FullscreenContextType manages the fullscreen mdoal state */
const FullscreenContext = createContext<FullscreenContextType>({
  openFullscreen: () => {},
  closeFullscreen: () => {},
});
FullscreenContext.displayName = "FullscreenContext";

/** ConfirmContextType manages the confirm modal state */
const ConfirmContext = createContext<ConfirmContextType>({
  confirm: null,
  openConfirm: () => {},
  closeConfirm: () => {},
  onConfirm: () => {},
});
ConfirmContext.displayName = "ConfirmContext";

/** LogoutContextType manages the logout modal state */
const LogoutContext = createContext<LogoutContextType>({
  logout: false,
  setLogout: () => {},
});
LogoutContext.displayName = "LogoutContext";

/** ConfirmAllContextType manages the confirm all modal state */
const ConfirmAllContext = createContext<ConfirmAllContextType>({
  confirmAll: false,
  setConfirmAll: () => {},
});
ConfirmAllContext.displayName = "ConfirmAllContext";

/** LocationContextType manages the location state */
const StoreLocationContext = createContext<StoreLocationContextType>({
  /** The current location being picked from */
  storeLocation: "Oakville",
  /** Function to set location */
  setStoreLocation: () => {},
});
StoreLocationContext.displayName = "StoreLocationContext";

/** AuthContextType manages the authentication process */
const AuthContext = createContext<AuthContextType>({
  handleLogin: async () => {},
});
AuthContext.displayName = "AuthContext";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export {
  OrdersContext,
  OrderDisplayContext,
  OrderSelectionContext,
  FullscreenContext,
  ConfirmContext,
  LogoutContext,
  ConfirmAllContext,
  StoreLocationContext,
  AuthContext,
};
