// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useEffect, memo, useContext, useState } from 'react';

import Header from '../header/Header';
import CardPicker from '../body/CardPicker';
import { useOrders, useOrderDisplay } from '../context/useContext';
import { MainContainer, FlexColCenter } from '../components/containers';
import { LocationContext } from '../context/Context';

/**
 * @description Pick returns a React.ReactElement that renders the card picker.
 * - Fetches Orders from Shopify
 * - Formats the OrderData into Orders
 * - Renders the Loading Spinner while waiting for the OrderDisplay
 * - Renders the content once the OrderDisplay has loaded
 *
 * @returns The main card picking interface.
 */
const Pick = memo((): React.ReactElement => {
  const { orders, fetchOrders, fromOrderDataToOrder } = useOrders();
  const { orderDisplay, setOrderDisplay } = useOrderDisplay();
  const [error, setError] = useState<string>();
  const { location } = useContext(LocationContext);

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
    if (orders.length > 0) {
      const filteredOrders = fromOrderDataToOrder(orders, location);
      setOrderDisplay(filteredOrders);
    }
  }, [orders, location]);

  const content =
    orderDisplay.length === 0 ? (
      <LoadingSpinner />
    ) : (
      <CardPicker />
    );

  return (
    <MainContainer>
      <Header />
      <div className='flex-1'>
        {content}
      </div>
      {error && <div className="absolute right-1/2 bottom-5">{error}</div>}
    </MainContainer>
  );
});

Pick.displayName = 'Pick';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Pick;
