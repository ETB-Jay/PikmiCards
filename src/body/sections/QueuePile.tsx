// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { useOrderDisplay } from '../../context/useContext';
import { ScrollContainer, FlexColCenter } from '../../components/containers';
import { Item } from '../../types';
import OrderCard from '../../components/OrderCard';

const EMPTY_QUEUE_TEXT = 'Queue is empty';

/** @description QueuePile is a memoized component that renders the queue pile of items to pick. */
const QueuePile = (): React.ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const items: Item[] = orderDisplay
    .flatMap((order) => order.items)
    .filter((items) => items.status === 'queue');

  const content =
    items.length === 0 ? (
      <div className="bg-green-smoke-600/70 flex h-full w-full items-center justify-center rounded-2xl text-white ring-2 ring-green-900">
        {EMPTY_QUEUE_TEXT}
      </div>
    ) : (
      <ScrollContainer className="flex-1 flex-row">
        {items.map((item) => (
          <OrderCard key={item.itemID} item={item} largeDisplay={false} selectable />
        ))}
      </ScrollContainer>
    );

  return <FlexColCenter className="h-full min-h-20">{content}</FlexColCenter>;
};

QueuePile.displayName = 'QueuePile';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default memo(QueuePile);
