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

  const tagClasses = (type: string) => {
    const commonClass = (item.itemRarity === "Common") && "from-gray-700 to-gray-500";
    const uncommonClass = (item.itemRarity === "Uncommon") && "from-gray-800 to-blue-950";
    const rareClass = (item.itemRarity === "Rare") && "from-yellow-900 to-yellow-500";
    const mythicClass = (item.itemRarity === "Mythic") && "from-orange-900 to-orange-500";
    const foilClass = (item.itemPrinting?.toLowerCase().includes("foil")) && "from-red-500 via-emerald-500 to-purple-500";

    return cn(
      type === "rarity" && commonClass,
      type === "rarity" && uncommonClass,
      type === "rarity" && rareClass,
      type === "rarity" && mythicClass,
      type === "printing" && foilClass
    );
  };

  return (
    <FlexRow className={cn("min-h-[24px] flex-wrap items-center justify-start gap-x-2", className)}>
      {tags.map((tag) => (
        <TagPill
          key={`${tag.type}-${tag.value}-${item.itemID}`}
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 transition-colors",
            "bg-gradient-to-br from-green-900 to-green-900",
            tagClasses(tag.type)
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
