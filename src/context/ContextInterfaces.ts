// ─ Context Interfaces ───────────────────────────────────────────────────────────────
import { Dispatch, SetStateAction, FormEvent } from "react";

import { Order, OrderData, ItemID, User, StoreLocations } from "../types";

// OrdersContextType stores the fetched order data from Shopify and related actions.
interface OrdersContextType {
  /** The list of all orders */
  orders: OrderData[];
  /** Updates the order state */
  setOrders: (order: OrderData[]) => void;
  /** Pulls data from the Shopify server backend */
  fetchOrders: () => Promise<OrderData[]>;
  /** Converts OrderData[] to Order[] for a given location */
  fromOrderDataToOrder: (order: OrderData[], storeLocation: StoreLocations) => Order[];
}

// OrderDisplayContextType manages the displayed orders and selection state.
interface OrderDisplayContextType {
  /** The list of all displayed orders */
  orderDisplay: Order[];
  /** Updates the displayed orders */
  setOrderDisplay: (orders: Order[]) => void;
  /** Set of selected ItemIDs */
  selectedItems: Set<ItemID>;
  /** Updates the set of selected items */
  setSelectedItems: (items: Set<ItemID>) => void;
  /** Selects or deselects an item by its ID */
  handleSelect: (itemID: ItemID) => void;
  /** Confirms the current selection */
  handleConfirm: () => void;
  /** Clears the current selection */
  handleClear: () => void;
}

// FullscreenContextType manages the fullscreen modal state and actions.
interface FullscreenContextType {
  /** Opens the fullscreen modal with a given image URL */
  openFullscreen: (imageUrl: string) => void;
  /** Closes the fullscreen modal and clears the image URL */
  closeFullscreen: () => void;
}

// ConfirmContextType manages the confirm modal state and actions.
interface ConfirmContextType {
  /** The order currently being confirmed, or null if none */
  confirm: Order | null;
  /** Opens the confirmation modal with a given order */
  openConfirm: (order: Order) => void;
  /** Closes the confirmation modal and clears the current order */
  closeConfirm: () => void;
  /**
   * Removes an order from the display and swaps in a new one if needed.
   * @param orderData The order being confirmed
   * @param orderDisplay The current display of orders
   * @param employee The employee confirming the order
   * @param storeLocation The current store location
   */
  onConfirm: (
    orderData: Order,
    orderDisplay: Order[],
    employee: string,
    storeLocation: StoreLocations
  ) => void;
}

// LogoutContextType manages the logout modal state and actions.
interface LogoutContextType {
  /** Whether the logout modal is open */
  logout: boolean;
  /** Opens or closes the logout modal */
  setLogout: Dispatch<SetStateAction<boolean>>;
}

// ConfirmAllContextType manages the confirm all modal state and actions.
interface ConfirmAllContextType {
  /** Whether the confirm all modal is open */
  confirmAll: boolean;
  /** Opens or closes the confirm all modal */
  setConfirmAll: Dispatch<SetStateAction<boolean>>;
}

// StoreLocationContextType manages the current store location state.
interface StoreLocationContextType {
  /** The current store location */
  storeLocation: StoreLocations;
  /** Sets the current store location */
  setStoreLocation: (location: StoreLocations) => void;
}

// AuthContextType manages the authentication process and login action.
interface AuthContextType {
  /**
   * Handles user login.
   * @param event The form event
   * @param user The user credentials
   * @param setError Callback to set error messages
   * @param navigate Callback to navigate after login
   */
  handleLogin: (
    event: FormEvent,
    user: User,
    setError: (err: { email?: string; password?: string; general?: string }) => void,
    navigate: (path: string) => void
  ) => Promise<void>;
}

export type {
  ConfirmContextType,
  AuthContextType,
  LogoutContextType,
  ConfirmAllContextType,
  FullscreenContextType,
  OrdersContextType,
  OrderDisplayContextType,
  StoreLocationContextType,
};
