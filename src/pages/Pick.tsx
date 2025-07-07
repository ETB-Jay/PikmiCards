// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useEffect, memo, useContext, useState } from 'react';

import Header from '../header/Header';
import CardPicker from '../body/CardPicker';
import { useOrders, useOrderDisplay } from '../context/useContext';
import { MainContainer, FlexColCenter } from '../components/containers';
import { LocationContext } from '../context/Context';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const SPACESHIP_ALT = 'Spaceship illustration';
const LOADING_TEXT = 'Loading Orders';

/**
 * @description LoadingSpinner renders an animated loading indicator for orders
 * @returns The loading spinner
 */
const LoadingSpinner = memo(
  (): React.ReactElement => (
    <FlexColCenter className="h-full w-full gap-4">
      <div className="animate-float-spin">
        <div className="animate-fly-horizontal relative flex flex-row items-center justify-center">
          <div className="spaceship-fire spaceship-fire-horizontal" />
          <img
            src="/spaceship.png"
            alt={SPACESHIP_ALT}
            className="relative z-10 h-20 w-auto drop-shadow-xl"
            draggable={false}
          />
        </div>
      </div>
      <span className="text-green-smoke-900 text-xl font-bold tracking-wide drop-shadow-sm">
        {LOADING_TEXT}
        <span className="loading-dots" />
      </span>
    </FlexColCenter>
  )
);
LoadingSpinner.displayName = 'LoadingSpinner';

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
      <>
        <Header />
        <CardPicker />
      </>
    );

  return (
    <MainContainer>
      {content}
      {error && <div className="absolute right-1/2 bottom-5">{error}</div>}
    </MainContainer>
  );
});

Pick.displayName = 'Pick';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Pick;
