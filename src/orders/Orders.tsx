// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useEffect, memo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../header/Header';
import { useOrders, useOrderDisplay, useLocation as useLocationContext } from '../context/useContext';
import { MainContainer } from '../components/containers';
import { cn } from '../context/functions';
import { Location } from '../types';

import CardPicker from './CardPicker';
import LoadingAnimation from './LoadingAnimation';

/**
 * @description Orders renders the card picker and manages order fetching and display logic.
 * Fetches orders from Shopify, formats them, and displays loading or content.
 */
const Orders = memo((): React.ReactElement => {
  const { orders, fetchOrders, fromOrderDataToOrder } = useOrders();
  const { orderDisplay, setOrderDisplay } = useOrderDisplay();
  const [error, setError] = useState<string>();
  const { location: contextLocation, setLocation } = useLocationContext();
  const [progress, setProgress] = useState<number>(0);
  const { location } = useParams();

  useEffect(() => {
    if (location && location !== contextLocation) {
      setLocation(location as Location);
    }
  }, [location, contextLocation, setLocation]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const loadOrders = async () => {
      setProgress(0);
      try {
        interval = setInterval(() => {
          setProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 200);
        await fetchOrders();
        setProgress(100);
        setTimeout(() => setProgress(0), 500);
      } catch (err) {
        setError(`Failed to fetch orders ${err}`);
        setProgress(0);
      } finally {
        clearInterval(interval);
      }
    };
    loadOrders();
    return () => clearInterval(interval);
  }, [contextLocation, fetchOrders]);

  useEffect(() => {
    setOrderDisplay([]);
    if (orders.length > 0) {
      const filteredOrders = fromOrderDataToOrder(orders, contextLocation);
      setOrderDisplay(filteredOrders);
    }
  }, [orders, contextLocation, fromOrderDataToOrder]);

  const pickDisplay = (orderDisplay.length === 0 && orders.length === 0 ? <LoadingAnimation progress={progress} /> : <CardPicker />);

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
