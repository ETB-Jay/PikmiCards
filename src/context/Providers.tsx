// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactNode, useState, useCallback, useMemo, FormEvent } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import app from '../firebase';
import FullscreenModal from '../modals/FullscreenModal';
import { OrderData, Order, Location, Status, ItemID, User } from '../types';
import ConfirmModal from '../modals/ConfirmModal';
import LogoutModal from '../modals/LogoutModal';

import { useOrderDisplay, useLocation } from './useContext';
import {
  OrdersContext,
  FullscreenContext,
  OrderDisplayContext,
  ConfirmContext,
  LocationContext,
  AuthContext,
  LogoutContext,
} from './Context';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Pick from '../orders/Orders';
import Login from '../login/Login';
import Guide from '../guide/Guide';
import ProtectedRoute from './ProtectedRoute';
import '../root.css';

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
      const text = await response.text();
      if (!response.ok) { throw new Error('Failed to fetch orders'); }
      try {
        const orders = JSON.parse(text);
        setOrders(orders);
      } catch (err) {
        setError((err as Error).message);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  // assignBoxes is now a private helper
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

  const value = useMemo(
    () => ({ orders, setOrders, fetchOrders, fromOrderDataToOrder, error }),
    [orders, fetchOrders, fromOrderDataToOrder, error]
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
    [orderDisplay, selectedItems, handleSelect, handleConfirm, handleClear]
  );

  return <OrderDisplayContext.Provider value={value}>{children}</OrderDisplayContext.Provider>;
};

/**
 * @description FullscreenProvider manages fullscreen image modal state and actions.
 */
const FullscreenProvider = ({ children }: ProviderProps) => {
  const [fullScreen, setFullScreen] = useState<string | null>(null);

  // No need for useCallback for simple setters
  const openFullscreen = (imageUrl: string) => {
    setFullScreen(imageUrl);
  };

  const closeFullscreen = () => {
    setFullScreen(null);
  };

  const value = useMemo(
    () => ({ openFullscreen, closeFullscreen }),
    []
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
  const openConfirm = (order: Order) => {
    setConfirm(order);
  };
  const closeConfirm = () => {
    setConfirm(null);
  };
  const { setOrderDisplay } = useOrderDisplay();

  const onConfirm = useCallback(async (
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
        value: {
          employee,
          location
        }
      })
    });

    setOrderDisplay(newOrderDisplay);
    closeConfirm();
  }, [setOrderDisplay]);

  const value = useMemo(
    () => ({ confirm, openConfirm, closeConfirm, onConfirm }),
    [confirm, onConfirm]
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
  // No need for useMemo for simple setters
  return (
    <LogoutContext.Provider value={{ logout, setLogout }}>
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
  // No need for useMemo for simple setters
  return <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>;
};

/**
 * @description AuthProvider manages authentication state and logic.
 */
const AuthProvider = ({ children }: ProviderProps) => {
  const { location } = useLocation();
  const handleLogin = async (
    ev: FormEvent,
    user: User,
    setError: (err: { email?: string; password?: string; general?: string }) => void,
    navigate: (path: string) => void
  ) => {

    ev.preventDefault();

    const newError: { email?: string; password?: string; general?: string } = {};

    if (!user.email.trim()) { newError.email = 'Email is required.'; }
    if (!user.password.trim()) { newError.password = 'Password is required.'; }

    if (newError.email || newError.password) {
      setError(newError);
      return;
    }

    const auth = getAuth(app);

    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setTimeout(() => {
        setError({});
        setTimeout(() => {
          navigate(`/pick/${location}`);
        }, 500);
      })
    } catch (err) {
      setError({ general: 'Invalid Email/Password' });
    }
  };

  const value = useMemo(() => ({ handleLogin }), [handleLogin]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ─ Router ───────────────────────────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/pick/:location',
    element: (
      <ProtectedRoute>
        <Pick />
      </ProtectedRoute>
    ),
  },
  {
    path: '/guide',
    element: (
      <ProtectedRoute>
        <Guide />
      </ProtectedRoute>
    ),
  },
]);

const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <LocationProvider>
    <AuthProvider>
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
    </AuthProvider>
  </LocationProvider>
);

const App = () => (
  <AppProviders>
    <RouterProvider router={router} />
  </AppProviders>
);

export default App;
