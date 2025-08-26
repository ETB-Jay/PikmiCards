// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo, useCallback, useMemo } from "react";

import DisplayItems from "../../components/cards/DisplayItems";
import { cn, returnLarger } from "../../context/functions";
import { useOrderDisplay } from "../../context/useContext";
import { Filters, Item } from "../../types";

/** ToPick is a memoized component that renders a of items to pick and confirmation controls. */
const ToPick = memo(({ filters }: { filters: Filters }): ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const applyFilters = useCallback(
    (item: Item) => {
      const isEqual = (str1: string | null, str2: string): boolean => {
        return str1?.toLowerCase().includes(str2.toLowerCase()) || false;
      };
      const picked = item.status === "unPicked";
      const matchBox =
        (filters.boxMin === null && filters.boxMax === null) ||
        (item.box !== null &&
          (filters.boxMin === null || item.box >= filters.boxMin) &&
          (filters.boxMax === null || item.box <= filters.boxMax));
      const matchRarity =
        filters.rarity.size === 0 || (item.itemRarity && filters.rarity.has(item.itemRarity));
      const matchGame = filters.game === "" || isEqual(item.itemBrand, filters.game);
      const matchSet = filters.set === "" || isEqual(item.set, filters.set);
      return picked && matchBox && matchRarity && matchGame && matchSet;
    },
    [filters.boxMin, filters.boxMax, filters.game, filters.set, filters.rarity]
  );

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
