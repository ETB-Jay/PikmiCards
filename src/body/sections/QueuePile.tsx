// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { memo, useCallback, useMemo } from 'react';

import { useOrderDisplay, useOrders } from '../../context/useContext';
import { ScrollContainer, FlexColCenter } from '../../components/containers';
import OrderCardQueuePile from '../../components/OrderCardQueuePile';
import { ItemData } from '../../types';

/**
 * QueuePile section component.
 * Displays the queue of items to be picked, or a placeholder if empty.
 *
 * @module QueuePile
 */

// ─ Constants ─────────────────────────────────────────────────────────────────────────────────────────
const EMPTY_QUEUE_TEXT = 'Queue is empty';

/**
 * QueuePile is a memoized component that renders the queue pile of items to pick.
 */
const QueuePile = (): React.ReactElement => {
  const { selectedItems, handleSelect } = useOrderDisplay();
  const { orders } = useOrders();

  const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;

  const renderItem = useCallback(
    (itemID: string, index: number) => {
      let itemData: ItemData | undefined;
      for (const order of orders) {
        itemData = order.items.find((item) => item.itemID === itemID);
        if (itemData) {
          break;
        }
      }
      if (!itemData) {
        return null;
      }
      const itemKey = getItemKey(itemData, index);
      const selected = selectedItems.has(itemID);
      return (
        <OrderCardQueuePile
          key={itemKey}
          item={itemData}
          selected={selected}
          onCardClick={() => handleSelect(itemID)}
        />
      );
    },
    [orders, selectedItems, handleSelect]
  );

  const { orderDisplay } = useOrderDisplay();
  const queueItemIDs = orderDisplay.flatMap((order) =>
    order.items.filter((item) => item.status === 'queue').map((item) => item.itemID)
  );
  const items = useMemo(() => queueItemIDs.map(renderItem), [queueItemIDs, renderItem]);

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
