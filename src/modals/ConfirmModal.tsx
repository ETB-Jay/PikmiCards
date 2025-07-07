// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useState, useCallback, memo } from 'react';

import { Order, ItemData } from '../types';
import { ModalContainer, ScrollContainer, FlexColCenter, ErrorBox, FlexRowBetween } from '../components/containers';
import OrderCardConfirmModal from '../components/OrderCardConfirmModal';
import { Button, SectionTitle, TagPill, Tags } from '../components/modal';
import { useOrderDisplay, useOrders } from '../context/useContext';
import { findOrderByID } from '../context/orderFunctions';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;
const EMPTY_TEXT = "None";
const EMPTY_ALT = "Empty Box";
const UNRETRIEVED_TITLE = "Unretrieved Items";
const RETRIEVED_TITLE = "Retrieved Items";
const NO_PREVIEW_TEXT = "No Preview";

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface ConfirmModalProps {
  order: Order;
  onClose: () => void;
}

// ─ Components ───────────────────────────────────────────────────────────────────────────────────
/**
 * ConfirmModal component for confirming order completion and viewing item details.
 * Displays unretrieved and retrieved items for an order, with preview and confirm actions.
 *
 * @module ConfirmModal
 */

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
        onImageClick={() => setPreviewItem(prev =>
          prev?.itemID === item.itemID ? null : item
        )}
      />
    );
  }, []);

  const orderData = findOrderByID(orders, order.orderID);

  if (!orderData) { return null; }

  const onConfirm = () => {
    const removeIdx = orderDisplay.findIndex(orderItem => orderItem.orderID === orderData.orderID);
    if (removeIdx === -1) { return; }

    const newOrderDisplay = [...orderDisplay];

    if (newOrderDisplay.length > 24) {
      // Prepare the swapped-in order with the correct box number
      const swapIdx = 24;
      const swappedOrder = { ...newOrderDisplay[swapIdx], box: removeIdx + 1 };
      swappedOrder.items = swappedOrder.items.map(item => ({ ...item, box: removeIdx + 1 }));
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
    .filter(item => item.status !== 'inBox')
    .map(item => orderData.items.find(data => data.itemID === item.itemID))
    .filter(Boolean) as ItemData[];
  const retrievedItems = order.items
    .filter(item => item.status === 'inBox')
    .map(item => orderData.items.find(data => data.itemID === item.itemID))
    .filter(Boolean) as ItemData[];

  const Empty = () => (
    <ErrorBox className="text-lg h-full w-full flex flex-col items-center justify-center text-center bg-green-50/10">
      <img
        src="/OpenBox.svg"
        alt={EMPTY_ALT}
        className="w-16 h-16 mx-auto mb-2 opacity-80"
      />
      {EMPTY_TEXT}
    </ErrorBox>
  );

  // Prepare variables for conditional rendering
  const unretrievedContent = unretrievedItems.length > 0 ?
    unretrievedItems.map(renderItem) : <Empty />;
  const retrievedContent = retrievedItems.length > 0 ?
    retrievedItems.map(renderItem) : <Empty />;
  let previewContent;
  if (previewItem) {
    previewContent = (
      <>
        <img
          src={previewItem.imageUrl}
          alt={previewItem.itemName || 'Preview'}
          className="object-contain rounded-xl mb-2 h-full max-h-[45vh] w-full"
        />
        <p className='text-white mb-3 font-semibold'>
          {previewItem.itemName}
        </p>
        <div className='flex flex-row flex-wrap items-center justify-center w-full text-2xl'>
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
      <div className='flex flex-row items-center justify-center gap-10 min-w-[70vw] '>
        <div className='flex flex-col items-center justify-center w-full gap-4'>
          <FlexColCenter className="w-full gap-4">
            <div className='flex flex-col gap-2'>
              <span className="text-lg font-bold text-center text-white">
                {orderData.customerName}
              </span>
              <FlexRowBetween className='gap-2'>
                <TagPill className='bg-green-smoke-300/40 ring-2'>{orderData.orderID}</TagPill>
                <TagPill className='bg-green-smoke-300/40 ring-2'>{orderData.deliveryMethod}</TagPill>
              </FlexRowBetween>
            </div>
            <div className="flex flex-col gap-3 h-full w-full flex-1/2">
              <SectionTitle>{UNRETRIEVED_TITLE}</SectionTitle>
              <div className='bg-black/10 p-2 rounded-2xl'>
                <ScrollContainer className="flex-row flex-wrap max-h-50 w-full">
                  {unretrievedContent}
                </ScrollContainer>
              </div>
              <SectionTitle>{RETRIEVED_TITLE}</SectionTitle>
              <div className='bg-black/10 p-2 rounded-2xl'>
                <ScrollContainer className="flex-row flex-wrap max-h-50 w-full">
                  {retrievedContent}
                </ScrollContainer>
              </div>
            </div>
            <Button
              label='Confirm'
              onClick={onConfirm}
              disabled={unretrievedItems.length !== 0}
            />
          </FlexColCenter>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center bg-black/10 flex-1/2 min-h-[70vh] h-full w-full rounded-2xl p-5">
          {previewContent}
        </div>
      </div>
    </ModalContainer >
  );
});

ConfirmModal.displayName = 'ConfirmModal';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ConfirmModal;