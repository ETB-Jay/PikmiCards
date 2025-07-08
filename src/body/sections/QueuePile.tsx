// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { memo, useCallback, useMemo } from 'react';

import { useOrderDisplay, useOrders } from '../../context/useContext';
import { ScrollContainer, FlexColCenter } from '../../components/containers';
import OrderCardQueuePile from '../../components/OrderCardQueuePile';
import { ItemData } from '../../types';

/**
 * QueuePile is a memoized component that renders the queue pile of items to pick.
 */
const QueuePile = (): React.ReactElement => {
  const { selectedItems, handleSelect } = useOrderDisplay();
  const { orders } = useOrders();

  const content =
    items.length === 0 ? (
      <div className="bg-green-smoke-600/70 flex h-full w-full items-center justify-center rounded-2xl text-white ring-2 ring-green-900">
        {EMPTY_QUEUE_TEXT}
      </div>
    ) : (
      <ScrollContainer className="flex-1 flex-row">{items}</ScrollContainer>
    );

  return <FlexColCenter className="h-full min-h-20">{content}</FlexColCenter>;
};

QueuePile.displayName = 'QueuePile';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default memo(QueuePile);
