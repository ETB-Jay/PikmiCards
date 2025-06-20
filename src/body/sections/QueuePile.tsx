import { useOrderDisplay, useQueuePile } from "../../context/useContext";
import { ScrollContainer } from "../components/Container";
import { OrderCard, getItemKey } from "../components/OrderCard";
import { memo, useCallback, useMemo } from "react";

const QueuePile = () => {
    const { selectedItems, handleSelect } = useOrderDisplay();
    const { queuePile } = useQueuePile();

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

    const items = useMemo(() => queuePile.map(renderItem), [queuePile, renderItem]);

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
