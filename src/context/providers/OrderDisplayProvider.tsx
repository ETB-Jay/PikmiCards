// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useCallback, useMemo, PropsWithChildren, ReactElement } from 'react';

import { Order, ItemID, Status } from '../../types';
import { OrderDisplayContext } from '../Context';

const OrderDisplayProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [orderDisplay, setOrderDisplay] = useState<Order[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<ItemID>>(new Set());

  const handleSelect = useCallback((itemID: ItemID) => {
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
    const displayedOrderIDs = new Set(
      orderDisplay.filter((order) => order.box !== null).map((order) => order.orderID)
    );

    const updatedOrderDisplay = orderDisplay.map((order) => ({
      ...order,
      items: order.items.map((item) =>
        selectedItems.has(item.itemID)
          ? {
              ...item,
              status: (displayedOrderIDs.has(item.orderID) ? 'inBox' : 'queue') as Status,
            }
          : item
      ),
    }));
    setOrderDisplay(updatedOrderDisplay);
    setSelectedItems(new Set());
  }, [orderDisplay, selectedItems]);

  const value = useMemo(
    () => ({
      orderDisplay,
      setOrderDisplay,
      selectedItems,
      setSelectedItems,
      handleSelect,
      handleConfirm,
      handleClear,
    }),
    [orderDisplay, selectedItems, handleSelect, handleConfirm, handleClear]
  );

  return <OrderDisplayContext.Provider value={value}>{children}</OrderDisplayContext.Provider>;
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default OrderDisplayProvider;
