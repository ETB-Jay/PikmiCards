// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ReactElement, useState } from "react";

import { ModalConfirmButton, ModalContainer, SelectEmployee } from "../components";
import { cn, getLast } from "../context/functions";
import { useConfirmAll, useOrderDisplay, useStoreLocation } from "../context/useContext";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const CONFIRM_ALL_MODAL_TITLE = "Confirm All";
const CONFIRM_ALL_MODAL_MESSAGE = "Are you sure you want to confirm all?";
const CONFIRM_ALL_MODAL_CONFIRM = "Confirm";
const CONFIRM_ALL_MODAL_CLOSE = "Close";

/** ConfirmAllModal displays a modal for confirming all. */
const ConfirmAllModal = (): ReactElement => {
  const { setConfirmAll } = useConfirmAll();
  const { orderDisplay, setOrderDisplay } = useOrderDisplay();
  const { storeLocation } = useStoreLocation();
  const [employee, setEmployee] = useState<string>("");

  return (
    <ModalContainer>
      <h2 className={cn("text-xl font-bold text-white")}>{CONFIRM_ALL_MODAL_TITLE}</h2>
      <p className={cn("text-gray-200")}>{CONFIRM_ALL_MODAL_MESSAGE}</p>
      <div className="flex max-h-30 flex-col overflow-y-auto rounded-lg border border-green-200 bg-green-50">
        {orderDisplay
          .filter(
            (order) => order.box !== null && order.items.every((item) => item.status === "inBox")
          )
          .map((order, index) => (
            <button
              key={order.orderID}
              type="button"
              onClick={() =>
                window.open(
                  `https://admin.shopify.com/store/enter-the-battlefield/orders/${getLast(order.orderID, "/")}`,
                  "_blank"
                )
              }
              className={`flex w-full cursor-pointer items-center justify-between gap-2 p-2 text-left text-xs text-white transition-all hover:brightness-90 ${
                index % 2 === 0 ? "bg-green-smoke-600" : "bg-green-smoke-500"
              }`}
            >
              <span className="font-semibold">Box {order.box}</span>#{order.orderID}
            </button>
          ))}
      </div>
      <SelectEmployee confirmedEmployee={employee} setConfirmedEmployee={setEmployee} />
      <div className="mt-2 flex flex-row justify-center gap-4">
        <ModalConfirmButton
          onAction={async () => {
            const ordersToConfirm = orderDisplay.filter(
              (order) => order.box !== null && order.items.every((item) => item.status === "inBox")
            );

            // Confirm all orders via API - batch the metafield updates
            const metafieldUpdates = ordersToConfirm.map((order) => ({
              orderID: order.orderID,
              value: {
                employee,
                location: storeLocation,
              },
            }));

            // Send all updates in a single request
            await fetch("/api/orders/write", {
              method: "POST",
              // eslint-disable-next-line @typescript-eslint/naming-convention
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(metafieldUpdates),
            });

            // Remove confirmed orders from display and reassign box numbers
            const remainingOrders = orderDisplay.filter(
              (order) => !ordersToConfirm.some((confirmed) => confirmed.orderID === order.orderID)
            );

            const reassignedOrders = remainingOrders.map((order, index) => ({
              ...order,
              box: index + 1,
              items: order.items.map((item) => ({
                ...item,
                box: index + 1,
              })),
            }));

            // Update sessionStorage: remove confirmed item IDs and keep remaining ones
            const currentConfirmedItemIDs = new Set<string>();
            const confirmed = sessionStorage.getItem("confirmed");
            if (confirmed) {
              JSON.parse(confirmed).forEach((itemID: string) =>
                currentConfirmedItemIDs.add(itemID)
              );
            }

            // Remove item IDs from confirmed orders
            ordersToConfirm.forEach((order) => {
              order.items.forEach((item) => {
                currentConfirmedItemIDs.delete(item.itemID);
              });
            });

            // Add item IDs from remaining orders that are still confirmed
            remainingOrders.forEach((order) => {
              order.items.forEach((item) => {
                if (item.status === "inBox" || item.status === "queue") {
                  currentConfirmedItemIDs.add(item.itemID);
                }
              });
            });

            // Update sessionStorage with the filtered confirmed item IDs
            sessionStorage.setItem(
              "confirmed",
              JSON.stringify(Array.from(currentConfirmedItemIDs))
            );

            setOrderDisplay(reassignedOrders);
            setConfirmAll(false);
          }}
          disabled={!employee}
          icon={<CheckIcon />}
          label={CONFIRM_ALL_MODAL_CONFIRM}
          color="green"
        />
        <ModalConfirmButton
          onAction={() => setConfirmAll(false)}
          icon={<CloseIcon />}
          label={CONFIRM_ALL_MODAL_CLOSE}
          color="gray"
        />
      </div>
    </ModalContainer>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ConfirmAllModal;
