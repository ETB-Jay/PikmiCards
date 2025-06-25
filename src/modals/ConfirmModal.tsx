import React, { useState } from 'react';
import { memo } from 'react';
import { Order, ItemData } from '../types';
import { ModalContainer, ScrollContainer } from '../components/containers';
import OrderCard from '../components/OrderCard';
import { useCallback } from 'react';
import { Button, SectionTitle, Tags } from '../components/modal';
import { useOrders } from '../context/useContext';
import { findOrderByID } from '../context/orderFunctions';

interface ConfirmModalProps {
    order: Order;
    onClose: () => void;
}

const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;

const ConfirmModal = memo(({ order, onClose }: ConfirmModalProps) => {
    const { orders } = useOrders();
    const [previewItem, setPreviewItem] = useState<ItemData | null>(null);
    const orderData = findOrderByID(orders, order.order);
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

    const onConfirm = useCallback(() => {
        onClose();
    }, []);

    if (!orderData) return null;

    // Split items into unretrieved and retrieved
    const unretrievedItems = orderData.items.filter(item => order.unretrievedItems.includes(item.itemID));
    const retrievedItems = orderData.items.filter(item => order.retrievedItems.includes(item.itemID));

    const Empty = () => (
        <div className="bg-green-50/10 p-4 rounded-xl text-lg h-full w-full flex flex-col text-white items-center justify-center text-center">
            <img src="/OpenBox.svg" alt="Empty Box" className="w-16 h-16 mx-auto mb-2 opacity-80" />
            None
        </div>
    );

    return (
        <ModalContainer
            className={''}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            onClose={onClose}
        >
            <div className='flex flex-row items-center justify-center gap-10 min-w-[70vw] '>
                <div className='flex flex-col items-center justify-center w-full gap-4'>
                    <span className="text-lg font-bold text-center text-white">{orderData.customerName}</span>
                    <div className="flex flex-col gap-3 h-full w-full flex-1">
                        <div className='bg-black/10 p-2 rounded-2xl'>
                            <SectionTitle>Unretrieved Items</SectionTitle>
                            <ScrollContainer className="flex-row flex-wrap flex-1 max-h-66 w-full">
                                {unretrievedItems.length > 0 ? unretrievedItems.map(renderItem) : <Empty />}
                            </ScrollContainer>
                        </div>
                        <div className='bg-black/10 p-2 rounded-2xl'>
                            <SectionTitle>Retrieved Items</SectionTitle>
                            <ScrollContainer className="flex-row flex-wrap flex-1 max-h-66 w-full">
                                {retrievedItems.length > 0 ? retrievedItems.map(renderItem) : <Empty />}
                            </ScrollContainer>
                        </div>
                    </div>
                    <Button
                        label='Confirm'
                        onClick={onConfirm}
                        disabled={unretrievedItems.length !== 0}
                    />
                </div>

                <div className="hidden md:flex flex-col items-center justify-center bg-black/10 min-h-[60vh] h-[70vh] w-full rounded-2xl p-5">
                    {previewItem &&
                        <>
                            <img
                                src={previewItem.imageUrl}
                                alt={previewItem.itemName || 'Preview'}
                                className="h-full w-full object-contain rounded-xl mb-2"
                            />
                            <div className='flex flex-row flex-wrap items-center justify-center w-full text-2xl'>
                                <Tags item={previewItem} />
                            </div>
                        </>
                    }
                </div>
            </div>
        </ModalContainer >
    );
});

ConfirmModal.displayName = 'ConfirmModal';

export default ConfirmModal;