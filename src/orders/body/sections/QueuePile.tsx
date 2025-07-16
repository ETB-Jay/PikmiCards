// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { useOrderDisplay } from '../../../context/useContext';
import { ScrollContainer, FlexColCenter } from '../../../components/containers';
import { Item } from '../../../types';
import OrderCard from '../../components/OrderCard';
import { cn } from '../../../context/functions';
import { Empty } from '../../../components/formComponents';

/**
 * @description QueuePile is a memoized component that renders the queue pile of items to pick.
 */
const QueuePile = (): React.ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const items: Item[] = orderDisplay
    .flatMap((order) => order.items)
    .filter((items) => items.status === 'queue');

  const content =
    items.length === 0 ? (
      <Empty text='Queue Pile is Empty' />
    ) : (
      <ScrollContainer className={cn("flex-row flex-1 items-center justify-center")}>
        {items.map((item) => (
          <OrderCard key={item.itemID} item={item} largeDisplay={false} selectable />
        ))}
      </ScrollContainer>
    );

  return <FlexColCenter className={cn("h-full min-h-20")}>{content}</FlexColCenter>;
};

QueuePile.displayName = 'QueuePile';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default memo(QueuePile);
