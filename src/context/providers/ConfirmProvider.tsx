// ─ Imports  ─────────────────────────────────────────────────────────────────────────────────────
import { useState, useCallback, useMemo, PropsWithChildren, ReactElement } from "react";

import ConfirmModal from "../../modals/ConfirmModal";
import { Order, StoreLocations } from "../../types";
import { ConfirmContext } from "../Context";
import { useOrderDisplay } from "../useContext";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const NUMBER_BOXES = 24;

const ConfirmProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [confirm, setConfirm] = useState<Order | null>(null);

  const openConfirm = (order: Order) => {
    setConfirm(order);
  };

  const closeConfirm = () => {
    setConfirm(null);
  };

  const { setOrderDisplay } = useOrderDisplay();

  const reassignBoxNumbers = useCallback((orders: Order[]): Order[] => {
    return orders.map((order, index) => ({
      ...order,
      box: index + 1,
      items: order.items.map((item) => ({
        ...item,
        box: index + 1,
      })),
    }));
  }, []);

  const onConfirm = useCallback(
    async (orderData: Order, orderDisplay: Order[], employee: string, location: StoreLocations) => {
      const removeIdx = orderDisplay.findIndex(
        (orderItem) => orderItem.orderID === orderData.orderID
      );
      if (removeIdx === -1) {
        return;
      }

      const newOrderDisplay = [...orderDisplay];

      const confirmedOrder = (): Order[] => {
        if (newOrderDisplay.length > 24) {
          const swapIdx = NUMBER_BOXES;
          const swappedOrder = { ...newOrderDisplay[swapIdx], box: removeIdx + 1 };
          swappedOrder.items = swappedOrder.items.map((item) => ({ ...item, box: removeIdx + 1 }));
          newOrderDisplay.splice(swapIdx, 1);
          return newOrderDisplay.splice(removeIdx, 1, swappedOrder);
        } else {
          return newOrderDisplay.splice(removeIdx, 1);
        }
      };

      await fetch("/api/orders/write", {
        method: "POST",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderID: confirmedOrder()[0].orderID,
          value: {
            employee,
            location,
          },
        }),
      });

      // Reassign box numbers after processing
      const reassignedOrders = reassignBoxNumbers(newOrderDisplay);
      setOrderDisplay(reassignedOrders);

      // Update sessionStorage with confirmed item IDs
      const confirmedItemIDs = new Set<string>();
      reassignedOrders.forEach((order) => {
        order.items.forEach((item) => {
          if (item.status === "inBox" || item.status === "queue") {
            confirmedItemIDs.add(item.itemID);
          }
        });
      });

      // Persist confirmed item IDs to sessionStorage
      sessionStorage.setItem("confirmed", JSON.stringify(Array.from(confirmedItemIDs)));

      closeConfirm();
    },
    [setOrderDisplay, reassignBoxNumbers]
  );

  const value = useMemo(
    () => ({ confirm, openConfirm, closeConfirm, onConfirm }),
    [confirm, onConfirm]
  );
  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {confirm && <ConfirmModal order={confirm} />}
    </ConfirmContext.Provider>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ConfirmProvider;
