import { memo, ReactElement, useMemo } from "react";

import OrderCard from "./OrderCard";
import { Item } from "../../types";
import ScrollContainer from "../containers/ScrollContainer";
import Empty from "../ui/Empty";

interface DisplayItemsProps {
  items: Item[];
  className?: string;
  err: string;
  largeDisplay: boolean;
  selectable: boolean;
  onImageClick?: (content: string | Item | null) => void;
}

const MAX_VISIBLE_ITEMS = 50;

/** DisplayItems displays the cards with simple virtualization for performance */
const DisplayItems = memo(
  ({
    items,
    className,
    err,
    largeDisplay = false,
    selectable = true,
    onImageClick,
  }: DisplayItemsProps): ReactElement => {
    // Simple virtualization: only render first N items to prevent massive DOM
    const visibleItems = useMemo(() => {
      return items.slice(0, MAX_VISIBLE_ITEMS);
    }, [items]);

    if (items.length === 0) {
      return <Empty text={err} />;
    }

    return (
      <ScrollContainer className={className}>
        {visibleItems.map((item, index) => {
          const imageLoading = index === 0 ? "eager" : "lazy";
          return (
            <OrderCard
              key={`${item.orderID}-${item.itemID}-${item.box}`}
              item={item}
              largeDisplay={largeDisplay}
              selectable={selectable}
              imageLoading={imageLoading}
              onImageClick={onImageClick}
            />
          );
        })}
        {items.length > MAX_VISIBLE_ITEMS && (
          <div className="py-4 text-center text-sm text-gray-500">
            Showing first {MAX_VISIBLE_ITEMS} of {items.length} items
          </div>
        )}
      </ScrollContainer>
    );
  }
);
DisplayItems.displayName = "DisplayItems";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default DisplayItems;
