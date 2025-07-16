// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useEffect, memo, useState } from 'react';

import Header from '../header/Header';
import { useOrders, useOrderDisplay, useLocation } from '../context/useContext';
import { MainContainer } from '../components/containers';
import { cn } from '../context/functions';

import CardPicker from './body/CardPicker';
import LoadingAnimation from './components/LoadingSpinner';

/**
 * @description Orders renders the card picker and manages order fetching and display logic.
 * Fetches orders from Shopify, formats them, and displays loading or content.
 */
const Orders = memo((): React.ReactElement => {
  const { orders, fetchOrders, fromOrderDataToOrder } = useOrders();
  const { orderDisplay, setOrderDisplay } = useOrderDisplay();
  const [error, setError] = useState<string>();
  const { location } = useLocation();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        await fetchOrders();
      } catch (err) {
        setError(`Failed to fetch orders ${err}`);
      }
    };
    loadOrders();
  }, [location]);

  useEffect(() => {
    setOrderDisplay([]);
    if (orders.length > 0) {
      const filteredOrders = fromOrderDataToOrder(orders, location);
      setOrderDisplay(filteredOrders);
    }
  }, [orders]);

  const pickDisplay = (orderDisplay.length === 0 && orders.length === 0 ? <LoadingAnimation /> : <CardPicker />);

  return (
    <MainContainer>
      <Header pick={orderDisplay.length !== 0} />
      <div className={cn("flex-1")}>{pickDisplay}</div>
      {error && <div className={cn("absolute right-1/2 bottom-5")}>{error}</div>}
    </MainContainer>
  );
});

Orders.displayName = 'Pick';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Orders;
