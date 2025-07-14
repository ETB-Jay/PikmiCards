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
    <div className="relative grid flex-1 w-full h-full grid-cols-1 gap-1 p-1 overflow-y-auto rounded-lg auto-rows-fr sm:grid-cols-2">
      {content}
    </div>
  );
});

CardGridDisplay.displayName = 'CardGridDisplay';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardGridDisplay;
