// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useEffect, memo, useContext, useState } from 'react';

import Header from '../header/Header';
import CardPicker from '../body/CardPicker';
import { useOrders, useOrderDisplay } from '../context/useContext';
import { MainContainer, FlexColCenter } from '../components/containers';
import { LocationContext } from '../context/Context';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const SPACESHIP_ALT = "Spaceship illustration";
const LOADING_TEXT = "Loading Orders";

/**
 * @description LoadingSpinner displays an animated loading indicator for orders
 * @returns Loading Spinner component
 */
const LoadingSpinner = memo((): React.ReactElement => (
  <FlexColCenter className="gap-4 h-full w-full">
    <div className="animate-float-spin">
      <div className="relative flex flex-row items-center justify-center animate-fly-horizontal">
        <div className="spaceship-fire spaceship-fire-horizontal" />
        <img
          src="/spaceship.png"
          alt={SPACESHIP_ALT}
          className="relative z-10 h-20 w-auto drop-shadow-xl"
        />
      </div>
    </div>
    <span className="text-xl font-bold text-green-smoke-900 drop-shadow-sm tracking-wide">
      {LOADING_TEXT}
      <span className="loading-dots" />
    </span>
  </FlexColCenter>
));
LoadingSpinner.displayName = "LoadingSpinner"

/**
 * @description Pick is the main page for picking orders
 * Handles order loading, filtering, and layout
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

  const content = orderDisplay.length === 0
    ? (
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
      {error && <div className='absolute bottom-5 right-1/2'>{error}</div>}
    </MainContainer>
  );
});

Pick.displayName = "Pick"

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Pick;
