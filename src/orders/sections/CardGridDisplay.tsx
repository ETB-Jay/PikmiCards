// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, useCallback, useMemo, useState, useEffect } from "react";

import {
  Empty,
  CustomerInfo,
  FlexRow,
  InputField,
  Button,
  ScrollContainer,
  OpenBoxIcon,
  ClosedBoxIcon
} from "../../components";
import { useOrderDisplay } from "../../context/useContext";
import { Order } from "../../types";

/** CardGridDisplay displays a grid of customer orders or an empty state. */
const CardGridDisplay = memo((): ReactElement => {
  const { orderDisplay, numberOfBoxes, setNumberOfBoxes, setOrderDisplay } = useOrderDisplay();
  const [tempNumberOfBoxes, setTempNumberOfBoxes] = useState<number>(numberOfBoxes);

  // Sync tempNumberOfBoxes with numberOfBoxes when it changes
  useEffect(() => {
    setTempNumberOfBoxes(numberOfBoxes);
  }, [numberOfBoxes]);

  const reassignBoxNumbers = useCallback((orders: Order[], numBoxes: number): Order[] => {
    return orders.map((order, index) => {
      const boxNumber = index < numBoxes ? index + 1 : null;
      return {
        ...order,
        box: boxNumber,
        items: order.items.map((item) => ({
          ...item,
          box: boxNumber,
        })),
      };
    });
  }, []);

  const ConfirmNumberOfBoxes = useCallback(() => {
    if (tempNumberOfBoxes <= 0 || tempNumberOfBoxes > orderDisplay.length) { return false; }
    setNumberOfBoxes(tempNumberOfBoxes);
    
    // Reassign box numbers only to orders that will be displayed in the grid
    const reassignedOrders = reassignBoxNumbers(orderDisplay, tempNumberOfBoxes);
    setOrderDisplay(reassignedOrders);
  }, [
    tempNumberOfBoxes, 
    orderDisplay.length, 
    setNumberOfBoxes, 
    orderDisplay, 
    reassignBoxNumbers, 
    setOrderDisplay
  ])

  const numberOfBoxesError = useMemo(() => {
    if (tempNumberOfBoxes <= 0) { return "Must be greater than 0!"; }
    return "";
  }, [tempNumberOfBoxes, orderDisplay.length]);

  if (orderDisplay.length === 0) { return <Empty text="No Orders Left" />; }

  return (
    <>
      <FlexRow className="flex-nowrap w-full mb-2">
        <InputField
          icon={<OpenBoxIcon stroke="black" width={24} height={24} />}
          label="Number of Boxes"
          value={tempNumberOfBoxes}
          onChange={(ev) => setTempNumberOfBoxes(Number(ev.target.value))}
          err={numberOfBoxesError}
          type="number"
          max={orderDisplay.length}
          min={1}
          autoComplete="off"
        />
        <Button
          onAction={ConfirmNumberOfBoxes}
          disabled={Boolean(numberOfBoxesError)}
          icon={<ClosedBoxIcon stroke="black" width={24} height={24} />}
          label="Apply"
        />
      </FlexRow>
      <ScrollContainer className="relative flex-row flex-wrap gap-2 p-2 max-h-96 overflow-y-auto">
        {orderDisplay
          .slice(0, numberOfBoxes)
          .map((order: Order, idx: number) => (
            <CustomerInfo key={order.orderID} order={order} index={idx + 1} />
          ))}
      </ScrollContainer>
    </>
  );
});

CardGridDisplay.displayName = "CardGridDisplay";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardGridDisplay;
