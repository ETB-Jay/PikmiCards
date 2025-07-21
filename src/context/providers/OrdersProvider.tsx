// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useCallback, useMemo, PropsWithChildren, ReactElement } from 'react';

import { OrderData, Order, Status, StoreLocations } from '../../types';
import { OrdersContext } from '../Context';

const OrdersProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [orders, setOrders] = useState<OrderData[]>([]);

  const fetchOrders = useCallback(async (): Promise<void> => {
    try {
      setOrders([]);
      const response = await fetch('/api/orders');
      const text = await response.text();
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const orders = JSON.parse(text);
      setOrders(orders);
    } catch (err) {
      throw new Error((err as Error).message);
    }
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

  const fromOrderDataToOrder = useCallback(
    (orders: OrderData[], location: StoreLocations): Order[] => {
      const transformed = orders
        .filter((order) => order.fulfillmentLocation.includes(location))
        .map((order) => ({
          orderID: order.orderID,
          location,
          box: null,
          items: order.items.map((item) => ({
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
    },
    []
  );

  const value = useMemo(
    () => ({ orders, setOrders, fetchOrders, fromOrderDataToOrder }),
    [orders, fetchOrders, fromOrderDataToOrder]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default OrdersProvider;
