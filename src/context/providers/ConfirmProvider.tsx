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

      setOrderDisplay(newOrderDisplay);
      closeConfirm();
    },
    [setOrderDisplay]
  );

  const value = useMemo(
    () => ({ confirm, openConfirm, closeConfirm, onConfirm }),
    [confirm, onConfirm, closeConfirm, onConfirm]
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
