// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo, useCallback, useMemo } from 'react';

import { Empty, ScrollContainer, OrderCard } from '../../components';
import { cn, returnLarger } from '../../context/functions';
import { useOrderDisplay } from '../../context/useContext';
import { Filters, Item } from '../../types';

const DisplayItems = memo(({ items }: { items: Item[] }) => {
  return items.length > 0 ? (
    items.map((item: Item, idx: number) => {
      const loading = idx === 0 ? 'eager' : 'lazy';
      return (
        <OrderCard
          key={item.orderID + item.itemID + item.box}
          item={item}
          largeDisplay
          selectable
          imageLoading={loading}
        />
      )
    })
  ) : (
    <Empty text="No Items to Pick" />
  );
});
DisplayItems.displayName = 'DisplayItems';

/** ToPick is a memoized component that renders the list of items to pick and confirmation controls. */
const ToPick = ({ filters }: { filters: Filters }): ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const applyFilters = useCallback((item: Item) => {
    const matchBox = filters.box ? item.box === filters.box : true;
    const matchGame = filters.game ? item.itemBrand?.toLowerCase().includes(filters.game.toLowerCase()) || false : true;
    const matchSet = filters.set ? item.set.toLowerCase().includes(filters.set.toLowerCase()) : true;
    return matchBox && matchGame && matchSet;
  }, [filters]);

  const items: Item[] = useMemo(() => {
    return orderDisplay
      .flatMap((order) => order.items)
      .filter((item) => item.status === "unPicked")
      .filter(applyFilters)
      .sort(returnLarger);
  }, [orderDisplay, applyFilters]);

  return (
    <ScrollContainer className={cn("relative max-h-[86vh] flex-1 p-2")}>
      <DisplayItems items={items} />
    </ScrollContainer>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ToPick;
