// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { useConfirm, useOrders, useOrderDisplay } from '../../context/useContext';
import { Empty, TagPill } from '../../components/formComponents';
import { Order } from '../../types';
import { findOrderByID } from '../../context/functions';

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

  const ariaLabel = `Order for ${orderData.customerName}`;

  const retrievedCount = order.items.filter((item) => item.status === 'inBox').length;
  const unretrievedCount = order.items.filter((item) => item.status !== 'inBox').length;

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
        <TagPill>
          <img src="/ClosedBox.svg" alt="" className="mr-1 inline-block h-4 w-4 align-middle" />
          {index}
        </TagPill>
        <TagPill>
          <img src="/Picked.svg" alt="" className="mr-1 inline-block h-4 w-4 align-middle" />
          {retrievedCount}
        </TagPill>
        <TagPill>
          <img src="/NotPicked.svg" alt="" className="mr-1 inline-block h-4 w-4 align-middle" />
          {unretrievedCount}
        </TagPill>
      </div>
    </div>
  );
});

CustomerInfo.displayName = 'CustomerInfo';

const CardGridDisplay = memo((): React.ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const content =
    orderDisplay.length === 0 ? (
      <Empty text="wow" />
    ) : (
      orderDisplay
        .slice(0, 24)
        .map((order: Order, idx: number) => (
          <CustomerInfo key={order.orderID} order={order} index={idx + 1} />
        ))
    );

  return (
    <div className="relative grid h-full w-full flex-1 auto-rows-fr grid-cols-1 gap-1 overflow-y-auto rounded-lg p-2 sm:grid-cols-2">
      {content}
    </div>
  );
});

CardGridDisplay.displayName = 'CardGridDisplay';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardGridDisplay;
