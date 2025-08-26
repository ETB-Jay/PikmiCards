// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, useMemo } from "react";

import DisplayItems from "../../components/cards/DisplayItems";
import { cn } from "../../context/functions";
import { useOrderDisplay } from "../../context/useContext";
import { Item } from "../../types";

/** QueuePile is a memoized component that renders the queue pile of items to pick. */
const QueuePile = memo((): ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  const items: Item[] = useMemo(
    () => orderDisplay.flatMap((order) => order.items).filter((item) => item.status === "queue"),
    [orderDisplay]
  );

  return (
    <DisplayItems
      items={items}
      className={cn("max-w-full flex-row flex-nowrap items-center gap-2 overflow-x-auto px-2")}
      err="Queue Pile is Empty"
      largeDisplay={false}
      selectable
    />
  );
});

QueuePile.displayName = "QueuePile";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default QueuePile;
