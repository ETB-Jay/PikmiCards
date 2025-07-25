// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from "react";

import OrderCard from "./OrderCard";
import { Item } from "../../types";
import ScrollContainer from "../containers/ScrollContainer";
import Empty from "../ui/Empty";

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface DisplayItemsProps {
  items: Item[],
  className?: string,
  err: string,
  largeDisplay: boolean,
  selectable: boolean,
  onImageClick?: (content: string | Item | null) => void,
}

/** DisplayItems displays the cards */
const DisplayItems = memo(({
  items,
  className,
  err,
  largeDisplay = false,
  selectable = true,
  onImageClick
}: DisplayItemsProps): ReactElement => {
  if (items.length === 0) { return <Empty text={err} /> }
  return (
    <ScrollContainer className={className}>
      {items.map((item) => (
        <OrderCard
          key={`${item.orderID}-${item.itemID}-${item.box}`}
          item={item}
          largeDisplay={largeDisplay}
          selectable={selectable}
          imageLoading="lazy"
          onImageClick={onImageClick}
        />
      ))}
    </ScrollContainer>
  )
});
DisplayItems.displayName = "DisplayItems";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default DisplayItems;
