// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo, useCallback, useMemo } from "react";

import DisplayItems from "../../components/cards/DisplayItems";
import { cn, returnLarger } from "../../context/functions";
import { useOrderDisplay } from "../../context/useContext";
import { Filters, Item } from "../../types";

/** ToPick is a memoized component that renders a of items to pick and confirmation controls. */
const ToPick = memo(({ filters }: { filters: Filters }): ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const applyFilters = useCallback((item: Item) => {
    const isEqual = (str1: string | null, str2: string): boolean => (
      str1?.toLowerCase().includes(str2.toLowerCase()) || false
    );
    const picked = (item.status === "unPicked");
    const matchBox = filters.box ? item.box === filters.box : true;
    const matchGame = isEqual(item.itemBrand, filters.game);
    const matchSet = isEqual(item.set, filters.set);
    return picked && matchBox && matchGame && matchSet;
  }, [filters.box, filters.game, filters.set]);

  const items: Item[] = useMemo(() => {
    return orderDisplay
      .flatMap((order) => order.items)
      .filter(applyFilters)
      .sort(returnLarger);
  }, [orderDisplay, applyFilters]);

  return (
    <DisplayItems
      items={items}
      className={cn("relative max-h-[86vh] flex-1 p-2")}
      err="No Items to Pick"
      largeDisplay
      selectable
    />
  );
});
ToPick.displayName = "ToPick";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ToPick;
