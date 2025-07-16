// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactNode, useState, useCallback, useMemo } from 'react';

import FullscreenModal from '../orders/modals/FullscreenModal';
import { OrderData, Order, Location, Status, ItemID } from '../types';
import ConfirmModal from '../orders/modals/ConfirmModal';
import LogoutModal from '../orders/modals/LogoutModal';

import {
  OrdersContext,
  FullscreenContext,
  OrderDisplayContext,
  ConfirmContext,
  LocationContext,
  AuthContext,
  LogoutContext,
} from './Context';
import useLocalStorage from './useLocalStorage';
import { useOrderDisplay } from './useContext';

interface ProviderProps {
  children: ReactNode;
}

/**
 * @description OrdersProvider provides order data and fetch logic to the app.
 */
const OrdersProvider = ({ children }: ProviderProps) => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (): Promise<void> => {
    setError(null);
    try {
      setOrders([]);
      const response = await fetch('/api/orders');
      if (!response.ok) { throw new Error('Failed to fetch orders'); }
      const orders = await response.json();
      setOrders(orders);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const fromOrderDataToOrder = useCallback((orders: OrderData[], location: Location): Order[] => {
    const transformed = orders
      .filter((order) => order.fulfillmentLocation.includes(location))
      .map((order) => ({
        orderID: order.orderID,
        location,
        box: null,
        items: order.items
          .map((item) => ({
            itemID: item.itemID,
            orderID: item.orderID,
            status: 'unPicked' as Status,
            set: item.itemSet ?? '',
            box: null,
          })),
      }))
      .filter(Boolean)
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
    () => ({ orders, setOrders, fetchOrders, fromOrderDataToOrder, assignBoxes, error }),
    [orders, setOrders, fetchOrders, fromOrderDataToOrder, assignBoxes, error]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

/**
 * @description OrderDisplayProvider manages the display and selection state for orders.
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
 * @description FullscreenProvider manages fullscreen image modal state and actions.
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
      {fullScreen && <FullscreenModal image={fullScreen} />}
    </FullscreenContext.Provider>
  );
};

/**
 * @description ConfirmProvider manages the confirmation modal state and actions.
 */
const ConfirmProvider = ({ children }: ProviderProps) => {
  const [confirm, setConfirm] = useState<Order | null>(null);
  const openConfirm = useCallback((order: Order) => setConfirm(order), []);
  const closeConfirm = useCallback(() => setConfirm(null), []);
  const confirmConfirm = useCallback(() => {
    closeConfirm();
  }, []);
  const { setOrderDisplay } = useOrderDisplay();

  const onConfirm = async (
    orderData: Order,
    orderDisplay: Order[],
    employee: string,
    location: Location
  ) => {
    const removeIdx = orderDisplay.findIndex((orderItem) => orderItem.orderID === orderData.orderID);
    if (removeIdx === -1) { return; }

    const newOrderDisplay = [...orderDisplay];

    let confirmedOrder;

    if (newOrderDisplay.length > 24) {
      const swapIdx = 24;
      const swappedOrder = { ...newOrderDisplay[swapIdx], box: removeIdx + 1 };
      swappedOrder.items = swappedOrder.items.map((item) => ({ ...item, box: removeIdx + 1 }));
      confirmedOrder = newOrderDisplay.splice(removeIdx, 1, swappedOrder);
      newOrderDisplay.splice(swapIdx, 1);
    } else {
      confirmedOrder = newOrderDisplay.splice(removeIdx, 1);
    }

    await fetch('/api/orders/write', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderID: confirmedOrder[0].orderID,
        field: {
          employee,
          location
        }
      })
    });

    setOrderDisplay(newOrderDisplay);
    closeConfirm();
  };

  const value = useMemo(
    () => ({ confirm, openConfirm, confirmConfirm, closeConfirm, onConfirm }),
    [confirm, openConfirm, confirmConfirm, closeConfirm]
  );
  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {confirm && <ConfirmModal order={confirm} />}
    </ConfirmContext.Provider>
  );
};

/**
 * @description LogoutProvider manages the logout modal state and actions
 */
const LogoutProvider = ({ children }: ProviderProps) => {
  const [logout, setLogout] = useState<boolean>(false);
  const value = useMemo(() => ({ logout, setLogout }), [logout, setLogout]);
  return (
    <LogoutContext.Provider value={value}>
      {children}
      {logout && <LogoutModal />}
    </LogoutContext.Provider>
  )
}

/**
 * @description LocationProvider manages the current location state.
 */
const LocationProvider = ({ children }: ProviderProps) => {
  const [location, setLocation] = useState<Location>("Oakville");
  const value = useMemo(() => ({ location, setLocation }), [location, setLocation]);
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

/**
 * @description AuthProvider manages authentication state and logic.
 */
const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useLocalStorage('user', null);

  const handleLogin = (
    event: React.FormEvent,
    username: string,
    password: string,
    setError: (err: { username?: string; password?: string; general?: string }) => void
  ) => {
    event.preventDefault();
    let hasError = false;
    const newError: { username?: string; password?: string; general?: string } = {};
    if (!username.trim()) {
      newError.username = 'Username is required.';
      hasError = true;
    }
    if (!password.trim()) {
      newError.password = 'Password is required.';
      hasError = true;
    }
    if (hasError) {
      setError(newError);
      return;
    }
    if (username !== 'ETBETB' || password !== 'ETBETB') {
      setError({ general: 'Invalid Username/Password' });
      return;
    }
    try {
      setUser({ username, password });
      setError({});
      setTimeout(() => {
        window.location.href = '/pick';
      }, 1000);
    } catch {
      setError({ general: 'Login failed. Please try again.' });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, logout, handleLogin }), [user, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * @description Providers wraps all context providers for the app.
 */
const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <LocationProvider>
        <OrdersProvider>
          <OrderDisplayProvider>
            <ConfirmProvider>
              <FullscreenProvider>
                <LogoutProvider>
                  {children}
                </LogoutProvider>
              </FullscreenProvider>
            </ConfirmProvider>
          </OrderDisplayProvider>
        </OrdersProvider>
      </LocationProvider>
    </AuthProvider>
  );
};

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default Providers;
