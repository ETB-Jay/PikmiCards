// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, ReactNode, useMemo } from "react";

import TagPill from "./TagPill";
import { cn } from "../../context/functions";
import { useOrderDisplay } from "../../context/useContext";
import { ItemData } from "../../types";
import FlexRow from "../containers/FlexRow";
import ClosedBoxIcon from "../icons/ClosedBoxIcon";


// ─ Interfaces ────────────────────────────────────────────────────────────────────────────────────
interface TagsProps {
  item: ItemData,
  className?: string,
}

/**
 * Tags component displays item tags (quantity, printing, box, rarity, set).
 * @param item - The item data to display tags for
 * @param className - Additional CSS classes
 */
const Tags = memo(({ item, className = "" }: TagsProps): ReactElement => {
  const { orderDisplay, numberOfBoxes } = useOrderDisplay();

  const tags = useMemo(() => {
    const tagList: { value: string; icon?: ReactNode; alt?: string; type: string }[] = [];

    if (item.itemPrinting) { tagList.push({ value: item.itemPrinting, type: "printing" }); }
    if (item.itemRarity) { tagList.push({ value: item.itemRarity, type: "rarity" }); }
    if (item.itemSet) { tagList.push({ value: item.itemSet, type: "set" }); }

    const order = orderDisplay.find((order) => order.orderID === item.orderID);
    if (order && order.box) {
      tagList.push({
        icon: <ClosedBoxIcon className="h-3 w-3 flex-shrink-0 object-contain" />,
        alt: "Box",
        value: String(order.box),
        type: "box",
      });
    }

    return tagList;
  }, [
    item.itemPrinting,
    item.itemRarity,
    item.itemSet,
    item.orderID,
    orderDisplay,
    numberOfBoxes
  ]);

  return (
    <FlexRow className={cn("min-h-[24px] flex-wrap items-center justify-start gap-x-2", className)}>
      {tags.map((tag) => (
        <TagPill
          key={`${tag.type}-${tag.value}-${item.itemID}`}
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 transition-colors",
            tag.type === "printing" && tag.value.toLowerCase().includes("foil")
              && "bg-gradient-to-br from-yellow-500 to-orange-600"
          )}
        >
          {tag.icon}
          <span className={cn("text-xs font-medium whitespace-nowrap")}>{tag.value}</span>
        </TagPill>
      ))}
    </FlexRow>
  );
}
);
Tags.displayName = "Tags";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Tags;
