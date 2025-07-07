// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useState, useCallback, memo } from 'react';

import { Order, ItemData } from '../types';
import {
  ModalContainer,
  ScrollContainer,
  FlexColCenter,
  ErrorBox,
  FlexRowBetween,
} from '../components/containers';
import OrderCardConfirmModal from '../components/OrderCardConfirmModal';
import { Button, SectionTitle, TagPill, Tags } from '../components/modal';
import { useOrderDisplay, useOrders } from '../context/useContext';
import { findOrderByID } from '../context/orderFunctions';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;
const EMPTY_TEXT = 'None';
const EMPTY_ALT = 'Empty Box';
const UNRETRIEVED_TITLE = 'Unretrieved Items';
const RETRIEVED_TITLE = 'Retrieved Items';
const NO_PREVIEW_TEXT = 'No Preview';

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface ConfirmModalProps {
  order: Order;
  onClose: () => void;
}

// ─ Components ───────────────────────────────────────────────────────────────────────────────────
/**
 * ConfirmModal displays a modal for confirming order completion and viewing item details.
 * @param order - The order to confirm.
 * @param onClose - Function to close the modal.
 * @returns {JSX.Element}
 */
const ConfirmModal = memo(({ order, onClose }: ConfirmModalProps) => {
  const { orders } = useOrders();
  const { orderDisplay, setOrderDisplay } = useOrderDisplay();
  const [previewItem, setPreviewItem] = useState<ItemData | null>(null);
  const renderItem = useCallback((item: ItemData, index: number) => {
    const itemKey = getItemKey(item, index);
    return (
      <OrderCardConfirmModal
        key={itemKey}
        item={item}
        onImageClick={() => setPreviewItem((prev) => (prev?.itemID === item.itemID ? null : item))}
      />
    );
  }, []);

  const orderData = findOrderByID(orders, order.orderID);

  if (!orderData) {
    return null;
  }

  const onConfirm = () => {
    const removeIdx = orderDisplay.findIndex(
      (orderItem) => orderItem.orderID === orderData.orderID
    );
    if (removeIdx === -1) {
      return;
    }

    const newOrderDisplay = [...orderDisplay];

    if (newOrderDisplay.length > 24) {
      // Prepare the swapped-in order with the correct box number
      const swapIdx = 24;
      const swappedOrder = { ...newOrderDisplay[swapIdx], box: removeIdx + 1 };
      swappedOrder.items = swappedOrder.items.map((item) => ({ ...item, box: removeIdx + 1 }));
      // Replace the removed order with the swapped-in order
      newOrderDisplay.splice(removeIdx, 1, swappedOrder);
      // Remove the duplicate at the end
      newOrderDisplay.splice(swapIdx, 1);
    } else {
      // Just remove the order
      newOrderDisplay.splice(removeIdx, 1);
    }

    setOrderDisplay(newOrderDisplay);
    onClose();
  };

  const unretrievedItems = order.items
    .filter((item) => item.status !== 'inBox')
    .map((item) => orderData.items.find((data) => data.itemID === item.itemID))
    .filter(Boolean) as ItemData[];
  const retrievedItems = order.items
    .filter((item) => item.status === 'inBox')
    .map((item) => orderData.items.find((data) => data.itemID === item.itemID))
    .filter(Boolean) as ItemData[];

  const Empty = () => (
    <ErrorBox className="flex h-full w-full flex-col items-center justify-center bg-green-50/10 text-center text-lg">
      <img src="/OpenBox.svg" alt={EMPTY_ALT} className="mx-auto mb-2 h-16 w-16 opacity-80" />
      {EMPTY_TEXT}
    </ErrorBox>
  );

  // Prepare variables for conditional rendering
  const unretrievedContent =
    unretrievedItems.length > 0 ? unretrievedItems.map(renderItem) : <Empty />;
  const retrievedContent = retrievedItems.length > 0 ? retrievedItems.map(renderItem) : <Empty />;
  let previewContent;
  if (previewItem) {
    previewContent = (
      <>
        <img
          src={previewItem.imageUrl}
          alt={previewItem.itemName || 'Preview'}
          className="mb-2 h-full max-h-[45vh] w-full rounded-xl object-contain"
        />
        <p className="mb-3 font-semibold text-white">{previewItem.itemName}</p>
        <div className="flex w-full flex-row flex-wrap items-center justify-center text-2xl">
          <Tags item={previewItem} />
        </div>
      </>
    );
  } else {
    previewContent = (
      <FlexColCenter className="h-full w-full text-white opacity-60">
        <span className="text-lg">{NO_PREVIEW_TEXT}</span>
      </FlexColCenter>
    );
  }

  return (
    <ModalContainer
      className=""
      onClick={(event: React.MouseEvent) => event.stopPropagation()}
      onClose={onClose}
    >
      <div className="flex min-w-[70vw] flex-row items-center justify-center gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <FlexColCenter className="w-full gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-center text-lg font-bold text-white">
                {orderData.customerName}
              </span>
              <FlexRowBetween className="gap-2">
                <TagPill className="bg-green-smoke-300/40 ring-2">{orderData.orderID}</TagPill>
                <TagPill className="bg-green-smoke-300/40 ring-2">
                  {orderData.deliveryMethod}
                </TagPill>
              </FlexRowBetween>
            </div>
            <div className="flex h-full w-full flex-1/2 flex-col gap-3">
              <SectionTitle>{UNRETRIEVED_TITLE}</SectionTitle>
              <div className="rounded-2xl bg-black/10 p-2">
                <ScrollContainer className="max-h-50 w-full flex-row flex-wrap">
                  {unretrievedContent}
                </ScrollContainer>
              </div>
              <SectionTitle>{RETRIEVED_TITLE}</SectionTitle>
              <div className="rounded-2xl bg-black/10 p-2">
                <ScrollContainer className="max-h-50 w-full flex-row flex-wrap">
                  {retrievedContent}
                </ScrollContainer>
              </div>
            </div>
            <Button label="Confirm" onClick={onConfirm} disabled={unretrievedItems.length !== 0} />
          </FlexColCenter>
        </div>

        <div className="hidden h-full min-h-[70vh] w-full flex-1/2 flex-col items-center justify-center rounded-2xl bg-black/10 p-5 md:flex">
          {previewContent}
        </div>
      </div>
    </ModalContainer>
  );
});

ConfirmModal.displayName = 'ConfirmModal';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ConfirmModal;
