import { memo } from "react";
import { Order, Item } from "../types";
import { ScrollContainer } from "../body/components/Container";
import { getItemKey, OrderCard } from "../body/components/OrderCard";
import { useCallback } from "react";
import { PromptContainer } from "./components";
import { PromptButton } from "./components";

interface ConfirmModalProps {
    order: Order;
    onClose: () => void;
}

const ConfirmModal = memo(({ order, onClose }: ConfirmModalProps) => {

    const renderItem = useCallback((item: Item, index: number) => {
        const itemKey = getItemKey(item, index);
        return (
            <OrderCard
                key={itemKey}
                item={item}
                itemKey={itemKey}
                selectedItems={new Set()}
                onSelect={() => { }}
                label={false}
            />
        );
    }, []);

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen z-20 bg-black/50 flex flex-col items-center justify-center cursor-pointer backdrop-blur-sm select-none"
            onClick={onClose}
        >
            <PromptContainer
                className={"flex flex-col items-center justify-center w-fit z-100 cursor-default prompt-animate min-w-[260px] max-w-[90vw] gap-2 p-3"}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <span className="text-lg font-bold text-center">{order.customerName}</span>
                <div className="flex flex-row justify-center items-center gap-2">
                    <span className="bg-green-900 text-white py-1 px-2 rounded-2xl ring-2 ring-green-950 text-xs font-semibold text-center">{order.deliveryMethod}</span>
                    <span className="bg-green-900 text-white py-1 px-2 rounded-2xl ring-2 ring-green-950 text-xs font-semibold text-center">{order.orderNumber}</span>
                </div>
                <ScrollContainer className="p-3 flex-row max-w-full">
                    {order.items.map(renderItem)}
                </ScrollContainer>
                <PromptButton>Confirm</PromptButton>
            </PromptContainer >
        </div>
    );
})

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;