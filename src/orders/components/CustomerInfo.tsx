// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import {memo} from "react";

import { Order, Item } from "../../types";
import { useConfirm, useLocation, useOrders } from "../../context/useContext";
import { findOrderDataByOrder, cn } from "../../context/functions";

import { TagPill } from "./Tags";

interface CustomerInfoProps {
  order: Order;
  index: number;
}

/**
 * @description CustomerInfo displays summary info for a single order in the grid.
 */
const CustomerInfo = memo(({ order, index }: CustomerInfoProps) => {
  const { openConfirm } = useConfirm();
  const { location } = useLocation();
  const { orders } = useOrders();

  const orderData = findOrderDataByOrder(orders, order, location);
  if (!orderData) { return null; }

  const ariaLabel = `Order for ${orderData.customerName}`;

  const retrievedCount = order.items.filter((item: Item) => item.status === 'inBox').length;
  const unretrievedCount = order.items.filter((item: Item) => item.status !== 'inBox').length;

  return (
    <div
      className={cn("bg-green-smoke-600/60 hover:bg-green-smoke-600/70 relative flex w-[calc(50%-0.2rem)] h-fit max-h-8 cursor-pointer flex-row items-center justify-between overflow-hidden rounded-lg border-2 border-green-950 p-2 text-xs text-green-100 shadow backdrop-blur-md transition-all duration-150 hover:scale-[1.01] hover:shadow-lg")}
      onClick={(event) => {
        event.stopPropagation();
        openConfirm(order);
      }}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.stopPropagation();
          openConfirm(order);
        }
      }}
    >
      <p className={cn("font-semibold truncate max-w-1/3")}>{orderData.customerName}</p>
      <div className={cn("flex flex-row gap-2")}>
        <TagPill>
          <img src="/ClosedBox.svg" alt="" className={cn("inline-block w-4 h-4 mr-1 align-middle")} />
          {index}
        </TagPill>
        <TagPill>
          <img src="/Picked.svg" alt="" className={cn("inline-block w-4 h-4 mr-1 align-middle")} />
          {retrievedCount}
        </TagPill>
        <TagPill>
          <img src="/NotPicked.svg" alt="" className={cn("inline-block w-4 h-4 mr-1 align-middle")} />
          {unretrievedCount}
        </TagPill>
      </div>
    </div>
  );
});

CustomerInfo.displayName = 'CustomerInfo';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CustomerInfo; 
