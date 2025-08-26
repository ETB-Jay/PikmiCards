// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useCallback, useMemo, PropsWithChildren, ReactElement, useEffect } from "react";

import { OrderDisplayContext, OrderSelectionContext } from "../Context";

import type { Order, Status } from "../../types";

const OrderDisplayProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [orderDisplay, setOrderDisplay] = useState<Order[]>([]);
  const [numberOfBoxes, setNumberOfBoxes] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [confirmedItemIDs, setConfirmedItemIDs] = useState<Set<string>>(new Set());

  // Load selected items and confirmed item IDs from sessionStorage on mount
  useEffect(() => {
    const selected = sessionStorage.getItem("selected");
    if (selected) {
      setSelectedItems(new Set(JSON.parse(selected)));
    }

    const confirmed = sessionStorage.getItem("confirmed");
    if (confirmed) {
      setConfirmedItemIDs(new Set(JSON.parse(confirmed)));
    }
  }, []);

  // Apply confirmed status when order display changes
  useEffect(() => {
    if (orderDisplay.length > 0 && confirmedItemIDs.size > 0) {
      const displayedOrderIDs = new Set(
        orderDisplay.filter((order) => order.box !== null).map((order) => order.orderID)
      );

      const updatedOrderDisplay = orderDisplay.map((order) => {
        const newItems = order.items.map((item) => {
          if (confirmedItemIDs.has(item.itemID)) {
            const newStatus: Status = displayedOrderIDs.has(order.orderID) ? "inBox" : "queue";
            return { ...item, status: newStatus };
          }
          return item;
        });

        return { ...order, items: newItems };
      });

      // Only update if there are actual changes
      const hasChanges = updatedOrderDisplay.some(
        (order, index) => JSON.stringify(order.items) !== JSON.stringify(orderDisplay[index].items)
      );

      if (hasChanges) {
        setOrderDisplay(updatedOrderDisplay);
      }
    }
  }, [orderDisplay, confirmedItemIDs]);

  // Update numberOfBoxes when orderDisplay changes
  useEffect(() => {
    const boxedOrders = orderDisplay.filter((order) => order.box !== null);
    const newNumberOfBoxes = boxedOrders.length;
    // eslint-disable-next-line no-console
    console.log("OrderDisplayProvider: Updating numberOfBoxes", {
      totalOrders: orderDisplay.length,
      boxedOrders: boxedOrders.length,
      newNumberOfBoxes,
      currentNumberOfBoxes: numberOfBoxes,
    });
    setNumberOfBoxes(newNumberOfBoxes);
  }, [orderDisplay]);

  const handleSelect = useCallback((itemID: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemID)) {
        newSet.delete(itemID);
        sessionStorage.setItem("selected", JSON.stringify(Array.from(newSet)));
      } else {
        newSet.add(itemID);
        sessionStorage.setItem("selected", JSON.stringify(Array.from(newSet)));
      }
      return newSet;
    });
  }, []);

  const handleClear = useCallback(() => {
    setSelectedItems(new Set());
    sessionStorage.setItem("selected", JSON.stringify([]));
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

      const finalOrderDisplay = hasOrderChanges ? updatedOrderDisplay : prevOrderDisplay;

      // Get all confirmed item IDs from the updated order display
      const newConfirmedItemIDs = new Set<string>();
      finalOrderDisplay.forEach((order) => {
        order.items.forEach((item) => {
          if (item.status === "inBox" || item.status === "queue") {
            newConfirmedItemIDs.add(item.itemID);
          }
        });
      });

      // Update confirmed item IDs state and sessionStorage
      setConfirmedItemIDs(newConfirmedItemIDs);
      sessionStorage.setItem("confirmed", JSON.stringify(Array.from(newConfirmedItemIDs)));

      return finalOrderDisplay;
    });

    // Clear selected items and persist to sessionStorage
    setSelectedItems(new Set());
    sessionStorage.setItem("selected", JSON.stringify([]));
  }, [selectedItems]);

  const orderDisplayValue = useMemo(
    () => ({
      orderDisplay,
      setOrderDisplay,
      numberOfBoxes,
      setNumberOfBoxes,
    }),
    [orderDisplay, numberOfBoxes]
  );
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
