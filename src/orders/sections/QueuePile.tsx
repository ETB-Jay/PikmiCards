// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, useMemo } from 'react';

import { Empty, ScrollContainer, FlexColCenter, OrderCard } from '../../components';
import { cn } from '../../context/functions';
import { useOrderDisplay } from '../../context/useContext';
import { Item } from '../../types';

/** QueuePile is a memoized component that renders the queue pile of items to pick. */
const QueuePile = memo((): ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const items: Item[] = useMemo(
    () => orderDisplay.flatMap((order) => order.items).filter((item) => item.status === 'queue'),
    [orderDisplay]
  );

  const content = useMemo(() => {
    if (items.length === 0) {
      return <Empty text="Queue Pile is Empty" />;
    }

    return (
      <ScrollContainer
        className={cn(
          'relative h-full w-full max-w-full flex-1 flex-row items-center px-2 flex-nowrap gap-2 overflow-x-auto'
        )}
      >
        {items.map((item, idx) => (
          <OrderCard 
            key={item.itemID} 
            item={item} 
            largeDisplay={false} 
            selectable 
            imageLoading={idx < 10 ? 'eager' : 'lazy'}
          />
        ))}
      </ScrollContainer>
    );
  }, [items]);

  return <FlexColCenter className={cn('h-full flex-1')}>{content}</FlexColCenter>;
});

QueuePile.displayName = 'QueuePile';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default QueuePile;
