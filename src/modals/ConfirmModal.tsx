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
import { preview } from 'vite';


// ─ Components ───────────────────────────────────────────────────────────────────────────────────
/**
 * ConfirmModal displays a modal for confirming order completion and viewing item details.
 * @param order - The order to confirm.
 * @param onClose - Function to close the modal.
 */
const ConfirmModal = memo(({ order, onClose }: ConfirmModalProps) => {
  const { orders } = useOrders();
  const { orderDisplay, setOrderDisplay } = useOrderDisplay();
  const [previewItem, setPreviewItem] = useState<ItemData | null>(null);

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
