// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useEffect, memo, useState, ReactElement } from 'react';

import CardPicker from './CardPicker';
import LoadingAnimation from './LoadingAnimation';
import { ErrorBox } from '../components';
import { useOrders, useOrderDisplay, useStoreLocation } from '../context/useContext';

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
        const fetched = await fetchOrders();
        setOrderDisplay([]);
        if (fetched.length > 0) {
          const filteredOrders = fromOrderDataToOrder(fetched, storeLocation);
          setOrderDisplay(filteredOrders);
        }
        setError(undefined);
      } catch (err) {
        setError((err as Error).message);
      }
    }
    loadOrders();
  }, [storeLocation, fromOrderDataToOrder])

  const pickDisplay =
    orderDisplay.length === 0 || orders.length === 0 ? <LoadingAnimation /> : <CardPicker />;

  return (
    <>
      {pickDisplay}
      {error && (
        <ErrorBox text={error} className="absolute right-1/2 bottom-20 z-10 w-fit translate-1/2" />
      )}
    </>
  );
});
Orders.displayName = 'Orders';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Orders;
