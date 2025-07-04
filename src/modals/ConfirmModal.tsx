import React, { useState, useCallback, memo } from 'react';

import { Order, ItemData } from '../types';
import { ModalContainer, ScrollContainer } from '../components/containers';
import OrderCard from '../components/OrderCard';
import { Button, SectionTitle, Tags } from '../components/modal';
import { useOrderDisplay, useOrders } from '../context/useContext';
import { findOrderByID } from '../context/orderFunctions';

/**
 * ConfirmModal component for confirming order completion and viewing item details.
 * Displays unretrieved and retrieved items for an order, with preview and confirm actions.
 *
 * @module ConfirmModal
 */

/**
 * Props for the ConfirmModal component.
 * @property order - The order to confirm.
 * @property onClose - Function to close the modal.
 */
interface ConfirmModalProps {
    order: Order;
    onClose: () => void;
}

const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;

const EMPTY_TEXT = "None";
const EMPTY_ALT = "Empty Box";
const UNRETRIEVED_TITLE = "Unretrieved Items";
const RETRIEVED_TITLE = "Retrieved Items";
const NO_PREVIEW_TEXT = "No Preview";

/**
 * ConfirmModal displays a modal for confirming order completion and viewing item details.
 * @param order - The order to confirm.
 * @param onClose - Function to close the modal.
 * @returns {JSX.Element}
 */
const ConfirmModal = memo(({ order, onClose }: ConfirmModalProps) => {
    const { orders, setOrders } = useOrders();
    const { orderDisplay, setOrderDisplay } = useOrderDisplay();
    const [previewItem, setPreviewItem] = useState<ItemData | null>(null);
    const renderItem = useCallback((item: ItemData, index: number) => {
        const itemKey = getItemKey(item, index);
        return (
            <OrderCard
              key={itemKey}
              item={item}
              itemKey={itemKey}
              selected={null}
              large={false}
              onImageClick={() => setPreviewItem(prev => prev?.itemID === item.itemID ? null : item)}
            />
        );
    }, []);

    const orderData = findOrderByID(orders, order.orderID);

    if (!orderData) {return null;}

    const onConfirm = () => {
        const newOrders = orders.filter(orderItem => (orderItem.orderID !== orderData.orderID));
        setOrders(newOrders);

        const newOrderDisplay = orderDisplay.filter(orderItem => (orderItem.orderID !== orderData.orderID));
        setOrderDisplay(newOrderDisplay);

        onClose();
    };

    const unretrievedItems = order.items
        .filter(item => item.status === 'unPicked')
        .map(item => orderData.items.find(data => data.itemID === item.itemID))
        .filter(Boolean) as ItemData[];
    const retrievedItems = order.items
        .filter(item => item.status !== 'unPicked')
        .map(item => orderData.items.find(data => data.itemID === item.itemID))
        .filter(Boolean) as ItemData[];

    const Empty = () => (
        <div className="bg-green-50/10 p-4 rounded-xl text-lg h-full w-full flex flex-col text-white items-center justify-center text-center">
            <img src="/OpenBox.svg" alt={EMPTY_ALT} className="w-16 h-16 mx-auto mb-2 opacity-80" />
            {EMPTY_TEXT}
        </div>
    );

    // Prepare variables for conditional rendering
    const unretrievedContent = unretrievedItems.length > 0 ? unretrievedItems.map(renderItem) : <Empty />;
    const retrievedContent = retrievedItems.length > 0 ? retrievedItems.map(renderItem) : <Empty />;
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
            <div className="flex flex-col items-center justify-center h-full w-full text-white opacity-60">
                <span className="text-lg">{NO_PREVIEW_TEXT}</span>
            </div>
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
                    <span className="text-lg font-bold text-center text-white">{orderData.customerName}</span>
                    <div className="flex flex-col gap-3 h-full w-full flex-1">
                        <div className='bg-black/10 p-2 rounded-2xl'>
                            <SectionTitle>{UNRETRIEVED_TITLE}</SectionTitle>
                            <ScrollContainer className="flex-row flex-wrap flex-1 max-h-66 w-full">
                                {unretrievedContent}
                            </ScrollContainer>
                        </div>
                        <div className='bg-black/10 p-2 rounded-2xl'>
                            <SectionTitle>{RETRIEVED_TITLE}</SectionTitle>
                            <ScrollContainer className="flex-row flex-wrap flex-1 max-h-66 w-full">
                                {retrievedContent}
                            </ScrollContainer>
                        </div>
                    </div>
                    <Button
                      label='Confirm'
                      onClick={onConfirm}
                      disabled={unretrievedItems.length !== 0}
                    />
                </div>

                <div className="hidden md:flex flex-col items-center justify-center bg-black/10 flex-grow min-h-[60vh] h-full w-full rounded-2xl p-5">
                    {previewContent}
                </div>
            </div>
        </ModalContainer >
    );
});

ConfirmModal.displayName = 'ConfirmModal';

export default ConfirmModal;