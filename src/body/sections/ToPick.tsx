import { useOrderDisplay } from "../../context/useContext";
import { useMemo, memo, useCallback } from "react";
import { ScrollContainer } from "../components/Container";
import { OrderCard, getItemKey } from "../components/OrderCard";

const ToPick = () => {
    const { orderDisplay, selectedItems, handleSelect, handleConfirm, handleClear } = useOrderDisplay();

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
            <div className="flex flex-row gap-2 p-2 rounded-b-2xl bg-black-olive-800 justify-center items-center">
                <button
                    onClick={handleConfirm}
                    className="py-1.5 px-3 w-fit rounded-full bg-teal-600/50 hover:bg-teal-700/50 active:bg-teal-800/50 ring-2 text-white ring-teal-900 font-medium text-xs shadow transition-all duration-150 cursor-pointer"
                >
                    Confirm {selectedItems.size} {selectedItems.size === 1 ? "Item" : "Items"}
                </button>
                <button
                    onClick={handleClear}
                    className="py-1.5 px-3 w-fit rounded-full bg-red-500/50 hover:bg-red-600/50 active:bg-red-700/50 ring-2 ring-red-900 text-white font-medium text-xs shadow transition-all duration-150 cursor-pointer"
                >
                    Clear Items
                </button>
            </div>
        );
    }, [selectedItems.size, handleConfirm, handleClear]);

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