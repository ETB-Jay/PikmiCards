import { useOrderDisplay } from "../../context/useContext";
import { ScrollContainer } from "../components/Container";
import { OrderCard, getItemKey } from "../components/OrderCard";
import { useMemo, memo, useCallback } from "react";

const QueuePile = () => {
    const { orderDisplay, selectedItems, handleSelect } = useOrderDisplay();

    const remainingOrders = useMemo(() => 
        orderDisplay?.slice(-1) || null,
        [orderDisplay]
    );

    const queueItems = useMemo(() => 
        remainingOrders?.flatMap(order => 
            order.items?.map(item => ({
                ...item,
                orderNumber: order.orderNumber
            })) || []
        ),
        [remainingOrders]
    );

    const renderItem = useCallback((item: any, index: number) => {
        const itemKey = getItemKey(item, index);
        return (
            <OrderCard
                key={itemKey}
                item={item}
                itemKey={itemKey}
                selectedItems={selectedItems}
                onSelect={handleSelect}
                label={false}
            />
        );
    }, [selectedItems, handleSelect]);

    const items = useMemo(() => 
        queueItems?.map(renderItem),
        [queueItems, renderItem]
    );

    return (
        <div className="flex flex-col h-full">
            <ScrollContainer className='flex-row flex-1'>
                {items}
            </ScrollContainer>
        </div>
    );
};

QueuePile.displayName = "QueuePile";

export default memo(QueuePile);
