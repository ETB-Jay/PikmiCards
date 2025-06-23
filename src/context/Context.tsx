import { createContext } from "react";
import { OrderData, Order, ItemID } from "../types";

/**
 * @description OrdersContextType stores the fetched order data from Shopify
 */
interface OrdersContextType {
    orders: OrderData[];
    setOrders: (orders: OrderData[]) => void;
    fetchOrders: () => Promise<void>;
}
const OrdersContext = createContext<OrdersContextType>({
    orders: [],
    setOrders: () => {},
    fetchOrders: async () => {},
});
OrdersContext.displayName = "OrdersContext";


interface OrderDisplayContextType {
    orderDisplay: Order[];
    setOrderDisplay: (orders: Order[]) => void;
    selectedItems: Set<ItemID>;
    setSelectedItems: (Items: Set<ItemID>) => void;
    handleSelect: (itemID: ItemID) => void;
    handleConfirm: () => void;
    handleClear: () => void;
}
/**
 * React context for order display and selection state.
 */
const OrderDisplayContext = createContext<OrderDisplayContextType>({
    orderDisplay: [],
    setOrderDisplay: () => {},
    selectedItems: new Set(),
    setSelectedItems: () => {},
    handleSelect: () => {},
    handleConfirm: () => {},
    handleClear: () => {}
});
OrderDisplayContext.displayName = "OrderDisplayContext";

/**
 * Context for managing the list of box orders and its setter.
 * Used for displaying and updating the current box's orders.
 */
interface BoxOrdersContextType {
    boxOrders: Order[];
    setBoxOrders: (updater: Order[] | ((prev: Order[]) => Order[])) => void;
}
/**
 * React context for box orders state.
 */
const BoxOrdersContext = createContext<BoxOrdersContextType>({
    boxOrders: [],
    setBoxOrders: () => { }
});
BoxOrdersContext.displayName = "BoxOrdersContext";

/**
 * Context for managing the queue pile (list of item IDs in the queue) and its setter.
 */
interface QueuePileContextType {
    queuePile: ItemID[];
    setQueuePile: (updater: ItemID[] | ((prev: ItemID[]) => ItemID[])) => void;
}
/**
 * React context for queue pile state.
 */
const QueuePileContext = createContext<QueuePileContextType>({
    queuePile: [],
    setQueuePile: () => { },
});
QueuePileContext.displayName = "QueuePileContext";

/**
 * Context for managing fullscreen image modal state and actions.
 */
interface FullscreenContextType {
    openFullscreen: (imageUrl: string) => void;
    closeFullscreen: () => void;
}
/**
 * React context for fullscreen modal state and actions.
 */
const FullscreenContext = createContext<FullscreenContextType>({ openFullscreen: () => {}, closeFullscreen: () => {} });
FullscreenContext.displayName = "FullscreenContext";

/**
 * Context for managing the confirmation modal state and actions.
 */
interface ConfirmContextType {
    confirm: Order | null;
    openConfirm: (order: Order) => void;
    closeConfirm: () => void;
}
/**
 * React context for confirmation modal state and actions.
 */
const ConfirmContext = createContext<ConfirmContextType>({ confirm: null, openConfirm: () => {}, closeConfirm: () => {} });
ConfirmContext.displayName = "ConfirmContext";

export {
    OrdersContext,
    FullscreenContext,
    OrderDisplayContext,
    BoxOrdersContext,
    ConfirmContext,
    QueuePileContext,
};
