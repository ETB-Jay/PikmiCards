import { useOrderDisplay, useQueuePile, useOrders } from '../../context/useContext';
import { ScrollContainer } from '../../components/containers';
import OrderCard from '../../components/OrderCard';
import { memo, useCallback, useMemo } from 'react';
import { ItemData } from '../../types';

const QueuePile = () => {
    const { selectedItems } = useOrderDisplay();
    const { queuePile } = useQueuePile();
    const { orders } = useOrders();

    const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;

    const renderItem = useCallback((itemID: string, index: number) => {
        let itemData: ItemData | undefined;
        for (const order of orders) {
            itemData = order.items.find(item => item.itemID === itemID);
            if (itemData) break;
        }
        if (!itemData) return null;
        const itemKey = getItemKey(itemData, index);
        const selected = selectedItems.has(itemID);
        return (
            <OrderCard
                key={itemKey}
                item={itemData}
                itemKey={itemKey}
                selected={selected}
                large={false}
            />
        );
    }, [orders, selectedItems]);

    const items = useMemo(() => queuePile.map(renderItem), [queuePile, renderItem]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {queuePile.length !== 0 ?
                <ScrollContainer className='flex-row flex-1'>
                    {items}
                </ScrollContainer>
                : 
                <div className="flex bg-green-smoke-600/70 rounded-2xl ring-2 ring-green-900 h-full w-full items-center justify-center text-white ">Nothing Yet!</div>
            }
        </div>
    );
};

QueuePile.displayName = 'QueuePile';

export default memo(QueuePile);
