// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useState, memo, useMemo } from "react";

import {
  Button,
  Empty,
  ImageDisplay,
  FlexColCenter,
  FlexRow,
  ModalContainer,
  SelectEmployee,
  Tags,
  TagPill,
  EmptyImage,
  DisplayItems,
  Text,
} from "../components";
import { findOrderDataByOrder, cn, getLast } from "../context/functions";
import { useConfirm, useStoreLocation, useOrderDisplay, useOrders } from "../context/useContext";
import { Order, OrderData, Item, ItemData, StoreLocations } from "../types";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const UNRETRIEVED_TITLE = "Unretrieved Items";
const RETRIEVED_TITLE = "Retrieved Items";
const EMPTY_PREVIEW_ALT = "No preview selected";

/** TagPillContent renders a label-value pair for use in a TagPill. */
const TagPillContent = ({ label, value }: { label: string; value: string | null | undefined }) => {
  const colon = ":";
  return [
    <span key="label" className="mr-1 font-bold">
      {String(label)}
      {colon}
    </span>,
    <span key="value" className="font-normal">
      {value ?? ""}
    </span>,
  ];
};

/** Returns an array of order field objects for tag display. */
const getOrderFields = (orderData: OrderData) => [
  {
    label: "Order Number",
    value: orderData.orderNumber,
  },
  { label: "Delivery", value: orderData.deliveryMethod },
  { label: "Email", value: orderData.email },
  { label: "Phone", value: orderData.phone },
  { label: "Requires Shipping", value: orderData.requiresShipping ? "Yes" : "No" },
  { label: "Paid", value: orderData.paid },
];

/** Renders tag pills for customer/order fields. */
const CustomerTags = (orderFields: { label: string; value: string | null | undefined }[]) => (
  <div className="my-2 flex w-full flex-wrap items-center justify-center gap-2">
    {orderFields
      .filter(({ value }) => value)
      .map(({ label, value }) => (
        <TagPill key={label}>{TagPillContent({ label, value })}</TagPill>
      ))}
  </div>
);

/** Gets the full ItemData for a given Item using the orders context */
const getItemData = (
  item: Item,
  orders: OrderData[],
  storeLocation: StoreLocations
): ItemData | undefined => (
  findItemDataByOrder(orders, item, storeLocation)
);

/** Helper function to find ItemData by Item and location */
const findItemDataByOrder = (
  orders: OrderData[],
  item: Item,
  storeLocation: StoreLocations
): ItemData | undefined => {
  const orderData = orders.find(
    (order) => order.orderID === item.orderID && order.fulfillmentLocation.includes(storeLocation)
  );
  return orderData?.items.find((itemData) => itemData.itemID === item.itemID);
};

/** PreviewContent displays a preview of the selected item, or a placeholder if none is selected. */
const PreviewContent = memo(({ previewItem, orders, storeLocation }: {
  previewItem: Item | null;
  orders: OrderData[];
  storeLocation: StoreLocations;
}) => {
  const itemData = previewItem ? getItemData(previewItem, orders, storeLocation) : null;

  return itemData ? (
    <div className={cn("flex flex-col items-center gap-2")}>
      <ImageDisplay
        imageUrl={itemData.imageUrl}
        className={cn("h-full max-h-80 w-auto")}
        mode="fullscreen"
        loading="eager"
      />
      <span className={cn("text-green-smoke-100 truncate text-sm font-medium whitespace-nowrap")}>
        {itemData.itemName}
      </span>
      <Tags item={itemData} className="items-center justify-center" />
    </div>
  ) : (
    <div className={cn("flex h-full w-full flex-col items-center justify-center")}>
      <EmptyImage className="mb-2 h-40 w-auto opacity-60" />
      <span className="text-gray-400">{EMPTY_PREVIEW_ALT}</span>
    </div>
  );
});
PreviewContent.displayName = "PreviewContent";

/** ItemContentSection renders a section with title and items display */
const ItemContentSection = memo(({ title, items, onImageClick }: {
  title: string,
  items: Item[],
  onImageClick: (content: string | Item | null) => void,
}) => {
  const content = items.length === 0 ? (
    <Empty text="No items" />
  ) : (
    <DisplayItems
      items={items}
      className={cn("rounded-2xl bg-black/10 p-2 max-h-35 w-full flex-row flex-wrap")}
      err="No items"
      selectable={false}
      largeDisplay={false}
      onImageClick={onImageClick}
    />
  );

  return (
    <>
      <Text text={title} />
      {content}
    </>
  );
});
ItemContentSection.displayName = "ItemContentSection";

/** ConfirmModal displays a modal for confirming order completion and viewing item details. */
const ConfirmModal = memo(({ order }: { order: Order }) => {
  const { orders } = useOrders();
  const { orderDisplay } = useOrderDisplay();
  const { onConfirm } = useConfirm();
  const { storeLocation } = useStoreLocation();
  const [previewItem, setPreviewItem] = useState<Item | null>(null);
  const [employee, setEmployee] = useState<string>("");

  // Find the order data for the current order and location
  const orderData = findOrderDataByOrder(orders, order, storeLocation);

  const getItemsByFilter = (order: Order, filterFn: (status: string) => boolean) => (
    order.items.filter((item) => filterFn(item.status)).filter(Boolean)
  );

  const unretrievedItems = useMemo(() =>
    getItemsByFilter(order, (status) => status !== "inBox")
    , [order]);

  const retrievedItems = useMemo(() =>
    getItemsByFilter(order, (status) => status === "inBox")
    , [order]);

  /** Handler for image click to set preview item. */
  const handleImageClick = (content: string | Item | null) => {
    if (content && typeof content === "object" && "itemID" in content) { setPreviewItem(content); }
    else { setPreviewItem(null); }
  };

  /** Handler for confirming the order. */
  const handleConfirm = () => { onConfirm(order, orderDisplay, employee, storeLocation); };

  /** Only allow confirm if all items are retrieved and an employee is selected. */
  const canConfirm = useMemo(() =>
    (retrievedItems.length === order.items.length) && employee
    , [retrievedItems, order.items, employee]);

  const orderLink = useMemo(() =>
    `https://admin.shopify.com/store/enter-the-battlefield/orders/${getLast(order.orderID, "/")}`
    , [])

  if (!orderData) { return null; }

  return (
    <ModalContainer>
      <div
        className={cn("flex min-w-[70vw] flex-row items-center justify-center gap-5")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={cn("flex w-full flex-col items-center justify-center gap-4")}>
          <FlexColCenter className={cn("w-full gap-4")}>
            <div className={cn("flex flex-col gap-2")}>
              <a
                href={orderLink}
                className={
                  cn("w-full text-center text-lg font-bold text-white",
                    "hover:text-gray-400 transition-colors")
                }
                target="_blank"
                rel="noreferrer"
              >
                <span id="modal-title">
                  {orderData.customerName}
                </span>
              </a>
              {CustomerTags(getOrderFields(orderData))}
            </div>
            <div className={cn("flex h-full w-full flex-1/2 flex-col gap-3")}>
              <ItemContentSection
                title={UNRETRIEVED_TITLE}
                items={unretrievedItems}
                onImageClick={handleImageClick}
              />
              <ItemContentSection
                title={RETRIEVED_TITLE}
                items={retrievedItems}
                onImageClick={handleImageClick}
              />
            </div>
            <FlexRow className={cn("!flex-nowrap justify-center gap-4")}>
              <SelectEmployee confirmedEmployee={employee} setConfirmedEmployee={setEmployee} />
              <Button
                icon={<ThumbUpAltIcon fontSize="small" />}
                label="Confirm"
                onAction={handleConfirm}
                disabled={!canConfirm}
              />
            </FlexRow>
          </FlexColCenter>
        </div>
        <div
          className={cn(
            "hidden flex-col items-center justify-center rounded-2xl bg-black/10 p-2 md:flex"
          )}
        >
          <PreviewContent previewItem={previewItem} orders={orders} storeLocation={storeLocation} />
        </div>
      </div>
    </ModalContainer>
  );
});
ConfirmModal.displayName = "ConfirmModal";

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────
export default ConfirmModal;