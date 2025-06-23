import { memo } from "react";
import { OrderData, ItemData } from "../types";
import { ScrollContainer } from "../body/components/Container";
import { OrderCard } from "../body/components/OrderCard";
import { useCallback } from "react";
import { ModalContainer, ModalButton, ModalOverlay } from "./components";

interface ConfirmModalProps {
    order: OrderData;
    onClose: () => void;
}

const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;

const ConfirmModal = memo(({ order, onClose }: ConfirmModalProps) => {

    const renderItem = useCallback((item: ItemData, index: number) => {
        const itemKey = getItemKey(item, index);
        return (
            <OrderCard
                key={itemKey}
                itemData={item}
                itemKey={itemKey}
                selected={false}
                label={false}
            />
        );
    }, []);

    return (
        <ModalOverlay onClose={onClose}>
            <ModalContainer
                className={""}
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
                <ModalButton>Confirm</ModalButton>
            </ModalContainer>
        </ModalOverlay>
    );
})

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;