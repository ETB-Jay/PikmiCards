// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useMemo, memo, useCallback } from 'react';

import { useOrderDisplay, useOrders, useConfirm } from '../../context/useContext';
import { Order } from '../../types';
import { findOrderByID } from '../../context/orderFunctions';

// ─ Constants ──────────────────────────────────────────────────────────────────────────────────────
const CARD_IMAGE_ALT_1 = 'Box Number';
const CARD_IMAGE_ALT_2 = 'Picked';
const CARD_IMAGE_ALT_3 = 'Unpicked';

const CustomerInfoBadge = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-2xl bg-black/50 px-1.5 py-0.5 font-semibold text-white ring-2 ring-black">
    {children}
  </p>
);

interface CustomerInfoProps {
  order: Order;
  index: number;
}

/**
 * CustomerInfo displays summary info for a single order in the grid.
 * @param order - The order to display.
 * @param index - The index of the order in the list.
 */
const CustomerInfo = memo(({ order, index }: CustomerInfoProps) => {
  const { openConfirm } = useConfirm();
  const { orders } = useOrders();

  const orderData = findOrderByID(orders, order.orderID);

  if (!orderData) {
    return null;
  }

  // Count items by status
  const retrievedCount = order.items.filter((item) => item.status === 'inBox').length;
  const unretrievedCount = order.items.filter((item) => item.status !== 'inBox').length;

  const ariaLabel = orderData.customerName ? orderData.customerName : 'Order';

  return (
    <div
      className="bg-green-smoke-600/60 hover:bg-green-smoke-600/70 relative flex h-full w-full cursor-pointer flex-row items-center justify-between overflow-hidden rounded-lg border-2 border-green-950 p-2 text-xs text-green-100 shadow backdrop-blur-md transition-all duration-150 hover:scale-[1.01] hover:shadow-lg"
      onClick={(event) => {
        event.stopPropagation();
        openConfirm(order);
      }}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.stopPropagation();
          openConfirm(order);
        }
      }}
    >
      <p className="max-w-1/3 truncate font-semibold">{orderData.customerName}</p>
      <div className="flex flex-row gap-2">
        <CustomerInfoBadge>
          <img
            src="/ClosedBox.svg"
            alt={CARD_IMAGE_ALT_1}
            className="mr-1 inline-block h-4 w-4 align-middle"
          />
          {index}
        </CustomerInfoBadge>
        <CustomerInfoBadge>
          <img
            src="/Picked.svg"
            alt={CARD_IMAGE_ALT_2}
            className="mr-1 inline-block h-4 w-4 align-middle"
          />
          {retrievedCount}
        </CustomerInfoBadge>
        <CustomerInfoBadge>
          <img
            src="/NotPicked.svg"
            alt={CARD_IMAGE_ALT_3}
            className="mr-1 inline-block h-4 w-4 align-middle"
          />
          {unretrievedCount}
        </CustomerInfoBadge>
      </div>
    </div>
  );
});

CustomerInfo.displayName = 'CustomerInfo';

/** @description CardGridDisplay is a memoized component that renders a grid of orders for the current box. */
const CardGridDisplay = memo((): React.ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const renderOrder = useCallback(
    (order: Order, index: number) => (
      <CustomerInfo key={order.orderID} order={order} index={index + 1} />
    ),
    []
  );

  const ordersToDisplay = useMemo(() => {
    const filtered = orderDisplay.slice(0, 24);
    return filtered.map((order, idx) => renderOrder(order, idx));
  }, [orderDisplay, renderOrder]);

  return (
    <div className="relative grid h-full w-full flex-1 auto-rows-fr grid-cols-1 gap-1 overflow-y-auto rounded-lg p-2 sm:grid-cols-2">
      {ordersToDisplay}
    </div>
  );
});

CardGridDisplay.displayName = 'CardGridDisplay';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardGridDisplay;
