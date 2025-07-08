// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useMemo, memo, useCallback } from 'react';

import { useOrderDisplay, useOrders, useConfirm } from '../../context/useContext';
import { Order } from '../../types';
import { findOrderByID } from '../../context/orderFunctions';

/** @description CardGridDisplay is a memoized component that renders a grid of orders for the current box. */
const CardGridDisplay = memo((): React.ReactElement => {
  const { orderDisplay } = useOrderDisplay();


  return (
    <div className="relative grid h-full w-full flex-1 auto-rows-fr grid-cols-1 gap-1 overflow-y-auto rounded-lg p-2 sm:grid-cols-2">
      {ordersToDisplay}
    </div>
  );
});

CardGridDisplay.displayName = 'CardGridDisplay';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardGridDisplay;
