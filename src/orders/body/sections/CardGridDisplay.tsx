// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { useOrderDisplay } from '../../../context/useContext';
import { Empty } from '../../../components/formComponents';
import { Order } from '../../../types';
import CustomerInfo from '../../components/CustomerInfo';

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
    <div className="relative grid h-full w-full flex-1 auto-rows-fr grid-cols-1 p-1 gap-1 overflow-y-auto rounded-lg sm:grid-cols-2">
      {content}
    </div>
  );
});

CardGridDisplay.displayName = 'CardGridDisplay';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardGridDisplay;
