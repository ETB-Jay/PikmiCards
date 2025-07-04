// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React, { memo, useCallback, useMemo } from 'react';

import { useOrderDisplay, useOrders } from '../../context/useContext';
import { ScrollContainer } from '../../components/containers';
import OrderCard from '../../components/OrderCard';
import { ItemData } from '../../types';

/**
 * QueuePile section component.
 * Displays the queue of items to be picked, or a placeholder if empty.
 *
 * @module QueuePile
 */

// ─ Constants ─────────────────────────────────────────────────────────────────────────────────────────
const EMPTY_QUEUE_TEXT = "Queue is empty";

/**
 * QueuePile is a memoized component that renders the queue pile of items to pick.
 */
const QueuePile = (): React.ReactElement => {
    const { selectedItems } = useOrderDisplay();
    const { orders } = useOrders();

    const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;

    const renderItem = useCallback((itemID: string, index: number) => {
        let itemData: ItemData | undefined;
        for (const order of orders) {
            itemData = order.items.find(item => item.itemID === itemID);
            if (itemData) {break;}
        }
        if (!itemData) {return null;}
        const itemKey = getItemKey(itemData, index);
        const selected = selectedItems.has(itemID);
        return (
            <OrderCard
              key={itemKey}
              item={itemData}
              selected={selected}
              large={false}
            />
        );
    }, [orders, selectedItems]);

    const { orderDisplay } = useOrderDisplay();
    const queueItemIDs = orderDisplay.flatMap(order => order.items.filter(item => item.status === 'queue').map(item => item.itemID));
    const items = useMemo(() => queueItemIDs.map(renderItem), [queueItemIDs, renderItem]);

    let content;
    if (items.length === 0) {
        content = (
            <div className="flex bg-green-smoke-600/70 rounded-2xl ring-2 ring-green-900 h-full w-full items-center justify-center text-white">
                {EMPTY_QUEUE_TEXT}
            </div>
        );
    } else {
        content = (
            <ScrollContainer className='flex-row flex-1'>
                {items}
            </ScrollContainer>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {content}
        </div>
    );
};

QueuePile.displayName = 'QueuePile';

export default memo(QueuePile);
