// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useEffect, memo, useState, ReactElement } from 'react';

import CardPicker from './CardPicker';
import LoadingAnimation from './LoadingAnimation';
import { ErrorBox } from '../components';
import { useOrders, useOrderDisplay, useStoreLocation } from '../context/useContext';
import Header from '../header/Header';

/**
 * Orders renders the card picker and manages order fetching and display logic.
 * Fetches orders from Shopify, formats them, and displays loading or content.
 */
const Orders = memo((): ReactElement => {
  const { orders, fetchOrders, fromOrderDataToOrder } = useOrders();
  const { orderDisplay, setOrderDisplay } = useOrderDisplay();
  const { storeLocation } = useStoreLocation();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        await fetchOrders();
      } catch (err) {
        setError((err as Error).message);
      }
    };
    loadOrders();
  }, [storeLocation, fetchOrders]);

  useEffect(() => {
    setOrderDisplay([]);
    if (orders.length > 0) {
      const filteredOrders = fromOrderDataToOrder(orders, storeLocation);
      setOrderDisplay(filteredOrders);
    }
    setError(undefined);
  }, [orders, storeLocation, fromOrderDataToOrder]);

  const pickDisplay =
    orderDisplay.length === 0 && orders.length === 0 ? <LoadingAnimation /> : <CardPicker />;

  return (
    <div className="relative h-screen w-full">
      <Header pick={orderDisplay.length !== 0} />
      {pickDisplay}
      {error && (
        <ErrorBox text={error} className="absolute right-1/2 bottom-20 z-10 w-fit translate-1/2" />
      )}
    </div>
  );
});
Orders.displayName = 'Orders';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Orders;
