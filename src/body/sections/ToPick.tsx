import { useOrderDisplay, useOrders } from "../../context/useContext";
import { useMemo, memo, useCallback } from "react";
import { ScrollContainer } from "../components/Container";
import { OrderCard } from "../components/OrderCard";
import { ItemData } from "../../types";

const ToPick = () => {
    const { orders, findItemByID } = useOrders()
    const { orderDisplay, selectedItems, handleConfirm, handleClear } = useOrderDisplay();

    const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;

    const itemsToPick = useMemo(() => {
        const items = orderDisplay
            ?.flatMap(order => order.unretrievedItems.map(itemID => ({ orderID: order.order, itemID })))
            || [];
        console.log(items.length)
        return items
    }, [orderDisplay]);

    const renderItem = useCallback((item: { orderID: string, itemID: string }, index: number) => {
        const itemData = findItemByID(orders, item.orderID, item.itemID);
        if (!itemData) {
            return null;
        }
        const itemKey = getItemKey(itemData, index);
        const selected = selectedItems.has(item.itemID);
        return (
            <OrderCard
                key={itemKey}
                itemData={itemData}
                itemKey={itemKey}
                selected={selected}
                label={true}
            />
        );
    }, [orders, findItemByID, selectedItems]);

    const cards = useMemo(() =>
        itemsToPick?.map(renderItem),
        [itemsToPick, renderItem]
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
                {cards}
            </ScrollContainer>
            {confirmButton}
        </div>
    );
};

ToPick.displayName = "ToPick";

export default memo(ToPick);