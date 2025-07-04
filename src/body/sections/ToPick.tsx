import React from 'react';
import { useOrderDisplay, useOrders } from '../../context/useContext';
import { useMemo, memo, useCallback } from 'react';
import { ScrollContainer } from '../../components/containers';
import OrderCard from '../../components/OrderCard';
import { ItemData, ItemID, OrderID } from '../../types';
import { findItemByID } from '../../context/orderFunctions';

/**
 * ToPick section component.
 * Displays a list of items that need to be picked, with selection and confirmation controls.
 *
 * @module ToPick
 */

/**
 * @description ToPick is a memoized component that renders the list of items to pick and confirmation controls.
 */
const ToPick = (): React.ReactElement => {
    const { orders } = useOrders();
    const { orderDisplay, selectedItems, handleConfirm, handleClear } = useOrderDisplay();

    const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;

    const itemsToPick = useMemo(() => {
        return orderDisplay.flatMap(order =>
            order.items
                .filter(item => item.status === 'unPicked')
        );
    }, [orderDisplay]);

    const renderItem = useCallback((item: { orderID: OrderID, itemID: ItemID }, index: number) => {
        const itemData = findItemByID(orders, item.orderID, item.itemID);
        if (!itemData) return null;
        const itemKey = getItemKey(itemData, index);
        const selected = selectedItems.has(item.itemID);
        return (
            <OrderCard
                key={itemKey}
                item={itemData}
                itemKey={itemKey}
                selected={selected}
                large={true}
            />
        );
    }, [orders, selectedItems]);

    const cards = useMemo(() =>
        itemsToPick?.map(renderItem),
        [itemsToPick, renderItem]
    );

    const confirmButton = useMemo(() => {
        if (selectedItems.size === 0) return null;

        return (
            <>
                <button
                    onClick={handleConfirm}
                    className="py-1.5 px-3 w-fit rounded-full bg-teal-600/50 hover:bg-teal-700/50 active:bg-teal-800/50 ring-2 text-white ring-teal-900 font-medium text-xs shadow transition-all duration-150 cursor-pointer"
                >
                    Confirm {selectedItems.size} {selectedItems.size === 1 ? 'Item' : 'Items'}
                </button>
                <button
                    onClick={handleClear}
                    className="py-1.5 px-3 w-fit rounded-full bg-red-500/50 hover:bg-red-600/50 active:bg-red-700/50 ring-2 ring-red-900 text-white font-medium text-xs shadow transition-all duration-150 cursor-pointer"
                >
                    Clear Items
                </button>
            </>
        );
    }, [selectedItems.size, handleConfirm, handleClear]);

    return (
        <div className='h-full w-full flex flex-col'>
            <ScrollContainer className='px-2 py-1 flex-1 overflow-y-auto'>
                {cards}
            </ScrollContainer>
            {confirmButton && (
                <div className="sticky flex flex-row justify-center rounded-b-2xl gap-3 p-2 bottom-0 z-20 bg-green-smoke-800/80 backdrop-blur-md border-t border-black-olive-900 shadow-lg">
                    {confirmButton}
                </div>
            )}
        </div>
    );
};

ToPick.displayName = 'ToPick';

export default memo(ToPick);