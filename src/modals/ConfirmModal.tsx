import { memo } from "react";
import { Order, ItemData } from "../types";
import { ScrollContainer } from "../body/components/Container";
import { OrderCard } from "../body/components/OrderCard";
import { useCallback } from "react";
import { ModalContainer, ModalButton, ModalOverlay } from "./components";
import { useOrders } from "../context/useContext";

interface ConfirmModalProps {
    order: Order;
    onClose: () => void;
}

const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;

const ConfirmModal = memo(({ order, onClose }: ConfirmModalProps) => {
    const { orders, findOrderByID } = useOrders();
    const orderData = findOrderByID(orders, order.order);
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
    if (!orderData) return null;

    // Split items into unretrieved and retrieved
    const unretrievedItems = orderData.items.filter(item => order.unretrievedItems.includes(item.itemID));
    const retrievedItems = orderData.items.filter(item => order.retrievedItems.includes(item.itemID));

    return (
        <ModalOverlay onClose={onClose}>
            <ModalContainer
                className={""}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <span className="text-lg font-bold text-center">{orderData.customerName}</span>
                <div className="flex flex-row justify-center items-center gap-2">
                    <span className="bg-green-900 text-white py-1 px-2 rounded-2xl ring-2 ring-green-950 text-xs font-semibold text-center">{orderData.deliveryMethod}</span>
                    <span className="bg-green-900 text-white py-1 px-2 rounded-2xl ring-2 ring-green-950 text-xs font-semibold text-center">{orderData.orderNumber}</span>
                </div>
                <ScrollContainer className="p-3 flex-row max-w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <div>
                            <div className="font-bold mb-1 text-green-900">Unretrieved Items</div>
                            {unretrievedItems.length > 0 ? unretrievedItems.map(renderItem) : <div className="text-xs text-gray-400">None</div>}
                        </div>
                        <div className="mt-4">
                            <div className="font-bold mb-1 text-green-900">Retrieved Items</div>
                            {retrievedItems.length > 0 ? retrievedItems.map(renderItem) : <div className="text-xs text-gray-400">None</div>}
                        </div>
                    </div>
                </ScrollContainer>
                <ModalButton>Confirm</ModalButton>
            </ModalContainer>
        </ModalOverlay>
    );
})

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;