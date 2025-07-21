// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo, useMemo } from 'react';

import { Empty, ScrollContainer, OrderCard } from '../../components';
import { cn, returnLarger } from '../../context/functions';
import { useOrderDisplay } from '../../context/useContext';
import { Item } from '../../types';

/** ToPick is a memoized component that renders the list of items to pick and confirmation controls. */
const ToPick = (): ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const DisplayItems = memo(({ items }: { items: Item[] }) => {
    return items.length > 0 ? (
      items.map((item: Item) => (
        <OrderCard
          key={item.orderID + item.itemID + item.box}
          item={item}
          largeDisplay
          selectable
        />
      ))
    ) : (
      <Empty text="No Items to Pick" />
    );
  });
  DisplayItems.displayName = 'DisplayItems';

  const items: Item[] = useMemo(() => {
    return orderDisplay
      .flatMap((order) => order.items)
      .filter((item) => item.status === 'unPicked')
      .sort(returnLarger);
  }, [orderDisplay]);

  return (
    <ScrollContainer className={cn('relative max-h-[86vh] flex-1 p-2')}>
      <DisplayItems items={items} />
    </ScrollContainer>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ToPick;
