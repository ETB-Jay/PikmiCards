// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, useMemo } from 'react';

import { Empty, CustomerInfo } from '../../components';
import { cn } from '../../context/functions';
import { useOrderDisplay } from '../../context/useContext';
import { Order } from '../../types';

const NUMBER_BOXES = 24;

/** CardGridDisplay displays a grid of customer orders or an empty state. */
const CardGridDisplay = memo((): ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const content = useMemo(
    () =>
      orderDisplay.length === 0 ? (
        <Empty text="No Orders Left" />
      ) : (
        orderDisplay
          .slice(0, NUMBER_BOXES)
          .map((order: Order, idx: number) => (
            <CustomerInfo key={order.orderID} order={order} index={idx + 1} />
          ))
      ),
    [orderDisplay]
  );

  return (
    <div className={cn(`relative flex h-full w-full flex-wrap gap-x-2 gap-y-2 rounded-lg p-2`)}>
      {content}
    </div>
  );
});

CardGridDisplay.displayName = 'CardGridDisplay';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardGridDisplay;
