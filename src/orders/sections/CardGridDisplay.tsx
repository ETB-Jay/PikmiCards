// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from "react";

import { Empty, CustomerInfo } from "../../components";
import { useOrderDisplay } from "../../context/useContext";
import { Order } from "../../types";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const NUMBER_BOXES = 24;

/** CardGridDisplay displays a grid of customer orders or an empty state. */
const CardGridDisplay = memo((): ReactElement => {
  const { orderDisplay } = useOrderDisplay();

  if (orderDisplay.length === 0) { return <Empty text="No Orders Left" />; }

  return (
    <>
      {orderDisplay
        .slice(0, NUMBER_BOXES)
        .map((order: Order, idx: number) => (
          <CustomerInfo key={order.orderID} order={order} index={idx + 1} />
        ))}
    </>
  );
});

CardGridDisplay.displayName = "CardGridDisplay";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardGridDisplay;
