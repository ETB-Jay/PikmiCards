import { useOrderDisplay } from "../../context/useContext";
import { useMemo, memo, useCallback } from "react";
import { ScrollContainer } from "../components/Container";
import { OrderCard, getItemKey } from "../components/OrderCard";

const ToPick = () => {
    const { orderDisplay, selectedItems, handleSelect, handleConfirm } = useOrderDisplay();

    const allItems = useMemo(() =>
        orderDisplay?.flatMap(order =>
            order.items?.map(item => ({
                ...item,
                orderNumber: order.orderNumber
            })) || []
        ) || [],
        [orderDisplay]
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
                label={true}
            />
        );
    }, [selectedItems, handleSelect]);

    const items = useMemo(() => 
        allItems.map(renderItem),
        [allItems, renderItem]
    );

    const confirmButton = useMemo(() => {
        if (selectedItems.size === 0) return null;
        
        return (
            <button
                onClick={handleConfirm}
                className="w-full py-2 bg-black-olive-900 hover:bg-black-olive-900/90 cursor-pointer text-white rounded-b-lg transition-colors"
            >
                Confirm {selectedItems.size} {selectedItems.size === 1 ? "Item" : "Items"}
            </button>
        );
    }, [selectedItems.size, handleConfirm]);

    return (
        <div className="flex flex-col h-full">
            <ScrollContainer className="p-3 flex-1">
                {items}
            </ScrollContainer>
            {confirmButton}
        </div>
    );
};

ToPick.displayName = "ToPick";

export default memo(ToPick);