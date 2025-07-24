// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useCallback, useMemo, PropsWithChildren, ReactElement } from 'react';

import { OrderDisplayContext, OrderSelectionContext } from '../Context';

import type { Order } from '../../types';

const OrderDisplayProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [orderDisplay, setOrderDisplay] = useState<Order[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelect = useCallback((itemID: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemID)) { newSet.delete(itemID); }
      else { newSet.add(itemID); }
      return newSet;
    });
  }, []);

  const handleClear = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  const handleConfirm = useCallback(() => {
    if (selectedItems.size === 0) { return; }

    setOrderDisplay((prevOrderDisplay) => {
      const displayedOrderIDs = new Set(
        prevOrderDisplay.filter((order) => order.box !== null).map((order) => order.orderID)
      );

      let changed = false;
      const updatedOrderDisplay = prevOrderDisplay.map((order) => {
        let orderChanged = false;
        const newItems = order.items.map((item) => {
          if (selectedItems.has(item.itemID)) {
            const newStatus = displayedOrderIDs.has(order.orderID) ? 'inBox' : 'queue';
            if (item.status !== newStatus) {
              orderChanged = true;
              changed = true;
              return { ...item, status: newStatus };
            }
          }
          return item;
        });
        if (orderChanged) {
          return { ...order, items: newItems };
        }
        return order;
      });

      return changed ? updatedOrderDisplay : prevOrderDisplay;
    });

    setSelectedItems(new Set());
  }, [selectedItems]);

  const orderDisplayValue = useMemo(() => ({ orderDisplay, setOrderDisplay }), [orderDisplay]);
  const orderSelectionValue = useMemo(() => ({ selectedItems, setSelectedItems, handleSelect, handleClear, handleConfirm }), [selectedItems, handleSelect, handleClear, handleConfirm]);

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
