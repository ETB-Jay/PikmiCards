// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, useMemo } from "react";

import TagPill from "./TagPill";
import { cn, findOrderDataByOrder } from "../../context/functions";
import { useConfirm, useOrders, useStoreLocation } from "../../context/useContext";
import { Item, Order } from "../../types";
import BasicContainer from "../containers/BasicContainer";
import CardNotPickedIcon from "../icons/CardNotPickedIcon";
import CardPickedIcon from "../icons/CardPickedIcon";
import ClosedBoxIcon from "../icons/ClosedBoxIcon";

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface CustomerInfoProps {
  order: Order;
  index: number;
}

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const CUSTOMER_INFO_ARIA_LABEL = "CUSTOMER INFO";

/**
 * @description CustomerInfo displays summary info for a single order in the grid.
 * @param order - The order data to display
 * @param index - The order's position in the grid
 */
const CustomerInfo = memo(({ order, index }: CustomerInfoProps): ReactElement | null => {
  const { openConfirm } = useConfirm();
  const { storeLocation } = useStoreLocation();
  const { orders } = useOrders();

  const retrievedCount = useMemo(
    () => order.items.filter((item: Item) => item.status === "inBox").length,
    [order.items]
  );
  const unretrievedCount = useMemo(
    () => order.items.filter((item: Item) => item.status !== "inBox").length,
    [order.items]
  );

  const orderData = findOrderDataByOrder(orders, order, storeLocation);
  if (!orderData) { return null; }

  return (
    <BasicContainer
      clickable
      className={cn(
        "h-fit max-h-8 w-[calc(50%-0.5rem)] flex-row items-center justify-between",
        "px-2 py-1 text-xs text-green-100 transition-all duration-150",
        unretrievedCount === 0 && "bg-emerald-900 hover:bg-emerald-950"
      )}
      onClick={(event) => {
        event.stopPropagation();
        openConfirm(order);
      }}
      tabIndex={0}
      role="button"
      aria-label={CUSTOMER_INFO_ARIA_LABEL}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.stopPropagation();
          openConfirm(order);
        }
      }}
    >
      <p className={cn("max-w-1/3 truncate font-semibold")}>{orderData.customerName}</p>
      <div className={cn("flex flex-row gap-2")}>
        <TagPill>
          <ClosedBoxIcon className={cn("inline-block h-4 w-4")} />
          {order.box || index}
        </TagPill>
        <TagPill>
          <CardPickedIcon className={cn("inline-block h-4 w-4")} />
          {retrievedCount}
        </TagPill>
        <TagPill>
          <CardNotPickedIcon className={cn("inline-block h-4 w-4")} />
          {unretrievedCount}
        </TagPill>
      </div>
    </BasicContainer>
  );
});
CustomerInfo.displayName = "CustomerInfo";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CustomerInfo;
