// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, useMemo } from 'react';

import { Empty, ScrollContainer, FlexColCenter, OrderCard } from '../../components';
import { cn } from '../../context/functions';
import { useOrderDisplay } from '../../context/useContext';
import { Item } from '../../types';

/** QueuePile is a memoized component that renders the queue pile of items to pick. */
const QueuePile = (): ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const items: Item[] = useMemo(
    () => orderDisplay.flatMap((order) => order.items).filter((items) => items.status === 'queue'),
    [orderDisplay]
  );

  const content = useMemo(
    () =>
      items.length === 0 ? (
        <Empty text="Queue Pile is Empty" />
      ) : (
        <ScrollContainer
          className={cn(
            'relative h-full w-full max-w-full flex-1 flex-row flex-nowrap items-center justify-center gap-2 overflow-x-auto'
          )}
        >
          {items.map((item) => (
            <OrderCard key={item.itemID} item={item} largeDisplay={false} selectable />
          ))}
        </ScrollContainer>
      ),
    [items]
  );

  return <FlexColCenter className={cn('h-full flex-1')}>{content}</FlexColCenter>;
};

QueuePile.displayName = 'QueuePile';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default memo(QueuePile);
