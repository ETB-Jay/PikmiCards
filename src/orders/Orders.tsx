// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useEffect, memo, useState } from 'react';

import Header from '../header/Header';
import { useOrders, useOrderDisplay, useLocation } from '../context/useContext';
import { MainContainer } from '../components/containers';

import CardPicker from './body/CardPicker';
import LoadingAnimation from './components/LoadingSpinner';

/**
 * @description Pick returns a React.ReactElement that renders the card picker.
 * - Fetches Orders from Shopify
 * - Formats the OrderData into Orders
 * - Renders the Loading Spinner while waiting for the OrderDisplay
 * - Renders the content once the OrderDisplay has loaded
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

  const pickDisplay = orderDisplay.length === 0 ? <LoadingAnimation /> : <CardPicker />;

  return (
    <MainContainer>
      <Header pick={orderDisplay.length !== 0} />
      <div className="flex-1">{pickDisplay}</div>
      {error && <div className="absolute right-1/2 bottom-5">{error}</div>}
    </MainContainer>
  );
});

Orders.displayName = 'Pick';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Orders;
