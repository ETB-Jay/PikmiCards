import { createContext } from "react";
import { Order, Item } from "../types";

/**
 * @description Context for storing order data on the website. 
 */
interface OrdersContextType {
    orders: Order[] | null;
    setOrders: (orders: Order[] | null) => void;
}
const OrdersContext = createContext<OrdersContextType>({ orders: null, setOrders: () => {} });
OrdersContext.displayName = "OrdersContext";

/**
 * @description Context for storing order data for a specific location
 */
interface OrderDisplayContextType {
    orderDisplay: Order[] | null;
    setOrderDisplay: (orders: Order[] | null) => void;
    selectedItems: Set<Item>;
    setSelectedItems: (items: Set<Item>) => void;
    handleSelect: (item: Item) => void;
    handleConfirm: () => void;
    handleClear: () => void;
}
const OrderDisplayContext = createContext<OrderDisplayContextType>({ 
    orderDisplay: null, 
    setOrderDisplay: () => {},
    selectedItems: new Set(),
    setSelectedItems: () => {},
    handleSelect: () => {},
    handleConfirm: () => {},
    handleClear: () => {}
});
OrderDisplayContext.displayName = "OrderDisplayContext";

/**
 * @description Context for storing orders currently being boxed
 */
interface BoxOrdersContextType {
    boxOrders: string[] | null;
    setBoxOrders: (boxOrders: string[]) => void;
}
const BoxOrdersContext = createContext<BoxOrdersContextType>({
    boxOrders: [],
    setBoxOrders: () => {}
});
BoxOrdersContext.displayName = "BoxOrdersContext";

/**
 * @description Context for a fullscreened image
 */
interface FullscreenContextType {
    openFullscreen: (imageUrl: string) => void;
    closeFullscreen: () => void;
}
const FullscreenContext = createContext<FullscreenContextType>({ openFullscreen: () => {}, closeFullscreen: () => {} });
FullscreenContext.displayName = "FullscreenContext";

interface ConfirmContextType {
    confirm: Order | null;
    openConfirm: (order: Order) => void;
    closeConfirm: () => void;
}
const ConfirmContext = createContext<ConfirmContextType>({ confirm: null, openConfirm: () => {}, closeConfirm: () => {} });
ConfirmContext.displayName = "ConfirmContext";

interface ModalContextType {
    modalData: any;
    openModal: (order: any) => void;
    closeModal: () => void;
}
const ModalContext = createContext<ModalContextType>({
    modalData: null,
    openModal: () => {},
    closeModal: () => {}
});
ModalContext.displayName = "ModalContext";

interface QueuePileContextType {
    queuePile: Item[];
    setQueuePile: (queue: Item[]) => void;
}
const QueuePileContext = createContext<QueuePileContextType>({
    queuePile: [],
    setQueuePile: () => {},
});
QueuePileContext.displayName = "QueuePileContext";

export {
    OrdersContext,
    FullscreenContext,
    OrderDisplayContext,
    BoxOrdersContext,
    ConfirmContext,
    ModalContext,
    QueuePileContext,
};
