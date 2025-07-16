// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { useOrderDisplay } from '../../../context/useContext';
import { Empty } from '../../../components/formComponents';
import { Order } from '../../../types';
import CustomerInfo from '../../components/CustomerInfo';
import { cn } from '../../../context/functions';

/**
 * @description CardGridDisplay displays a grid of customer orders or an empty state.
 */
const CardGridDisplay = memo((): React.ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const content =
    orderDisplay.length === 0 ? (
      <Empty text="No Orders Left" />
    ) : (
      orderDisplay
        .slice(0, 24)
        .map((order: Order, idx: number) => (
          <CustomerInfo key={order.orderID} order={order} index={idx + 1} />
        ))
    );

  return (
    <div className={cn(`relative flex flex-wrap items-start w-full gap-1 p-2 overflow-hidden rounded-lg ${orderDisplay.length === 0 ? 'h-full' : 'h-fit'}`)}>
      {content}
    </div>
  );
});

CardGridDisplay.displayName = 'CardGridDisplay';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardGridDisplay;
