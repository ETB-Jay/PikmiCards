// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { ReactNode, useState, useCallback, useMemo } from 'react';

import FullscreenModal from '../modals/FullscreenModal';
import { OrderData, Order, Location, Status, ItemID, User } from '../types';
import ConfirmModal from '../modals/ConfirmModal';

import {
  OrdersContext,
  FullscreenContext,
  OrderDisplayContext,
  ConfirmContext,
  LocationContext,
  AuthContext,
} from './Context';
import useLocalStorage from './useLocalStorage';

interface ProviderProps {
  children: ReactNode;
}

/**
 * OrdersProvider provides order data and fetch logic to the app.
 * @param children - The child components to wrap.
 */
const OrdersProvider = ({ children }: ProviderProps) => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (): Promise<void> => {
    setError(null);
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const orders = await response.json();
      setOrders(orders);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const fromOrderDataToOrder = useCallback((orders: OrderData[], location: Location): Order[] => {
    const transformed = orders
      .map((order) => ({
        orderID: order.orderID,
        location,
        box: null,
        items: order.items
          .filter((item) => item.itemLocation.includes(location))
          .map((item) => ({
            itemID: item.itemID,
            orderID: item.orderID,
            status: 'unPicked' as Status,
            box: null,
          })),
      }))
      .filter((order) => order.items.length > 0);
    return assignBoxes(transformed);
  }, []);

  const assignBoxes = (orders: Order[]): Order[] => {
    return orders.map((order, idx) => {
      const boxNum = idx < 24 ? idx + 1 : null;
      return {
        ...order,
        box: boxNum,
        items: order.items.map((item) => ({
          ...item,
          box: boxNum,
        })),
      };
    });
  };

  const value = useMemo(
    () => ({ orders, setOrders, fetchOrders, fromOrderDataToOrder, error }),
    [orders, setOrders, fetchOrders, fromOrderDataToOrder, error]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

/**
 * OrderDisplayProvider manages the display and selection state for orders.
 * @param children - The child components to wrap.
 */
const OrderDisplayProvider = ({ children }: ProviderProps) => {
  const [orderDisplay, setOrderDisplay] = useState<Order[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<ItemID>>(new Set());

  const handleSelect = useCallback((itemID: ItemID) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemID)) {
        newSet.delete(itemID);
      } else {
        newSet.add(itemID);
      }
      return newSet;
    });
  }, []);

  const handleClear = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  const handleConfirm = useCallback(() => {
    const displayedOrderIDs = new Set(
      orderDisplay.filter((order) => order.box !== null).map((order) => order.orderID)
    );

    const updatedOrderDisplay = orderDisplay.map((order) => ({
      ...order,
      items: order.items.map((item) =>
        selectedItems.has(item.itemID)
          ? {
              ...item,
              status: (displayedOrderIDs.has(item.orderID) ? 'inBox' : 'queue') as Status,
            }
          : item
      ),
    }));
    setOrderDisplay(updatedOrderDisplay);
    setSelectedItems(new Set());
  }, [orderDisplay, selectedItems]);

  const value = useMemo(
    () => ({
      orderDisplay,
      setOrderDisplay,
      selectedItems,
      setSelectedItems,
      handleSelect,
      handleConfirm,
      handleClear,
    }),
    [
      orderDisplay,
      setOrderDisplay,
      selectedItems,
      setSelectedItems,
      handleSelect,
      handleConfirm,
      handleClear,
    ]
  );

  return <OrderDisplayContext.Provider value={value}>{children}</OrderDisplayContext.Provider>;
};

/**
 * FullscreenProvider manages fullscreen image modal state and actions.
 * @param children - The child components to wrap.
 */
const FullscreenProvider = ({ children }: ProviderProps) => {
  const [fullScreen, setFullScreen] = useState<string | null>(null);

  const openFullscreen = useCallback((imageUrl: string) => {
    setFullScreen(imageUrl);
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullScreen(null);
  }, []);

  const value = useMemo(
    () => ({ openFullscreen, closeFullscreen }),
    [openFullscreen, closeFullscreen]
  );

  return (
    <FullscreenContext.Provider value={value}>
      {children}
      {fullScreen && <FullscreenModal image={fullScreen} onClose={closeFullscreen} />}
    </FullscreenContext.Provider>
  );
};

/**
 * ConfirmProvider manages the confirmation modal state and actions.
 * @param children - The child components to wrap.
 */
const ConfirmProvider = ({ children }: ProviderProps) => {
  const [confirm, setConfirm] = useState<Order | null>(null);
  const openConfirm = useCallback((order: Order) => setConfirm(order), []);
  const closeConfirm = useCallback(() => setConfirm(null), []);
  const confirmConfirm = useCallback(() => {
    closeConfirm();
  }, []);
  const value = useMemo(
    () => ({ confirm, openConfirm, confirmConfirm, closeConfirm }),
    [confirm, openConfirm, confirmConfirm, closeConfirm]
  );
  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {confirm && <ConfirmModal order={confirm} onClose={closeConfirm} />}
    </ConfirmContext.Provider>
  );
};

const LocationProvider = ({ children }: ProviderProps) => {
  const [location, setLocation] = useState<Location>('Oakville');
  const value = useMemo(() => ({ location, setLocation }), [location, setLocation]);
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useLocalStorage('user', null);

  const login = (data: User): void => {
    setUser(data);
    window.location.href = '/pick';
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Providers wraps all context providers for the app.
 * @param children - The child components to wrap.
 */
const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <OrdersProvider>
        <OrderDisplayProvider>
          <ConfirmProvider>
            <FullscreenProvider>
              <LocationProvider>{children}</LocationProvider>
            </FullscreenProvider>
          </ConfirmProvider>
        </OrderDisplayProvider>
      </OrdersProvider>
    </AuthProvider>
  );
};

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default Providers;
