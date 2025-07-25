// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useCallback, useMemo, PropsWithChildren, ReactElement } from "react";

import { OrderDisplayContext, OrderSelectionContext } from "../Context";

import type { Order, Status } from "../../types";

const OrderDisplayProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [orderDisplay, setOrderDisplay] = useState<Order[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelect = useCallback((itemID: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemID)) {
        newSet.delete(itemID);
      } else {
        newSet.add(itemID);
      }
      return newSet;
    });
  }, []);

  const handleClear = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  const handleConfirm = useCallback(() => {
    if (selectedItems.size === 0) {
      return;
    }

    setOrderDisplay((prevOrderDisplay) => {
      const displayedOrderIDs = new Set(
        prevOrderDisplay.filter((order) => order.box !== null).map((order) => order.orderID)
      );

      const updatedOrderDisplay = prevOrderDisplay.map((order) => {
        const newItems = order.items.map((item) => {
          if (selectedItems.has(item.itemID)) {
            const newStatus: Status = displayedOrderIDs.has(order.orderID) ? "inBox" : "queue";
            if (item.status !== newStatus) {
              return { ...item, status: newStatus };
            }
          }
          return item;
        });

        // Check if any items were actually changed by comparing references
        const hasChanges = newItems.some((newItem, index) => newItem !== order.items[index]);
        return hasChanges ? { ...order, items: newItems } : order;
      });

      // Check if any orders were actually changed by comparing references
      const hasOrderChanges = updatedOrderDisplay.some(
        (order, index) => order !== prevOrderDisplay[index]
      );
      return hasOrderChanges ? updatedOrderDisplay : prevOrderDisplay;
    });

    setSelectedItems(new Set());
  }, [selectedItems]);

  const orderDisplayValue = useMemo(() => ({ orderDisplay, setOrderDisplay }), [orderDisplay]);
  const orderSelectionValue = useMemo(
    () => ({ selectedItems, setSelectedItems, handleSelect, handleClear, handleConfirm }),
    [selectedItems, handleSelect, handleClear, handleConfirm]
  );

  return (
    <OrderDisplayContext.Provider value={orderDisplayValue}>
      <OrderSelectionContext.Provider value={orderSelectionValue}>
        {children}
      </OrderSelectionContext.Provider>
    </OrderDisplayContext.Provider>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default OrderDisplayProvider;
