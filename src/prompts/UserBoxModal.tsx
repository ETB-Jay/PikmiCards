import { ModalContainer, ModalButton, ModalOverlay } from "./components";
import { Order } from "../types";

interface UserBoxModalProps {
    open: boolean;
    order: Order;
    onClose: () => void;
}

const UserBoxModal = ({ open, order, onClose }: UserBoxModalProps) => {
    if (!open) return null;
    return (
        <ModalOverlay onClose={onClose}>
            <ModalContainer
                onClick={e => e.stopPropagation()}
                title="Order Details"
            >
                <div className="flex flex-row items-center justify-center gap-5 text-white">
                    <div className="flex flex-col gap-2">
                    <span className="block bg-green-900 ring-2 ring-black-olive-950 text-xs rounded p-1 w-fit">{order.customerName}</span>
                        <span className="block bg-green-900 ring-2 ring-black-olive-950 text-xs rounded p-1 w-fit">{order.orderNumber}</span>
                        <span className="block bg-green-900 ring-2 ring-black-olive-950 text-xs rounded p-1 w-fit">{order.numberItems}</span>
                    </div>
                    <div className="flex flex-col bg-green-400 rounded p-1">
                        {order.orderNumber}
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <ModalButton onClick={onClose}>Close</ModalButton>
                </div>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default UserBoxModal; 